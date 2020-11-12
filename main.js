"use strict";

// Make navbar transparent wehn it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (!link) {
    return;
  }
  console.log(event.target.dataset.link);
  scrollIntoView(link);
});

// Handle click o0n "contact me" button on home
const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

// Project filtering & animation
document.querySelector(
  "#all"
).children[0].innerText = document.querySelectorAll(
  "[data-project-category]"
).length;

const categoryBtns = document.querySelector(".work__categories");
const projects = document.querySelector(".work__projects");
categoryBtns.addEventListener("mouseover", (event) => {
  const target = event.target;
  const filter = target.id;
  if (filter && filter != "all") {
    target.children[0].innerText = document.querySelectorAll(
      `[data-project-category = "${filter}"]`
    ).length;
  }
});

categoryBtns.addEventListener("click", (event) => {
  const target = event.target;
  const filter = target.id;
  if (filter && filter != "all") {
    Array.from(document.querySelector(".work__projects").children).forEach(
      (element) => {
        if (element.dataset.projectCategory == filter) {
          element.classList.remove("filtered");
        } else {
          element.classList.add("filtered");
        }
      }
    );
  }
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
