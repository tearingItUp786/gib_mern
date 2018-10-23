<template>
  <div class="product-card">
    <img 
      :src="product.image" 
      :alt="product.name"
    >
    <div class="product-card__info">
      <div class="product-card__info--title-container"> 
        <h1 class="product-card__info--title">{{ product.name }}</h1>
        <h3 class="product-card__info--sub-title">{{ product.volume }}</h3>
      </div>
      <div class="product-card__info--sub-info">
        <p class="font-bold mb-1">BRC: #<span class="font-normal">{{ product.brc }}</span></p>
        <p class="font-bold">Quantity Left: <span class="font-normal">{{ product.quantity }}</span></p>
      </div>
      <div class="product-card__button-container">
        <button class="product-card__button-container--button">+</button>
        <button class="product-card__button-container--button">-</button>
      </div>
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

<style lang="css">
@tailwind preflight;

.product-card {
  @apply flex flex-wrap mb-8 bg-blue text-white;
  box-shadow: 0 2px 30px rgba(0,0,0,.175);
  overflow: hidden;
  border-radius: 10px;
}

.product-card:last-child {
  margin-bottom: 0;
}

.product-card__info {
  @apply flex-1 p-10 relative;
}

.product-card__info--title-container {
  @apply pb-4;
  border-bottom: solid 1px white;
}

.product-card__info--title {
  @apply mb-1;
}

.product-card__info--sub-title {
  @apply font-normal;
}

.product-card__info--sub-info {
  @apply mt-4;
}

.product-card__button-container {
  position: absolute;
  top: 0;
  right: 2rem;
}

.product-card__button-container--button {
  @apply p-4;
  color: white;
}

.product-card__button-container--button:first-child {
  margin-right: 10px;
}

@tailwind utilities;
</style>
