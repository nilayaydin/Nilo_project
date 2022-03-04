<script>
// Is this working?
import { mapActions, mapState } from 'vuex'

export default {
  name: 'UserCard',
  props: ['user'],
  data() {
    return {
      address: null,
    }
  },
  methods: {
    ...mapActions(['addAddress', 'fetchSession']),
    async createAddress() {
      await this.addAddress({ address: this.address })
      await this.fetchSession()
      alert('Address is successfully added!')
    },
  },
  computed: {
    ...mapState(['cart']),
  },
}
</script>

<template lang="pug">
.box
  h1 {{ user.name }} ({{ user.age }})
  .infoaddresses(v-for="address in user.addresses")
  p Address: {{ user.addresses.map(address => address).join(', ') || 'This user has no adress.' }}
  h4 Orders: {{ user.orders.length }}

  .order-info(v-for="order in user.orders")
    ul(v-for="orderItem in order.orderItems")
      li {{ orderItem.item.name }}
       h6 Quantity: {{ orderItem.quantity }}
       h6 Total Amount: {{ order.amount }}
  .liked-products
    h4 Liked Products:
    li(v-for="product in user.likesProduct") {{ product.name }} ( {{ product.brand }} )

  .addAddress
    label(for="addresses")
    h4 Create Address
    input(v-model="address", id="address", type="text", placeholder="type here")
    button(@click="createAddress") Submit

  .cart
    h4 Cart:
    div(v-for="orderItem in cart.orderItems")
      p {{ orderItem.item.name}} x {{ orderItem.quantity }}
    button() Order




</template>

<style lang="scss" scoped>
.box {
  padding: 1rem;
  border: 1px solid #333;
  border-radius: 0.5rem;
}
</style>
