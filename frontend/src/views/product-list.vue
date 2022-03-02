<script>
// import Counter from '@/components/counter.vue'
import ProductCard from '@/components/product-card.vue'
import { mapActions } from 'vuex'

export default {
  name: 'ProductDetail',
  components: { ProductCard },
  data() {
    return {
      product: null,
    }
  },
  async created() {
    this.product = await this.fetchProduct(this.$route.params.id)
    console.log('product gelcek mi bakalim', this.product)
  },
  methods: {
    ...mapActions(['fetchProduct']),
  },
}
</script>

<template lang="pug">
  .about
    h1 This is product detail
    ProductCard(:product="product")
</template>
