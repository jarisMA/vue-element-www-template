<template>
  <div :class="[theme]" v-loading="uploading">
    <el-upload
      ref="upload"
      class="upload"
      action=""
      accept="image/*"
      :before-upload="upload"
    >
      <div v-if="theme === 'comment'">
        <icon-svg svg-class="pic-icon" svg-name="pic"></icon-svg>
      </div>
      <div class="add-image" v-else>
        <img src="~images/add.png" />
      </div>
    </el-upload>
  </div>
</template>

<script>
import ossService from "service/oss";

export default {
  name: "UploadImage",
  props: {
    theme: {
      type: String
    }
  },
  data() {
    return {
      uploading: false
    };
  },
  methods: {
    validateFile(file) {
      const fileName = file.name;
      const suffix = fileName.split(".").pop();
      const imageRegex = /(jpg|jpeg|gif|png|svg)/;
      if (!imageRegex.test(suffix)) {
        this.$notice({
          type: "danger",
          title: "只能上传jpg|jpeg|gif|png|svg的图片哦～"
        });
        return false;
      }
      return true;
    },
    upload(file) {
      if (!this.validateFile(file)) {
        return false;
      }
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
@import "~styles/variable";
.comment {
  /deep/ .upload {
    line-height: 24px;
  }
}
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
.comment-more,
.question {
  .add-image {
    width: 80px;
    height: 80px;
    border-color: #efefef;
    background: transparent;
    img {
      width: 24px;
      height: 24px;
    }
  }
}
.comment-more {
  .add-image {
    width: 130px;
    height: 130px;
  }
}
.pic-icon {
  font-size: 24px;
  color: @primaryColor;
}
</style>
