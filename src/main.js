import { createApp } from 'vue';
import './assets/index.css';
import App from './App.vue';
import store from './store/index.js';
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);
app.use(VueApexCharts);
app.use(store);
app.mount('#app');
