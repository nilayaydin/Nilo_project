<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ProductCard',
  props: ['product'],
  data() {
    return {
      quantity: 1,
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['createOrder']),
    async onOrderNow() {
      const user = this.user
      if (!user) {
        alert('you need to log in to order!')
      }
      await this.createOrder({ orderItems: [{ item: this.product._id, quantity: this.quantity }] })
      alert('order is successfully placed')
    },
    onAddToCart() {
      return alert('cart is coming soon')
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
    input(v-model="quantity" id="quantity" type="number" placeholder="quantity" required)
    button(@click="onAddToCart") Add to cart
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
  input {
    height: 50px;
    width: 50px;
  }
}
</style>
