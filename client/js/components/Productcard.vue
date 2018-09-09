<template>
  <div class="flex">
    <img 
      :src="imageUrl" 
      alt="product image"
    >
    <h3>{{ name }}</h3>
    <h4>{{ type }}</h4>
    <h5>{{ oldestBRC }}</h5>
    <h6>{{ quantityLeft }}</h6>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
class ProductCard extends Vue {
  mounted() {
    console.log('product card mounted');
  }
}

export default ProductCard;
</script>
