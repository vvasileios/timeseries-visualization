<template>
  <div class="container mx-auto mt-36 sticky top-16">
    <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueApexCharts from "vue3-apexcharts";
import moment from "moment";

export default {
  components: {
    apexchart: VueApexCharts,
  },

  computed: {
    ...mapGetters({
      filteredData: "getFilteredData",
      selectedDate: "getSelectedDate",
    }),

    series() {
      return [
        { name: "Germany Price", data: this.priceDE() },
        { name: "Greece Price", data: this.priceGR() },
        { name: "France Price", data: this.priceFR() },
      ];
    },

    chartOptions() {
      return {
        chart: { id: "linechart" },
        xaxis: { categories: this.timeOfPrices() },
      };
    },
  },

  methods: {
    priceDE() {
      return this.filteredData.map((data) => data.ENTSOE_DE_DAM_Price);
    },

    priceGR() {
      return this.filteredData.map((data) => data.ENTSOE_GR_DAM_Price);
    },

    priceFR() {
      return this.filteredData.map((data) => data.ENTSOE_FR_DAM_Price);
    },

    timeOfPrices() {
      if (!this.selectedDate) {
        return this.filteredData.map((data) =>
          moment(data.DateTime).format("LT")
        );
      }
    },
  },
};
</script>
