import Vue from 'vue'
import App from './App.vue'
import D3Network from 'vue-d3-network'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  D3Network
}).$mount('#app')
