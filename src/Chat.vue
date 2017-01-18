<template>
  <div class="chat">
    <ul class="messages">
      <li v-for="chatMsg in chatMsgs">{{chatMsg.nickName}}: {{chatMsg.msg}}</li>
    </ul>
    <form>
      <input  v-model="chatMsg.msg" />
      <button @click.prevent="sendMsg">&#187;</button>
    </form>

  </div>
</template>
<script>
import io from 'socket.io-client'

export default {
  name: 'chat',
  data () {
    return {
      socket: null,
      chatMsgs: [],
      chatMsg: {
        nickName: 'Guest',
        msg: ''
      }
    }
  },
  methods: {
    sendMsg () {
      console.log('Sending: ', this.chatMsg)
      this.socket.emit('chat newMessage', this.chatMsg)
      this.chatMsg.msg = ''
    }
  },
  created () {
    const nickName = window.prompt('Nick name?')
    this.chatMsg.nickName = nickName || this.chatMsg.nickName
    this.socket = io.connect('http://localhost:3000')
    this.socket.on('chat message', chatMsg => {
      this.chatMsgs.push(chatMsg)
    })
  }
}
</script>

<style scoped>
      form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
      form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
      form button { width: 7%; background: #41b883; border: none; padding: 4px; font-size:1.8em }
      .messages { list-style-type: none; margin: 0; padding: 0; text-align: start;  }
      .messages li { padding: 5px 10px; }
      .messages li:nth-child(odd) { background: #eee; }
</style>
