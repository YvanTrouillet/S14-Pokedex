import { Router } from "express";
import typeController from "../Controllers/type.controller.js";

const typeRouter = Router();

// Get
typeRouter.get("/types", typeController.getAllTypes);
typeRouter.get("/types/:id", typeController.getOneType);
// Post
// Patch
// Delete

export default typeRouter;
