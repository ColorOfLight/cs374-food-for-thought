<template>
  <div class="spinner-wrapper">
    <div class="sk-folding-cube">
      <div class="sk-cube1 sk-cube"></div>
      <div class="sk-cube2 sk-cube"></div>
      <div class="sk-cube4 sk-cube"></div>
      <div class="sk-cube3 sk-cube"></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
$spinkit-size: 3.5rem;
$spinkit-spinner-color: $primary-200;

@import 'node_modules/spinkit/scss/spinners/11-folding-cube';

.spinner-wrapper {
  margin-top: 12rem;
}
</style>