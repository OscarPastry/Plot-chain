import { Router } from "express";
import { healthRouter } from "./health.routes";
import { parcelRouter } from "./parcel.routes";
import { registryRouter } from "./registry.routes";

export const router = Router();

router.use("/health", healthRouter);
router.use("/parcels", parcelRouter);
router.use("/registry", registryRouter);
