# Stack Research

**Domain:** Premium AI-Powered Nutrition Tracking Web Application (NutriSnap)
**Researched:** 2026-06-26
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | ^15.0.0 | Fullstack Framework & SSR | App router offers Server Actions and Route Handlers for API calls (ex: Gemini) to secure keys. |
| React | ^19.0.0 | UI Layer | Library for building modular UI, integrated seamlessly in Next.js 15. |
| TypeScript | ^5.0.0 | Type Safety | Enforces structure for meal, macro, and user profiles across both client and server code. |
| Tailwind CSS | ^4.0.0 | CSS-first Styling | Clean styling via utility classes with CSS-based customization, avoiding bulky JS configs. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| firebase | ^10.12.0 | Authentication, Database, Storage | Real-time listeners for Firestore stats, Storage for meal photos, Firebase Auth for security. |
| @google/generative-ai | ^0.21.0 | Google Gemini API SDK | Generates food identification and nutritional breakdown from meal photos. |
| lucide-react | ^0.450.0 | Icon Library | Renders clean, modern icons in UI elements to maintain high aesthetic standards. |
| canvas-confetti | ^1.9.0 | Micro-interactions | Confetti burst when user meets daily protein/caloric goals (differentiator). |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| @tailwindcss/postcss | Next.js PostCSS build plugin for Tailwind v4 | Required for CSS-first Tailwind imports in Next.js. |
| ESLint | Code Linting | Standard JavaScript/TypeScript linting, preset inside Next.js templates. |

## Installation

```bash
# Core & Styling
npm install @google/generative-ai firebase lucide-react canvas-confetti
npm install -D typescript @types/react @types/react-dom @tailwindcss/postcss postcss tailwindcss @types/canvas-confetti
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Firebase Auth | NextAuth.js (Auth.js) | When custom database models (e.g. Postgres) are used instead of Firebase Firestore. |
| Gemini API | OpenAI GPT-4o-mini | If the user requests OpenAI integrations, but Gemini has high visual understanding and is free/cost-effective. |
| Firebase Storage | Cloudinary | If automated image transformations (resizing/cropping) are needed on the fly. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| tailwind.config.js | Tailwind v4 uses CSS configuration directives rather than JS config. | @import "tailwindcss" configuration in globals.css |
| Direct client Gemini API keys | Exposes Gemini API keys directly in the client code bundle. | Next.js API Routes (e.g., `app/api/chat/route.ts`) |

## Stack Patterns by Variant

**If serverless server action execution:**
- Use Next.js Server Actions with standard TS type validation.
- Because they reduce fetch boilerplate and enforce end-to-end type safety.

**If large image uploads:**
- Use Firebase Storage direct client-side upload via signed/authorized tokens, rather than passing raw base64 uploads through Next.js server limits.
- Because it avoids Next.js payload limitations and server timeouts.

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| Next.js @ 15.x | React @ 19.x | Next.js 15 officially supports React 19 as the peer dependency. |
| Firebase @ 10.x | React @ 19.x | Fully compatible with client-side React bindings. |

## Sources

- [Next.js official docs] — https://nextjs.org/docs
- [Tailwind CSS v4 official docs] — https://tailwindcss.com/docs/v4-beta
- [Google AI SDK docs] — https://ai.google.dev/gemini-api/docs

---
*Stack research for: NutriSnap*
*Researched: 2026-06-26*
