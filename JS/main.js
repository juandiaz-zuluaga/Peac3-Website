//Selecting the first slideshow container
//Correction for just one slideshow in the background
const heroSlideshow = document.querySelector(".hero-slideshow");
if (heroSlideshow) {
  const heroSlides = heroSlideshow.querySelectorAll(".hero-slide");
  let currentHeroSlide = 0;

  function nextHeroSlide() {
    heroSlides[currentHeroSlide].classList.remove("active");
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    heroSlides[currentHeroSlide].classList.add("active");
  }

  setInterval(nextHeroSlide, 4000); //Change slide every 5 seconds
}

//Reveal on Scroll
/*function revealOnScroll() {
  const revelas = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;

  revelas.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 100; //Trigger point in px

    if (elementTop < windowHeight - elementVisible) {
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);*/

//Reveal on enter viewpoer and hide when leaving it
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll(".reveal");
  if (!items.length) {
    return;
  }
  //If the user prefers reduced motion, then no aniamtion will be shown
  if (reduce) {
    items.forEach((el) => el.classList.add("active"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active"); //fade in
        } else {
          entry.target.classList.remove("active"); //fade out when leaving viewport
        }
      });
    },
    {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -10px 0px", //start earlier on scroll
    },
  );

  items.forEach((el) => observer.observe(el));

  //if we get to a section via nav bar link, we want to make sure the animation plays
  window.addEventListener("hashchange", () => {
    //force observer to recheck all items
    items.forEach((el) => {
      observer.unobserve(el);
      observer.observe(el);
    });
  });
})();

// Edge-only hover for stack cards
// Activates when mouse enters the narrow edge strip; deactivates when mouse leaves the whole card.
// This prevents the flickering caused by overlapping card bodies triggering :hover simultaneously.
// stack-highlight (NO T IBA A EXTRANAR) is excluded because it is always fully open.
document
  .querySelectorAll(".stack-card:not(.stack-highlight):not(.ver-todas-card)")
  .forEach((card) => {
    const edge = card.querySelector(".card-edge");
    if (!edge) return;

    edge.addEventListener("mouseenter", () => {
      card.classList.add("card-active");
    });

    edge.addEventListener("mouseleave", () => {
      card.classList.remove("card-active");
    });
  });

// Ver Todas Modal
const verTodasCard = document.querySelector(".ver-todas-card");
const modalOverlay = document.getElementById("songsModalOverlay");
const modalClose = document.getElementById("songsModalClose");

if (verTodasCard && modalOverlay) {
  verTodasCard.addEventListener("click", () => {
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  modalClose.addEventListener("click", () => {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  });

  // Close when clicking outside the modal box
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Grid cards inside Ver Todas modal also trigger flip card
  document.querySelectorAll(".songs-grid-card").forEach((card) => {
    card.addEventListener("click", () => {
      const songKey = card.dataset.song;
      if (songKey) {
        openFlipCard(songKey);
      }
    });
  });

  // Close with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modalOverlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// ============================================
// SONG DATA
// ============================================
const songData = {
  "x-si-quiere-repetir": {
    title: "X Si Quiere Repetir",
    date: "19 de Septiembre de 2024",
    cover: "Assets/Images/Covers/X si quiere repetir.jpg",
    description:
      "El primer sencillo de Peac3, una historia de amor que se niega a terminar. Una canción sobre volver, sobre ese ciclo inevitable de regresar a quien ya conoces.",
    production:
      "Producción con bases de reggaetón moderno, influenciada por el sonido urbano latino con toques de soul.",
    spotify: "https://open.spotify.com/track/0jdPSPZPRzzoYXKEb4kpwF",
    youtube: null,
  },
  "casi-algo": {
    title: "CASI ALGO",
    date: "29 de Noviembre de 2024",
    cover: "Assets/Images/Covers/Casi Algo .jpg",
    description:
      "Una reflexión profunda sobre esas conexiones que nunca llegaron a concretarse, pero que dejaron una huella imborrable en el corazón.",
    production:
      "Con una producción más experimental, este tema incorpora elementos de trap y melodías pegajosas que resaltan la emotividad de la letra.",
    spotify: "https://open.spotify.com/track/3mKmbh4T5UA8qTtkUxvmpS",
    youtube: null,
  },
  "sorry-la-neta": {
    title: "SORRY LA NETA",
    date: "6 de Marzo de 2025",
    cover: "Assets/Images/Covers/Sorry la neta.jpg",
    description:
      "Una disculpa sincera convertida en canción. Peac3 muestra su lado más vulnerable, reconociendo los errores con honestidad y corazón.",
    production:
      "Beats suaves y melódicos con influencias del R&B contemporáneo, que envuelven la voz de Peac3 en una atmósfera íntima.",
    spotify: "https://open.spotify.com/track/7K5eS0MsbYHYNEAHOwjUeP",
    youtube: null,
  },
  tamagotchi: {
    title: "TAMAGOTCHI",
    date: "20 de Mayo de 2025",
    cover: "Assets/Images/Covers/Tamagotchi.jpg",
    description:
      "Una metáfora creativa sobre el cuidado en las relaciones. Como un Tamagotchi, el amor necesita atención constante para no desaparecer.",
    production:
      "Fusión de pop urbano con elementos electrónicos y sintetizadores nostálgicos que evocan los años 90.",
    spotify: "https://open.spotify.com/track/147BUMRVdVXgGF0gO5pBGP",
    youtube: "https://youtu.be/XhuCwNt7JwI?si=AMc3H0El9XLP1Aej",
  },
  "so-me-raya": {
    title: "SO ME RAYA",
    date: "8 de Agosto de 2025",
    cover: "Assets/Images/Covers/So me raya.jpg",
    description:
      "Cuando alguien te afecta más de lo que quisieras admitir. Una canción sobre esa persona que logra rayarte el alma sin querer.",
    production:
      "Afrobeat latino con percusiones orgánicas y una línea melódica que se queda en la cabeza.",
    spotify: "https://open.spotify.com/track/13bv8E1FT3ZK8kjGoFK8pb",
    youtube: "https://youtu.be/Ra6ryI6ZXlU?si=b2qP_aXf2xRaoNGW",
  },
  evangeline: {
    title: "EVANGELINE",
    date: "2 de Octubre de 2025",
    cover: "Assets/Images/Covers/Evangeline.jpg",
    description:
      "Una carta de amor dedicada a Evangeline. Peac3 describe con detalle esa sensación de encontrar a alguien que lo cambia todo.",
    production:
      "Soul moderno con guitarras acústicas y producción minimalista que pone la voz al centro de la experiencia.",
    spotify: "https://open.spotify.com/track/0PleqWq9AIj03fSjaKi7Ji",
    youtube: "https://youtu.be/mme0zsV_EWQ?si=5EcvCygvrM_x6N97",
  },
  "no-t-iba-a-extranar": {
    title: "NO T IBA A EXTRAÑAR",
    date: "21 de Noviembre de 2025",
    cover: "Assets/Images/Covers/Evangeline.jpg", // placeholder
    description:
      "La contradicción del desamor: decirte que no ibas a hacer falta, y descubrir que sí. Peac3 en su estado más crudo y honesto.",
    production:
      "Reggaetón con influencias de hip hop y bases profundas que acompañan la intensidad emocional de la letra.",
    spotify: "https://open.spotify.com/track/53fs1kfX1aZTGiKOyqL3Au",
    youtube: "https://youtu.be/YcaVEhO2Wqg?si=XvkFXVBQ812N_YGg",
  },
  nemo: {
    title: "NEMO",
    date: "23 de Abril de 2026",
    cover: "Assets/Images/Covers/NEMO Cover.jpeg", // placeholder
    description:
      "El sencillo más reciente de Peac3. Una exploración de nuevos sonidos y emociones que marca una nueva etapa en su carrera.",
    production:
      "Producción fresca y evolucionada, combinando el ADN sonoro de Peac3 con nuevas texturas y experimentación.",
    spotify: "https://open.spotify.com/track/3WJlrNpfEDrive1jUgnyyw",
    youtube: "https://youtu.be/DMy2xxvNP5k?si=zjH22yzGFO2rSPBs",
  },
};

// ============================================
// FLIP CARD MODAL
// ============================================
const flipOverlay = document.getElementById("flipCardOverlay");
const flipCardInner = document.querySelector(".flip-card-inner");
const flipScene = document.querySelector(".flip-card-scene");
const flipClose = document.getElementById("flipCardClose");

let flipIsAnimating = false;

function openFlipCard(songKey) {
  const song = songData[songKey];
  if (!song || !flipOverlay || flipIsAnimating) return;

  flipIsAnimating = true;

  // Populate front
  document.getElementById("flipFrontImg").src = song.cover;
  document.getElementById("flipFrontImg").alt = song.title;
  document.getElementById("flipFrontTitle").textContent = song.title;
  document.getElementById("flipFrontDate").textContent = song.date;

  // Populate back
  document.getElementById("flipBackImg").src = song.cover;
  document.getElementById("flipBackImg").alt = song.title;
  document.getElementById("flipBackTitle").textContent = song.title;
  document.getElementById("flipBackDate").textContent = song.date;
  document.getElementById("flipBackDescription").textContent = song.description;
  document.getElementById("flipBackProduction").textContent = song.production;

  const spotifyBtn = document.getElementById("flipSpotifyBtn");
  spotifyBtn.href = song.spotify;

  const youtubeBtn = document.getElementById("flipYoutubeBtn");
  if (song.youtube) {
    youtubeBtn.href = song.youtube;
    youtubeBtn.style.display = "inline-flex";
  } else {
    youtubeBtn.style.display = "none";
  }

  // Kill transition temporarily so the reset is INSTANT — no backwards flip visible
  flipCardInner.style.transition = "none";
  flipCardInner.classList.remove("flipped");
  flipScene.classList.remove("expanded");
  void flipCardInner.offsetWidth; // force browser to apply the reset before re-enabling

  // Re-enable transition
  flipCardInner.style.transition = "";

  // Show overlay — card appears small at front
  flipOverlay.classList.add("active");
  document.body.style.overflow = "hidden";

  // Flip + expand together
  setTimeout(() => {
    flipCardInner.classList.add("flipped");
    flipScene.classList.add("expanded");

    // Unlock after animation fully finishes
    setTimeout(() => {
      flipIsAnimating = false;
    }, 800);
  }, 500);
}

function closeFlipCard() {
  flipOverlay.classList.remove("active");
  flipScene.classList.remove("expanded");
  document.body.style.overflow = "";
  flipIsAnimating = false;
}

// Attach click to all stack cards (except ver-todas)
document
  .querySelectorAll(".stack-card:not(.ver-todas-card)")
  .forEach((card) => {
    card.addEventListener("click", () => {
      const songKey = card.dataset.song;
      if (songKey) openFlipCard(songKey);
    });
  });

// Attach click to featured song
const featuredSong = document.querySelector(".featured-song");
if (featuredSong) {
  featuredSong.addEventListener("click", () => {
    const songKey = featuredSong.dataset.song;
    if (songKey) openFlipCard(songKey);
  });
}

// Close button
if (flipClose) {
  flipClose.addEventListener("click", closeFlipCard);
}

// Click outside to close
if (flipOverlay) {
  flipOverlay.addEventListener("click", (e) => {
    if (e.target === flipOverlay) closeFlipCard();
  });
}

// Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeFlipCard();
});

// ============================================
// TEAM DATA
// ============================================
const teamData = {
  manager: {
    name: "Oscar Mejia Duque",
    role: "Manager",
    image: "Assets/Images/Photos/MonoNewPic.jpg",
    paragraph:
      "Conozco a PEAC3 desde que teníamos nueve años. Siempre fuimos grandes amigos y, desde que empezó en la música, supe que tenía algo especial. Lo he visto crecer, esforzarse y nunca rendirse, y eso me inspiró a estar a su lado y apoyarlo en este camino. Con el tiempo, Dios y la vida nos juntaron para trabajar juntos, y hoy en día me siento agradecido de formar parte de su proceso. Creo en su talento, en su disciplina y en su forma de soñar en grande.",
    links: [
      {
        label: "Instagram",
        icon: "fab fa-instagram",
        url: "https://www.instagram.com/monomejia___?igsh=MXBudGQxYXk4a2w5bw==",
      },
      {
        label: "TikTok",
        icon: "fab fa-tiktok",
        url: "https://www.tiktok.com/@monomejia___?_t=ZP-90VK1NU2ZYc&_r=1",
      },
    ],
    email: "contacto.peac3@gmail.com",
  },
  producer: {
    name: "ALED",
    role: "Productor",
    image: "Assets/Images/Photos/Productor.jpg",
    paragraph:
      "Próximamente se agregará la historia de ALED y su conexión con PEAC3.",
    links: [
      {
        label: "Instagram",
        icon: "fab fa-instagram",
        url: "https://www.instagram.com/______aled?igsh=Zmh5YzA3cXZwZWZs",
      },
      {
        label: "TikTok",
        icon: "fab fa-tiktok",
        url: "https://www.tiktok.com/@______aled?_t=ZP-90VKtFjdOYB&_r=1",
      },
      {
        label: "YouTube",
        icon: "fab fa-youtube",
        url: "https://youtube.com/@aledbeats?si=N1hLOmzTwlz9xl2O",
      },
    ],
    email: null,
  },
  accionista: {
    name: "Jaime Solano",
    role: "Accionista",
    image: null,
    paragraph:
      "Próximamente se agregará la historia de Jaime Solano y su conexión con PEAC3.",
    links: [{ label: "Instagram", icon: "fab fa-instagram", url: "#" }],
    email: null,
  },
  filmmaker: {
    name: "Próximamente",
    role: "Filmmaker",
    image: null,
    paragraph:
      "Próximamente se agregará la historia del filmmaker y su conexión con PEAC3.",
    links: [{ label: "Instagram", icon: "fab fa-instagram", url: "#" }],
    email: null,
  },
};

// ============================================
// TEAM OVERLAY LOGIC
// ============================================
const teamOverlay = document.getElementById("teamOverlay");
const teamModalClose = document.getElementById("teamModalClose");

function openTeamModal(memberKey) {
  const member = teamData[memberKey];
  if (!member || !teamOverlay) return;

  // Populate image
  const modalImg = document.getElementById("teamModalImg");
  if (member.image) {
    modalImg.src = member.image;
    modalImg.alt = member.name;
    modalImg.style.display = "block";
    document.querySelector(".team-modal-left").style.display = "block";
  } else {
    document.querySelector(".team-modal-left").style.display = "none";
  }

  document.getElementById("teamModalName").textContent = member.name;
  document.getElementById("teamModalRole").textContent = member.role;
  document.getElementById("teamModalParagraph").textContent = member.paragraph;

  // Build links
  const linksContainer = document.getElementById("teamModalLinks");
  linksContainer.innerHTML = "";

  member.links.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.className = "team-modal-link";
    a.innerHTML = `<i class="${link.icon}"></i> ${link.label}`;
    linksContainer.appendChild(a);
  });

  if (member.email) {
    const email = document.createElement("span");
    email.className = "team-modal-email";
    email.textContent = member.email;
    linksContainer.appendChild(email);
  }

  teamOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeTeamModal() {
  teamOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

document.querySelectorAll(".team-card").forEach((card) => {
  card.addEventListener("click", () => {
    const memberKey = card.dataset.member;
    if (memberKey) openTeamModal(memberKey);
  });
});

if (teamModalClose) {
  teamModalClose.addEventListener("click", closeTeamModal);
}

if (teamOverlay) {
  teamOverlay.addEventListener("click", (e) => {
    if (e.target === teamOverlay) closeTeamModal();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeTeamModal();
});

/**
 *
 * Responsive design for mobile and small screens
 *
 */
//Nav bar gamburger menu
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navOverlay = document.getElementById("navOverlay");

function toggleMenu() {
  if (hamburger) hamburger.classList.toggle("open");
  if (navLinks) navLinks.classList.toggle("open");
  if (navOverlay) navOverlay.classList.toggle("open");
  const isOpen = navLinks && navLinks.classList.contains("open");
  document.body.style.overflow = isOpen ? "hidden" : "";
}

function closeMenu() {
  if (hamburger) hamburger.classList.remove("open");
  if (navLinks) navLinks.classList.remove("open");
  if (navOverlay) navOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

if (hamburger) {
  hamburger.addEventListener("click", toggleMenu);
}

if (navOverlay) {
  navOverlay.addEventListener("click", closeMenu);
}

//Close menu when a nav link is clicked
document.querySelectorAll(".nav-link-item").forEach((link) => {
  link.addEventListener("click", closeMenu);
});
