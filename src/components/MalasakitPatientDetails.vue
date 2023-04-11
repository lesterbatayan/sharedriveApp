<template lang="">
<div  class="card overflow-y-auto" style="height: calc(100vh - 20rem); max-width: 1000px; min-width: 375px" >
    <h5 class="text-primary">Patient Details</h5>
    <div class="formgrid grid " >
        <div class="field col-9 ">
            <label for="patname" class="text-500">Patient Name</label>
            <input disabled :value="data.patname"  id="patname" type="text" class="text-base font-bold text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">

        </div>
        <div class="field col-3 ">
            <label for="hpercode" class="text-500">Hospital Number</label>
            <input disabled :value="data.hpercode" id="hpercode" type="text" class="text-base font-bold text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
            
        </div>

        <div class="field col-12 md:col-3">
            <label for="patbdate" class="text-500">Birth Date</label>
            <input disabled :value="data.patbdate" id="patbdate" type="text" class="text-base font-bold text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
        </div>
        <div class="field col-12 md:col-3">
            <label for="age" class="text-500">Age</label>
            <input disabled :value="data.age" id="age" type="text" class="text-base font-bold text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
        </div>
        <div class="field col-12 md:col-3">
            <label for="patsex" class="text-500">Gender</label>
            <input disabled :value="data.patsex" id="patsex" type="text" class="text-base font-bold text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
        </div>
        <div class="field col-12 md:col-3">
            <label for="contactno" class="text-500">Contact Number</label>
            <input disabled :value="data.contactno" id="contactno" type="text" class="text-base font-bold text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
        </div>
        <div class="field col-12 md:col-6">
            <label for="address" class="text-500">Address</label>
            <input disabled :value="data.addr" id="address" type="text" class="text-base font-bold text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
        </div>
        <div class="field col-12 md:col-6">
            <label for="phictype" class="text-500">Philhealth Type</label>
            <input disabled :value="data.phictype" id="phictype" type="text" class="text-base font-bold text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
        </div>
        <div class="field col-12 md:col-6">
            <label for="occ" class="text-500">Occupation of Patient</label>
            <input  disabled :value="data.occ" id="occ" type="text" class="text-base font-bold text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
        </div>
        <div class="field col-12 md:col-6">
            <label for="otherSrc" class="text-500">Source of Income of Famliy</label>
            <input  disabled :value="data.otherSrc" id="otherSrc" type="text" class="text-base font-bold text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
        </div>
        <div class="field col-12">
            <label for="diagnosis" class="text-500">Diagnosis</label>
            
            <textarea disabled :value="data.diagtext"  id="diagnosis" type="text" rows="2" class="text-base font-bold text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"></textarea>
        </div>
        <div class="field col-12 md:col-6">
            <label for="refby" class="text-500">Referred by</label>
            <input disabled :value="data.refby" id="refby" type="text" class="text-base font-bold text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
        </div>
        <div class="field col-12 md:col-6">
            <label for="refRel" class="text-500">Relationship</label>
            <input disabled :value="data.refRel" id="refRel" type="text" class="text-base font-bold text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
        </div>
        <div class="field col-12 md:col-6">
            <label for="assistanceNeeded" class="text-500">Assistance Needed</label>
            <input disabled :value="data.assistanceNeeded" id="assistanceNeeded" type="text" class="text-base font-bold text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
        </div>
        <div class="field col-12 md:col-6">
            <label for="amountNeeded" class="text-500">Approved Amount</label>
            <input disabled :value="data.amountNeeded" id="amountNeeded" type="text" class="text-base font-bold text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
        </div>
        <div class="field col-12">
            <label for="assessedBy" class="text-500">Assessed By</label>
            <input id="assessedBy" type="text" class="text-base font-bold text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full">
        </div>



    </div>
</div>
</template>
<script setup>
import { onMounted, defineProps } from "vue";

defineProps({
  data: {},
  // hpercode: String,
  // new: String,
  // old: String,
  // adm: String,
  // er: String,
  // opd: String,
  // patlast: String,
  // patfirst: String,
  // patmiddle: String,
  // patsuffix: String,
  // patname: String,
  // patbdate: String,
  // age: String,
  // patsex: String,
  // phictype: String,
  // addr: String,
  // contactno: String,
  // occ: String,
  // otherSrc: String,
  // totalIncome: String,
  // diagtext: String,
  // refby: String,
  // refRel: String,
  // fundSource: String,
  // assistanceNeeded: String,
  // amountNeeded: String,
  // ctrlno: String,
  // glDate: String,
  // glExDate: String,
  // mssClass: String,
  //   },
});

onMounted(() => {});
</script>
<style lang="">
</style>