<template lang="pug">
  .ingredient-add-page
    .inputs-container
      .detail-item-group
        label 재료 이름
        .text {{data.name}}
      .detail-item-group
        label 거래처 이름
        .text {{data.storeName}}
      .detail-item-group
        label 제품명
        .text {{data.productName}}
      v-layout
        v-flex.left(xs-6)
          .detail-item-group
            label 용량
            .text {{convertedAmount}}
        v-flex.right(xs-6)
          .detail-item-group
            label 가격
            .text {{convertedPrice}}
      .detail-item-group
        label 단위 용량당 가격
        .text {{convertedUnitPrice}}
    v-btn.btn-bottom-fixed(color="primary" @click="$router.push(editRoute)") 편집하기
</template>

<script>
import db from '@/libs/vuefireConfig.js'
import { convertToMoneyString } from '@/libs/StringUtils'

export default {
  created () {
    this.$bindAsObject('data', db.ref('/ingredients/' + this.$route.params.ingredientKey))
  },
  data () {
    return {
      units: ['g (무게)', 'ml (부피)', '개 (개수)'],
      editRoute: {
        name: 'IngredientEdit',
        params: {
          ingredientKey: this.$route.params.ingredientKey
        }
      },
    }
  },
  computed: {
    convertedPrice: function () {
      return this.data['price'] == null ? null : convertToMoneyString(this.data['price']);
    },
    convertedUnitPrice: function () {
      return this.data['price'] == null ? null : convertToMoneyString(this.data['price'] / this.data['amount'])
    },
    convertedAmount: function () {
      return this.data['amount'] == null? null : this.data['amount'] + ' ' + this.data['unit']
    }
  }
}
</script>

<style scoped lang="scss">
.ingredient-add-page {
  padding-top: 1.5rem;
  padding-bottom: 3.5rem;
}

.inputs-container {
  background-color: $white;
  border-bottom: 1px solid $border-color;
  border-top: 1px solid $border-color;
  padding: 0 1rem 1rem;
}

.input-group {
  margin-bottom: -.5rem;
  margin-top: 1rem;
}
</style>
