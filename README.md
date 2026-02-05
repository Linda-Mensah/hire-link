# HireLink - Hiring Management System

**HireLink** is a modern, full-stack hiring management system designed to streamline the recruitment process for both candidates and recruiters. It allows candidates to browse and apply for jobs, while recruiters can manage applications, review candidates, schedule interviews, and generate offer letters.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [Available Scripts](#available-scripts)
- [UI Components](#ui-components)
- [Contributing](#contributing)
- [Notes](#notes)

---

## Features

### Candidate Experience

- Browse job listings with full details
- Apply through a multi-step application form
- Resume upload with client-side validation
- Application confirmation with unique ID

### Recruiter/Admin Experience

- Pipeline board with drag-and-drop stages
- Candidate review and interview scheduling
- Generate and send offer letters
- Track offer status and candidate information

### Shared Features

- Responsive design for desktop and mobile
- Toast notifications for user feedback
- Protected routes for recruiter/admin access
- Clean UI built with Tailwind CSS

---

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Lucide React
- **State Management:** Zustand for global state, React Context for Auth
- **Routing:** React Router v7.13
- **Form Management:** React Hook Form + Zod
- **Notifications:** React Toastify
- **Bundler:** Vite

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
git clone https://github.com/Linda-Mensah/hire-link.git
cd hire-link
npm install
```

### Run Locally

The app will be available at http://localhost:5173 (or the port Vite provides).

## Project Structure

```text
src/
├─ components/
│  ├─ auth/            # RecruiterRoute
│  ├─ candidate/       # Candidate-facing components
│  ├─ pages/           # Standalone pages (e.g., AdminLoginPage)
│  ├─ recruiter/       # Recruiter/Admin components
│  ├─ shared/          # Layout, Navigation
│  └─ ui/              # Reusable UI components
├─ constants/          # Mock data
├─ context/            # Auth Context
├─ hooks/              # Custom hooks
├─ lib/                # Utils & validators
├─ stores/             # Zustand stores
├─ types/              # TypeScript types
├─ App.tsx
└─ index.css

```

## Authentication

The authentication system currenlty uses mock credentials and local state for assessment purposes only.

admin@hirelink.com / admin123
recruiter@hirelink.com / recruit123
hr@hirelink.com / hr123

## Available Scripts

npm run dev – Start development server

npm run build – Build for production

npm run preview – Preview production build

npm run lint – Lint codebase

npm run format – Format code using Prettier

## UI Components

Navigation: Dynamic links for Jobs and Recruiter pipeline

Cards: Used for candidate info, offer letters, and next steps

Forms: Input, Textarea, Select for offer generation and application forms

Buttons: Gradient buttons with hover states and icons

Toasts: Feedback on actions (login, offer generation, etc.)

## Contributing

Fork the repository

Create a feature branch (git checkout -b feature/my-feature)

Commit your changes (git commit -m "Add my feature")

Push to the branch (git push origin feature/my-feature)

Open a Pull Request

## Notes

The project uses mock data for admins and applications.

UI is built to be clean, modern, and mobile-friendly.

Fast refresh works with proper separation of components and context/hooks.

```


```
