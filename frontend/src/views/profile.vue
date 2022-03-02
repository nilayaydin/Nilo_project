<script>
// @ is an alias to /src
import Counter from '@/components/counter.vue'
import UserCard from '@/components/user-card.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Profile',
  components: { Counter, UserCard },
  methods: {
    ...mapActions(['fetchUsers', 'goLive', 'sendMessageToLiveStream', 'joinStream', 'createOrder']),
    sendMessage(e) {
      e.preventDefault()
      this.sendMessageToLiveStream(this.message)
      this.message = ''
    },
  },
  computed: {
    ...mapState(['currentLiveStream', 'liveStreams', 'user', 'liveStreamMessages']),
  },
}
</script>

<template lang="pug">
#app
  .home
    UserCard(:user="user" v-if="user")
    Counter
    div(v-if="liveStreams.length > 0")
      h2 Live Streams
      div(v-for="stream in liveStreams")
        p {{ stream }}
        button(@click="joinStream(stream)") Join Stream
    button(@click="goLive") Go Live
    div(v-if="currentLiveStream")
      h3 Live Stream
      .messages
        .message(v-for="message in liveStreamMessages")
          p
            span {{ message.author }}:&nbsp;
            span {{ message.body }}
      form(@submit="sendMessage")
        input(type="text" v-model="message")
        input(type="submit" value="Send Message")
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: rgb(202, 158, 171);
}
</style>
// data2() { // return { // products: [], // } // }, // async created2() { // const productsRequest = await
axios.get('/api/products') // this.products = productsRequest.data2 // }, // }
