<template>
  <div
    :class="['cover-img', show ? 'animation' : '']"
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
  watch: {
    url() {
      this.getImage();
    }
  },
  created() {
    this.getImage();
  },
  methods: {
    error() {
      this.show = false;
    },
    getImage() {
      this.show = true;
      const url = this.url;
      if (!url) {
        this.show = false;
        return;
      }
      const image = new Image();
      image.src = url;

      // 判断是否有缓存
      if (image.complete) {
        this.show = false;
      } else {
        image.onload = () => {
          this.show = false;
        };
      }
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
  background: #f2f2f2;
  overflow: hidden;
  &.animation {
    background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
    background-size: 400% 100%;
    animation: coverLoading 1.4s ease infinite;
  }
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
