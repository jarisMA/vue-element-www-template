<template>
  <el-upload
    class="w-576 upload-demo"
    ref="upload"
    action=""
    :multiple="multiple"
    :drag="drag"
    :show-file-list="showFileList"
    :limit="limit"
    :accept="accept"
    :before-upload="handleBeforeUpload"
    :http-request="handleRequest"
    :disabled="disabled"
  >
    <!-- accept="application/pdf" -->
    <el-button
      class="el-input__inner"
      slot="trigger"
      :loading="btnLoading"
      plain
    >
      <i v-if="showIcon" class="el-icon-plus"></i>
      {{ text }}</el-button
    >
  </el-upload>
</template>
<script>
import ossService from "service/oss";
import commonMixins from "mixins/common";

export default {
  name: "UploadFile",
  mixins: [commonMixins],
  props: {
    fileInfo: {
      type: Object,
      default: () => {
        return {
          name: "",
          url: ""
        };
      }
    },
    text: {
      type: String,
      default: "选取文件"
    },
    bucket: {
      type: String,
      default: null
    },
    space: {
      type: String,
      default: "www"
    },
    folder: {
      type: String,
      default: "task"
    },
    limit: {
      type: Number,
      default: 1
    },
    uploadLimit: {
      type: Number,
      default: 500
    },
    multiple: {
      type: Boolean,
      default: false
    },
    drag: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: ""
    },
    format: {
      type: Array,
      default: () => ["pdf"]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    canDelete: {
      type: Boolean,
      default: false
    },
    showFileList: {
      type: Boolean,
      default: false
    },
    showTips: {
      type: Boolean,
      default: true
    },
    showIcon: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      btnLoading: false
    };
  },
  methods: {
    // 上传之前验证
    handleBeforeUpload(file) {
      if (!file) {
        this.$notice({
          type: "danger",
          title: "上传文件找不到"
        });
        return false;
      }
      if (!this.validateFile(file)) {
        return false;
      }
      const size = this.uploadLimit * 1024 * 1024;

      if (file.size > size) {
        this.$notice({
          type: "danger",
          title: `请上传不大于 ${this.uploadLimit} MB 的文件`
        });
        return false;
      }
      return true;
    },
    validateFile(file) {
      const size = this.uploadLimit * 1024;
      const fileName = file.name;
      const suffix = fileName.split(".").pop();
      const isValidate = this.format.includes(suffix);
      const format = this.format.join("、");
      if (file.size > size || !isValidate) {
        if (this.uploadLimit < 1024) {
          this.$notice({
            type: "danger",
            title: `请上传不大于 ${this.uploadLimit}KB 且格式为${format} 的文件`
          });
        } else {
          this.$notice({
            type: "danger",
            title: `请上传不大于 ${this.uploadLimit /
              1024}MB 且格式为${format} 的文件`
          });
        }
        return false;
      }
      return true;
    },
    // 上传
    handleRequest({ file }) {
      if (!this.checkIsLogin()) {
        this.$refs.upload.clearFiles();
        return;
      }
      const space = this.space;
      const folder = this.folder;
      this.btnLoading = true;
      ossService.upload(
        {
          file,
          space,
          folder
        },
        res => {
          const fileInfo = {
            name: file.name,
            url: res.url
          };
          this.$emit("update:fileInfo", fileInfo);
        },
        () => {
          this.$notice({
            type: "danger",
            title: "上传失败"
          });
        },
        () => {
          this.$refs.upload.clearFiles();
          this.btnLoading = false;
        }
      );
    }
  }
};
</script>
