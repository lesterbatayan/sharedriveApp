<template lang="">
  <div class="card">
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

    <MalasakitPatientDetails :data="data" />
    <DiagnosisList />
    <!-- {{ data.value.hpercode }} -->
    <DynamicDialog :dataDx="data" />
  </div>
</template>

<script setup>
// import MalasakitService from "../service/MalasakitService";
// dialog
import { useDialog } from "primevue/usedialog";
import { useToast } from "primevue/usetoast";
import PatientSearch from "../components/PatientSearch.vue";
// dialog

import { ref, onMounted } from "vue";

import axios from "axios";

import MalasakitPatientDetails from "../components/MalasakitPatientDetails.vue";
import DiagnosisList from "../components/malasakitReports/DiagnosisList.vue";
import { debuggerStatement } from "@babel/types";

// const malasakitService = ref(new MalasakitService());
let enccode = ref("ER386205Jul062022220235");
//let enccode = ref("");

var show = ref(false);
var data = ref({});

// dialog

const dialog = useDialog();
const toast = useToast();
function searchPatient() {
  // console.log("dialog");
  const dialogRef = dialog.open(PatientSearch, {
    props: {
      header: "Patient Search",
      modal: true,
    },

  
    onClose: (options) => {
      // debugger;
      const data = options.data;
      console.log('onclose options', options.data);
      if (data) {
        this.$toast.add({
          severity: "info",
          summary: "Info Message",
          detail: "Order submitted",
          life: 3000,
        });
      }
    },
  });
  return dialogRef;
}
// dialog
onMounted(() => {
  loadData();
});

function loadData() {
  return getMalasakitDetails(
    "http://192.168.7.188:8040/api/malasakitCoverPage",
    enccode
  );
}

async function getMalasakitDetails(url, enccode) {
  let result = await axios
    .post(url, {
      enccode: enccode.value,
    })
    .then((data) => {
      if (data.data.length == 0) {
        show.value = false;
        return {};
      }

      show.value = true;

      return data;
    })
    .catch((error) => {
      console.log("ERROR", error);
    });

  data.value = result.data[0];
  console.log("show", data.value.hpercode);
  // console.log("length", data.value.hpercode.length);
  // console.log(data[0].hpercode);

  return data;
}
</script>
<style lang=""></style>
