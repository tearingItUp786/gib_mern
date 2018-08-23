<template>
  <div class="flex">
    <img :src="imageUrl" alt="product image">
    <h3>{{name}}</h3>
    <h4>{{type}}</h4>
  </div>
</template>
<script>
export default {
  props: ['name', 'type', 'imageUrl']
};
</script>
