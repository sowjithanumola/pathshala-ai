# Pathshala AI

**Learn anything. In any language. Anywhere.**

> *Built for the CodeBenders Hackathon.*

Pathshala AI is a modern, responsive, offline-capable learning workspace designed to provide an immersive, modular educational experience. Built with a robust frontend stack and progressive web application (PWA) features, it delivers seamless learning tools right to your browser or device.

---

## 🏛️ Official Feature Structure

Pathshala AI is organized around ten core learning modules accessible directly from the workspace sidebar:

| # | Feature | Description |
|---|---|---|
| 1 | **Dashboard** | Main learning overview and quick-access hub |
| 2 | **Learn** | Structured learning content, modules, and lessons |
| 3 | **Language Lab** | Specialized tools for multilingual and linguistic learning |
| 4 | **Visual Learning** | Rich visual explanations and diagrammatic study aids |
| 5 | **Quizzes** | Knowledge testing with instant feedback and scoring |
| 6 | **Library** | Comprehensive collection of learning resources and materials |
| 7 | **Notebook** | Personal study notes and annotations |
| 8 | **Calendar & Timetable** | Interactive learning schedules and time management |
| 9 | **Progress** | Analytics and tracking for your educational growth |
| 10 | **Profile & Settings** | Account management, appearance, and language preferences |

---

## ⚙️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React** | User interface and component architecture |
| **TypeScript** | Strict type safety and predictable code maintainability |
| **Vite** | Lightning-fast development server and production bundler |
| **React Router** | Client-side application navigation |
| **Tailwind CSS / CSS** | Modern, responsive utility-first styling |
| **Local Storage / IndexedDB** | Robust local data persistence |
| **Service Worker / PWA** | Offline functionality and installable application shell |
| **AI Provider Integration** | Smart tutoring and interactive assistance |

---

## 🔒 Security Requirements & Best Practices

- **API Key Safety:** Never expose sensitive API keys or credentials in client-side frontend code.
- **Server-Side Integration:** Use secure server-side routes or edge functions for handling AI provider requests.
- **Transparent Capabilities:** AI tutoring features require a configured, functioning provider endpoint to operate.
- **Data Integrity:** Validate all imported user data and local state schemas before persistence.

---

## 📁 Application Structure

```text
pathshala-ai/
│
├── public/
│   ├── icons/
│   ├── manifest.json
│   └── images/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── features/
│   │   ├── dashboard/
│   │   ├── language-lab/
│   │   ├── ai-tutor/
│   │   ├── visual-lab/
│   │   ├── offline-library/
│   │   ├── progress/
│   │   ├── notebook/
│   │   └── planner/
│   │
│   ├── i18n/
│   │   ├── en/
│   │   ├── te/
│   │   ├── hi/
│   │   ├── es/
│   │   ├── ar/
│   │   └── fr/
│   │
│   ├── services/
│   ├── storage/
│   ├── hooks/
│   ├── types/
│   └── App.tsx
│
├── README.md
├── package.json
└── vite.config.ts
