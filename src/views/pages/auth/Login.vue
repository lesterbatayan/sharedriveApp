<script setup>
// import { useLayout } from "@/layout/composables/layout";
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
// import AppConfig from '@/layout/AppConfig.vue';

// const { layoutConfig, contextPath } = useLayout();
// const email = ref("");
// const password = ref("");
// const checked = ref(false);
const router = useRouter()

// const logoUrl = computed(() => {
//   return `${contextPath}layout/images/${
//     layoutConfig.darkTheme.value ? "logo-white" : "logo-dark"
//   }.svg`;
// });
function login(user, username, userid) {
  localStorage.setItem('user', user)
  localStorage.setItem('username', username)
  localStorage.setItem('userid', userid)
  router.push('/')
}

onMounted(() => {
  localStorage.removeItem('username')
  localStorage.removeItem('user')
})
</script>

<template>
  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <!-- <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" /> -->
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%);
        "
      >
        <!-- rgba(33, 150, 243, 0) 30% -->
        <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
          <div class="text-center mb-5">
            <img src="/images/car1.svg" alt="Image" height="50" class="mb-3" />
            <div class="text-900 text-3xl font-medium mb-3">Welcome to Sharedrive</div>
            <p class="mt-0 mb-4 text-700 line-height-3">
              A local ride-hailing app for Baguio and La Trinidad
            </p>
            <span class="text-600 font-medium">Sign in to continue</span>
          </div>

          <div>
            <Button
              label="Sign In as Driver 1"
              class="w-full p-3 text-xl m-1"
              @click="login('driver', 'Driver 1', 'D1')"
              text
              raised
            ></Button>
            <Button
              label="Sign In as Driver 2"
              class="w-full p-3 text-xl m-1"
              @click="login('driver', 'Driver 2', 'D2')"
              text
              raised
            ></Button>
            <Button
              label="Sign In as Commuter 1"
              class="w-full p-3 text-xl m-1"
              severity="secondary"
              @click="login('commuter', 'Commuter 1', 'C1')"
              text
              raised
            ></Button>
            <Button
              label="Sign In as Commuter 2"
              class="w-full p-3 text-xl m-1"
              severity="secondary"
              @click="login('commuter', 'Commuter 2', 'C2')"
              text
              raised
            ></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <AppConfig simple /> -->
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
