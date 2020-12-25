<template>
  <div v-loading="uploading">
    <el-upload
      ref="upload"
      class="upload"
      action=""
      accept="image/*"
      :before-upload="upload"
    >
      <div class="add-image">
        <img src="~images/add.png" />
      </div>
    </el-upload>
  </div>
</template>

<script>
import ossService from "service/oss";

export default {
  name: "UploadImage",
  data() {
    return {
      uploading: false
    };
  },
  methods: {
    upload(file) {
      this.uploading = true;
      ossService.upload(
        {
          file,
          space: "homework",
          folder: "homework"
        },
        res => {
          this.$emit("added", res.url);
        },
        () => {
          this.$notice({
            type: "danger",
            title: "上传效果图失败"
          });
        },
        () => {
          this.$refs.upload.clearFiles();
          this.uploading = false;
        }
      );
      return false;
    }
  }
};
</script>

<style lang="less" scoped>
.add-image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background: #e5e5e5;
  border: 1px dashed #979797;
  cursor: pointer;
  img {
    width: 44px;
    height: 44px;
  }
}
</style>
