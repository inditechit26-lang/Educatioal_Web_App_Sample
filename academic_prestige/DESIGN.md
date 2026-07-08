---
name: Academic Prestige
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434655'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#4059aa'
  on-secondary: '#ffffff'
  secondary-container: '#8fa7fe'
  on-secondary-container: '#1d3989'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dce1ff'
  secondary-fixed-dim: '#b6c4ff'
  on-secondary-fixed: '#00164e'
  on-secondary-fixed-variant: '#264191'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
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
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max-width: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-padding: 80px
---

## Brand & Style
The design system is engineered for a premium private coaching institute, targeting ambitious students and professionals seeking elite educational advancement. The brand personality is authoritative yet accessible, emphasizing "Professional Clarity" and "Academic Excellence."

The design style follows a **Modern Corporate** approach with a heavy emphasis on **Minimalism**. It utilizes expansive whitespace to reduce cognitive load and establish a sense of calm focus. Visual interest is driven by high-quality educational photography and a disciplined color palette rather than decorative effects. The emotional response is one of trust, reliability, and structured progress.

## Colors
The palette is rooted in academic tradition with a modern digital execution.
- **Primary (Royal Blue):** Used for primary actions, active states, and brand-critical identifiers. It conveys energy and digital fluency.
- **Secondary (Navy):** Reserved for deep-level navigation, footer backgrounds, and high-level headings to provide weight and authority.
- **Accent (Orange):** Applied sparingly for high-consequence call-to-actions, notifications, or highlighting achievement-related metrics.
- **Neutrals:** The background is a clean white (#FFFFFF), supported by Slate-toned neutrals for borders and secondary text to maintain a sophisticated, low-fatigue reading environment.

## Typography
The typography system uses a pairing of **Manrope** for structure and **Inter** for utility. 
- **Manrope** is used for all headlines and display text. It should be set with tighter letter-spacing in larger sizes to maintain a "locked-in," professional look. 
- **Inter** handles all body copy, inputs, and labels. Its high x-height ensures legibility for dense educational content and instructional text.
- Maintain a clear hierarchy by using Navy (#1E3A8A) for headlines and Slate (#475569) for body text to reduce visual harshness while maintaining contrast.

## Layout & Spacing
The layout follows a **Fluid Grid** model based on a 12-column system.
- **Rhythm:** An 8px linear scale is used for all padding and margins. 
- **Whitespace:** Generous section padding (80px+) is required between major content blocks to emphasize the premium positioning. 
- **Desktop:** 12 columns, 24px gutters, and 64px side margins. 
- **Mobile:** 4 columns, 16px gutters, and 20px side margins.
- Elements should be grouped using "logical proximity"—related components (like a course title and its price) should have tight internal spacing (8px-12px) while being separated from other units by significantly larger gaps (32px-48px).

## Elevation & Depth
This design system uses **Tonal Layering** and **Ambient Shadows** to create a focused hierarchy without visual noise.
- **Surface Level:** The main background is pure white.
- **Elevation-1 (Low):** Used for cards and persistent containers. A very soft, diffused shadow: `0px 2px 4px rgba(15, 23, 42, 0.04), 0px 4px 8px rgba(15, 23, 42, 0.02)`.
- **Elevation-2 (Medium):** Used for hover states and dropdown menus. A more pronounced but still subtle shadow: `0px 10px 15px -3px rgba(15, 23, 42, 0.08)`.
- **Borders:** For non-elevated elements (like input fields), use a 1px solid border in Slate-200 (#E2E8F0). Avoid using shadows and borders simultaneously on the same element.

## Shapes
The shape language is "Approachable Rigor." 
- **Standard Radius:** 16px (1rem) is the default for all cards, modal containers, and large buttons. 
- **Small Elements:** For checkboxes, tags, and small utility buttons, a reduced radius of 8px (0.5rem) should be used to maintain visual balance.
- **Images:** All educational photography must feature 16px rounded corners to align with the UI components.

## Components
- **Buttons:**
  - *Primary:* Solid Royal Blue (#2563EB) with white text. 16px radius. Large padding (16px 32px).
  - *Secondary:* Ghost style with 1px border (#E2E8F0) and Navy text. 
  - *Accent:* Solid Orange (#F59E0B) only for "Enroll Now" or "Book Trial" actions.
- **Cards:** White background, 16px radius, Elevation-1 shadow. 24px internal padding. No borders.
- **Input Fields:** 1px Slate-200 border, 8px radius. On focus, the border transitions to Royal Blue with a 2px outer glow (Primary color at 10% opacity).
- **Lists:** Use subtle horizontal dividers (1px Slate-100). Icons within lists should be monolinear and colored in Royal Blue.
- **Chips/Badges:** Soft background (Primary at 10% opacity) with Primary colored text for status indicators (e.g., "Enrolling Now").
- **Photography:** Use "Real-World" imagery—students in bright, natural light, professional tutoring environments, and clean desk setups. Avoid generic stock illustrations.