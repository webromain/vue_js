<template>
  <header class="app-header">
    <div class="brand">
      <img class="logo" src="@/assets/logo.png" alt="Bagagerie IT" />
      <span>Bagagerie IT</span>
    </div>
    <nav class="main-nav">
      <router-link to="/">Accueil</router-link>
      <router-link to="/products">Catalogue</router-link>
      <router-link to="/about">À propos</router-link>
    </nav>
    <button class="theme-toggle" @click="toggleTheme">
      {{ isLight ? "Thème sombre" : "Thème clair" }}
    </button>
  </header>

  <router-view />

  <footer class="app-footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <img class="logo" src="@/assets/logo.svg" alt="Bagagerie IT" />
        <p class="tagline">
          Bagagerie et accessoires IT durables, pensés pour le quotidien
          numérique.
        </p>
      </div>
      <nav class="footer-nav">
        <h4>Navigation</h4>
        <ul>
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/products">Catalogue</router-link></li>
          <li><router-link to="/about">À propos</router-link></li>
        </ul>
      </nav>
      <div class="footer-cats">
        <h4>Catégories</h4>
        <ul>
          <li><a href="#">Sacs</a></li>
          <li><a href="#">Housses</a></li>
          <li><a href="#">Valises</a></li>
          <li><a href="#">Accessoires</a></li>
        </ul>
      </div>
      <div class="footer-news">
        <h4>Newsletter</h4>
        <p class="muted">Promos et nouveautés, une fois par mois.</p>
        <form class="newsletter" @submit.prevent>
          <input type="email" placeholder="Votre email" aria-label="Email" />
          <button type="submit">S’abonner</button>
        </form>
      </div>
    </div>
    <div class="footer-bottom">
      <p>
        © {{ new Date().getFullYear() }} Bagagerie IT — Tous droits réservés
      </p>
      <div class="legal">
        <a href="#">Mentions légales</a>
        <span>•</span>
        <a href="#">Confidentialité</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isLight: false,
    };
  },
  mounted() {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      document.body.classList.add("light");
      this.isLight = true;
    }
  },
  methods: {
    toggleTheme() {
      this.isLight = !this.isLight;
      document.body.classList.toggle("light", this.isLight);
      localStorage.setItem("theme", this.isLight ? "light" : "dark");
    },
  },
};
</script>

<style>
:root {
  /*COLORS*/
  --primary: oklch(60.025% 0.1905 263.099);
  --primary-dark: oklch(33.227% 0.11516 262.695);
  /*BACKGROUND-COLORS*/
  --bg-dark: oklch(0.1 0 264);
  --bg: oklch(0.2 0 264);
  --bg-lght: oklch(0.3 0 264);
  /* GLASS (dark default) */
  --glass: rgba(255, 255, 255, 0.06);
  --glass-strong: rgba(255, 255, 255, 0.12);
  --glass-border: rgba(255, 255, 255, 0.12);
  /* Ambient background gradient (dark) */
  --bg-gradient: radial-gradient(
      1000px 600px at 10% 10%,
      rgba(99, 102, 241, 0.2),
      transparent 45%
    ),
    radial-gradient(
      900px 600px at 85% 0%,
      rgba(244, 63, 94, 0.16),
      transparent 45%
    ),
    radial-gradient(
      800px 600px at 0% 85%,
      rgba(34, 197, 94, 0.14),
      transparent 45%
    ),
    linear-gradient(180deg, #0b1020 0%, #0a0e1a 60%, #0b1020 100%);
  /*TEXT-COLORS*/
  --text: oklch(0.96 0 264);
  --text-muted: oklch(0.76 0 264);
  /*SHADOWS-COLORS*/
  --box-shadow: 2px 4px 12px 0 rgba(0, 0, 0, 0.08);
  --shadow-s: inset 0 1px 2px #ffffff30, 0 1px 2px #00000030,
    0 2px 4px #00000015;
  --border: 1rem;
}

body.light {
  /*BACKGROUND-COLORS*/
  --bg-dark: oklch(0.92 0 264);
  --bg: oklch(0.96 0 264);
  --bg-light: oklch(1 0 264);
  /* GLASS (light) */
  --glass: rgba(15, 23, 42, 0.06);
  --glass-strong: rgba(15, 23, 42, 0.12);
  --glass-border: rgba(15, 23, 42, 0.15);
  /* Ambient background gradient (light) */
  --bg-gradient: radial-gradient(
      1000px 600px at 10% 10%,
      rgba(99, 102, 241, 0.18),
      transparent 45%
    ),
    radial-gradient(
      900px 600px at 85% 0%,
      rgba(244, 63, 94, 0.16),
      transparent 45%
    ),
    radial-gradient(
      800px 600px at 0% 85%,
      rgba(34, 197, 94, 0.12),
      transparent 45%
    ),
    linear-gradient(180deg, #f6f7fb 0%, #f8fafc 60%, #f6f7fb 100%);
  /*BACKGROUND-COLORS*/
  --text: oklch(0.15 0 264);
  --text-muted: oklch(0.4 0 264);
}

*,
::before,
::after {
  margin: 0;
  padding: 0;
}

body {
  background: var(--bg-gradient);
  background-attachment: fixed;
  overflow-x: hidden;
}

.app-header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
  background: var(--glass);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  backdrop-filter: saturate(180%) blur(12px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-s);
  border-radius: var(--border);
  margin: 0.5rem;
  padding: 0.75rem 1rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo {
  height: 24px;
}

.brand-name {
  font-weight: 700;
  color: var(--text);
}

.main-nav {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
}

.theme-toggle {
  color: var(--text);
  background: transparent;
  border: 1px solid var(--primary);
  border-radius: 999px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
}

#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text);
}

.main-nav a {
  display: flex;
  justify-content: center;
}

.main-nav a {
  font-weight: normal;
  color: var(--text);
  text-decoration: none;
}

.main-nav a.router-link-exact-active {
  color: var(--primary);
}

.app-footer {
  color: var(--text);
  background: var(--glass);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
  backdrop-filter: saturate(180%) blur(12px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-s);
  border-radius: var(--border);
  margin: 0.5rem;
  padding: 1.5rem 1rem;
}
.app-footer a {
  color: var(--text);
  text-decoration: none;
}
.app-footer a:hover {
  color: var(--primary);
}
.app-footer .muted {
  color: var(--text-muted);
}
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 1.25rem;
  align-items: start;
}
.footer-brand .logo {
  height: 24px;
  margin-bottom: 0.5rem;
}
.footer-nav ul,
.footer-cats ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.4rem;
}
.footer-news .newsletter {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.footer-news input {
  flex: 1;
  background: transparent;
  color: var(--text);
  border: 1px solid var(--primary);
  border-radius: 0.5rem;
  padding: 0.5rem 0.6rem;
}
.footer-news button {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--primary);
  border-radius: 999px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
}
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  border-top: 1px solid #ffffff10;
  margin-top: 1.25rem;
  padding-top: 1rem;
  color: var(--text-muted);
}
.footer-bottom .legal {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 600px) {
  .app-header {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    text-align: left;
  }
  .main-nav {
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  .footer-grid {
    grid-template-columns: 1fr;
  }
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
