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
    fontSize: 5.4rem
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

The page opens with a large N'RESUME masthead; 廖楠 · LIAO NAN sits beneath it as the personal subtitle. The same lockup carries through the header, footer, browser title, and sharing cover.

### Personality & Tone

- **Warm & Approachable:** Off-white gray ground and soft shadows replace stark white and hard rules. Nothing is pure chrome; every surface has a slight temperature.
- **Editorial, Not Corporate:** Chinese serif display type carries the personality. Large names, generous line height, and numbered section heads read like a printed profile.
- **Crafted Details:** Pill buttons, circular portraits, hairline dividers, small monochrome mascots, a stacked photo deck, and a black contact card create rhythm without decoration for decoration's sake.
- **Quiet Confidence:** Restrained color (ink, gray, one near-black block), restrained motion, and lots of breathing room. Emphasis comes from scale and weight, never from accent color.

### Design Movement

Soft Editorial / Warm Minimalism. A contemporary take on the personal-profile zine: Swiss discipline in spacing, but softened with serif display faces, large radii, and monochrome illustration.

### Non-negotiables

- No accent hues. The complete palette is warm gray, white, and near-black.
- No photography outside the avatar, portfolio covers, and life cards.
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
- **Ink Tertiary (`#8D8F96`):** Eyebrows, section indices, captions, inactive tabs, placeholders.
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

- Hero masthead (`clamp(3rem, 6.2vw, 5.4rem)`, line-height .98), with 廖楠 · LIAO NAN as the tracked subtitle
- Hero claim, about statement, section question
- Section titles, project and portfolio titles
- Big stat numbers
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
- Line length is capped around 600–660px for paragraphs; the hero lead is capped at 520px.

## Layout & Spacing

A single centered column, `min(100% - 48px, 1180px)`, with compact vertical sections (`62px` desktop, `50px` tablet, `40px` mobile). The page is long by design; sections are numbered 01–09 and separated by a hairline section head. The narrative order is education → work → projects → campus, so a reader meets the academic foundation and professional work before the campus chapter.

### Grid Mechanics

- **Hero:** two columns — text (fluid) and portrait figure (fixed 320px max). Collapses to a single column below 900px with the portrait after the copy.
- **About:** statement + bio on the left, a 2×2 stat card on the right; stats are separated by 1px hairlines, not gaps.
- **Education:** one white card with rows separated by hairlines; language tags sit underneath.
- **Experience:** vertical stack of accordion cards. All three start open; each head is a full-width button that collapses or expands its own panel independently.
- **Projects:** a two-column grid of equal cards; each card ends with a three-metric hairline row and a tag footer.
- **Campus:** one feature card split into an aside (dates, serif role, organization, badge, tags) and a body (detail list + four-cell stat strip). It follows the project grid as a quieter closing chapter.
- **Skills:** one rounded panel with three hairline-divided columns of category chips, plus a full-width AI-workflow footer row. This deliberately keeps the earlier chip-board layout instead of the long list treatment.
- **Portfolio:** filter pills above a tablist; the active tab controls one large two-column panel (cover left, copy right). Tabs wrap to two rows on mobile instead of scrolling.
- **Life:** a narrow left rail with the full-body mascot and vertical filters, plus a centered stacked deck of six 3:4 cards.
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
- **Media frames:** 12–14px inner radius; portfolio covers use 12px.
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
- **Filter pill:** 34px height, 1px `--line-strong`; active state is a solid ink pill with white text.
- **Badge:** 28px pill, 11.5px text. Variants: default outlined, `--dark` (ink fill), `--soft` (canvas fill, tertiary text).
- **Availability badge:** white pill with a 5–6px ink dot and uppercase tracked label; floats over the avatar ring.

### Cards

- **Static card:** white, 1px line, 18–24px radius, soft shadow. No hover movement.
- **Accordion card:** head is a button with role/org/dates on the left, tags and a circular +/− toggle on the right. Open state lifts the border to `--line-strong` and reveals a panel separated by a hairline.
- **Project card:** title, description, a three-metric hairline row, and a tag footer. Both projects sit as equal halves of the two-column grid.
- **Campus card:** a two-column feature card. The left aside carries dates, a serif role, organization, badge, and bottom-aligned tags; the right body carries a two-row detail list and a four-cell stat strip. Collapses to one column at 900px.
- **Stat card:** 2×2 cells divided by hairlines; serif numerals with small sans labels.
- **Contact card:** near-black, 24px radius, serif headline, two CTAs, then four contact rows separated by translucent hairlines.

### Navigation

- **Header:** fixed, 72px tall, transparent at the top; after 8px of scroll it gains a translucent canvas background, blur, and a hairline bottom border.
- **Brand:** serif N'RESUME over a small tracked 廖楠 · LIAO NAN.
- **Links:** eight text links in page order (关于 / 教育 / 经历 / 项目 / 校园 / 技能 / 作品集 / 生活), 13px, ink-secondary, 8px gap; active link is ink with a 2px underline and `aria-current="location"`.
- **Right side:** availability status text, a dark pill "联系我", and a circular menu button below 1080px.
- **Mobile menu:** full-screen canvas overlay with large serif links, staggered entrance, and a close button; background content is `inert`.

### Portfolio

- **Filter row:** pill buttons that filter both the tablist and the visible entries.
- **Tablist:** text tabs with a 2px animated underline. Keyboard: arrows, Home/End. On mobile the tabs wrap onto two rows.
- **Panel:** copy on the left (eyebrow, serif title, meta, description, note block, tags) and the cover on the right. Switching tabs fades/rises the panel.
- **Cover:** button with a subtle hover zoom on the image and a "查看" cue; opens the lightbox.

### Life Deck

- **Rail:** full-body mascot above vertical filter buttons (全部 / 日常 / 出行 / 灵感).
- **Deck:** six 3:4 cards stacked with progressive offsets. The top card has a caption pill. Clicking a back card brings it to the front; clicking the top card opens the lightbox. Filters rebuild the stack and announce the count.
- **Illustrations:** monochrome city, coffee, hiking, reading, etc., with one soft gray circle motif.

### Lightbox

- Full-screen ink scrim (`rgba(10,11,13,.82)`) with backdrop blur.
- White media frame, close button top-right, type/title/description below.
- Opens from portfolio covers and life cards; focus moves to close, Tab is trapped, Esc and backdrop click close, focus returns to the trigger.

### Image Manager

- Opened from a low-contrast "替换图片" link in the footer.
- Modal dialog over the ink scrim: white 24px panel, fixed header and footer, scrollable body, close button and Esc.
- Thirteen replaceable slots grouped as 头像与 IP / 作品封面 / 生活切片. Each slot has a thumbnail, label, recommended ratio, "选择图片" pill, and a per-slot "恢复默认" link once replaced.
- The footer holds "全部恢复默认" and "完成".
- Images are compressed in-browser and stored as data URLs in `localStorage` under `nresume:image:*`; this is a local preview, not a server-side edit.

### Feedback

- **Toast:** ink pill, white text, bottom center, auto-dismiss after 2.2s; used for "邮箱已复制".
- **Live regions:** visually hidden status text for portfolio filter and life filter results.

## Motion

- Standard easing: `cubic-bezier(.22,.61,.36,1)`; durations 180–400ms.
- **Reveal:** sections and cards fade up 18px when they enter the viewport, once. A noscript / timeout fallback removes the hidden state if JS fails.
- **Accordion:** all panels start open; each height animates via measured `max-height` and toggles independently.
- **Tabs:** 2px underline slides via `right` transition; panel content fades in.
- **Deck:** cards transition transform and opacity; the new top card settles with a slight rotation.
- **Header:** background and border fade in after 8px of scroll.
- **Reduced motion:** all reveals, transforms, and smooth scrolling are disabled; content remains fully visible.

## Accessibility

- Skip link to main content; visible 2px ink focus ring everywhere.
- Landmarks: header, nav, main, sections with accessible names, footer.
- Accordion buttons use `aria-expanded` / `aria-controls`; closed panels are `inert`.
- Tabs use `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, roving `tabindex`, and arrow/Home/End keys.
- Filters use `aria-pressed`; results are announced via `aria-live`.
- Menu, lightbox, and image manager: `aria-hidden` + `inert` on the background, body scroll lock, Esc to close, Tab trap, focus return.
- Images have explicit dimensions, `alt` text, and lazy loading below the fold.
- The dark contact card and footer meet contrast for body text; tertiary ink is reserved for large or non-essential text.
- No information is conveyed by color alone.

## Implementation Notes

- Plain HTML/CSS/JS; no framework, no build step. All assets are local.
- The image manager is a client-side preview: replacements live in `localStorage` for the current browser. Permanent asset changes require replacing files in `assets/img` and redeploying.
- Design tokens live at the top of `assets/css/style.css`; components consume variables, not raw hex values.
- Breakpoints: 1080px (nav → menu), 900px (grids collapse to one column; hero stacks), 640px (mobile type scale, stacked CTAs, wrapped tabs, 300px deck), 380px (small-phone trims).
- Container width is capped at 1180px with 24px side margins (16px on mobile).
- The self-hosted Noto Serif SC subset and Inter files are preloaded in `index.html`; the OG cover is generated from the same tokens.
- Keep `og:image`, canonical URL, and favicon in sync with the deployment URL.
