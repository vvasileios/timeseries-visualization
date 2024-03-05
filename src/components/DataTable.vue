<template>
  <div class="container mx-auto mt-8 shadow-xl">
    <table class="w-full">
      <thead class="bg-gray-100 border-2 shadow-md">
        <tr>
          <th
            v-for="(header, index) in headerItems"
            :key="index"
            class="p-4 text-xl font-bold text-left"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="border-2">
        <tr
          v-for="(data, index) in displayedData"
          :key="index"
          class="hover:underline border-b-2"
        >
          <td class="p-4 font-semibold">{{ formatDate(data.DateTime) }}</td>
          <td class="p-4 font-semibold">{{ formatTime(data.DateTime) }}</td>
          <td class="p-4 font-semibold">{{ data.ENTSOE_DE_DAM_Price }}</td>
          <td class="p-4 font-semibold">{{ data.ENTSOE_GR_DAM_Price }}</td>
          <td class="p-4 font-semibold">{{ data.ENTSOE_FR_DAM_Price }}</td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between border-2 p-2">
      <button
        class="ml-4 hover:underline cursor-pointer"
        :class="{
          'cursor-not-allowed pointer-events-none opacity-50':
            currentPage === 0,
        }"
        @click="loadPreviousData"
      >
        Previous
      </button>
      <button
        class="mr-4 hover:underline cursor-pointer"
        :class="{
          'cursor-not-allowed pointer-events-none opacity-50':
            currentPage === totalPages - 1,
        }"
        @click="loadNextData"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    dataSets: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      headerItems: [
        "Date",
        "Time",
        "Germany Price",
        "Greece Price",
        "France Price",
      ],
      currentPage: 0,
      itemsPerPage: 24,
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.dataSets.length / this.itemsPerPage);
    },

    displayedData() {
      const startIndex = this.currentPage * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.dataSets.slice(startIndex, endIndex);
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
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    },

    loadNextData() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
      }
    },
  },
};
</script>
