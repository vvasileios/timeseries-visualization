import { createApp } from 'vue';

import store from './store/index.js';
import './assets/index.css';

import App from './App.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'



const app = createApp(App);
app.component('VueDatePicker', VueDatePicker);
app.use(store);
app.mount('#app');
