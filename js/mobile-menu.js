"use strict";

const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("#main-nav");

const closeMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    mobileMenu.classList.remove("is-open");
};

menuToggle?.addEventListener("click", () => {
    const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    menuToggle.setAttribute("aria-label", willOpen ? "Cerrar menú" : "Abrir menú");
    mobileMenu?.classList.toggle("is-open", willOpen);
});

mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("click", (event) => {
    if (!mobileMenu?.classList.contains("is-open")) return;
    if (mobileMenu.contains(event.target) || menuToggle?.contains(event.target)) return;
    closeMenu();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
        menuToggle?.focus();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) closeMenu();
});
