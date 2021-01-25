<template>
  <div
    v-loading="loading"
    :class="['quillEditor-wrapper', disabled ? 'disabled' : '']"
  >
    <quill-editor ref="quillEditor" v-model="content" :options="options" />
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import Quill from "quill";
import ImageResize from "quill-image-resize-module";
Quill.register("modules/imageResize", ImageResize);

import ossService from "service/oss";
import unfoldSvg from "images/question/unfold.svg";

const uploadConfig = {
  accept: "image/jpeg image/gif image/png",
  uploadLimit: 4096
};

const toolbarOptions = [
  [
    "bold",
    "italic"
    // "underline",
    // "strike"
  ],
  // [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  // [{ script: "sub" }, { script: "super" }],
  // [{ color: [] }, { background: [] }],
  // [{ align: [] }],
  ["blockquote"],
  ["link", "image"],
  ["clean"],
  ["resize"]
];

const handlers = function(that) {
  return {
    image() {
      const fileInput = document.createElement("input");
      fileInput.setAttribute("type", "file");
      fileInput.setAttribute("accept", uploadConfig.accept);
      fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        fileInput.value = "";
        if (file.size > uploadConfig.uploadLimit * 1024) {
          if (uploadConfig.uploadLimit < 1024) {
            that.$message.error(
              `请上传不大于 ${uploadConfig.uploadLimit}KB 且格式为jpg、gif、png 的文件`
            );
          } else {
            that.$message.error(
              `请上传不大于 ${uploadConfig.uploadLimit}MB 且格式为jpg、gif、png 的文件`
            );
          }
          return;
        }
        that.loading = true;
        ossService.upload(
          { file, space: "rich-text", folder: "rich-text" },
          res => {
            let length = this.quill.getSelection(true).index;
            this.quill.insertEmbed(length, "image", res.url);
            this.quill.setSelection(length + 1);
          },
          () => {
            that.$message.error("上传图片失败");
          },
          () => {
            that.loading = false;
          }
        );
      });
      fileInput.click();
    },
    resize: () => {
      //添加工具方法
      that.$emit("larger");
    }
  };
};

export default {
  name: "TheRichText",
  components: {
    quillEditor
  },
  props: {
    value: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "请在这里输入"
    }
  },
  data() {
    return {
      loading: false,
      content: this.value || "",
      options: {
        placeholder: this.placeholder,
        modules: {
          imageResize: {
            handleStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white"
            },
            modules: [
              "Resize",
              "DisplaySize"
              // "Toolbar"
            ]
          },
          toolbar: {
            container: toolbarOptions,
            handlers: handlers(this)
          }
        }
      }
    };
  },
  watch: {
    value(val) {
      this.content = val;
    },
    content(val) {
      this.$emit("update:value", val);
    },
    disabled(val) {
      this.changeDisabled(val);
    }
  },
  mounted() {
    const quillEditor = this.$refs.quillEditor;
    // quillEditor.$el.addEventListener('paste', e => this.pasteImg(e), false);
    quillEditor.quill.root.addEventListener(
      "paste",
      e => this.pasteImg(e),
      false
    );
    this.changeDisabled(this.disabled);
    this.initResizeBtn();
  },
  methods: {
    changeDisabled(flag) {
      this.$refs["quillEditor"].quill.enable(!flag);
    },
    pasteImg(e) {
      //  自定义粘贴图片功能
      this.$forceUpdate();
      if (this.disabled) {
        return false;
      }
      const quill = this.$refs.quillEditor.quill;
      if (
        e.clipboardData &&
        e.clipboardData.items &&
        e.clipboardData.items.length
      ) {
        this.loading = true;
        let len = e.clipboardData.items.length;
        [].forEach.call(e.clipboardData.items, file => {
          if (
            file.kind !== "file" ||
            !file.type.match(/^image\/(gif|jpe?g|png)/i)
          ) {
            len--;
            if (len <= 0) {
              this.loading = false;
            }
            return;
          }

          const img = file.getAsFile();
          if (img) {
            e.preventDefault();
            ossService.upload(
              {
                file: file.getAsFile(),
                space: "rich-text",
                folder: "rich-text"
              },
              res => {
                // 获取光标内容
                var range = quill.getSelection();
                if (range) {
                  let length = range.index;
                  // 插入图片  res.info为服务器返回的图片地址
                  quill.insertEmbed(length, "image", res.url);
                  quill.setSelection(length + 1);
                }
              },
              () => {
                this.$message.error("上传图片失败");
              },
              () => {
                len--;
                if (len <= 0) {
                  this.loading = false;
                }
              }
            );
          } else {
            this.loading = false;
          }
        });
      }
    },
    focus() {
      this.$refs["quillEditor"].quill.focus();
    },
    initResizeBtn() {
      const sourceEditorButton = document.querySelector(".ql-resize");
      sourceEditorButton.style.cssText = `width:20px;height:20px;background-image:url(${unfoldSvg});background-size:cover; float:right;`;
    }
  }
};
</script>

<style lang="less" scoped>
@padding: 20px;
.quillEditor-wrapper {
  &.disabled {
    position: relative;
    &::after {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      content: "";
      background: #f5f7fabd;
    }
  }
}
/deep/ .quill-editor {
  .ql-editor {
    padding: @padding;
    min-height: 146px;
    font-size: 15px;
    line-height: 1.67;
    &.ql-blank::before {
      left: @padding;
      font-style: normal;
    }
  }
  .ql-toolbar {
    position: relative;
    border: unset;
    line-height: 24px;
    padding: 8px @padding;
    &::after {
      position: absolute;
      left: @padding;
      bottom: 0;
      width: calc(100% - @padding * 2);
      height: 1px;
      content: "";
      background: #efefef;
    }
    .ql-formats {
      &:last-child {
        margin-right: 0;
        float: right;
      }
    }
  }
  .ql-container {
    border: unset;
    img {
      margin: 0 auto !important;
      display: block !important;
    }
  }
}
</style>
