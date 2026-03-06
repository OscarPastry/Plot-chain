import { Router } from "express";
import { ParcelController } from "../controllers/parcel.controller";

export const parcelRouter = Router();
const controller = new ParcelController();

parcelRouter.get("/", controller.list);
parcelRouter.get("/:id", controller.getById);
parcelRouter.post("/", controller.create);
parcelRouter.post("/:id/transfer", controller.transfer);
