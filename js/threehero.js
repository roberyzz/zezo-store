// ============================================
// ZezoStore — Hero 3D
// Cards de "vidro" flutuando em 3D atrás do texto do hero,
// reagindo suavemente ao movimento do mouse (parallax).
// Usa Three.js (carregado via CDN antes deste script).
// ============================================

(() => {
  const container = document.getElementById("three-hero");
  if (!container || typeof THREE === "undefined") return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const isSmallScreen = window.innerWidth < 720;

  // ---------- Cena base ----------
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 9);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Luzes: uma roxa e uma magenta, pra combinar com a paleta
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));

  const purpleLight = new THREE.PointLight(0x9333ea, 3.5, 20);
  purpleLight.position.set(-4, 3, 4);
  scene.add(purpleLight);

  const magentaLight = new THREE.PointLight(0xff2ea6, 3.5, 20);
  magentaLight.position.set(4, -2, 3);
  scene.add(magentaLight);

  // ---------- Textura de cada card (desenhada em canvas) ----------
  function createCardTexture(label, colorHex) {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    const radius = 60;
    const w = canvas.width;
    const h = canvas.height;

    // fundo com cantos arredondados + leve gradiente
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.arcTo(w, 0, w, h, radius);
    ctx.arcTo(w, h, 0, h, radius);
    ctx.arcTo(0, h, 0, 0, radius);
    ctx.arcTo(0, 0, w, 0, radius);
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, 0, w, h);
    gradient.addColorStop(0, "rgba(255,255,255,0.10)");
    gradient.addColorStop(1, "rgba(255,255,255,0.02)");
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.lineWidth = 6;
    ctx.strokeStyle = colorHex;
    ctx.stroke();

    // label
    ctx.fillStyle = "#f5f3ff";
    ctx.font = "bold 72px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, w / 2, h / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  const cardsData = [
    { label: "ROBUX", color: "#c084fc", pos: [-3.4, 1.4, -1] },
    { label: "V-BUCKS", color: "#ff7ac4", pos: [3.2, -0.6, 0.5] },
    { label: "CS2", color: "#9333ea", pos: [-2.4, -1.8, 1] },
    { label: "STEAM", color: "#ff2ea6", pos: [2.6, 2, -0.5] },
  ];

  const cards = cardsData.map((data) => {
    const geometry = new THREE.PlaneGeometry(2.1, 2.1);
    const texture = createCardTexture(data.label, data.color);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      roughness: 0.35,
      metalness: 0.2,
      emissive: new THREE.Color(data.color),
      emissiveIntensity: 0.12,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...data.pos);
    mesh.rotation.y = (Math.random() - 0.5) * 0.6;
    mesh.rotation.x = (Math.random() - 0.5) * 0.3;
    mesh.userData.floatOffset = Math.random() * Math.PI * 2;
    mesh.userData.floatSpeed = 0.6 + Math.random() * 0.4;
    scene.add(mesh);
    return mesh;
  });

  const group = new THREE.Group();
  cards.forEach((card) => {
    scene.remove(card);
    group.add(card);
  });
  scene.add(group);

  // ---------- Parallax pelo mouse ----------
  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;

  function handlePointerMove(clientX, clientY) {
    const rect = container.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    targetRotY = x * 0.5;
    targetRotX = -y * 0.3;
  }

  window.addEventListener("mousemove", (e) => handlePointerMove(e.clientX, e.clientY));

  // ---------- Loop de animação ----------
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // suaviza a rotação do grupo em direção ao alvo (parallax)
    currentRotX += (targetRotX - currentRotX) * 0.04;
    currentRotY += (targetRotY - currentRotY) * 0.04;
    group.rotation.x = currentRotX;
    group.rotation.y = currentRotY;

    // flutuação individual de cada card
    cards.forEach((card) => {
      card.position.y += Math.sin(t * card.userData.floatSpeed + card.userData.floatOffset) * 0.0025;
      card.rotation.z = Math.sin(t * 0.3 + card.userData.floatOffset) * 0.05;
    });

    renderer.render(scene, camera);
  }

  if (!isSmallScreen) {
    animate();
  } else {
    // Em telas pequenas, renderiza só um frame estático (economiza bateria/CPU)
    renderer.render(scene, camera);
  }

  // ---------- Resize ----------
  window.addEventListener("resize", () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
})();