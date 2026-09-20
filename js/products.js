// ============================================
// ZezoStore — Catálogo de produtos
// Dados compartilhados entre Loja, Categoria e Carrinho.
// ============================================

const CATEGORIES = {
  robux: { label: "Robux", icon: "🟪", desc: "Moeda oficial do Roblox pra comprar itens, passes e mais." },
  vbucks: { label: "V-Bucks", icon: "🎯", desc: "Moeda do Fortnite pra skins, emotes e passe de batalha." },
  giftcards: { label: "Gift Cards", icon: "🎁", desc: "Cartões digitais pra várias plataformas e lojas de jogos." },
  cs2: { label: "Skins CS2", icon: "🔫", desc: "Skins verificadas pras suas armas favoritas no Counter-Strike 2." },
  freefire: { label: "Free Fire", icon: "💎", desc: "Diamantes pra desbloquear personagens, skins e passes." },
  steam: { label: "Steam", icon: "🕹️", desc: "Créditos de carteira Steam pra comprar qualquer jogo da loja." },
};

const PRODUCTS = [
  { id: "rbx-400", categoria: "robux", nome: "400 Robux", preco: 19.9, badge: null },
  { id: "rbx-800", categoria: "robux", nome: "800 Robux", preco: 34.9, badge: "Popular" },
  { id: "rbx-1700", categoria: "robux", nome: "1700 Robux", preco: 69.9, badge: "Mais vendido" },
  { id: "rbx-4500", categoria: "robux", nome: "4500 Robux", preco: 169.9, badge: null },

  { id: "vbk-1000", categoria: "vbucks", nome: "1.000 V-Bucks", preco: 34.9, badge: null },
  { id: "vbk-2800", categoria: "vbucks", nome: "2.800 V-Bucks", preco: 89.9, badge: "Popular" },
  { id: "vbk-5000", categoria: "vbucks", nome: "5.000 V-Bucks", preco: 149.9, badge: null },

  { id: "gc-steam-50", categoria: "giftcards", nome: "Gift Card Steam R$50", preco: 52.9, badge: null },
  { id: "gc-psn-100", categoria: "giftcards", nome: "Gift Card PSN R$100", preco: 104.9, badge: "Popular" },
  { id: "gc-xbox-80", categoria: "giftcards", nome: "Gift Card Xbox R$80", preco: 83.9, badge: null },

  { id: "cs2-ak", categoria: "cs2", nome: "AK-47 | Redline (FT)", preco: 89.9, badge: "Raro" },
  { id: "cs2-awp", categoria: "cs2", nome: "AWP | Asiimov (FT)", preco: 249.9, badge: "Mais vendido" },
  { id: "cs2-knife", categoria: "cs2", nome: "Faca Karambit | Fade", preco: 899.9, badge: "Raro" },

  { id: "ff-100", categoria: "freefire", nome: "100 Diamantes", preco: 5.9, badge: null },
  { id: "ff-520", categoria: "freefire", nome: "520 Diamantes", preco: 27.9, badge: "Popular" },
  { id: "ff-1080", categoria: "freefire", nome: "1080 Diamantes", preco: 54.9, badge: null },

  { id: "steam-30", categoria: "steam", nome: "Créditos Steam R$30", preco: 31.9, badge: null },
  { id: "steam-60", categoria: "steam", nome: "Créditos Steam R$60", preco: 62.9, badge: "Popular" },
  { id: "steam-120", categoria: "steam", nome: "Créditos Steam R$120", preco: 123.9, badge: null },
];

function formatPrice(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function getProductsByCategory(categoria) {
  if (!categoria || categoria === "todos") return PRODUCTS;
  return PRODUCTS.filter((p) => p.categoria === categoria);
}