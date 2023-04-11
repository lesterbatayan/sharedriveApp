<template>
  <div class="grid">
    <div class="col-12">
      <div class="card" style="height: 600px">
        <!-- <h5>Patient Search</h5> -->
        <div class="p-fluid formgrid grid">
          <div class="field col-12 md:col-3">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                id="hospitalNumber"
                type="text"
                placeholder="Hospital Number"
                v-model="searchParams.hpercode"
                @keyup.enter="search(searchParams)"
                style="text-transform: uppercase"
              />
            </span>
          </div>
          <div class="field col-12 md:col-3">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                id="lastName"
                type="text"
                placeholder="Last Name"
                v-model="searchParams.patlast"
                @keyup.enter="search(searchParams)"
                style="text-transform: uppercase"
              />
            </span>
          </div>
          <div class="field col-12 md:col-3">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                id="firstName"
                type="text"
                placeholder="First Name"
                v-model="searchParams.patfirst"
                @keyup.enter="search(searchParams)"
                style="text-transform: uppercase"
              />
            </span>
          </div>
          <div class="field col-12 md:col-3">
            <Button
              type="button"
              icon="pi pi-search"
              label="Patient Search"
              class="p-button-outlined mb-2"
              style="height: 39px"
              @click="search(searchParams)"
            />
          </div>
        </div>
        <DataTable
          :value="patientList"
          selectionMode="single"
          dataKey="hpercode"
          responsiveLayout="scroll"
          stripedRows
          v-model:selection="selectedPatient"
          @row-select="onRowSelect"
          style="height: 100px"
          :rows="10"
          :paginator="true"
        >
          <Column
            v-for="col of columns"
            :field="col.field"
            :header="col.header"
            :key="col.field"
          ></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { delay } from "q";

var ctr = {
  count:0,
  timer: null
}

defineEmits(['get-hpercode']);



const searchParams = ref({
  hpercode: null,
  patlast: null,
  patfirst: null,
  patmiddle: null,
});
const patientList = ref();
const columns = [
  { field: "hpercode", header: "Hospital #" },
  { field: "patlast", header: "Last Name" },
  { field: "patfirst", header: "First Name" },
  { field: "patmiddle", header: "Middle Name" },
  { field: "patbdate", header: "Birth Date" },
  { field: "patsex", header: "Sex" },
];
const selectedPatient = ref();
async function getPatientList(url = "", searchParams = {}) {
  let result = await axios
    .post(url, {
      hpercode: searchParams.hpercode,
      patlast: searchParams.patlast,
      patfirst: searchParams.patfirst,
      patmiddle: searchParams.patmiddle,
    })
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
  console.log("result", result.data);
  patientList.value = result.data;
  console.log("PL", patientList.value);
  return patientList;
}

function search(searchParams) {
  return getPatientList("http://192.168.7.188:8040/api/patient", searchParams);
}

function onRowSelect() {
  // alert(selectedPatient.value.hpercode);
  handleClick();
}

function handleClick(){
  // e.preventDefault();
  console.log('handleClick');
  ctr.count++;

  if(ctr.count === 1){
    ctr.timer = setTimeout(() => {
      ctr.count = 0;
      alert('single')
    }, 300);
    
  }
  else if(ctr.count === 2){
    clearTimeout(ctr.timer);
    ctr.count = 0;
    alert('double');
  }
  
}

</script>
