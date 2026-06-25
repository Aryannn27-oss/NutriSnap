# Phase 1: Environment Setup & Authentication - Context

**Gathered:** 2026-06-26
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase delivers the Next.js 15 template boilerplate initialized with Google Stitch custom design system tokens (colors, typography, spacing, border-radius, outlines) and fully responsive front-end Authentication screens (Sign In, Sign Up) using React Hook Form + Zod, state-managed by a Zustand mock auth store.

</domain>

<decisions>
## Implementation Decisions

### Route and Layout Architecture
- **D-01:** Next.js Route Groups layout separation (`(auth)` directory for authentication pages with clean wrapper layout, and `(app)` layout for main application views like the dashboard).
- **D-02:** Stitch design system variables (`#061b0e` forest green, `#8c4f10` warm clay, etc.) defined as CSS custom properties in global CSS and registered in `tailwind.config.ts`.
- **D-03:** next/font/google loading at root layout level mapping Inter (sans) and Source Serif 4 (serif) to custom CSS variables for Tailwind class usage.
- **D-04:** Center desktop page contents at 1280px max-width centered grid, allowing the off-white canvas `#F9F9F7` background to bleed to the edges.

### Mock Session Management
- **D-05:** Session state persisted via Zustand store synced to sessionStorage to survive page refreshes but clear on tab exit.
- **D-06:** Open sandbox credentials format accepting any email and password matching validation rules (for sandbox exploration).
- **D-07:** Refined visual success flow showing a low-contrast Toast message and delaying redirect by 800ms to allow smooth transitions.
- **D-08:** Protect internal pages via App-level layout checks redirecting unauthenticated users to `/auth/sign-in`.

### Form Validation & Styling
- **D-09:** Schema-based validation using React Hook Form and Zod to manage inputs and validate constraints.
- **D-10:** Fully boxed input fields with 1px border (`#E2E2DF` border-low-contrast) that scales/colors to 1px Deep Forest Green (`#061b0e`) on focus.
- **D-11:** Inline error fields rendered below target inputs in `label-sm` font using red `#ba1a1a`.
- **D-12:** Basic password validation checking for a minimum of 8 characters.

### Responsiveness & Breakpoints
- **D-13:** Mobile-first layout construction applying Tailwind classes (defaulting to mobile and using min-width prefixes md:, lg: for screen expansion).
- **D-14:** Full-bleed forms on mobile viewports, converting into a centered 400px card on larger viewports.
- **D-15:** Break layout asymmetry at desktop threshold (`lg: 1024px`) stacking side panels vertically on tablets/mobiles.
- **D-16:** Verify design responsiveness locally using standard Chrome presets in browser devtools.

### the agent's Discretion
No specific discretionary options requested. All key visual decisions are defined by `design.md` and the user.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design & Spacing
- `Nutrisnap/DESIGN.md` — Core colors, typography mapping, asymmetric layout constraints, shapes, outlines, and spacing rules.

### Requirements & Project Context
- `.planning/PROJECT.md` — Main project goals and constraints.
- `.planning/REQUIREMENTS.md` §Authentication — AUTH-01 through AUTH-04 details.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None (Greenfield project).

### Established Patterns
- Greenfield Next.js 15 App router patterns.

### Integration Points
- `/` or `/auth/sign-in` (Auth landing pages) and `/dashboard` (main page redirect target).

</code_context>

<specifics>
## Specific Ideas

No custom specific design patterns other than following the exact design mockups in `design.md`.

</specifics>

<deferred>
## Deferred Ideas

- None — discussion stayed within Phase 1 frontend mock scope.

</deferred>

---

*Phase: 1-Environment Setup & Authentication*
*Context gathered: 2026-06-26*
