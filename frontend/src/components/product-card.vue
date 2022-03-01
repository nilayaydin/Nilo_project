<script>
import { mapActions } from 'vuex'

export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    ...mapActions(['createOrder']),
    async onOrderNow() {
      await this.createOrder({ orderItems: [{ item: this.product._id, quantity: 1 }] })
      alert('order is successfully placed')
    },
    onAddToCard() {
      alert('card is coming soon')
    },
  },
}
</script>

// create input element, we type number in here. Then I would use v-model to make it interactive.

<template lang="pug">
  .product-card
    h4 {{ product.name }}
    p {{ product.brand }}
    p Price: {{ product.price }}₺
    p Category: {{ product.category }}
    img(:src="require(`@/assets/${product.photo}`)")
    button(@click="onAddToCard") Add to card
    button(@click="onOrderNow") Order Now

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
