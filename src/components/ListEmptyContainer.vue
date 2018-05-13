<template lang="pug">
  .empty-list-container
      .empty-list-text {{text}}
      v-btn.btn-new-menu(color="primary" outline @click="$router.push({name: clickRouteName})")
        v-icon.add-icon add
        | {{buttonText}}
</template>

<script>
export default {
  props: ['text', 'buttonText', 'clickRouteName']
}
</script>

<style scoped lang="scss">
.empty-list-container {
  background-color: $white;
  border-color: $border-color;
  border-style: solid;
  border-width: 1px 0;
  padding: 1rem 1.5rem 1.5rem;

  .empty-list-text {
    color: $gray-500;
    margin-bottom: 1rem;
    text-align: center;
  }
}

.btn-new-menu {
  background-color: $white !important;
  height: 3rem;
  width: 100%;

  .add-icon {
    margin-left: -1rem;
    margin-right: 1rem;
  }
}
</style>