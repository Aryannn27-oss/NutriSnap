<!-- GSD:project-start source:PROJECT.md -->

## Project

**NutriSnap**

NutriSnap is a premium, AI-powered nutrition tracking web application. Users can upload photos of their meals, which are processed by the Gemini API to identify foods, calories, and macros, and track their daily nutrition progress on a clean, minimal dashboard.

**Core Value:** Empower users to track their nutrition instantly and effortlessly through AI image analysis on a clean, calm dashboard.

### Constraints

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

<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->

## Technology Stack

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

# Core & Styling

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

- Use Next.js Server Actions with standard TS type validation.
- Because they reduce fetch boilerplate and enforce end-to-end type safety.
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

<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.agents/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
