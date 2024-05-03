<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import CheckBox from "./shared/CheckBox.vue";
import DatePicker from "./DatePicker.vue";
import TableComp from "./shared/TableComp.vue";
import PaginationControl from "./shared/PaginationControl.vue";

const headerItems = ref([
  "Date",
  "Time",
  "Germany (€)",
  "Greece (€)",
  "France (€)",
]);

const store = useStore();

const data = computed(() => store.getters.getDataSets);
const selectedDate = computed(() => store.getters.getSelectedDate);
const selectedBoxes = computed(() => store.getters.getSelectedCheckBoxes);

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

const isFirstPage = computed(() => store.state.currentPage === 0);
const isLastPage = computed(
  () =>
    store.state.currentPage ===
    store.state.dataSets.length / store.state.itemsPerPage - 1
);

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

    <PaginationControl
      v-if="!selectedDate"
      :is-first-page="isFirstPage"
      :is-last-page="isLastPage"
      @prev="loadPreviousData"
      @next="loadNextData"
    />
  </div>
</template>
