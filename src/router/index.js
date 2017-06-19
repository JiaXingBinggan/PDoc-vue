import Vue from 'vue'
import Router from 'vue-router'
import indexView from '../views/indexView.vue'
import otherView from '../views/otherView.vue'
import loginView from '../views/loginView.vue'
import registerView from '../views/registerView.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: indexView
    },
    {
      path: '/other',
      component: otherView
    },
    {
      path: '/login',
      component: loginView
    },
    {
      path: '/register',
      component: registerView
    }
  ]
})
