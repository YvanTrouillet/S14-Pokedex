import { Pokemon } from "../models/association.js";

const pokemonController = {
  getAllPokemons: async (req, res) => {
    try {
      const pokemons = await Pokemon.findAll({
        attributes: ["id", "name", "hp", "atk", "def", "atk_spe", "def_spe", "speed"],
      });
      res.status(200).json(pokemons);
    } catch (error) {
      console.error(error);
    }
  },
  getOnePokemon: async (req, res) => {
    try {
      const pokemon = await Pokemon.findByPk(req.params.id, {
        attributes: ["id", "name", "hp", "atk", "def", "atk_spe", "def_spe", "speed"],
      });
      res.status(200).json(pokemon);
    } catch (error) {
      console.error(error);
    }
  },
};

export default pokemonController;
