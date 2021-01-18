<template>
  <div :class="['attach-card', attach.type === 'plan' ? 'plan' : 'file']">
    <div class="image-wrapper">
      <the-loading-image
        v-if="attach.type === 'plan'"
        :width="80"
        :height="80"
        :url="attach.design_cover_url"
      />
      <img v-else class="file-icon" src="~images/term/data.svg" />
    </div>
    <h3 class="attach-name ellipsis">
      {{ attach.name }}{{ attach.type === "plan" ? ".plan" : "" }}
    </h3>
    <div class="attach-description">
      {{ attach.description || "-" }}
    </div>
    <div class="attach-size">
      {{ attach.type === "plan" ? "-" : sizeFormat(attach.size, 1) }}
    </div>
    <div class="attach-operate">
      <div v-if="attach.type === 'plan'" class="attach-btn" @click="copy">
        <img src="~images/term/copy.svg" />复制
      </div>
      <div v-else class="attach-btn" @click="download">
        <img src="~images/term/download.svg" />下载
      </div>
    </div>
  </div>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage";
import { sizeFormat } from "utils/function";

export default {
  name: "CampAttachCard",
  components: {
    TheLoadingImage
  },
  props: {
    attach: {
      type: Object,
      required: true
    }
  },
  methods: {
    sizeFormat,
    copy() {
      this.$emit("copy");
    },
    download() {
      this.$emit("download");
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
@padding: 20px;

.attach-card {
  position: relative;
  margin-bottom: 20px;
  padding: @padding;
  width: 100%;
  display: flex;
  align-items: center;
  background: #fff;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: @primaryColor;
    content: "";
  }
  .image-wrapper {
    margin-right: @padding;
    width: 80px;
    text-align: center;
    .file-icon {
      width: 60px;
      height: 60px;
    }
  }
  .attach-name {
    margin-right: @padding;
    width: 360px;
    font-size: 20px;
    font-weight: 600;
    color: #333333;
  }
  .attach-description {
    margin-right: @padding;
    width: 380px;
    font-size: 14px;
    line-height: 21px;
    color: #8ea098;
  }
  .attach-size {
    margin-right: 84px;
    width: 80px;
    font-size: 14px;
    font-weight: 400;
    color: #9b9b9b;
    text-align: center;
  }
  .attach-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 96px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    background: @primaryColor;
    img {
      margin-right: 9px;
    }
    cursor: pointer;
    &:hover {
      background: #43bf83;
    }
  }
}
</style>
