"use strict";

document.querySelectorAll("[data-project-gallery]").forEach((gallery) => {
    const track = gallery.querySelector(".project-track");
    const cards = Array.from(gallery.querySelectorAll("[data-project-card]"));
    const previousButton = gallery.querySelector("[data-project-previous]");
    const nextButton = gallery.querySelector("[data-project-next]");
    const counter = gallery.querySelector(".project-counter");

    if (!track || cards.length === 0 || !previousButton || !nextButton || !counter) {
        return;
    }

    let currentIndex = 0;
    let animationFrame = null;

    const getMetrics = () => {
        const cardWidth = cards[0].getBoundingClientRect().width;
        const styles = window.getComputedStyle(track);
        const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
        const step = cardWidth + gap;
        const visibleCards = Math.max(1, Math.round((track.clientWidth + gap) / step));
        const maxIndex = Math.max(0, cards.length - visibleCards);

        return { step, visibleCards, maxIndex };
    };

    const updateGallery = () => {
        const { step, visibleCards, maxIndex } = getMetrics();
        currentIndex = Math.min(maxIndex, Math.max(0, Math.round(track.scrollLeft / step)));

        const first = String(currentIndex + 1).padStart(2, "0");
        const last = String(Math.min(cards.length, currentIndex + visibleCards)).padStart(2, "0");
        const total = String(cards.length).padStart(2, "0");

        counter.textContent = first === last ? `${first} / ${total}` : `${first}—${last} / ${total}`;
        previousButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === maxIndex;
    };

    const goTo = (index) => {
        const { step, maxIndex } = getMetrics();
        const targetIndex = Math.min(maxIndex, Math.max(0, index));

        track.scrollTo({ left: targetIndex * step, behavior: "smooth" });
    };

    previousButton.addEventListener("click", () => goTo(currentIndex - 1));
    nextButton.addEventListener("click", () => goTo(currentIndex + 1));

    track.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
            return;
        }

        event.preventDefault();
        goTo(currentIndex + (event.key === "ArrowRight" ? 1 : -1));
    });

    track.addEventListener("scroll", () => {
        if (animationFrame) {
            window.cancelAnimationFrame(animationFrame);
        }

        animationFrame = window.requestAnimationFrame(updateGallery);
    }, { passive: true });

    window.addEventListener("resize", updateGallery);
    updateGallery();
});
