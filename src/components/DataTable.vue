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
          v-for="(data, index) in dataSets"
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
      headerItems: ["Date", "Time", "DE_Price €", "GR_Price €", "FR_Price €"],
      tableData: {},
    };
  },

  methods: {
    formatDate(dateTime) {
      return moment(dateTime).format("DD/MM/YYYY");
    },

    formatTime(dateTime) {
      return moment(dateTime).format("LT");
    },
  },
};
</script>
