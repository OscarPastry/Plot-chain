# Graph Report - Plot-chain  (2026-05-29)

## Corpus Check
- 47 files · ~13,843 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 324 nodes · 351 edges · 42 communities (34 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5f16215c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `What You Must Do When Invoked` - 15 edges
3. `/graphify` - 14 edges
4. `scripts` - 12 edges
5. `get_parcel()` - 10 edges
6. `transfer_parcel()` - 10 edges
7. `verify_parcel()` - 9 edges
8. `parcel_history()` - 9 edges
9. `ParcelRow` - 9 edges
10. `compilerOptions` - 9 edges

## Surprising Connections (you probably didn't know these)
- `ParcelRow` --references--> `Utc`  [EXTRACTED]
  apps/server/src/db/parcels.rs → apps/server/src/db/parcels.rs  _Bridges community 5 → community 12_

## Communities (42 total, 8 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (22): dependencies, next, react, react-dom, devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next (+14 more)

### Community 1 - "Community 1"
Cohesion: 0.10
Nodes (20): description, engines, node, license, name, private, scripts, build:server (+12 more)

### Community 2 - "Community 2"
Cohesion: 0.23
Nodes (19): AppErr, AppState, CreateParcelRequest, Json, ParcelResponse, Path, Result, State (+11 more)

### Community 3 - "Community 3"
Cohesion: 0.10
Nodes (19): Automated Tests, Express Backend (`apps/server`), Hardhat Contracts (`packages/contracts`), Manual Verification, [NEW] `apps/server/` — Full Express API, [NEW] `apps/web/` — Full Next.js app, [NEW] [docker-compose.yml](file:///home/Rishi/Documents/coding_Projects/Plot-chain/docker-compose.yml), [NEW] [.env.example](file:///home/Rishi/Documents/coding_Projects/Plot-chain/.env.example) (+11 more)

### Community 4 - "Community 4"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 5 - "Community 5"
Cohesion: 0.22
Nodes (17): CreateParcelRequest, Option, ParcelResponse, PgPool, Result, String, Uuid, Value (+9 more)

### Community 6 - "Community 6"
Cohesion: 0.11
Nodes (17): dependencies, @openzeppelin/contracts, devDependencies, hardhat, @nomicfoundation/hardhat-toolbox, ts-node, @types/node, typescript (+9 more)

### Community 7 - "Community 7"
Cohesion: 0.11
Nodes (18): Part A - Structural extraction for code files, Part B - Semantic extraction (parallel subagents), Part C - Merge AST + semantic into final extraction, Step 1 - Ensure graphify is installed, Step 2.5 - Transcribe video / audio files (only if video files detected), Step 2 - Detect files, Step 3 - Extract entities and relationships, Step 4 - Build graph, cluster, analyze, generate outputs (+10 more)

### Community 8 - "Community 8"
Cohesion: 0.14
Nodes (13): For --cluster-only, For git commit hook, For /graphify add, For /graphify explain, For /graphify path, For /graphify query, For native CLAUDE.md integration, For --update (incremental re-extraction) (+5 more)

### Community 9 - "Community 9"
Cohesion: 0.20
Nodes (9): PgPool, Self, Result, Arc, Config, config, AppState, main() (+1 more)

### Community 10 - "Community 10"
Cohesion: 0.26
Nodes (12): AppErr, AppState, Json, Path, Result, State, String, RegistryHistoryResponse (+4 more)

### Community 11 - "Community 11"
Cohesion: 0.17
Nodes (11): compilerOptions, esModuleInterop, forceConsistentCasingInFileNames, module, outDir, resolveJsonModule, skipLibCheck, strict (+3 more)

### Community 12 - "Community 12"
Cohesion: 0.31
Nodes (8): AppState, Json, State, String, health(), HealthResponse, router(), Utc

### Community 13 - "Community 13"
Cohesion: 0.22
Nodes (3): MapProps, ParcelCardProps, statusColors

### Community 14 - "Community 14"
Cohesion: 0.39
Nodes (7): Option, String, Vec, CreateParcelRequest, ParcelResponse, ParcelStatus, TransferParcelRequest

### Community 15 - "Community 15"
Cohesion: 0.29
Nodes (3): inter, jetbrainsMono, metadata

### Community 16 - "Community 16"
Cohesion: 0.29
Nodes (5): String, IntoResponse, Response, AppErr, ErrorBody

### Community 17 - "Community 17"
Cohesion: 0.33
Nodes (4): Result, Self, String, Config

### Community 18 - "Community 18"
Cohesion: 0.33
Nodes (4): health, Parcel, parcels, registry

### Community 20 - "Community 20"
Cohesion: 0.53
Nodes (5): String, Vec, RegistryHistoryResponse, TransferRecord, VerifyParcelResponse

### Community 22 - "Community 22"
Cohesion: 0.50
Nodes (3): PgPool, Result, connect_db()

### Community 23 - "Community 23"
Cohesion: 0.83
Nodes (3): AppState, Router, create_router()

### Community 24 - "Community 24"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **166 isolated node(s):** `name`, `version`, `private`, `description`, `workspaces` (+161 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `What You Must Do When Invoked` connect `Community 7` to `Community 8`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Why does `/graphify` connect `Community 8` to `Community 7`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Why does `ParcelRow` connect `Community 5` to `Community 12`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _166 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._