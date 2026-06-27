# Phase 3 Context: Cloudinary & Gemini AI Vision Integration

This document outlines key technical decisions and constraints for Phase 3 of the NutriSnap implementation.

## Decisions

### 1. Gemini Model
- **Model**: `gemini-2.5-flash`
- **Purpose**: Fast, cost-efficient multimodal vision and structured JSON nutrition estimation.

### 2. Image Upload Pipeline
- **Provider**: Cloudinary (Client-Side Direct Upload)
- **Pipeline**:
  1. The client compresses the image to keep size low while maintaining quality.
  2. The client uploads the image directly to Cloudinary using an unsigned/signed upload preset.
  3. The resulting secure URL (`secure_url`) is stored in Firestore and passed to the Next.js Server Route for Gemini analysis.
- **Firebase Storage**: Disabled/not used for image storage.

### 3. Structured JSON Schema
- **SDK config**: Enforced using the Gemini SDK's native `responseSchema` to guarantee strict JSON outputs matching the React/TypeScript data structures.

### 4. Client-side Image Compression
- **Implementation**: Compress images in the browser before sending to Cloudinary using a canvas-based compression helper.

### 5. AI Review Screen UI
- **Flow**:
  1. Upload image -> Compress -> Upload to Cloudinary.
  2. Pass URL to server `/api/analyze` -> Analyze with Gemini.
  3. Render parsed response on the review screen showing detected items, serving sizes, and macro breakdowns.
  4. Allow users to:
     - Add missing foods
     - Edit foods/serving sizes
     - Remove incorrect detections
  5. Instantly recalculate total calories, protein, carbs, and fats.
  6. Save to Firestore under `users/{uid}/meals` only after user confirmation.
