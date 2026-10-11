window.addEventListener("pageshow", () => { 
    window.scrollTo({ top: 0, behavior: "instant" });
});

const sections = document.querySelectorAll(".home, .sections");
const buttons = document.querySelectorAll(".btns");

function updateActiveButton() {
    const probe = window.scrollY + window.innerHeight / 2;
    let currentSection = "";

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (probe >= top && probe < top + height) {
            currentSection = section.id;
        }
    });

    buttons.forEach(button => {
        button.classList.toggle(
            "active",
            button.getAttribute("href") === `#${currentSection}`
        );
    });
}

window.addEventListener("scroll", updateActiveButton);
window.addEventListener("resize", updateActiveButton); 
updateActiveButton();                                   

const planetLightbox = document.getElementById("planetLightbox");

if (planetLightbox) {
    const lightboxTitle = document.getElementById("lightboxTitle");
    const lightboxDescription = document.getElementById("lightboxDescription");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeButton = planetLightbox.querySelector(".lightbox-close");
    let lastOpenedCard;

    function openPlanetLightbox(card) {
        lastOpenedCard = card;
        lightboxTitle.textContent = card.dataset.name;
        lightboxDescription.textContent = card.dataset.description;

        const image = card.querySelector(".planet-image img");
        lightboxImage.replaceChildren();

        if (image) {
            lightboxImage.append(image.cloneNode(true));
        } else {
            const hint = document.createElement("span");
            hint.className = "image-hint";
            hint.textContent = `Add ${card.dataset.name}'s image in the card above`;
            lightboxImage.append(hint);
        }

        planetLightbox.classList.add("is-open");
        planetLightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("lightbox-active");
        closeButton.focus();
    }

    function closePlanetLightbox() {
        if (!planetLightbox.classList.contains("is-open")) return;

        planetLightbox.classList.remove("is-open");
        planetLightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("lightbox-active");
        lastOpenedCard?.focus();
    }

    document.querySelectorAll(".planet-card").forEach(card => {
        card.addEventListener("click", () => openPlanetLightbox(card));
    });

    closeButton.addEventListener("click", closePlanetLightbox);

    planetLightbox.addEventListener("click", event => {
        if (event.target === planetLightbox) closePlanetLightbox();
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closePlanetLightbox();
    });
}
