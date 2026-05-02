# 12 Electrons

A premium, student-focused React web app to buy, sell, rent, and repair electronics components.

## Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Firebase Auth + Firestore

## Environment

Create a `.env` file using `.env.example` and set:

```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Firebase Database Setup

Firestore collections are created automatically when you use the app. The main ones are `users`, `marketplace`, `requests`, `repair`, `solded`, and `chats`.

If a query fails with an index error, open the Firestore console and create the suggested composite index for that query.

For the full Firebase setup steps and security rules, see [FIREBASE_SETUP.md](FIREBASE_SETUP.md).

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
