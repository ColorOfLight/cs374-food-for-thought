<template lang="pug">
  .ingredient-list-page
    template(v-if="Object.keys(ingredients).length > 0")
      .btn-container
        v-btn.btn-new-ingredient(color="primary" outline)
          v-icon.add-icon add
          | {{buttonText}}
      .ingredient-list-container
        .ingredient-list-item(v-for="(ingredient, key) in ingredients")
          .ingredient-title {{ingredient.name}}
          .ingredient-unit {{`${ingredient.unitPrice} 원 / ${ingredient.unit}`}}
    empty-list-container(v-else text="메뉴에 들어갈 재료들을 추가해주세요!" :buttonText="buttonText")
</template>

<script>
import ListEmptyContainer from '@/components/ListEmptyContainer'

export default {
  components: {
    'empty-list-container': ListEmptyContainer,
  },
  data () {
    return {
      buttonText: '재료 추가하기',
      ingredients: {
        'tt': {
          name: '물',
          unit: 'ml',
          unitPrice: 1
        },
        'taat': {
          name: '물',
          unit: 'ml',
          unitPrice: 1
        },
      },
    }
  },
}
</script>

<style scoped lang="scss">
.ingredient-list-page {
  padding: 1.5rem 0;
}

.btn-container {
  margin-bottom: 1.25rem;
  padding: 0 1rem;
  text-align: right;
}

.btn-new-ingredient {
  background-color: $white !important;
  border-radius: .25rem;
  height: 2.625rem;
  padding-right: .25rem;

  .add-icon {
    margin-right: .5rem;
  }
}

.ingredient-list-container {
  background-color: $white;
  box-shadow: 0 .0625rem .125rem rgba(0, 0, 0, .2);
  margin: 0 1rem;
  
  .ingredient-list-item {
    border-bottom: 1px solid $border-color;
    color: $default;
    padding: .75rem 1.5rem;
    position: relative;

    &:last-child {
      border-bottom: 0;
    }
  }

  .ingredient-unit {
    bottom: .75rem;
    color: $primary-400;
    font-size: .9rem;
    position: absolute;
    right: 1.5rem;
  }
}
</style>