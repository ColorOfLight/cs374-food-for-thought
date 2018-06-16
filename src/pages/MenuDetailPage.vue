<template lang="pug">
  .page-container.menu-add-page
    .inputs-container
      .detail-item-group
        label 메뉴 이름
        .text {{menuData.name}}
      .detail-item-group
        label 재료
        .menu-ingredients-container
          v-layout(v-for="(ingred, index) in totalIngredients.prettyIngreds" :key="index")
            v-flex.left(xs9)
              .ingredient-wrapper
                .text {{ingred.name}}
                .amount {{ingred.amount + ' ' + ingred.unit}}
            v-flex.right(xs3)
              .ingredient-price {{ingred.ingredPrice}}
        .menu-detail-price-container
          v-layout
            v-flex.left(xs6)
              label 예상 단가
              .text.primary-text {{totalIngredients.prettyTotal}}
            v-flex.right(xs6)
              label 희망 소비자 가격
              .text {{convertedConsumerPrice}}
          v-layout
            v-flex.left(xs6)
              label 예상 이윤
              .text.primary-text {{totalIngredients.prettyBenefit}}
        .sales-graph-container
          .detail-item-group
            label 월별 메뉴 판매량 (예시)
            sales-graph
    v-btn.btn-bottom-fixed(color="primary" @click="$router.push({name:'MenuEdit', params: {menuKey: $route.params.menuKey}})") 수정하기
</template>

<script>
import db from '@/libs/vuefireConfig.js'
import { convertToMoneyString } from '@/libs/StringUtils'
import SalesGraph from '@/components/SalesGraph'

export default {
  created () {
    this.$bindAsObject('menuData', db.ref('/menus/' + this.$route.params.menuKey))
    this.$bindAsArray('ingredData', db.ref('/ingredients/'))
  },
  components: {
    'sales-graph': SalesGraph,
  },
  data () {
    return {
      ingredients: {
        // SFDS: 20
      },
      form: {}
    }
  },
  computed: {
    convertedConsumerPrice: function () {
      return this.menuData['consumerPrice'] == null ? null : convertToMoneyString(this.menuData['consumerPrice'])
    },
    totalIngredients: function () {
      let data = [];
      let expectedProdPrice = 0;

      if(this.menuData['ingredients']){
        for(let i = 0 ; i < this.ingredData.length; i++){
          if (this.menuData['ingredients'][this.ingredData[i]['.key']]) {
            let amountUsed = this.menuData['ingredients'][this.ingredData[i]['.key']]
            let amount = this.ingredData[i]["amount"]
            let price = this.ingredData[i]["price"]
            let prodPrice = price * (amountUsed / amount)

            data.push({
              name: this.ingredData[i]["name"],
              amount: amountUsed,
              unit: this.ingredData[i]["unit"],
              ingredPrice: convertToMoneyString(prodPrice)
            })

            expectedProdPrice = expectedProdPrice + prodPrice
          }
        }

        let result = {
          prettyIngreds: data,
          prettyTotal: convertToMoneyString(expectedProdPrice),
          prettyBenefit: convertToMoneyString(this.menuData['consumerPrice'] - expectedProdPrice)
        }

        return result;
      }
      return {
        prettyIngreds: null,
        prettyTotal: null,
        prettyBenefit: null
      };
    }
  },
}
</script>

<style scoped lang="scss">
.inputs-container {
  padding: 0 1rem;
}

.input-group {
  margin-bottom: -.5rem;
  margin-top: 1rem;
}

.btn-container {
  margin-top: .5rem;
  width: 100%;
}

.btn-select-ingredient {
  border-radius: .25rem;
  height: 2.5rem;
  width: 100%;
}
</style>
