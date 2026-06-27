# NutriSnap

## What This Is

NutriSnap is a premium, AI-powered nutrition tracking web application. Users can upload photos of their meals, which are processed by the Gemini API to identify foods, calories, and macros, and track their daily nutrition progress on a clean, minimal dashboard.

## Core Value

Empower users to track their nutrition instantly and effortlessly through AI image analysis on a clean, calm dashboard.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [x] Initialize Next.js project structure and componentize core Google Stitch UI elements. (Phase 1)
- [x] Implement user authentication via Firebase Auth. (Phase 2)
- [x] Build meal image upload page integrated with Cloudinary. (Phase 3)
- [x] Connect Gemini API via Next.js Route Handlers to analyze meal images and extract food info, calories, and macros. (Phase 3)
- [x] Save meal logs and daily metrics to Firebase Firestore. (Phase 3)
- [x] Create dashboard, analytics, and history pages showing daily progress and weekly energy charts. (Phase 5)

### Out of Scope

- [ ] Multi-user sharing and social feeds — Deferred for MVP to focus on single-user tracking.
- [ ] Custom custom-trained food classification model — Out of scope; Gemini API is preferred for general food identification.
- [ ] Offline local food database — Excluded for simplicity; app is online-only using cloud backend.

## Context

We are starting with static, raw UI design screens generated from Google Stitch inside the `stitch_nutrisnap_premium_nutrition_tracker` folder. We will build a Next.js web application utilizing Tailwind CSS v4 and Firebase, deploying to Vercel.

## Constraints

- **Tech Stack**: Next.js + React + TypeScript + Tailwind CSS v4.
- **Backend**: Firebase (Auth, Firestore, Storage) with Next.js Route Handlers or Server Actions.
- **AI API**: Gemini API.
- **Architecture**: Strict folder structure under `src/` to separate concerns:
  - `src/components/ui/` for base elements
  - `src/components/layout/` for layout/navigation
  - `src/components/features/` for domain-specific features
  - `src/lib/` for SDK initialization (Firebase/Gemini)
  - `src/services/` for API calls
  - `src/types/` for TypeScript types/interfaces
  - `src/hooks/` for custom hooks
  - `src/utils/` for helper utilities

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router | React-based server/client routing, deployment ease on Vercel. | — Pending |
| Tailwind CSS v4 | CSS-first configuration, requested by user and supported natively in Next.js 15. | — Pending |
| Gemini API via Server Actions / Route Handlers | Prevents API key exposure to the client-side browser. | — Pending |
| Vertical MVP structure | Recommended to deliver functioning core features slice by slice. | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-26 after initialization*
