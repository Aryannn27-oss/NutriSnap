# Phase 5 Context: Bento Dashboard & Metrics

This document outlines key technical decisions and constraints for Phase 5 of the NutriSnap implementation.

## Decisions

### 1. Daily Log Query & Snapshot Listener
- **Operation**: Query Firestore subcollection `users/{uid}/meals` for documents where `date == localDateStr` (in local timezone `YYYY-MM-DD`).
- **Sync**: Use `onSnapshot` to reactively update the client state when meals are added, edited, or deleted.

### 2. Live Progress Metrics
- **Macro Cards**: Render Calorie, Protein, Carb, and Fat cards showing current progress against user goals.
- **Goal Targets**: Targets are fetched dynamically from `profileData` (configured on the Goals page).
- **Weekly Chart**: Render a dynamic 7-column chart highlighting today's day of the week, with other days initializing to zero.
- **Food Log**: Display today's meals list with image previews and calorie values below the macro metrics.
