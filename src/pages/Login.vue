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

const availableDrivers = ref([
  {
    id: 1,
    name: 'Driver (profile not set)',
    licenseType: '',
    plateNumber: '',
    vehicleType: '',
    aboutMe: '',
    available: true
  },
  {
    id: 2,
    name: 'Juan dela Cruz',
    licenseType: 'Professional',
    plateNumber: 'ABC123',
    vehicleType: 'Jeepney',
    aboutMe: 'I am a driver',
    available: true
  }
])

onMounted(() => {
  const storedAvailableDrivers = JSON.parse(localStorage.getItem('availableDrivers'))
  if (storedAvailableDrivers) {
    availableDrivers.value = storedAvailableDrivers
  } else {
    localStorage.setItem('availableDrivers', JSON.stringify(availableDrivers.value))
  }
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
              label="Sign In as Driver"
              class="w-full p-3 text-xl m-1"
              @click="login('driver', 'Driver', 'D1')"
              text
              raised
            ></Button>
            <Button
              label="Sign In as Commuter"
              class="w-full p-3 text-xl m-1"
              severity="secondary"
              @click="login('commuter', 'Commuter', 'C1')"
              text
              raised
            ></Button>
          </div>
          <!-- <div class="flex justify-content-end align-items-end" style="height: 100px">
            <Button
              label="Reset values"
              class="w-auto p-3 text-sm m-1"
              severity="warning"
              @click="reset()"
              rounded
              text
              size="small"
              icon="pi pi-times"
              style="height: 20px"
            ></Button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
  <!-- <AppConfig simple /> -->
</template>

<style scoped></style>
