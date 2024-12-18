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
// Put
teamRouter.put("/teams/:idTeam/pokemons/:idPokemon", teamController.updatePokemonTeam);
// Delete
teamRouter.delete("/teams/:id", teamController.deleteTeam);
// Delete Pokemon
teamRouter.delete("/teams/:idTeam/pokemons/:idPokemon", teamController.deletePokemonToTeam);

export default teamRouter;
