<template>
  <form class="product-form" @submit.prevent="onSubmit">
    <div class="row">
      <label>Nom</label>
      <input v-model.trim="form.name" required placeholder='Sac à dos 15"' />
    </div>
    <div class="row">
      <label>Catégorie</label>
      <input
        v-model.trim="form.category"
        required
        placeholder="Sac, Accessoire, Housse"
      />
    </div>
    <div class="row">
      <label>Prix (€)</label>
      <input
        type="number"
        step="0.01"
        min="0"
        v-model.number="form.price"
        required
      />
    </div>
    <div class="row flags">
      <label><input type="checkbox" v-model="form.stock" /> En stock</label>
      <label><input type="checkbox" v-model="form.promo" /> Promo</label>
    </div>
    <div class="row">
      <label>Image (URL)</label>
      <input v-model.trim="form.image" placeholder="https://..." />
    </div>
    <div class="row">
      <label>Description</label>
      <textarea
        v-model.trim="form.description"
        rows="3"
        placeholder="Description courte du produit"
      ></textarea>
    </div>

    <p v-if="errors.length" class="errors">
      <span v-for="(e, i) in errors" :key="i">• {{ e }}</span>
    </p>

    <div class="actions">
      <button type="button" class="btn" @click="$emit('cancel')">
        Annuler
      </button>
      <button type="submit" class="btn primary">
        {{ isEdit ? "Enregistrer" : "Ajouter" }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "ProductForm",
  props: {
    product: { type: Object, default: null },
  },
  emits: ["save", "cancel"],
  data() {
    return {
      form: this.product
        ? { ...this.product }
        : {
            name: "",
            category: "",
            price: 0,
            stock: true,
            promo: false,
            image: "",
            description: "",
          },
      errors: [],
    };
  },
  computed: {
    isEdit() {
      return !!(this.product && this.product.id);
    },
  },
  methods: {
    onSubmit() {
      this.errors = [];
      if (!this.form.name) this.errors.push("Le nom est obligatoire");
      if (!this.form.category) this.errors.push("La catégorie est obligatoire");
      if (
        this.form.price === null ||
        this.form.price === undefined ||
        this.form.price < 0
      )
        this.errors.push("Le prix doit être >= 0");
      if (this.errors.length) return;
      const payload = { ...this.form };
      this.$emit("save", payload);
    },
  },
};
</script>

<style scoped>
.product-form {
  display: grid;
  gap: 0.75rem;
  background: var(--bg);
  color: var(--text);
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: var(--shadow-s);
}
.row {
  display: grid;
  gap: 0.25rem;
  text-align: left;
}
label {
  color: var(--text-muted);
  font-size: 0.9rem;
}
input,
textarea {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--primary);
  border-radius: 0.5rem;
  padding: 0.5rem 0.6rem;
  outline: none;
}
.flags {
  grid-auto-flow: column;
  justify-content: start;
  align-items: center;
  gap: 1rem;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
.btn {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--primary);
  border-radius: 999px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
}
.btn.primary {
  background: linear-gradient(45deg, #5b6dff55, #7a38ff55);
}
.errors {
  color: #e35;
  display: grid;
  gap: 0.2rem;
}
</style>
