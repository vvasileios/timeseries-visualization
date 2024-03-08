<template>
  <div class="bg-white border rounded-lg mt-10 min-w-[480px]">
    <div class="bg-gray-100 min-w-[480px] pl-3 py-3">
      <DatePicker />
    </div>

    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-100 border-b">
        <tr>
          <th :class="[headerStyles]">
            <CheckBox
              :is-activated="isHeaderCheckBoxActivated"
              @update="(value) => toggleAllCheckBoxes(value)"
            />
          </th>
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
          v-for="(data, index) in filteredData"
          :key="index"
          :class="
            isSelected(data)
              ? 'opacity-50 border-b'
              : 'hover:opacity-60 border-b'
          "
        >
          <td :class="[dataStyles]">
            <CheckBox
              :is-activated="isSelected(data)"
              @update="(value) => toggleCheckBox(value, data)"
            />
          </td>
          <td :class="[dataStyles]">
            {{ formatDate(data.DateTime) }}
          </td>
          <td :class="[dataStyles]">
            {{ formatTime(data.DateTime) }}
          </td>
          <td :class="[dataStyles]">
            {{ data.ENTSOE_DE_DAM_Price }}
          </td>
          <td :class="[dataStyles]">
            {{ data.ENTSOE_GR_DAM_Price }}
          </td>
          <td :class="[dataStyles]">
            {{ data.ENTSOE_FR_DAM_Price }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!selectedDate" class="flex justify-between p-1">
      <button
        class="ml-4 hover:underline cursor-pointer select-none font-semibold"
        :class="{
          'cursor-not-allowed pointer-events-none opacity-50 select-none':
            currentPage === 0,
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
import moment from "moment";
import DatePicker from "./DatePicker.vue";
import CheckBox from "./CheckBox.vue";

export default {
  components: {
    DatePicker,
    CheckBox,
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
      filteredData: "getFilteredData",
      currentPage: "getCurrentPage",
      selectedDate: "getSelectedDate",
      selectedBoxes: "getSelectedCheckBoxes",
    }),

    isLastPage() {
      return this.currentPage === this.data.length / this.itemsPerPage - 1;
    },

    isHeaderCheckBoxActivated() {
      return this.selectedBoxes.length === this.filteredData.length;
    },
  },

  methods: {
    formatDate(dateTime) {
      return moment(dateTime).format("DD/MM/YYYY");
    },

    formatTime(dateTime) {
      return moment(dateTime).format("LT");
    },

    loadPreviousData() {
      this.$store.commit("setCurrentPage", this.$store.state.currentPage - 1);
      this.$store.commit("setSelectedCheckBoxes", []);
    },

    loadNextData() {
      this.$store.commit("setCurrentPage", this.$store.state.currentPage + 1);
      this.$store.commit("setSelectedCheckBoxes", []);
    },

    isSelected(row) {
      return this.selectedBoxes.includes(row);
    },

    toggleAllCheckBoxes(value) {
      if (value) {
        this.$store.commit("setSelectedCheckBoxes", this.filteredData);
      } else {
        this.$store.commit("setSelectedCheckBoxes", []);
      }
    },

    toggleCheckBox(value, row) {
      if (value) {
        this.$store.commit("setSelectedCheckBoxes", [
          ...this.selectedBoxes,
          row,
        ]);
      } else {
        this.$store.commit("removeSelectedCheckBox", row);
      }
    },

    // toggleRowSelection(row) {
    //   if (!this.selectedBoxes.includes(row)) {
    //     this.$store.commit("setSelectedBoxes", [...this.selectedBoxes, row]);
    //   } else {
    //     this.$store.commit("removeSelectedBox", row);
    //   }
    // },
  },
};
</script>
