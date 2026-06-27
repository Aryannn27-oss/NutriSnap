# Phase 4 Context: Meal Logging, Editing & History Management

This document outlines key technical decisions and constraints for Phase 4 of the NutriSnap implementation.

## Decisions

### 1. Database CRUD Operations
- **Collection**: Saved under `users/{uid}/meals`.
- **Query Filter**: Log entries utilize local date string formats (`YYYY-MM-DD`) using standard browser timezone conversions (`toLocaleDateString("en-CA")`) to support daily totals queries.
- **Timestamps**: Uses Firebase `serverTimestamp()` for `createdAt` and `updatedAt` tracking.
- **Data Payload**: Stores both original AI output and final user-confirmed meal data.

### 2. Manual Customization & Editing UI
- **Log Modifications**: Inline editing is supported on the Meal Log page (`/meals`). Clicking Edit opens form inputs enabling users to adjust portion details, names, times, categories (Breakfast, Lunch, Dinner, Snack), and macro amounts.
- **Deletions**: Log entries can be deleted directly with a confirmation pop-up.

### 3. Dashboard Integration
- **Sync**: Dashboard totals recalculate immediately after any add, edit, or delete operation.
