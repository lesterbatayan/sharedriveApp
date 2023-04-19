
<script setup>
import { onMounted, ref, computed } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const checked = ref(false);

onMounted(() => {
  const availableDrivers = JSON.parse(localStorage.getItem('availableDrivers')) || [];
  const driversInfo = availableDrivers.filter((driver) => driver.id === 1)[0];
  checked.value = driversInfo.available;
});

const availabilityText = computed(() => (checked.value ? 'Available' : 'Not Available'));

function saveAvailability() {
  console.log('saveAvailability');
  console.log(checked.value);

  const availableDrivers = JSON.parse(localStorage.getItem('availableDrivers')) || [];
  console.log(availableDrivers);
  const driversInfo = availableDrivers.filter((driver) => driver.id === 1)[0];
  console.log(driversInfo);
  const driverIndex = availableDrivers.findIndex((driver) => driver.id === 1);
  if (driverIndex !== -1) {
    availableDrivers[driverIndex] = { ...driversInfo, id: 1, available: checked.value };
    localStorage.setItem('availableDrivers', JSON.stringify(availableDrivers));
    toast.add({ severity: 'success', summary: 'Success', detail: 'Availability Saved!' });
  }
}
</script>

<template>
  <div class="setAvailability">
    <div class="card shadow-4">
      <div>
        <div class="flex">
          <div class="flex flex-column gap-2">
            <h5 class="p-3">Set Availability</h5>
            <InputSwitch v-model="checked" />
            <div>{{ availabilityText }}</div>
            <Button type="submit" label="Save" @click="saveAvailability" />
          </div>
        </div>
      </div>
      <Toast />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
