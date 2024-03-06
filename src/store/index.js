import { createStore } from 'vuex';
import axios from 'axios';
import moment from 'moment';

export default createStore({
  state() {
    return {
      dataSets: [], 
      currentPage: 0,
      itemsPerPage: 24,
      selectedDate: null
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
  },

  mutations: {
    setData(state, data) {
      state.dataSets = data;
    },

    setCurrentPage(state, page) {
      state.currentPage = page;
    },
    
    setSelectedDate(state, date) {
      state.selectedDate = date;
    },
  },

  actions: {
    loadData({ commit }) {
      return axios.get('/timeseries.json')
        .then(response => {
          commit('setData', response.data);
        })
        .catch(error => {
          console.error('Error loading data:', error);
        });
    },

    updateSelectedDate({commit, state}, date) {
      commit('setSelectedDate', date)

      if (state.currentPage !== 0) {
        commit('setCurrentPage', 0);
      }

    }
  },
});
