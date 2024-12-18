import pokemon from "./pokemon.js";
import team from "./team.js";
import types from "./type.js";

const app = {
  init: () => {
    switch (document.querySelector("h1").textContent) {
      case "Pokedex":
        pokemon.init();
        break;

      case "Types":
        types.init();
        break;

      case "Teams":
        team.init();
        break;

      default:
        break;
    }
  },
};

document.addEventListener("DOMContentLoaded", app.init);
