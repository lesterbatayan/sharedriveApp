<script setup>
import { ref } from 'vue'
const vehicles = ref([
  { name: 'Jeepney', code: 'V1' },
  { name: 'Taxi', code: 'V2' },
  { name: 'Mini Bus', code: 'V3' },
  { name: 'Private Car', code: 'V4' },
  { name: 'Tanke', code: 'V5' }
])
const locations = ref([
  { name: 'Bokawkan Loading Area', code: 'L1' },
  { name: 'Magsaysay Loading Area', code: 'L2' },
  { name: 'Camdas', code: 'L3' },
  { name: 'Km5/Public Market', code: 'L4' },
  { name: 'Town/Capitol', code: 'L5' },
  { name: 'CCDC', code: 'L6' },
  { name: 'Wangal Turning Point', code: 'L7' }
])
const drivers = ref([
  { name: 'Driver 1', code: 'D1' },
  { name: 'Driver 2', code: 'D2' },
  { name: 'Driver 3', code: 'D3' },
  { name: 'Driver 4', code: 'D4' }
])
var selectedVehicle = ref()
var selectedLocation = ref()
var selectedDestination = ref()
var selectedDriver = ref()
var vehicle = ref()
var location = ref()
var destination = ref()
var driver = ref()
var booked = ref()

function bookRide() {
  console.log(selectedDestination.value.name)
  location.value = selectedLocation.value.name
  destination.value = selectedDestination.value.name
  vehicle.value = selectedVehicle.value.name
  driver.value = selectedDriver.value.name

  localStorage.setItem('destination', selectedDestination.value.name)
  localStorage.setItem('location', selectedLocation.value.name)
  localStorage.setItem('vehicle', selectedVehicle.value.name)
  localStorage.setItem('driver', selectedDriver.value.name)

  selectedLocation.value = ''
  selectedDestination.value = ''
  selectedDriver.value = ''
  selectedVehicle.value = ''
  if (location.value && destination.value && vehicle.value && driver.value) {
    localStorage.setItem('booked', true)
    booked = localStorage.getItem('booked')
  }
}

// function getLocalStorageValues() {
//   const values = {}
//   localStorage.forEach((value, key) => {
//     const obj = {
//       key: key,
//       value: value
//     }
//     Object.assign(obj, values)
//   })

//   return values
// }
</script>

<template>
  <!-- <div class="col-12 md:col-6"> -->
  <!-- <div class=""> -->
  <!-- <div class="card p-fluid "> -->
  <div class="card col-12 md:col-6">
    <h5 class="p-3">Book a Ride</h5>

    <div class="p-float-label mt-5">
      <Dropdown
        v-model="selectedLocation"
        inputId="dd-location"
        :options="locations"
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
        :options="locations"
        optionLabel="name"
        placeholder=""
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

    <div class="col-3">
      <!-- <label for="age1">Age</label> -->
      <Button type="submit" label="Book Ride" @click="bookRide()" />
    </div>
    <div v-if="booked">
      <p class="text-primary font-bold">You are now booked!</p>
      <p>Booking Details:</p>
      <p>
        Your current location: <span class="font-bold text-primary">{{ location }}</span>
      </p>
      <p>
        Your chosen destination:
        <span class="font-bold text-primary">{{ destination }}</span>
      </p>
      <p>
        Your chosen vehicle: <span class="font-bold text-primary">{{ vehicle }}</span>
      </p>
      <p>
        Your current driver: <span class="font-bold text-primary">{{ driver }}</span>
      </p>
    </div>
  </div>
  <!-- </div> -->
</template>

<style lang="scss" scoped></style>
