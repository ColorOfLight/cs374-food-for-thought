<template lang="pug">
  v-app.app
    navbar
    router-view
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    navbar: Navbar
  },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  name: 'App'
}
</script>

<style lang="scss">
@import './assets/stylesheets/fonts';

body {
  color: $default;
  font-size: 16px;
}

@include above-sm {
  .app {
    margin: 0 auto;
    width: 480px;
  }
}
</style>