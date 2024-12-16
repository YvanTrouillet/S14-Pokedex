import pokemon from "./pokemon.js";
import types from "./type.js";

const app = {
  init: () => {
    switch (document.querySelector("h1").textContent) {
      case "Pokedex":
        console.log("pokedex");
        pokemon.init();
        break;

      case "Types":
        console.log("types");
        types.init();
        break;

      default:
        break;
    }
  },
};

document.addEventListener("DOMContentLoaded", app.init);
