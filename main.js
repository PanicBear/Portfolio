"use strict";

// Make navbar transparent wehn it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
const navbarBtn = document.querySelectorAll(".navbar__menu__item");
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});
navbarBtn[0].addEventListener("click", () => {
  scrollTo(document.getElementById("home").offsetTop);
});
navbarBtn[1].addEventListener("click", () => {
  scrollTo(document.getElementById("about").offsetTop);
});
navbarBtn[2].addEventListener("click", () => {
  scrollTo(document.getElementById("skills").offsetTop);
});
navbarBtn[3].addEventListener("click", () => {
  scrollTo(document.getElementById("work").offsetTop);
});
navbarBtn[4].addEventListener("click", () => {
  scrollTo(document.getElementById("testimonials").offsetTop);
});
navbarBtn[5].addEventListener("click", () => {
  scrollTo(document.getElementById("contact").offsetTop);
});

function scrollTo(x) {
  window.scroll({
    top: x,
    left: 0,
    behavior: "smooth",
  });
}
