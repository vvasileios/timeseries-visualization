<template>
  <div class="container mx-auto mt-36">
    <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import moment from "moment";
import ApexCharts from "apexcharts";
import timeSeries from "/timeseries.json";

export default {
  components: {
    ApexCharts,
  },

  data() {
    return {
      dataSets: [],
      chartOptions: {},
      series: [],
    };
  },

  mounted() {
    this.dataSets = timeSeries;
    this.chartOptions = {
      chart: {
        id: "linechart",
      },
      xaxis: {
        categories: this.datesForPrices(),
      },
    };
    this.series = [
      {
        name: "Germany Price",
        data: this.priceDE(),
      },
      {
        name: "Greece Price",
        data: this.priceGR(),
      },
      {
        name: "France Price",
        data: this.priceFR(),
      },
    ];
  },

  methods: {
    priceDE() {
      return this.dataSets.map((data) => {
        return data.ENTSOE_DE_DAM_Price;
      });
    },

    priceGR() {
      return this.dataSets.map((data) => {
        return data.ENTSOE_GR_DAM_Price;
      });
    },

    priceFR() {
      return this.dataSets.map((data) => {
        return data.ENTSOE_FR_DAM_Price;
      });
    },

    datesForPrices() {
      return this.dataSets.map((data) => {
        return moment(data.DateTime).format("DD/MM");
      });
    },
  },
};
</script>
