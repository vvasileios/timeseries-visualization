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
  name: "DatePicker",

  components: {
    VueDatePicker,
  },

  computed: {
    ...mapGetters({
      data: "getDataSets",
    }),

    selectedDate: {
      get() {
        return this.$store.state.selectedDate;
      },
      set(value) {
        this.$store.commit("SET_SELECTED_CHECKBOXES", []);
        this.$store.commit("SET_SELECTED_DATE", value);
      },
    },

    minDate() {
      return this.getDate("min");
    },

    maxDate() {
      return this.getDate();
    },
  },

  methods: {
    getDate(value) {
      const dataSets = this.$store.state.dataSets;

      if (!dataSets || dataSets.length === 0) return null;

      if (value === "min") {
        return dataSets[0].date;
      }
      return dataSets[dataSets.length - 1].date;
    },

    clearData() {
      this.$store.commit("SET_INITIAL_STATE");
    },
  },
};
</script>
