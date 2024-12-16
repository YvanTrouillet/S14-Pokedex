import { Pokemon } from "./src/models/association.js";

const pokemons = await Pokemon.findAll({
  include: [
    {
      association: "type",
    },
    {
      association: "team",
    },
  ],
});

console.log(JSON.stringify(pokemons, null, 2));
