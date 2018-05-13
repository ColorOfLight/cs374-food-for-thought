<template lang="pug">
  .menu-list-page(v-if="isFirebaseLoaded")
    template(v-if="Object.keys(prettyMenus).length > 0")
      .menu-list-container
        .menu-list-item(v-for="(menu, key) in prettyMenus")
          .menu-list-title {{menu.name}}
          .menu-list-sub {{menu.ingredients}}
          .menu-list-price {{menu.price}}
      .btn-container
        v-btn.btn-new-menu(color="primary" outline @click="$router.push({name: 'MenuAdd'})")
          v-icon.add-icon add
          | {{buttonText}}
    empty-list-container(v-else text="새 메뉴를 추가하고 원가를 확인해보세요!" :buttonText="buttonText" clickRouteName="IngredientAdd")
</template>

<script>
import ListEmptyContainer from '@/components/ListEmptyContainer'
import Vue from 'vue'
import VueFire from 'vuefire'
import db from '@/libs/vuefireConfig.js'
import { convertToMoneyString } from '@/libs/stringUtils'

Vue.use(VueFire)

export default {
  components: {
    'empty-list-container': ListEmptyContainer
  },
  firebase: {
    menus: {
      source: db.ref('/menus/'),
      asObject: true,
      readyCallback: function() {
        this.isFirebaseLoaded = true
      }
    }
  },
  data () {
    return {
      buttonText: '새 메뉴 추가하기',
      menus: this.$firebaseRefs ? this.$firebaseRefs.menus : null,
      isFirebaseLoaded: false,
    }
  },
  computed: {
    prettyMenus: function () {
      if (this.menus) {
        let newMenus = {};
        for (const key of Object.keys(this.menus)) {
          if (key === '.key') continue;
          const menu = this.menus[key];
          newMenus[key] = {
            name: menu.name,
            ingredients: Object.keys(menu.ingredients).join(', '),
            price: convertToMoneyString(menu.consumerPrice)
          }
        }
        return newMenus;
      } else {
        return null;
      }
    }
  },
}
</script>

<style scoped lang="scss">
.menu-list-page {
  padding: 1.5rem 0;
}

.menu-list-container {
  border-top: 1px solid $border-color;
}

.menu-list-item {
  background-color: $white;
  border-bottom: 1px solid $border-color;
  padding: .75rem 1rem;
  position: relative;

  &:hover,
  &:focus {
    background-color: $primary-50;
  }

  .menu-list-title {
    overflow: hidden;
    padding-right: 30%;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .menu-list-sub {
    color: $gray-500;
    font-size: .75rem;
    margin-top: .125rem;
    overflow: hidden;
    padding-right: 30%;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .menu-list-price {
    bottom: .75rem;
    font-size: 1.1rem;
    position: absolute;
    right: 1rem;
  }
}

.btn-container {
  margin-top: 2rem;
  padding: 0 1rem;
}

.btn-new-menu {
  background-color: $white !important;
  height: 3rem;
  width: 100%;

  .add-icon {
    margin-left: -1rem;
    margin-right: 1rem;
  }
}
</style>
