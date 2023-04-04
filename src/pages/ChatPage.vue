<script setup>
import { ref } from 'vue'

var message = ref('')
var chat = ref([])
const addToChat = () => {
  console.log('addtoChat')
  const len = chat.value.length
  chat.value.push({ src: 'You', msg: message.value, id: len })
  message.value = ''
}
</script>

<template>
  <!-- <div class="card flex justify-content-center"> -->
  <div class="card flex flex-column col-12 md:col-7">
    <div><h5 class="p-3">Chat</h5></div>
    <!-- <div class="col-12 md:col-6"> -->
    <form @submit.prevent="onSubmit" class="flex flex-column gap-2">
      <span class="p-float-label">
        <InputText id="message" v-model="message" class="w-10" />
        <label for="message">Message</label>
        <Button type="submit" label="Send" class="w-auto" @click="addToChat" />
      </span>
    </form>
    <div>
      <ul>
        <li v-for="c in chat" :key="c.id">{{ c.src + ': ' + c.msg }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
