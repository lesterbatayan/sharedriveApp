<script setup>
import { useLayout } from '@/layout/composables/layout'
import { computed } from 'vue'

const { layoutConfig, contextPath } = useLayout()

// const logoUrl = computed(() => {
//     // return `${contextPath}layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
// });
</script>

<template>
  <div class="layout-footer">
    <!-- <img :src="" alt="Logo" height="20" class="mr-2" /> -->
    <img src="/images/car1.svg" alt="Logo" height="20" class="mr-2" />
    by
    <span class="font-medium ml-2">
      <div>RC05, Group 2</div>
      <!-- <div>(Malabanan, Cael, Batay-an)</div> -->
    </span>
  </div>
</template>
<style lang="scss" scoped></style>
