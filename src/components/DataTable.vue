<template>
  <div class="bg-white relative border rounded-lg">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th class="px-4 py-3">Date & Time</th>
          <th class="px-4 py-3">DE_Price (€)</th>
          <th class="px-4 py-3">GR_Price (€)</th>
          <th class="px-4 py-3">FR_Price (€)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in dataSets" :key="index">
          <td class="px-4 py-3 font-medium text-gray-900"> {{ data.DateTime }} </td>
          <td class="px-4 py-3 font-medium text-gray-900"> {{ data.ENTSOE_DE_DAM_Price }} </td>
          <td class="px-4 py-3 font-medium text-gray-900"> {{ data.ENTSOE_GR_DAM_Price }} </td>
          <td class="px-4 py-3 font-medium text-gray-900"> {{ data.ENTSOE_FR_DAM_Price }} </td>
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
}
</script>