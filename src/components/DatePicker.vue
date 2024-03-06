<template>
  <div class="w-64">
    <vue-date-picker
      v-model="selectedDate"
      :enable-time-picker="false"
      :min-date="minDate"
      :max-date="maxDate"
      :start-date="minDate"
      range
      auto-apply
      placeholder="Select Date"
      @cleared="clearData"
    ></vue-date-picker>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: {
    VueDatePicker,
  },

  data() {
    return {
      selectedDate: null,
    };
  },

  watch: {
    selectedDate: {
      handler(newVal) {
        if (newVal) {
          this.$store.dispatch("updateSelectedDate", newVal);
        }
      },
    },
  },

  computed: {
    ...mapGetters({
      data: "getDataSets",
    }),

    minDate() {
      if (this.data && this.data.length > 0) {
        return this.data[0].DateTime;
      }
      return null;
    },

    maxDate() {
      if (this.data && this.data.length > 0) {
        return this.data[this.data.length - 1].DateTime;
      }
      return null;
    },
  },

  methods: {
    clearData() {
      this.$store.dispatch("updateSelectedDate");
    },
  },
};
</script>
