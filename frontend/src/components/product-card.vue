<script>
import { mapActions } from 'vuex'

export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    ...mapActions(['createOrder']),
  },
}
</script>

<template lang="pug">
  .product-card
    h4 {{ product.name }}
    p {{ product.brand }}
    p Price: {{ product.price }}₺
    p Category: {{ product.category }}
    img(:src="require(`@/assets/${product.photo}`)")
    button(@click="createOrder") Add Product

</template>

<style lang="scss">
.product-card {
  border: 1px solid #0f0f0f;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 12px;
  min-height: 220px;

  img {
    width: 100px;
    height: 100px;
  }
}
</style>
