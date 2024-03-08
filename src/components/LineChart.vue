<template>
  <div class="mt-36 sticky top-24">
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

  data() {
    return {
      chartData: [],
    };
  },

  computed: {
    ...mapGetters({
      filteredData: "getFilteredData",
      selectedDate: "getSelectedDate",
      selectedBoxes: "getSelectedCheckBoxes",
    }),

    series() {
      return [
        { name: "German Price", data: this.priceDE() },
        { name: "Greek Price", data: this.priceGR() },
        { name: "France Price", data: this.priceFR() },
      ];
    },

    chartOptions() {
      return {
        chart: { id: "linechart" },
        xaxis: this.xAxisFormat(),
        title: {
          text: "Price Comparison",
          align: "center",
          margin: 10,
          style: {
            fontSize: "18px",
          },
        },
      };
    },
  },

  watch: {
    filteredData: {
      handler(newVal) {
        if (newVal) {
          this.chartData = newVal;
        }
      },
      immediate: true,
    },

    selectedBoxes: {
      handler(newVal) {
        if (newVal) {
          this.chartData = this.filteredData.filter((data) =>
            newVal.every(
              (selectedBox) =>
                moment(data.DateTime).format("DD/MM/YY") !==
                  moment(selectedBox.DateTime).format("DD/MM/YY") ||
                moment(data.DateTime).format("LT") !==
                  moment(selectedBox.DateTime).format("LT")
            )
          );
        }
      },
      immediate: true,
    },
  },

  methods: {
    priceDE() {
      return this.chartData.map((data) => data.ENTSOE_DE_DAM_Price);
    },

    priceGR() {
      return this.chartData.map((data) => data.ENTSOE_GR_DAM_Price);
    },

    priceFR() {
      return this.chartData.map((data) => data.ENTSOE_FR_DAM_Price);
    },

    xAxisFormat() {
      const format = !this.selectedDate ? "LT" : "DD/MM";
      const categories = this.chartData.map((data) =>
        moment(data.DateTime).format(format)
      );

      const uniqueDatesCount =
        format !== "LT" ? new Set(categories).size : undefined;

      return {
        categories: categories,
        tickAmount: uniqueDatesCount,
      };
    },
  },
};
</script>
