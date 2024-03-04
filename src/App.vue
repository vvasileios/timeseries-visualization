<template>
  <div class="bg-white min-h-screen">
    <header class="h-14 shadow-xl border-b-2 w-full flex items-center justify-center">
      <a>
        <img class="h-8" src="/assets/stellarblue-logo.png" alt="logo">
      </a>
    </header>
    
    <main class="">
      <DataTable :data-sets="dataSets" />
    </main>
  </div>
</template>

<script>
// import axios from "axios";
import DataTable from "./components/DataTable.vue";
import timeSeries from "/timeseries.json"

export default {
  components: {
    DataTable
  },

  data() {
    return {
      dataSets: timeSeries 
    };
  },

  // mounted() {
  //   axios.get("/timeseries.json").then(response => {
  //     console.log(response)
  //     this.dataSets = response.data;
  //     console.log(this.dataSets)
  //   }).catch(error => {
  //     console.error("Error fetching data:", error);
  //   });
  // }
};
</script>
