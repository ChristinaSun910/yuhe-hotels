const navItems = document.querySelector("#nav__items");
const navLinks = document.querySelectorAll(".nav__item");
const openNavBtn = document.querySelector("#open__navBar");
const closeNavBtn = document.querySelector("#close__navBar");

// navLinks.forEach((link, index) => {
//   link.addEventListener("mouseover",()=>{
//     link.classList.toggle("active");
//     link.stlye.border = "2px solid red";}
//   });

openNavBtn.addEventListener("click", () => {
  navItems.classList.toggle("active");
  navItems.style.display = "flex";
  openNavBtn.style.display = "none";
  closeNavBtn.style.display = "inline-block";
});

const closeNav = () => {
  navItems.style.display = "none";
  closeNavBtn.style.display = "none";
  openNavBtn.style.display = "inline-block";
};
closeNavBtn.addEventListener("click", closeNav);

const siklls = [
  {
    skill: "Data Science",
    rate: 4,
  },
  {
    skill: "Machine Learning",
    rate: 3,
  },
  {
    skill: "Data Analysis",
    rate: 3,
  },
  {
    skill: "MySQL & PostgreSQL",
    rate: 3,
  },
  {
    skill: "Tableau",
    rate: 3,
  },
  {
    skill: "Python",
    rate: 4,
  },
  {
    skill: "Figma",
    rate: 4,
  },

  {
    skill: "HTML & CSS",
    rate: 5,
  },
  {
    skill: "JavaScript",
    rate: 3,
  },
  {
    skill: "Reactjs",
    rate: 4,
  },
];
