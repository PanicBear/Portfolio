"use strict";

// Make navbar transparent when it is on the top
// Activate menu on scroll(additional course)
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
const sections = document.querySelectorAll(".section");
var sectionHeights = { home: 0 };
Array.from(sections).forEach((section) => {
  sectionHeights[section.id] = section.offsetTop;
});
console.log(sectionHeights);
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }

  for (const index in sectionHeights) {
    if (window.scrollY >= sectionHeights[index]) {
      document
        .querySelector(".active")
        .setAttribute("class", "navbar__menu__item");
      document
        .querySelector("li[data-link='#" + index + "']")
        .setAttribute("class", "navbar__menu__item active");
    }
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
  navbarMenu.classList.remove("open");
  scrollIntoView(link);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("open");
});

// Personal modification
window.addEventListener("resize", () => {
  if (window.matchMedia("(max-width: 768px)").matches === false) {
    navbarMenu.classList.remove("open");
  }
});

// Handle click on "contact me" button on home
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

// Projects
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (!filter) {
    return;
  }

  // Remove selection from the previous item and select the new
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("selected");

  projectContainer.classList.add("anim-out");
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300);
});

// Count project dynamically
const projectCnts = document.querySelectorAll(".category__count");
Array.from(projectCnts).forEach((projectCnt) => {
  projectCnt.innerText =
    projectCnt.parentNode.innerText === "All"
      ? projects.length
      : document.querySelectorAll(
          `[data-type=${projectCnt.parentNode.innerText.toLowerCase()}]`
        ).length;
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
