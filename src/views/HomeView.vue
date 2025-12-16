<template>
  <div class="home">
    <HelloWorld msg="Découvrez nos produits >" />
    <BestProducts />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import BestProducts from "@/components/BestProducts.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    BestProducts,
  },
};
</script>
