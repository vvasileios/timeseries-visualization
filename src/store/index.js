import { createStore } from 'vuex';
import data from '/timeseries.json';
import moment from 'moment';

export default createStore({
  state() {
    return {
      dataSets: data, 
      currentPage: 0,
      itemsPerPage: 24,
      selectedDate: null,
      selectedCheckBoxes: []
    }
  },

  getters: {
    getFilteredData(state) {
      const selectedDate = state.selectedDate;

      if(!selectedDate) {
        const startIndex = state.currentPage * state.itemsPerPage;
        const endIndex = startIndex + state.itemsPerPage;
        return state.dataSets.slice(startIndex, endIndex);
      }

      const firstDate = moment(selectedDate[0]).format("DD/MM/YY")
      const secondDate = moment(selectedDate[1]).format("DD/MM/YY")

      if (firstDate === secondDate) {
        return state.dataSets.filter((data) => moment(data.DateTime).format("DD/MM/YY") === firstDate)
      } else {
        const filteredData = state.dataSets.filter((data) => {
          const itemDate = moment(data.DateTime).format("DD/MM/YY");
          return itemDate >= firstDate && itemDate <= secondDate;
        })
        return filteredData;
      }
    },

    getCurrentPage(state) {
      return state.currentPage
    },

    getDataSets(state) {
      return state.dataSets
    },

    getItemsPerPage(state) {
      return state.itemsPerPage
    },

    getSelectedDate(state) {
      return state.selectedDate
    },

    getSelectedCheckBoxes(state) {
      return state.selectedCheckBoxes
    },
  },

  mutations: {
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    },
    
    SET_SELECTED_DATE(state, date) {
      state.selectedDate = date;
    },

    SET_INITIAL_STATE(state) {
      state.selectedDate = null;
      state.currentPage = 0;
    },

    SET_SELECTED_CHECKBOXES(state, data) {
      state.selectedCheckBoxes = data
    },

    REMOVE_SELECTED_CHECKBOX(state, data) {
      state.selectedCheckBoxes = state.selectedCheckBoxes.filter(box => 
        moment(box.DateTime).format("DD/MM/YY") !== moment(data.DateTime).format("DD/MM/YY") ||
        moment(box.DateTime).format("LT") !== moment(data.DateTime).format("LT")
      );
    }    
  },

  actions: {},
});
