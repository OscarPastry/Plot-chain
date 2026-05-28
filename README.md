# Plot-Chain — Skeleton Project Plan

Scaffold a monorepo skeleton that covers all three pillars from the idea doc: **Frontend (Next.js)**, **Backend (Rust)**, and **Blockchain (Hardhat/Solidity)**. Everything is wired together with shared config so you can `npm install` from the root and start developing immediately.

## Project Structure

```
Plot-chain/
├── README.md                          # Project overview & quickstart
├── package.json                       # Root monorepo (npm workspaces)
├── .env.example                       # Shared env template
├── .gitignore
├── docker-compose.yml                 # PostgreSQL+PostGIS + Redis
│
├── apps/
│   ├── web/                           # Next.js 15 frontend
│   │   ├── package.json
│   │   ├── next.config.js
│   │   ├── tailwind.config.js
│   │   ├── postcss.config.js
│   │   ├── tsconfig.json
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── layout.tsx         # Root layout (fonts, providers)
│   │   │   │   ├── page.tsx           # Landing / Map page
│   │   │   │   ├── globals.css
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx       # Government dashboard stub
│   │   │   │   └── registry/
│   │   │   │       └── page.tsx       # Land registry page stub
│   │   │   ├── components/
│   │   │   │   ├── Map.tsx            # Mapbox/Leaflet wrapper
│   │   │   │   ├── Navbar.tsx         # Top navigation
│   │   │   │   ├── ParcelCard.tsx     # Land parcel info card
│   │   │   │   └── WalletConnect.tsx  # Wallet connection button
│   │   │   ├── lib/
│   │   │   │   ├── web3.ts            # ethers.js provider setup
│   │   │   │   ├── geohash.ts         # GeoHash utilities
│   │   │   │   └── api.ts            # Backend API client
│   │   │   └── store/
│   │   │       └── useStore.ts        # Zustand store
│   │   └── .env.local.example
│   │
│   └── server/                        # Express.js backend API
│       ├── package.json
│       ├── tsconfig.json
│       ├── src/
│       │   ├── index.ts               # Entry point, Express app setup
│       │   ├── config/
│       │   │   └── index.ts           # Environment config loader
│       │   ├── routes/
│       │   │   ├── index.ts           # Route aggregator
│       │   │   ├── parcel.routes.ts   # Land parcel CRUD routes
│       │   │   ├── registry.routes.ts # Registry operations
│       │   │   └── health.routes.ts   # Health check
│       │   ├── controllers/
│       │   │   ├── parcel.controller.ts
│       │   │   └── registry.controller.ts
│       │   ├── services/
│       │   │   ├── parcel.service.ts
│       │   │   ├── blockchain.service.ts  # Contract interaction
│       │   │   └── geospatial.service.ts  # PostGIS queries
│       │   ├── models/
│       │   │   └── parcel.model.ts     # Parcel schema/type
│       │   ├── middleware/
│       │   │   ├── auth.middleware.ts
│       │   │   └── error.middleware.ts
│       │   └── utils/
│       │       └── geohash.ts          # GeoHash helper
│       └── .env.example
│
├── packages/
│   └── contracts/                     # Hardhat + Solidity
│       ├── package.json
│       ├── hardhat.config.ts
│       ├── tsconfig.json
│       ├── contracts/
│       │   ├── LandRegistry.sol       # Main registry contract
│       │   └── LandNFT.sol            # ERC-721 land parcel NFT
│       ├── scripts/
│       │   └── deploy.ts              # Deployment script
│       └── test/
│           └── LandRegistry.test.ts   # Basic contract tests
│
└── blockchain_land_registry_idea.md.resolved   # (existing)
```

## Proposed Changes

### Root Monorepo Setup

Root `package.json` with npm workspaces pointing to `apps/*` and `packages/*`. Shared `.gitignore`, `.env.example`, and a `docker-compose.yml` to spin up PostgreSQL+PostGIS and Redis.

#### [NEW] [package.json](file:///home/Rishi/Documents/coding_Projects/Plot-chain/package.json)
Root monorepo config with npm workspaces and convenience scripts (`dev`, `build`, `dev:web`, `dev:server`, `dev:chain`).

#### [NEW] [.gitignore](file:///home/Rishi/Documents/coding_Projects/Plot-chain/.gitignore)
Standard ignores for Node, Next.js, Hardhat, environment files.

#### [NEW] [.env.example](file:///home/Rishi/Documents/coding_Projects/Plot-chain/.env.example)
Template for all shared env vars (DB, Redis, blockchain RPC, Mapbox token, etc.).

#### [NEW] [docker-compose.yml](file:///home/Rishi/Documents/coding_Projects/Plot-chain/docker-compose.yml)
PostgreSQL 16 with PostGIS extension + Redis 7.

---

### Next.js Frontend (`apps/web`)

Initialized via `npx create-next-app` with TypeScript, Tailwind, App Router. Then stub components and pages are added.

#### [NEW] `apps/web/` — Full Next.js app
Key files: `layout.tsx`, `page.tsx` (map landing), `dashboard/page.tsx`, `registry/page.tsx`, plus component stubs (`Map.tsx`, `Navbar.tsx`, `ParcelCard.tsx`, `WalletConnect.tsx`), lib helpers (`web3.ts`, `geohash.ts`, `api.ts`), and Zustand store.

---

### Express Backend (`apps/server`)

A TypeScript Express API with layered architecture (routes → controllers → services).

#### [NEW] `apps/server/` — Full Express API
Key files: entry point (`index.ts`), config loader, route files for parcels/registry/health, controller stubs, service stubs (parcel, blockchain interaction, geospatial/PostGIS), middleware (auth, error handling), and geohash utility.

---

### Hardhat Contracts (`packages/contracts`)

Solidity smart contracts with Hardhat tooling.

#### [NEW] `packages/contracts/` — Full Hardhat project
Key files: `LandRegistry.sol` (main registry), `LandNFT.sol` (ERC-721), deploy script, and a basic test.

---

### README

#### [NEW] [README.md](file:///home/Rishi/Documents/coding_Projects/Plot-chain/README.md)
Project overview, architecture diagram, tech stack summary, getting started guide, available scripts.

---

## Verification Plan

### Automated Tests
1. **Smart contract tests:** `cd packages/contracts && npx hardhat test` — must compile contracts and pass the basic test.
2. **Frontend build:** `cd apps/web && npm run build` — must compile without TypeScript errors.
3. **Backend compilation:** `cd apps/server && npx tsc --noEmit` — must pass type-checking.

### Manual Verification
1. Run `npm install` from the project root — should install all workspace dependencies.
2. Run `npm run dev:web` — Next.js dev server should start on port 3000.
3. Run `npm run dev:server` — Express dev server should start on port 4000.
4. Run `docker-compose up -d` — PostgreSQL and Redis containers should come up (requires Docker; optional for skeleton check).
