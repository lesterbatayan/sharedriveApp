<template>
  <div class="card flex col-12 md:col-6">
    <!-- <div class="card flex justify-content-center"> -->
    <form @submit.prevent="onSubmit" class="flex flex-column gap-2">
      <div>Set availability</div>
      <InputSwitch v-model="checked" />
      <!-- <small id="text-error" class="p-error">{{ errorMessage || '&nbsp;' }}</small> -->
      <Button type="submit" label="Save" />
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const checked = ref(false)
const avail = () => {
  if (checked.value) return 'Available'
  else return 'Not Available'
}
</script>

<style lang="scss" scoped></style>
