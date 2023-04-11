<script>
import { ref } from "vue";
export default {
  setup() {
    const checked = ref(false);
    const cities = ref([]);
    const categories = ref([
      { name: "Accounting", key: "A" },
      { name: "Marketing", key: "M" },
      { name: "Production", key: "P" },
      { name: "Research", key: "R" },
    ]);
    const selectedCategories = ref(categories.value.slice(1, 3));

    return { checked, cities, categories, selectedCategories };
  },
};
</script>


<template>
  <div>
    <div class="field-checkbox">
      <!-- <TriStateCheckbox -->
      <label for="A">A. </label>
      <Checkbox
        inputId="A"
        name="A"
        value="A"
        :binary="true"
        v-model="checked"
      />
      <label for="A"
        >COMPLETELY AND PROPERLY ACCOMPLISHED CLEARANCE FORM (Name of patient
        and hospital number)</label
      >
    </div>
    <div class="field-checkbox">
      <!-- <TriStateCheckbox -->
      <label for="B">B. </label>
      <Checkbox
        inputId="B"
        name="B"
        value="B"
        :binary="true"
        v-model="checked"
      />
      <label for="B"
        >PROFESSIONAL FEE SLIP FOR PRIVATE OR PAYING PATIENTS
      </label>
    </div>
  </div>
</template>

