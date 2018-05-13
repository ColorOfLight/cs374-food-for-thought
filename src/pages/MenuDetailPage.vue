<template lang="pug">
  .page-container.menu-add-page
    .inputs-container
      .detail-item-group
        label 메뉴 이름
        .text 아메리카노
      .detail-item-group
        label 재료
        .menu-ingredients-container
          v-layout
            v-flex.left(xs9)
              .ingredient-wrapper
                .text 물
                .amount 200 ml
            v-flex.right(xs3)
              .ingredient-price 500 원
          v-layout
            v-flex.left(xs9)
              .ingredient-wrapper
                .text 물
                .amount 200 ml
            v-flex.right(xs3)
              .ingredient-price 500 원
       
        .menu-detail-price-container
          v-layout
            v-flex.left(xs6)
              label 예상 단가
              .text.primary-text 1,000 원
            v-flex.right(xs6)
              label 희망 소비자 가격
              .text 3,000 원
          v-layout
            v-flex.left(xs6)
              label 예상 이윤
              .text.primary-text 2,800 원
    v-btn.btn-bottom-fixed(:disabled = "isbtnDisabled" color="primary" @click="submitForm()") 편집하기
</template>

<script>
export default {
  data () {
    return {
      ingredients: {
        // SFDS: 20 
      },
      form: {},
      isbtnDisabled: true
    }
  },
  methods: {
    submitForm () {
      // let newkey = db.ref('/ingredients/').push().key;
      // let updateData = {
      //   amount: this.form['amount'],
      //   name: this.form['name'],
      //   price: this.form['price'],
      //   storeName: this.form['storeName'],
      //   productName: this.form['productName'],
      //   unit: this.form['unit'].split(' ')[0],
      //   createdTimestamp: new Date()
      // };
      // let self = this;
      // db.ref('/ingredients/' + newkey).update(updateData).then(function() {
      //   self.$router.go(-1);
      // });
    },
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