<template>
  <div class="the-preview-image">
    <el-image
      ref="image"
      class="preview-image-wrapper"
      :style="{ width: width, height: height }"
      v-for="(url, key) of srcList"
      :key="key"
      :fit="fit"
      :src="url"
      :preview-src-list="srcList"
      @click.stop="handleClickItem"
    >
    </el-image>
  </div>
</template>

<script>
export default {
  name: "ThePreviewImage",
  props: {
    srcList: {
      type: Array,
      default: () => []
    },
    fit: {
      type: String,
      default: "cover"
    },
    width: {
      type: String,
      default: "100px"
    },
    height: {
      type: String,
      default: "100px"
    }
  },
  mounted() {
    window.addEventListener("click", this.handleClickItem, true);
  },
  destroyed() {
    window.removeEventListener("click", this.handleClickItem, true);
  },
  methods: {
    handleClickItem(e) {
      const target = e.target;
      if (target.className === "el-image-viewer__mask") {
        target.parentNode.children[1].click();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.the-preview-image {
  display: flex;
  .preview-image-wrapper {
    width: 100px;
    height: 100px;
    background: #d8d8d8ff;
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
  .image-count {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 36px;
    font-weight: 400;
    color: #ffffff;
    background: #33333380;
  }
}
</style>
