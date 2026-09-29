/* ================================================== CHRISTOPHER 2.0 SCRIPT ================================================== */

/* ========================= MENU MOBILE ========================= */
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", false);
    });
  });
}

/* ========================= FILTRES GALERIE ========================= */
const filterButtons = document.querySelectorAll(".gallery-filters button");
const galleryItems = document.querySelectorAll(".gallery figure");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    galleryItems.forEach((item) => {
      item.hidden = filter !== "all" && item.dataset.category !== filter;
    });
  });
});

/* ========================= FORMULAIRES ========================= */
/* Pas encore de serveur : la demande est ouverte dans la messagerie du visiteur. */
document.querySelectorAll(".contact-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const lines = [];
    form.querySelectorAll("input, select, textarea").forEach((field) => {
      if (!field.value) return;
      const label = field.dataset.label || field.placeholder || field.name;
      lines.push(`${label} : ${field.value}`);
    });

    const subject =
      form.querySelector("[name=objet]")?.value || "Demande depuis le site";
    window.location.href =
      "mailto:christopher8@gmail.com" +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(lines.join("\n"))}`;
  });
});

/* ========================= PRÉ-REMPLISSAGE RÉSERVATION ========================= */
/* contact.html?maison=villa-christopher ou ?type=restaurant */
const params = new URLSearchParams(window.location.search);

const houseOption = document.querySelector(
  `select[name=maison] option[data-id="${params.get("maison")}"]`,
);
if (houseOption) houseOption.selected = true;

const typeOption = document.querySelector(
  `select[name=objet] option[data-type="${params.get("type")}"]`,
);
if (typeOption) typeOption.selected = true;
