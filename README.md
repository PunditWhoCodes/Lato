# Lato Marketplace

<div align="center">

**Unlock Your Next Adventure**

A modern travel marketplace connecting adventurers with curated tour experiences from trusted local companies.

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.0-ff4154?style=for-the-badge&logo=react-query)](https://tanstack.com/query)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Documentation](#-documentation)

</div>

---

## 📖 About

Lato is a feature-rich travel marketplace platform that enables users to discover, compare, and book curated tour experiences. Built with modern web technologies, it provides a seamless experience for travelers to find their perfect adventure while connecting them with trusted local tour companies.

## ✨ Features

### 🎯 Core Functionality
- **Tour Discovery** - Browse and search through curated travel experiences
- **Advanced Filtering** - Filter tours by destination, price range, duration, travel style, and more
- **Company Profiles** - Detailed information about tour operators and their offerings
- **Interactive Trip Finder** - AI-powered chat assistant to find the perfect tour
- **Saved Trips** - Bookmark favorite tours for later review
- **Reviews & Ratings** - User-generated reviews and ratings for tours and companies
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### 🎨 User Experience
- **Dark/Light Mode** - System-aware theme switching with smooth transitions
- **Image Galleries** - High-quality tour images with carousel navigation
- **Shimmer Loading** - Elegant skeleton screens and image loading states
- **Real-time Search** - Instant tour filtering and search results
- **Smooth Animations** - Polished transitions and micro-interactions
- **Accessibility** - WCAG compliant with keyboard navigation support

### 🔐 User Management
- **Authentication System** - Secure login and registration
- **User Profiles** - Personalized user dashboards
- **Messaging System** - Direct communication between users and tour operators
- **Booking Management** - Track and manage tour bookings

### 🛠️ Developer Experience
- **Type Safety** - Full TypeScript coverage for robust development
- **Code Quality** - ESLint configuration with best practices
- **Component Library** - Reusable UI components built with Radix UI
- **API Client** - Centralized HTTP client with error handling
- **Query Management** - TanStack Query for efficient data fetching and caching
- **Hot Reload** - Fast refresh with Turbopack for instant feedback

## 🚀 Tech Stack

### Frontend Framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with server components
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality component library
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management

### Data Management
- **[TanStack Query](https://tanstack.com/query)** - Powerful async state management
- **[React Hook Form](https://react-hook-form.com/)** - Performant form handling
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Additional Libraries
- **[Embla Carousel](https://www.embla-carousel.com/)** - Lightweight carousel
- **[date-fns](https://date-fns.org/)** - Modern date utility library
- **[Recharts](https://recharts.org/)** - Composable charting library
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18.x or higher
- **npm** 9.x or higher (or **pnpm**/**yarn**)
- **Git** for version control

## 🏁 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/PunditWhoCodes/Lato
cd lato
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Optional: Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
```

### 4. Run Development Server

```bash
npm run dev
# or with Turbopack (faster)
npm run dev -- --turbo
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### 5. Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
lato/
├── app/                          # Next.js App Router
│   ├── (routes)/                 # Route groups
│   │   ├── tours/               # Tour pages
│   │   ├── companies/           # Company pages
│   │   ├── saved-trips/         # Saved tours
│   │   ├── messages/            # Messaging system
│   │   └── login|register/      # Auth pages
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
│
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── shimmer-image.tsx
│   │   └── ...
│   ├── navigation.tsx           # Main navigation
│   ├── footer.tsx               # Footer component
│   ├── theme-toggle.tsx         # Theme switcher
│   ├── trip-finder-chat.tsx     # Chat assistant
│   └── providers.tsx            # Context providers
│
├── lib/                          # Utility functions & configs
│   ├── api/
│   │   └── client.ts            # API client
│   ├── data/                    # Mock data & constants
│   │   ├── tours.ts
│   │   ├── companies.ts
│   │   └── ...
│   ├── hooks/
│   │   ├── use-query-hooks.ts   # TanStack Query hooks
│   │   └── example-usage.tsx    # Usage examples
│   ├── auth.tsx                 # Auth context
│   ├── saved-tours-context.tsx  # Saved tours state
│   ├── query-client.ts          # Query client config
│   ├── utils.ts                 # Helper functions
│   ├── TANSTACK_QUERY_GUIDE.md  # TanStack Query docs
│   └── QUICK_START.md           # Quick reference
│
├── public/                       # Static assets
│   └── images/                  # Image files
│
├── .env.local                    # Environment variables (create this)
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Project dependencies

```
