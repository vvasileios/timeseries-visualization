import { createStore } from "vuex";
import data from "/timeseries.json";
import { dateFormatter } from "/src/utils/formatter.js";

export default createStore({
  state() {
    return {
      dataSets: [],
      currentPage: 0,
      itemsPerPage: 24,
      selectedDate: null,
      sameDate: false,
      selectedColumn: [],
    };
  },

  getters: {
    getDataSets(state) {
      const selectedDate = state.selectedDate;

      if (!selectedDate) {
        const startIndex = state.currentPage * state.itemsPerPage;
        const endIndex = startIndex + state.itemsPerPage;
        return state.dataSets.slice(startIndex, endIndex);
      }

      if (dateFormatter(selectedDate[0]) === dateFormatter(selectedDate[1])) {
        state.sameDate = true;
        return state.dataSets.filter(
          (data) =>
            dateFormatter(data.DateTime) === dateFormatter(selectedDate[0])
        );
      } else {
        const filteredData = state.dataSets.filter((data) => {
          return (
            dateFormatter(data.DateTime) >= dateFormatter(selectedDate[0]) &&
            dateFormatter(data.DateTime) <= dateFormatter(selectedDate[1])
          );
        });
        return filteredData;
      }
    },

    getCurrentPage(state) {
      return state.currentPage;
    },

    getItemsPerPage(state) {
      return state.itemsPerPage;
    },

    getSelectedDate(state) {
      return state.selectedDate;
    },

    getDateComparison(state) {
      return state.sameDate;
    },

    getSelectedColumn(state) {
      return state.selectedColumn;
    },
  },

  mutations: {
    SET_DATA_SETS(state, dataSets) {
      state.dataSets = dataSets;
    },

    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    },

    SET_SELECTED_DATE(state, date) {
      state.selectedDate = date;
    },

    SET_INITIAL_STATE(state) {
      state.selectedDate = null;
      state.sameDate = false;
      state.currentPage = 0;
      state.selectedColumn = [];
    },

    SET_SELECTED_CHECKBOXES(state, data) {
      state.selectedColumn.push(data);
    },

    REMOVE_SELECTED_CHECKBOX(state, data) {
      state.selectedColumn = state.selectedColumn.filter((col) => {
        return col !== data;
      });
    },
  },

  actions: {
    formatAndStoreData({ commit }) {
      commit("SET_DATA_SETS", data);
    },
  },
});
