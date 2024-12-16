const modal = {
  init: () => {
    document.querySelectorAll(".close").forEach((el) => el.addEventListener("click", () => modal.openCloseModal()));
  },
  openCloseModal: () => {
    const pokemonModal = document.getElementById("pkm_detail");
    pokemonModal.classList.toggle("is-active");
  },
};

export default modal;
