import Vue from 'vue'
import App from './App.vue'
import { router } from './router/index'
import { store } from './store/index'
import wb from "./registerServiceWorker"
import vuetify from './plugins/vuetify'

Vue.prototype.$workbox = wb
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
