import Vue from 'vue'
import Router from 'vue-router'
import indexView from '../views/indexView.vue'
import docsView from '../views/docsView.vue'
import adddoc from '../components/docs/addDoc.vue'
import editdoc from '../components/docs/editDoc.vue'
import viewdoc from '../components/docs/viewDoc.vue'
import loginView from '../views/loginView.vue'
import registerView from '../views/registerView.vue'
import userinfo from '../components/user/userinfo.vue'
import accountinfo from '../components/user/accountinfo.vue'
import accountmanage from '../components/user/accountmanage.vue'
import accountpass from '../components/user/accountpass.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: indexView
    },
    {
      path: '/docsview',
      component: docsView,
      children: [
        {
          path: 'add-doc/:id',
          components: {
            docView: adddoc
          }
        },
        {
          path: 'edit-doc/:id',
          components: {
            docView: editdoc
          }
        },
        {
          path: 'view-doc/:id',
          components: {
            docView: viewdoc
          }
        }
      ]
    },
    {
      path: '/login',
      component: loginView
    },
    {
      path: '/register',
      component: registerView
    },
    {
      path: '/userinfo',
      component: userinfo,
      children: [
        {
          path: 'account-info',
          components: {
            userView: accountinfo
          }
        },
        {
          path: 'account-manage',
          components: {
            userView: accountmanage
          }
        },
        {
          path: 'account-password',
          components: {
            userView: accountpass
          }
        }
      ]
    }
  ]
})
