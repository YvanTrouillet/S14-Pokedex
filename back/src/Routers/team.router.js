import { Router } from "express";
import teamController from "../Controllers/team.controller.js";

const teamRouter = Router();

// Get
teamRouter.get("/teams", teamController.getAllTeams);
teamRouter.get("/teams/:id", teamController.getOneTeam);
// Post
teamRouter.post("/teams", teamController.createdTeam);
// Patch
teamRouter.patch("/teams/:id", teamController.updateTeam);
// Delete
teamRouter.delete("/teams/:id", teamController.deleteTeam);

export default teamRouter;
