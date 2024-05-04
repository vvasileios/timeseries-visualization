<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import CheckBox from "./CheckBox.vue";
import { timeFormatter, tableDateFormatter } from "../../utils/formatter";

defineProps({
  headerData: Array,
  bodyData: Array,
});

const store = useStore();

const headerStyles = ref("px-4 py-3 select-none");
const dataStyles = ref(
  "px-4 py-3 font-medium text-gray-900 text-center select-none"
);
const priceHeader = ref(["Germany (€)", "Greece (€)", "France (€)"]);

const isPriceHeader = (header) => priceHeader.value.includes(header);

const isSelected = (item) => store.state.selectedColumn.includes(item);

const columnSelected = (value, column) => {
  const columnNames = ["Germany (€)", "Greece (€)", "France (€)"];

  let newName = "";

  if (columnNames[0] === column) {
    newName = "ENTSOE_DE_DAM_Price";
  } else if (columnNames[1] === column) {
    newName = "ENTSOE_GR_DAM_Price";
  } else {
    newName = "ENTSOE_FR_DAM_Price";
  }

  if (value) {
    store.commit("SET_SELECTED_CHECKBOXES", newName);
  } else {
    store.commit("REMOVE_SELECTED_CHECKBOX", newName);
  }
};
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
          <div class="flex justify-center gap-2">
            <span> {{ header }} </span>
            <CheckBox
              v-if="isPriceHeader(header)"
              :is-activated="isSelected(header)"
              @update="(value) => columnSelected(value, header)"
            />
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in bodyData"
        :key="index"
        class="hover:opacity-50 border-b hover:cursor-pointer"
      >
        <td :class="[dataStyles]">
          {{ tableDateFormatter(item.DateTime) }}
        </td>
        <td :class="[dataStyles]">
          {{ timeFormatter(item.DateTime) }}
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
