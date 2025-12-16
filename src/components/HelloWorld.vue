<template>
  <div class="hello">
    <div class="baniere">
      <img alt="Bannière principale" :src="banner" />
      <router-link to="/products"
        ><h1>{{ msg }}</h1></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: { type: String, default: "Découvrez nos produits >" },
  },
  data() {
    return {
      banner: new URL("../assets/baniere.jpg", import.meta.url).href,
    };
  },
};
</script>

<style scoped>
.baniere img {
  display: flex;
  width: 100%;
}

h1 {
  position: absolute;
  margin: -8rem 0 0 2rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary);
  background: var(--bg);
  box-shadow: var(--shadow-s);
  border-radius: var(--border);
}

h1:hover {
  filter: brightness(1.08);
}
</style>
