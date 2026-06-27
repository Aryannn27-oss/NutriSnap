# Phase 1 Research: Initialize Next.js & Componentize Stitch UI

**Researched:** 2026-06-26
**Confidence:** HIGH

## Overview

For Phase 1 of NutriSnap, we initialize Next.js 15, configure Tailwind CSS v4 using PostCSS, establish the required `src/` directory layout, and componentize Google Stitch UI screens (Dashboard, Upload Meal, Meal Details, and Settings).

## Key Research Findings

### 1. Next.js 15 & Tailwind v4 Integration
Tailwind CSS v4 is configured differently than v3. It relies on a PostCSS build plugin in Next.js.
- **Dependencies**: `tailwindcss`, `@tailwindcss/postcss`, `postcss`
- **Config**: A standard `postcss.config.mjs` file:
  ```javascript
  export default {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  };
  ```
- **CSS Import**: In `src/app/globals.css`, replace everything with `@import "tailwindcss";`.
- **Custom Theme configuration**: Custom colors and typography fonts from the Stitch HTML files (like `canvas`, `primary`, `headline-xl`) are declared directly inside the CSS using `@theme`:
  ```css
  @import "tailwindcss";

  @theme {
    --color-canvas: #F9F9F7;
    --color-primary: #061b0e;
    --color-secondary: #8c4f10;
    --color-tertiary: #121a00;
    --color-surface-container: #eeecfa;
    --color-border-low-contrast: #E2E2DF;
    
    --font-display: "Source Serif 4", serif;
    --font-body: "Inter", sans-serif;
  }
  ```

### 2. Fonts and Material Icons Integration
- We will import the `Inter` and `Source Serif 4` Google Fonts using Next.js `next/font/google` package to optimize loading speeds.
- Material Symbols Outlined icons will be loaded via a standard CDN stylesheet link tag inside the root layout:
  `<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />`

### 3. Folder Structure Setup
The folder structure must follow strict concern separation rules under `src/`:
- `src/app/` — routes, page layouts, API endpoints
- `src/components/ui/` — buttons, inputs, labels, cards
- `src/components/layout/` — app shells, sidebar navigation wrapper
- `src/components/features/` — meals list widget, upload form container
- `src/lib/` — config/SDK instances (Firebase init)
- `src/services/` — backend call handlers (Auth database functions)
- `src/types/` — core interfaces
- `src/hooks/` — hooks
- `src/utils/` — helper functions

## Implications for Phase 1 Plan

- Initialize Next.js 15 in the root directory.
- Configure Tailwind CSS v4.
- Create all core subdirectories under `src/`.
- Build the Sidebar navigation shell component.
- Build the mock Dashboard, Upload Meal, Meal Details, and Settings pages reusing custom styles and fonts from the Google Stitch source.
