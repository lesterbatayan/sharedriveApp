<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
var username = ref('')

onMounted(() => {
  if (!localStorage.getItem('user')) {
    console.log('invalid user')
    router.push('/login')
  }
  username.value = localStorage.getItem('username')
})
</script>

<template>
  <div class="grid grid-nogutter surface-section text-800">
    <div class="col-12 md:col-6 p-6 text-center md:text-left flex">
      <section>
        <span class="block text-6xl font-bold mb-1">Welcome, </span>
        <div class="text-6xl text-primary font-bold mb-3">{{ username }}</div>

        <!-- 
        <Button label="Learn More" type="button" class="mr-3 p-button-raised"></Button>
        <Button label="Live Demo" type="button" class="p-button-outlined"></Button> -->
      </section>
    </div>
    <div class="col-12 md:col-6 overflow-hidden">
      <img src="/images/jeep.jpg" alt="Image" class="md:ml-auto block md:h-full" />
      <!-- style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)" -->
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
