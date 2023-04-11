<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Patient Bill Management</h5>
        <div>{{ this.listStatuses }}</div>
        <div>{{ this.listWards }}</div>
        <DataTable
          :value="bills"
          :paginator="true"
          class="p-datatable-gridlines"
          :rows="12"
          dataKey="id"
          :rowHover="true"
          v-model:filters="filters1"
          filterDisplay="menu"
          :loading="loading1"
          :filters="filters1"
          responsiveLayout="scroll"
          :globalFilterFields="[
            'hpercode',
            'patient',
            'ward',
            'tadesc',
            'status',
            'patlast',
            'patfirst',
          ]"
        >
          <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <Button
                type="button"
                icon="pi pi-filter-slash"
                label="Clear"
                class="p-button-outlined mb-2"
                @click="clearFilter1()"
              />
              <span class="p-input-icon-left mb-2">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters1['global'].value"
                  placeholder="Keyword Search"
                  style="width: 100%"
                />
              </span>
            </div>
          </template>
          <template #empty> No bills found. </template>
          <template #loading> Loading bills data. Please wait. </template>
          <!-- <Column field="hpercode" header="Hospital #" style="min-width: 12rem"> -->
          <!-- <Column field="hpercode" header="Hospital #" style="width: 5rem">
            <template #body="{ data }">
              {{ data.hpercode }}
            </template>
          </Column> -->
          <Column field="hpercode" header="Hospital #" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.hpercode }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @keydown.enter="filterCallback()"
                class="p-column-filter"
                :placeholder="`Search by name - `"
                v-tooltip.top.focus="'Hit enter key to filter'"
              />
            </template>
          </Column>
          <Column field="patient" header="Patient" style="width: 25rem">
            <template #body="{ data }">
              {{ data.patient }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search by name"
              />
            </template>
          </Column>
          <Column field="ward" header="Ward" style="width: 25rem">
            <template #body="{ data }">
              {{ data.ward }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search by name"
              />
            </template>
          </Column>
          <Column field="admdate" header="Admission Date" style="width: 15rem">
            <template #body="{ data }">
              {{ data.admdate }}
            </template>
          </Column>
          <Column field="tadesc" header="Type" style="width: 5rem">
            <template #body="{ data }">
              <!-- <Tag severity="success" rounded v-tooltip.top="'test'"> -->
              {{ data.tadesc }}
              <!-- </Tag> -->
            </template>
            <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search by name"
              />
            </template>
          </Column>
          <Column field="status" header="Status" style="width: 10rem">
            <template #body="{ data }">
              {{ data.status }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <Dropdown
                v-model="filterModel.value"
                @change="filterCallback()"
                :options="filters2.billStatuses"
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
          <Column field="" header="Action" style="min-width: 5rem">
            <!-- <template #body="{ data }"> -->

            <!-- </template> -->
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode, FilterOperator } from "primevue/api";
// import CustomerService from "../service/CustomerService";
// import ProductService from "../service/ProductService";
import BillingService from "../service/BillingService";
export default {
  data() {
    return {
      customer1: null,
      customer2: null,
      customer3: null,
      filters1: null,
      // filters2: {},
      filters2: {
        billStatuses: { value: null, matchMode: FilterMatchMode.EQUALS },
      },
      loading1: true,
      loading2: true,
      idFrozen: false,
      products: null,
      bills: null,
      listStatuses: null,
      listTaDescs: null,
      listWards: null,
      expandedRows: [],
      statuses: [
        "unqualified",
        "qualified",
        "new",
        "negotiation",
        "renewal",
        "proposal",
      ],
      representatives: [
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
      ],
    };
  },

  billingService: null,
  created() {
    this.billingService = new BillingService();
    this.initFilters1();
  },
  mounted() {
    this.billingService.getBills().then((data) => {
      this.bills = data;
      this.listStatuses = this.getStasuses(this.bills);
      this.listWards = Array.from(
        new Set(data.map((item) => item.ward))
      ).sort();
      this.loading1 = false;
    });

    // this.getStasuses(this.bills);
  },
  methods: {
    retrieveBills() {
      this.billingService.getBills().then((data) => {
        this.bills = data;
        this.loading1 = false;
      });
    },
    getStasuses(bills) {
      // console.log(bills);
      // const $unique = [...new Set(bills.map((item) => item.status))];
      //  const $unique = Array.from(new Set(bills.map((item) => item.status)));

      // console.log($unique);
      // return $unique;
      return Array.from(new Set(bills.map((item) => item.status)));
    },
    initFilters1() {
      this.filters1 = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        patient: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        ward: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        tadesc: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        status: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        billStatuses: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },

        hpercode: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        // tadesc: { value: null, matchMode: FilterMatchMode.EQUALS },
        // status: { value: null, matchMode: FilterMatchMode.EQUALS },
        // ward: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
    clearFilter1() {
      this.initFilters1();
    },
    expandAll() {
      this.expandedRows = this.products.filter((p) => p.id);
    },
    collapseAll() {
      this.expandedRows = null;
    },
    formatCurrency(value) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
    formatDate(value) {
      return value.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },
    calculateCustomerTotal(name) {
      let total = 0;
      if (this.customer3) {
        for (let customer of this.customer3) {
          if (customer.representative.name === name) {
            total++;
          }
        }
      }

      return total;
    },
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
