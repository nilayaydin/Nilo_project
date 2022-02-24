<script>
import UserCard from '@/components/user-card.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      users: [],
    }
  },
  async created() {
    this.users = await this.fetchUsers()
  },
  methods: {
    ...mapActions(['fetchUsers']),
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<template lang="pug">
    .home
        .container1
            .div
             h1 Welcome to Veganzimu!
             h2 The users are listed below
             .div(v-for="user in users")
                p {{ user.name }}





</template>

<style lang="scss" scoped>
.home {
  display: flex;
  padding-top: 50px;
  align-content: center;
  text-align: center;
}
</style>
