# Pathshala AI

**Learn anything. In any language. Anywhere.**

A responsive, offline-capable learning workspace built with **React**, **TypeScript**, **Vite**, and **Firebase**. Designed to run entirely standalone without requiring external AI providers or third-party inference APIs.

---

## Key Features

### Learning & Curriculum
- **Curated Starter Library:** 35 built-in lessons spanning Mathematics, Science, English, Social Studies, Language Lab, and Study Skills.
- **Interactive Lesson Reader:** Clean reading interface featuring bookmarking (saved lessons), completion tracking, and a centralized progress overview.
- **Knowledge Checks:** Integrated multiple-choice quizzes with immediate feedback and explanations.

### Productivity & Study Tools
- **Study Workspace:** Built-in digital notebook, visual flashcards, interactive calendar, and a customizable weekly timetable.
- **Data Portability:** One-click JSON export for backing up learner progress and personal study data.
- **Personalization:** Customizable learner profiles, preferred-language settings, and seamless light/dark theme switching.

### Architecture & Security
- **Authentication:** Email/password and Google OAuth popup sign-in, password recovery, and secure account deletion (enforced via password re-authentication).
- **Offline-First Caching:** Account-scoped local storage paired with an app-shell service worker for reliable offline access.
- **Responsive Design:** Adaptive layouts optimized for both desktop and mobile viewports.

---

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
