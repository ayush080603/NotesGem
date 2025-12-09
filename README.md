# NotesGem — AI-Powered Smart Note-Taking App

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](#) [![Vercel](https://img.shields.io/badge/deploy-vercel-000000?logo=vercel)](#) [![Supabase](https://img.shields.io/badge/backend-supabase-2dd4bf?logo=supabase)](#)

NotesGem is an intelligent, modern note-taking application powered by Google Gemini AI, Supabase Auth, Prisma + PostgreSQL, and Next.js. It lets you create, edit, rename, delete, and search notes — and ask an AI assistant questions based on all your saved notes.

- Elegant UI
- Gemini AI assistant for note-based Q&A
- Smart search and real-time updates
- Secure authentication with Supabase
- Dark / Light theme support
- Deployed on Vercel

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Installation & Setup](#installation--setup)
- [AI Integration](#ai-integration)
- [Dark / Light Mode](#dark--light-mode)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Features

- 🔐 Supabase Authentication
  - Secure login/signup using Supabase Auth
  - Session-based auth using server-side `getUser()`
  - Protected routes with redirects

- 📝 Notes Management
  - Create, edit, delete notes
  - Rename notes (custom title support)
  - Notes organized in a sidebar
  - Auto-redirect to newest note
  - Real-time sidebar updates
  - Smart search using Fuse.js

- 🤖 AI Assistant (Gemini 1.5 Flash)
  - Ask questions about all your notes
  - Clean, readable, HTML-formatted responses
  - Supports headings, bold, lists, paragraphs, etc.
  - Optimized styling for both dark & light mode

- 🎨 Modern, Clean UI
  - Built with Tailwind CSS + ShadCN UI
  - Responsive layout and auto-resizing editor
  - Smooth animations and theme-aware interface

- 🛠 Backend & Database
  - Supabase PostgreSQL
  - Prisma ORM
  - Next.js server actions

- 🌐 Deployment
  - Fully deployable to Vercel

---

## Tech Stack

| Layer     | Technologies |
|-----------|--------------|
| Frontend  | Next.js 15, React 19, Tailwind CSS, ShadCN |
| Backend   | Prisma, PostgreSQL |
| Auth      | Supabase Auth |
| AI        | Google Gemini 1.5 Flash |
| Deployment| Vercel |
| Language  | TypeScript |

---

## Folder Structure

```
src/
├── actions/            # CRUD & Gemini AI server actions
├── app/                # Next.js App Router pages
├── auth/               # Supabase authentication utilities
├── components/         # UI components
├── db/                 # Prisma client
├── hooks/              # Custom hooks
├── lib/                # Utility helpers
├── styles/             # global.css + ai-response.css
└── configs/            # Gemini model configuration
```

---

## Environment Variables

Create a `.env.local` file in the project root with the following values:

```
DATABASE_URL=your_supabase_database_url
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

---

## Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/ayush080603/NotesGem.git
cd NotesGem
```

2. Install dependencies

```bash
pnpm install
```

3. Generate Prisma client

```bash
pnpm prisma generate
```

4. Push Prisma schema to Supabase (sync schema)

```bash
pnpm prisma db push
```

5. Start development server

```bash
pnpm dev
```

Open: http://localhost:3000

---

## AI Integration (Gemini 1.5 Flash)

AI logic for Questions & Answers lives in:

```
src/actions/notes.ts
```

- Responses are returned as clean, valid HTML.
- HTML is rendered via `dangerouslySetInnerHTML` in the UI.
- AI response styling is managed in:
```
src/styles/ai-response.css
```

---

## Dark / Light Mode

- Powered by `next-themes`.
- Auto theme detection + manual toggle.
- AI responses adapt to the selected theme for readability.

---

## Future Enhancements

Planned features:

- PDF upload + AI reading
- Note summarization
- Categorization / folders
- Export to PDF / Markdown
- Voice notes
- Real-time collaboration

---

## Contributing

Contributions, issues, and feature requests are welcome! Please open an issue or submit a pull request.

Suggested workflow:

1. Fork the repository
2. Create a feature branch (git checkout -b feature/your-feature)
3. Commit your changes
4. Push to your fork and open a Pull Request

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Author

Ayush Sinha  
Next.js • AI • Supabase • Full-Stack Developer  
GitHub: [@ayush080603](https://github.com/ayush080603)
