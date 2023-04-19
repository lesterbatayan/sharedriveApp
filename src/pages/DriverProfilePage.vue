<script setup>
import { ref, onMounted } from "vue";
import { useToast } from 'primevue/usetoast';

const toast = useToast();

onMounted(() => {
  console.log("mounted");

  driversInfo.value = JSON.parse(localStorage.getItem("availableDrivers")).filter(
    (driver) => driver.id == 1 
  )[0];
  if (!driversInfo.value) {
    driversInfo.value = {
      name: "",
      licenseType: "",
      plateNumber: "",
      vehicleType: "",
      aboutMe: "",
    };
  }
  selectedLicense.value = licenseTypes.value.find(
    (x) => x.name === driversInfo.value.licenseType
  );
  selectedVehicle.value = vehicleTypes.value.find(
    (x) => x.name === driversInfo.value.vehicleType
  );
});

var driversInfo = ref({
  name: "",
  licenseType: "",
  plateNumber: "",
  vehicleType: "",
  aboutMe: "",
});

const selectedVehicle = ref("");
const selectedLicense = ref("");



const licenseTypes = ref([
  { name: "Professional", id: 1 },
  { name: "Non-Professional", id: 2 },
  { name: "Student", id: 3 },
]);

const vehicleTypes = ref([
  { name: "Jeepney", code: 1 },
  { name: "Taxi", code: 2 },
  { name: "Mini Bus", code: 3 },
  { name: "Private Car", code: 4 },
  { name: "Tanke", code: 5 },
]);

function saveDetails() {
  driversInfo.value.licenseType = selectedLicense.value.name;
  driversInfo.value.vehicleType = selectedVehicle.value.name;

  if (
    driversInfo.value.name &&
    driversInfo.value.licenseType &&
    driversInfo.value.plateNumber &&
    driversInfo.value.vehicleType &&
    driversInfo.value.aboutMe
  ) {
    const availableDrivers = JSON.parse(localStorage.getItem('availableDrivers')) || [];
    const driverIndex = availableDrivers.findIndex(driver => driver.id === 1);
    if (driverIndex !== -1) {
      availableDrivers[driverIndex] = { ...driversInfo.value, id: 1, available: true };
      localStorage.setItem('availableDrivers', JSON.stringify(availableDrivers));
      toast.add({ severity: 'success', summary: 'Success', detail: 'Profile Saved!' });
    }
  }
  
}



</script>

<template>
  <div class="driverInfo">
    <div class="card shadow-4">
      <h5 class="p-3">Driver Profile</h5>
      <div>
        <div class="flex">
          <div class="p-float-label pr-5">
            <InputText id="name" v-model="driversInfo.name" />
            <label for="name">Driver Name</label>
          </div>
          <div class="p-float-label">
            <InputText id="plateNumber" v-model="driversInfo.plateNumber" />
            <label for="plateNumber">Plate Number</label>
          </div>
        </div>
        <div class="flex">
          <div class="p-float-label mt-4 pr-3">
            <Dropdown
              v-model="selectedVehicle"
              id="vehicleType"
              :options="vehicleTypes"
              optionLabel="name"
              placeholder=""
              class="w-auto md:w-14rem"
            />
            <label for="vehicleType">Vehicle Type</label>
          </div>
          <div class="p-float-label mt-4">
            <Dropdown
              v-model="selectedLicense"
              id="licenseType"
              :options="licenseTypes"
              optionLabel="name"
              placeholder=""
              class="w-auto md:w-14rem"
            />
            <label for="licenseType">License Type</label>
          </div>
        </div>
        <div class="flex">
          <div class="p-float-label mt-4">
            <Textarea id="aboutMe" v-model="driversInfo.aboutMe" rows="5" cols="60" />
            <label for="aboutMe">About Me</label>
          </div>
        </div>
        <div class="book-ride-button">
          <Button
            class="mt-4"
            type="submit"
            label="Update Profile"
            @click.prevent="saveDetails()"
          />
        </div>
      </div>
    </div>
    <Toast />
  </div>
</template>

<style scoped></style>
