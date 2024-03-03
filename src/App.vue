<template>
  <div class="p-8 bg-gray-200 min-h-screen">
    <DataTable :data-sets="dataSets" /> 
  </div>
</template>

<script>
// import axios from "axios";
import DataTable from "./components/DataTable.vue";
import timeseries from "/timeseries.json"

export default {
  components: {
    DataTable
  },

  data() {
    return {
      dataSets: timeseries 
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
