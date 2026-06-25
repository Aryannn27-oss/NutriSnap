# Phase 1: Environment Setup & Authentication - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-26
**Phase:** 1-Environment Setup & Authentication
**Areas discussed:** Route and Layout architecture, Mock session management, Form validation & styling, Responsiveness & breakpoints

---

## Route and Layout architecture

| Option | Description | Selected |
|--------|-------------|----------|
| Route Groups | Group Auth under (auth) with a clean layout and Dashboard under (app) with the asymmetric side panel | ✓ |
| Flat structure | Keep all routes under the root /app folder without group layouts | |
| CSS Variables | Define Stitch colors (#061b0e, etc.) in global CSS properties and map them in tailwind.config.ts | ✓ |
| Direct Tailwind extensions | Extend tailwind.config.ts with hardcoded brand colors and font settings | |
| next/font/google | Load Inter and Source Serif 4 at root, exporting them as CSS variables for Tailwind class usage | ✓ |
| CDN link tags | Fetch fonts dynamically via Google Fonts CSS CDN links in layout metadata | |
| Centered 1280px grid | Base desktop container centered at 1280px max-width, matching the design.md guidelines | ✓ |
| Fluid layout | Span full viewport width with content containers handling individual section alignments | |

**User's choice:** Route Groups, CSS Variables, next/font/google, Centered 1280px grid.
**Notes:** Followed all recommended defaults to lay down a solid modular next.js base layout.

---

## Mock session management

| Option | Description | Selected |
|--------|-------------|----------|
| SessionStorage | Store session in Zustand with sessionStorage sync so it survives refresh but clears on tab close | ✓ |
| Memory-only | Pure React/Zustand memory (resets on page refresh, simple) | |
| LocalStorage | Persistent across browser restarts until explicit log out | |
| Predefined account + Quick-fill | Pre-fill input fields with test credentials for fast testing | |
| Open sandbox | Allow any email and password matching standard Zod validation formats | ✓ |
| Strict mocks | Only allow a set of 2-3 static user credentials defined in the mock store | |
| Low-contrast Toast delay | Show an elegant success notification and delay redirect by 800ms for visual transition polish | ✓ |
| Immediate redirect | Instantly redirect to Dashboard without any delay or loading transition | |
| App-level layout guard | Redirect unauthenticated users back to /auth/sign-in if they try to access internal dashboard pages | ✓ |
| No route guarding | Allow free navigation via URL for easier testing of different states during MVP | |

**User's choice:** SessionStorage, Open sandbox, Low-contrast Toast delay, App-level layout guard.
**Notes:** The user preferred an open sandbox that validates any properly-formatted credentials but guards pages and synchronizes the simulated login state to session storage.

---

## Form validation & styling

| Option | Description | Selected |
|--------|-------------|----------|
| React Hook Form + Zod | Strict schema-based form handling conforming to the user stack guidelines | ✓ |
| Manual form state | Standard React hooks and custom validations | |
| Fully boxed input | 1px light border (#E2E2DF) transitioning to 1px Deep Forest Green (#061b0e) on focus | ✓ |
| Underlined input | Border-b input line transitioning to 2px Deep Forest Green on focus | |
| Under the field | Small, inline red (#ba1a1a) error labels below the field in label-sm typography | ✓ |
| Banner alert | Global error box at the top of the card showing all input errors | |
| Simple minimum length | Standard length checks (minimum 8 characters) in Zod for ease of sandbox testing | ✓ |
| Strict password validation | Enforce numbers, letters, and uppercase letters in Zod | |

**User's choice:** React Hook Form + Zod, Fully boxed input, Under the field, Simple minimum length.
**Notes:** Built fully boxed inputs with inline error states using recommended library bindings.

---

## Responsiveness & breakpoints

| Option | Description | Selected |
|--------|-------------|----------|
| Mobile-first approach | Standard Tailwind workflow using base styles for mobile and min-width prefixes (md:, lg:) for desktop scaling | ✓ |
| Desktop-first approach | Desktop styles first and max-width overrides (max-md:) for mobile | |
| Full-bleed on mobile | Render fields edge-to-edge on small screens; wrap in a centered 400px bordered card on tablet and desktop | ✓ |
| Contained card on all | Keep card styling (with borders and margins) visible even on small mobile viewports | |
| Desktop threshold (lg / 1024px) | Stack panels on mobile/tablet; display asymmetric layout side-by-side only on desktop screens | ✓ |
| Tablet threshold (md / 768px) | Enable side-by-side asymmetric panel layout starting from medium screens | |
| Browser devtools simulation | Responsive check using chrome emulator presets (Mobile, Tablet, Desktop) | ✓ |
| Trust tailwind breakpoints | Rely purely on standard Tailwind utilities without specific target device simulations | |

**User's choice:** Mobile-first approach, Full-bleed on mobile, Desktop threshold (lg / 1024px), Browser devtools simulation.
**Notes:** Handled desktop/mobile breakpoints and simulation protocols.

---

## the agent's Discretion

None.

## Deferred Ideas

None.
