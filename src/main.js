import Vue from 'vue'
import App from './App.vue'
import 'ace-css/css/ace.min.css'
import './index.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
