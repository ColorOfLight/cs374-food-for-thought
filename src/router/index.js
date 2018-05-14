import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MenuListPage from '@/pages/MenuListPage'
import IngredientListPage from '@/pages/IngredientListPage'
import IngredientAddPage from '@/pages/IngredientAddPage'
import IngredientDetailPage from '@/pages/IngredientDetailPage'
import MenuAddPage from '@/pages/MenuAddPage'
import MenuDetailPage from '@/pages/MenuDetailPage'

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
      component: IngredientListPage,
    },
    {
      path: '/ingredients/add',
      name: 'IngredientAdd',
      component: IngredientAddPage
    },
    {
      path: '/ingredients/select',
      name: 'IngredientSelect',
      component: IngredientListPage
    },
    {
      path: '/ingredients/:ingredientKey',
      name: 'IngredientDetail',
      component: IngredientDetailPage
    },
    {
      path: '/ingredients/:ingredientKey/edit',
      name: 'IngredientEdit',
      component: IngredientAddPage
    },
    {
      path: '/menus/add',
      name: 'MenuAdd',
      component: MenuAddPage
    },
    {
      path: '/menus/:menuKey',
      name: 'MenuDetail',
      component: MenuDetailPage
    },
    {
      path: '/menus/:menuKey/edit',
      name: 'MenuEdit',
      component: MenuAddPage
    },

    {
      path: '*',
      component: HelloWorld
    }
  ]
})
