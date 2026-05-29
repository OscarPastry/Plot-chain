# Plot-Chain

> *Every square centimeter of earth, immutably owned.*

A blockchain-based land registry with centimeter-level geospatial precision. Land parcels are stored as polygon geometry in PostgreSQL/PostGIS, verified on-chain as ERC-721 NFTs, and managed through a Rust API backend.

---

## Architecture

```mermaid
graph TD
    A[Next.js Frontend]:::accent0 --> B[Rust API - Axum]:::accent1
    B --> C[PostgreSQL + PostGIS]:::accent2
    B --> D[Redis]:::accent3
    B --> E[Polygon Network]:::accent4
    E --> F[LandRegistry.sol]:::accent5
    E --> G[LandNFT.sol ERC-721]:::accent6
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, Tailwind CSS v4 |
| Backend | Rust, Axum, SQLx, Tokio |
| Database | PostgreSQL 16 + PostGIS |
| Cache | Redis 7 |
| Blockchain | Solidity 0.8.27, Hardhat, OpenZeppelin |
| Chain | Polygon (Mumbai testnet) |

---

## Monorepo Structure

```
Plot-chain/
├── apps/
│   ├── web/                     # Next.js 16 frontend
│   │   ├── src/app/
│   │   │   ├── page.tsx         # Landing / map view
│   │   │   ├── registry/        # Parcel registration page
│   │   │   └── dashboard/       # Government dashboard
│   │   ├── src/components/
│   │   │   ├── Map.tsx          # Mapbox GL JS wrapper
│   │   │   ├── Navbar.tsx
│   │   │   ├── ParcelCard.tsx
│   │   │   └── WalletConnect.tsx
│   │   └── src/lib/
│   │       ├── api.ts           # Backend API client
│   │       ├── web3.ts          # ethers.js provider
│   │       └── geohash.ts       # GeoHash utilities
│   │
│   └── server/                  # Rust backend (Axum)
│       ├── Cargo.toml
│       └── src/
│           ├── main.rs          # Server entry point
│           ├── config.rs        # Env config
│           ├── app_state.rs     # Shared state (config + DB pool)
│           ├── error.rs         # AppErr + IntoResponse
│           ├── routes/
│           │   ├── mod.rs       # Router aggregator
│           │   ├── health.rs    # GET /api/health
│           │   ├── parcels.rs   # Parcel CRUD routes
│           │   └── registry.rs  # Verify + history routes
│           ├── models/
│           │   ├── parcels.rs   # ParcelResponse, CreateParcelRequest
│           │   └── registry.rs  # VerifyParcelResponse, RegistryHistoryResponse
│           └── db/
│               ├── mod.rs       # PgPool connection
│               └── parcels.rs   # SQLx query layer
│
└── packages/
    └── contracts/               # Hardhat + Solidity
        ├── contracts/
        │   ├── LandRegistry.sol # Registration, approval, rejection flow
        │   └── LandNFT.sol      # ERC-721 land parcel token
        ├── scripts/
        │   └── deploy.ts        # Deploy + transfer ownership script
        └── test/
            └── LandRegistry.test.ts
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- Rust (stable)
- Docker
- `cargo-watch` (optional, for hot reload)

### 1. Install dependencies

```bash
npm install
```

### 2. Start infrastructure

```bash
docker compose up -d
```

This starts:
- PostgreSQL 16 + PostGIS on port `5432`
- Redis 7 on port `6379`

### 3. Set up environment variables

Copy and fill in the `.env.example` at the repo root:

```bash
cp .env.example .env
```

Minimum required:

```env
DATABASE_URL=postgresql://plotchain:plotchain@localhost:5432/plotchain
REDIS_URL=redis://localhost:6379
POLYGON_RPC_URL=https://rpc-mumbai.maticvigil.com
JWT_SECRET=dev-secret-change-me
```

### 4. Run the backend

```bash
npm run dev:server
# or directly:
cargo run --manifest-path apps/server/Cargo.toml
```

Server starts on `http://localhost:4000`.

### 5. Run the frontend

```bash
npm run dev:web
```

Frontend starts on `http://localhost:3000`.

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/parcels` | List all parcels |
| `GET` | `/api/parcels/:id` | Get parcel by UUID |
| `POST` | `/api/parcels` | Create a new parcel |
| `POST` | `/api/parcels/:id/transfer` | Transfer parcel ownership |
| `GET` | `/api/registry/verify/:id` | Verify parcel on-chain |
| `GET` | `/api/registry/history/:id` | Get ownership transfer history |

### Example: Create a parcel

```bash
curl -X POST http://localhost:4000/api/parcels \
  -H "Content-Type: application/json" \
  -d '{
    "polygon": [[77.5946,12.9716],[77.5950,12.9716],[77.5950,12.9720]],
    "location": "Koramangala, Bengaluru",
    "ownerAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD28"
  }'
```

---

## Smart Contracts

### LandRegistry.sol

Manages the parcel registration approval flow.

- `submitRegistration(metadataUri, geohashes)` — applicant submits
- `approveRegistration(regId)` — validator approves, triggers NFT mint
- `rejectRegistration(regId)` — validator rejects

Registration statuses: `Pending → Approved / Rejected / Disputed`

### LandNFT.sol

ERC-721 token representing a land parcel.

- One token per approved parcel
- Metadata URI points to IPFS (GeoJSON polygon + geohash cells)
- `getParcelGeohashes(tokenId)` — returns geohash array

### Deploy contracts

```bash
# Start local chain
npm run dev:chain

# Deploy to local
npm run deploy:contracts

# Compile only
npm run compile:contracts

# Run tests
npm run test:contracts
```

---

## Available Scripts

From the repo root:

| Script | Description |
|--------|-------------|
| `npm run dev:web` | Start Next.js frontend |
| `npm run dev:server` | Start Rust API server |
| `npm run dev:chain` | Start local Hardhat node |
| `npm run build:web` | Build frontend |
| `npm run build:server` | Build Rust server |
| `npm run compile:contracts` | Compile Solidity contracts |
| `npm run test:contracts` | Run contract tests |
| `npm run deploy:contracts` | Deploy contracts to localhost |

---

## Current Status

### ✅ Done
- Monorepo structure (npm workspaces)
- Rust backend: Axum server, modular routes, app state, config, error handling
- Rust backend: all API routes wired and compiling
- Rust backend: SQLx DB query layer (`list`, `get_by_id`, `create`)
- Docker infra: PostgreSQL + PostGIS + Redis
- Smart contracts: `LandRegistry.sol` and `LandNFT.sol` implemented
- Smart contract tests: full registration flow coverage
- Frontend: page/component scaffold (map, dashboard, registry)
- Frontend: API client matching backend contract

### 🚧 In Progress
- DB migrations (first `parcels` table migration not yet applied)
- PostGIS geometry column (currently storing polygon as JSONB)
- Map integration (Mapbox GL JS placeholder)
- Wallet connect (ethers.js stub)
- Geohash polygon fill implementation

### 📋 Planned
- PostGIS overlap detection (`ST_Intersects`)
- Area calculation (`ST_Area`)
- Blockchain service integration from Rust backend (`alloy`)
- Auth middleware (JWT / wallet-signature)
- Government dashboard actions wired to contracts
- IPFS/Pinata metadata upload for NFT URI

---

## License

MIT
