---
name: Soft Editorial Portfolio
colors:
  background: '#F4F5F8'
  background-soft: '#EDEFF2'
  card: '#FFFFFF'
  card-soft: '#FCFCFD'
  ink: '#16171A'
  ink-secondary: '#61636A'
  ink-tertiary: '#8D8F96'
  line: '#E4E6E9'
  line-strong: '#D4D6DB'
  dark: '#0F1013'
  white: '#FFFFFF'
typography:
  display-xl:
    fontFamily: Noto Serif SC
    fontSize: 4.4rem
    fontWeight: '500'
    lineHeight: '0.98'
    letterSpacing: -0.035em
  display-lg:
    fontFamily: Noto Serif SC
    fontSize: 2.9rem
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Noto Serif SC
    fontSize: 2.7rem
    fontWeight: '500'
    lineHeight: '1.5'
    letterSpacing: 0.005em
  headline-md:
    fontFamily: Noto Serif SC
    fontSize: 2rem
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: 0.01em
  headline-sm:
    fontFamily: Noto Serif SC
    fontSize: 1.55rem
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 1.0625rem
    fontWeight: '400'
    lineHeight: '1.75'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: '1.75'
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: '1.7'
    letterSpacing: '0'
  label-md:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.16em
  index:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 12px
  DEFAULT: 18px
  lg: 24px
  full: 9999px
spacing:
  wrap: 1180px
  gutter: 24px
  section-y: 62px
  section-y-tablet: 50px
  section-y-mobile: 40px
  stack-xs: 8px
  stack-sm: 12px
  stack-md: 20px
  stack-lg: 32px
  stack-xl: 56px
---

## Brand & Style

A warm, quiet editorial portfolio: paper-like gray canvas, white rounded cards, serif display type, and a small cast of hand-drawn mascots. The page should feel like a well-made personal zine rather than a corporate template — calm, human, and confident, with just enough craft details to be memorable.

The page opens with a large 廖楠 masthead; a personal meta line (26岁 | 中共党员 | 管理科学与工程硕士) sits beneath it, followed by two intro paragraphs. The N'RESUME name carries through the header, footer, browser title, and sharing cover.

### Personality & Tone

- **Warm & Approachable:** Off-white gray ground and soft shadows replace stark white and hard rules. Nothing is pure chrome; every surface has a slight temperature.
- **Editorial, Not Corporate:** Chinese serif display type carries the personality. Large names, generous line height, and numbered section heads read like a printed profile.
- **Crafted Details:** Pill buttons, circular portraits, hairline dividers, small monochrome mascots, a stacked photo deck, and a black contact card create rhythm without decoration for decoration's sake.
- **Quiet Confidence:** Restrained color (ink, gray, one near-black block), restrained motion, and lots of breathing room. Emphasis comes from scale and weight, never from accent color.

### Design Movement

Soft Editorial / Warm Minimalism. A contemporary take on the personal-profile zine: Swiss discipline in spacing, but softened with serif display faces, large radii, and monochrome illustration.

### Non-negotiables

- No accent hues. The complete palette is warm gray, white, and near-black.
- No photography outside the avatar, project images, and interest images.
- Mascots are monochrome line art; never recolor them or add gradients.
- The page never exceeds the viewport width at any breakpoint.

## Colors

The palette is intentionally tiny: one canvas tone, two white surfaces, three ink levels, two hairlines, and one near-black block.

### Surfaces

- **Canvas (`#F4F5F8`):** Warm-cool light gray used for the page background. This is the default ground; white cards float on it.
- **Canvas Soft (`#EDEFF2`):** Secondary ground for inset areas, empty media frames, and quiet blocks.
- **Card (`#FFFFFF`):** Primary content surface. Cards are separated from the canvas by a 1px hairline and a soft shadow, not by color contrast alone.
- **Card Soft (`#FCFCFD`):** Inner panels and notes that need to sit one step below the card.
- **Dark (`#0F1013`):** The contact card and footer. Used exactly twice; this is the page's only high-contrast moment.

### Ink

- **Ink (`#16171A`):** Headlines, serif display, active labels, primary buttons.
- **Ink Secondary (`#61636A`):** Body copy, descriptions, metadata.
- **Ink Tertiary (`#8D8F96`):** Eyebrows, section indices, captions, gallery hints, placeholders.
- **Line (`#E4E6E9`):** Default hairline for cards, dividers, and list separators.
- **Line Strong (`#D4D6DB`):** Outlined pills, avatar ring, and controls that need slightly more presence.

### Semantic Rules

- Active/selected states invert to ink (`#16171A`) with white text, or gain a 2px ink underline. No colored badges.
- The only "status" color is the dot: a 6px near-black dot next to section titles, plus a solid ink dot in the availability badge.
- Focus is always a 2px ink outline with 3px offset; never a glow or colored ring.
- On the dark card, text is white; secondary text is `rgba(255,255,255,.66)`; hairlines are `rgba(255,255,255,.14)`; buttons invert to white fill with ink text.

## Typography

Two families, strictly separated by role.

### Serif — Noto Serif SC 500

Used for everything that should feel authored:

- Hero masthead (`clamp(2.6rem, 5.2vw, 4.4rem)` desktop, `clamp(1.72rem, 7vw, 2.05rem)` mobile, line-height .98), with the meta line 「26岁 | 中共党员 | 管理科学与工程硕士」as the subtitle
- Section question
- Section titles and project titles
- Data values in the campus and project sections; both use the shared `--data-size` token so numerals stay consistent across the page
- Contact card headline
- Footer name

Never use the serif for body copy, navigation, buttons, tags, or metadata. The self-hosted subset (`assets/fonts/noto-serif-sc-500.woff2`) covers every character used on the page.

### Sans — Inter 400 / 500 / 600

Used for everything functional:

- Body and descriptions: 15px / 1.75, ink secondary
- Small labels and eyebrows: 11px, 500, uppercase, letter-spacing .16–.18em
- Buttons and pills: 12.5–13.5px, 500
- Section indices: 11px, 500, letter-spacing .1em
- Chinese body text falls back to PingFang SC / Microsoft YaHei after Inter.

### Typographic Rules

- Display type uses slight negative tracking (-.015em to -.035em) for a tight, printed lockup.
- Labels use open tracking (+.1em to +.18em) so small text stays legible and feels intentional.
- No italics. No all-caps body text. No faux-bold.
- Line length is capped around 600–660px for paragraphs; the hero lead fills the copy column edge to edge.

## Layout & Spacing

A single centered column, `min(100% - 48px, 1180px)`, with compact vertical sections (`62px` desktop, `50px` tablet, `40px` mobile). The page is long by design; sections are numbered 01–07 and separated by a hairline section head. The narrative order is education → work → projects → campus, so a reader meets the academic foundation and professional work before the campus chapter.

### Grid Mechanics

- **Hero:** two columns — text (fluid) and portrait figure (fixed 320px max). Below 900px the copy becomes a single column and the portrait moves to the top-right corner as a 76–112px avatar, with the masthead width capped so the two never overlap.
- **Education:** one white card with rows separated by hairlines. The degree level appears once, as the right-side badge; the major line no longer repeats "硕士" / "本科", and the language tags have been removed.
- **Experience:** vertical stack of accordion cards. Both start open; each head is a full-width button that collapses or expands its own panel independently.
- **Projects:** a two-column grid of equal cards; each card starts with a type/title block and a top-right image trigger, then a description, a three-metric hairline row, and a tag footer. The grid becomes one column at 900px.
- **Campus:** one feature card split into an aside (dates, serif role, tags) and a body (four-cell stat strip first, then the two-row detail list). It follows the project grid as a quieter closing chapter.
- **Skills:** one rounded panel with three hairline-divided columns of category chips (办公应用 / AI 工具 / 内容编辑; one column on mobile).
- **Interests:** a narrow left rail with only the full-body mascot, plus a stacked deck of four 3:4 cards that scatters into a full grid on click. There are no category filters.
- **Contact:** one full-width black card, two columns on desktop (copy + actions | contact rows).
- **Footer:** black, flush with the contact card's visual block, ending the page.

### Spacing Discipline

- Section vertical padding: 62px desktop / 50px tablet / 40px mobile.
- Card padding: 28–40px desktop, 20–22px mobile.
- Hairline dividers replace most margins inside cards.
- Never use more than one accent of space between related items: 8 / 12 / 20 / 32 / 56.

## Elevation & Depth

Depth is soft and minimal, never skeuomorphic.

- **Cards:** 1px `#E4E6E9` border plus `--shadow-sm` (`0 1px 2px rgba(15,16,19,.04), 0 10px 30px -24px rgba(15,16,19,.3)`).
- **Large feature cards / deck:** `--shadow-md` (`0 2px 6px rgba(15,16,19,.04), 0 30px 70px -44px rgba(15,16,19,.4)`).
- **Floating badge, toast, lightbox:** stronger shadow, still soft and diffuse; never a hard black drop shadow.
- **Stacked deck:** depth is expressed by translate/scale/rotation offsets per card (`--i`), not by shadows alone. Only the top four cards are visible; the rest wait behind.
- **No glassmorphism.** Header blur (`backdrop-filter`) is the only blur, and only once the page is scrolled.
- **Dark blocks have no shadow**; they read as solid ink.

## Shapes

- **Cards:** 18px default, 24px for large feature panels, 20–22px on mobile.
- **Media frames:** 12–14px inner radius; project gallery thumbnails use 12px.
- **Pills and tags:** fully rounded (`999px`).
- **Avatar:** perfect circle with a 1px ring and a white gap between ring and photo.
- **Buttons:** pill-shaped, min-height 46px.
- **Mascots:** organic line art, always inside a circular or transparent badge.
- **Illustrations:** geometric, monochrome, slightly naive; no facial detail beyond simple dots and a smile.

## Components

### Buttons

- **Primary:** ink background, white text, pill radius, min-height 46px, padding 0 22px. Hover lifts the background to `#2A2C31` and translates -1px.
- **Secondary / outlined:** transparent or white background, 1px `--line-strong` border, ink text; hover darkens the border to ink.
- **Inverse (on dark):** white fill, ink text. Outlined inverse uses a `rgba(255,255,255,.34)` border and white text.
- **Icon buttons:** 34–40px circles with a 1px border; used for accordion toggles, menu close, lightbox close, and back-to-top.
- **Active press:** `transform: scale(.985)`; no color flash.

### Pills, Tags & Badges

- **Tag:** 28px min-height, 1px `--line`, translucent white fill, 12px text, ink-secondary.
- **Editing outline:** project text fields that can be edited get a 1px dashed `--line-strong` outline with 3px offset; the focused field switches to a 2px solid ink outline and a white fill.
- **Badge:** 28px pill, 11.5px text. Variants: default outlined, `--dark` (ink fill), `--soft` (canvas fill, tertiary text).
- **Availability badge:** white pill with a 5–6px ink dot and uppercase tracked label; floats over the avatar ring.

### Cards

- **Static card:** white, 1px line, 18–24px radius, soft shadow. No hover movement.
- **Accordion card:** head is a button with role/org/dates on the left, tags and a circular +/− toggle on the right. Open state lifts the border to `--line-strong` and reveals a panel separated by a hairline.
- **Project card:** type/title block with a top-right gallery trigger, description, a three-metric hairline row, and a tag footer. Three cards sit as equal columns on desktop; the trigger shows the latest cover, an image count badge, and a small "项目图片 ↗" cue.
- **Campus card:** a two-column feature card. The left aside carries dates, a serif role, and bottom-aligned tags; the right body opens with a four-cell stat strip, followed by the two-row detail list. Collapses to one column at 900px.
- **Stat card:** 2×2 cells divided by hairlines; serif numerals with small sans labels.
- **Contact card:** near-black, 24px radius, serif headline, two CTAs, then four contact rows separated by translucent hairlines.

### Project Text Editing

- The project section head carries an "编辑文字" pill next to the section dot; the footer repeats the entry so it is reachable after a long scroll. Both toggle the same mode and label themselves "完成编辑" while active. These entries, the footer "替换图片" link, and the image manager are owner-only: visitors never see them. Owner mode is enabled once with `?edit=1` / `#edit` and remembered in `localStorage`; `?edit=0` clears it. Local previews are always in owner mode.
- Entering edit mode exposes every type, title, description, metric, result, and tag on the three project cards as `contenteditable` text boxes with `role="textbox"` and field-specific labels. Dashed outlines mark editable fields without changing the card frame.
- A soft edit bar above the grid explains that changes save automatically and holds "恢复默认文字". Exiting edit mode removes the outlines and normalizes empty fields back to defaults.
- Edits are stored per project in `localStorage` under `nresume:project-text:<project-key>`; only fields that differ from defaults are written. Project titles and descriptions also flow into the gallery trigger labels, lightbox, and image manager.
- Enter finishes the current field; Esc leaves edit mode; pasted text is flattened to plain text; field lengths match the display limits (title 80, description 400, result 100, type 60, metrics/tags 24).
- Any tap or click outside the active field commits immediately, so the behavior is the same on phones and desktop.

### Navigation

- **Header:** fixed, 72px tall, transparent at the top; after 8px of scroll it gains a translucent canvas background, blur, and a hairline bottom border.
- **Brand:** a single serif N'RESUME wordmark, no subtitle.
- **Links:** six text links in page order (教育 / 经历 / 项目 / 校园 / 技能 / 兴趣), 13px, ink-secondary, 8px gap; active link is ink with a 2px underline and `aria-current="location"`. The mobile menu also includes 联系我.
- **Right side:** availability status text, a dark pill "联系我", and a circular menu button below 1080px.
- **Mobile menu:** full-screen canvas overlay with large serif links, staggered entrance, and a close button; background content is `inert`.

### Interests Deck

- **Rail:** full-body mascot only on desktop; the former 全部 / 日常 / 出行 / 灵感 filters have been removed. The mascot is hidden below 640px.
- **Deck:** four 3:4 cards (跳舞 / 烹饪 / 烘焙 / 羽毛球) stacked with progressive offsets. The top card has a caption pill. Clicking any card scatters all four into a 2×2 grid at every breakpoint, with a slight rotation and vertical offset per card so it reads like photos laid out on a table; the full set is visible at a glance.
- **Spread controls:** a single pill under the deck reads "展开" when stacked and "收起" when spread. The pill carries `aria-expanded` and is the explicit way back to the stack.
- **Expanded cards:** while spread, cards are not clickable and do not open the lightbox; only the pill collapses the deck. All four cards stay in the deck at every breakpoint. Below 640px the mascot is hidden.
- **Illustrations:** monochrome dancing, cooking, baking, and badminton scenes, with one soft gray circle motif.

### Lightbox

- Full-screen ink scrim (`rgba(15,16,19,.64)`) with backdrop blur.
- Two-column white panel: media left, type/title/description/caption right. The media area holds the current image, a counter pill, circular prev/next buttons, and a thumbnail strip for multi-image galleries.
- Opens from project gallery triggers only. Focus moves to close, Tab is trapped, Esc and backdrop click close, and focus returns to the trigger.
- The caption under the image is the image's editable note. Multi-image galleries support thumbnail selection, `←` / `→` / `Home` / `End`, and horizontal pointer swipes on touch devices. The image fades/scales slightly when switching; `prefers-reduced-motion` disables it.

### Image Manager

- Opened from a low-contrast "替换图片" link in the footer (owner mode only).
- Modal dialog over the ink scrim: white 24px panel, fixed header and footer, scrollable body, close button and Esc.
- Six single-image slots grouped as 头像与 IP / 兴趣爱好, each with a thumbnail, label, recommended ratio, a note field, "选择图片" pill, and a per-slot "恢复默认" link once replaced or annotated.
- Three project gallery blocks grouped under 项目图片. Each block shows its current thumbnails with 替换 / 移除 overlays, an editable note field under every image, an "添加图片" tile, a count line, and a gallery-level "恢复默认" link.
- Notes are capped at 80 characters. Project notes appear below the image in the lightbox; interest-card, avatar, and IP notes act as image hover titles and stay available in the manager.
- Project galleries accept up to eight images and always keep at least one; multiple files can be added at once.
- The footer holds "导出修改", "全部恢复默认", and "完成". Resetting an image or gallery also clears its notes.
- Images are compressed in-browser to max 1200px and stored as data URLs in `localStorage` (`nresume:image:*` for single slots, `nresume:gallery:*` for project galleries). Project gallery values are image objects with `src`, `alt`, and `caption`; single-slot notes use `nresume:note:*`. This is a local preview, not a server-side edit.
- "导出修改" downloads a full page snapshot as JSON (`nresume-edits-*.json`): every single-image slot (data URL when replaced, otherwise its path), every note, all project galleries, all project text fields, and the derived project metadata used by the lightbox. `tools/publish_edits.py` bakes that snapshot into `assets/img`, `index.html`, and `assets/js/main.js`, and regenerates the font subset when needed.
- Only raster formats are accepted (JPG / PNG / WebP / AVIF). SVG and GIF are rejected.

### Feedback

- **Toast:** ink pill, white text, bottom center, auto-dismiss after 2.2s; used for image changes and "邮箱已复制".
- **Live regions:** visually hidden status text for lightbox image position and project editing toasts.

## Motion

- Standard easing: `cubic-bezier(.22,.61,.36,1)`; durations 180–400ms.
- **Reveal:** sections and cards fade up 18px when they enter the viewport, once. A noscript / timeout fallback removes the hidden state if JS fails.
- **Accordion:** all panels start open; each height animates via measured `max-height` and toggles independently.
- **Gallery:** prev/next changes fade and slightly scale the image; thumbnails and the counter update immediately.
- **Deck:** cards transition transform and opacity; opening the deck deals the four cards out with a short stagger, a slight rise, and a rotation into their scattered positions.
- **Header:** background and border fade in after 8px of scroll.
- **Reduced motion:** all reveals, transforms, and smooth scrolling are disabled; content remains fully visible.

## Accessibility

- Skip link to main content; visible 2px ink focus ring everywhere.
- Landmarks: header, nav, main, sections with accessible names, footer.
- Accordion buttons use `aria-expanded` / `aria-controls`; closed panels are `inert`.
- Interest cards are real buttons with captions. While stacked, all four cards are in the Tab order and clicking one spreads the deck. While spread, cards get `tabindex="-1"` and clicks do nothing; the deck toggle reads "展开" / "收起", updates `aria-expanded`, and announces the state through the existing live region.
- Project gallery triggers use `aria-haspopup="dialog"` and `aria-controls`. The lightbox supports thumbnail buttons with `aria-current`, labelled prev/next buttons, arrow/Home/End keys, pointer swipes, and an `aria-live` position announcement. Image notes are exposed as the lightbox caption and in thumbnail `aria-label`s.
- Project text editing uses `aria-pressed` on the section toggle and labels every editable field with its project and field name; exiting removes the editing affordances. Esc exits the mode and returns focus to the toggle.
- Menu, lightbox, and image manager: `aria-hidden` + `inert` on the background, body scroll lock, Esc to close, Tab trap, focus return.
- Image manager actions return focus to the corresponding gallery button after add / replace / remove / reset. Every note field has an explicit accessible label, and long notes are capped at 80 characters.
- Images have explicit dimensions, `alt` text, and lazy loading below the fold.
- The dark contact card and footer meet contrast for body text; tertiary ink is reserved for large or non-essential text.
- No information is conveyed by color alone.

## Implementation Notes

- Plain HTML/CSS/JS; no framework, no build step. All assets are local.
- The image manager is a client-side preview: single-image and project-gallery replacements live in `localStorage` for the current browser. Permanent asset changes require replacing files in `assets/img` and redeploying.
- Project text edits are a client-side preview too, stored under `nresume:project-text:<project-key>` with only changed fields; "恢复默认文字" removes those keys. Other visitors see the defaults in the HTML.
- Design tokens live at the top of `assets/css/style.css`; components consume variables, not raw hex values.
- Breakpoints: 1180px (project grid three → two columns, last card spans), 1080px (nav → menu), 900px (grids collapse to one column; hero copy becomes single-column with a top-right avatar), 640px (compact mobile masthead, stacked CTAs, two-column manager galleries, 300px deck), 400px, 380px (small-phone trims and a 76px avatar).
- Container width is capped at 1180px with 24px side margins (16px on mobile).
- All image assets are raster (JPG / PNG / WebP); the page does not reference SVG files.
- The self-hosted Noto Serif SC subset and Inter files are preloaded in `index.html`; the OG cover is generated from the same tokens.
- Keep `og:image`, canonical URL, and favicon in sync with the deployment URL.
