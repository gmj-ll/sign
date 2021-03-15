import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import vueEsign from 'vue-esign'

import 'element-ui/lib/theme-chalk/index.css';
import VueQriously from 'vue-qriously'
import router from './router'
// import VueSocketio from 'vue-socket.io';
Vue.use(VueQriously)

Vue.use(ElementUI);
Vue.use(vueEsign)
// Vue.use(new VueSocketio({
//   debug: true,
//   connection: 'http://139.196.85.119:3000' //地址+端口，由后端提供
// }));

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

