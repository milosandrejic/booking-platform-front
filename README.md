# Booking Platform Monorepo

Monorepo with multiple apps and shared packages. Uses pnpm workspaces.

## Prerequisites
- Node.js 18+
- pnpm 8+

## Install
```bash
pnpm install
```

## Develop
```bash
# run all apps
pnpm dev

# or individual apps
pnpm dev:storefront
pnpm dev:admin
pnpm dev:owner
```

## Build
```bash
pnpm build
```

## Lint
```bash
pnpm lint
```

## Clean
```bash
pnpm clean
```

## Structure
```
apps/
  storefront/   # Next.js
  admin/        # Vite
  owner/        # Next.js
shared/
  theme/        # Theme + CSS variables
  ui/           # Reusable UI components