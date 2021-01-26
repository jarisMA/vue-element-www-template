<template>
  <svg class="svg-icon" :class="svgClass">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: "IconSvg",
  props: {
    svgClass: {
      type: [String, Array]
    },
    svgName: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.svgName}`;
    }
  }
};
</script>

<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  stroke: currentColor;
  overflow: hidden;
}
</style>
