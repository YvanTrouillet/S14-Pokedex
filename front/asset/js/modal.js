const modal = {
  init: () => {
    document.querySelectorAll(".close").forEach((el) => el.addEventListener("click", () => modal.openCloseModal("modal")));
  },
  openCloseModal: (selector) => {
    const pokemonModal = document.getElementById(selector);
    pokemonModal.classList.toggle("is-active");
  },
};

export default modal;
