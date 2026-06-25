# Requirements: NutriSnap

**Defined:** 2026-06-26
**Core Value:** Faithfully implement the premium Google Stitch editorial design system and visual hierarchy, ensuring an outstanding aesthetic and seamless user experience for the initial MVP modules.

## v1 Requirements

### Authentication

- [ ] **AUTH-01**: Clean visual layout matching the Editorial Modernism style.
- [ ] **AUTH-02**: Sign-up and Sign-in forms with full client-side validation using React Hook Form and Zod.
- [ ] **AUTH-03**: Interactive input fields with light 1px borders transitioning to Deep Forest Green (#061b0e) on focus.
- [ ] **AUTH-04**: Simulated user session using Zustand store for login/logout state transitions.

### Dashboard

- [ ] **DASH-01**: Asymmetric, magazine-spread layout (Main dashboard + Sidebar style) on desktop.
- [ ] **DASH-02**: High-contrast, large numeric data (calories, primary macros) using Source Serif 4 display font.
- [ ] **DASH-03**: Daily macro progress indicators using the thick-to-thin visual design (1px background track, 4px progress bar with rounded ends).
- [ ] **DASH-04**: Dense but breathable recent meals list separated by thin 1px `border-low-contrast` lines instead of shadows.
- [ ] **DASH-05**: Interactive quick-action buttons in solid Deep Forest Green with 4px corner radius.

### Upload Meal

- [ ] **UPLD-01**: Image selector/drop zone for uploading meal photos.
- [ ] **UPLD-02**: Interactive camera upload simulator for mobile mockups.
- [ ] **UPLD-03**: Sage-colored processing indicator representing the simulated AI analysis state.

### AI Result Screen

- [ ] **RSLT-01**: Clear editorial breakdown of analyzed nutrients (calories, fat, protein, carbs) with custom annotations using Source Serif 4.
- [ ] **RSLT-02**: Confident solid blocks and thin outlines showing recommended vs actual meal targets.
- [ ] **RSLT-03**: Button to save/add the analyzed meal to the history.

### Meal History

- [ ] **HIST-01**: Data-dense but readable timeline log of past meals.
- [ ] **HIST-02**: Search input and category filter buttons.
- [ ] **HIST-03**: Inspect detail view for any past meal entry.

### User Profile

- [ ] **PROF-01**: Personal info form (avatar display, name, email) with validation.
- [ ] **PROF-02**: Nutritional goals form to modify daily target calories and macro ratios.
- [ ] **PROF-03**: Clean and elegant presentation of the user's subscription tier.

## v2 Requirements

### Supabase DB Integration
- **DB-01**: Live Supabase user database authentication synchronization.
- **DB-02**: Meal log history data persistence to Supabase tables.

### AI Integration
- **AI-01**: Real food image recognition using AI model.
- **AI-02**: Automated nutritional estimation from AI model.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Real-time chat/support | Non-core to MVP value |
| Heavy animations and 3D effects | Stitch design specifies flat, confident blocks and natural depth |
| Real AI analysis API | Mock data only for this initial frontend UI MVP stage |
| Real database persistence | Mock Zustand storage only for this initial stage |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 | Phase 1 | Pending |
| AUTH-02 | Phase 1 | Pending |
| AUTH-03 | Phase 1 | Pending |
| AUTH-04 | Phase 1 | Pending |
| DASH-01 | Phase 2 | Pending |
| DASH-02 | Phase 2 | Pending |
| DASH-03 | Phase 2 | Pending |
| DASH-04 | Phase 2 | Pending |
| DASH-05 | Phase 2 | Pending |
| UPLD-01 | Phase 3 | Pending |
| UPLD-02 | Phase 3 | Pending |
| UPLD-03 | Phase 3 | Pending |
| RSLT-01 | Phase 3 | Pending |
| RSLT-02 | Phase 3 | Pending |
| RSLT-03 | Phase 3 | Pending |
| HIST-01 | Phase 4 | Pending |
| HIST-02 | Phase 4 | Pending |
| HIST-03 | Phase 4 | Pending |
| PROF-01 | Phase 5 | Pending |
| PROF-02 | Phase 5 | Pending |
| PROF-03 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 21 total
- Mapped to phases: 21
- Unmapped: 0 ✓

---
*Requirements defined: 2026-06-26*
*Last updated: 2026-06-26 after initial definition*
