import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import iView from 'iview'
import http from "./http"
import ElementUI from 'element-ui';
import G2 from '@antv/g2';
import DataSet,{ DataView } from '@antv/data-set';
import "bootstrap";

import 'element-ui/lib/theme-chalk/index.css';
import "bootstrap/dist/css/bootstrap.css";
import 'iview/dist/styles/iview.css'


import './permission'

Vue.config.productionTip = false
Vue.use(iView);
Vue.use(ElementUI);
Vue.prototype.$http = http;
Vue.prototype.$G2 = G2;
// Vue.prototype.$DataView = DataView;
Vue.prototype.$DataSet = DataSet;


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})