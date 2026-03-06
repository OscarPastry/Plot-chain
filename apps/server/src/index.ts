import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { router } from "./routes";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config({ path: "../../.env" });

const app = express();
const PORT = process.env.PORT || 4000;

// ─── Middleware ─────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(morgan("dev"));
app.use(express.json());

// ─── Routes ────────────────────────────────────────────
app.use("/api", router);

// ─── Error Handler ─────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ──────────────────────────────────────
app.listen(PORT, () => {
    console.log(`
  ⛓️  Plot-Chain API Server
  ────────────────────────
  🚀 Running on http://localhost:${PORT}
  📡 API base:  http://localhost:${PORT}/api
  🏥 Health:    http://localhost:${PORT}/api/health
  `);
});

export default app;
