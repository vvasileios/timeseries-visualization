<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { timeFormatter, dateFormatter } from "../utils/formatter";
import apexchart from "vue3-apexcharts";

const chartData = ref([]);

const store = useStore();

const data = computed(() => store.getters.getDataSets);
const selectedDate = computed(() => store.getters.getSelectedDate);
const dateComparison = computed(() => store.getters.getDateComparison);
const selectedColumns = computed(() => store.getters.getSelectedColumn);

const series = computed(() => {
  return [
    { name: "German Price", data: priceDE() },
    { name: "Greek Price", data: priceGR() },
    { name: "France Price", data: priceFR() },
  ];
});

const chartOptions = computed(() => {
  return {
    chart: {
      id: "linechart",
      width: "100%",
      height: "100%",
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            type: "bar",
            width: "100%",
            height: "100%",
            toolbar: {
              show: false,
            },
          },
          title: {
            align: "center",
            margin: 5,
            style: {
              fontSize: "10px",
            },
          },
          yaxis: {
            title: {
              text: "Temperature",
              style: {
                fontSize: "8px",
              },
            },
          },
        },
      },
    ],
    xaxis: xAxisFormat(),
    title: {
      text: "Price Comparison",
      align: "left",
      margin: 10,
      style: {
        fontSize: "20px",
      },
    },
  };
});

watch(data, (newValue) => {
  if (newValue) {
    chartData.value = newValue;
  }
});

watch(
  selectedColumns,
  (newValue) => {
    if (newValue) {
      chartData.value = data.value.map((item) => {
        const newItem = { ...item };
        Object.keys(newItem).forEach((key) => {
          if (newValue.includes(key.toString())) {
            delete newItem[key];
          } else {
            newItem[key] = Number(newItem[key]);
          }
        });
        return newItem;
      });
    }
  },
  { immediate: true, deep: true }
);

const priceDE = () => chartData.value.map((data) => data.ENTSOE_DE_DAM_Price);

const priceGR = () => chartData.value.map((data) => data.ENTSOE_GR_DAM_Price);

const priceFR = () => chartData.value.map((data) => data.ENTSOE_FR_DAM_Price);

const xAxisFormat = () => {
  const format = (item) =>
    selectedDate && !dateComparison
      ? dateFormatter(item.DateTime)
      : timeFormatter(item.DateTime);

  const categories = chartData.value.map((data) => format(data));

  const uniqueDatesCount = selectedDate.value
    ? new Set(categories).size - 1
    : undefined;

  return {
    categories: categories,
    tickAmount: uniqueDatesCount,
  };
};
</script>

<template>
  <div class="mt-36 sticky top-24">
    <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>
