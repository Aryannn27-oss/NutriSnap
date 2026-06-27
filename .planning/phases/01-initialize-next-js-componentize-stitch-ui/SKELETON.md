# Walking Skeleton — NutriSnap

**Phase:** 1
**Generated:** 2026-06-26

## Capability Proven End-to-End

A user can view the NutriSnap App layout shell with responsive Sidebar navigation and see the static bento-style Dashboard, Upload Meal page, Meal Details, and Settings pages compiled as Next.js/React components.

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Next.js 15 App Router | React full-stack framework with built-in route compilation and server/client page splitting. |
| Styling | Tailwind CSS v4 + PostCSS | Requested by user. CSS-first theme configuration allows clean theme variable definitions. |
| Auth | Firebase Auth client | To be integrated in Phase 2. Setup mock routes in layout for Phase 1. |
| Database | Firebase Firestore | To be integrated in Phase 4. Setup mock daily logs structure in dashboard. |
| Directory layout | Strictly separated folder structure under `src/` | Separates concerns: `ui/` for base components, `layout/` for nav/sidebar, `features/` for domain widgets. |

## Stack Touched in Phase 1

- [x] Project scaffold (framework, build, lint, Tailwind configuration)
- [x] Routing — App Router configuration `/dashboard`, `/upload`, `/settings`
- [ ] Database — (Mocked in Phase 1; to be wired in Phase 4)
- [x] UI — Sidebar navigation click actions, desktop and mobile responsive shell layouts
- [ ] Deployment — (To be configured in Phase 6)

## Out of Scope (Deferred to Later Slices)

- Firebase initialization and actual auth sessions (Phase 2)
- Image file uploads and database persistence (Phase 3 & 4)
- Live database queries and dynamic macros aggregation (Phase 5)

## Subsequent Slice Plan

- Phase 2: Firebase Auth & Database Infrastructure (User login/registration and mock tables validation)
- Phase 3: Firebase Storage & Gemini AI Vision Integration (Image upload client and secure AI image-to-macros parsing router)
- Phase 4: Meal Logging & UI Customization (Saving meals, macros adjustment, and daily summary deletions)
- Phase 5: Bento Dashboard & Metrics (Aggregating daily logs, rendering macros progress, and displaying history lists)
- Phase 6: Final Polish & Deployment (Hardening Firebase rules and deploying to Vercel production hosting)
