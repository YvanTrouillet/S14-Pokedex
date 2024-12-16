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
      const newtype = document.createElement("button");
      newtype.classList.add("button");
      newtype.classList.add("is-flex-grow-1");
      newtype.classList.add("mx-2");
      newtype.style.backgroundColor = `#${type.color}`;
      newtype.textContent = type.name;
      newtype.dataset.id = type.id;

      newtype.addEventListener("click", types.handleFilter);

      document.querySelector("#FilterType").append(newtype);
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
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  },
};

export default types;
