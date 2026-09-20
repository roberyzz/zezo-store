// ============================================
// ZezoStore — Página Carrinho
// Renderiza os itens, controla quantidade e simula o checkout.
// ============================================

function renderCartItem(item) {
  const product = PRODUCTS.find((p) => p.id === item.id);
  if (!product) return "";

  return `
    <div class="cart-item" data-id="${product.id}">
      <div class="cart-item-info">
        <h3>${product.nome}</h3>
        <p>${CATEGORIES[product.categoria].label}</p>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" data-action="decrease">−</button>
        <span>${item.quantidade}</span>
        <button class="qty-btn" data-action="increase">+</button>
      </div>
      <div class="cart-item-price">${formatPrice(product.preco * item.quantidade)}</div>
      <button class="cart-item-remove" data-action="remove" aria-label="Remover">✕</button>
    </div>
  `;
}

function renderCartPage() {
  const container = document.getElementById("cart-items");
  const subtotalEl = document.getElementById("cart-subtotal");
  const totalEl = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <p>Seu carrinho está vazio.</p>
        <br />
        <a href="loja.html" class="btn-primary">Ver produtos</a>
      </div>
    `;
    if (checkoutBtn) checkoutBtn.disabled = true;
  } else {
    container.innerHTML = cart.map(renderCartItem).join("");
    if (checkoutBtn) checkoutBtn.disabled = false;
    attachCartItemHandlers();
  }

  const total = getCartTotal();
  if (subtotalEl) subtotalEl.textContent = formatPrice(total);
  if (totalEl) totalEl.textContent = formatPrice(total);
}

function attachCartItemHandlers() {
  document.querySelectorAll(".cart-item").forEach((el) => {
    const id = el.dataset.id;
    const cart = getCart();
    const item = cart.find((i) => i.id === id);

    el.querySelector('[data-action="increase"]').addEventListener("click", () => {
      setQuantity(id, item.quantidade + 1);
      renderCartPage();
    });

    el.querySelector('[data-action="decrease"]').addEventListener("click", () => {
      setQuantity(id, item.quantidade - 1);
      renderCartPage();
    });

    el.querySelector('[data-action="remove"]').addEventListener("click", () => {
      removeFromCart(id);
      renderCartPage();
    });
  });
}

// ---------- Checkout (simulado) ----------
function initCheckout() {
  const checkoutBtn = document.getElementById("checkout-btn");
  const modal = document.getElementById("checkout-modal");
  if (!checkoutBtn || !modal) return;

  const stepPayment = document.getElementById("modal-step-payment");
  const stepSuccess = document.getElementById("modal-step-success");
  const paymentMethods = document.querySelectorAll(".payment-method");
  const pixFields = document.getElementById("pix-fields");
  const cardFields = document.getElementById("card-fields");

  checkoutBtn.addEventListener("click", () => {
    if (getCart().length === 0) return;
    modal.classList.add("open");
    stepPayment.style.display = "block";
    stepSuccess.style.display = "none";
  });

  document.getElementById("close-modal-btn").addEventListener("click", () => {
    modal.classList.remove("open");
  });

  document.getElementById("close-success-btn").addEventListener("click", () => {
    modal.classList.remove("open");
    clearCart();
    renderCartPage();
  });

  paymentMethods.forEach((btn) => {
    btn.addEventListener("click", () => {
      paymentMethods.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const method = btn.dataset.method;
      pixFields.style.display = method === "pix" ? "block" : "none";
      cardFields.style.display = method === "cartao" ? "block" : "none";
    });
  });

  document.getElementById("confirm-payment-btn").addEventListener("click", () => {
    // Simulação: qualquer input "aprova" na hora, sem validação real.
    stepPayment.style.display = "none";
    stepSuccess.style.display = "block";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();
  initCheckout();
});