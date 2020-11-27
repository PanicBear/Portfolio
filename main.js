"use strict";

// Make navbar transparent when it is on the top
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

const sectionIds = [
  "#home",
  "#about",
  "#skills",
  "#work",
  "#testimonials",
  "#contact",
];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`.navbar__menu__item[data-link="${id}"]`)
);

let selectedNavIdx;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  const top =
    scrollTo.offsetTop - navbarHeight < 0
      ? 0
      : scrollTo.offsetTop - navbarHeight;
  const left = scrollTo.offsetLeft;
  if (window.width <= 768) {
    window.scrollTo({
      top: top,
      left: left,
      behavior: "smooth",
    });
  } else {
    window.scrollTo({
      top: top + 20,
      left: left,
      behavior: "smooth",
    });
  }
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const idx = sectionIds.indexOf(`#${entry.target.id}`);
      // scroll up
      if (entry.boundingClientRect.y < 0) {
        selectedNavIdx = idx + 1;
      } else {
        selectedNavIdx = idx - 1;
      }
      selectNavItem(navItems[selectedNavIdx]);
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

// scroll by user
window.addEventListener("scroll", () => {
  console.log(
    window.scrollY + window.innerHeight + " " + document.body.clientHeight
  );
  if (window.scrollY === 0) {
    selectedNavIdx = 0;
  } else if (
    // posibility of decimal
    Math.round(window.scrollY + window.innerHeight) ===
    document.body.clientHeight
  ) {
    selectedNavIdx = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIdx]);
});
