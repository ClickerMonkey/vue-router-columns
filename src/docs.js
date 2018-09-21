import Vue from 'vue';

import VueRouterColumns from './lib';
import App from './example/App.vue';
import router from './example/router';

Vue.config.productionTip = false;
Vue.use(VueRouterColumns);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});