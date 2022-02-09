<script>
// @ is an alias to /src
import Counter from '@/components/counter.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Profile',
  components: { Counter },
  data() {
    return {
      users: [],
      message: '',
    }
  },
  async created() {
    this.users = await this.fetchUsers()
  },
  methods: {
    ...mapActions(['fetchUsers', 'goLive', 'sendMessageToLiveStream', 'joinStream']),
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
//   data2() {
//     return {
//       products: [],
//     }
//   },
//   async created2() {
//     const productsRequest = await axios.get('/api/products')

//     this.products = productsRequest.data2
//   },
// }
</script>

<template lang="pug">
  .home
    h1 Veganzimu {{ user.name }}
    h2 Users
    div(v-for="user in users" :user = "user")
      router-link(:to="`/users/${user._id}`") {{user.name}}
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
