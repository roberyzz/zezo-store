// ============================================
// ZezoStore — Renderização do catálogo
// Usado em loja.html e categoria.html.
// ============================================

function renderProductCard(product) {
  const categoryInfo = CATEGORIES[product.categoria];
  return `
    <div class="product-card">
      ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
      <div class="product-icon">${categoryInfo.icon}</div>
      <h3>${product.nome}</h3>
      <p class="product-category">${categoryInfo.label}</p>
      <p class="product-price">${formatPrice(product.preco)}</p>
      <button class="btn-add-cart" data-id="${product.id}">Adicionar ao carrinho</button>
    </div>
  `;
}

function renderProductGrid(containerEl, products) {
  if (!containerEl) return;

  if (products.length === 0) {
    containerEl.innerHTML = `<p class="cart-empty">Nenhum produto encontrado nessa categoria.</p>`;
    return;
  }

  containerEl.innerHTML = products.map(renderProductCard).join("");
  attachAddToCartHandlers(containerEl);
}

function attachAddToCartHandlers(scopeEl) {
  scopeEl.querySelectorAll(".btn-add-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart(btn.dataset.id);
      const original = btn.textContent;
      btn.textContent = "Adicionado ✓";
      btn.classList.add("added");
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove("added");
      }, 1200);
    });
  });
}

// ---------- Página Loja (com filtros) ----------
function initLojaPage() {
  const grid = document.querySelector(".product-grid");
  if (!grid || !document.querySelector(".category-filters")) return;

  const filterButtons = document.querySelectorAll(".filter-btn");
  const params = new URLSearchParams(window.location.search);
  const initialCategory = params.get("jogo") || "todos";

  function applyFilter(categoria) {
    filterButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.categoria === categoria);
    });
    renderProductGrid(grid, getProductsByCategory(categoria));
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => applyFilter(btn.dataset.categoria));
  });

  applyFilter(initialCategory);
}

// ---------- Página de Categoria única ----------
function initCategoriaPage() {
  const grid = document.querySelector(".product-grid");
  const titleEl = document.querySelector("[data-categoria-titulo]");
  const titleBadgeEl = document.querySelector("[data-categoria-titulo-badge]");
  const descEl = document.querySelector("[data-categoria-desc]");
  const iconEl = document.querySelector("[data-categoria-icone]");

  if (!grid || document.querySelector(".category-filters")) return;

  const params = new URLSearchParams(window.location.search);
  const categoria = params.get("jogo");
  const info = CATEGORIES[categoria];

  if (!info) {
    grid.innerHTML = `<p class="cart-empty">Categoria não encontrada. <a href="loja.html">Ver todos os produtos</a>.</p>`;
    return;
  }

  if (titleEl) titleEl.textContent = info.label;
  if (titleBadgeEl) titleBadgeEl.textContent = info.label.toUpperCase();
  if (descEl) descEl.textContent = info.desc;
  if (iconEl) iconEl.textContent = info.icon;

  renderProductGrid(grid, getProductsByCategory(categoria));
}

document.addEventListener("DOMContentLoaded", () => {
  initLojaPage();
  initCategoriaPage();
});