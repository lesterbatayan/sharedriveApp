<script setup>
import { ref, onMounted } from "vue";
const availableDrivers = ref([]);
const selectedDriver = ref(null);

onMounted(() => {
  console.log("mounted");
  availableDrivers.value = JSON.parse(localStorage.getItem("availableDrivers")).filter(
    (driver) => driver.available == true
  );
  console.log(availableDrivers.value);
  if (!availableDrivers.value) {
    availableDrivers.value = [];
  }
});

function selectDriver(driver) {
  selectedDriver.value = driver;
}
</script>

<template>
  <div class="availableDrivers">
    <div class="card shadow-4">
      <h5 class="p-3">Available Drivers</h5>
      <div class="flex">
        <div>
          <ul>
            <li v-for="driver in availableDrivers" :key="driver.id">
              <div>
                <h5>
                  <a href="#" class="driver-name" @click.prevent="selectDriver(driver)">
                    {{ driver.name }}
                  </a>
                </h5>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="selectedDriver" class="driver-info">
          <h5>Driver Information</h5>
          <p><strong>Name:</strong> {{ selectedDriver.name }}</p>
          <p><strong>License Type:</strong> {{ selectedDriver.licenseType }}</p>
          <p><strong>Plate Number:</strong> {{ selectedDriver.plateNumber }}</p>
          <p><strong>Vehicle Type:</strong> {{ selectedDriver.vehicleType }}</p>
          <p><strong>About Me:</strong> {{ selectedDriver.aboutMe }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.driver-name {
  text-decoration: underline;
  color: #007bff;
  cursor: pointer;
}

.driver-name:hover {
  color: #0056b3;
}

.available-icon {
  margin-left: 0.5rem;
}

.driver-info {
  margin-left: 2rem;
}
</style>

