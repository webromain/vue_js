<template>
  <section class="about-card">
    <header class="section-header">
      <h1>À propos</h1>
      <router-link class="btn" to="/products">Voir le catalogue</router-link>
    </header>

    <p class="intro">
      Catalogue de bagagerie et accessoires IT réalisé avec Vue 3. L’interface
      met en avant un style « clear glass » sur un fond dégradé multicolore,
      entièrement responsive.
    </p>

    <div class="grid">
      <div>
        <h2>Fonctionnalités</h2>
        <ul>
          <li>Affichages cartes, grille et liste (responsive)</li>
          <li>Filtre par catégorie</li>
          <li>Fiche détail en modal</li>
          <li>Ajout / édition / suppression de produits avec validations</li>
          <li>Section « Meilleurs produits » sur la page d’accueil</li>
          <li>Thème clair/sombre avec effet verre</li>
          <li>Persistance via localStorage (produits et préférences UI)</li>
        </ul>
      </div>
      <div>
        <h2>Technologies</h2>
        <ul>
          <li>Vue 3 + Vue Router</li>
          <li>CSS Grid, variables CSS (OKLCH), backdrop-filter</li>
          <li>LocalStorage pour la persistance</li>
        </ul>
        <p class="muted">Produits chargés : {{ productCount }}</p>
      </div>
    </div>

    <footer class="cta">
      <router-link class="btn" to="/">Accueil</router-link>
      <router-link class="btn" to="/products"
        >Parcourir les produits</router-link
      >
    </footer>
  </section>
</template>

<script>
import products from "@/data/products";

export default {
  name: "AboutView",
  data() {
    return {
      productCount: products.length,
    };
  },
};
</script>

<style scoped>
.about-card {
  display: grid;
  gap: 1rem;
  background: var(--glass);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  backdrop-filter: saturate(180%) blur(12px);
  border: 1px solid var(--glass-border);
  color: var(--text);
  border-radius: 0.75rem;
  padding: 1rem;
  margin: 0.5rem;
  box-shadow: var(--shadow-s);
  text-align: left;
}
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.intro {
  color: var(--text);
}
.muted {
  color: var(--text-muted);
}
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
}
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
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
.cta {
  display: flex;
  gap: 0.5rem;
}
</style>
