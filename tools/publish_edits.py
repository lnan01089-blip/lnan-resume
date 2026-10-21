#!/usr/bin/env python3
"""把浏览器导出的 nresume-edits-*.json 写入静态站点文件。

用法：
    python tools/publish_edits.py nresume-edits-20261020-1530.json
    python tools/publish_edits.py edits.json --root . --dry-run

脚本会：
- 把导出文件里的图片写入 assets/img；
- 把图片备注、项目图片顺序与备注写入 index.html / assets/js/main.js；
- 把项目文字写入 index.html 与 PROJECT_GALLERIES 默认文案；
- 有新中文字符时重新生成宋体子集。

写入前请确认导出文件来自你真正编辑过的那个浏览器。
"""

from __future__ import annotations

import argparse
import base64
import hashlib
import html
import io
import json
import re
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:  # pragma: no cover - only hit without Pillow
    Image = None

PROJECT_KEYS = ["stashly", "research", "site"]
SLOT_KEYS = [
    "avatar", "mascot-body",
    "life-1", "life-2", "life-3", "life-4",
]
GALLERY_NAMES = {
    "stashly": "project-stashly",
    "research": "project-research",
    "site": "project-site",
}
FALLBACK_TEXT = {
    "stashly": {
        "title": "Stashly 书柜 App",
        "type": "产品 / AI Coding",
        "desc": "针对实体书存放在不同柜子和收纳盒中、查找位置不便的问题，设计与实际存储方式对应的管理结构，实现书籍与存放位置的关联；使用 Claude 辅助编写和修改代码，实现书柜、收纳盒与书籍的管理，并支持本地存储和离线使用；根据实际使用情况发现问题，借助 AI 排查和修复代码，逐步完善功能。",
    },
    "research": {
        "title": "既有建筑绿色改造研究",
        "type": "研究 / 国家自然科学基金",
        "desc": "围绕既有建筑绿色改造相关问题开展研究，参与研究资料整理、理论分析、数据分析及论文撰写工作；以第一作者发表核心论文 2 篇、三作 1 篇，参与 3 部著作编写。",
    },
    "site": {
        "title": "N'RESUME 个人主页",
        "type": "网页 / 原生前端",
        "desc": "以原生 HTML / CSS / JavaScript 搭建的单页个人求职主页，串联教育、工作、项目、校园、技能、兴趣与联系方式；含平滑滚动、章节高亮、多图灯箱与浏览器内图片预览。",
    },
}
DATA_URL_RE = re.compile(r"^data:image/([a-zA-Z0-9.+-]+);base64,(.+)$", re.S)


def clean(value: object, limit: int | None = None) -> str:
    text = " ".join(str(value or "").split())
    if limit and len(text) > limit:
        text = text[:limit]
    return text


def read_text(path: Path) -> str:
    with path.open("r", encoding="utf-8", newline="") as handle:
        return handle.read()


def write_text(path: Path, text: str, dry_run: bool) -> bool:
    old = read_text(path) if path.exists() else None
    if old == text:
        return False
    if not dry_run:
        with path.open("w", encoding="utf-8", newline="") as handle:
            handle.write(text)
    return True


def write_bytes(path: Path, data: bytes, dry_run: bool) -> bool:
    old = path.read_bytes() if path.exists() else None
    if old == data:
        return False
    if not dry_run:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(data)
    return True


def versioned(rel_path: str, data: bytes) -> str:
    digest = hashlib.sha256(data).hexdigest()[:8]
    return f"{rel_path}?v={digest}"


def open_data_url(src: str):
    match = DATA_URL_RE.match(src)
    if not match or Image is None:
        raise ValueError("导出文件里的图片不是可识别的 base64 data URL，或未安装 Pillow")
    raw = base64.b64decode(match.group(2))
    return Image.open(io.BytesIO(raw))


def normalize_image(image):
    image = ImageOps.exif_transpose(image)
    if image.mode not in ("RGB", "RGBA"):
        image = image.convert("RGBA" if "A" in image.getbands() else "RGB")
    return image


def limit_image(image, max_side: int = 1200):
    width, height = image.size
    scale = min(1.0, max_side / max(width, height))
    if scale < 1:
        image = image.resize((max(1, round(width * scale)), max(1, round(height * scale))), Image.LANCZOS)
    return image


def encode_webp(image) -> bytes:
    image = limit_image(normalize_image(image))
    buffer = io.BytesIO()
    image.save(buffer, "WEBP", quality=90, method=6)
    return buffer.getvalue()


def encode_png(image) -> bytes:
    image = limit_image(normalize_image(image))
    buffer = io.BytesIO()
    image.save(buffer, "PNG", optimize=True)
    return buffer.getvalue()


def encode_jpeg(image) -> bytes:
    buffer = io.BytesIO()
    image.convert("RGB").save(buffer, "JPEG", quality=90, optimize=True, progressive=True)
    return buffer.getvalue()


def save_avatar(src: str, root: Path, dry_run: bool, changed: set[str]) -> tuple[str, str]:
    image = normalize_image(open_data_url(src))
    square = ImageOps.fit(image, (720, 720), method=Image.LANCZOS, centering=(0.5, 0.5))
    large = encode_jpeg(square)
    small = encode_jpeg(square.resize((360, 360), Image.LANCZOS))
    if write_bytes(root / "assets/img/avatar-720.jpg", large, dry_run):
        changed.add("assets/img/avatar-720.jpg")
    if write_bytes(root / "assets/img/avatar-360.jpg", small, dry_run):
        changed.add("assets/img/avatar-360.jpg")
    return versioned("assets/img/avatar-720.jpg", large), versioned("assets/img/avatar-360.jpg", small)


def save_slot_image(key: str, src: str, root: Path, dry_run: bool, changed: set[str]) -> str:
    image = open_data_url(src)
    if key == "avatar":
        large, _small = save_avatar(src, root, dry_run, changed)
        return large
    if key == "mascot-body":
        data = encode_png(image)
        rel = "assets/img/ip-nan.png"
    elif key.startswith("life-"):
        data = encode_webp(image)
        rel = f"assets/img/{key}.webp"
    else:
        raise ValueError(f"未知图片位置：{key}")
    if write_bytes(root / rel, data, dry_run):
        changed.add(rel)
    return versioned(rel, data)


def image_size(src: str, root: Path) -> tuple[int, int]:
    if src.startswith("data:"):
        image = open_data_url(src)
        return image.size
    path = root / src.split("?", 1)[0]
    if path.exists() and Image is not None:
        try:
            with Image.open(path) as image:
                return image.size
        except Exception:
            pass
    return 1200, 750


def attr_escape(value: str) -> str:
    return html.escape(value, quote=False).replace('"', "&quot;")


def set_attr(tag: str, name: str, value: str | None) -> str:
    pattern = re.compile(r"\s" + re.escape(name) + r'="[^"]*"')
    if not value:
        return pattern.sub("", tag, count=1)
    attr = f' {name}="{attr_escape(value)}"'
    if pattern.search(tag):
        return pattern.sub(attr, tag, count=1)
    return tag[:-1] + attr + ">"


def slot_img_tag(text: str, key: str) -> re.Match:
    pattern = re.compile(r'<img\b[^>]*\bdata-img-slot="' + re.escape(key) + r'"[^>]*>')
    match = pattern.search(text)
    if not match:
        raise ValueError(f"index.html 中找不到图片位置 {key}")
    return match


def replace_slot_img(text: str, key: str, src: str, note: str, srcset: str | None = None) -> str:
    match = slot_img_tag(text, key)
    tag = match.group(0)
    tag = set_attr(tag, "src", src)
    if srcset:
        tag = set_attr(tag, "srcset", srcset)
    tag = set_attr(tag, "data-note", note)
    tag = set_attr(tag, "title", note)
    return text[:match.start()] + tag + text[match.end():]


def replace_deck_button(text: str, key: str, src: str, note: str) -> str:
    pattern = re.compile(
        r'<button\b[^>]*\bdata-img="[^"]*"[^>]*>\s*<img\b[^>]*\bdata-img-slot="'
        + re.escape(key) + r'"[^>]*>',
        re.S,
    )
    match = pattern.search(text)
    if not match:
        return text
    block = match.group(0)
    button_match = re.search(r'<button\b[^>]*>', block)
    if not button_match:
        return text
    button_tag = set_attr(button_match.group(0), "data-img", src)
    button_tag = set_attr(button_tag, "title", note)
    new_block = button_tag + block[button_match.end():]
    return text[:match.start()] + new_block + text[match.end():]


def update_project_text(text: str, key: str, fields: dict[str, str]) -> str:
    card_pattern = re.compile(
        r'(<article\b[^>]*\bdata-project-card="' + re.escape(key) + r'"[^>]*>)(.*?)(</article>)',
        re.S,
    )
    card_match = card_pattern.search(text)
    if not card_match:
        raise ValueError(f"index.html 中找不到项目卡片 {key}")
    body = card_match.group(2)
    for field_key, value in fields.items():
        pattern = re.compile(
            r'(<[a-zA-Z][^>]*\bdata-project-field="' + re.escape(field_key) + r'"[^>]*>)(.*?)(</[a-zA-Z][a-zA-Z0-9-]*>)',
            re.S,
        )
        body, count = pattern.subn(
            lambda match, value=value: match.group(1) + html.escape(clean(value), quote=False) + match.group(3),
            body,
            count=1,
        )
        if not count:
            print(f"  警告：{key} 找不到字段 {field_key}，已跳过")
    return text[:card_match.start(2)] + body + text[card_match.end(2):]


def update_project_preview(text: str, key: str, title: str, images: list[dict]) -> str:
    button_pattern = re.compile(
        r'(<button\b[^>]*\bdata-project-gallery="' + re.escape(key) + r'"[^>]*>)(.*?)(</button>)',
        re.S,
    )
    match = button_pattern.search(text)
    if not match:
        raise ValueError(f"index.html 中找不到项目图片入口 {key}")
    button_tag, body, closing = match.group(1), match.group(2), match.group(3)
    count = len(images)
    button_tag = set_attr(button_tag, "aria-label", f"查看{title}的项目图片，共 {count} 张")
    count_pattern = re.compile(r'(<span\b[^>]*\bdata-gallery-count[^>]*>)(.*?)(</span>)', re.S)
    body, found = count_pattern.subn(lambda item: item.group(1) + str(count) + item.group(3), body, count=1)
    if not found:
        raise ValueError(f"项目图片入口 {key} 缺少数量标记")
    preview_pattern = re.compile(r'<img\b[^>]*\bdata-gallery-preview\b[^>]*>')
    preview_match = preview_pattern.search(body)
    if preview_match and images:
        first = images[0]["src"]
        width, height = (1, 1)
        # 尺寸在调用前已通过 image_size 计算，这里从 images 的私有字段读取
        width = int(images[0].get("_width") or 1200)
        height = int(images[0].get("_height") or 750)
        tag = preview_match.group(0)
        tag = set_attr(tag, "src", first)
        tag = set_attr(tag, "width", str(width))
        tag = set_attr(tag, "height", str(height))
        body = body[:preview_match.start()] + tag + body[preview_match.end():]
    return text[:match.start()] + button_tag + body + closing + text[match.end():]


def galleries_object(galleries: dict[str, list[dict]], project_text: dict[str, dict],
                     project_meta: dict[str, dict]) -> dict:
    result = {}
    for key in PROJECT_KEYS:
        fields = project_text.get(key, {})
        meta = project_meta.get(key, {})
        fallback = FALLBACK_TEXT[key]
        title = clean(meta.get("title")) or clean(fields.get("title")) or fallback["title"]
        type_name = clean(meta.get("type")) or f"项目图片 · {clean(fields.get('type')) or fallback['type']}"
        desc = clean(meta.get("desc")) or clean(fields.get("desc")) or fallback["desc"]
        label = clean(meta.get("label")) or title
        images = []
        for image in galleries.get(key, []):
            images.append({
                "src": image["src"],
                "alt": clean(image.get("alt")),
                "caption": clean(image.get("caption")),
            })
        if not images:
            raise ValueError(f"项目 {key} 至少需要一张图片")
        result[key] = {
            "label": label,
            "type": type_name,
            "title": title,
            "desc": desc,
            "images": images,
        }
    return result


def js_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def replace_galleries_js(js: str, payload: dict, newline: str) -> str:
    pattern = re.compile(r"[ \t]*/\* PUBLISHED_GALLERIES_START \*/.*?/\* PUBLISHED_GALLERIES_END \*/", re.S)
    lines = ["  /* PUBLISHED_GALLERIES_START */", "  const PROJECT_GALLERIES = {"]
    for key_index, key in enumerate(PROJECT_KEYS):
        item = payload[key]
        lines.append(f"    {key}: {{")
        lines.append(f"      label: {js_string(item['label'])},")
        lines.append(f"      type: {js_string(item['type'])},")
        lines.append(f"      title: {js_string(item['title'])},")
        lines.append(f"      desc: {js_string(item['desc'])},")
        lines.append("      images: [")
        for image_index, image in enumerate(item["images"]):
            comma = "," if image_index < len(item["images"]) - 1 else ""
            lines.append(
                "        { src: %s, alt: %s, caption: %s }%s"
                % (js_string(image["src"]), js_string(image["alt"]), js_string(image["caption"]), comma)
            )
        lines.append("      ]")
        lines.append("    }" + ("," if key_index < len(PROJECT_KEYS) - 1 else ""))
    lines.append("  };")
    lines.append("  /* PUBLISHED_GALLERIES_END */")
    replacement = newline.join(lines)
    updated, count = pattern.subn(lambda _match: replacement, js, count=1)
    if not count:
        raise ValueError("main.js 中找不到 PUBLISHED_GALLERIES 标记")
    return updated


def regenerate_font(root: Path, dry_run: bool, changed: set[str]) -> None:
    ttf = root / ".check/NotoSerifSC-500.ttf"
    out = root / "assets/fonts/noto-serif-sc-500.woff2"
    if not ttf.exists():
        print("跳过字体子集：找不到 .check/NotoSerifSC-500.ttf（仅本地发布时可用）")
        return
    chars: set[str] = set()
    for rel in ("index.html", "assets/js/main.js", "assets/css/style.css"):
        chars.update(read_text(root / rel))
    text = "".join(sorted(chars))
    char_file = root / ".check/page-chars.txt"
    if not dry_run:
        char_file.write_text(text, encoding="utf-8")
    command = [
        sys.executable, "-m", "fontTools.subset", str(ttf),
        "--text-file=" + str(char_file),
        "--flavor=woff2",
        "--output-file=" + str(out),
    ]
    if dry_run:
        print(f"将重新生成字体子集：{len(chars)} 个字符")
        return
    import subprocess
    subprocess.run(command, check=True)
    changed.add("assets/fonts/noto-serif-sc-500.woff2")
    try:
        from fontTools.ttLib import TTFont
        with TTFont(out) as font:
            cmap = font.getBestCmap()
        missing = sorted({char for char in chars if ord(char) > 31 and ord(char) not in cmap})
        print(f"字体子集已更新：{len(chars)} 个字符，{out.stat().st_size} 字节，缺失 {len(missing)} 个")
        if missing:
            print("  缺失字符：" + "".join(missing[:40]))
    except Exception as error:
        print(f"字体子集校验失败：{error}")


def main() -> int:
    parser = argparse.ArgumentParser(description="把浏览器导出的页面修改写入项目文件")
    parser.add_argument("edits", type=Path, help="nresume-edits-*.json")
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1], help="项目根目录")
    parser.add_argument("--dry-run", action="store_true", help="只检查，不写入文件")
    parser.add_argument("--skip-font", action="store_true", help="不重新生成宋体子集")
    args = parser.parse_args()

    root = args.root.resolve()
    edits_path = args.edits.resolve()
    if not edits_path.exists():
        print(f"找不到导出文件：{edits_path}")
        return 1
    if Image is None:
        print("需要 Pillow：python -m pip install pillow")
        return 1

    snapshot = json.loads(edits_path.read_text(encoding="utf-8"))
    if snapshot.get("version") != 1:
        print("不支持的导出文件版本，请重新从页面导出")
        return 1
    slots = snapshot.get("slots") or {}
    galleries = snapshot.get("galleries") or {}
    project_text = snapshot.get("projectText") or {}
    project_meta = snapshot.get("projectMeta") or {}
    if set(slots) != set(SLOT_KEYS):
        print("导出文件缺少图片位置，请重新从页面导出")
        return 1
    if set(galleries) != set(PROJECT_KEYS) or set(project_text) != set(PROJECT_KEYS):
        print("导出文件缺少项目数据，请重新从页面导出")
        return 1

    changed: set[str] = set()
    index_path = root / "index.html"
    js_path = root / "assets/js/main.js"
    index = read_text(index_path)
    js = read_text(js_path)

    # 1. 单图与备注
    for key in SLOT_KEYS:
        slot = slots[key]
        src = clean(slot.get("src"))
        note = clean(slot.get("note"), 80)
        if not src:
            raise ValueError(f"图片位置 {key} 没有 src")
        if src.startswith("data:"):
            src = save_slot_image(key, src, root, args.dry_run, changed)
        srcset = None
        if key == "avatar" and slot.get("src", "").startswith("data:"):
            # 360w 与 720w 两个版本使用同一套版本号
            large = src
            small_path = root / "assets/img/avatar-360.jpg"
            if small_path.exists():
                small_src = versioned("assets/img/avatar-360.jpg", small_path.read_bytes())
            else:
                small_src = large.replace("avatar-720", "avatar-360")
            srcset = f"{small_src} 360w, {large} 720w"
        index = replace_slot_img(index, key, src, note, srcset)
        if key.startswith("life-"):
            index = replace_deck_button(index, key, src, note)

    # 2. 项目图片
    for key in PROJECT_KEYS:
        images = []
        for index_number, image in enumerate(galleries[key], start=1):
            src = clean(image.get("src"))
            if not src:
                raise ValueError(f"项目 {key} 的第 {index_number} 张图片没有 src")
            if src.startswith("data:"):
                data = encode_webp(open_data_url(src))
                rel = f"assets/img/{GALLERY_NAMES[key]}-{index_number}.webp"
                if write_bytes(root / rel, data, args.dry_run):
                    changed.add(rel)
                src = versioned(rel, data)
            width, height = image_size(src, root)
            images.append({
                "src": src,
                "alt": clean(image.get("alt")),
                "caption": clean(image.get("caption"), 80),
                "_width": width,
                "_height": height,
            })
        title = clean(project_text[key].get("title")) or FALLBACK_TEXT[key]["title"]
        clean_images = [{k: v for k, v in image.items() if not k.startswith("_")} for image in images]
        index = update_project_preview(index, key, title, images)
        project_text_for_js = dict(project_text[key])
        project_text_for_js["title"] = title
        galleries[key] = clean_images
        project_text[key] = project_text_for_js

    # 3. 项目文字
    for key in PROJECT_KEYS:
        index = update_project_text(index, key, project_text[key])

    # 4. main.js 默认项目图片与文案
    payload = galleries_object(galleries, project_text, project_meta)
    newline = "\r\n" if "\r\n" in js else "\n"
    js = replace_galleries_js(js, payload, newline)

    if write_text(index_path, index, args.dry_run):
        changed.add("index.html")
    if write_text(js_path, js, args.dry_run):
        changed.add("assets/js/main.js")

    if not args.skip_font:
        regenerate_font(root, args.dry_run, changed)

    if changed:
        action = "将更新" if args.dry_run else "已更新"
        print(f"{action} {len(changed)} 个文件：")
        for rel in sorted(changed):
            print("  " + rel)
        if not args.dry_run:
            print("请检查 git diff，然后提交并推送；GitHub Pages 会在 1–2 分钟内生效。")
    else:
        print("没有需要写入的修改。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
