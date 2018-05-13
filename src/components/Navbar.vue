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
      v-toolbar-side-icon.toolbar-icon(@click="drawer = !drawer")
      v-toolbar-title.toolbar-title title
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    routeTo (routeName) {
      if (routeName === this.$route.name) {
        this.drawer = false;
      } else {
        this.$router.push({name: routeName});
      }
    }
  }
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

.toolbar-icon {
  color: $gray-500;
}

.navigation-drawer {
  width: 75% !important;
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