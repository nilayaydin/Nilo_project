<script>
// import Counter from '@/components/counter.vue'
import ProductCard from '@/components/product-card.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Home',
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
  computed: {
    ...mapState(['user']),
  },
}
</script>

<template lang="pug">
#app
  .header
    h1(v-if="user") Welcome {{ user.name }}
    h1 Products
  .container
    .row
      div(v-for="product in products" :product="product" class="col-12 col-md-6 col-lg-4")
        ProductCard(:product="product" v-if="product")
  .footer
    p This website is named after my best friend, Fundazimu <3

</template>

<style lang="scss">
@import '@/assets/theme.scss';
@import 'bootstrap/scss/bootstrap.scss';
#app {
  background-color: linear-gradient(to right, rgb(202, 158, 171), rgb(199, 138, 149));
}

.header {
  padding: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer {
  bottom: 0;
  width: 100%;
  height: 60px; /* Height of the footer */
  align-items: right;
}
</style>
