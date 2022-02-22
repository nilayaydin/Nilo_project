<script>
export default {
  name: 'UserCard',
  props: ['user'],
}
</script>

<template lang="pug">
.box
  h1 {{ user.name }} ({{ user.age }})
    .infoaddresses(v-for="adress in user.addresses")
      p Address: {{ user.address || 'This user has no adress.' }}
      h2 Orders: {{ user.orders.length }}

  .box(v-for="order in user.orders")
    ul(v-for="orderItem in order.orderItems")
      li {{ orderItem.item.name }}

</template>

<style lang="scss" scoped>
.box {
  padding: 2rem;
  border: 1px solid #333;
  background: #dd0;
  border-radius: 0.3rem;
}
</style>
