<template>
  <div class="container mx-auto mt-8 shadow-xl">
    <table class="w-full">
      <thead class="bg-gray-100 border-2 shadow-md">
        <tr>
          <th class="p-4 text-xl font-bold text-left">Date</th>
          <th class="p-4 text-xl font-bold text-left">Time</th>
          <th class="p-4 text-xl font-bold text-left">DE_Price (€)</th>
          <th class="p-4 text-xl font-bold text-left">GR_Price (€)</th>
          <th class="p-4 text-xl font-bold text-left">FR_Price (€)</th>
        </tr>
      </thead>
      <tbody class="border-2">
        <tr v-for="(data, index) in dataSets" :key="index" class="hover:underline border-b-2">
          <td class="p-4 font-semibold"> {{ formatDate(data.DateTime).date }} </td>
          <td class="p-4 font-semibold"> {{ formatDate(data.DateTime).time }} </td>
          <td class="p-4 font-semibold"> {{ data.ENTSOE_DE_DAM_Price }} </td>
          <td class="p-4 font-semibold"> {{ data.ENTSOE_GR_DAM_Price }} </td>
          <td class="p-4 font-semibold"> {{ data.ENTSOE_FR_DAM_Price }} </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    dataSets:{
      type: Array,
      required: true
    }
  },

  methods: {
    formatDate(dateTime) {
      const date = new Date(dateTime)

      return{
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString()
      }
    }
  }
}
</script>