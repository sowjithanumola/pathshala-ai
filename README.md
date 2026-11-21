# Pathshala AI

**Learn anything. In any language. Anywhere.**

A responsive learning workspace built with React, TypeScript, Vite and Firebase. No AI provider or external AI API is required.

## Included in this build

- Email/password and Google popup registration/sign-in, password reset and sign-out
- Learner profile, preferred-language setting and light/dark appearance
- 35 built-in sample lessons across Mathematics, Science, English, Social Studies, Language Lab and Study Skills
- Lesson reader, completion tracking, saved lessons and progress overview
- Short multiple-choice knowledge checks with instant explanations
- Visual learning cards, notebook, interactive calendar and editable weekly timetable
- JSON export of learner progress and personal study data
- Account deletion with password reauthentication
- Account-scoped local cache and an app-shell service worker for basic offline access
- Responsive desktop and mobile layouts

## Firebase setup required

The Firebase Web App config is supplied to Vercel through `VITE_FIREBASE_*` environment variables. For local development, copy `.env.example` to `.env.local` and fill in the values from Firebase Console → Project settings → General → Your apps. Do not commit `.env.local`.

1. In [Firebase Authentication](https://console.firebase.google.com/project/pathshala-47248/authentication/providers), enable **Email/Password** and **Google** sign-in providers. Set a support email when prompted.
2. In [Firestore Database](https://console.firebase.google.com/project/pathshala-47248/firestore), create a database. Choose a region close to your users; database location cannot easily be changed later.
3. Open Firestore → Rules, paste the contents of [firestore.rules](./firestore.rules), and click **Publish**.
4. In Authentication → Settings → Authorized domains, ensure the Vercel hostname you use is listed. Add each production/preview hostname you intend to use.
5. Redeploy after changing Vercel environment variables.

The included Firestore rules let a signed-in student read and write only their own `users/{uid}` document. Review the rules before adding new collections or server features.

## Honest feature notes

- The 35 lessons are starter learning materials, not a complete official curriculum. Review and expand them for the grade, board and syllabus you intend to support.
- The language selector saves the learner's preferred language. Full interface translation and translated lesson content are not yet implemented.
- Offline support caches the app shell and keeps study data in a browser-local cache scoped to the signed-in Firebase user. First-time sign-in and cloud synchronization require internet access. Browser storage can be cleared by the browser or device.
- Account deletion removes the Firebase Authentication account and its Firestore profile document. If you add future subcollections or external services, include those in the deletion workflow too.

## Local development

```bash
npm install
npm run dev
```

`npm run build` runs TypeScript checking and creates the production Vite build.
