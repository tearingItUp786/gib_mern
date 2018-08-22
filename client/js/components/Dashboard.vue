<template>
  <div>
    <h1>Dashboard</h1>
    <code>{{ JSON.stringify(products, null, 4) }}</code>
  </div>
</template>

<script>
import { getProducts } from '../helpers/api.js';

export default {
  data() {
    return {
      products: null
    };
  },
  async mounted() {
    try {
      const data = await getProducts();
      this.products = data;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>
