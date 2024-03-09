<template>
  <input
    class="hover:cursor-pointer"
    type="checkbox"
    :checked="isActivated"
    @change="toggleCheckBox"
  />
</template>

<script>
export default {
  name: "CheckBox",

  props: {
    isActivated: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    toggleCheckBox() {
      this.$emit("update", !this.isActivated);
    },
  },
};
</script>
