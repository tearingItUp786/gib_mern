<template>
  <div>
    <h1>Dashboard</h1>
    <div class="container mx-auto">
      <product-card 
        v-for="product in productCardProps" 
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getBRCS } from '../helpers/api.js';
import ProductCard from './Productcard.vue';
import { BRC, ProductCardProps } from '../types/types';

interface brdReducer {
  [key: string]: ProductCardProps[];
}

@Component({
  components: {
    'product-card': ProductCard
  }
})
class Dashboard extends Vue {
  products: BRC[] = [];

  // Method to map the BRCs to product  props
  // Kept private as it doesn't need to be exposed to the outside world
  private productCardPropMapper(curBRC: BRC): ProductCardProps {
    return {
      _id: curBRC._id,
      name: curBRC.product.name,
      image: curBRC.product.image,
      brc: curBRC.brc,
      dateCode: curBRC.dateCode,
      typeName: curBRC.productType.typeName,
      volume: curBRC.volume,
      quantity: curBRC.quantity
    };
  }
  private oldBrcReducer(accum: brdReducer, curBRC: BRC): any {
    const { productCardPropMapper } = this;
    const { product, productType } = curBRC;
    // if doesn't exist in the accum, add a new array with the current entry
    if (!accum[product.name]) {
      accum[product.name] = [{ ...productCardPropMapper(curBRC) }];
    } else {
      // the current product name exists and we therefore need to check if the current volume exists in here.
      const filteredObjs = accum[product.name].filter(
        curObj =>
          curObj.volume === curBRC.volume &&
          curObj.typeName === curBRC.productType.typeName
      );
      if (filteredObjs.length === 0) {
        accum[product.name] = [
          ...accum[product.name],
          { ...productCardPropMapper(curBRC) }
        ];
      } else {
        // this means that we have an item in here with a volume already
        // we need to compare the dates to see if there is an older one
        if (filteredObjs[0].dateCode > curBRC.dateCode) {
          accum[product.name] = [
            ...accum[product.name].slice(
              0,
              accum[product.name].indexOf(filteredObjs[0])
            ),
            ...accum[product.name].slice(
              accum[product.name].indexOf(filteredObjs[0]) + 1
            ),
            { ...productCardPropMapper(curBRC) }
          ];
        }
      }
    }
    // return the accum
    // default case is that we did not need to add the curb
    return accum;
  }
  // format the BRCS in the products into type
  // compatible with the product card prop.
  get productCardProps(): ProductCardProps[] {
    const { productCardPropMapper, oldBrcReducer } = this;
    const currentProdsCopy = [...this.products];
    const oldestBrcPerProduct = currentProdsCopy.reduce(oldBrcReducer, {});

    const test: ProductCardProps[] = Object['values'](oldestBrcPerProduct);

    const productPropsArray = ([] as ProductCardProps[]).concat(...test);
    return productPropsArray;
  }

  // take the array of brcs and create an array of object to pass to productcard
  // need one for each product + volume combination
  // create an object for each product and have keys for the different
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
