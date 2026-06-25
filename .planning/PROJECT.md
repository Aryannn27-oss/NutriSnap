# NutriSnap

## What This Is

NutriSnap is a premium AI-powered nutrition tracking web application. Designed for health-conscious professionals who value visual precision, it elevates nutrition tracking from a typical tech-centric tool into a quiet-luxury, editorial-style digital diary.

## Core Value

Faithfully implement the premium Google Stitch editorial design system and visual hierarchy, ensuring an outstanding aesthetic and seamless user experience for the initial MVP modules.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Authentication Module (Clean visual layout, form validation, and session states)
- [ ] Dashboard Module (Asymmetric layout, key calorie/macro numeric highlights in Source Serif 4, responsive grid)
- [ ] Upload Meal Module (Drag-and-drop/camera simulation UI, premium typography, off-white card layout)
- [ ] AI Result Screen Module (Editorial breakdown of meals, macro progression bars with thick-to-thin styling)
- [ ] Meal History Module (Breathable but dense database log with thin lines, search/filter)
- [ ] User Profile Module (Subscription tier, user preferences, aesthetic settings)

### Out of Scope

- Live AI/ML Model Processing — We will simulate/mock nutrition breakdown results using deterministic TS mocks to focus purely on faithful UI replication.
- Real-time DB Sync & API write-back — Initial phases will use Zustand and mock stores; DB persistence is out of scope until explicitly requested.
- Custom fonts installation — We will load standard Inter and Google Web Fonts (Source Serif 4) via Next.js Font loading.

## Context

- Single source of truth for aesthetics is `e:\antigravity\Nutrisnap\DESIGN.md`.
- No glassmorphism, no synth gradients, and no rounded button pill shapes. Use solid off-white backgrounds, thin outlines, and 4px (standard) or 8px (large) radii.

## Constraints

- **Design System**: Strict adherence to Google Stitch `design.md` (colors: deep forest green `#061b0e`, warm clay `#8c4f10`, muted sage `#bdce89`, off-white canvas `#fbf8ff`).
- **Tech Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, shadcn/ui, Supabase, TanStack Query, Zustand, React Hook Form, Zod.
- **Responsiveness**: Complete support across mobile, tablet, and desktop viewports.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router | Modern React 19 features, clean directory-based routing | — Pending |
| Mock data stores | Frontend-first development guidelines before backend integration | — Pending |

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
