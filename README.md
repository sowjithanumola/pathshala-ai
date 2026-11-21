# Pathshala AI

Pathshala AI: Learn anything. In any language. Anywhere.

## Firebase setup

The web app uses Firebase Authentication (email/password) and Cloud Firestore for each student's saved lesson progress.

### 1. Enable email/password sign-in

1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Select the `pathshala-47248` project.
3. Open **Build → Authentication → Get started → Sign-in method**.
4. Enable **Email/Password** and save.

### 2. Create the Firestore database

1. Open **Build → Firestore Database**.
2. Create a database (production mode is recommended).
3. Choose a database location close to your users. The location cannot easily be changed later.

### 3. Publish the Firestore security rules

Open **Firestore Database → Rules**, replace the editor contents with the rules in [firestore.rules](./firestore.rules), and click **Publish**.

These rules allow each signed-in student to read and write only their own `users/{uid}` document.

### 4. Authorize the deployed domain

In **Authentication → Settings → Authorized domains**, ensure the Vercel domain used by this project is listed. Add the exact hostname if it is missing. Also add `localhost` if you test locally.

### 5. Environment variables

The production/preview/development Vercel environments are configured with the Firebase Web App settings. For local development, copy `.env.example` to `.env.local` and fill in the values from Firebase Console → Project settings → General → Your apps.

Do not commit `.env.local`. Firebase web configuration is designed to be present in browser apps; Firestore Security Rules protect student data. Never put private AI API keys in variables prefixed with `VITE_`.

## Current learning content

The dashboard currently includes four sample lessons. These are starter/demo entries, not a complete curriculum or a verified syllabus.
