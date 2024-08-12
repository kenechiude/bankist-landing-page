"use strict";

const nav = document.querySelector(".nav");
const modalBtns = document.querySelectorAll(".modal-open--btn");
const modalWindow = document.querySelector(".modal-window");
const modal = document.querySelector(".modal");
const cancelBtn = document.querySelector(".x--btn");

function hideModal() {
  modal.classList.add("hidden");
  modalWindow.classList.add("hidden");
}

function showModal() {
  modal.classList.remove("hidden");
  modalWindow.classList.remove("hidden");
}

function handleHover(e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const logo = nav.querySelector("img");
    const links = nav.querySelectorAll(".nav__link");

    links.forEach((l) => {
      if (l !== link) l.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}

modalBtns.forEach((btn) => {
  btn.addEventListener("click", showModal);
});

cancelBtn.addEventListener("click", hideModal);

modalWindow.addEventListener("click", hideModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) hideModal();
});

nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));
