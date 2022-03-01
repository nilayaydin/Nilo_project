<script>
import { mapActions, mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'App',
  methods: {
    ...mapActions(['logout']),
    async doLogout() {
      await this.logout()
      this.$router.push('/login')
    },
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<template lang="pug">
  #app
    #nav
      .logo
        router-link(to="/")
         img(src="@/assets/veganzimu-logo.png")
      .box
        router-link(to="/") Home
        router-link(to="/profile" v-if="user") Profile
        router-link(to="/login" v-if="!user") Login
        router-link(to="/register" v-if="!user") Register
        a(@click="doLogout" href="#" v-if="user") Logout
    router-view
</template>

<style lang="scss">
:root {
  --pinkish: rgb(202, 158, 171);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 20px;
  background-color: rgb(202, 158, 171);
}

#nav {
  padding: 30px;
  justify-content: flex-start;
  flex: 1;
  text-align: right;

  a {
    position: inline-block;
    display: right;
    justify-content: right;
    padding: 20px 20px 20px 20px;
    font-size: 23px;

    &.router-link-exact-active {
      color: #3b7a21;
    }
  }

  img {
    width: 250px;
    height: 250px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
</style>
