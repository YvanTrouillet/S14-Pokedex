const modal = {
  init: () => {
    document.querySelectorAll(".close").forEach((el) => el.addEventListener("click", () => modal.closeModal(".modal")));
  },
  openModal: (selector) => {
    const modal = document.querySelector(selector);
    modal.classList.add("is-active");
  },

  closeModal: (selector) => {
    const modal = document.querySelectorAll(selector);

    for (const el of modal) {
      el.classList.remove("is-active");
    }
  },
};

export default modal;
