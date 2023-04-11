<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Guarantee Letter Management</h5>
        <PatientSearch />
        <DataTable
          :value="customer1"
          :paginator="true"
          class="p-datatable-gridlines"
          :rows="10"
          dataKey="id"
          :rowHover="true"
          v-model:filters="filters1"
          filterDisplay="menu"
          :loading="loading1"
          :filters="filters1"
          responsiveLayout="scroll"
          :globalFilterFields="[
            // 'hpercode',
            // 'name',
            // 'country.name',
            // 'representative.name',
            // 'balance',
            // 'status',
          ]"
        >
          <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
              <Button
                type="button"
                icon="pi pi-search"
                label="Patient Search"
                class="p-button-outlined mb-2"
                @click="showSearch()"
              />
              <!-- <span class="p-input-icon-left mb-2">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters1['global'].value"
                  placeholder="Hospital Number"
                />
              </span> -->
              <DynamicDialog />
            </div>
          </template>
          <template #empty> No customers found. </template>
          <template #loading> Loading customers data. Please wait. </template>
          <Column
            field="ctrlno"
            header="Control #"
            style="min-width: 12rem"
            :sortable="true"
          >
            <!-- <template #body="{ data }"> -->
            <template #body="{}">
              <!-- {{ data.name }} -->
            </template>
            <!-- <template #filter="{ filterModel }">
              <InputText
                type="text"
                v-model="filterModel.value"
                class="p-column-filter"
                placeholder="Search by name"
              />
            </template> -->
          </Column>
          <!-- <Column
            field="funddesc"
            header="Fund Source"
            style="min-width: 12rem"
          >
            <template #body="{ data }">
              {{ data.name }}
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

          <Column
            header="Reference Date"
            filterField="refdate"
            dataType="date"
            style="min-width: 10rem"
          >
            <template #body="{ data }">
              {{ formatDate(data.date) }}
            </template>
            <template #filter="{ filterModel }">
              <Calendar
                v-model="filterModel.value"
                dateFormat="mm/dd/yy"
                placeholder="mm/dd/yyyy"
              />
            </template>
          </Column>
          <Column
            header="Purpose"
            filterField="purpose"
            dataType="date"
            style="min-width: 10rem"
          >
            <template #body="{ data }">
              {{ formatDate(data.date) }}
            </template>
            <template #filter="{ filterModel }">
              <Calendar
                v-model="filterModel.value"
                dateFormat="mm/dd/yy"
                placeholder="mm/dd/yyyy"
              />
            </template>
          </Column>
          <Column
            header="Mapped Amount"
            filterField="mAmt"
            dataType="numeric"
            style="min-width: 10rem"
          >
            <template #body="{ data }">
              {{ formatCurrency(data.balance) }}
            </template>
            <template #filter="{ filterModel }">
              <InputNumber
                v-model="filterModel.value"
                mode="currency"
                currency="USD"
                locale="en-US"
              />
            </template>
          </Column>
          <Column
            header="Balance"
            filterField="balance"
            dataType="numeric"
            style="min-width: 10rem"
          >
            <template #body="{ data }">
              {{ formatCurrency(data.balance) }}
            </template>
            <template #filter="{ filterModel }">
              <InputNumber
                v-model="filterModel.value"
                mode="currency"
                currency="USD"
                locale="en-US"
              />
            </template>
          </Column>
          <Column
            field="balance"
            header="Status"
            :filterMenuStyle="{ width: '14rem' }"
            style="min-width: 12rem"
          >
            <template #body="{ data }">
              <span :class="'customer-badge status-' + data.status">{{
                data.status
              }}</span>
            </template>
            <template #filter="{ filterModel }">
              <Dropdown
                v-model="filterModel.value"
                :options="statuses"
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
            field="activity"
            header="Activity"
            :showFilterMatchModes="false"
            style="min-width: 12rem"
          >
            <template #body="{ data }">
              <ProgressBar
                :value="data.activity"
                :showValue="false"
                style="height: 0.5rem"
              ></ProgressBar>
            </template>
            <template #filter="{ filterModel }">
              <Slider v-model="filterModel.value" range class="m-3"></Slider>
              <div class="flex align-items-center justify-content-between px-2">
                <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
                <span>{{
                  filterModel.value ? filterModel.value[1] : 100
                }}</span>
              </div>
            </template>
          </Column>
          <Column
            field="verified"
            header="Verified"
            dataType="boolean"
            bodyClass="text-center"
            style="min-width: 8rem"
          >
            <template #body="{ data }">
              <i
                class="pi"
                :class="{
                  'text-green-500 pi-check-circle': data.verified,
                  'text-pink-500 pi-times-circle': !data.verified,
                }"
              ></i>
            </template>
            <template #filter="{ filterModel }">
              <TriStateCheckbox v-model="filterModel.value" />
            </template>
          </Column> -->
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import { FilterMatchMode, FilterOperator } from "primevue/api";
import CustomerService from "../service/CustomerService";
import ProductService from "../service/ProductService";
// import { useDialog } from "primevue/usedialog";
import FormLayoutDemo from "../components/FormLayoutDemo.vue";
// import { useToast } from "primevue/usetoast";
// import DynamicDialog from "primevue/dynamicdialog";
import { h } from "vue";
// const dialogRef = this.$dialog;
import Button from "primevue/button";
export default {
  data() {
    return {
      customer1: null,
      customer2: null,
      customer3: null,
      filters1: null,
      filters2: {},
      loading1: true,
      loading2: true,
      idFrozen: false,
      products: null,
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
  customerService: null,
  productService: null,
  created() {
    this.customerService = new CustomerService();
    this.productService = new ProductService();
    this.initFilters1();
  },
  mounted() {
    this.productService
      .getProductsWithOrdersSmall()
      .then((data) => (this.products = data));
    this.customerService.getCustomersLarge().then((data) => {
      this.customer1 = data;
      this.loading1 = false;
      this.customer1.forEach(
        (customer) => (customer.date = new Date(customer.date))
      );
    });
    this.customerService
      .getCustomersLarge()
      .then((data) => (this.customer2 = data));
    this.customerService
      .getCustomersMedium()
      .then((data) => (this.customer3 = data));
    this.loading2 = false;
  },
  methods: {
    showSearch() {
      console.log("Show Search");
      window.open(
        "http://192.168.7.66:8000/ReportServer?/BGH%20Reports%20Server/MALASAKIT_Cover_Page&enccode=ADM1108373Oct232022060129&rc:Parameters=false&rc:Toolbar=false"
      );
      const dialogRef = this.$dialog.open(FormLayoutDemo, {
        props: {
          header: "Product List",
          style: {
            width: "50vw",
          },
          breakpoints: {
            "960px": "75vw",
            "640px": "90vw",
          },
          modal: true,
        },
        templates: {
          footer: () => {
            return [
              h(Button, {
                label: "No",
                icon: "pi pi-times",
                onClick: () => dialogRef.close({ buttonType: "No" }),
                class: "p-button-text",
              }),
              h(Button, {
                label: "Yes",
                icon: "pi pi-check",
                onClick: () => dialogRef.close({ buttonType: "Yes" }),
                autofocus: true,
              }),
            ];
          },
        },
        onClose: (options) => {
          const data = options.data;
          if (data) {
            const buttonType = data.buttonType;
            const summary_and_detail = buttonType
              ? {
                  summary: "No Product Selected",
                  detail: `Pressed '${buttonType}' button`,
                }
              : { summary: "Product Selected", detail: data.name };

            this.$toast.add({
              severity: "info",
              ...summary_and_detail,
              life: 3000,
            });
          }
        },
      });
      // const dialog = useDialog();
      // dialog.open(FormLayoutDemo, {});
      // return dialogRef;
    },
    initFilters1() {
      this.filters1 = {
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
