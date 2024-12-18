import modal from "./modal.js";
import api from "./api.js";

const pokemon = {
  init: () => {
    pokemon.getPokemon();
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

      for (const el of data) {
        pokemon.innerHTMLElements(el);
      }
    } catch (error) {
      console.error(error);
    }
  },

  handleOnePokemon: async (event) => {
    const idPokemon = event.currentTarget.dataset.id;
    modal.openCloseModal("modal");
    try {
      const result = await fetch(api.BaseUrl + "/pokemons/" + idPokemon);
      const data = await result.json();
      if (!result) {
        console.error(result);
        return null;
      }

      pokemon.innerHTMLModal(data);
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
    clone.querySelector(".card").addEventListener("click", pokemon.handleOnePokemon);

    // On insère le HTML dans la page
    document.querySelector("#app").append(clone);
  },

  innerHTMLModal: (data) => {
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

export default pokemon;
