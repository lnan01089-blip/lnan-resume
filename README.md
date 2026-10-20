# 廖楠 Personal Job-Seeking Homepage

单页静态 personal job-seeking homepage，用于展示经历、教育、项目、作品、能力与生活切片。视觉采用浅色瑞士编辑风：近白画布、碳黑文字、中性锌灰、1px 细线、4px 圆角，无阴影与模糊。

内容严格以根目录 PDF resume 为准，不虚构经历、时间、论文数量或项目结果。年龄、性别、党员身份默认不展示。

## 当前状态

- 10 个章节：Home、About、Experience、Education、Projects、Portfolio、Skills、Interests、Resume、Contact。
- 桌面端 Projects 三栏、Portfolio 四栏；平板两栏；手机端项目单栏、生活区两栏。
- 项目封面与生活区使用原创 SVG 占位图，并在页面中明确标注，后续可直接替换真实素材。
- 所有字体文件、图标、图片与 PDF 均为本地资源，不依赖 Google Fonts 或第三方运行时。

## 技术栈

原生 HTML + CSS + JavaScript，无框架、无构建步骤、无后端。Inter 以 `@font-face` 自托管（`assets/fonts/`，400 / 500 / 600 三个字重），全站统一使用 Inter；中文字符按字形回落到苹方、微软雅黑或思源黑体。CSS 中不再使用等宽字体。

## 目录结构

```text
.
├── index.html
├── README.md
├── 主页需求文档.md
├── 廖楠—18374627109(1).pdf
└── assets
    ├── css/style.css
    ├── js/main.js
    ├── fonts
    │   └── inter-latin-{400,500,600}-normal.woff2
    └── img
        ├── favicon.svg
        ├── og-cover.png
        ├── ip-nan.svg
        ├── work-*.svg
        ├── pf-site.svg
        └── life-1.svg … life-6.svg
```

## 本地预览

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

浏览器打开 `http://127.0.0.1:4173/`。建议使用本地服务器预览 PDF 的下载与在线打开行为。

## 交互

- 顶部滚动进度条与当前章节高亮。
- Experience 手风琴：默认展开最近一段经历，同时只展开一项，支持键盘操作。
- Portfolio 灯箱：点击打开、按钮/遮罩/Esc 关闭，带焦点陷阱与焦点返回。
- Interests 分类筛选：全部、日常、出行、灵感，并提供结果数量提示。
- 邮箱一键复制与轻量提示。
- 手机端全屏菜单：Esc 关闭、焦点陷阱、背景 `inert`、横屏可滚动。
- 支持 `prefers-reduced-motion`，关闭非必要动画。

## 素材替换

- **生活区照片**：放入 `assets/img/`，建议统一为 3:4 竖图，主体居中；替换 `life-*.svg` 的 `src` 与 `alt`。
- **项目封面**：建议统一为 16:10；替换 `work-*.svg` 或 `pf-site.svg` 的 `src`。
- **个人 IP**：替换 `ip-nan.svg` 即可，建议保持单色矢量与透明/近白背景。
- **社交分享图**：替换 `assets/img/og-cover.png`，建议尺寸 1200 × 630。
- **Favicon**：替换 `assets/img/favicon.svg`。

替换图片时保留现有 `width`、`height`、`loading` 与 `alt` 属性，避免布局跳动并保持无障碍语义。

部署到正式域名后，建议把 `index.html` 中的 `og:image` 改为可公开访问的绝对 URL，确保社交平台能抓取分享封面。

## Resume PDF

根目录 `廖楠—18374627109(1).pdf` 是唯一 resume 来源，目前为 1 页。页面中的三处链接使用百分号编码：页头 Resume PDF、首屏下载按钮、Resume 章节的下载与在线预览。

替换 PDF 时请保留原文件名；如改名，需要同步更新 `index.html` 中所有对应链接。

## 无障碍与质量

- 跳过导航链接、可见焦点样式、`aria-current`、`aria-expanded`、`aria-pressed`、`aria-controls`。
- 灯箱与移动菜单均支持 Esc、焦点陷阱与焦点返回。
- 小字号正文与标签使用次级锌灰 `#71717A`；三级锌灰 `#A1A1AA` 仅用于辅助索引、时间与编号。
- 图片带替代文本、显式尺寸与懒加载。
- 目标：Lighthouse Performance、Accessibility ≥ 90。

## 部署

可直接托管到 GitHub Pages、Netlify、Vercel 或任意静态服务器。保持相对路径不变即可，无需安装依赖或执行构建命令。
