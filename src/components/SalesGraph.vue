<template lang="pug">
  .sales-graph
    .graph-box
      .bar-wrapper(v-for="number in Object.values(data)")
        .bar(:style="getBarStyle(number)" :class="{primary:(number === highestNumber)}")
    .labels-container
      .graph-label(v-for="text in Object.keys(data)" :class="{'primary-text':(text === highestText)}") {{text}}
</template>

<script>
export default {
  data () {
    return {
      data: {
        '8월': 20,
        '9월': 64,
        '10월': 70,
        '11월': 110,
        '12월': 130,
      },
    }
  },
  computed: {
    highestNumber: function () {
      return Math.max(...Object.values(this.data));
    },
    highestText: function () {
      return Object.keys(this.data).find(key => this.data[key] === this.highestNumber);
    }
  },
  methods: {
    getBarStyle (number) {
      return `height:${number/this.highestNumber*100}%`;
    }
  }
}
</script>

<style scoped lang="scss">
$bar-width: 48px;
$bar-interval-margin: 8px;

.graph-box {
  border-bottom: 1px solid $gray-500;
  height: 116px;
  margin-top: 16px;
  width: 100%;
}

.bar-wrapper {
  display: inline-block;
  height: 100%;
  margin-left: $bar-interval-margin;
  position: relative;
  width: $bar-width;
}

.bar {
  background-color: $gray-300;
  bottom: 0;
  position: absolute;
  width: 100%;
}

.graph-label {
  color: $gray-500;
  display: inline-block;
  font-size: 10pt;
  margin-left: $bar-interval-margin;
  text-align: center;
  width: $bar-width;
}

.primary-text {
  color: $primary !important;
}
</style>