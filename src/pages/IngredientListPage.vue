<template lang="pug">
  .ingredient-list-page(v-if="isFirebaseLoaded")
    template(v-if="Object.keys(ingredients).length > 0")
      .btn-container
        v-btn.btn-new-ingredient(v-if="$route.name === 'IngredientList'" color="primary" outline @click="$router.push({name: 'IngredientAdd'})")
          v-icon.add-icon add
          | {{buttonText}}
      .ingredient-list-container(v-if="$route.name === 'IngredientList'")
        .ingredient-list-item(v-for="(ingredient, key) in prettyIngredients" @click="$router.push({name: 'IngredientDetail', params: {ingredientKey: key}})")
          .ingredient-title {{ingredient.name}}
          .ingredient-unit {{`${ingredient.price} / ${ingredient.unit}`}}
      .ingredient-list-container(v-else-if="$route.name === 'IngredientSelect'")
        .ingredient-select-item(v-for="(ingredient, key) in prettyIngredients")
          v-checkbox(:label="ingredient.name" color="primary" v-model="selections[key]" hide-details)
    empty-list-container(v-else text="메뉴에 들어갈 재료들을 추가해주세요!" :buttonText="buttonText" clickRouteName="IngredientAdd")
    v-btn.btn-bottom-fixed(v-if="$route.name === 'IngredientSelect'" :disabled="isbtnDisabled" color="primary" @click="saveSelections()") 재료 추가하기
  spinner(v-else)
</template>

<script>
import ListEmptyContainer from '@/components/ListEmptyContainer'
import Spinner from '@/components/Spinner'
import db from '@/libs/vuefireConfig.js'
import { convertToMoneyString } from '@/libs/stringUtils'

export default {
  components: {
    'empty-list-container': ListEmptyContainer,
    'spinner': Spinner,
  },
  firebase: {
    ingredients: {
      source: db.ref('/ingredients/'),
      asObject: true,
      readyCallback: function() {
        this.isFirebaseLoaded = true
      }
    }
  },
  data () {
    return {
      buttonText: '재료 추가하기',
      isFirebaseLoaded: false,
      ingredients: this.$firebaseRefs ? this.$firebaseRefs.ingredients : null,
      selections: {},
      isbtnDisabled: false
    }
  },
  computed: {
    prettyIngredients: function () {
      if (this.ingredients) {
        let newIngredients = {};
        for (const key of Object.keys(this.ingredients)) {
          if (key === '.key') continue;
          const ingredient = this.ingredients[key];
          newIngredients[key] = {
            name: ingredient.name,
            price: convertToMoneyString(ingredient.price / ingredient.amount, 1),
            unit: ingredient.unit
          }
        }
        return newIngredients;
      } else {
        return null;
      }
    }
  },
  methods: {
    saveSelections () {
      let ingredients = {};
      for (const key of Object.keys(this.selections)) {
        if (this.selections[key]) ingredients[key] = '';
      }
      if (Object.keys(ingredients).length === 0) {
        alert('재료를 하나 이상 선택해주세요!');
        return;
      }
      this.$store.commit('setTemporaryMenu', {ingredients});
      this.$router.go(-1);
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

  .ingredient-title {
    overflow: hidden;
    padding-right: 40%;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ingredient-unit {
    bottom: .75rem;
    color: $primary-400;
    font-size: .9rem;
    position: absolute;
    right: 1.5rem;
  }

  .ingredient-select-item {
    padding: .5rem 1rem .25rem;
    border-bottom: 1px solid $border-color;

    .checkbox {
      height: 2.25rem;
    }
  }
}
</style>