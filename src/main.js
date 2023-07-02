import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/style.scss';
import './config/validation/index';
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)


Vue.use(Toast);



import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'

// index.js or main.js
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
// main.styl

import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
Vue.component('date-picker', VuePersianDatetimePicker);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
