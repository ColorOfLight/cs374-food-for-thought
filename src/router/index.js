import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MenuListPage from '@/pages/MenuListPage'
import IngredientListPage from '@/pages/IngredientListPage'
import IngredientAddPage from '@/pages/IngredientAddPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MenuList',
      component: MenuListPage
    },
    {
      path: '/ingredients',
      name: 'IngredientList',
      component: IngredientListPage
    },
    {
      path: '/ingredient',
      name: 'IngredientAdd',
      component: IngredientAddPage
    },
    {
      path: '*',
      component: HelloWorld
    }
  ]
})
