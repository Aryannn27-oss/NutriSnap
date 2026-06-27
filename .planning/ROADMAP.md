# Roadmap: NutriSnap

## Overview

This roadmap defines the 6-phase development path for NutriSnap, a premium AI-powered nutrition tracker. We follow a Vertical MVP structure, starting with styling and screen layout foundations, implementing Firebase security and user session controls, developing Gemini AI Vision-assisted logs, and completing the dashboard experience.

## Phases

- [x] **Phase 1: Initialize Next.js & Componentize Stitch UI** - Initialize framework, setup Tailwind v4, layout core components, and import raw mockups.
- [x] **Phase 2: Firebase Auth & Database Infrastructure** - Build Firebase authentication routes and Firestore schema.
- [x] **Phase 3: Firebase Storage & Gemini AI Vision Integration** - Implement photo upload pipeline and secure Gemini server endpoints.
- [x] **Phase 4: Meal Logging, Editing & History Management** - Build full CRUD logic for saved meals and make meal history editable and reliable.
- [x] **Phase 5: Bento Dashboard & Metrics** - Render real-time dashboard progress metrics and today's meal summaries.
- [x] **Phase 6: Final Polish & Deployment** - Secure DB rules, optimize layouts, and host on Vercel.

## Phase Details

### Phase 1: Initialize Next.js & Componentize Stitch UI
**Goal**: Core design system setup and componentizing Google Stitch mockup screens.
**Mode**: mvp
**Depends on**: Nothing
**Requirements**: [LAYT-01, LAYT-02, LAYT-03, LAYT-04]
**Success Criteria**:
  1. Next.js 15 project initialized with App Router.
  2. Tailwind CSS v4 PostCSS configured and styles imported.
  3. App shell sidebar layout renders successfully.
  4. Core dashboard, settings, login, and upload views successfully componentized.
**Plans**: 3 plans

Plans:
- [x] 01-01: Initialize Next.js 15 framework and folder layout
- [x] 01-02: Componentize navigation shell and globals
- [x] 01-03: Implement Stitch page structures as React views

### Phase 2: Firebase Auth & Database Infrastructure
**Goal**: User authentication structure and Firestore instance config.
**Mode**: mvp
**Depends on**: Phase 1
**Requirements**: [AUTH-01, AUTH-02, AUTH-03, AUTH-04]
**Success Criteria**:
  1. Firebase SDK client initialized securely inside `src/lib/firebase.ts`.
  2. Users can register, log in, and log out with email/password.
  3. Authentication session persists correctly on refresh.
**Plans**: 2 plans

Plans:
- [x] 02-01: Setup Firebase client app and config credentials
- [x] 02-02: Build Auth routes, state wrapper, and context hook

### Phase 3: Firebase Storage & Gemini AI Vision Integration
**Goal**: Secure photo logging connected to Gemini vision API.
**Mode**: mvp
**Depends on**: Phase 2
**Requirements**: [IMGL-01, IMGL-02, IMGL-03, AIAN-01, AIAN-02, AIAN-03, AIAN-04]
**Success Criteria**:
  1. Users can upload food images to Firebase Storage.
  2. Next.js Server Route `/api/analyze` communicates securely with Gemini API.
  3. Gemini returns formatted JSON containing food lists, estimated weights, and macros.
**Plans**: 2 plans

Plans:
- [x] 03-01: Client-Side Compression & Cloudinary Direct Upload
- [x] 03-02: Gemini API Integration & AI Review Screen

### Phase 4: Meal Logging, Editing & History Management
**Goal**: Build full CRUD logic for saved meals and make meal history editable and reliable.
**Mode**: mvp
**Depends on**: Phase 3
**Requirements**: [MEAL-01, MEAL-02, MEAL-03, MEAL-04]
**Success Criteria**:
  1. Meal results (macros, food names, image URL) save successfully in Firestore after user confirmation.
  2. User can override meal name, portion size, macros, and meal type before saving.
  3. User can edit saved meals later from the Meal Log.
  4. User can delete meals with confirmation.
  5. Dashboard totals recalculate immediately after any add/edit/delete operation.
  6. Firestore records store both the original AI output and final user-confirmed data.
**Plans**: 4 plans

Plans:
- [x] 04-01: Write Firestore CRUD functions for meals
- [x] 04-02: Implement meal item edit sheet / detail drawer UI
- [x] 04-03: Add delete confirmation and optimistic updates
- [x] 04-04: Sync dashboard totals after meal changes

### Phase 5: Bento Dashboard & Metrics
**Goal**: Aggregated real-time metrics cards and daily food logs.
**Mode**: mvp
**Depends on**: Phase 4
**Requirements**: [DASH-01, DASH-02, DASH-03]
**Success Criteria**:
  1. Dashboard calorie, protein, carb, and fat cards calculate daily summary.
  2. Dashboard reactively reflects meal additions/removals.
  3. Today's meals display visually under bento overview cards.
**Plans**: 2 plans

Plans:
- [x] 05-01: Create daily log query hook and macros arithmetic helper
- [x] 05-02: Render live progress metrics cards on dashboard

### Phase 6: Final Polish & Deployment
**Goal**: Security hardening and hosting deployment.
**Mode**: mvp
**Depends on**: Phase 5
**Success Criteria**:
  1. Firestore security rules prevent unauthorized multi-tenant queries.
  2. Next.js app builds cleanly for production.
  3. Site hosts successfully on Vercel.
**Plans**: 2 plans

Plans:
- [x] 06-01: Write Firestore/Storage security rules
- [x] 06-02: Optimize assets, build project, and host live

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Initialize Next.js & Componentize Stitch UI | 3/3 | Completed | 2026-06-26 |
| 2. Firebase Auth & Database Infrastructure | 2/2 | Completed | 2026-06-27 |
| 3. Firebase Storage & Gemini AI Vision Integration | 2/2 | Completed | 2026-06-27 |
| 4. Meal Logging, Editing & History Management | 4/4 | Completed | 2026-06-27 |
| 5. Bento Dashboard & Metrics | 2/2 | Completed | 2026-06-27 |
| 6. Final Polish & Deployment | 2/2 | Completed | 2026-06-27 |
