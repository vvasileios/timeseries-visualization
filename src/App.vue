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
        <DataTable :data-sets="dataSets" />
      </div>

      <div class="w-1/2 p-4">
        <LineChart />
      </div>
    </main>
  </div>
</template>

<script>
import DataTable from "./components/DataTable.vue";
import LineChart from "./components/LineChart.vue";
import timeSeries from "/timeseries.json";

export default {
  components: {
    DataTable,
    LineChart,
  },

  data() {
    return {
      dataSets: timeSeries,
    };
  },

  methods: {},

  mounted() {},
};
</script>
