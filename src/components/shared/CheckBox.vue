<script setup>
const props = defineProps({
  isActivated: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update"]);

const toggleCheckBox = () => {
  emit("update", !props.isActivated);
};
</script>

<template>
  <input
    class="hover:cursor-pointer"
    type="checkbox"
    :checked="isActivated"
    @change="toggleCheckBox"
  />
</template>
