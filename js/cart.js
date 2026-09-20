// ============================================
// ZezoStore — Carrinho de compras
// Guardado no localStorage. Usado pela Loja, Categoria e Carrinho.
// ============================================

const CART_KEY = "zezostore_carrinho";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantidade += 1;
  } else {
    cart.push({ id: product.id, quantidade: 1 });
  }

  saveCart(cart);
}

function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
}

function setQuantity(productId, quantidade) {
  const cart = getCart();
  const item = cart.find((i) => i.id === productId);
  if (!item) return;

  if (quantidade <= 0) {
    removeFromCart(productId);
    return;
  }

  item.quantidade = quantidade;
  saveCart(cart);
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => {
    const product = PRODUCTS.find((p) => p.id === item.id);
    return product ? total + product.preco * item.quantidade : total;
  }, 0);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
}

function updateCartCount() {
  const countEl = document.querySelector(".cart-count");
  if (!countEl) return;
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.quantidade, 0);
  countEl.textContent = total;
}

document.addEventListener("DOMContentLoaded", updateCartCount);