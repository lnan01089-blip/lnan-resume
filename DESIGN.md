---
name: International Editorial
colors:
  surface: '#ffffff'
  surface-dim: '#dcd9dd'
  surface-bright: '#fbf8fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f2f7'
  surface-container: '#f0edf1'
  surface-container-high: '#eae7eb'
  surface-container-highest: '#e4e1e6'
  on-surface: '#1b1b1e'
  on-surface-variant: '#47464b'
  inverse-surface: '#303033'
  inverse-on-surface: '#f3f0f4'
  outline: '#77767b'
  outline-variant: '#c8c5cb'
  surface-tint: '#5f5e61'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1e'
  on-primary-container: '#858387'
  inverse-primary: '#c8c5ca'
  secondary: '#5d5e66'
  on-secondary: '#ffffff'
  secondary-container: '#e3e1ec'
  on-secondary-container: '#63646c'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1d1b16'
  on-tertiary-container: '#88837c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e4e1e6'
  primary-fixed-dim: '#c8c5ca'
  on-primary-fixed: '#1b1b1e'
  on-primary-fixed-variant: '#47464a'
  secondary-fixed: '#e3e1ec'
  secondary-fixed-dim: '#c6c5cf'
  on-secondary-fixed: '#1a1b22'
  on-secondary-fixed-variant: '#46464e'
  tertiary-fixed: '#e8e2d9'
  tertiary-fixed-dim: '#cbc6bd'
  on-tertiary-fixed: '#1d1b16'
  on-tertiary-fixed-variant: '#494640'
  background: '#ffffff'
  on-background: '#1b1b1e'
  surface-variant: '#e4e1e6'
typography:
  display:
    fontFamily: Inter
    fontSize: 4rem
    fontWeight: '600'
    lineHeight: 4.25rem
    letterSpacing: -0.035em
  display-mobile:
    fontFamily: Inter
    fontSize: 2.5rem
    fontWeight: '600'
    lineHeight: 2.75rem
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Inter
    fontSize: 2.5rem
    fontWeight: '500'
    lineHeight: 2.75rem
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: '500'
    lineHeight: 2.125rem
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 1.75rem
    fontWeight: '500'
    lineHeight: 2.125rem
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Inter
    fontSize: 1.25rem
    fontWeight: '500'
    lineHeight: 1.625rem
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
    letterSpacing: '0'
  label-md:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: 1rem
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.06em
  mono-index:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1rem
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 2rem
  margin-mobile: 1rem
  margin-desktop: 4rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies the principles of the International Typographic Style (Swiss Style) translated into a contemporary digital editorial environment. Designed for high-end architectural documentation, editorial portfolios, and exacting cultural institutions, the aesthetic prioritizes objective clarity, structural discipline, and strict visual austerity.

### Personality & Tone
- **Architectural & Rigorous:** Layouts respect an unyielding grid system, where whitespace acts as a structural mass rather than empty void.
- **Objective & Reductive:** Ornamentation is systematically eliminated. Visual impact stems purely from scale contrast, typographic precision, and structural rules.
- **Restrained Luxury:** Confidence conveyed through silence, precise margins, dense typographic hierarchies, and the total absence of decorative chroma.

### Design Movement
Swiss Minimalist Editorial. Drawing inspiration from Josef Müller-Brockmann, Massimo Vignelli, and contemporary gallery monographs, this design system operates strictly with neutral zinc grays, absolute blacks, and crisp mechanical typography.

## Colors

The palette operates under a strict achromatic constraint: no blue, cyan, or high-chroma accent colors exist within the system. Chromatic neutrality is preserved across all tokens by adhering strictly to calibrated zinc neutrals.

### Surface Tones
- **Canvas Base:** `#FFFFFF` — Primary stark white ground for main editorial fields.
- **Canvas Sub-surface:** `#FAFAFA` — Secondary grounding tone used for alternating structural panels and table headers.
- **Card / Surface Elevated:** `#FFFFFF` with structural boundary lines.

### Neutral Grayscale Hierarchy
- **Primary Ink (`#09090B` / `#18181B`):** Deep carbon black used for headlines, high-priority body copy, and solid primary interaction targets.
- **Secondary Ink (`#71717A`):** Mid-tone zinc for secondary descriptions, metadata, column notations, and caption hierarchy.
- **Tertiary Ink (`#A1A1AA`):** Lightened zinc for placeholders, disabled states, and auxiliary indices.
- **Structural Lines (`#E4E4E7`):** Razor-sharp 1px dividers, grid demarcations, and component boundaries.
- **Subtle Partition (`#F4F4F5`):** Soft background containers, input surface fills, and zebra striping.

### Semantic Rules
All interactive highlights, focus states, and indicators rely on scale, weight change, inversion, or hairline carbon borders rather than synthetic alert colors. Critical warnings leverage `#18181B` with distinct symbolic glyphs and high-contrast bounding boxes.

## Typography

The typography uses Inter across all hierarchical roles, calibrated with tight tracking on display sizes to mirror traditional Swiss metal type foundry specimens.

### Typographic Discipline
- **Letter-Spacing:** Negative letter spacing applies universally to display and headline tiers (`-0.035em` to `-0.015em`) to create dense, unified typographic lockups. Micro labels and categorical indexes utilize open tracking (`+0.02em` to `+0.06em`) for maximum legibility at small scale.
- **Hierarchy through Scale & Weight Contrast:** Headings never rely on heavy ultra-bold styling; hierarchy is achieved by pairing medium/semibold headers with regular body text and light zinc captions.
- **Editorial Indexing:** Small uppercase labels (`label-sm`) function as catalog indicators, section indexers, and architectural metadata labels (e.g., `01 / SPECS`, `LOCATION // 45.2°N`).

## Layout & Spacing

Layouts adhere strictly to an asymmetric 12-column modular grid designed around mathematical ratios and visible structural baselines.

### Grid Mechanics
- **Desktop (>= 1280px):** 12-column grid, `margin-desktop` (4rem / 64px), `gutter-lg` (2rem / 32px). Generous negative margins create broad editorial pacing.
- **Tablet (768px - 1279px):** 8-column grid, `margin` (2rem / 32px), `gutter` (1.5rem / 24px).
- **Mobile (< 768px):** 4-column grid, `margin-mobile` (1rem / 16px), `gutter-sm` (1rem / 16px).

### Architectural Cadence
Whitespace operates as physical matter. Sections are separated by distinct rhythmic spacing (`space-xl` scaled dynamically) and sharp horizontal rules. Structural lines align strictly with grid tracks, ensuring every card, table, or content segment anchors visually to an editorial coordinate.

### Implementation Notes
- This project realizes the modular grid's visible baselines as **1px-gap hairline editorial grids**: card containers expose a `#E4E4E7` background through 1px gaps, so cell boundaries read as continuous structural rules. Column counts collapse at the spec breakpoints (1280px / 768px); component-level collapses at 900px / 560px are permitted.
- Interactive cards signal hover with a 1px `#18181B` frame reserved in the resting state (`1px transparent outline`, inset) so the emphasis transition never shifts layout. Background swaps are reserved for open/active states (e.g. accordion).
- Buttons compress on `:active` via `transform: scale(0.985)` — no blur, no shadow.
- Small uppercase labels, indices, and timestamps use the `label-sm` / `mono-index` roles (Inter with open tracking); no monospace family is used.

## Elevation & Depth

This design system rejects drop shadows, ambient blurs, and skeuomorphic lighting in favor of an authentic planar, two-dimensional architectural aesthetic.

### Depth by Containment & Line
- **Zero Ambient Shadows:** `box-shadow` is set to `none` across all standard components, modals, and dropdown overlays.
- **Structural Outlines:** Hierarchy and layering are defined by crisp, 1px low-contrast hairline borders (`#E4E4E7`).
- **Surface Layering:** Elevated surfaces (such as floating sheets or contextual drawers) utilize clean white canvas backgrounds with a solid 1px `#18181B` border or a subtle `#09090B` offset rule to delineate spatial separation without soft blur artifacts.
- **Focus & Selection Inversion:** Selection and depth are communicated by value shifts: unselected states use `#FFFFFF` or `#FAFAFA`, while active states invert to high-contrast `#18181B`.

## Shapes

The shape vocabulary maintains strict geometric restraint with minimal soft radius accents (`roundedness: 1`), providing a subtle technological precision without feeling rounded or soft.

### Geometry Specifications
- **Base Components:** Radius is fixed to `0.25rem` (4px) for interactive elements like buttons, inputs, and contextual tags, introducing micro-refinement while preserving structural rectangularity.
- **Panels & Framing Containers:** Fixed to `0.25rem` or sharp `0px` depending on whether elements bleed directly into grid dividing lines.
- **Inner Accents:** Checkbox indicators, sliders, and badges follow the same concise, disciplined micro-radius.

## Components

### Buttons
- **Primary:** Background `#18181B`, text `#FFFFFF`, border 1px solid `#18181B`, border-radius `0.25rem`. Hover shifts to `#27272A`. Active state compresses slightly with no blur.
- **Secondary / Outlined:** Background `transparent`, text `#18181B`, border 1px solid `#E4E4E7`. Hover changes border to `#18181B` and background to `#FAFAFA`.
- **Tertiary (Ghost):** Background `transparent`, text `#71717A`, no border. Hover updates text to `#18181B`.
- **Padding:** Compact, editorial proportions: `0.5rem 1rem` for medium buttons, uppercase or tracked label styling (`label-md`).

### Input Fields & Controls
- **Text Inputs:** Background `#FFFFFF`, 1px solid border `#E4E4E7`, text `#18181B`, placeholder `#A1A1AA`. Hover brings border to `#A1A1AA`. Focus state transitions border cleanly to `#18181B` with 0px outline and zero shadow ring.
- **Checkboxes & Radios:** 16px square/circle with 1px border `#D4D4D8`. Checked state fills `#18181B` with an inset pure white check or dot mark.

### Chips & Badges
- **Editorial Chips:** Compact height (24px), border 1px solid `#E4E4E7`, background `#FAFAFA`, text `#71717A`, font size `0.6875rem` (`label-sm`), uppercase with `0.06em` letter spacing.
- **Active State:** Inverted to solid `#18181B` fill with `#FFFFFF` text.

### Cards & Modular Panels
- **Container Structure:** Flat `#FFFFFF` surface enclosed by a 1px solid `#E4E4E7` line. Zero shadow.
- **Card Header & Footer:** Delimited by explicit 1px horizontal rules rather than floating space.
- **Interactive Cards:** Hover introduces a border transition to `#18181B` with absolute precision and no layout shift.

### Lists & Tables
- **Editorial Data Tables:** Clean horizontal divider layout. Row height 48px, header row styled in `label-sm` with a 1px solid `#18181B` top and bottom divider.
- **List Items:** Separated by 1px `#F4F4F5` borders, featuring tabular figures for quantitative data and right-aligned zinc index indicators.