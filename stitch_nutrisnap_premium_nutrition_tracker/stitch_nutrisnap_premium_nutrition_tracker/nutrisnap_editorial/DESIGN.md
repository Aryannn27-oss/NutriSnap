---
name: NutriSnap Editorial
colors:
  surface: '#fbf8ff'
  surface-dim: '#dad9e5'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f2ff'
  surface-container: '#eeecfa'
  surface-container-high: '#e8e7f4'
  surface-container-highest: '#e2e1ee'
  on-surface: '#1a1b24'
  on-surface-variant: '#434843'
  inverse-surface: '#2f3039'
  inverse-on-surface: '#f1effc'
  outline: '#737973'
  outline-variant: '#c3c8c1'
  surface-tint: '#4d6453'
  primary: '#061b0e'
  on-primary: '#ffffff'
  primary-container: '#1b3022'
  on-primary-container: '#819986'
  inverse-primary: '#b4cdb8'
  secondary: '#8c4f10'
  on-secondary: '#ffffff'
  secondary-container: '#fdad67'
  on-secondary-container: '#763f00'
  tertiary: '#121a00'
  on-tertiary: '#ffffff'
  tertiary-container: '#243000'
  on-tertiary-container: '#8a9a5b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d0e9d4'
  primary-fixed-dim: '#b4cdb8'
  on-primary-fixed: '#0b2013'
  on-primary-fixed-variant: '#364c3c'
  secondary-fixed: '#ffdcc2'
  secondary-fixed-dim: '#ffb77b'
  on-secondary-fixed: '#2e1500'
  on-secondary-fixed-variant: '#6d3a00'
  tertiary-fixed: '#d9eaa3'
  tertiary-fixed-dim: '#bdce89'
  on-tertiary-fixed: '#161f00'
  on-tertiary-fixed-variant: '#3e4c16'
  background: '#fbf8ff'
  on-background: '#1a1b24'
  surface-variant: '#e2e1ee'
  canvas: '#F9F9F7'
  slate-muted: '#4A4D55'
  clay-light: '#D9A066'
  sage-light: '#C2CBB5'
  border-low-contrast: '#E2E2DF'
typography:
  headline-xl:
    fontFamily: Source Serif 4
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  max-width-content: 1280px
---

## Brand & Style

This design system is built on an **Editorial Modernism** aesthetic, tailored for a premium nutrition tracking experience. It moves away from the typical "tech-bro" vibrance of health apps, favoring a sophisticated, mature, and trustworthy atmosphere that treats food data with the reverence of a high-end culinary publication.

The target audience consists of health-conscious professionals who value precision, clarity, and a "quiet luxury" in their digital tools. The UI evokes a sense of calm authority through a structured but slightly asymmetric layout, prioritizing high-quality product photography and data visualization over illustrative fluff. 

The visual style is characterized by:
- **Clean Minimalism:** Excessive decorative elements are stripped back to allow the typography and content to breathe.
- **Structured Precision:** A rigorous adherence to spacing and thin-line borders.
- **Subtle Depth:** Depth is achieved through layering and soft, natural shadows rather than synthetic effects.

## Colors

The palette is rooted in an organic, earthy foundation that reinforces the "Nutri" aspect of the product without appearing kitsch.

- **Primary (Deep Forest Green):** Used for primary actions, navigation headers, and high-level branding. It conveys stability and health.
- **Secondary (Warm Clay):** An accent for energy-related data, proteins, or focused call-to-actions. It provides a warm contrast to the cooler greens.
- **Tertiary (Muted Sage):** Used for progress bars, vitamins, and secondary highlights, offering a softer alternative to the primary green.
- **Neutrals:** The background is an **Off-White (#F9F9F7)** to reduce eye strain compared to pure white, while **Slate (#191A23)** is reserved for high-contrast typography and structural lines.

Avoid using gradients. Color should be applied in solid, confident blocks or thin, purposeful lines.

## Typography

The typography system uses a classic pairing to achieve its editorial feel. 

**Source Serif 4** is the primary display face. It provides a literary, authoritative tone. It should be used for all headers, large numeric data (like calorie counts), and quote-style callouts. Use tighter letter-spacing for larger sizes to maintain a "tight" editorial look.

**Inter** handles the functional aspects of the UI. It is chosen for its exceptional legibility in data-dense tables and small-label contexts. 

- Use **uppercase labels** with slight tracking for category headers and metadata.
- Body text should maintain a generous line height (at least 1.5x) to ensure the "breathable" feel of the layout despite high information density.

## Layout & Spacing

The layout philosophy is **Asymmetric but Balanced**. This means avoiding perfectly mirrored columns in favor of a "Main + Sidebar" or "Large Item + Grid" rhythm, reminiscent of a modern magazine spread.

- **Grid:** A 12-column grid for desktop with 24px gutters. Use "offset" columns (e.g., content spanning columns 2 through 10) to create sophisticated whitespace.
- **Rhythm:** Use a 4px baseline grid. All padding and margins should be multiples of 8px (8, 16, 24, 32, 48, 64).
- **Responsive Behavior:** 
  - **Mobile:** Transition to a single-column fluid layout with 16px side margins. Use cards to group logical sections.
  - **Desktop:** Fix the content at 1280px and center it, allowing the Off-White canvas to bleed to the edges.
- **Density:** Dashboards should be "dense but breathable"—this is achieved by using thin borders to separate data points instead of wide gaps.

## Elevation & Depth

This design system avoids heavy shadows and floating elements. Depth is communicated through **Layered Tonal Surfaces** and **Refined Outlines**.

- **Tiers:** Use a background color (#F9F9F7) and a secondary surface color (Pure White #FFFFFF) for cards and input areas to create a subtle lift.
- **Outlines:** Use thin (1px) borders in `border-low-contrast` or `primary` for focus states. This creates a "technical" and "precise" look.
- **Shadows:** When necessary (e.g., a primary floating action button or an active modal), use a "Natural Soft Shadow": `0px 4px 20px rgba(25, 26, 35, 0.06)`. The shadow should feel like it is cast by soft, diffused light, never harsh or black.
- **No Glassmorphism:** Avoid backdrop blurs or transparency. Surfaces are solid and dependable.

## Shapes

The shape language is "Soft-Geometric." It strikes a balance between the clinical sharpness of a medical app and the overly friendly "bubbly" feel of consumer apps.

- **Standard Radius:** 0.25rem (4px) for most UI elements like buttons, input fields, and small cards. This retains a sense of precision.
- **Large Radius:** 0.5rem (8px) for major dashboard containers and featured image cards.
- **Interactive Elements:** Buttons should never be fully pill-shaped. Maintain the 4px corner radius to stay consistent with the editorial grid.

## Components

### Buttons
- **Primary:** Solid Deep Forest Green background, White text. 4px radius. 
- **Secondary:** Transparent background with a 1px Deep Forest Green border.
- **Ghost:** Text-only with a slight underline or icon, used for low-priority actions.

### Cards
- Cards use a White background against the Off-White canvas. 
- Separation is achieved via a 1px `border-low-contrast` rather than a shadow. 
- Card headers should use `label-md` for the category and `headline-md` for the title.

### Input Fields
- Underlined style or fully boxed with a 1px light border. 
- Focus state: Border transitions to Deep Forest Green. 
- Labels should be placed above the field in `label-sm`.

### Data Visualization
- Charts should use the `primary`, `secondary`, and `tertiary` colors. 
- Use thin, high-contrast lines for axes (Slate-muted at 20% opacity).
- Annotations should use `Source Serif 4` for a bespoke, hand-crafted feel.

### Progress Indicators
- Use a "thick-to-thin" visual: The background track is a very thin 1px line, while the progress indicator is a 4px thick bar with rounded ends.