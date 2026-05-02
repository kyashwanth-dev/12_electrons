# Firebase Setup Guide

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or sign in to your Google account
3. Enter your project name (e.g., "12 Electrons")
4. Accept the terms and click **Create project**
5. Wait for the project to be created (2-3 minutes)

## Step 2: Enable Authentication

1. In the Firebase Console, go to **Authentication** (left sidebar)
2. Click the **Get started** button
3. Select **Email/Password** as the sign-in method
4. Toggle **Enable** switch on
5. Click **Save**

## Step 3: Create Firestore Database

1. Go to **Firestore Database** (left sidebar)
2. Click **Create database**
3. Choose **Start in test mode** (for development)
   - ⚠️ Note: For production, set up security rules properly
4. Select your region (closest to your location)
5. Click **Create**

## Step 4: Get Your Firebase Credentials

1. In the Firebase Console, go to **Project Settings** (⚙️ icon)
2. Scroll down to find your **Web API Configuration**
3. Look for the code snippet that starts with `const firebaseConfig = {...}`
4. Copy these values:
   - **apiKey** → `VITE_FIREBASE_API_KEY`
   - **authDomain** → `VITE_FIREBASE_AUTH_DOMAIN`
   - **projectId** → `VITE_FIREBASE_PROJECT_ID`
   - **storageBucket** → `VITE_FIREBASE_STORAGE_BUCKET`
   - **messagingSenderId** → `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - **appId** → `VITE_FIREBASE_APP_ID`

## Step 5: Update Your `.env` File

1. Open `.env` in your project root
2. Replace the placeholder values with your actual Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

## Step 6: Start Your App

```bash
npm run dev
```

Your app will now connect to your Firebase project!

## Step 7: Test the Setup

1. Open `http://localhost:5173`
2. Try signing up with a test email: `test@example.com`
3. Check Firebase Console → **Authentication** to see your test user
4. Add a component to the marketplace
5. Check Firebase Console → **Firestore** to see the new document

## Firestore Collections (Auto-Created)

Firestore does not require you to manually create tables. The app creates collections the first time each feature writes data.

The code currently uses these collections:

- **users** - User account data
- **marketplace** - Active component listings
- **requests** - Buy requests and delivery workflow
- **repair** - Repair requests and repaired items
- **solded** - Completed delivery records
- **chats** - Support chat messages

Subcollections used by the app:

- **chats/{userId}/messages** - Messages for each support chat thread

## Required Indexes And Rules

Some app queries combine `where(...)` and `orderBy(...)`, so Firestore will ask you to create composite indexes the first time those queries run in production or with stricter rules.

Create indexes for these query patterns:

- `marketplace` where `status == available` ordered by `createdAt desc`
- `requests` where `type == buy` and `deliveryStatus == uncompleted` ordered by `createdAt desc`
- `repair` where `ownerId == <current user>` ordered by `createdAt desc`
- `chats/{userId}/messages` ordered by `createdAt asc`

## Security Rules (For Production)

When deploying, implement proper security rules in Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User profile docs
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    
    // Marketplace listings are public to read, owner-only to write
    match /marketplace/{doc=**} {
      allow read: if true;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.ownerId;
      allow update, delete: if request.auth != null && resource.data.ownerId == request.auth.uid;
    }
    
    // Requests are visible to the request owner and seller/delivery flow
    match /requests/{requestId} {
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
      allow read, update, delete: if request.auth != null && (
        resource.data.userId == request.auth.uid ||
        resource.data.sellerId == request.auth.uid
      );
    }

    // Repair docs are owned by the creator, but can be updated by staff/owner flows
    match /repair/{repairId} {
      allow create: if request.auth != null && request.auth.uid == request.resource.data.ownerId;
      allow read, update, delete: if request.auth != null && resource.data.ownerId == request.auth.uid;
    }

    // Sold records are written by authenticated delivery flow
    match /solded/{soldId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
    }

    // Per-user support chat messages
    match /chats/{userId}/messages/{messageId} {
      allow read, create: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

If Firestore reports a missing index, use the console link from the error message to create it.

---

**Need Help?** Check the [Firebase Documentation](https://firebase.google.com/docs)
