<template>
  <div class="the-preview-image">
    <div ref="wrapper">
      <el-image
        ref="image"
        class="preview-image-wrapper"
        :fit="fit"
        :src="url"
        :preview-src-list="srcList"
      >
      </el-image>
    </div>
    <span class="image-count" v-if="srcList.length > 1" @click="previewClick">
      +{{ srcList.length }}
    </span>
  </div>
</template>

<script>
export default {
  name: "ThePreviewImage",
  props: {
    url: {
      type: String,
      default: null
    },
    srcList: {
      type: Array,
      default: () => []
    },
    fit: {
      type: String,
      default: "cover"
    }
  },
  methods: {
    previewClick() {
      this.$refs.image.$el.children[0].click();
    }
  }
};
</script>

<style lang="less" scoped>
.the-preview-image {
  .preview-image-wrapper {
    width: 100%;
    height: 100%;
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
