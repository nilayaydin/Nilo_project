<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ProductCard',
  props: ['product'],
  data() {
    return {
      quantity: Number,
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['createOrder', 'fetchSession', 'addToCart', 'likesProduct']),
    async onOrderNow() {
      const user = this.user
      if (!user) {
        alert('you need to log in to order!')
      }
      await this.createOrder({ orderItems: [{ item: this.product._id, quantity: this.quantity }] })

      //- p sonraki sayyafaya gitmek icin $router.push kullan.
      // POSSIBLE IMPROVEMENTS
      // optimistic ui update approach -- you dont wait for respond but update it.
      // We don't need to fetch entire session. I only want to fetch orders again.
      // I need a loading state when user hit the button, it should be disseppared so that they cannot order twice.
      await this.fetchSession()
      alert('order is successfully placed')
    },
    onAddToCart() {
      const user = this.user
      if (!user) {
        alert('you need to log in to order!')
      }

      this.addToCart({ product: this.product, quantity: 1 })
      //- It only increases by one, the quantity should be selected!!
      alert('items are added to the cart')
    },
    async likeProduct() {
      await this.likesProduct({ product: this.product._id })
      await this.fetchSession()
    },
  },
}
</script>

<template lang="pug">
  .product-card(v-if="product")
    div
      router-link(:to="`/products/${product._id}`") {{ product.name }}
    p {{ product.brand }}
    p Price: {{ product.price }}₺
    p Category: {{ product.category }}
    img(:src="require(`@/assets/${product.photo}`)")
    div
      input(v-model="quantity" id="quantity" type="number" placeholder="Quantity" required)
      button(@click="onAddToCart") Add to cart
      button(@click="onOrderNow") Order Now
      button(@click="likeProduct") Like Product


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
    height: 25px;
    width: 90px;
    margin: 10px;
  }
}
</style>
