# TaskForge Playground

A modern React + TypeScript playground for building production-quality frontend applications.

The project started as a simple Todo application and is gradually evolving into a portfolio project demonstrating professional React architecture, reusable UI components, testing, accessibility, and modern frontend best practices.

---

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Playwright
- Lucide React
- CSS Modules / Component-based CSS
- pnpm

---

## Features

### Authentication

- Mock login flow
- Protected routes
- Logout functionality

### Todo Management

- Create todos
- Edit todos
- Delete todos with confirmation dialog
- Toggle completed status
- Local persistence using Local Storage

### Productivity

- Filter by:
  - All
  - Active
  - Completed

### User Experience

- Toast notifications
- Responsive dashboard layout
- Reusable Button and Input components
- Icon-based actions
- Keyboard shortcuts while editing
- Auto-focus during editing

### Testing

- Playwright end-to-end testing
- Manual testing after each completed feature

---

## Project Structure

```
apps/
  web/
    src/
      components/
      context/
      hooks/
      pages/
      services/
      styles/
      types/

tests/
docs/
```

---

## Getting Started

Install dependencies

```bash
pnpm install
```

Run the development server

```bash
pnpm --filter web dev
```

Run Playwright tests

```bash
cd tests
pnpm exec playwright test
```

---

## Roadmap

Upcoming improvements include:

- Search
- Todo sorting
- Accessibility improvements
- GitHub Actions CI
- Deployment
- Backend API integration
- Dark mode
- Better component architecture

---

## Screenshots

### Dashboard

![Dashboard](docs/images/dashboard.png)

---

## Learning Goals

This project focuses on learning and demonstrating:

- Modern React architecture
- TypeScript
- Reusable components
- State management
- UI/UX principles
- Testing with Playwright
- Git workflows
- Clean code and maintainability