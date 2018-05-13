<template lang="pug">
  .ingredient-add-page
    .inputs-container
      .detail-item-group
        label 재료 이름
        .text 초콜릿 시럽
      .detail-item-group
        label 거래처 이름
        .text 홈플러스 유성점
      .detail-item-group
        label 제품명
        .text 기라델리 초콜릿 소스 스퀴즈 보틀
      v-layout
        v-flex.left(xs-6)
          .detail-item-group
            label 용량
            .text 454 g
        v-flex.right(xs-6)
          .detail-item-group
            label 가격
            .text 9,580 원
      .detail-item-group
        label 단위 용량당 가격
        .text 21.1 원
    v-btn.btn-bottom-fixed(color="primary") 추가하기
</template>

<script>
export default {
  data () {
    return {
      units: ['g (무게)', 'ml (부피)', '개 (개수)']
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