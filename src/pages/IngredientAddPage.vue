<template lang="pug">
  .ingredient-add-page
    .inputs-container
      v-text-field(name="name" label="재료 이름" placeholder="물, 원두, ..." v-model="form.name")
      v-text-field(name="storeName" label="거래처 이름" placeholder="메가마트, 홈플러스 유성점, ..." v-model="form.storeName")
      v-text-field(name="productName" label="제품명" placeholder="매일우유, 기라델리 초콜릿 시럽, ..." v-model="form.productName")
      v-layout
        v-flex.left(xs7)
          v-text-field(name="amount" label="용량 (숫자만 입력)" type="number" placeholder="100" v-model="form.amount")
        v-flex.right(xs5)
          v-select(:items="units" label="단위" placeholder="선택" v-model="form.unit")
      v-text-field(name="price" label="가격 (원)" type="number" placeholder="1000" v-model="form.price")
    v-btn.btn-bottom-fixed(color="primary" @click="submitForm()") 추가하기
</template>

<script>
import db from '@/libs/vuefireConfig.js'

export default {
  data () {
    return {
      units: ['g (무게)', 'ml (부피)', '개 (개수)'],
      form: {},
    }
  },
  methods: {
    submitForm () {
      /* Exception handling */
      if(this.form['amount'] == null){
        /* TODO: Tell user that this something is missing */
        console.log('amount is missing...')
        return;
      }
      else if(this.form['name'] == null){
        console.log('name is missing...')
        return;
      }
      else if(this.form['price'] == null){
        console.log('price is missing...')
        return;
      }
      else if(this.form['storeName'] == null){
        console.log('store name is missing...')
        return;
      }
      else if(this.form['unit'] == null){
        console.log('unit is missing...')
        return;
      }

      let newkey = db.ref('/ingredients/').push().key;
      let updateData = {
        amount: this.form['amount'],
        name: this.form['name'],
        price: this.form['price'],
        storeName: this.form['storeName'],
        unit: this.form['unit'].split(' ')[0],
        createdTimestamp: new Date()
      };
      let self = this;
      db.ref('/ingredients/' + newkey).update(updateData).then(function() {
        console.log(updateData);
        self.$router.go(-1);
      });
    },
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
