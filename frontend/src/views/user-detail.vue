<script>
// import Counter from '@/components/counter.vue'
import UserCard from '@/components/user-card.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'UserDetail',
  components: { UserCard },
  computed: {
    ...mapState(['products']),
  },
  methods: {
    ...mapActions(['setProducts']),
  },
}
</script>

<template lang="pug">
  .about
    div(v-for="product in products" v-if="product")
    h1 This is a product detail
    p {{ product.name }}

</template>
