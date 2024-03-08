<template>
  <div class="min-h-screen">
    <header
      class="h-14 bg-white shadow-xl border-b-2 min-w-full flex items-center justify-center sticky top-0 z-50"
    >
      <a>
        <img class="h-8" src="/assets/stellarblue-logo.png" alt="logo" />
      </a>
    </header>

    <main class="flex flex-col-reverse lg:flex-row">
      <div class="w-full lg:w-1/2 p-4">
        <DataTable class="md:w-full" />
      </div>

      <div class="w-full lg:w-1/2 p-4 lg:mt-4">
        <LineChart class="md:w-full" />
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
};
</script>
