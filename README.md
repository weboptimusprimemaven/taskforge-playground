# TaskForge Playground

![Dashboard](docs/images/dashboard.png)

A production-inspired Todo application built to practice modern frontend architecture, authentication flows, and end-to-end testing with Playwright.

> This project is part of my journey toward becoming a Software Development Engineer in Test (SDET), focusing on clean architecture, maintainable code, and automated testing.

---

## Features

- Authentication flow
- Protected routes
- Todo CRUD functionality
- React Context for authentication
- Custom React hooks
- Page Object Model (POM) structure for Playwright
- TypeScript throughout the project
- Monorepo using pnpm workspaces
- GitHub Actions ready for automated testing

---

## Tech Stack

### Frontend

- React 19
- TypeScript
- Vite
- React Router

### Testing

- Playwright
- Page Object Model
- Fixtures
- Cross-browser testing
  - Chromium
  - Firefox
  - WebKit

### Tooling

- pnpm Workspaces
- ESLint
- GitHub Actions

---

## Project Structure

```
.
├── apps
│   └── web
│       ├── src
│       │   ├── components
│       │   ├── context
│       │   ├── pages
│       │   ├── services
│       │   ├── hooks
│       │   └── types
│
├── tests
│   ├── e2e
│   ├── pages
│   ├── fixtures
│   ├── utils
│   └── data
│
├── packages
│   └── shared
│
└── .github
    └── workflows
```

---

## Getting Started

### Clone the repository

```bash
git clone git@github.com:weboptimusprimemaven/taskforge-playground.git
```

### Install dependencies

```bash
pnpm install
```

### Start the application

```bash
pnpm --filter web dev
```

The application will run at:

```
http://localhost:5173
```

---

## Running Playwright Tests

Run all tests

```bash
cd tests
pnpm exec playwright test
```

Run a single browser

```bash
pnpm exec playwright test --project=chromium
```

Open the HTML report

```bash
pnpm exec playwright show-report
```

---

## Authentication

The current version uses a mocked authentication service.

Demo credentials:

```
Email:
demo@taskforge.dev

Password:
password123
```

---

## Architecture

The project follows a simple layered architecture.

```
Pages
    │
    ▼
Components
    │
    ▼
Hooks
    │
    ▼
Services
```

Authentication state is managed using React Context.

Playwright tests interact with the application through Page Objects instead of directly manipulating selectors, making the tests easier to maintain.

---

## Current Status

Completed

- Authentication
- Protected Routes
- Todo CRUD
- Custom Hooks
- React Context
- Playwright project structure
- GitHub Actions workflow

In Progress

- End-to-end test suite
- Local storage persistence
- API integration

Planned

- Real backend
- API testing
- Visual regression testing
- Docker support
- CI improvements

---

## Learning Goals

This project focuses on learning and applying:

- Clean code principles
- Test automation best practices
- End-to-end testing with Playwright
- Modern React architecture
- TypeScript
- Maintainable project structure
- CI/CD workflows

---

## Author

Eric de Waard

GitHub:
https://github.com/weboptimusprimemaven