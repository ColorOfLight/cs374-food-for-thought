<template lang="pug">
  .intro-page
    img.icon-coffee-beans(src="~@/assets/icons/coffee-beans.png" height="84px" width="88px")
    .intro-title 카페 대장부
    .btn-container
      v-btn(color="primary" outline @click="$router.push({name: 'MenuList'})") 등록한 메뉴 보기
      v-btn(color="primary" outline @click="$router.push({name: 'IngredientList'})") 등록한 재료 보기
    .intro-footer Developed by Team FoodForThought
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.intro-page {
  background-color: $primary;
  height: 100%;
  padding-bottom: 5rem;
  text-align: center;
  width: 100%;
}

.icon-coffee-beans {
  margin-top: 4.5rem;
}

.intro-title {
  color: $white;
  font-size: 3rem;
  font-weight: 600;
  margin-top: 3rem;
}

.btn-container {
  margin-top: 5rem;
  padding: 0 1.5rem;

  .btn {
    background-color: $white !important;
    font-size: 1.25rem;
    height: 3.5rem;
    width: 100%;

    & + .btn {
      margin-top: 2.5rem;
    }
  }
}

.intro-footer {
  bottom: 2rem;
  color: $white;
  font-size: 0.9rem;
  left: 0;
  position: absolute;
  right: 0;
}
</style>