<script setup>
import { ref, onMounted } from "vue";
const availableDrivers = ref([]);

onMounted(() => {
  console.log("mounted");
  availableDrivers.value = JSON.parse(localStorage.getItem("availableDrivers"));
  if (!availableDrivers.value) {
    availableDrivers.value = [];
  }
});
</script>

<template>
  <div class="availableDrivers">
    <div class="card shadow-4">
      <h5 class="p-3">Available Drivers</h5>
      <div>
        <div class="flex">
          <ul>
            <li v-for="driver in drivers" :key="driver.id">
              <div>
                <h1>{{ driver.name }}</h1>
                <h2>{{ driver.licenseType }}</h2>
                <h3>{{ driver.plateNumber }}</h3>
                <h4>{{ driver.vehicleType }}</h4>
                <h5>{{ driver.aboutMe }}</h5>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
