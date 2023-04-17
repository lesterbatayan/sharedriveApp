<script setup>
import { ref, computed } from 'vue'

var message = ref('')
var chat = ref([])
var responseCounter = ref(0)

const chatResponse = () => {
  var src = ''
  var msg = ''
  var len = chat.value.length
  if (localStorage.getItem('user') == 'driver') {
    src = 'Commuter'
  } else {
    src = 'Driver'
  }

  if (responseCounter.value === 0) {
    msg = 'Hello ' + (src === 'Driver' ? 'Commuter' : 'Driver') + ', this is a response from your ' + (src === 'Driver' ? 'Driver' : 'Commuter') + '!'
  } else if (responseCounter.value === 1) {
    msg = 'This is another response from your ' + (src === 'Driver' ? 'Driver' : 'Commuter') + '!'
  } else if (responseCounter.value === 2) {
    msg = 'Yet another response from your ' + (src === 'Driver' ? 'Driver' : 'Commuter') + '!'
  } else {
    msg = 'Inayan ka pay nga ' + localStorage.getItem('user') + '!'
  }

  responseCounter.value += 1

  setTimeout(() => {
    chat.value.push({ src: '', msg: 'Waiting for a reply from ' + src, id: len + 1 })
  }, 1000)

  setTimeout(() => {
    chat.value.push({ src: '', msg: src + ' has seen your message!', id: len + 3 })
  }, 3000)

  setTimeout(() => {
    chat.value.push({ src: '', msg: src + ' is typing a message...', id: len + 4 })
  }, 3500)

  setTimeout(() => {
    chat.value.push({ src: src + ':', msg: msg, id: len + 5 })
  }, 7000)
}

const addToChat = () => {
  console.log('addtoChat')
  const len = chat.value.length
  chat.value.push({ src: 'Me:', msg: message.value, id: len })
  message.value = ''

  chatResponse()
}

const chatMessages = computed(() => chat.value)
</script>
 
<template>
  <div class="p-grid p-justify-center">
    <div class="p-col-12 p-md-6">
      <div class="card">
        <div>
          <h5 class="p-3">Chat</h5>
        </div>
        <form @submit.prevent="onSubmit" class="p-d-flex p-flex-column p-gap-2">
          <span class="p-float-label">
            <InputText id="message" v-model="message" />
            <label for="message">Message</label>
          </span>
          <Button type="submit" label="Send" class="p-mt-2" @click="addToChat" />
        </form>
        <div>
          <ul class="message-list">
            <li v-for="c in chatMessages" :key="c.id"
              :class="{ 'user-message': c.src === 'Me:', 'response-message': c.src !== 'Me:', 'prominent-message': c.src === 'Me:' || c.src.includes(':'), 'small-message': !c.src.includes(':') && c.src !== 'Me:' }">
              {{ c.src + '\t' + c.msg }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.user-message {
  text-align: left;
}

.response-message {
  text-align: right;
}

.prominent-message {
  font-size: 1.2em;
  font-weight: bold;
}

.small-message {
  font-size: 0.9em;
  color: gray;
}

.message-list {
  list-style-type: none;
  padding-left: 0;
}
</style>
 