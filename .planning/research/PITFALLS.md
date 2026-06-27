# Pitfalls Research

**Domain:** Premium AI-Powered Nutrition Tracking Web Application (NutriSnap)
**Researched:** 2026-06-26
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Gemini API Key Exposure

**What goes wrong:**
Developers commit the `.env.local` containing their Gemini API keys to public GitHub repositories, or request the API directly from client React files, exposing the key to site visitors' browser network tabs.

**Why it happens:**
It is easier to call `GoogleGenerativeAI` inside client components without setting up a backend server proxy or Next.js route handlers.

**How to avoid:**
Set up a Next.js Server Route/Route Handler (`app/api/analyze/route.ts`) which instantiates `GoogleGenerativeAI` using the private server-side env variable `GEMINI_API_KEY`. Never prefix the Gemini key with `NEXT_PUBLIC_`.

**Warning signs:**
Seeing code imports of `@google/generative-ai` inside files that have `"use client"` at the top.

**Phase to address:**
Phase 3 (AI integration).

---

### Pitfall 2: Hallucinated/Vague AI Macro Estimates

**What goes wrong:**
Gemini returns unrealistic calorie counts (e.g. 5,000 calories for an apple) or outputs descriptive text paragraphs instead of clean numbers.

**Why it happens:**
Using vague instructions in the prompt like "Tell me the macros for this food."

**How to avoid:**
Use strict prompt engineering, system instructions, and enforce JSON Schema structures using Gemini's `responseMimeType: "application/json"` feature. Instruct the model to make educated standard weight-based calculations if quantities are unclear.

**Warning signs:**
Parsing errors in JSON response or wild deviations in calorie logs.

**Phase to address:**
Phase 3 (AI integration).

---

### Pitfall 3: Firebase Auth and Firestore Security Rules Gap

**What goes wrong:**
Any logged-in user can query or modify the meal log records of another user because Firestore collections are unprotected by default.

**Why it happens:**
Leaving Firestore database rules in default "test mode" (`allow read, write: if true;`).

**How to avoid:**
Enforce strict Firebase security rules that require matching users to their own documents (`request.auth.uid == resource.data.userId`).

**Warning signs:**
Tests or manual queries running successfully against documents that do not belong to the active authenticated user ID.

**Phase to address:**
Phase 2 (Firebase Authentication & database setup).

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Skipping Next.js Route handlers for Gemini | Quick client prototyping | Exposes key in build files; key gets revoked immediately. | Never. |
| Storing images in base64 inside Firestore database | Skips Firebase Storage setup | Inflates Firestore document sizes, hitting the 1MB document limit fast. | Never. |
| Hardcoding macro values for testing | Rapid layout styling | Makes UI static; developers forget to swap it out with dynamic data. | Phase 1 (UI prototype). |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Firebase Web SDK | Initializing Firebase multiple times across different page loads. | Create a single initialized file (`src/lib/firebase.ts`) which checks if an app already exists before initializing. |
| Gemini Vision API | Sending high-res, raw 10MB images directly to Gemini, causing network timeouts. | Compress and resize images client-side before uploading to Firebase Storage and calling Gemini. |

## "Looks Done But Isn't" Checklist

- [ ] **Meal Photo Upload:** Looks done when file uploads to page, but is actually missing server-side error handling if connection is lost.
- [ ] **Auth Sign-in:** Looks done when UI goes to home page, but is missing proper redirect loaders when authorization token is loading on fresh refresh.

---
*Pitfalls research for: NutriSnap*
*Researched: 2026-06-26*
