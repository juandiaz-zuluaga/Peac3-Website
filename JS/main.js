//Selecting the first slideshow container
const slideshow1 = document.getElementById("slideshow1");
const slides1 = slideshow1.querySelectorAll(".slide"); //Get all slides in slideshow1
let currentSlide1 = 0; //Index of the current slide

//Function to show a specific slide in slideshow1
function nextSlide1() {
  slides1[currentSlide1].classList.remove("active"); //Hide current slide
  currentSlide1 = (currentSlide1 + 1) % slides1.length; //Move to the next slide, loop back to the start if at the end
  slides1[currentSlide1].classList.add("active"); //Show the new current slide
}
setInterval(nextSlide1, 1500); //Change slide every 3 seconds
//Selecting the second slideshow container
const slideshow2 = document.getElementById("slideshow2");
const slides2 = slideshow2.querySelectorAll(".slide");
let currentSlide2 = 0; //Index of the current slide

//Function to show a specific slide in slideshow2
function nextSlide2() {
  slides2[currentSlide2].classList.remove("active");
  currentSlide2 = (currentSlide2 + 1) % slides2.length;
  slides2[currentSlide2].classList.add("active");
}
setInterval(nextSlide2, 1600); //Change slide every 3 seconds

//Selecting the third slideshow container
const slideshow3 = document.getElementById("slideshow3");
const slides3 = slideshow3.querySelectorAll(".slide");
let currentSlide3 = 0;

//Function to show a specific slide in slideshow3
function nextSlide3() {
  slides3[currentSlide3].classList.remove("active");
  currentSlide3 = (currentSlide3 + 1) % slides3.length;
  slides3[currentSlide3].classList.add("active");
}
setInterval(nextSlide3, 1700);

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
    }
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
