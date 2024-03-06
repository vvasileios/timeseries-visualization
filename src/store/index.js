import { createStore } from 'vuex';
import axios from 'axios';

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
    getPaginatedData(state) {
      const startIndex = state.currentPage * state.itemsPerPage;
      const endIndex = startIndex + state.itemsPerPage;
      return state.dataSets.slice(startIndex, endIndex);
    },

    getCurrentPage(state) {
      return state.currentPage
    },

    getDataSets(state) {
      return state.dataSets
    },

    getItemsPerPage(state) {
      return state.itemsPerPage
    }
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
    }
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
    }
  },
});
