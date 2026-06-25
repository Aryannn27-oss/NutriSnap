# Roadmap: NutriSnap

## Overview

This roadmap defines the implementation plan for the NutriSnap MVP frontend using Next.js 15, React 19, TypeScript, and Tailwind CSS. The design system from `design.md` (Editorial Modernism style with deep forest green, warm clay, sage-muted, and off-white neutrals) will be faithfully implemented. The phases are structured sequentially, with frontend implementation and mock data models preceding any backend or real AI database integrations.

## Phases

- [ ] **Phase 1: Environment Setup & Authentication** - Project scaffolding, shadcn/ui custom theme integration, and mock Auth forms.
- [ ] **Phase 2: Dashboard & Macro Visualization** - Asymmetric dashboard layout, large display metrics, and thick-to-thin macro progress indicators.
- [ ] **Phase 3: Upload Meal Flow** - Drag-and-drop/camera upload simulator UI and sage-colored processing screen.
- [ ] **Phase 4: AI Result Breakdown** - Editorial nutrient breakdown, recommended vs actual target charts, and confirmation action.
- [ ] **Phase 5: Meal History Timeline** - Searchable, filtered database list of logged meals and details inspector.
- [ ] **Phase 6: User Profile & Goals** - Target calorie/macro settings configuration and premium billing design screen.

---

## Phase Details

### Phase 1: Environment Setup & Authentication
**Goal**: Initialize the Next.js project with design system configuration and implement interactive mock Auth UI.
**Depends on**: Nothing
**Requirements**: AUTH-01, AUTH-02, AUTH-03, AUTH-04
**Success Criteria**:
  1. Next.js 15 dev server compiles successfully with Tailwind configured to use colors/fonts from `design.md`.
  2. Input fields show a 1px border transitioning to deep forest green `#061b0e` on focus.
  3. User can switch between Sign In and Sign Up views, with form validation errors showing on invalid inputs.
  4. Successful submission changes auth state in a Zustand store and redirects the user.
**Plans**: 3 plans

Plans:
- [ ] 01-01: Initialize Next.js project, install dependencies, configure Tailwind config and global css (Source Serif 4, Inter).
- [ ] 01-02: Configure shadcn/ui components (Button, Input, Form) mapping to our design system (4px border-radius, thin borders).
- [ ] 01-03: Implement Zustand store for auth session and create the Sign In / Sign Up page layouts.

### Phase 2: Dashboard & Macro Visualization
**Goal**: Build the asymmetric dashboard view displaying calorie totals, macro breakdowns, and historical weekly charts.
**Depends on**: Phase 1
**Requirements**: DASH-01, DASH-02, DASH-03, DASH-04, DASH-05
**Success Criteria**:
  1. Desktop dashboard features an asymmetric two-column (main content + sidebar) layout Reminiscent of a magazine spread.
  2. Large calorie and macro totals are rendered using the display font Source Serif 4.
  3. Progress bars show thick-to-thin layout (1px grey track, 4px colored progress bar).
  4. Recent meals list items are separated by a 1px border without drop shadows.
**Plans**: 3 plans

Plans:
- [ ] 02-01: Create the responsive asymmetric main dashboard page structure (12-column grid, 24px gutters).
- [ ] 02-02: Build visual summary tiles for calorie counts and daily nutrient trackers.
- [ ] 02-03: Integrate simple weekly macro progress charts using TanStack/Recharts or pure CSS grid charts.

### Phase 3: Upload Meal Flow
**Goal**: Implement the user upload flow utilizing drag-and-drop or simulated camera inputs.
**Depends on**: Phase 2
**Requirements**: UPLD-01, UPLD-02, UPLD-03
**Success Criteria**:
  1. Modal or dedicated section loads with drag-and-drop area.
  2. Interactive upload simulation triggers a sage-colored processing screen.
**Plans**: 2 plans

Plans:
- [ ] 03-01: Build the Upload Meal card UI conforming to off-white and green outlines.
- [ ] 03-02: Implement image picker simulation, mobile camera mock view, and Sage processing spinner animation.

### Phase 4: AI Result Breakdown
**Goal**: Display simulated AI nutrition results with macro comparison views and confirmation screens.
**Depends on**: Phase 3
**Requirements**: RSLT-01, RSLT-02, RSLT-03
**Success Criteria**:
  1. UI displays calculated metrics (calories, carbs, protein, fat) for the simulated image.
  2. Nutrient breakdown uses annotations rendered in Source Serif 4.
  3. Confirm button logs the meal into the Zustand store and returns to the dashboard.
**Plans**: 2 plans

Plans:
- [ ] 04-01: Build the AI Result page layout with meal photo container and nutrient table list.
- [ ] 04-02: Implement recommended vs actual target comparison bars and confirm-to-log action triggers.

### Phase 5: Meal History Timeline
**Goal**: Build the meal logging timeline database screen with filters and a detail modal.
**Depends on**: Phase 4
**Requirements**: HIST-01, HIST-02, HIST-03
**Success Criteria**:
  1. History page renders past meals in a clean list separated by thin borders.
  2. User can search items by title and filter by meal category.
  3. Clicking a meal opens a detailed popup containing complete mock nutrition data.
**Plans**: 3 plans

Plans:
- [ ] 05-01: Create the timeline list page layout using 1px border lines and no shadows.
- [ ] 05-02: Add search text filter and type selectors (Breakfast, Lunch, Dinner, Snack).
- [ ] 05-03: Implement the modal popup or detailed side drawer to inspect individual meal logs.

### Phase 6: User Profile & Goals
**Goal**: Implement user settings forms and subscription tier branding.
**Depends on**: Phase 5
**Requirements**: PROF-01, PROF-02, PROF-03
**Success Criteria**:
  1. Profile form allows updating display name and saving daily goals.
  2. Subscription status shows premium badge design with warm clay accenting.
**Plans**: 2 plans

Plans:
- [ ] 06-01: Build the profile information and nutritional target form views.
- [ ] 06-02: Create the billing and subscription tier upgrade screens.

---

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Environment Setup & Auth | 0/3 | Not started | - |
| 2. Dashboard & Macro Viz | 0/3 | Not started | - |
| 3. Upload Meal Flow | 0/2 | Not started | - |
| 4. AI Result Breakdown | 0/2 | Not started | - |
| 5. Meal History Timeline | 0/3 | Not started | - |
| 6. User Profile & Goals | 0/2 | Not started | - |
