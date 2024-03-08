<template>
  <div class="min-h-screen">
    <header
      class="h-14 bg-white shadow-xl border-b-2 min-w-[500px] flex items-center justify-center sticky top-0 z-50"
    >
      <a>
        <img class="h-8" src="/assets/stellarblue-logo.png" alt="logo" />
      </a>
    </header>

    <main class="flex flex-col-reverse md:flex-row">
      <div class="w-full md:w-1/2 p-4">
        <DataTable />
      </div>

      <div class="w-full md:w-1/2 p-4 md:mt-4">
        <LineChart />
      </div>
    </main>
  </div>
</template>

<script>
import DataTable from "./components/DataTable.vue";
import LineChart from "./components/LineChart.vue";

export default {
  components: {
    DataTable,
    LineChart,
  },

  created() {
    this.$store.dispatch("loadData");
  },
};
</script>
