import { Router } from "express";
import pokemonController from "../Controllers/pokemon.controller.js";

const pokemonRouter = Router();

// Get
pokemonRouter.get("/pokemons", pokemonController.getAllPokemons);
pokemonRouter.get("/pokemons/:id", pokemonController.getOnePokemon);
// Post
// Patch
// Delete

export default pokemonRouter;
