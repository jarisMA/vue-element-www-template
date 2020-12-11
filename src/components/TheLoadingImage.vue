<template>
  <div
    class="cover-img"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <img
      v-show="show"
      :src="url"
      :width="width"
      :height="height"
      :style="{ backgroundColor: bgColor }"
      @error="error"
    />
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
    },
    bgColor: {
      type: String,
      default: "#fff"
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
  img {
    object-fit: cover;
  }
}
</style>
