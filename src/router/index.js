import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MenuListPage from '@/pages/MenuListPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: MenuListPage
    },
    {
      path: '*',
      component: HelloWorld
    }
  ]
})
