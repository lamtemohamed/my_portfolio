document.addEventListener("DOMContentLoaded", function () {
  // Année actuelle dans le footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Menu hamburger
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Fermer le menu mobile quand on clique sur un lien
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Changement de la navbar au scroll
  window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Filtrage des projets
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectsGrid = document.querySelector(".projects-grid");

  // Données des projets
  const projects = [
    {
      title: "Application E-commerce",
      description:
        "Une application ReactJS avec backend Node.js pour un site E-commerce.",
      video: "videos/site_ecommerce.mp4",
      tags: ["ReactJS", "Tailwindcss", "Node.js", "Mysql"],
      category: ["fullstack", "web"],
    },
    {
      title: "Application E-commerce",
      description:
        "Application Flutter avec bakckend Django pour la gestion des ventes, de la clientèlle,employé et analyse sur le flux de vente.",

      video: "videos/fpr2.mp4",
      tags: ["Flutter", "Django", "PostGreSql"],
      category: ["fullstack", "mobile"],
    },
    {
      title: "Application pour la gestion Immobilière",
      description:
        "Application React native avec backend Node.js pour la gestion immobilière. Elle gère le paiement de location, recherche de maison à louer, ajout d'appartement.Elle est encore en phase de développement",
      video: "videos/r1.mp4",
      tags: ["React native", "Node.js", "Mysql"],
      category: ["fullstack", "mobile"],
    },
  ];

  // Afficher les projets
  function displayProjects(filter = "all") {
    projectsGrid.innerHTML = "";

    const filteredProjects =
      filter === "all"
        ? projects
        : projects.filter((project) => project.category.includes(filter));

    filteredProjects.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.className = "project-card";
      projectCard.innerHTML = `
                <div class="project-image">
                    <video controls width="95%" >
                  <source src="${project.video}" type="video/mp4">
                      Votre navigateur ne supporte pas la vidéo HTML5.
                  </video>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.tags
                          .map((tag) => `<span>${tag}</span>`)
                          .join("")}
                    </div>
                    <div class="project-links">
                        <a href="#"><i class="fas fa-external-link-alt"></i> Voir le projet</a>
                        <a href="#"><i class="fab fa-github"></i> Code source</a>
                    </div>
                </div>
            `;
      projectsGrid.appendChild(projectCard);
    });
  }

  // Initialiser l'affichage des projets
  displayProjects();

  // Gestion des boutons de filtrage
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Retirer la classe active de tous les boutons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Ajouter la classe active au bouton cliqué
      this.classList.add("active");
      // Filtrer les projets
      const filter = this.getAttribute("data-filter");
      displayProjects(filter);
    });
  });

  // Animation des barres de compétences
  const skillBars = document.querySelectorAll(".skill-progress");

  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const width = bar.style.width;
      bar.style.width = "0";
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
  }

  // Observer pour animer les compétences quand elles sont visibles
  const skillsSection = document.querySelector(".skills");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBars();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(skillsSection);
});
