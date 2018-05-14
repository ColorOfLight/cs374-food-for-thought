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

<style lang="stylus">

@import './stylus/main.styl'

html {
  color: #333;
  font-size: 16px;
}

@media (min-width:481px) {
  .app {
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    margin: 0 auto;
    overflow: hidden;
    width: 480px;
  }
}
</style>
