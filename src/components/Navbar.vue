<template lang="pug">
  div
    v-navigation-drawer(v-model="drawer" temporary absolute)
      v-list
        v-list-tile(v-bind:class="{active: $route.name === 'MenuList'}" @click="routeTo('MenuList')")
          v-list-tile-action
            v-icon home
          v-list-tile-content
            v-list-tile-title 메뉴
        v-list-tile(v-bind:class="{active: $route.name === 'IngredientList'}" @click="routeTo('IngredientList')")
          v-list-tile-action
            v-icon list
          v-list-tile-content
            v-list-tile-title 재료 관리하기
    v-toolbar.toolbar
      v-toolbar-side-icon.toolbar-icon(v-if="!navContent.prevRoute" @click="drawer = !drawer")
      v-btn(v-else icon @click="navContent.minusRoute ? $router.go(-1) : $router.push(navContent.prevRoute)")
        v-icon.toolbar-icon arrow_back
      v-toolbar-title.toolbar-title {{navContent.title}}
      v-spacer
      v-menu(v-if="navContent.subMenus && navContent.subMenus.length > 0" bottom left)
        v-btn(slot="activator" icon)
          v-icon more_vert
        v-list
          v-list-tile(v-for="(menu, i) in navContent.subMenus" :key="i" @click="menu.method()")
            v-list-tile-title {{menu.title}}
</template>

<script>
import db from '@/libs/vuefireConfig.js'

export default {
  data () {
    return {
      drawer: false,
      test: this.$firebaseRefs
    }
  },
  computed: {
    navContent: function () {
      const navSwitch = (routeName) => ({
        // title, prevRoute, subMenus
        MenuList: {
          title: '메뉴',
        },
        MenuDetail: {
          title: '메뉴 상세보기',
          prevRoute: {
            name: 'MenuList'
          },
          subMenus: [{
            title: '메뉴 삭제하기',
            method: this.deleteMenu,
          }],
        },
        MenuAdd: {
          title: '새 메뉴 추가하기',
          prevRoute: {
            name: 'MenuList'
          },
        },
        MenuEdit: {
          title: '메뉴 수정하기',
          prevRoute: {
            name: 'MenuDetail',
            params: this.$route.params
          }
        },
        IngredientList: {
          title: '재료 관리하기',
        },
        IngredientDetail: {
          title: '재료 상세보기',
          prevRoute: {
            name: 'IngredientList',
          },
          // subMenus: [{
          //   title: '재료 삭제하기',
          //   method: this.deleteIngredient,
          // }],
        },
        IngredientAdd: {
          title: '재료 추가하기',
          prevRoute: {
            name: 'IngredientList',
          },
        },
        IngredientEdit: {
          title: '재료 수정하기',
          prevRoute: {
            name: 'IngredientDetail',
            params: this.$route.params,
          },
        },
        IngredientSelect: {
          title: '재료 선택하기',
          prevRoute: {},
          minusRoute: true,
        }
      })[routeName];
      return navSwitch(this.$route.name);
    }
  },
  methods: {
    routeTo (routeName) {
      if (routeName === this.$route.name) {
        this.drawer = false;
      } else {
        this.$router.push({name: routeName});
      }
    },
    deleteIngredient () {
      // TODO: confirm에서 sweetAlert로 바꾸기
      // TODO: 연결된 메뉴들도 처리가 필요함;;
      // const confirmDel = confirm('재료를 정말 삭제하시겠습니까?')
      // if (confirmDel) {
      //   db.ref('/ingredients/' + this.$route.params.ingredientKey).remove();
      //   this.$route.push({name: 'IngredientList'});
      // }
    },
    deleteMenu () {
      // TODO: confirm에서 sweetAlert로 바꾸기
      const confirmDel = confirm('메뉴를 정말 삭제하시겠습니까?')
      if (confirmDel) {
        db.ref('/menus/' + this.$route.params.menuKey).remove();
        this.$router.push({name: 'MenuList'});
      }
    },
  },
}
</script>

<style scoped lang="scss">
.toolbar {
  background-color: $white;
  box-shadow: 0 1.5px 1.5px rgba(0, 0, 0, .15);
}

.toolbar-title {
  color: $default;
}

.toolbar-icon,
.menu .icon {
  color: $gray-500 !important;
}

.navigation-drawer {
  transform: translateX(-100%) !important;
  width: 75% !important;
}

.navigation-drawer--temporary:not(.navigation-drawer--close) {
  transform: translateX(0) !important;
}

.list {
  .active {
    background-color: $primary-50;

    .icon {
      color: $primary-400;
    }
  }
}
</style>