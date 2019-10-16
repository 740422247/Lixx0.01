// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './vuex/store'
import {
  Button, Input, ButtonGroup, Checkbox, Table, TableColumn, Tag, Popover, Pagination, Menu, MenuItem, MenuItemGroup, Submenu, Breadcrumb, BreadcrumbItem, Card, Form,
  FormItem, Option, Select, Tree, Dialog, DatePicker
} from 'element-ui'

Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Popover)
Vue.use(Pagination)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Option)
Vue.use(Select)
Vue.use(Tree)
Vue.use(Dialog)
Vue.use(DatePicker)
// Vue.use(MessageBox)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
