<template>
  <div class="min-h-screen">
    <header
      class="h-14 bg-white shadow-xl border-b-2 w-full flex items-center justify-center sticky top-0 z-50"
    >
      <a>
        <img class="h-8" src="/assets/stellarblue-logo.png" alt="logo" />
      </a>
    </header>

    <main class="flex flex-grow">
      <div class="w-1/2 p-4">
        <VueDatePicker />
        <DataTable />
      </div>

      <div class="w-1/2 p-4">
        <LineChart />
      </div>
    </main>
  </div>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import DataTable from "./components/DataTable.vue";
import LineChart from "./components/LineChart.vue";

export default {
  components: {
    DataTable,
    LineChart,
    VueDatePicker,
  },

  created() {
    this.$store.dispatch("loadData");
  },
};
</script>
