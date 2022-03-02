<script>
// Is this working?
import { mapActions } from 'vuex'

export default {
  name: 'UserCard',
  props: ['user'],
  data() {
    return {
      address: null,
    }
  },
  methods: {
    ...mapActions(['addAddress']),
    async createAddress() {
      await this.addAddress({ address: this.address })
      alert('Address is successfully added!')
    },
  },
}
</script>

<template lang="pug">
.box
  h1 {{ user.name }} ({{ user.age }})
  .infoaddresses(v-for="address in user.addresses")
    p Address: {{ address || 'This user has no adress.' }}
  h4 Orders: {{ user.orders.length }}

  .order-info(v-for="order in user.orders")
    ul(v-for="orderItem in order.orderItems")
      li {{ orderItem.item.name }}
       h6 Quantity: {{ orderItem.quantity }}
       h6 Total Amount: {{ order.amount }}
  .liked-products(v-for="product in user.likesProduct")
    h4 Liked Products:
    li {{ product.name }} ( {{ product.brand }} )
  .addAddress
  label(for="addresses") Create Address
    input(v-model="address", id="address", type="text", placeholder="type here")
    button(@click="createAddress") Submit

</template>

<style lang="scss" scoped>
.box {
  padding: 1rem;
  border: 1px solid #333;
  border-radius: 0.5rem;
}
</style>
