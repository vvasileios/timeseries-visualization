<template>
  <div class="bg-white min-h-screen">
    <header
      class="h-14 shadow-xl border-b-2 w-full flex items-center justify-center"
    >
      <a>
        <img class="h-8" src="/assets/stellarblue-logo.png" alt="logo" />
      </a>
    </header>

    <main class="">
      <DataTable :data-sets="dataSets" />
      <LineChart />
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
