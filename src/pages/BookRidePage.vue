<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useToast } from 'primevue/usetoast';

const toast = useToast();

onMounted(() => {
  const availableDrivers = JSON.parse(localStorage.getItem('availableDrivers')) || [];
  const driversInfo = availableDrivers.filter((driver) => driver.available);
  drivers.value = driversInfo;
    console.log('drivers.value', drivers.value);
})

var mapImageSrc = ref();
var isLoading = ref(false);
var bookingDialog = ref(false);

const vehicles = ref([
  { name: "Jeepney", code: 1 },
  { name: "Taxi", code: 2 },
  { name: "Mini Bus", code: 3 },
  { name: "Private Car", code: 4 },
  { name: "Tanke", code: 5 },
]);
const locations = ref([
  {
    name: "Baguio City Hall",
    code: 1,
    coordinates: { lat: 16.413903523297634, lng: 120.59144847086073 },
  },
  {
    name: "La Trinidad Public Market",
    code: 2,
    coordinates: { lat: 16.44846052653305, lng: 120.59027456429264 }, //16.44846052653305, 120.59027456429264
  },
  {
    name: "Benguet Provincial Capitol",
    code: 3,
    coordinates: { lat: 16.462593795901057, lng: 120.58772714369829 },
  }, //16.462593795901057, 120.58772714369829
  {
    name: "CCDC",
    code: 4,
    coordinates: { lat: 16.456983528421688, lng: 120.57737051968265 },
  }, //16.456983528421688, 120.57737051968265
  {
    name: "Wangal Motorpool",
    code: 5,
    coordinates: { lat: 16.45299021932984, lng: 120.57340212380169 },
  }, //16.45299021932984, 120.57340212380169
]);
const drivers = ref([
  // { name: "Driver 1", code: "D1" },
  // { name: "Driver 2", code: "D2" },
  // { name: "Driver 3", code: "D3" },
  // { name: "Driver 4", code: "D4" },
]);




const maps = [
  { locationID: 1, destinationID: 2, src: "./src/maps/1 - 2.png" },
  { locationID: 1, destinationID: 3, src: "./src/maps/1 - 3.png" },
  { locationID: 1, destinationID: 4, src: "./src/maps/1 - 4.png" },
  { locationID: 1, destinationID: 5, src: "./src/maps/1 - 5.png" },
  { locationID: 2, destinationID: 3, src: "./src/maps/2 - 3.png" },
  { locationID: 2, destinationID: 4, src: "./src/maps/2 - 4.png" },
  { locationID: 2, destinationID: 5, src: "./src/maps/2 - 5.png" },
  { locationID: 3, destinationID: 4, src: "./src/maps/3 - 4.png" },
  { locationID: 3, destinationID: 5, src: "./src/maps/3 - 5.png" },
  { locationID: 4, destinationID: 5, src: "./src/maps/4 - 5.png" },
];

function getMap(locationID, destinationID) {
  console.log("locationID", locationID);
  console.log("destinationID", destinationID);

  const map = maps.find(
    (m) => m.locationID === locationID && m.destinationID === destinationID
  );
  console.log(map);
  console.log("map", map ? map.src : null);
  return map ? map.src : null;
}

function fetchMap() {
  if (selectedLocation.value && selectedDestination.value) {
    let locationID = selectedLocation.value.code;
    let destinationID = selectedDestination.value.code;

    isLoading.value = true;
    mapImageSrc.value = getMap(locationID, destinationID);
    setTimeout(() => {
      mapImageSrc.value = getMap(locationID, destinationID);
      isLoading.value = false;
    }, 1000);
  } else {
    mapImageSrc.value = null;
  }
}

var selectedVehicle = ref();
var selectedLocation = ref(null);
var selectedDestination = ref(null);
var selectedDriver = ref();
var vehicle = ref();
var location = ref();
var destination = ref();
// var locationID = ref()
// var destinationID = ref()
var driver = ref();
var booked = ref();

function bookRide() {
  console.log(selectedDestination.value.name);
  location.value = selectedLocation.value.name;
  destination.value = selectedDestination.value.name;
  vehicle.value = selectedVehicle.value.name;
  driver.value = selectedDriver.value.name;

  localStorage.setItem("destination", selectedDestination.value.name);
  localStorage.setItem("location", selectedLocation.value.name);
  localStorage.setItem("vehicle", selectedVehicle.value.name);
  localStorage.setItem("driver", selectedDriver.value.name);

  // selectedLocation.value = ''
  // selectedDestination.value = ''
  selectedDriver.value = "";
  selectedVehicle.value = "";
  // if (location.value && destination.value && vehicle.value && driver.value) {
  //   localStorage.setItem('booked', true)
  //   booked.value = localStorage.getItem('booked')
  // }
  if (location.value && destination.value && vehicle.value && driver.value) {
    localStorage.setItem("booked", true);
    booked.value = localStorage.getItem("booked");
    bookingDialog.value = true; // Show the dialog when booking is successful
    toast.add({ severity: 'success', summary: 'Success', detail: 'Booking Saved!' });

  }
}

const filteredLocationsForDestination = computed(() => {
  if (!selectedLocation.value) {
    return locations.value;
  }
  return locations.value.filter(
    (location) => location.code !== selectedLocation.value.code
  );
});

const filteredLocationsForOrigin = computed(() => {
  if (!selectedDestination.value) {
    return locations.value;
  }
  return locations.value.filter(
    (location) => location.code !== selectedDestination.value.code
  );
});

watch([selectedLocation, selectedDestination], () => {
  console.log(
    "selectedLocation.value, selectedDestination.value",
    selectedLocation.value,
    selectedDestination.value
  );
  fetchMap();
});
</script>

<template>
  <div class="container">
    <div class="card shadow-4">
      <h5 class="p-3">Book a Ride</h5>

      <div class="flex">
        <div class="dropdown-wrapper">
          <div class="dropdowns">
            <div class="p-float-label mt-5">
              <Dropdown
                v-model="selectedLocation"
                inputId="dd-location"
                :options="filteredLocationsForOrigin"
                optionLabel="name"
                placeholder="My Location"
                class="w-auto md:w-14rem"
              />
              <label for="dd-location">My Location</label>
            </div>

            <div class="p-float-label mt-5">
              <Dropdown
                v-model="selectedDestination"
                inputId="dd-destination"
                :options="filteredLocationsForDestination"
                optionLabel="name"
                placeholder="My Destination"
                class="w-auto md:w-14rem"
              />
              <label for="dd-destination">My Destination</label>
            </div>

            <div class="p-float-label mt-5">
              <Dropdown
                v-model="selectedVehicle"
                inputId="dd-city"
                :options="vehicles"
                optionLabel="name"
                placeholder=""
                class="w-full md:w-14rem"
              />
              <label for="dd-city">Type of Vehicle</label>
            </div>

            <div class="p-float-label mt-5">
              <Dropdown
                v-model="selectedDriver"
                inputId="dd-city"
                :options="drivers"
                optionLabel="name"
                placeholder=""
                class="w-full md:w-14rem"
              />
              <label for="dd-city">Select Driver</label>
            </div>
            <div class="book-ride-button">
              <Button type="submit" label="Book Ride" @click.prevent="bookRide()" />
            </div>
          </div>

          <div v-if="booked" class="booking-details">
            <p class="text-primary font-bold">You are now booked!</p>
            <!-- <p>Booking Details:</p> -->
            <p>
              Your current location:
              <span class="font-bold text-primary">{{ location }}</span>
            </p>
            <p>
              Your chosen destination:
              <span class="font-bold text-primary">{{ destination }}</span>
            </p>
            <p>
              Your chosen vehicle:
              <span class="font-bold text-primary">{{ vehicle }}</span>
            </p>
            <p>
              Your current driver:
              <span class="font-bold text-primary">{{ driver }}</span>
            </p>
          </div>
        </div>
      </div>

      <div class="map-container">
        <div v-if="isLoading" class="loader"></div>
        <!-- <div class="scrollable-container">
                            <img v-if="mapImageSrc" :src="mapImageSrc" alt="Map" />
                          </div> -->
        <div v-if="selectedLocation && selectedDestination" class="map-iframe">
          <iframe
            width="100%"
            height="100%"
            frameborder="0"
            style="border: 0"
            :src="
              'https://www.google.com/maps/embed/v1/directions?key=AIzaSyAigJr6nb3Q3T8E_UnySIEBRTvVoOlsJCg&origin=' +
              selectedLocation.coordinates.lat +
              ',' +
              selectedLocation.coordinates.lng +
              '&destination=' +
              selectedDestination.coordinates.lat +
              ',' +
              selectedDestination.coordinates.lng
            "
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <Toast />
    </div>
  </div>

  
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.card {
  width: 100%;
  max-width: 1200px;
  background-color: #fff;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

.flex {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: flex-start;
}

.dropdown-wrapper {
  display: flex;
  flex-direction: column;
  width: auto;
  margin-right: 1rem;
}

.dropdowns {
  display: flex;
  flex-wrap: nowrap;
  /* Changed from wrap to nowrap */
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.book-ride-button {
  margin-top: 1rem;
}

.map-container {
  flex: 1;
  margin-left: 1rem;
  position: relative;
  min-width: 60%;
}

.scrollable-container {
  height: 80vh;
  overflow: auto;

  img {
    width: auto;
    height: auto;
    // max-width: 100%;
  }
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.map-iframe {
  width: 100%;
  height: 80vh;
}

.booking-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 1rem;
}
</style>
