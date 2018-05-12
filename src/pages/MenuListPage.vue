<template lang="pug">
  .menu-list-page
    .menu-list-container(v-if="Object.keys(menus).length > 0")
      .menu-list(v-for="(menu, key) in menus")
        .menu-list-title {{menu.name}}
        .menu-list-sub {{menu.ingredients}}
        .menu-list-price {{menu.consumerPrice}}
    .empty-list-container(v-else)
      .empty-list-text 새 메뉴를 추가하고 원가를 확인해보세요!
      v-btn.btn-new-menu(color="primary" outline)
        v-icon.add-icon add
        | 새 메뉴 추가하기
</template>

<script>
export default {
  data () {
    return {
      menus: {
        sXZDFD: {
          name: '아메리카노',
          ingredients: ['물', '원두'],
          consumerPrice: 3000
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.menu-list-page {
  border-top: 1px solid $border-color;
  padding: 1.5rem 0;
}

.menu-list {
  background-color: $white;
  border-bottom: 1px solid $border-color;
  padding: .75rem 1rem;
  position: relative;

  &:hover,
  &:focus {
    background-color: $primary-50;
  }

  .menu-list-sub {
    color: $gray-500;
    font-size: .75rem;
  }

  .menu-list-price {
    bottom: .75rem;
    font-size: 1.1rem;
    position: absolute;
    right: 1rem;
  }
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

.empty-list-container {
  background-color: $white;
  border-color: $border-color;
  border-style: solid;
  border-width: 1px 0;
  padding: 1rem 1.5rem 1.5rem;

  .empty-list-text {
    color: $gray-500;
    margin-bottom: 1rem;
    text-align: center;
  }
}
</style>