<template>
  <div class="container mx-auto mt-8 shadow-xl">
    <table class="w-full">
      <thead class="bg-gray-100 border-2 shadow-md">
        <tr>
          <th
            v-for="(header, index) in headerItems"
            :key="index"
            class="p-3 text-lg font-bold select-none"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="border-2">
        <tr
          v-for="(data, index) in dataPerPage"
          :key="index"
          class="hover:opacity-60 border-b-2"
        >
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
    <div class="flex justify-between border-2 p-1">
      <button
        class="ml-4 hover:underline cursor-pointer select-none"
        :class="{
          'cursor-not-allowed pointer-events-none opacity-50 select-none':
            currentPage === 0,
        }"
        @click="loadPreviousData"
      >
        Previous
      </button>
      <button
        class="mr-4 hover:underline cursor-pointer select-none"
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

export default {
  data() {
    return {
      headerItems: ["Date", "Time", "Germany (€)", "Greece (€)", "France (€)"],
      dataStyles: "p-2 font-semibold text-center select-none",
    };
  },

  computed: {
    ...mapGetters({
      data: "getDataSets",
      itemsPerPage: "getItemsPerPage",
      dataPerPage: "getPaginatedData",
      currentPage: "getCurrentPage",
    }),

    isLastPage() {
      return this.currentPage === this.data.length / this.itemsPerPage - 1;
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
    },

    loadNextData() {
      this.$store.commit("setCurrentPage", this.$store.state.currentPage + 1);
    },
  },
};
</script>
