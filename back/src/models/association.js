import Pokemon from "./Pokemon.model.js";
import Type from "./Type.model.js";
import Team from "./Team.model.js";

import Pokemon_Type from "./PokemonType.model.js";
import Team_Pokemon from "./TeamPokemon.model.js";

// Pokemon <-> Type
Pokemon.belongsToMany(Type, {
  through: "pokemon_type",
  foreignKey: "pokemon_id",
  otherKey: "type_id",
  as: "type",
});

Type.belongsToMany(Pokemon, {
  through: "pokemon_type",
  foreignKey: "type_id",
  otherKey: "pokemon_id",
  as: "pokemon",
});

// Team <-> Pokemon
Team.belongsToMany(Pokemon, {
  through: "team_pokemon",
  foreignKey: "team_id",
  otherKey: "pokemon_id",
  as: "pokemon",
});

Pokemon.belongsToMany(Team, {
  through: "team_pokemon",
  foreignKey: "pokemon_id",
  otherKey: "team_id",
  as: "team",
});

export { Pokemon, Type, Team, Pokemon_Type, Team_Pokemon };
