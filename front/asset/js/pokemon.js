import modal from "./modal.js";
import api from "./api.js";
import team from "./team.js";

const pokemon = {
  init: () => {
    api.getPokemon();
    modal.init();
  },

  handleOnePokemon: async (event) => {
    const idPokemon = event.currentTarget.dataset.id;
    modal.openModal("#modal");

    const getPokemon = await api.getOnePokemon(idPokemon);
    if (getPokemon === null) {
      console.error("Impossible de charger les pokemons !");
      return;
    }

    pokemon.innerHTMLModal(getPokemon);
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

  innerHTMLModal: async (data) => {
    // Modification des données
    document.querySelector(".pkm_name").textContent = data.name;
    document.querySelector(".pkm_img_modal").setAttribute("src", `./asset/img/${data.id}.webp`);
    document.querySelector(".pv .progress").value = data.hp;
    document.querySelector(".atk .progress").value = data.atk;
    document.querySelector(".def .progress").value = data.def;
    document.querySelector(".atk_spe .progress").value = data.atk_spe;
    document.querySelector(".def_spe .progress").value = data.def_spe;
    document.querySelector(".speed .progress").value = data.speed;

    const form = document.querySelector("#form_add_pkm_team");
    form.dataset.id = data.id;
    form.addEventListener("submit", team.handleAddPokemonInTeam);

    const selectTeam = document.querySelector(".select");
    selectTeam.innerHTML = "";

    const teams = await api.getTeams();
    for (const team of teams) {
      const option = document.createElement("option");
      option.value = team.id;
      option.textContent = team.name;
      selectTeam.append(option);
    }
  },
};

export default pokemon;
