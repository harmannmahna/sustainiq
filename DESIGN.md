# Design Brief

## Direction

SustainIQ — a gamified carbon footprint awareness platform that turns environmental action into an addictive, beautiful dashboard experience.

## Tone

Organic-modern with playful confidence: clean editorial layouts softened by botanical greens, warm amber accents, and glassmorphism cards that feel alive.

## Differentiation

A virtual forest that grows denser as users offset carbon — turning abstract metrics into tangible, shareable visual progress.

## Color Palette

| Token      | OKLCH           | Role                          |
| ---------- | --------------- | ----------------------------- |
| background | 0.98 0.008 140  | soft mint-white canvas        |
| foreground | 0.18 0.02 145   | deep forest text              |
| card       | 1.0 0.005 140   | pure white with mint undertone|
| primary    | 0.35 0.14 155   | deep forest green — CTAs      |
| accent     | 0.55 0.12 85    | warm amber — highlights       |
| muted      | 0.92 0.015 140  | soft sage for secondary areas |
| destructive| 0.55 0.22 25    | warm red for alerts           |
| border     | 0.88 0.02 140   | subtle mint border            |
| ring       | 0.35 0.14 155   | focus ring matches primary    |

## Typography

- Display: Space Grotesk — bold headings, hero text, badges
- Body: General Sans — clean UI labels, paragraphs, forms
- Mono: Nunito — numbers, counters, stats
- Scale: hero `text-5xl md:text-7xl font-bold tracking-tight`, h2 `text-3xl md:text-5xl font-bold`, label `text-sm font-semibold tracking-widest uppercase`, body `text-base`

## Elevation & Depth

Glassmorphism cards with 12px blur and semi-transparent borders; layered shadow system using eco-green tinted shadows for elevated elements.

## Structural Zones

| Zone    | Background              | Border        | Notes                                    |
| ------- | ----------------------- | ------------- | ---------------------------------------- |
| Header  | glass / card with blur  | border-b      | sticky, logo + nav + eco-score badge     |
| Content | gradient-mesh           | —             | alternating muted/transparent sections   |
| Footer  | muted/40 with border-t  | border-t      | links, social share kit, virtual forest count |

## Spacing & Rhythm

Mobile-first: 16px base padding, 24px section gaps, 8px micro-spacing. Cards use 20px internal padding. Dense dashboard grids on desktop, stacked cards on mobile.

## Component Patterns

- Buttons: rounded-full for primary CTAs (plant tree, check in), rounded-lg for secondary; primary uses deep green, accent uses amber for highlights
- Cards: rounded-2xl, glass or card background, shadow-eco, 20px padding
- Badges: rounded-full, small text, gradient or solid accent background
- Sliders: custom thumb in primary green with soft glow ring

## Motion

- Entrance: slide-up with staggered 0.1s delays for dashboard cards
- Hover: scale(1.02) + shadow-elevated on cards, 0.2s ease-out
- Decorative: float animation on hero elements, pulse-soft on live counters, grow on tree plant actions

## Constraints

- Only OKLCH tokens — no hex or rgb literals in components
- Glassmorphism limited to cards and modals — never on full sections
- Accent amber used sparingly: highlights, badges, active states only

## Signature Detail

The virtual forest — a grid of stylized tree icons that animate in with `grow` as users fund offsets, creating an instantly shareable visual trophy.
