import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import BoostrapVue from 'bootstrap-vue'

import App from './App.vue'


Vue.use(BoostrapVue)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
