// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import moment from 'moment'
Vue.config.productionTip = false
Vue.prototype.HOST = '/api'
Vue.use(MuseUI)
Vue.use(ElementUI)
Vue.use(moment)

// 设置cookie,增加到vue实例方便全局调用
// vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
// 当然，如果session保存到vuex的话除外
Vue.prototype.setCookie = (cName, value, expiredays) => {
  let exdate = new Date()
  exdate.setTime(exdate.getTime() + expiredays)
  var expires = 'expires=' + exdate.toGMTString()
  document.cookie = cName + '=' + escape(value)
  document.cookie = expires
}

// 获取cookie
function getCookie (name) {
  let arr = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2])
  } else {
    return null
  }
}
Vue.prototype.getCookie = getCookie

// 删除cookie
Vue.prototype.delCookie = (name) => {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
