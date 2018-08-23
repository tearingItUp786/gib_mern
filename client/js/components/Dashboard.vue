<template>
  <div>
    <h1>Dashboard</h1>
    <div class="container mx-auto">
      <productcard v-for="product in products" :key="product.id" :name="product.name" :image-url="product.image">
      </productcard>
    </div>
  </div>
</template>

<script>
/* @flow */
import { getProducts } from '../helpers/api.js';
import Productcard from './Productcard.vue';

export default {
  data() {
    return {
      products: null
    };
  },
  components: {
    Productcard
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
