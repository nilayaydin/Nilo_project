<script>
// import Counter from '@/components/counter.vue'
import ProductCard from '@/components/product-card.vue'
import { mapActions } from 'vuex'

export default {
  name: 'ProductList',
  components: { ProductCard },
  data() {
    return {
      products: [],
    }
  },
  async created() {
    this.products = await this.fetchProducts()
  },
  methods: {
    ...mapActions(['fetchProducts']),
  },
}
</script>

<template>
  <div id="app">
    <div class="header">
      <h1>Products</h1>
    </div>
    <div class="container">
      <div class="row">
        <div v-for="product of products" :key="product" class="col-12 col-md-6 col-lg-4">
          <ProductCard :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/theme.scss';
@import 'bootstrap/scss/bootstrap.scss';

.header {
  padding: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
