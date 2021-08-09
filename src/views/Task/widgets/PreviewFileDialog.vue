<template>
  <el-dialog
    custom-class="preview-file-wrapper"
    :visible.sync="showPreviewFileDialog"
    :show-close="false"
  >
    <div
      class="preview-file-container"
      v-if="fileList.length > 0"
      @click="handleClose"
    >
      <div class="preview-file-close" @click.stop="handleClose">
        <i class="close-icon"></i>
      </div>
      <div class="preview-file-content">
        <div
          class="preview-file-content_title"
          v-if="
            fileList[activeFileIndex].display_name ||
              fileList[activeFileIndex].name
          "
        >
          {{
            fileList[activeFileIndex].name ||
              fileList[activeFileIndex].display_name
          }}
        </div>
        <div class="preview-file-content_file">
          <img
            v-if="fileType == 'img'"
            :src="fileList[activeFileIndex].url"
            @click.stop
          />
          <video
            controls="controls"
            height="440"
            width="780"
            v-if="fileType == 'video'"
            :src="fileList[activeFileIndex].url"
            @click.stop
          ></video>
        </div>
        <div class="preview-content_description">
          {{ fileList[activeFileIndex].description }}
        </div>
        <div class="preview-file-content_pagination">
          {{ activeFileIndex + 1 }}/{{ fileList.length }}
        </div>
        <div
          class="preview-file-prev"
          v-if="activeFileIndex > 0"
          @click.stop="handleArrowClick(activeFileIndex - 1)"
        >
          <i class="prev-icon"></i>
        </div>
        <div
          class="preview-file-next"
          v-if="activeFileIndex + 1 < fileList.length"
          @click.stop="handleArrowClick(activeFileIndex + 1)"
        >
          <i
            class="
               next-icon"
          ></i>
        </div>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    showPreviewFileDialog: {
      type: Boolean,
      default: false
    },
    fileList: {
      type: Array,
      default: () => []
    },
    fileType: {
      type: String,
      default: ""
    },
    activeFileIndex: {
      type: Number,
      default: null
    }
  },
  methods: {
    handleArrowClick(idx) {
      this.$emit("update", idx);
    },
    handleClose() {
      this.$emit("update:showPreviewFileDialog", false);
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .preview-file-wrapper {
  margin: 0 !important;
  width: 100vw;
  height: 100vh;
  background: transparent;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    padding: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .preview-file-container {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 46px 120px;
    .preview-file-close,
    .preview-file-prev,
    .preview-file-next {
      position: absolute;
      width: 40px;
      height: 40px;
      background: #333;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        background: #111;
      }
    }
    .preview-file-close {
      right: 20px;
      top: 20px;
      .close-icon {
        display: inline-block;
        width: 40px;
        height: 40px;
        mask: url("~images/commodity/close.svg") no-repeat center;
        background-color: #fff;
      }
    }
    .preview-file-prev,
    .preview-file-next {
      width: 60px;
      height: 60px;
    }
    .preview-file-prev {
      top: 50%;
      left: -90px;
      transform: translateY(-50%);
      .prev-icon {
        display: inline-block;
        width: 60px;
        height: 60px;
        mask: url("~images/bible/left.svg") no-repeat center;
        background-color: #fff;
      }
    }
    .preview-file-next {
      top: 50%;
      right: -90px;
      transform: translateY(-50%);
      .next-icon {
        display: inline-block;
        width: 60px;
        height: 60px;
        mask: url("~images/bible/right.svg") no-repeat center;
        background-color: #fff;
      }
    }
    .preview-file-content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      .preview-file-content_title {
        flex: none;
        height: 24px;
        margin-bottom: 20px;
        line-height: 24px;
        font-weight: 600;
        font-size: 16px;
        text-align: center;
        color: #ffffff;
      }
      .preview-content_description {
        flex: none;
        min-height: 100px;
        width: 600px;
        margin-bottom: 20px;
        line-height: 24px;
        font-weight: 600;
        font-size: 16px;
        text-align: center;
        color: #ffffff;
      }
      .preview-file-content_file {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: auto;
        min-height: 500px;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
      .preview-file-content_pagination {
        flex: none;
        margin-top: 20px;
        line-height: 20px;
        font-weight: 600;
        font-size: 14px;
        color: #ffffff;
      }
    }
  }
}
</style>
