<template lang="pug">
  .page-container.menu-add-page
    .inputs-container
      v-text-field(name="name" label="메뉴 이름" value="" placeholder="아메리카노")
      .detail-item-group
        label 재료 선택 및 양 입력하기
        .menu-ingredients-container(v-if="Object.keys(ingredients).length > 0")
          v-layout
            v-flex.left(xs9)
              v-text-field(name="ingredientSFDS" prefix="물" suffix=" ml" hide-details)
            v-flex.right(xs3)
              .ingredient-price 500 원
          v-layout
            v-flex.left(xs9)
              v-text-field(name="ingredientSFDS" prefix="물" suffix=" ml" hide-details)
            v-flex.right(xs3)
              .ingredient-price 500 원
        .btn-container(v-else)
          v-btn.btn-select-ingredient(color="primary" outline) 재료 선택하기
       
        .menu-detail-price-container
          v-layout
            v-flex.left(xs6)
              label 예상 단가
              .text 1,650 원
            v-flex.right(xs6)
              label 희망 소비자 가격
              v-text-field(name="consumerPrice" value="" placeholder="0" suffix=" 원")
          v-layout
            v-flex.left(xs6)
              label 예상 이윤
              .text - 원
</template>

<script>
export default {
  data () {
    return {
      ingredients: {
        SFDS: 20 
      }
    }
  }
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
</style>