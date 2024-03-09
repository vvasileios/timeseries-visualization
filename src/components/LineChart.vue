<template>
  <div class="mt-36 sticky top-24">
    <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "LineChart",

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
      data: "getDataSets",
      selectedDate: "getSelectedDate",
      dateComparison: "getDateComparison",
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
    data: {
      handler(newVal) {
        if (newVal) {
          this.chartData = newVal;
        }
      },
    },

    selectedBoxes: {
      handler(newVal) {
        if (newVal) {
          this.chartData = this.data.filter((item) => {
            return newVal.every((value) => {
              return item.date !== value.date || item.time !== value.time;
            });
          });
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
      const format = (item) =>
        this.selectedDate && !this.dateComparison ? item.date : item.time;
      const categories = this.chartData.map((data) => format(data));

      const uniqueDatesCount = this.selectedDate
        ? new Set(categories).size - 1
        : undefined;

      return {
        categories: categories,
        tickAmount: uniqueDatesCount,
      };
    },
  },
};
</script>
