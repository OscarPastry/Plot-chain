import { Router } from "express";
import { RegistryController } from "../controllers/registry.controller";

export const registryRouter = Router();
const controller = new RegistryController();

registryRouter.get("/verify/:id", controller.verify);
registryRouter.get("/history/:id", controller.history);
