import api from "./api.js";

const app = {
  init: () => {
    app.getPokemon();
  },
  getPokemon: async () => {
    try {
      const pokemons = await fetch(api.BaseUrl + "/pokemons");
      const data = await pokemons.json();

      if (!pokemons) {
        console.error(pokemons);
        return null;
      }

      for (const pokemon of data) {
        app.innerHTMLElements(pokemon);
      }
    } catch (error) {
      console.error(error);
    }
  },

  innerHTMLElements: (data) => {
    // Récupérer le Template
    const template = document.querySelector("#pokemon-template");
    const clone = document.importNode(template.content, true);

    // On insère les données
    clone.querySelector(".card-content p").textContent = data.name;
    clone.querySelector(".pkm_img").setAttribute("src", `./asset/img/${data.id}.webp`);

    // On insère le HTML dans la page
    document.querySelector("#app").append(clone);
  },
};

document.addEventListener("DOMContentLoaded", app.init);
