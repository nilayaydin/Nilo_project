<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions(['logout']),
    async doLogout() {
      await this.logout()
      this.$router.push('/login')
    },
  },
  computer: {
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
        router-link(to="/profile") Profile
        router-link(to="/login") Login
        router-link(to="/register") Register
        a(@click="doLogout" href="#") Logout
    router-view
</template>

<style lang="scss">
:root {
  --pinkish: rgb(202, 158, 171);
}
body {
  background-color: var(--pinkish);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 20px;
}

#nav {
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
  }
}
</style>
