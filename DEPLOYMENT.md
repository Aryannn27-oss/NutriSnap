# NutriSnap Deployment Guide

This guide outlines the environment configuration, build processes, and steps required to host NutriSnap live on Vercel.

## 1. Required Environment Variables

Configure these variables in your Vercel Dashboard under **Project Settings > Environment Variables**:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web Client SDK API Key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Project Auth Domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Project Storage Bucket URI |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase Web App ID |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Firebase Google Analytics Measurement ID |
| `GEMINI_API_KEY` | Google AI Gemini API Key (Server side) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name (Client upload) |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Cloudinary Unsigned Upload Preset name |

---

## 2. Firebase Configuration Checklist

Ensure your Firebase Console has the following configured:
1. **Authentication**: Enable **Email/Password** and **Google** sign-in providers under Build > Authentication > Sign-in method.
2. **Authorized Domains**: Add your production Vercel domain to the Authorized Domains list under Firebase Authentication settings.
3. **Firestore Database**: Create a Firestore instance in **Production Mode** and select your geographic region.
4. **Firestore Security Rules**: Deploy the rules defined in `firestore.rules`:
   ```rules
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
         
         match /meals/{mealId} {
           allow read, write: if request.auth != null && request.auth.uid == userId;
         }
       }
     }
   }
   ```

---

## 3. Cloudinary Setup Checklist

To enable meal image uploads:
1. Log in to your Cloudinary dashboard.
2. Go to **Settings > Upload**.
3. Scroll to **Upload presets** and click **Add upload preset**.
4. Configure:
   - **Preset name**: Matches your `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` variable.
   - **Signing Mode**: Select **Unsigned** (required for client-side uploads).
   - **Folder**: Optionally define a folder target (e.g. `nutrisnap`).
5. Go to **Settings > Security**. Ensure that **Restricted media types** does not block image formats.

---

## 4. Vercel Deployment Steps

1. Push your repository main branch to GitHub:
   ```bash
   git add .
   git commit -m "chore: production readiness audits and rule configurations"
   git push origin main
   ```
2. Open Vercel Dashboard and click **Add New > Project**.
3. Import your `NutriSnap` repository.
4. Expand **Environment Variables** and insert the keys listed in Section 1.
5. Keep default build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `next build` or `npm run build`
6. Click **Deploy**.

---

## 5. Post-Deployment Testing Checklist

Once Vercel completes the build:
- [ ] Access the live URL. Verify that unauthenticated requests redirect to `/login`.
- [ ] Register a new user using Google Sign-in or Email/Password.
- [ ] Confirm you are redirected to `/dashboard` and see the "Set Up Your Nutrition Goals" empty state.
- [ ] Go to `/goals`, enter age/gender/activity level, click **Calculate Goals**, make a manual adjustment, and hit **Save**.
- [ ] Return to `/dashboard` and verify progress cards display correct limit bounds.
- [ ] Go to `/upload`, choose a food image, and verify Cloudinary successfully saves the image.
- [ ] Confirm Gemini API accurately extracts nutrition data and shows the review panel.
- [ ] Confirm saving the meal updates the dashboard progress charts immediately.
