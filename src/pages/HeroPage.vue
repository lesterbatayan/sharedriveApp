<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
var username = ref("");
var user = ref("");
var driversInfo = ref([]);

onMounted(() => {
  if (!localStorage.getItem("user")) {
    console.log("invalid user");
    router.push("/login");
  }

  driversInfo.value = JSON.parse(localStorage.getItem("availableDrivers")).filter(
    (driver) => driver.id == 1 
  )[0];
  // console.log(driversInfo.value.name);
  if(localStorage.getItem("user") == "driver"){
    username.value = driversInfo.value.name
  }
  else{
    username.value = localStorage.getItem("username")
  }
  console.log(username.value);
  user.value = localStorage.getItem("user");
});
</script>

<template>
  <div class="grid grid-nogutter surface-section text-800">
    <div class="col-12 md:col-6 p-6 text-center md:text-left flex">
      <section>
        <span class="block text-6xl font-bold mb-1">Welcome, </span>
        <div class="text-6xl text-primary font-bold mb-3">{{ username }}</div>

        <!-- <div v-show="user == 'driver'">
          <h1>{{driversInfo}}</h1>
        </div> -->
      </section>
    </div>
    <div class="col-12 md:col-6 overflow-hidden">
      <img src="/images/jeep.jpg" alt="Image" class="md:ml-auto block md:h-full" />
      
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
