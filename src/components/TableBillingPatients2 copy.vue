<template>
  <div>
    <div class="card">
      <h5>Patient Bill Management</h5>
      <!-- <div>{{ billWards }}</div> -->
      <DataTable
        :value="bills"
        :paginator="true"
        class="p-datatable-customers"
        :rows="10"
        dataKey="id"
        v-model:filters="filters2"
        filterDisplay="row"
        :loading="loading2"
        responsiveLayout="scroll"
        :globalFilterFields="[
          'hpercode',
          'patient',
          'ward',
          'admdate',
          'name',
          'country.name',
          'representative.name',
          'status',
        ]"
      >
        <template #header>
          <div class="flex justify-content-end">
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                v-model="filters2['global'].value"
                placeholder="Keyword Search"
              />
            </span>
          </div>
        </template>
        <template #empty> No bills found. </template>
        <template #loading> Loading bills data. Please wait. </template>
        <Column field="hpercode" header="Hospital #" style="min-width: 12rem">
          <template #body="{ data }">
            {{ data.hpercode }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @keyup="filterCallback()"
              class="p-column-filter"
              :placeholder="`Search by Hospital # - `"
            />
          </template>
        </Column>
        <Column field="patient" header="Patient Name" style="min-width: 12rem">
          <template #body="{ data }">
            {{ data.patient }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @keyup="filterCallback()"
              class="p-column-filter"
              :placeholder="`Search by name - `"
            />
          </template>
        </Column>
        <Column
          field="admdate"
          header="Admission Date"
          style="min-width: 12rem"
        >
          <template #body="{ data }">
            {{ data.admdate }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @keyup="filterCallback()"
              class="p-column-filter"
              :placeholder="`Search by distinct date - `"
            />
          </template>
        </Column>
        <Column field="ward" header="Ward" style="min-width: 12rem">
          <template #body="{ data }">
            {{ data.ward }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="billWards"
              placeholder="Any"
              class="p-column-filter"
              :showClear="true"
            >
              <template #value="slotProps">
                <span
                  :class="'customer-badge status-' + slotProps.value"
                  v-if="slotProps.value"
                  >{{ slotProps.value }}</span
                >
                <span v-else>{{ slotProps.placeholder }}</span>
              </template>
              <template #option="slotProps">
                <span :class="'customer-badge status-' + slotProps.option">{{
                  slotProps.option
                }}</span>
              </template>
            </Dropdown>
          </template>
        </Column>

        <Column
          field="status"
          header="Status"
          :showFilterMenu="false"
          style="min-width: 12rem"
        >
          <template #body="{ data }">
            <span :class="'customer-badge status-' + data.status">
              {{ data.status }}
            </span>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Dropdown
              v-model="filterModel.value"
              @change="filterCallback()"
              :options="billStatuses"
              placeholder="Any"
              class="p-column-filter"
              :showClear="true"
            >
              <template #value="slotProps">
                <span
                  :class="'customer-badge status-' + slotProps.value"
                  v-if="slotProps.value"
                  >{{ slotProps.value }}</span
                >
                <span v-else>{{ slotProps.placeholder }}</span>
              </template>
              <template #option="slotProps">
                <span :class="'customer-badge status-' + slotProps.option">{{
                  slotProps.option
                }}</span>
              </template>
            </Dropdown>
          </template>
        </Column>
        <Column
          field="verified"
          header="Verified"
          dataType="boolean"
          style="min-width: 6rem"
        >
          <template #body="{ data }">
            <i
              class="pi"
              :class="{
                'true-icon pi-check-circle': data.verified,
                'false-icon pi-times-circle': !data.verified,
              }"
            ></i>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <TriStateCheckbox
              v-model="filterModel.value"
              @change="filterCallback()"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
// import CustomerService from "../service/CustomerService";
import BillingService from "../service/BillingService";
import { FilterMatchMode, FilterOperator } from "primevue/api";

export default {
  setup() {
    onMounted(() => {
      // customerService.value.getCustomersLarge().then((data) => {
      //   customers1.value = data;
      //   loading1.value = false;
      //   customers1.value.forEach(
      //     (customer) => (customer.date = new Date(customer.date))
      //   );
      // });

      billingService.value.getBills().then((data) => {
        bills.value = data;
        loading2.value = false;
        billStatuses.value = Array.from(
          new Set(bills.value.map((item) => item.status))
        );
        billWards.value = Array.from(
          new Set(bills.value.map((item) => item.ward))
        ).sort();

        // customers2.value.forEach(
        //   (customer) => (customer.date = new Date(customer.date))
        // );
      });
    });

    const customers1 = ref(null);
    const customers2 = ref(null);
    const bills = ref(null);
    const billStatuses = ref(null);
    const billWards = ref(null);
    // const customerService = ref(new CustomerService());
    const billingService = ref(new BillingService());
    const filters1 = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      "country.name": {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      representative: { value: null, matchMode: FilterMatchMode.IN },
      date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      balance: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      status: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
      },
      activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
      verified: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const filters2 = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      representative: { value: null, matchMode: FilterMatchMode.IN },
      status: { value: null, matchMode: FilterMatchMode.EQUALS },
      hpercode: { value: null, matchMode: FilterMatchMode.CONTAINS },
      patient: { value: null, matchMode: FilterMatchMode.CONTAINS },
      ward: { value: null, matchMode: FilterMatchMode.CONTAINS },
      admdate: { value: null, matchMode: FilterMatchMode.CONTAINS },
      verified: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const representatives = ref([
      { name: "Amy Elsner", image: "amyelsner.png" },
      { name: "Anna Fali", image: "annafali.png" },
      { name: "Asiya Javayant", image: "asiyajavayant.png" },
      { name: "Bernardo Dominic", image: "bernardodominic.png" },
      { name: "Elwin Sharvill", image: "elwinsharvill.png" },
      { name: "Ioni Bowcher", image: "ionibowcher.png" },
      { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
      { name: "Onyama Limba", image: "onyamalimba.png" },
      { name: "Stephen Shaw", image: "stephenshaw.png" },
      { name: "XuXue Feng", image: "xuxuefeng.png" },
    ]);
    const statuses = ref([
      "unqualified",
      "qualified",
      "new",
      "negotiation",
      "renewal",
      "proposal",
    ]);
    const loading1 = ref(true);
    const loading2 = ref(true);

    const formatDate = (value) => {
      return value.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    };
    const formatCurrency = (value) => {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    };
    const clearFilter1 = () => {
      initFilters1();
    };
    const initFilters1 = () => {
      filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        "country.name": {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
        balance: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        status: {
          operator: FilterOperator.OR,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS },
      };
    };

    return {
      customers1,
      customers2,
      bills,
      billStatuses,
      billWards,
      filters1,
      filters2,
      representatives,
      statuses,
      loading1,
      loading2,
      formatDate,
      formatCurrency,
      clearFilter1,
      initFilters1,
    };
  },
};
</script>

<style scoped lang="scss">
@import "../assets/demo/badges.scss";

::v-deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>
