import { createStore } from 'vuex';
import data from '/timeseries.json';
import moment from 'moment';

export default createStore({
  state() {
    return {
      dataSets: [], 
      currentPage: 0,
      itemsPerPage: 24,
      selectedDate: null,
      sameDate: false,
      selectedCheckBoxes: []
    }
  },

  getters: {
    getDataSets(state) {
      const selectedDate = state.selectedDate;

      if(!selectedDate) {
        const startIndex = state.currentPage * state.itemsPerPage;
        const endIndex = startIndex + state.itemsPerPage;
        return state.dataSets.slice(startIndex, endIndex);
      }

      const firstDate = moment(selectedDate[0]).format("MM/DD/YY")
      const secondDate = moment(selectedDate[1]).format("MM/DD/YY")

      if (firstDate === secondDate) {
        state.sameDate = true;
        return state.dataSets.filter((data) => data.date === firstDate)
      } else {
        const filteredData = state.dataSets.filter((data) => {
          return data.date >= firstDate && data.date <= secondDate;
        })
        return filteredData;
      }
    },

    getCurrentPage(state) {
      return state.currentPage
    },

    getItemsPerPage(state) {
      return state.itemsPerPage
    },

    getSelectedDate(state) {
      return state.selectedDate
    },

    getDateComparison(state) {
      return state.sameDate
    },

    getSelectedCheckBoxes(state) {
      return state.selectedCheckBoxes
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
    },

    SET_SELECTED_CHECKBOXES(state, data) {
      state.selectedCheckBoxes = data
    },

    REMOVE_SELECTED_CHECKBOX(state, data) {
      state.selectedCheckBoxes = state.selectedCheckBoxes.filter(item => 
        item.date !== data.date || item.time !== data.time
      )
    }    
  },

  actions: {
    formatAndStoreData({ commit }) {
      const formattedData = data.map(item => {
        return {
          date: moment(item.DateTime).format("MM/DD/YY"),
          time: moment(item.DateTime).format("LT"), 
          ENTSOE_DE_DAM_Price: item.ENTSOE_DE_DAM_Price,
          ENTSOE_GR_DAM_Price: item.ENTSOE_GR_DAM_Price,
          ENTSOE_FR_DAM_Price: item.ENTSOE_FR_DAM_Price
        }
      });
      commit('SET_DATA_SETS', formattedData);
    }
  },
});
