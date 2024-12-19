import api from "./api.js";
import pokemon from "./pokemon.js";
import modal from "./modal.js";

const types = {
  init: () => {
    types.getTypes();
    modal.init();
  },

  getTypes: async () => {
    try {
      const result = await fetch(api.BaseUrl + "/types");
      const data = await result.json();
      console.log(data);

      types.innerHTMLTypes(data);
    } catch (error) {
      console.error(error);
    }
  },

  innerHTMLTypes: (data) => {
    for (const type of data) {
      const btnType = document.createElement("span");
      const imgType = document.createElement("img");

      imgType.setAttribute("src", `./asset/icon/${type.id}.svg`);
      imgType.setAttribute("width", "18");

      btnType.classList.add("type-poke-head");
      btnType.style.backgroundColor = `#${type.color}`;
      btnType.dataset.id = type.id;

      btnType.prepend(imgType);

      btnType.addEventListener("click", types.handleFilter);

      document.querySelector("#FilterType").append(btnType);
    }
  },

  handleFilter: async (event) => {
    const idType = event.currentTarget.dataset.id;
    document.querySelector("#app").innerHTML = "";
    try {
      const result = await fetch(api.BaseUrl + "/types/" + idType);
      const data = await result.json();

      for (const pokemonData of data.pokemon) {
        pokemon.innerHTMLElements(pokemonData);
      }
    } catch (error) {
      console.error(error);
    }
  },
};

export default types;
