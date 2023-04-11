!<template>
  <div class="card">
    <h3>GL Management</h3>
    <!-- <Button
    type="button"
    icon="pi pi-search"
    label="Patient Search"
    class="p-button-outlined mb-2"
    @click="loadData"
    /> -->
    <Button
      type="button"
      icon="pi pi-search"
      label="Patient Search"
      class="p-button-outlined mb-2 primary"
      @click="searchPatient"
    />


  </div>
</template>

<script setup>
import { useDialog } from "primevue/usedialog";
// import PatientSearch from "../components/PatientSearch.vue";

import { ref, onMounted } from "vue";
import axios from "axios";



</script>

<style lang="scss" scoped>

</style>