# DESIGN.md — Ascent

The approved direction for Cracked Developer HQ (2026-07-03). Twelve months
read as one climb: graphite monochrome, warm-white text, a single
expedition-orange thread. The spine is the Route: an elevation profile of the
year, drawn by real progress. Phases are camps, skills are waypoints, the
capstone is the summit. The metaphor lives in the visualization and a few
labels; data names (skills, phases, projects) never change.

## 1. Color tokens

Single accent on a monochrome world. OKLCH-derived hexes; every neutral is
tinted toward the accent's warmth (never pure gray/black/white).

### Graphite (dark, native theme)

| Token | Value | Role |
|---|---|---|
| `--hq-bg` | `#131417` | App ground |
| `--hq-surface` | `#1a1c20` | Panels, inputs, sticky bars |
| `--hq-elevated` | `#232629` | Hover, active rows, wells |
| `--hq-border` | `#2e3236` | Hairlines, rules, grid strokes |
| `--hq-text` | `#eceae5` | Primary text (warm white) |
| `--hq-text-secondary` | `#a2a49f` | Secondary text |
| `--hq-text-muted` | `#64676a` | Labels, disabled, grid captions |
| `--hq-accent` | `#ff5c1f` | THE color: active/current, primary action, the Route head |
| `--hq-accent-soft` | `#ff5c1f` at 10–14% | Accent tints, route fill |
| `--hq-danger` | `#e0563f` | Blocked/destructive only; rare |

### Whiteout (light theme)

| Token | Value |
|---|---|
| `--hq-bg` | `#edece8` · `--hq-surface` `#f4f3f0` · `--hq-elevated` `#e3e2dd` |
| `--hq-border` | `#d2d1ca` · text `#1b1c20` / `#5b5d5f` / `#8f918c` |
| `--hq-accent` | `#e64d14` (slightly deepened for contrast on paper) |

### Rules

- **Done is not green.** A cleared waypoint is a *filled warm-white* marker
  (solid `--hq-text`); completion reads as solidity, not a second hue.
- Accent appears only as: current/active state, the Route's climbed segment,
  primary buttons, focus rings, "next action". Never decorative, never on
  inactive elements.
- Tracks are distinguished by typography (condensed caps labels A / B / C),
  not hue. `--hq-danger` only for `blocked` and destructive actions.
- Legacy `--hq-amber/green/cyan/red` tokens are remapped (amber→accent,
  green→text-solid, cyan→text-secondary, red→danger) during migration, then
  components move to semantic names.

## 2. Typography

One family, three voices. **Archivo** (variable, `wdth` axis) + **JetBrains
Mono**.

| Voice | Face | Usage |
|---|---|---|
| Display | Archivo, `font-stretch: 66%`, weight 700–800, uppercase, tracking `.08–.14em` | Page titles, phase/camp names, big numerals, buttons |
| UI | Archivo, normal width, weight 400–600 | Body, descriptions, form labels |
| Data | JetBrains Mono 400–600 | IDs (A0, COL-5), numbers, dates, statuses, altitude |

Scale (rem, fixed): `11 / 12.5 / 14 (body) / 16 / 20 / 26 / 36`. Ratio ≈1.3
between display steps. Overline labels: display voice at 10–11px,
tracking `.3em`. `tabular-nums` on every aligned number.

## 3. Space, radius, elevation

- 4px base grid. Component padding: 12/16/20. Section rhythm: 40–56px between
  page sections (vary it; no uniform stack).
- Radius: `4px` controls/chips, `8px` panels/wells. Nothing rounder except
  waypoint circles.
- **No shadows.** Depth = border + ground shift (surface → elevated). Wells
  (the Route chart, meters) may use `inset` border only.
- Lists are **ruled rows** (hairline top-border rows, generous line height),
  not stacked cards. Cards only where an item is a destination (project
  tiles).

## 4. Motion

- 150ms `ease-out` color/opacity; 200–250ms `cubic-bezier(0.22, 1, 0.36, 1)`
  (ease-out-quint) for position/size. Nothing above 400ms except the Route
  draw.
- **The Route draws once** on roadmap load: climbed path animates
  `stroke-dashoffset` over 600ms ease-out-quint; the head dot fades in after.
  Session-once, not per-navigation (sessionStorage flag).
- The active waypoint/head carries a slow 2s opacity pulse on its outer ring.
- `prefers-reduced-motion`: all of the above collapse to instant; pulse off.
- No scroll-triggered animation, no page-load choreography elsewhere.

## 5. Signature: the Route

An SVG elevation profile of all 5 phases, x = time (12 months), y = altitude
(cumulative skill weight). Three renderings, one component family:

1. **Full Route** (`/roadmap` header): full-width well, grid strokes on
   `--hq-border`, unclimbed path dotted graphite, climbed path solid accent
   with soft area fill, camps as outlined nodes (C1–C4 + SUMMIT flag),
   "you are here" = accent ring + dot at the progress point, altitude readout.
   Camp nodes are `<a>` anchors scrolling to phase sections.
2. **Mini Route** (dashboard): same drawing, 120px tall, no camp labels,
   with `ALT n/5,200m` readout.
3. **Altitude readout** (sidebar): text-only: `ALT 612m · CAMP 1 · DAY 3/365`
   + a 2px progress hairline.

Altitude model: each skill = 300m of climb, each project = 200m
(17×300 + 6×200 = 6,300m at summit). The final phase has no camp node: its
endpoint is the summit. Deterministic from DB progress; a shipped project
visibly moves the line.

## 6. Component patterns

- **Waypoint marker** (skill status): `○` outlined muted = queued ·
  `◉` accent + pulse ring = climbing (in_progress) · `◐` half accent =
  reviewing · `●` filled warm-white + check = cleared · `⊘` danger = blocked.
  Always paired with mono ID.
- **Ruled row** (skills, sprints, career items): hairline-top row, mono ID
  left, title in UI voice, status marker + mono label right; hover = ground
  shift to elevated, no transform.
- **Status labels**: display voice 10px caps, tracking `.2em`: `QUEUED /
  CLIMBING / REVIEWING / CLEARED / BLOCKED` for skills; `PLANNED / ON THE
  WALL / DONE` stays literal for sprints; projects keep `BUILDING / SHIPPED`.
- **Primary button**: accent block, display voice caps, `#131417` text, 4px
  radius. Secondary: 1px border ghost. Both: visible focus ring
  (`2px solid --hq-accent`, offset 2).
- **Camp header** (phase sections): condensed caps camp name + mono window +
  altitude band + thin progress hairline; goal text in a `<details>` fold.
- **Project tile**: bordered panel, mono `P1` + type label top row,
  display-voice title, tech as mono chips; flagship tiles get an accent
  summit-flag glyph, not a colored border.
- **Empty/loading**: skeletons keep content shapes on `--hq-surface`; empty
  states in UI voice with one concrete next step and a ghost button.

## 7. Accessibility floor

- Contrast: body text ≥ 7:1 on ground; secondary ≥ 4.5:1; accent-on-graphite
  and graphite-on-accent both ≥ 4.5:1 for text uses.
- Every interactive element: visible `:focus-visible` ring; hit area ≥ 40px
  on touch.
- The Route SVG: `role="img"` + `aria-label` summarizing progress; camp
  anchors are real links with focus states; data never conveyed by color
  alone (markers differ in shape/fill, labels in text).
- Full keyboard nav; `prefers-reduced-motion` honored globally.
