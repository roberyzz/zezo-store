// ============================================
// ZezoStore — Cursor customizado
// Um ponto + anel que seguem o mouse, e um rastro
// de partículas neon desenhado em canvas.
// Desativado automaticamente em telas de toque.
// ============================================

(() => {
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  if (isTouch) {
    document.body.classList.add("touch-device");
    return;
  }

  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  const canvas = document.getElementById("trail-canvas");
  const ctx = canvas.getContext("2d");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;

    particles.push({
      x: mouseX,
      y: mouseY,
      radius: Math.random() * 2.5 + 1.5,
      life: 1,
      color: Math.random() > 0.5 ? "255, 46, 166" : "147, 51, 234",
    });
  });

  // Anel segue com um leve atraso (efeito suave)
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Cresce o anel sobre elementos clicáveis
  const hoverables = "a, button, .service-option, .slot-btn, input, .product-card";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverables)) {
      ring.classList.add("is-hover");
    }
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverables)) {
      ring.classList.remove("is-hover");
    }
  });

  // Rastro de partículas
  let particles = [];

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * p.life, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.life * 0.6})`;
      ctx.shadowColor = `rgba(${p.color}, ${p.life})`;
      ctx.shadowBlur = 8;
      ctx.fill();
      p.life -= 0.02;
    });

    particles = particles.filter((p) => p.life > 0);

    requestAnimationFrame(drawParticles);
  }
  drawParticles();
})();