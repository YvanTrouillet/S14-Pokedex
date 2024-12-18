import api from "./api.js";
import modal from "./modal.js";

const team = {
  init: () => {
    modal.init();
    team.blind();
    team.loadTeam();
  },

  blind: () => {
    document.querySelector(".edit").addEventListener("click", team.showInputEditTeam);
    document.querySelector(".modal-card-head form").addEventListener("submit", team.handleEditName);
    document.querySelector("#nav-item-add-team").addEventListener("click", () => modal.openModal("#add_team_modal"));
    document.querySelector("#form_team_modal").addEventListener("submit", team.handleAddTeam);
  },

  loadTeam: async () => {
    const teams = await api.getTeams();
    for (const data of teams) {
      team.innerHTMLTeam(data);
    }
  },
  innerHTMLTeam: (data) => {
    // Récupération du template et clone de celui-ci
    const templateTeam = document.querySelector("#team-template");
    const clone = document.importNode(templateTeam.content, true);
    const containerImg = clone.querySelector(".imgContainer");

    // Modification des données
    clone.querySelector(".team-name").textContent = data.name;
    clone.querySelector("section").setAttribute("id", `${data.id}`);
    clone.querySelector(".team-description").textContent = data.description;

    // boucle pour avoir tous les pokemons de la team
    for (const pokemon of data.pokemon) {
      const figPokemon = document.createElement("figure");
      figPokemon.classList.add("image");
      figPokemon.classList.add("is-64x64");
      figPokemon.classList.add("mx-2");
      figPokemon.setAttribute("id", pokemon.id);

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
    modal.openModal("#modal");
    try {
      const teamApi = await fetch(api.BaseUrl + "/teams/" + idTeam);
      const data = await teamApi.json();

      team.dataPokemonTeamModal(data);
    } catch (error) {
      console.error(error);
    }
  },

  dataPokemonTeamModal: (data) => {
    const modal = document.querySelector("#modal");
    modal.querySelector(".team_name").textContent = data.name;

    const Array = document.querySelector("#tbody_team");
    Array.innerHTML = "";
    const templateTable = document.querySelector("#table-modal");

    for (const pokemon of data.pokemon) {
      // Clonage du template de ligne
      const row = document.importNode(templateTable.content, true);

      // Récupération des cellules du tableau
      const cells = row.querySelectorAll("td");

      // Ajout des données dans un tableau
      const iconData = '<i class="fa fa-trash"></i>';
      const pokemonData = [pokemon.id, pokemon.name, pokemon.hp, pokemon.atk, pokemon.def, pokemon.atk_spe, pokemon.def_spe, pokemon.speed, pokemon.type[0].name, iconData];

      // Boucle sur le tableau de toutes les cellules et ajout des données grâce à l'index.
      cells.forEach((cell, index) => {
        cell.innerHTML = pokemonData[index];
      });

      // Ajout d'un écouteur d'évenement pour supprimer le pokemon
      const icon = row.querySelector(".fa-trash");
      icon.style.cursor = "pointer";
      icon.dataset.id = pokemon.id;
      icon.dataset.team = data.id;
      icon.addEventListener("click", team.handleDeletePokemonToTeam),
        // Ajout de la ligne dans le tableau
        Array.append(row);
    }
  },

  showInputEditTeam: () => {
    const form = document.querySelector(".modal-card-head form");
    const h2 = document.querySelector(".modal-card-head h2");

    form.classList.remove("hidden");
    form.querySelector("input").value = h2.textContent;
    h2.classList.add("hidden");
  },

  closeInputEditTeam: () => {
    document.querySelector(".modal-card-head form").classList.add("hidden");
    document.querySelector(".modal-card-head h2").classList.remove("hidden");
  },

  handleEditName: async (event) => {
    event.preventDefault();

    // Récupération de données pour la modification
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const teamId = document.querySelector(".btnModalTeam").dataset.id;

    const updateNameTeam = await team.updateTeam(teamId, data);
    if (updateNameTeam === null) {
      console.log("Impossible de modifier la team !");
      return;
    }

    team.updateToDOM(updateNameTeam);

    team.closeInputEditTeam();

    modal.closeModal(".modal");
  },

  updateTeam: async (id, data) => {
    try {
      const result = await fetch(api.BaseUrl + "/teams/" + id, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!result.ok) {
        console.error(result);
        return null;
      }
      return await result.json();
    } catch (error) {
      console.error(error);
    }
  },

  updateToDOM: (team) => {
    const teamElement = document.getElementById(team.id);

    teamElement.querySelector(".team-name").textContent = team.name;
  },

  handleAddTeam: async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    // Récupération des données du formulaire
    const data = Object.fromEntries(new FormData(event.currentTarget));

    const addTeam = await team.addTeam(data);

    if (addTeam === null) {
      console.log("Impossible de modifier la team !");
      return;
    }

    addTeam.pokemon = [];

    team.innerHTMLTeam(addTeam);

    form.reset();

    modal.closeModal(".modal");
  },

  addTeam: async (data) => {
    try {
      const result = await fetch(api.BaseUrl + "/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!result.ok) {
        console.error(result);
        return null;
      }

      return await result.json();
    } catch (error) {
      console.error(error);
    }
  },

  handleAddPokemonInTeam: async (event) => {
    event.preventDefault();
    // Récupération des données
    const idPokemon = event.currentTarget.dataset.id;
    const select = new FormData(event.currentTarget);
    const idteam = select.get("teams");

    const addToTeam = await api.addPokemonToTeam(idPokemon, idteam);
    if (addToTeam === null) {
      console.log("Impossible d'ajouter le pokemon à la team !");
      return;
    }

    window.location.href = "http://127.0.0.1:5500/front/teams.html";
  },

  handleDeletePokemonToTeam: async (event) => {
    const idPokemon = event.currentTarget.dataset.id;
    const idTeam = event.currentTarget.dataset.team;

    const deleteToTeam = await api.deletePokemonToTeam(idPokemon, idTeam);
    if (deleteToTeam === null) {
      console.log("Impossible de supprimer le pokemon de la team !");
      return;
    }

    // Delete the row in the array
    const row = event.target.parentElement.parentElement;
    row.innerHTML = "";

    const data = await api.getTeams();
    document.querySelector("#app").innerHTML = "";
    for (const el of data) {
      console.log(el);
      team.innerHTMLTeam(el);
    }
    modal.closeModal(".modal");
  },
};

export default team;
