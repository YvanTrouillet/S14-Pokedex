import pokemon from "./pokemon.js";
import team from "./team.js";

const api = {
  BaseUrl: "http://localhost:3000",
  init: () => {
    api.getPokemon();
    api.getTeams();
  },
  getPokemon: async () => {
    try {
      const pokemons = await fetch(api.BaseUrl + "/pokemons");
      const data = await pokemons.json();

      if (!pokemons) {
        console.error(pokemons);
        return null;
      }

      for (const el of data) {
        pokemon.innerHTMLElements(el);
      }
    } catch (error) {
      console.error(error);
    }
  },

  getOnePokemon: async (id) => {
    try {
      const result = await fetch(api.BaseUrl + "/pokemons/" + id);
      return await result.json();
    } catch (error) {
      console.error(error);
    }
  },

  getTeams: async () => {
    try {
      const result = await fetch(api.BaseUrl + "/teams");
      const data = await result.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  addPokemonToTeam: async (idPokemon, idTeam) => {
    try {
      const result = await fetch(api.BaseUrl + "/teams/" + idTeam + "/pokemons/" + idPokemon, {
        method: "PUT",
      });
      const data = await result.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  deletePokemonToTeam: async (idPokemon, idTeam) => {
    try {
      const result = await fetch(api.BaseUrl + "/teams/" + idTeam + "/pokemons/" + idPokemon, {
        method: "DELETE",
      });
      const data = await result.json();
      return data;
    } catch (error) {}
  },
};

export default api;
