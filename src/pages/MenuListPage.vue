<template lang="pug">
  .menu-list-page
    template(v-if="Object.keys(menus).length > 0")
      .menu-list-container
        .menu-list-item(v-for="(menu, key) in menus")
          .menu-list-title {{menu.name}}
          .menu-list-sub {{menu.ingredients}}
          .menu-list-price {{menu.consumerPrice}}
      .btn-container
        v-btn.btn-new-menu(color="primary" outline)
          v-icon.add-icon add
          | {{buttonText}}
    empty-list-container(v-else text="새 메뉴를 추가하고 원가를 확인해보세요!" :buttonText="buttonText")
</template>

<script>
import ListEmptyContainer from '@/components/ListEmptyContainer'

export default {
  components: {
    'empty-list-container': ListEmptyContainer
  },
  data () {
    return {
      buttonText: '새 메뉴 추가하기',
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

  .menu-list-sub {
    color: $gray-500;
    font-size: .75rem;
    margin-top: .125rem;
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