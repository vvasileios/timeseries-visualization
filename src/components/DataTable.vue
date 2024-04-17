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

    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-100 border-b">
        <tr>
          <!-- <th :class="[headerStyles]">
            <CheckBox
              :is-activated="isHeaderCheckBoxActivated"
              @update="toggleAllCheckBoxes"
            />
          </th> -->
          <th
            v-for="(header, index) in headerItems"
            :key="index"
            :class="[headerStyles]"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in data"
          :key="index"
          :class="[
            isSelected(item) ? 'opacity-50' : 'hover:opacity-70',
            'border-b',
            'hover:cursor-pointer',
          ]"
          @click="toggleRowSelection(item)"
        >
          <!-- <td :class="[dataStyles]">
            <CheckBox
              :is-activated="isSelected(item)"
              @update="(value) => toggleRowSelection(value, item)"
            />
          </td> -->
          <td :class="[dataStyles]">
            {{ formatDate(item.date) }}
          </td>
          <td :class="[dataStyles]">
            {{ item.time }}
          </td>
          <td :class="[dataStyles]">
            {{ item.ENTSOE_DE_DAM_Price }}
          </td>
          <td :class="[dataStyles]">
            {{ item.ENTSOE_GR_DAM_Price }}
          </td>
          <td :class="[dataStyles]">
            {{ item.ENTSOE_FR_DAM_Price }}
          </td>
        </tr>
      </tbody>
    </table>
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

<script>
import { mapGetters } from "vuex";
import CheckBox from "./CheckBox.vue";
import DatePicker from "./DatePicker.vue";
import moment from "moment";

export default {
  name: "DataTable",
  components: {
    CheckBox,
    DatePicker,
  },

  data() {
    return {
      headerItems: ["Date", "Time", "Germany (€)", "Greece (€)", "France (€)"],
      headerStyles: "px-4 py-3 select-none",
      dataStyles: "px-4 py-3 font-medium text-gray-900 select-none",
    };
  },

  computed: {
    ...mapGetters({
      data: "getDataSets",
      itemsPerPage: "getItemsPerPage",
      currentPage: "getCurrentPage",
      selectedDate: "getSelectedDate",
      selectedBoxes: "getSelectedCheckBoxes",
      selectedDate: "getSelectedDate",
    }),

    isFirstPage() {
      return this.currentPage === 0;
    },

    isLastPage() {
      return (
        this.currentPage ===
        this.$store.state.dataSets.length / this.itemsPerPage - 1
      );
    },

    isHeaderCheckBoxActivated() {
      return this.selectedBoxes.length === this.data.length;
    },
  },

  methods: {
    formatDate(date) {
      return moment(date).format("MMM Do YY");
    },

    loadPreviousData() {
      this.$store.commit("SET_CURRENT_PAGE", this.$store.state.currentPage - 1);
      this.$store.commit("SET_SELECTED_CHECKBOXES", []);
    },

    loadNextData() {
      this.$store.commit("SET_CURRENT_PAGE", this.$store.state.currentPage + 1);
      this.$store.commit("SET_SELECTED_CHECKBOXES", []);
    },

    isSelected(item) {
      return this.selectedBoxes.includes(item);
    },

    toggleAllCheckBoxes(value) {
      if (value) {
        this.$store.commit("SET_SELECTED_CHECKBOXES", this.data);
      } else {
        this.$store.commit("SET_SELECTED_CHECKBOXES", []);
      }
    },

    toggleRowSelection(item) {
      if (!this.isSelected(item)) {
        this.$store.commit("SET_SELECTED_CHECKBOXES", [
          ...this.selectedBoxes,
          item,
        ]);
      } else {
        this.$store.commit("REMOVE_SELECTED_CHECKBOX", item);
      }
    },

    clearSelectedData() {
      this.$store.commit("SET_SELECTED_CHECKBOXES", []);
      this.$store.commit("SET_INITIAL_STATE");
    },
  },
};
</script>
