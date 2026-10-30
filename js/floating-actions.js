"use strict";

const backToTop = document.querySelector("[data-back-to-top]");

const updateBackToTop = () => {
    if (!backToTop) {
        return;
    }

    backToTop.hidden = window.scrollY < 500;
};

window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();
