# Feature Research

**Domain:** Premium AI-Powered Nutrition Tracking Web Application (NutriSnap)
**Researched:** 2026-06-26
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| User Account & Sign-in | Users want secure personal data storage. | LOW | Implement with Firebase Auth (Email/Password). |
| Nutrition Dashboard | Daily view of total calories, protein, carbs, and fats. | MEDIUM | Standard macro metrics display with visual progress bars. |
| Meal Photo Upload | Users want to snap/select a photo to log food. | MEDIUM | Connects to Firebase Storage and exposes files to AI vision. |
| Food & Nutrient Breakdown | Standard list of identified foods, calories, and macros. | HIGH | Handled via Gemini API image analysis. |
| Daily Meal Log | List of today's logged meals with delete/edit ability. | MEDIUM | CRUD operations against Firebase Firestore. |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Zero-Typing AI Logging | Users just snap and approve — no manual search or scale required. | HIGH | Highly optimized Gemini system prompt yielding structural JSON. |
| Premium Minimalist Dashboard | Bento-style, calm, responsive dashboard reflecting premium aesthetics. | MEDIUM | Clean glassmorphism styling, curated calm color palette. |
| Weekly Energy & Trends | Visualizes nutrition averages, helping users spot weekly macros consistency. | MEDIUM | Simple Tailwind CSS bar charts with hover tooltips. |
| Interactive Meal Adjustment | Ability to edit quantities/types of food identified by AI. | HIGH | Inline UI allowing adjustments which recalculate macros dynamically. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Barcode scanner SDK | Fast packaged food tracking. | HIGH complexity, database licenses are expensive. | Allow users to photo the nutritional label; Gemini reads it. |
| Social feeds & sharing | Social reinforcement. | HIGH data governance overhead, distracting. | Defer social sharing; focus on single-user progress. |

## Feature Dependencies

```
[Gemini AI Vision]
     └──requires──> [Firebase Storage Upload]
                        └──requires──> [Firebase Auth Session]

[Weekly Energy Trends] ──enhances──> [Nutrition Dashboard]
```

### Dependency Notes

- **Gemini AI Vision requires Firebase Storage Upload:** Gemini API needs a public or accessible image URL/bytes. Uploading to Storage first and passing bytes to Gemini is the safest approach.
- **Firebase Storage Upload requires Auth Session:** Images should be isolated in user-specific storage paths (`users/{uid}/meals/{mealId}`) for privacy.

## MVP Definition

### Launch With (v1)

Minimum viable product — what's needed to validate the concept.

- [ ] Project setup & layout — Next.js, Tailwind v4, folder structure under `src/` and Stitch componentization.
- [ ] Firebase Auth — Email registration and secure sessions.
- [ ] Meal Upload & AI Identification — Photo upload, Gemini API integration, JSON output of food/macros.
- [ ] Save & Log — Store meal log in Firestore; display daily summary of macros.
- [ ] Bento Dashboard & History — Beautiful dashboard cards, meal history view.

### Add After Validation (v1.x)

Features to add once core is working.

- [ ] Weekly Trends — Bar charts showing macro trends.
- [ ] Dynamic adjustment — Users adjusting portion sizes/AI estimates.

### Future Consideration (v2+)

Features to defer until product-market fit is established.

- [ ] PDF Export for nutritionists.
- [ ] Recipes suggestions based on remaining daily macros.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Next.js Init & Stitch UI | HIGH | LOW | P1 |
| Firebase Auth | HIGH | LOW | P1 |
| Gemini AI Vision Logging | HIGH | HIGH | P1 |
| Meal Logs & Dashboard | HIGH | MEDIUM | P1 |
| Weekly History Charts | MEDIUM | MEDIUM | P2 |
| Portions Editing | HIGH | HIGH | P2 |

---
*Feature research for: NutriSnap*
*Researched: 2026-06-26*
