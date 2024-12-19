import modal from "./modal.js";
import api from "./api.js";
import team from "./team.js";
import types from "./type.js";

const pokemon = {
  init: () => {
    api.getPokemon();
    modal.init();
    types.getTypes();
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
    console.log(data);
    // Récupérer le Template
    const template = document.querySelector("#pokemon-template");
    const clone = document.importNode(template.content, true);

    // On insère les données
    clone.querySelector(".card-content p").textContent = data.name;
    clone.querySelector(".pkm_img").setAttribute("src", `./asset/img/${data.id}.webp`);
    clone.querySelector(".card-loading").dataset.id = data.id;
    clone.querySelector(".card-poke").style.backgroundImage = "url(./asset/img/half-pokeball.svg),radial-gradient(80% 80% at 50% bottom, #" + data.type[0].color + ", rgba(6, 14, 32, 0.8))";
    clone.querySelector(".card-poke").style.transform = "translateZ(-10px) scale(0.9)";

    // On insére les types
    for (const type of data.type) {
      const btnType = document.createElement("span");
      const imgType = document.createElement("img");

      imgType.setAttribute("src", `./asset/icon/${type.id}.svg`);
      imgType.setAttribute("width", "18");

      btnType.classList.add("type-poke");
      btnType.style.backgroundColor = `#${type.color}`;
      btnType.textContent = type.name;
      btnType.dataset.id = type.id;

      btnType.prepend(imgType);
      clone.querySelector('[slot="container_type"]').append(btnType);
    }

    // Écouteur d'evenement
    clone.querySelector(".card-loading").addEventListener("click", pokemon.handleOnePokemon);

    // On insère le HTML dans la page
    document.querySelector("#app").append(clone);
  },

  innerHTMLModal: async (data) => {
    // Modification des données
    console.log(data);
    document.querySelector(".modal-card-pkm").style.backgroundImage = "url(./asset/img/half-pokeball.svg),radial-gradient(80% 80% at 50% bottom, #" + data.type[0].color + ", rgba(6, 14, 32, 0.8))";
    document.querySelector(".modal-card-pkm").style.transform = "translateZ(-10px) scale(0.9)";

    document.querySelector(".pkm_name").textContent = data.name;
    document.querySelector(".pkm_img_modal").setAttribute("src", `./asset/img/${data.id}.webp`);

    document.querySelector(".container_type-modal").innerHTML = "";
    for (const type of data.type) {
      const btnType = document.createElement("span");
      const imgType = document.createElement("img");

      imgType.setAttribute("src", `./asset/icon/${type.id}.svg`);
      imgType.setAttribute("width", "18");

      btnType.classList.add("type-poke");
      btnType.style.backgroundColor = `#${type.color}`;
      btnType.textContent = type.name;
      btnType.dataset.id = type.id;

      btnType.prepend(imgType);
      document.querySelector(".container_type-modal").append(btnType);
    }

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
