# Catalogue Produit (Vue 3)

Application de catalogue pour bagagerie et accessoires IT, avec interface « clear glass » et design responsive.

## Fonctionnalités

- Affichages: cartes, grille, liste (CSS Grid, responsive)
- Filtre par catégorie
- Détails en modal, ajout/édition/suppression avec validations
- Section « Meilleurs produits » sur la page d’accueil
- Thème clair/sombre et fond dégradé multicolore
- Persistance via `localStorage` (produits et préférences UI)

## Persistance

- Produits: sauvegardés sous la clé `catalog:products`.
- Préférences: mode d’affichage sauvegardé sous `catalog:viewMode`.

## Démarrage

```bash
npm install
npm run serve
```

Build production:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Technologies

- Vue 3, Vue Router
- CSS Grid, variables CSS (OKLCH), backdrop-filter
- LocalStorage

## Structure rapide

- `src/components/` — `ProductCard`, `ProductForm`, `BestProducts`, `HelloWorld`
- `src/views/` — `HomeView`, `ProductsView`, `AboutView`
- `src/data/products.js` — données produits + persistance

## Configuration

Voir la documentation Vue CLI: https://cli.vuejs.org/config/
