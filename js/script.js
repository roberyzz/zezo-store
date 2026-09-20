// ZezoStore — script base
// Cuida só do menu mobile. A lógica de carrinho está em cart.js.

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("nav-links--open");
    });
  }
});