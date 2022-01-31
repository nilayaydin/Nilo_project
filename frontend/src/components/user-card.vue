<script>
export default {
  name: 'UserCard',
  props: ['user'],
}
</script>

<template lang="pug">
.box
   h1 {{user.name}} ({{user.age}})
   p Adress: {{user.addresses || 'This user has no adress.'}}
   h2 Orders: {{user.orders.length}}
</template>

<style lang="scss" scoped>
.box {
  padding: 2rem;
  border: 1px solid #333;
  background: #dd0;
  border-radius: 0.3rem;
}
</style>
