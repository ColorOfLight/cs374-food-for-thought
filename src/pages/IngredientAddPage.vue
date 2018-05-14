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
    v-btn.btn-bottom-fixed(:disabled = "isbtnDisabled" color="primary" @click="submitForm()") 추가하기
</template>

<script>
import db from '@/libs/vuefireConfig.js'

export default {
  created () {
    if (this.$route.params.ingredientKey) {
      this.$bindAsObject('defaultData', db.ref('/ingredients/' + this.$route.params.ingredientKey), null, () => {
        this.form = this.defaultData
        for(let i = 0; i < this.units.length; i++){
          let unitSymbol = this.units[i].split(" ")[0];
          if(unitSymbol === this.defaultData.unit) this.form.unit = this.units[i];
        }
      })
    }
  },
  data () {
    return {
      units: ['g (무게)', 'ml (부피)', '개 (개수)'],
      form: {name : "", storeName : "", productName : "", amount : "", unit: "", price : ""},
      isbtnDisabled: true
    }
  },
  watch: {
    "form.amount": function (val) {
      this.checkValidity(val);
    },
    "form.name": function (val) {
      this.checkValidity(val);
    },
    "form.price": function (val) {
      this.checkValidity(val);
    },
    "form.storeName": function (val) {
      this.checkValidity(val);
    },
    "form.unit": function (val) {
      this.checkValidity(val);
    },
    "form.productName": function (val) {
      this.checkValidity(val);
    }
  },
  methods: {
    checkValidity (val) {
      if (this.form['amount'] != 0 && this.form['amount'] && this.form['name'] && this.form['price'] && this.form['storeName'] && this.form['unit'] && this.form['productName']) this.isbtnDisabled = false;
      else this.isbtnDisabled = true;
    },
    submitForm () {
      let key = this.$route.params.ingredientKey;
      if(!this.$route.params.ingredientKey) key = db.ref('/ingredients/').push().key;
      let updateData = {
        amount: this.form['amount'],
        name: this.form['name'],
        price: this.form['price'],
        storeName: this.form['storeName'],
        productName: this.form['productName'],
        unit: this.form['unit'].split(' ')[0],
        createdTimestamp: new Date()
      };
      let self = this;
      db.ref('/ingredients/' + key).update(updateData).then(function() {
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
