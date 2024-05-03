<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const store = useStore();

const selectedDate = ref(store.state.selectedDate);

const data = computed(() => store.getters.getDataSets);

const minDate = computed(() => getDate("min"));

const maxDate = computed(() => getDate());

const getDate = (value) => {
  const dataSets = store.state.dataSets;

  if (!dataSets || dataSets.length === 0) return null;

  if (value === "min") return dataSets[0].date;

  return dataSets[dataSets.length - 1].date;
};

const clearData = () => {
  store.commit("SET_INITIAL_STATE");
};

watch(
  () => store.state.selectedDate,
  (newValue) => {
    selectedDate.value = newValue;
  }
);

watch(selectedDate, (newValue) => {
  console.log("selectedDate", newValue);
  store.commit("SET_SELECTED_CHECKBOXES", []);
  store.commit("SET_SELECTED_DATE", newValue);
});
</script>

<template>
  <div class="w-64">
    <vue-date-picker
      v-model="selectedDate"
      :enable-time-picker="false"
      :min-date="minDate"
      :max-date="maxDate"
      :start-date="minDate"
      range
      auto-apply
      placeholder="Select Date"
      @cleared="clearData"
    ></vue-date-picker>
  </div>
</template>
