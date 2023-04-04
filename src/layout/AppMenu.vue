<script setup>
import { ref, onMounted } from 'vue'

import AppMenuItem from './AppMenuItem.vue'

const drivermenu = [
  {
    items: [
      { label: 'Home', icon: 'pi pi-home', to: '/' },
      {
        label: 'Set Availability',
        icon: 'pi pi-user-plus',
        to: '/availability'
      },
      {
        label: 'Chat',
        icon: 'pi pi-comments',
        to: '/chat'
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-in',
        to: '/login'
      }
    ]
  }
]

const commutermenu = [
  {
    items: [
      { label: 'Home', icon: 'pi pi-home', to: '/' },
      {
        label: 'Book Ride',
        icon: 'pi pi-car',
        to: '/bookride'
      },
      {
        label: 'Chat',
        icon: 'pi pi-comments',
        to: '/chat'
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-in',
        to: '/login'
      }
    ]
  }
]

var model = ref([])

onMounted(() => {
  if (localStorage.getItem('user') == 'driver') {
    model.value = drivermenu
  } else {
    model.value = commutermenu
  }
})

// const model = ref([
//   {
//     // label: "",
//     items: [
//       { label: 'Home', icon: 'pi pi-home', to: '/' },
//       {
//         label: 'Set Availability',
//         icon: 'pi pi-user-plus',
//         to: '/availability'
//       },
//       {
//         label: 'Book Ride',
//         icon: 'pi pi-car',
//         to: '/book'
//       },
//       {
//         label: 'Chat',
//         icon: 'pi pi-comments',
//         to: '/chat'
//       },
//       {
//         label: 'Logout',
//         icon: 'pi pi-sign-in',
//         to: '/login'
//       }
//     ]
//   }
// ])
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
