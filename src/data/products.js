// Shared products with localStorage persistence for the catalog and home components
// Using a single array reference so edits in ProductsView reflect here as well.

// Webpack will resolve this asset path via @ alias
const placeholder = require("@/assets/bag-placeholder.svg");

const STORAGE_KEY = "catalog:products";

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

function loadFromStorage() {
  if (typeof window === "undefined" || !window.localStorage) return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  const parsed = safeParse(raw);
  if (!Array.isArray(parsed)) return null;
  // Normalize minimal fields and ensure placeholder fallback
  return parsed.map((p, i) => ({
    id: p.id ?? i + 1,
    name: p.name ?? "Produit",
    category: p.category ?? "Divers",
    price: typeof p.price === "number" ? p.price : 0,
    stock: typeof p.stock === "boolean" ? p.stock : true,
    promo: typeof p.promo === "boolean" ? p.promo : false,
    image: p.image || placeholder,
    description: p.description || "",
  }));
}

export function saveProducts(arr) {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    }
  } catch (e) {
    // ignore quota or privacy mode errors
  }
}

// Fallback seed data (first launch)
const seed = [
  {
    id: 1,
    name: 'Sac à dos 15" Pro',
    category: "Sacs",
    price: 129.9,
    stock: true,
    promo: true,
    image: placeholder,
    description: 'Sac à dos technique pour laptop 15" avec compartiments.',
  },
  {
    id: 2,
    name: 'Housse néoprène 13"',
    category: "Housses",
    price: 24.9,
    stock: true,
    promo: false,
    image: placeholder,
    description: 'Protection légère pour ultraportable 13".',
  },
  {
    id: 3,
    name: "Valise cabine IT",
    category: "Valises",
    price: 99.0,
    stock: false,
    promo: false,
    image: placeholder,
    description: "Valise cabine robuste avec compartiment tech.",
  },
  {
    id: 4,
    name: "Sac bandoulière compact",
    category: "Sacs",
    price: 59.0,
    stock: true,
    promo: false,
    image: placeholder,
    description: "Sac compact pour accessoires et tablette.",
  },
  {
    id: 5,
    name: "Organiseur câbles",
    category: "Accessoires",
    price: 14.9,
    stock: true,
    promo: false,
    image: placeholder,
    description: "Trousse pour câbles et adaptateurs.",
  },
  {
    id: 6,
    name: 'Sac à roulettes 17"',
    category: "Sacs",
    price: 159.0,
    stock: true,
    promo: false,
    image: placeholder,
    description: 'Sac à roulettes pour stations mobiles 17".',
  },
];

// Initialize products from storage or seed
const products = loadFromStorage() || seed;

export default products;

// Optional helper to pick best products (promos first, then by price desc)
export function pickBestProducts(limit = 4) {
  const arr = [...products];
  const promos = arr.filter((p) => p.promo);
  const base = promos.length >= limit ? promos : arr;
  return [...base].sort((a, b) => b.price - a.price).slice(0, limit);
}
