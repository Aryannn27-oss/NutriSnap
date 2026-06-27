# Architecture Research

**Domain:** Premium AI-Powered Nutrition Tracking Web Application (NutriSnap)
**Researched:** 2026-06-26
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Next.js Client (App Router)          │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐    ┌──────────────────┐    ┌─────────┐ │
│  │ Components (ui) │    │ Features (meals) │    │ Hooks   │ │
│  └────────┬────────┘    └────────┬─────────┘    └────┬────┘ │
│           │                      │                   │      │
├───────────┼──────────────────────┼───────────────────┼──────┤
│           │                      ▼                   │      │
│           │           Next.js Server (Route Handlers)│      │
│           │           ┌────────────────────────────┐ │      │
│           │           │   Gemini API Proxy / API   │ │      │
│           │           └──────────────┬─────────────┘ │      │
│           ▼                          │               ▼      │
├──────────────────────────────────────┼──────────────────────┤
│                        Firebase SDK Integration Layer       │
│  ┌───────────────────────┐  ┌────────▼─────────┐            │
│  │ Firebase Auth         │  │ Gemini Vision AI │            │
│  └───────────────────────┘  └──────────────────┘            │
│  ┌───────────────────────┐  ┌──────────────────┐            │
│  │ Firestore Database    │  │ Firebase Storage │            │
│  └───────────────────────┘  └──────────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Pages (app) | Route layouts, route loading, metadata. | Next.js App Router folders. |
| ui/ | Reusable presentation elements (buttons, inputs, cards). | React + Tailwind classes inside `src/components/ui/`. |
| layout/ | App shell, navigation sidebar. | `src/components/layout/Sidebar.tsx` and layout templates. |
| features/ | High-level widgets, dashboard logs, photo uploader. | `src/components/features/meals/` and `dashboard/`. |
| lib/ | Initialization of Firebase client app and Firebase configurations. | `src/lib/firebase.ts`. |
| services/ | Firestore read/writes, image upload functions. | `src/services/db.ts`, `src/services/storage.ts`. |

## Recommended Project Structure

```
src/
├── app/                  # Next.js App Router pages and API routes
│   ├── api/              # Secure API proxy endpoints (Gemini)
│   │   └── analyze/      # POST route for Gemini image processing
│   ├── dashboard/        # Main app view
│   ├── upload/           # Photo upload screen
│   ├── login/            # Authentication screens
│   ├── globals.css       # Core styles and Tailwind imports
│   └── layout.tsx        # Global shell and provider wrapper
├── components/           # UI Component framework
│   ├── ui/               # Lower-level atoms (Button, Card, Input)
│   ├── layout/           # Sidebar, Navbar, Mobile Header
│   └── features/         # Complex widgets (DashboardCard, MealLogger)
├── hooks/                # Custom React Hooks (useAuth, useDailyMacros)
├── lib/                  # Initialized instances of SDK integrations
│   ├── firebase.ts       # Client-side Firebase App init
│   └── gemini.ts         # Secure server-side Gemini wrapper config
├── services/             # Firestore, Auth, Storage database utilities
│   ├── auth.ts           # Firebase signup/login helpers
│   ├── db.ts             # Meal logging CRUD functions
│   └── storage.ts        # Image upload handlers
├── types/                # Core TypeScript shapes
│   └── index.ts          # User, Meal, Macro type definitions
└── utils/                # General formatting and math functions
    └── format.ts         # Calories formatting, date parsers
```

### Structure Rationale

- **src/components/features/:** Separates presentation code from large domain logic (e.g. food parsing, user authentication state).
- **src/services/:** Centralizes data actions (Firestore/Firebase Storage) into easily mockable, separate typescript functions instead of scattering Firebase queries throughout components.
- **src/app/api/:** Keeps Gemini generative AI call logic hidden from the browser client, preventing developer billing key theft.

## Architectural Patterns

### Pattern 1: Gemini Structural JSON Response

**What:** Forcing the Gemini model to respond in a strict JSON format matching a specific typescript schema.
**When to use:** Meal image upload parser returning a breakdown list of items, calories, and macros.
**Trade-offs:** Needs prompt tuning or setting JSON Schema response constraints via Google AI SDK configurations.

**Example:**
```typescript
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: {
      type: SchemaType.OBJECT,
      properties: {
        meals: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              foodName: { type: SchemaType.STRING },
              calories: { type: SchemaType.INTEGER },
              protein: { type: SchemaType.INTEGER },
              carbs: { type: SchemaType.INTEGER },
              fats: { type: SchemaType.INTEGER }
            },
            required: ["foodName", "calories", "protein", "carbs", "fats"]
          }
        }
      }
    }
  }
});
```

## Data Flow

### Request Flow

```
[User snaps meal photo]
     ↓
[Upload Component] ──uploads photo to──> [Firebase Storage] ──returns──> [Photo Storage URL]
     ↓
[Meal Service] ──POST request with image URL / bytes──> [Next.js Route Handler (/api/analyze)]
     ↓
[Route Handler] ──triggers Gemini model analysis──> [Gemini Vision Model]
     ↓
[Route Handler] <──returns parsed food JSON structure── [Gemini Vision Model]
     ↓
[Upload Page] ──saves records to──> [Firestore Database]
     ↓
[Dashboard] ──reactively updates totals from──> [Firestore Snapshot Listeners]
```

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1k users | Simple serverless setup. Direct Firestore client-side SDK reads, Next.js Serverless API proxy for Gemini. |
| 1k-100k users | Cache Gemini results locally in Firestore for similar/identical foods to cut AI API usage costs. |
| 100k+ users | Implement content delivery network (CDN) caching for dashboard assets and optimize Firestore indexes. |

## Sources

- [Next.js API Routes] — https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- [Firebase Storage references] — https://firebase.google.com/docs/storage/web/start
- [Gemini Structured Outputs Guide] — https://ai.google.dev/gemini-api/docs/structured-outputs

---
*Architecture research for: NutriSnap*
*Researched: 2026-06-26*
