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