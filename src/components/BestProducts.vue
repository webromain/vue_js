<template>
  <section class="home-section best-products">
    <header class="section-header">
      <h2>Meilleurs produits</h2>
      <router-link class="btn" to="/products">Voir tout</router-link>
    </header>

    <ul class="products cards">
      <li v-for="product in bestProducts" :key="product.id">
        <ProductCard
          :produit="product"
          @details="goToCatalog"
          @edit="goToCatalog"
          @delete="goToCatalog"
        />
      </li>
    </ul>
  </section>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import { pickBestProducts } from "@/data/products";

export default {
  name: "BestProducts",
  components: { ProductCard },
  computed: {
    bestProducts() {
      return pickBestProducts(4);
    },
  },
  methods: {
    goToCatalog() {
      this.$router.push({ name: "products" });
    },
  },
};
</script>

<style scoped>
.home-section {
  display: grid;
  gap: 0.75rem;
  background: var(--glass);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  backdrop-filter: saturate(180%) blur(12px);
  border: 1px solid var(--glass-border);
  color: var(--text);
  border-radius: 0.75rem;
  padding: 1rem;
  margin: 0.5rem;
  box-shadow: var(--shadow-s);
}
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
h2 {
  font-size: 1.25rem;
}
.btn {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--primary);
  border-radius: 999px;
  padding: 0.35rem 0.8rem;
  text-decoration: none;
}
.btn:hover {
  background: #ffffff10;
}

/* Local grid similar to ProductsView "cards" */
.products {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.75rem;
}
.products.cards {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
.products.cards li {
  display: block;
}

/* Ensure cards are vertical and text isn't cut */
.products.cards :deep(.product-card) {
  grid-template-columns: 1fr;
  height: 100%;
}
.products.cards :deep(.product-card .thumb) {
  aspect-ratio: 4 / 3;
}
.products.cards :deep(.product-card .content) {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
.products.cards :deep(.product-card .desc) {
  white-space: normal;
  overflow: visible;
}

@media (max-width: 768px) {
  .products.cards {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
@media (max-width: 480px) {
  .products.cards {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}
</style>
