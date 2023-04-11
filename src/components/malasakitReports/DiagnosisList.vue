<template>
  <div>
    <h5>Diagnoses List</h5>
    <p>{{ dataDx }}</p>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import axios from "axios";

defineProps({ dataDx: {}, hpercode: String });

var patDiag = ref({});
var hpercode = ref('');

function loadDiagnoses() {
  return getDiagnoses(
    "http://192.168.7.188:8040/api/masalakitPatientDiagnoses",
    hpercode
  );
}

async function getDiagnoses(url, hpercode) {
  let result = await axios
    .post(url, {
      hpercode: hpercode.value,
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
  patDiag.value = result.data[0];
}

</script>

<style>
</style>
