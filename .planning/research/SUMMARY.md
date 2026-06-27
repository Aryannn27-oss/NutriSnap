# Project Research Summary

**Project:** NutriSnap
**Domain:** Premium AI-Powered Nutrition Tracking Web Application
**Researched:** 2026-06-26
**Confidence:** HIGH

## Executive Summary

NutriSnap is designed as a high-end, visual-first wellness application where users can log meals in seconds using AI vision analysis. Modern applications in this space rely heavily on fullstack React systems (specifically Next.js 15) to combine rapid client responsiveness with server-side API execution. Our stack choice combines Next.js 15, React 19, Tailwind CSS v4, Firebase Web SDK (v10), and the Google Gemini Generative AI SDK (`@google/generative-ai`).

The core development strategy follows a Vertical MVP approach, prioritizing a slice-by-slice integration. We will construct a Next.js framework, componentize static design files from Google Stitch, secure Firebase Auth & Database transactions, establish secure Gemini Route Handlers, and present them on a clean, bento-style dashboard. Key risks include Gemini API key exposure on the client-side, database breaches from generic Firestore security rules, and user friction due to inaccurate or slow AI processing.

## Key Findings

### Recommended Stack

- **Framework**: Next.js 15 utilizing App Router structure for Server-side Route Handlers.
- **Styling**: Tailwind CSS v4 for clean, CSS-first responsive layouts.
- **Database / Auth / Storage**: Firebase Web SDK (Auth, Firestore, Storage).
- **AI Engine**: Google Gemini API via server routes to identify foods from photos and return structured JSON macro summaries.

### Expected Features

**Must have (table stakes):**
- Email registration & login (Firebase Auth).
- Dashboard macro summary cards (Calories, Carbs, Protein, Fats).
- Drag-and-drop or camera photo upload (Firebase Storage).
- Gemini API food analysis & macro generation.
- Interactive log history showing meals eaten today.

**Should have (competitive):**
- Dynamic adjusters (users manually correcting portion weights or calories).
- Weekly energy charts and average macro trends.

### Architecture Approach

The project utilizes a clean `src/` modular layout separating concerns:
1. `src/components/ui/` for pure presentation components.
2. `src/components/layout/` for application nav/sidebar wrapping.
3. `src/components/features/` for complex meals logging and auth dashboards.
4. `src/services/` containing pure data queries (Auth, Firestore DB, Storage).
5. `src/lib/` for initialized API instance libraries.

### Critical Pitfalls

1. **Gemini API Key Exposure:** Avoid importing Gemini SDK inside `"use client"` files. Wrap it inside a Next.js Route Handler (`app/api/analyze/route.ts`).
2. **Generic Database Access Rules:** Ensure Firestore security rules permit reading and writing only to documents whose `userId` matches the authenticated `request.auth.uid`.
3. **Hallucinated Nutrition Outputs:** Use strict JSON Schema response parameters in Gemini config to guarantee parsing consistency.

## Implications for Roadmap

Suggested 6-Phase MVP development structure:

### Phase 1: Initialize Next.js & Componentize Stitch UI
**Rationale:** Build the foundation and establish styling systems.
**Delivers:** Initial Next.js structure, Tailwind v4 setup, global layout with Sidebar navigation, and static dashboard, login, settings, and upload pages.

### Phase 2: Firebase Auth & Database Infrastructure
**Rationale:** Secure user identity and set up database schemas before coding features.
**Delivers:** Firebase connection library, login/signup handlers, Firestore meal log database services, and authenticated layouts.

### Phase 3: Firebase Storage & Gemini AI Vision Uploads
**Rationale:** The core feature slice. Integrates image files with AI analysis.
**Delivers:** Storage upload bucket service, Next.js Server Route Handler executing Gemini-1.5-flash analysis with structured JSON constraints, and meal detection previews.

### Phase 4: Meal Logging & Interactive Customization UI
**Rationale:** Connecting the AI output directly to user metrics.
**Delivers:** Save meal service, custom adjusters (portion/macro edits), and dynamic dashboard updates.

### Phase 5: Dashboard Analytics, Trends & Weekly Charts
**Rationale:** Providing long-term value to users.
**Delivers:** Interactive charts showing daily/weekly averages, macro trends, and historical navigation.

### Phase 6: Final Polish, Optimization & Deploy
**Rationale:** Complete verification.
**Delivers:** Client performance tuning, Firestore indexing, custom error overlays, and Vercel hosting setup.

---
*Research completed: 2026-06-26*
*Ready for roadmap: yes*
