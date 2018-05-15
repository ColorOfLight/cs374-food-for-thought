<template lang="pug">
  .page-container.menu-add-page
    .inputs-container(v-if="showContent")
      v-text-field(name="name" label="메뉴 이름" v-model="form.name" placeholder="아메리카노")
      .detail-item-group
        label 재료 선택 및 양 입력하기
        .menu-ingredients-container(v-if="Object.keys(prettyInfos.ingredients).length > 0")
          v-layout(v-for="(ingred, key) in prettyInfos.ingredients" :key="key")
            v-flex.left(xs9)
              v-text-field(type="number" :prefix="ingred.name" :suffix="ingred.unit" v-model="form.ingredients[key]" hide-details)
            v-flex.right(xs3)
              .ingredient-price(:class="{uninputted: ingred.productionPrice === 0}") {{ingred.productionPriceText}}
          v-layout.btn-ingredient-edit-container
            v-flex(xs7)
            v-flex(xs5)
              v-btn.btn-select-ingredient(color="primary" outline @click="$router.push({name: 'IngredientSelect'})") 재료 편집하기
        .btn-container(v-else)
          v-btn.btn-select-ingredient(color="primary" outline @click="$router.push({name: 'IngredientSelect'})") 재료 선택하기
        .menu-detail-price-container
          v-layout
            v-flex.left(xs6)
              label 예상 단가
              .text.primary-text(:class="{uninputted: prettyInfos.expectedPrice === 0}") {{prettyInfos.totalPriceText}}
            v-flex.right(xs6)
              label 희망 소비자 가격
              v-text-field(name="consumerPrice" type="number" placeholder="0" suffix=" 원" v-model="form.consumerPrice")
          v-layout
            v-flex.left(xs6)
              label 예상 이윤
              .text.primary-text(:class="{uninputted: prettyInfos.expectedProfit === 0}") {{prettyInfos.profitText}}
    v-btn.btn-bottom-fixed(:disabled ="isBtnDisabled" color="primary" @click="submitForm()") {{bottomBtnText}}
</template>

<script>
import db from '@/libs/vuefireConfig.js'
import { convertToMoneyString } from '@/libs/StringUtils'

export default {
  created () {
    if (this.$route.params.menuKey) {
      if (Object.keys(this.$store.state.temporaryMenu).length === 0) {
        this.$bindAsObject('defaultData', db.ref('/menus/' + this.$route.params.menuKey), null, () => {
          this.form = this.defaultData
          this.$store.commit('setTemporaryMenu', this.defaultData)
          this.isMenuLoaded = true;
        });
      } else {
        this.isMenuLoaded = true;
      }
      this.$bindAsObject('ingredients', db.ref('/ingredients/'), null, () => {
        this.$store.commit('setIngredients', this.ingredients)
        this.isIngredsLoaded = true;
      });
    }
  },
  data () {
    return {
      form: {
        name: this.$store.state.temporaryMenu.name ? this.$store.state.temporaryMenu.name : '',
        ingredients: this.$store.state.temporaryMenu.ingredients ? this.$store.state.temporaryMenu.ingredients : {},
        consumerPrice: this.$store.state.temporaryMenu.consumerPrice ? this.$store.state.temporaryMenu.consumerPrice : '',
      },
      isBtnDisabled: true,
      isMenuLoaded: false,
      isIngredsLoaded: false,
    }
  },
  computed: {
    prettyInfos () {
      let prettyIngreds = {};
      let expectedPrice = 0;
      let expectedProfit = 0;
      const storedIngreds = this.$store.state.ingredients;
      const selectedIngreds = this.$store.state.temporaryMenu.ingredients ? this.$store.state.temporaryMenu.ingredients : {};
      for (const key of Object.keys(selectedIngreds)) {
        let item = {};
        item.name = storedIngreds[key].name;
        item.unit = storedIngreds[key].unit;
        item.productionPrice = this.calculateProductionPrice(storedIngreds[key].price, storedIngreds[key].amount, selectedIngreds[key]);
        if (item.productionPrice > 0) item.productionPriceText = convertToMoneyString(item.productionPrice);
        else item.productionPriceText = '- 원';
        prettyIngreds[key] = (item);
        expectedPrice += item.productionPrice;
      }
      if (this.form.consumerPrice) {
        expectedProfit = parseInt(this.form.consumerPrice) - expectedPrice;
      }
      return {
        ingredients: prettyIngreds,
        totalPriceText: expectedPrice ? convertToMoneyString(expectedPrice) : "- 원",
        profitText: expectedProfit ? convertToMoneyString(expectedProfit) : "- 원",
      };  
    },
    showContent () {
      if (this.$route.name === 'MenuAdd') return true;
      else if (this.$route.name === 'MenuEdit') return this.isMenuLoaded && this.isIngredsLoaded;
      else return false;
    },
    bottomBtnText() {
      if (this.$route.name === 'MenuAdd') return '추가하기';
      else if (this.$route.name === 'MenuEdit') return '수정 완료하기';
      else return '';
    }
  },
  watch: {
    'form': {
      handler(form) {
        let allIngredsInputted = true;
        if (Object.keys(form.ingredients).length === 0) allIngredsInputted = false;
        for (const key of Object.keys(form.ingredients)) {
          if (!form.ingredients[key]) allIngredsInputted = false;
        }
        if (form.name && form.consumerPrice && allIngredsInputted) {
          this.isBtnDisabled = false;
        } else {
          this.isBtnDisabled = true;
        }
      },
      deep: true,
    },
    'form.name': function (name) {
      this.$store.commit('setTemporaryMenu', {name})
    },
    'form.consumerPrice': function (consumerPrice) {
      this.$store.commit('setTemporaryMenu', {consumerPrice})
    },
    'form.ingredients': {
      handler(ingredients) {
        this.$store.commit('setTemporaryMenu', {ingredients})
      },
      deep: true,
    }
  },
  methods: {
    submitForm () {
      let key = this.$route.params.menuKey;
      if(!this.$route.params.menuKey) key = db.ref('/ingredients/').push().key;
      let updateData = {
        name: this.form.name,
        ingredients: this.form.ingredients,
        consumerPrice: this.form.consumerPrice,
        createdTimestamp: new Date()
      };
      let self = this;
      db.ref('/menus/' + key).update(updateData).then(function() {
        self.$router.go(-1);
      });
    },
    calculateProductionPrice(price, amount, input) {
      const numPrice = (typeof price === 'number') ? price : parseInt(price);
      const numAmount = (typeof amount === 'number') ? amount : parseInt(amount);
      const numInput = (typeof input === 'number') ? input : parseInt(input);
      // TODO: amount === 0일 때 에러 처리
      if (isNaN(numInput) || numAmount === 0) return 0;
      return numPrice / numAmount * numInput;
    }
  },
  beforeRouteLeave (to, from, next) {
    if (!(to.name === 'IngredientSelect')) {
      this.$store.commit('resetTemporaryMenu');
    }
    next();
  },
}
</script>

<style scoped lang="scss">
.inputs-container {
  padding: 0 1rem 2rem;
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

.btn-ingredient-edit-container {
  margin-top: 1.25rem;
}
</style>