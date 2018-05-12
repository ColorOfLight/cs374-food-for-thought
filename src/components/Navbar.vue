<template lang="pug">
  div
    v-navigation-drawer(v-model="drawer" temporary absolute)
      v-list
        v-list-tile
          v-list-tile-title test
    v-toolbar.toolbar
      v-toolbar-side-icon.toolbar-icon(@click="drawer = !drawer")
      v-toolbar-title.toolbar-title title
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
    }
  }
}
</script>

<style scoped lang="scss">
.toolbar {
  background-color: $white;
  box-shadow: 0 1.5px 1.5px rgba(0, 0, 0, .15);
}

.toolbar-title {
  color: $default;
}

.toolbar-icon {
  color: $gray-500;
}
</style>