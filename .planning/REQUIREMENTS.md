# Requirements: NutriSnap

**Defined:** 2026-06-26
**Core Value:** Empower users to track their nutrition instantly and effortlessly through AI image analysis on a clean, calm dashboard.

## v1 Requirements

### Authentication

- [ ] **AUTH-01**: User can sign up with email and password using Firebase Auth.
- [ ] **AUTH-02**: User can sign in using existing credentials.
- [ ] **AUTH-03**: User can sign out from the sidebar.
- [ ] **AUTH-04**: User session persists across browser refreshes.

### Layout & Foundation

- [ ] **LAYT-01**: Create clean component folder structure inside `src/` directory.
- [ ] **LAYT-02**: Implement responsive app layout shell with Sidebar navigation (hidden on mobile).
- [ ] **LAYT-03**: Setup Tailwind CSS v4 styling rules and custom color themes (calm palette, brand fonts).
- [ ] **LAYT-04**: Componentize core screen static mockups from Google Stitch (Dashboard, Upload Meal, Meal Details, Settings).

### Meal Photo Upload & Storage

- [ ] **IMGL-01**: User can drag/drop or select an image file on the Upload Meal page.
- [ ] **IMGL-02**: App uploads meal image to Firebase Storage under user-specific subdirectories (`users/{uid}/meals/`).
- [ ] **IMGL-03**: User receives a visual upload progress indicator and thumbnail preview.

### AI Nutrition Analysis

- [ ] **AIAN-01**: Create secure Next.js Server Route `/api/analyze` to process Gemini generative AI requests.
- [ ] **AIAN-02**: Pass meal photo to Gemini-1.5-flash with custom system instructions to extract nutrition data.
- [ ] **AIAN-03**: Enforce strict JSON Schema output from Gemini containing: identified foods, estimated weights, calories, protein, carbs, and fats.
- [ ] **AIAN-04**: Client receives and parses the AI analysis result to display as a preview page.

### Meal Logging & Storage

- [ ] **MEAL-01**: Save the approved meal log (photo URL, identified foods list, calories, macros, timestamp) to Firestore collection (`users/{uid}/meals`).
- [ ] **MEAL-02**: Allow users to adjust portion weights or macro totals manually before saving.
- [ ] **MEAL-03**: Allow users to delete a logged meal from their daily history list.

### Bento Dashboard & Metrics

- [ ] **DASH-01**: Dashboard displays calorie, protein, carb, and fat cards with visual progress bars.
- [ ] **DASH-02**: Metrics are calculated reactively for the current day from the Firestore database logs.
- [ ] **DASH-03**: Dashboard displays a list of "Today's Meals" showing thumbnail, name, calories, and macros.

## v2 Requirements

### Analytics & Trends

- **TRND-01**: Dashboard renders a visual weekly energy bar chart showing calories consumed.
- **TRND-02**: Analytics page displays daily averages and macro balance ratios over a 7-day or 30-day window.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Multi-user social feeds | Out of scope for MVP; target single-user tracking value first. |
| Custom barcode scanner | High API dependency and license cost; Gemini label reading can substitute. |
| Offline SQLite database | Keep backend cloud-based via Firebase. |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 | Phase 2 | Pending |
| AUTH-02 | Phase 2 | Pending |
| AUTH-03 | Phase 2 | Pending |
| AUTH-04 | Phase 2 | Pending |
| LAYT-01 | Phase 1 | Pending |
| LAYT-02 | Phase 1 | Pending |
| LAYT-03 | Phase 1 | Pending |
| LAYT-04 | Phase 1 | Pending |
| IMGL-01 | Phase 3 | Pending |
| IMGL-02 | Phase 3 | Pending |
| IMGL-03 | Phase 3 | Pending |
| AIAN-01 | Phase 3 | Pending |
| AIAN-02 | Phase 3 | Pending |
| AIAN-03 | Phase 3 | Pending |
| AIAN-04 | Phase 3 | Pending |
| MEAL-01 | Phase 4 | Pending |
| MEAL-02 | Phase 4 | Pending |
| MEAL-03 | Phase 4 | Pending |
| DASH-01 | Phase 5 | Pending |
| DASH-02 | Phase 5 | Pending |
| DASH-03 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 21 total
- Mapped to phases: 21
- Unmapped: 0 ✓

---
*Requirements defined: 2026-06-26*
*Last updated: 2026-06-26 after initial definition*
