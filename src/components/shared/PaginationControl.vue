<script setup>
defineProps({
  isFirstPage: Boolean,
  isLastPage: Boolean,
});

const emit = defineEmits(["prev", "next"]);

const handlePrevious = () => {
  emit("prev");
};

const handleNext = () => {
  emit("next");
};
</script>

<template>
  <div class="w-full min-w-[435.5px] flex justify-between p-1">
    <button
      class="ml-4 hover:underline cursor-pointer select-none font-semibold"
      :class="{
        'cursor-not-allowed pointer-events-none opacity-50 select-none':
          isFirstPage,
      }"
      @click="handlePrevious"
    >
      Previous
    </button>
    <button
      class="mr-4 hover:underline cursor-pointer select-none font-semibold"
      :class="{
        'cursor-not-allowed pointer-events-none opacity-50 select-none':
          isLastPage,
      }"
      @click="handleNext"
    >
      Next
    </button>
  </div>
</template>
