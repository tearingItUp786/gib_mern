<template>
  <div>
    <h1>Dashboard</h1>
    <div class="container mx-auto">
      <product-card 
        v-for="product in products" 
        :key="product.id"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getBRCS } from '../helpers/api.js';
import ProductCard from './Productcard.vue';
import { BRC } from '../types/types';

@Component({
  components: {
    'product-card': ProductCard
  }
})
class Dashboard extends Vue {
  products: BRC[] = [];

  async mounted() {
    try {
      const data = await getBRCS();
      this.products = data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default Dashboard;
</script>
