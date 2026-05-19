# AGENTS.md — Tubod Municipality Agriculture Information System

## Overview
Comprehensive agriculture information management system for Tubod Municipality, Surigao del Norte. Manages farmer records, crop data, land parcels, and agricultural programs. Fully compliant with RA 9184 Procurement Law, RA 10173 Data Privacy Act, and NPC guidelines for secure handling of farmer and agricultural data.

## Stack
- **Monorepo**: Turborepo + pnpm
- **Frontend**: Next.js 16 + Tailwind v4 + shadcn/ui
- **Backend**: NestJS 11 + Drizzle ORM
- **Auth**: Better Auth
- **Contracts**: oRPC + Zod
- **DB**: PostgreSQL 17

## Modules
- **Farmers** (`farmer`): Full Name, Barangay, Farm Size (hectares), Contact Number, Registration Date, Farming Type, Active Status
- **Crops** (`crop`): Crop Name, Variety, Planting Date, Expected Harvest Date, Area Planted (hectares), Farmer Name, Estimated Yield (tons)
- **Programs** (`program`): Program Name, Description, Start Date, End Date, Budget, Number of Beneficiaries, Status
- **Land Parcels** (`landparcel`): Parcel ID, Owner Name, Location, Area (hectares), Soil Type, Irrigation Type, Title Number
- **Data Privacy** (`dataprivacy`): Request Type, Data Subject, Request Details, Filed Date, Status, Resolved Date, Consent Given, Privacy Officer

## Commands
- `pnpm dev` — Start all apps
- `pnpm build` — Build everything
- `pnpm db:push` — Push DB schema
- `pnpm db:seed` — Seed data
- `pnpm test` — Run tests
- `pnpm lint` — Lint all

## Structure
```
├── apps/web/         # Next.js frontend
├── apps/backend/     # NestJS API
├── packages/db/      # Drizzle ORM
├── packages/auth/    # Better Auth
├── packages/contracts/ # oRPC + Zod
└── tooling/          # Shared configs
```

Always use `pnpm` (never npm/yarn).