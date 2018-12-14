import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css'

import 'bootstrap-vue/dist/bootstrap-vue.css'



Vue.use(BootstrapVue);



import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

Vue.use(require('vue-shortkey'))

Vue.config.productionTip = false
import router from './router'
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
