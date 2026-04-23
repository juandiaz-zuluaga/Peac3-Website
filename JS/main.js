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
  window.addEventListener("haschange", () => {
    //force observer to recheck all items
    items.forEach((el) => {
      observer.unobserve(el);
      observer.observe(el);
    });
  });
})();
