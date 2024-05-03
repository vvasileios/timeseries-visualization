<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import moment from "moment";

defineProps({
  headerData: Array,
  bodyData: Array,
});

const store = useStore();

const headerStyles = ref("px-4 py-3 select-none");
const dataStyles = ref("px-4 py-3 font-medium text-gray-900 select-none");

const selectedBoxes = computed(() => store.getters.getSelectedCheckBoxes);

const isSelected = (item) => selectedBoxes.value.includes(item);

const formatDate = (date) => moment(date).format("MMM Do YY");
</script>

<template>
  <table class="w-full text-sm text-left text-gray-500">
    <thead class="text-xs text-gray-700 uppercase bg-gray-100 border-b">
      <tr>
        <th
          v-for="(header, index) in headerData"
          :key="index"
          :class="[headerStyles]"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in bodyData"
        :key="index"
        :class="[
          isSelected(item) ? 'opacity-50' : 'hover:opacity-70',
          'border-b',
          'hover:cursor-pointer',
        ]"
        @click="toggleRowSelection(item)"
      >
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
</template>
