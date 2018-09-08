<template>
  <div>
    <h1>Dashboard</h1>
    <div class="container mx-auto">
      {{ productCardData }}
    </div>
  </div>
</template>

<script>
// @flow

import { getBRCS } from '../helpers/api.js';
import Productcard from './Productcard.vue';

function formatDataForProductcard(brc, productNameArray = []) {
  const copyOfProductNameArray = [...productNameArray];
  const itemToAdd = {
    id: brc._id,
    productName: brc.productName,
    productType: brc.productType,
    brc: brc.brc,
    volume: brc.volume,
    dateCode: brc.dateCode,
    quantity: brc.quantity
  };

  copyOfProductNameArray.push(itemToAdd);
  return copyOfProductNameArray;
}

function getOnlyTheOldestBrcs(accum, currBrc, index, origArray) {
  // this means that the current product isn't in the accum yet so we can add it with no problem
  const { product } = currBrc;
  if (!accum.hasOwnProperty(product.name)) {
    accum[product.name] = formatDataForProductcard(currBrc);
  } else {
    // if we hit this block, this means that the product does exist in this and we need to see if it has the oldest date code.
    // while the api returns the stuff in the right order this inversion of control feels wrong to me
    // hence us sorting it ourselves here.
    const itemInOrigWithSameVolume = accum[product.name].find(elem => {
      return elem.volume === currBrc.volume;
    });
    console.log(itemInOrigWithSameVolume);
    if (itemInOrigWithSameVolume) {
      if (itemInOrigWithSameVolume.dateCode > currBrc.dateCode) {
        accum[product.name] = formatDataForProductcard(
          currBrc,
          accum[product.name]
        );
      }
    } else {
      console.log('in the else');
      console.log(accum[product.name]);
      accum[product.name] = formatDataForProductcard(
        currBrc,
        accum[product.name]
      );
    }
  }
  return accum;
}

export default {
  data() {
    return {
      products: [{ product: '' }]
    };
  },
  components: {
    Productcard
  },
  async mounted() {
    try {
      const data = await getBRCS();
      this.products = data;
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    productCardData: function() {
      // get the product with the oldest date code
      // send that in as a prop to the product-card.
      const { products } = this;
      // reduce the array of products into just the ids of the oldest ones.
      const oldestProducts = products.reduce(getOnlyTheOldestBrcs, {});

      return oldestProducts;
    }
  }
};
</script>
