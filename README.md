# Dental Clinic Demo (Angular)

A portfolio-ready **single-page landing** for a fictional dental clinic (“DentaCare Clinic”), built with modern **Angular (standalone components)** and **Tailwind CSS**. The project focuses on clean UI composition, reusable sections, and a smooth scrolling experience.

> Note: This is a demo project for showcase/learning purposes. It is **not** a real clinic website.

---

## Features

- Single-page landing layout with section-based architecture:
  - Hero
  - Services
  - About
  - Stats (animated counters)
  - Team
  - Testimonials
  - Gallery
  - Contact
- Standalone Angular components (no NgModules for feature composition)
- Shared UI components (Navbar, Footer, WhatsApp floating button)
- Responsive navigation (desktop + mobile menu)
- Tailwind CSS styling
- Unit testing via Angular test runner (Vitest configured by Angular build tooling)

---

## Tech Stack

- **Angular** (standalone APIs, `bootstrapApplication`)
- **TypeScript**
- **Tailwind CSS** + PostCSS
- **pnpm** as package manager
- **Vitest** for unit tests (through `ng test`)
- Optional deployment configuration via **Vercel** (`vercel.json`)

---

## Project Structure (high level)

- `src/main.ts`  
  Application bootstrap (`bootstrapApplication`).

- `src/app/app.ts`  
  Root shell component that renders:
  - `Navbar`
  - `Home` (all landing sections)
  - `Footer`
  - Floating WhatsApp button

- `src/app/features/home/`  
  Home “orchestrator” component + individual section components.

- `src/app/shared/`  
  Shared components used across the app (navbar/footer/buttons).

- `public/`  
  Static assets served by Angular build configuration.

---

## Getting Started

### Prerequisites
- Node.js (recommended: current LTS)
- pnpm (the project declares a `packageManager` in `package.json`)

### Install
```bash
pnpm install
```

### Run locally (development)
```bash
pnpm start
```

Then open:
- `http://localhost:4200/`

The app will reload on file changes.

---

## Common Scripts

```bash
# Start dev server
pnpm start

# Production build
pnpm build

# Watch build (development configuration)
pnpm watch

# Unit tests
pnpm test
```

---

## Build

```bash
pnpm build
```

Build output is generated under `dist/`.

---

## Testing

```bash
pnpm test
```

Runs unit tests via Angular’s test builder (Vitest).

---

## Deployment

This repository includes `vercel.json`, which can be used to deploy the app on Vercel.

General approach:
1. Import the repository in Vercel
2. Install command: `pnpm install`
3. Build command: `pnpm build`
4. Output directory: `dist` (may vary depending on Angular configuration)

If you encounter a mismatch for the output folder, check `angular.json` build options.

---

## License

No license specified. If you intend others to reuse or modify this project, consider adding a license file (e.g., MIT).