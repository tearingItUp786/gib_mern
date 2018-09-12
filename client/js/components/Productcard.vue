<template>
  <div class="flex flex-wrap">
    <img 
      :src="product.image" 
      :alt="product.name"
    >
    <div class="contain-flex">
      <h1>{{ product.name }}</h1>
      <h2>{{ product.brc }}</h2>
      <h3>{{ product.volume }}</h3>
      <h4>{{ product.brc }}</h4>
      <h5>{{ product.quantity }}</h5>
      <button>Add One</button>
      <button>Remove One</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ProductCardProps } from '../types/types';

@Component
class ProductCard extends Vue {
  @Prop()
  product!: ProductCardProps;

  mounted() {
    console.log('product card mounted');
    // console.log(this.product);
  }
}

export default ProductCard;
</script>
