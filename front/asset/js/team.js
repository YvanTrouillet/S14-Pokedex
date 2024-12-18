import api from "./api.js";
import modal from "./modal.js";

const team = {
  init: () => {
    team.getTeams();
    modal.init();
  },

  getTeams: async () => {
    try {
      const result = await fetch(api.BaseUrl + "/teams");
      const data = await result.json();

      for (const teamElement of data) {
        team.innerHTMLTeam(teamElement);
      }
    } catch (error) {
      console.error(error);
    }
  },

  innerHTMLTeam: async (data) => {
    // Récupération du template et clone de celui-ci
    const templateTeam = document.querySelector("#team-template");
    const clone = document.importNode(templateTeam.content, true);
    const containerImg = clone.querySelector(".imgContainer");

    // Modification des données
    clone.querySelector(".team-name").textContent = data.name;
    clone.querySelector(".team-description").textContent = data.description;

    // boucle pour avoir tous les pokemons de la team
    for (const pokemon of data.pokemon) {
      const figPokemon = document.createElement("figure");
      figPokemon.classList.add("image");
      figPokemon.classList.add("is-64x64");
      figPokemon.classList.add("mx-2");

      const imgpokemon = document.createElement("img");
      imgpokemon.classList.add("is-rounded");
      imgpokemon.setAttribute("src", `./asset/img/${pokemon.id}.webp`);

      figPokemon.append(imgpokemon);
      containerImg.append(figPokemon);
    }

    clone.querySelector(".btnModalTeam").dataset.id = data.id;
    clone.querySelector(".btnModalTeam").addEventListener("click", team.handleModalTeam);

    // Ajout au HTML
    document.querySelector("#app").append(clone);
  },

  handleModalTeam: async (event) => {
    const idTeam = event.currentTarget.dataset.id;
    modal.openCloseModal("modal");
    try {
      const team = await fetch(api.BaseUrl + "/teams/" + idTeam);
      const data = await team.json();

      const modal = document.querySelector("#modal");
      modal.querySelector(".team_name").textContent = data.name;

      const Array = document.querySelector("#tbody_team");
      Array.innerHTML = "";
      const templateTable = document.querySelector("#table-modal");

      for (const pokemon of data.pokemon) {
        const row = document.importNode(templateTable.content, true);

        const cells = row.querySelectorAll("td");

        const icon = '<i class="fa fa-trash"></i>';

        const pokemonData = [pokemon.id, pokemon.name, pokemon.hp, pokemon.atk, pokemon.def, pokemon.atk_spe, pokemon.def_spe, pokemon.speed, pokemon.type[0].name, icon];

        cells.forEach((cell, index) => {
          cell.innerHTML = pokemonData[index];
        });

        Array.append(row);
      }
    } catch (error) {
      console.error(error);
    }
  },
};

export default team;
