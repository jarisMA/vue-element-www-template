<template>
  <div
    class="cover-img"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <div class="cover" :style="{ backgroundImage: `url(${url})` }"></div>
  </div>
</template>
<script>
export default {
  name: "TheLoadingImage",
  props: {
    width: {
      type: Number,
      default: null
    },
    height: {
      type: Number,
      default: null
    },
    url: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      show: true
    };
  },
  methods: {
    error() {
      this.show = false;
    }
  }
};
</script>
<style lang="less" scoped>
@keyframes coverLoading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
.cover-img {
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: coverLoading 1.4s ease infinite;
  overflow: hidden;
  .cover {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    image-rendering: -moz-crisp-edges; /* Firefox */
    image-rendering: -o-crisp-edges; /* Opera */
    image-rendering: -webkit-optimize-contrast; /*Webkit (non-standard naming) */
    image-rendering: crisp-edges;
    -ms-interpolation-mode: nearest-neighbor; /* IE (non-standard property) */
  }
}
</style>
