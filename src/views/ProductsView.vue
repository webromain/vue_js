<template>
  <section class="catalog">
    <div class="toolbar">
      <div class="left">
        <label>
          Catégorie
          <select v-model="selectedCategory">
            <option value="all">Toutes</option>
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>
        </label>
        <label>
          Affichage
          <select v-model="viewMode">
            <option value="cards">Cartes</option>
            <option value="grid">Grille</option>
            <option value="list">Liste</option>
          </select>
        </label>
      </div>
      <div class="right">
        <button class="btn" @click="openCreate">Ajouter un produit</button>
      </div>
    </div>

    <ul class="products" :class="viewMode">
      <li v-for="product in filteredProducts" :key="product.id">
        <ProductCard
          :produit="product"
          :selected="selectedProduct && selectedProduct.id === product.id"
          @details="openDetail"
          @edit="openEdit"
          @delete="deleteProduct"
        />
      </li>
    </ul>

    <!-- Modal détail produit -->
    <div v-if="selectedProduct" class="modal" @click="closeDetail">
      <div class="modal-content" @click.stop>
        <h3>{{ selectedProduct.name }}</h3>
        <p class="muted">{{ selectedProduct.category }}</p>
        <img
          class="detail-img"
          :src="selectedProduct.image || placeholder"
          :alt="selectedProduct.name"
        />
        <p>{{ selectedProduct.description }}</p>
        <p><strong>Prix:</strong> {{ selectedProduct.price }}€</p>
        <div class="modal-actions">
          <button class="btn" @click.stop="openEdit(selectedProduct)">
            Modifier
          </button>
          <button
            class="btn danger"
            @click.stop="deleteProduct(selectedProduct)"
          >
            Supprimer
          </button>
          <button class="btn" @click="closeDetail">Fermer</button>
        </div>
      </div>
    </div>

    <!-- Modal formulaire produit -->
    <div v-if="showForm" class="modal" @click="closeForm">
      <div class="modal-content" @click.stop>
        <h3>
          {{ editingProduct ? "Modifier le produit" : "Ajouter un produit" }}
        </h3>
        <ProductForm
          :product="editingProduct"
          @save="saveProduct"
          @cancel="closeForm"
        />
      </div>
    </div>
  </section>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";
import ProductForm from "@/components/ProductForm.vue";
import productsData, { saveProducts } from "@/data/products";

export default {
  name: "ProductsView",
  components: {
    ProductCard,
    ProductForm,
  },
  data() {
    return {
      products: productsData,
      selectedCategory: "all",
      viewMode: "cards",
      selectedProduct: null,
      showForm: false,
      editingProduct: null,
      placeholder: require("@/assets/bag-placeholder.svg"),
    };
  },
  mounted() {
    const savedView = localStorage.getItem("catalog:viewMode");
    if (savedView) this.viewMode = savedView;
  },
  watch: {
    viewMode(newVal) {
      localStorage.setItem("catalog:viewMode", newVal);
    },
  },
  computed: {
    categories() {
      const set = new Set(this.products.map((p) => p.category));
      return Array.from(set);
    },
    filteredProducts() {
      if (this.selectedCategory === "all") return this.products;
      return this.products.filter((p) => p.category === this.selectedCategory);
    },
  },
  methods: {
    openDetail(product) {
      this.selectedProduct = product;
    },
    closeDetail() {
      this.selectedProduct = null;
    },
    openCreate() {
      this.editingProduct = null;
      this.showForm = true;
    },
    openEdit(product) {
      this.editingProduct = { ...product };
      this.showForm = true;
    },
    closeForm() {
      this.editingProduct = null;
      this.showForm = false;
    },
    saveProduct(payload) {
      if (payload.id) {
        // edit
        const idx = this.products.findIndex((p) => p.id === payload.id);
        if (idx !== -1) this.products.splice(idx, 1, payload);
      } else {
        // create
        const nextId = this.products.length
          ? Math.max(...this.products.map((p) => p.id)) + 1
          : 1;
        payload.id = nextId;
        if (!payload.image) payload.image = this.placeholder;
        this.products.unshift(payload);
      }
      // persist after create/edit
      saveProducts(this.products);
      this.closeForm();
    },
    deleteProduct(product) {
      if (!product || !confirm(`Supprimer « ${product.name} » ?`)) return;
      const idx = this.products.findIndex((p) => p.id === product.id);
      if (idx !== -1) {
        this.products.splice(idx, 1);
      }
      if (this.selectedProduct && this.selectedProduct.id === product.id) {
        this.selectedProduct = null;
      }
      // persist after delete
      saveProducts(this.products);
    },
  },
};
</script>

<style scoped>
.catalog {
  display: grid;
  gap: 1rem;
  margin: 0.5rem;
}
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: var(--glass);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  backdrop-filter: saturate(180%) blur(12px);
  border: 1px solid var(--glass-border);
  color: var(--text);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  box-shadow: var(--shadow-s);
}
.toolbar .left {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.toolbar .right {
  display: flex;
  align-items: center;
}
.toolbar label {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text);
}
.toolbar select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: var(--glass-strong);
  color: var(--text);
  border: 1px solid var(--primary);
  border-radius: 0.5rem;
  padding: 0.4rem 0.6rem;
}
.toolbar select option {
  color: var(--text);
  background: var(--bg);
}
.btn {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--primary);
  border-radius: 999px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
}
.products {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.75rem;
}
/* "Grille" stricte: cartes à largeur homogène */
.products.grid {
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
}
/* "Cards": grille fluide avec cartes verticales */
.products.cards {
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}
.products.cards li,
.products.grid li {
  display: block;
}
.products.list {
  grid-template-columns: 1fr;
}

/* Modal */
.modal {
  position: fixed;
  inset: 0;
  background: #00000080;
  display: grid;
  place-items: center;
  padding: 1rem;
  z-index: 1000;
}
.modal-content {
  background: var(--glass-strong);
  -webkit-backdrop-filter: saturate(180%) blur(16px);
  backdrop-filter: saturate(180%) blur(16px);
  border: 1px solid var(--glass-border);
  color: var(--text);
  border-radius: 0.75rem;
  padding: 1rem;
  width: min(720px, 100%);
  box-shadow: var(--shadow-s);
  display: grid;
  gap: 0.75rem;
  z-index: 1001;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
.btn.danger {
  border-color: #e35;
  color: #e35;
}
.detail-img {
  width: 100%;
  border-radius: 0.5rem;
  background: var(--bg-dark);
}
.muted {
  color: var(--text-muted);
}

/* Cartes verticales en mode "cards" */
.products.cards .product-card {
  grid-template-columns: 1fr;
  height: 100%;
}
.products.cards .product-card .thumb {
  aspect-ratio: 4 / 3;
}
.products.cards .product-card .content {
  display: grid;
  grid-template-rows: auto 1fr auto;
}

/* Harmonize grid layout to vertical cards to avoid cropping */
.products.grid .product-card {
  grid-template-columns: 1fr;
  height: 100%;
}
.products.grid .product-card .thumb {
  aspect-ratio: 4 / 3;
}
.products.grid .product-card .content {
  display: grid;
  grid-template-rows: auto 1fr auto;
}

/* Breakpoints */
@media (max-width: 1024px) {
  .products.grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  .products.cards {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
}
@media (max-width: 768px) {
  .toolbar {
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  .toolbar .right {
    width: 100%;
    justify-content: flex-end;
  }
  .products.grid,
  .products.cards {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
@media (max-width: 480px) {
  .products.grid,
  .products.cards {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
}
</style>
