<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import CheckBox from "./shared/CheckBox.vue";
import DatePicker from "./DatePicker.vue";
import TableComp from "./shared/TableComp.vue";

const headerItems = ref([
  "Date",
  "Time",
  "Germany (€)",
  "Greece (€)",
  "France (€)",
]);

const store = useStore();

const data = computed(() => store.getters.getDataSets);
const itemsPerPage = computed(() => store.getters.getItemsPerPage);
const currentPage = computed(() => store.getters.getCurrentPage);
const selectedDate = computed(() => store.getters.getSelectedDate);
const selectedBoxes = computed(() => store.getters.getSelectedCheckBoxes);

const isFirstPage = computed(() => currentPage === 0);

const isLastPage = computed(
  () => currentPage === store.state.dataSets.length / itemsPerPage - 1
);

const isHeaderCheckBoxActivated = computed(
  () => selectedBoxes.value.length === data.length
);

const loadPreviousData = () => {
  store.commit("SET_CURRENT_PAGE", store.state.currentPage - 1);
  store.commit("SET_SELECTED_CHECKBOXES", []);
};

const loadNextData = () => {
  store.commit("SET_CURRENT_PAGE", store.state.currentPage + 1);
  store.commit("SET_SELECTED_CHECKBOXES", []);
};

const isSelected = (item) => selectedBoxes.value.includes(item);

const toggleAllCheckBoxes = (value) => {
  if (value) {
    store.commit("SET_SELECTED_CHECKBOXES", data);
  } else {
    store.commit("SET_SELECTED_CHECKBOXES", []);
  }
};

const toggleRowSelection = (item) => {
  if (!isSelected(item)) {
    store.commit("SET_SELECTED_CHECKBOXES", [...selectedBoxes.value, item]);
  } else {
    store.commit("REMOVE_SELECTED_CHECKBOX", item);
  }
};

const clearSelectedData = () => {
  store.commit("SET_SELECTED_CHECKBOXES", []);
  store.commit("SET_INITIAL_STATE");
};
</script>

<template>
  <div class="border rounded-lg mt-10 overflow-x-auto">
    <div
      class="w-full min-w-[435.5px] pl-3 py-3 flex flex-row justify-between bg-gray-100"
    >
      <DatePicker />
      <button
        v-if="selectedBoxes.length > 0 || selectedDate"
        class="bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold px-2 mr-4 rounded"
        @click="clearSelectedData"
      >
        Clear
      </button>
    </div>

    <TableComp :header-data="headerItems" :body-data="data" />

    <div
      v-if="!selectedDate"
      class="w-full min-w-[435.5px] flex justify-between p-1"
    >
      <button
        class="ml-4 hover:underline cursor-pointer select-none font-semibold"
        :class="{
          'cursor-not-allowed pointer-events-none opacity-50 select-none':
            isFirstPage,
        }"
        @click="loadPreviousData"
      >
        Previous
      </button>
      <button
        class="mr-4 hover:underline cursor-pointer select-none font-semibold"
        :class="{
          'cursor-not-allowed pointer-events-none opacity-50 select-none':
            isLastPage,
        }"
        @click="loadNextData"
      >
        Next
      </button>
    </div>
  </div>
</template>
