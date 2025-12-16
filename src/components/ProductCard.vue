<template>
  <article
    class="product-card"
    :class="cardClasses"
    @click="$emit('details', produit)"
  >
    <div class="thumb">
      <img :src="produit.image || placeholder" :alt="produit.name" />
      <span v-if="produit.promo" class="badge promo">Promo</span>
      <span v-if="!produit.stock" class="badge out">Rupture</span>
    </div>
    <div class="content">
      <header class="header">
        <h3 class="name">{{ produit.name }}</h3>
        <span class="category">{{ produit.category }}</span>
      </header>
      <p class="desc">{{ produit.description }}</p>
      <div class="meta">
        <span class="price" :class="priceClass">{{ produit.price }}€</span>
        <div class="actions">
          <button class="btn" @click.stop="$emit('details', produit)">
            Détails
          </button>
          <button class="btn" @click.stop="$emit('edit', produit)">
            Modifier
          </button>
          <button class="btn danger" @click.stop="$emit('delete', produit)">
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    produit: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["details", "edit", "delete"],
  data() {
    return {
      placeholder: require("@/assets/bag-placeholder.svg"),
    };
  },
  computed: {
    priceClass() {
      return this.produit.price > 100 ? "price-high" : "price-low";
    },
    cardClasses() {
      return {
        "is-selected": this.selected,
        "is-out": !this.produit.stock,
        "is-promo": this.produit.promo,
      };
    },
  },
};
</script>

<style scoped>
.product-card {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 1rem;
  background: var(--glass);
  -webkit-backdrop-filter: saturate(180%) blur(10px);
  backdrop-filter: saturate(180%) blur(10px);
  border: 1px solid var(--glass-border);
  color: var(--text);
  border-radius: 0.75rem;
  box-shadow: var(--shadow-s);
  overflow: hidden;
}
.product-card:hover {
  transform: translateY(-1px);
  transition: transform 0.15s ease;
}
.product-card.is-selected {
  outline: 2px solid var(--primary);
}
.product-card.is-out {
  opacity: 0.7;
}
.product-card .thumb {
  position: relative;
  background: var(--bg-dark);
}
.product-card img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.badge {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  box-shadow: var(--shadow-s);
}
.badge.promo {
  background: var(--primary);
  color: white;
}
.badge.out {
  background: #a00;
  color: white;
  left: auto;
  right: 8px;
}
.content {
  padding: 0.75rem 1rem 1rem;
  display: grid;
  gap: 0.5rem;
}
.header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
}
.name {
  font-size: 1rem;
  font-weight: 700;
}
.category {
  color: var(--text-muted);
  font-size: 0.85rem;
}
.desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  min-height: 2.2em;
}
.meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.price {
  font-weight: 700;
}
.price-high {
  color: #e35;
}
.price-low {
  color: #4cae50;
}
.actions {
  display: flex;
  gap: 0.5rem;
}
.btn {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--primary);
  border-radius: 999px;
  padding: 0.25rem 0.6rem;
  cursor: pointer;
}
.btn:hover {
  background: #ffffff10;
}
.btn.danger {
  border-color: #e35;
  color: #e35;
}

@media (max-width: 680px) {
  .product-card {
    grid-template-columns: 1fr;
  }
}
</style>
