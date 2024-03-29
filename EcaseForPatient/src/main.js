// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import axios from 'axios'
import qs from 'qs'
import 'iview/dist/styles/iview.css';
import jsrsasign from 'jsrsasign'
import JsEncrypt from 'jsencrypt/bin/jsencrypt'
import utils from '@/assets/js/utils'

Vue.prototype.utils = utils
Vue.prototype.$jsEncrypt = JsEncrypt
Vue.prototype.RSA = jsrsasign;
Vue.prototype.$axios = axios 
Vue.prototype.$qs = qs 
Vue.prototype.HOST = '/api'

Vue.use(iView);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
