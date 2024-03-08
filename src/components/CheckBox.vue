<template>
  <input type="checkbox" :checked="isActivated" @change="toggleCheckBox" />
</template>

<script>
export default {
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
