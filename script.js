"use strict";

const nav = document.querySelector(".nav");
const modalWindow = document.querySelector(".modal-window");
const modal = document.querySelector(".modal");
const cancelBtn = document.querySelector(".x--btn");
const learnMore = document.querySelector(".learn-more");
const section1 = document.querySelector("#section--1");
const header = document.querySelector("header");

const modalBtns = document.querySelectorAll(".modal-open--btn");
const sections = document.querySelectorAll(".section");
const lazyImgs = document.querySelectorAll(".lazy-img");

const navHeight = nav.getBoundingClientRect().height;

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

nav.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target;

  if (clicked.classList.contains("nav__link")) {
    const scrollTo = document.querySelector(`${clicked.getAttribute("href")}`);
    scrollTo.scrollIntoView({ behavior: "smooth" });
  }
});

function navObserverCallBack(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
}

const navObserver = new IntersectionObserver(navObserverCallBack, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
}).observe(header);

learnMore.addEventListener("click", function (e) {
  e.preventDefault();
  section1.scrollIntoView({ behavior: "smooth" });
});

function sectObserverCallBack(entries) {
  const [entry] = entries;
  if (entry.isIntersecting) entry.target.classList.remove("section--hidden");
  // observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(sectObserverCallBack, {
  root: null,
  threshold: 0.15,
});

sections.forEach(function (section) {
  section.classList.add("section--hidden");
  sectionObserver.observe(section);
});

// Lazy Loading
const lazyLoader = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  // For better performance
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  // observe.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(lazyLoader, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

lazyImgs.forEach(function (img) {
  imgObserver.observe(img);
});

// OPerations Section Component
const operationsBtnContainer = document.querySelector(".operations-btn__div");
const operationContents = document.querySelectorAll(".operations-content");
const operationBtns = document.querySelectorAll(".operations-btn");

operationsBtnContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations-btn");
  // console.log(clicked);
  if (!clicked.classList.contains("operations-btn")) return;

  operationBtns.forEach(function (btn) {
    btn.classList.remove("op-btn__active");
  });
  clicked.classList.add("op-btn__active");

  operationContents.forEach(function (c) {
    c.classList.add("content-hidden");
  });
  document
    .querySelector(`.content--${clicked.dataset.value}`)
    .classList.remove("content-hidden");
});
