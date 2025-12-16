# JOURNAL DE BORD - ROMAIN POISSON

- Prise en main de Vue CLI
- Modification du titre en fonction de la page via une fonction du router
-

## Partie 1 — Démarrage

- Ajout d’un logo minimal SVG (src/assets/logo.svg) et intégration dans la navbar `App.vue`.
- Mise en place d’un toggle de thème clair/sombre en liant la classe `light` sur `body` (persistance localStorage).

## Partie 2 — Données dynamiques

- Définition d’un tableau de produits dans `ProductsView.vue` (id, name, category, price, stock, promo, image, description).
- Liste rendue avec `v-for` et composant `ProductCard` réutilisable.
- Ajout des actions: Détails (modal v-if), Modifier (ouvre `ProductForm`), Supprimer (confirmation).
- Filtre par catégorie via `<select>` dynamique (categories calculées).
- Couleurs dynamiques des prix: `price-high` (>100€ rouge), `price-low` (<=100€ vert) via classes conditionnelles.

## Partie 3 — Variantes d’affichage

- Trois variantes: liste, grille (CSS Grid), cartes (layout carte + image).
- Alternatives testées: Flex vs Grid. Choix Grid pour l’auto-placement responsive (`repeat(auto-fill, minmax(...))`).
- Liaison de styles dynamiques simplifiée par `:class` et `:style` (cf. ProductCard/ProductsView).

## Partie 4 — Événements & interactions

- Modal détails avec `v-if` et overlay cliquable (close). `@click.stop` sur le contenu pour démontrer stopPropagation.
- Formulaire d’ajout/édition `ProductForm.vue` avec `v-model`, `@submit.prevent`, validation simple (nom, catégorie, prix>=0).
- Événements inter-composants: `ProductCard` émet `details`, `edit`, `delete` vers `ProductsView`.

## Partie 5 — Styles & personnalisation

- États dynamiques sur la carte: `is-selected`, `is-out` (rupture), `promo` (badge).
- Thème clair/sombre basé sur variables CSS (style.css) + bouton toggle dans `App.vue`.

## Partie 6 — Modularisation

- Création de `ProductCard.vue` (cartes réutilisables) et `ProductForm.vue` (ajout/édition).
- Communication via `props` + `$emit`.

## Idées/Extensions

- Stockage des produits dans `localStorage` ou via un store (Vuex/Pinia) pour persister.
- Système de favoris/panier.
- Import d’images produits depuis un JSON externe.
