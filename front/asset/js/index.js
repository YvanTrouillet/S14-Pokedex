import api from "./api.js";
import modal from "./modal.js";

const app = {
  init: () => {
    app.getPokemon();
    modal.init();
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

  handleOnePokemon: async (event) => {
    const idPokemon = event.currentTarget.getAttribute("data-id");
    modal.openCloseModal();
    try {
      const result = await fetch(api.BaseUrl + "/pokemons/" + idPokemon);
      const pokemon = await result.json();
      if (!result) {
        console.error(result);
        return null;
      }

      app.innerHTMLModal(pokemon);
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
    clone.querySelector(".card").dataset.id = data.id;

    // Écouteur d'evenement
    clone.querySelector(".card").addEventListener("click", app.handleOnePokemon);

    // On insère le HTML dans la page
    document.querySelector("#app").append(clone);
  },

  innerHTMLModal: (data) => {
    console.log("coucou");
    // Modification des données
    document.querySelector(".pkm_name").textContent = data.name;
    document.querySelector(".pkm_img_modal").setAttribute("src", `./asset/img/${data.id}.webp`);
    document.querySelector(".pv .progress").value = data.hp;
    document.querySelector(".atk .progress").value = data.atk;
    document.querySelector(".def .progress").value = data.def;
    document.querySelector(".atk_spe .progress").value = data.atk_spe;
    document.querySelector(".def_spe .progress").value = data.def_spe;
    document.querySelector(".speed .progress").value = data.speed;
  },
};

document.addEventListener("DOMContentLoaded", app.init);
