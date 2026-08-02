# SportNest — Frontend

Web client for **SportNest**, a premium sports-facility booking platform. This repository is the Next.js application that powers the user-facing site — facility discovery, booking, authentication, and a personal dashboard — and talks to the [SportNest Backend API](../backend).

## Overview

The app includes:

- **Marketing-style home page** — hero with background video, sports categories, featured facilities, "how it works", customer reviews, and a call-to-action.
- **Facility discovery** — searchable, sport-filterable, paginated facility listing plus a rich detail page with date-aware time-slot booking.
- **Authentication** — email/password sign-up and login plus Google OAuth via **better-auth**.
- **Dashboard** — view and cancel bookings, add facilities, and manage (edit/delete) your own facilities.
- **Polish** — full dark-mode support, skeleton loading states, error boundaries, toast notifications, and SEO (`robots.txt` / `sitemap.xml`).

## Tech Stack

| Layer          | Technology                                                                     |
| -------------- | ------------------------------------------------------------------------------ |
| Framework      | [Next.js](https://nextjs.org/) 16 (App Router, Turbopack, React Server Components) |
| UI library     | [React](https://react.dev/) 19                                                  |
| Language       | TypeScript 5                                                                   |
| Styling        | [Tailwind CSS](https://tailwindcss.com/) v4 + [HeroUI](https://heroui.com/) v3 (`@heroui/react`, custom theme tokens) |
| Auth           | [better-auth](https://www.better-auth.com/) 1.6 (email/password + Google OAuth, [MongoDB adapter](https://github.com/better-auth/better-auth/tree/main/packages/mongo-adapter), JWT plugin + session-cookie cache) |
| State / UX     | [next-themes](https://github.com/pacocoursey/next-themes) (dark mode), [react-hot-toast](https://react-hot-toast.com/) (toasts), [lucide-react](https://lucide.dev/), `@iconify/react`, `@gravity-ui/icons` |
| Data access    | React `cache()` + ISR (`next: { revalidate: 60 }`)                              |

## Tools Used

| Tool                    | Purpose                                                             |
| ----------------------- | ------------------------------------------------------------------- |
| [Node.js](https://nodejs.org/) + [npm](https://www.npmjs.com/) | Runtime and package manager                                        |
| [Turbopack](https://turbo.build/) | Next.js development bundler (used by `next dev` / `next build`)   |
| [TypeScript](https://www.typescriptlang.org/) (`tsc`) 5 | Static typing and type-checking                                   |
| [ESLint](https://eslint.org/) 9 + `eslint-config-next` | Linting (`npm run lint`)                                          |
| [Tailwind CSS](https://tailwindcss.com/) v4 | Utility-first styling with `@tailwindcss/postcss`                 |
| [better-auth CLI](https://www.better-auth.com/) | Generates/manages auth config and types                          |
| Git + [GitHub](https://github.com/) | Version control and remote hosting                                |

## Pages & Features

| Route                          | Feature                                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------ |
| `/`                            | Home page: `Hero` (video), `SportsSection`, featured facilities, `HowItWorks`, `Review` carousel, `CTASection` |
| `/all-facility`                | Search, sport filter, and paginated facility grid (`FacilityCard`)                                |
| `/all-facility/[id]`           | Facility details + `BookingForm` — pick a date to see live per-date availability and pricing      |
| `/auth/login` · `/auth/signup` | Email/password + "Continue with Google" via better-auth                                           |
| `/dashboard/my-bookings`       | Your bookings with booking summary; soft-cancel with a confirmation dialog                        |
| `/dashboard/add-facility`      | Form to publish a new facility (price, capacity, time slots, description, image)                  |
| `/dashboard/manage-facilities` | List your facilities; edit inline via `ModalForm`, delete with `DeleteFacilityButton`             |
| `/api/auth/[...all]`           | better-auth server route handler (`src/app/api/auth/[...all]/route.ts`)                            |
| `/robots.txt` · `/sitemap.xml` | Generated from `src/app/robots.ts` and `src/app/sitemap.ts`                                       |

## Key Mechanics

- **Route protection** — `src/proxy.ts` (Next.js `proxy`) redirects unauthenticated visitors to `/auth/login` for `/dashboard/:path*` and `/all-facility/:path`. Sessions are resolved through better-auth's `get-session` endpoint using the request cookies.
- **Auth** — better-auth is configured in `src/lib/auth.ts` (server, with MongoDB adapter) and consumed via `src/lib/auth-client.ts`. Server pages read the session via `auth.api.getSession` / get an API token via `auth.api.getToken`. Mutating API calls attach the resulting JWT as `Authorization: Bearer`, which the backend verifies against this app's `/api/auth/jwks`. The `auth.ts` JWT plugin sets a 1-day token expiry.
- **Data fetching** — server components use `getCachedFacility` (`src/lib/data-cache.ts`, React `cache()` + 60s ISR); client components use typed helpers in `src/api/` (`GetApi`, `PostApi`, `DeleteApi`, `UpdateFacilityApi`) pointing at the API base from `src/lib/api-config.ts`.
- **CSRF** — `CsrfProvider` fetches a token from the backend (`/csrf-token`) and `withCsrf` attaches it to every mutating request (double-submit cookie pattern).
- **Booking flow** — date picker → availability request → price preview (`price_per_hour × duration`) → create booking with an `idempotencyKey` to prevent double-bookings on retry.
- **Theming** — `ThemeProvider` + `ThemeToggle` with `next-themes`; Tailwind v4 `@custom-variant dark` so dark styles flow through HeroUI components; hydration-safe with a mounted guard.

## Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable                     | Required | Description                                                                  |
| ---------------------------- | -------- | ---------------------------------------------------------------------------- |
| `BETTER_AUTH_SECRET`         | Yes      | better-auth secret — **must match** the backend's value                      |
| `NEXT_PUBLIC_BETTER_AUTH_URL`| No       | Public base URL of this app (defaults to the request origin)                 |
| `MONGODB_URI`                | Optional | Only needed if reading the DB directly from server components                |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Optional | Google OAuth credentials from Google Cloud Console          |
| `NEXT_PUBLIC_API_URL`| No       | `http://localhost:5000` | Backend API base URL (see `src/lib/api-config.ts`)

Generate the shared secret with: `openssl rand -hex 32`.

> **Note:** the backend runs on `http://localhost:5000` by default. If it runs elsewhere, set `NEXT_PUBLIC_API_URL` in your environment (see `src/lib/api-config.ts`).

## Getting Started

```bash
npm install
cp .env.example .env   # then edit .env
npm run dev            # http://localhost:3000
```

## Deployment

The app is deployed to **Vercel** via the Git integration or the CLI:

```bash
vercel --prod
```

Set the production `BETTER_AUTH_SECRET`, `MONGODB_URI`, `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_BETTER_AUTH_URL` (the deployed frontend URL), and `NEXT_PUBLIC_API_URL` (the deployed backend URL) in the Vercel project. The backend must share the same `BETTER_AUTH_SECRET` and its `NEXT_PUBLIC_BETTER_AUTH_URL` must point back to this app so it can reach `/api/auth/jwks`.

## Scripts

| Script          | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start the dev server (custom DNS bootstrap) |
| `npm run build` | Production build (`next build`)          |
| `npm run start` | Start the production server              |
| `npm run lint`  | Run ESLint                               |

## Project Structure

```
src/
├── api/             # typed fetch helpers (GET/POST/DELETE/PATCH)
├── app/             # App Router routes & layouts
│   ├── api/auth/    # better-auth route handler
│   ├── auth/        # login / signup
│   ├── all-facility/# listing + facility detail
│   └── dashboard/   # my-bookings, add-facility, manage-facilities
├── components/      # Hero, Navbar, Sidebar, FacilityCard, BookingForm, modal/theme/CSRF providers, …
├── lib/             # better-auth config, API config, data cache, CSRF helpers
├── utility/         # BookingCard, DeleteButton
└── proxy.ts         # auth-gating middleware for protected routes
```
