# booking-platform-front

# Booking Platform - Project Overview

**Last Updated:** November 9, 2025

---

## 🎯 Vision

A modern booking platform with public listings, where guests can browse and book properties, and owners can manage their listings.

**User Types:**
- **Guests/Travelers** → Use Storefront to browse and book
- **Property Owners** → Use Owner app to manage listings
- **Platform Admins** → Use Admin dashboard for oversight

**Backend:** Already exists with OpenAPI specification (openapi.yml)

---

## 📦 Architecture

### Three Applications

**1. Storefront (Next.js)**
- Public-facing guest application
- Browse listings (public, no auth)
- Book properties (requires auth)
- Manage trips
- SEO-optimized

**2. Owner (Next.js)**
- Property owner dashboard
- Create and manage listings
- Handle bookings
- Financial reporting
- Analytics

**3. Admin (React.js + Vite)**
- Internal platform management
- User management (guests + owners)
- Property oversight
- Booking operations
- Analytics and moderation

---

## 🎨 Design System

### Foundation
- **Material UI** (used directly across all apps)
- No wrapper/abstraction layer
- Consistent theming via shared MUI theme config

### Design Language
Mix of **Booking.com + Airbnb**:
- **From Booking.com:** Information density, trust indicators, clear pricing
- **From Airbnb:** Clean aesthetic, photography-first, smooth interactions
- **Result:** Modern, clean, information-rich without clutter

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 14+ (Storefront & Owner), React 18+ (Admin)
- **Language:** TypeScript
- **UI Library:** Material UI (direct usage)
- **Styling:** Emotion (MUI's styling solution)
- **State:** React Query, Zustand/Redux Toolkit (Admin)

### Development Tools
- **Monorepo:** Turborepo + pnpm workspaces
- **Testing:** Vitest, Testing Library, Playwright
- **Linting:** ESLint
- **CI/CD:** GitHub Actions

### Why pnpm?
- 3x faster than npm
- Saves disk space (shared storage)
- Strict dependencies (no phantom deps)
- Better monorepo support

---

## 📁 Monorepo Structure

```
booking-platform/
├── apps/
│   ├── storefront/       # Next.js - Guests
│   ├── owner/            # Next.js - Property owners
│   └── admin/            # React - Platform admins
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.base.json
```

---

## 🔄 Data Flow

```
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  Storefront  │   │    Owner     │   │    Admin     │
│   (Guests)   │   │   (Owners)   │   │   (Staff)    │
└──────┬───────┘   └──────┬───────┘   └──────┬───────┘
       │                  │                  │
       │      Material UI (direct usage)     │
       │                  │                  │
       └──────────────────┼──────────────────┘
                          │
                ┌─────────▼──────────┐
                │  Backend API       │
                │  (Existing)        │
                └────────────────────┘
```

---

## 🚀 Getting Started

See [ROADMAP.md](./ROADMAP.md) for development phases and milestones.

### Quick Commands (Once Set Up)

```bash
# Install dependencies
pnpm install

# Run all apps in dev (with Turborepo)
turbo dev

# Run Storefront
pnpm --filter storefront dev

# Run Owner app
pnpm --filter owner dev

# Run Admin
pnpm --filter admin dev

# Build all (with Turborepo caching)
turbo build

# Run tests
turbo test
```

---

## 📚 Key Resources

**Design Inspiration:**
- [Booking.com](https://booking.com) - Information architecture
- [Airbnb.com](https://airbnb.com) - Modern aesthetics

**Documentation:**
- [Material UI](https://mui.com/material-ui/)
- [Next.js](https://nextjs.org/docs)
- [Turborepo](https://turbo.build/repo)
- [pnpm](https://pnpm.io/)

**Code Generation:**
- [Orval](https://orval.dev/) - OpenAPI code generator
- [OpenAPI Generator](https://openapi-generator.tech/)

---

## 📝 Next Steps

1. Set up monorepo (pnpm + Turborepo)
2. Initialize apps with Material UI
3. Connect to backend API
4. Start building features

See [ROADMAP.md](./ROADMAP.md) for detailed plan.
