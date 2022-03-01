<script>
// Is this working?

export default {
  name: 'UserCard',
  props: ['user'],
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
  .liked-products(v-for="product in user.likesProduct")
    h4 Liked Products:
    li {{ product.name }} ( {{ product.brand }} )

</template>

<style lang="scss" scoped>
.box {
  padding: 1rem;
  border: 1px solid #333;
  border-radius: 0.5rem;
}
</style>
