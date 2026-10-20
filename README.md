# 廖楠 · 个人求职主页

单页静态求职主页，用来展示教育、工作与校园经历、项目、技能、作品集、生活切片与联系方式。视觉采用「暖灰纸上编辑」风格：`#F4F5F8` 暖灰画布、白色大圆角卡片、宋体大标题与数字、胶囊按钮、圆形头像、手绘 IP 小人、黑色联系卡，以及作品集双层筛选和生活区卡牌堆叠。

内容严格以根目录简历 PDF 为准，不虚构经历、时间、论文数量或项目结果。年龄、性别、党员身份默认不展示。

## 当前状态

- 首屏 + 9 个编号章节：01 关于、02 教育背景、03 工作经历、04 项目经历、05 校园经历、06 技能、07 作品集、08 工作之外、09 联系我。
- 教育背景排在工作经历之前；校园新媒体经历单独成章，不再混在项目卡片里。
- 桌面端英雄区双栏、校园经历左右双栏、项目两栏等宽、作品集封面与文案双栏；手机端全部单栏，校园经历数据变为 2×2，作品集标签自动换成两行。
- 技能区沿用三列技能卡片 + AI 工作流的版式，技能以胶囊标签呈现。
- 生活区为六张 3:4 卡牌堆叠，支持分类筛选、点选置顶与灯箱查看。
- 项目封面与生活切片使用原创单色 SVG 占位图，页面内已标注，可直接替换成真实素材。
- 字体、图标、图片与 PDF 全部本地化，不依赖 Google Fonts 或第三方运行时。
- 已部署到 GitHub Pages：<https://lnan01089-blip.github.io/lnan-resume/>

## 技术栈

原生 HTML + CSS + JavaScript，无框架、无构建步骤、无后端。

字体自托管：

- **Inter** 400 / 500 / 600（`assets/fonts/inter-latin-*.woff2`），用于正文、标签、按钮与导航。
- **Noto Serif SC** 500（`assets/fonts/noto-serif-sc-500.woff2`），仅保留页面实际用到的字符，约 96KB，用于标题、姓名、数字与联系卡大标题。

中文字符若不在子集内会回落到系统的苹方 / 宋体 / 微软雅黑。新增中文文案后，需要重新生成宋体子集；否则新字会以回退字体显示。

## 目录结构

```text
.
├── index.html
├── DESIGN.md                 # 设计系统（颜色、字体、组件、动效、无障碍）
├── README.md
├── 廖楠-求职简历.pdf          # 页面下载链接使用的正式文件
├── 廖楠—18374627109(1).pdf    # 原始简历备份
└── assets
    ├── css/style.css
    ├── js/main.js
    ├── fonts
    │   ├── inter-latin-{400,500,600}-normal.woff2
    │   └── noto-serif-sc-500.woff2
    └── img
        ├── avatar-720.jpg / avatar-360.jpg
        ├── mascot-head.svg     # 关于我标题旁的圆形 IP 头
        ├── ip-nan.svg          # 工作之外区的全身 IP
        ├── favicon.svg
        ├── og-cover.png        # 1200 × 630 分享封面
        ├── work-*.svg / pf-site.svg
        └── life-1.svg … life-6.svg
```

## 本地预览

```bash
python -m http.server 8000 --bind 127.0.0.1
```

打开 <http://127.0.0.1:8000/>。建议用本地服务器预览，确保 PDF 下载、字体加载与相对路径行为与线上一致。

## 交互

- **经历手风琴**：默认展开最近一段，同时只展开一项；按钮带 `aria-expanded`，关闭面板为 `inert`。
- **作品集双层筛选**：先按分类（全部 / 产品 / 研究 / 内容 / 个人主页）过滤标签页，再在标签页之间切换；标签支持方向键、Home / End，面板切换有淡入动效。
- **灯箱**：作品封面与生活卡牌共用；点击打开，按钮、遮罩或 Esc 关闭，带焦点陷阱、焦点返回与背景 `inert`。
- **生活区卡牌**：全部 / 日常 / 出行 / 灵感筛选；点击后排卡牌会置顶，点击最上层卡牌打开灯箱。
- **邮箱复制**：一键复制并弹出轻提示，失败时回退到手动选择。
- **手机菜单**：全屏抽屉、Esc 关闭、焦点陷阱、背景滚动锁定，点击链接后平滑滚动到对应章节。
- **滚动反馈**：页头在滚动后出现毛玻璃与细线；导航随章节高亮。
- **动效降级**：`prefers-reduced-motion` 下关闭入场、位移与平滑滚动。

## 素材替换

- **头像**：替换 `assets/img/avatar-720.jpg`（720 × 720）与 `avatar-360.jpg`（360 × 360），保持 1:1 正方形、人物居中。
- **生活区照片**：建议统一 3:4 竖图，主体居中；替换 `life-*.svg` 的 `src` 与 `alt`。
- **项目封面**：建议 16:10；替换 `work-*.svg` 或 `pf-site.svg`。
- **个人 IP**：替换 `ip-nan.svg`（全身）或 `mascot-head.svg`（圆形头像），保持单色、透明背景。
- **社交分享图**：替换 `assets/img/og-cover.png`，尺寸保持 1200 × 630。
- **Favicon**：替换 `assets/img/favicon.svg`。

替换图片时保留现有 `width`、`height`、`loading` 与 `alt` 属性，避免布局跳动并保持无障碍语义。

### 重新生成宋体子集

安装了 `fonttools` 后，可从完整 Noto Serif SC 字体中按页面字符生成子集：

```bash
pyftsubset NotoSerifSC-Regular.otf \
  --text-file=page-chars.txt \
  --flavor=woff2 \
  --output-file=assets/fonts/noto-serif-sc-500.woff2
```

`page-chars.txt` 应包含 `index.html`、`main.js` 与 CSS 中出现的全部字符。修改文案后重新执行，并确认页面上的宋体没有回退。

## 简历 PDF

页面中的下载按钮统一指向根目录 `廖楠-求职简历.pdf`（1 页）。`廖楠—18374627109(1).pdf` 仅作原始备份，不再被页面引用。

替换 PDF 时保留文件名即可；若改名，需要同步更新 `index.html` 中所有对应链接。文件名含中文，链接已做百分号编码。

## 无障碍与质量

- 跳过导航链接、可见的 2px 焦点环、`aria-current`、`aria-expanded`、`aria-pressed`、`aria-controls`。
- 作品标签使用 `role="tablist" / tab / tabpanel`、漫游 `tabindex` 与方向键操作；筛选结果通过 `aria-live` 播报。
- 灯箱与移动菜单均支持 Esc、Tab 焦点陷阱、焦点返回与背景 `inert`。
- 正文使用 `#61636A`，辅助索引使用 `#8D8F96`；信息不依赖颜色单独传达。
- 图片带替代文本、显式尺寸与懒加载；无 JS 时内容仍然可见。
- 目标：Lighthouse Performance、Accessibility ≥ 90。

## 部署

当前托管在 GitHub Pages：

- 仓库：<https://github.com/lnan01089-blip/lnan-resume>
- 线上地址：<https://lnan01089-blip.github.io/lnan-resume/>

发布方式：将 `main` 分支根目录推送到 GitHub，在仓库 **Settings → Pages** 中选择 `Deploy from a branch` → `main` → `/ (root)`。页面无需构建，推送后 1–2 分钟生效。

也可以原样托管到 Netlify、Vercel 或任意静态服务器，保持相对路径不变即可。

若绑定自定义域名，请同步更新 `index.html` 中的 `canonical`、`og:url` 与 `og:image` 为新的绝对地址，确保社交平台能抓取分享封面。
