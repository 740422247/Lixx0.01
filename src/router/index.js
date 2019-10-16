import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/login'
import Main from '@/pages/main'
import Test from '@/pages/test/test'
import MenuManage from '@/pages/management/menu/manage-menu'
import Experts from '@/pages/management/menu/experts'
import ExpertsEdit from '@/pages/management/menu/experts-edit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/experts',
          name: 'Experts',
          component: Experts
        },
        {
          path: '/expertsEdit',
          name: 'ExpertsEdit',
          component: ExpertsEdit
        },
        {
          path: '/menuManage',
          name: 'MenuManage',
          component: MenuManage
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    { path: '*', redirect: '/' }
  ]
})
