<template>
  <div class="reply-wrapper">
    <div class="reply-content">
      <el-input
        class="reply-input-wrapper"
        v-model="form.content"
        placeholder="简单说说..."
      ></el-input>
      <div class="reply-detail" @click="handleLarge">
        <img src="~images/question/unfold.svg" />
      </div>
    </div>
    <div class="reply-footer">
      <ul class="reply-image-list">
        <li
          class="reply-image-item"
          v-for="(item, key) of form.images"
          :key="item"
        >
          <img class="uploaded-img" :src="item" />
          <label class="delete-icon" @click="deleteImage(key)">
            <i class="el-icon-close"></i>
          </label>
        </li>
        <li v-if="form.images.length < 3">
          <upload-image
            class="reply-img-upload"
            @added="addImage"
            theme="question"
          />
        </li>
      </ul>
      <div class="reply-footer-right">
        <el-button class="reply-btn" @click="handleSubmit" :loading="submiting"
          >发布</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UploadImage from "components/UploadImage.vue";
import questionService from "service/question";
import commonMixins from "mixins/common";

export default {
  name: "QuestionSimpleReply",
  mixins: [commonMixins],
  components: { UploadImage },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      submiting: false,
      theBigText: false,
      form: {
        content: "",
        images: []
      }
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    handleLarge() {
      this.$emit("large");
    },

    addImage(url) {
      this.form.images.push(url);
    },
    deleteImage(index) {
      this.form.images.splice(index, 1);
    },
    handleSubmit() {
      if (!this.checkIsLogin()) {
        return;
      }
      const { content, images } = this.form;
      if (!content) {
        this.$notice({
          title: "见解不能为空哦",
          type: "warning"
        });
        return;
      }
      if (!this.submiting) {
        this.submiting = true;
        questionService
          .addAnswer(this.id, {
            content,
            images: images.join(",")
          })
          .then(res => {
            const { id, nickname, avatar_url } = this.userInfo;
            this.$emit("submited", {
              ...res,
              content: content,
              images,
              auth_like_count: 0,
              comment_count: 0,
              like_count: 0,
              question_id: this.id,
              user: { id, nickname, avatar_url },
              comments: []
            });
            this.form.content = "";
            this.form.images = [];
          })
          .finally(() => {
            this.submiting = false;
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.reply-wrapper {
  width: 100%;
  padding: 20px;
  background: #fff;
  .reply-content {
    display: flex;
    justify-content: space-between;

    .reply-detail {
      padding: 4px;
      width: 32px;
      height: 32px;
      border-radius: 2px;
      cursor: pointer;

      &:hover {
        background-color: #fafafa;
      }
    }

    .reply-input-wrapper {
      margin-bottom: 40px;
      /deep/ .el-input__inner {
        height: 24px;
        padding: 0;
        line-height: 24px;
        font-size: 14px;
        border: unset;
        &::placeholder {
          color: #8ea098;
        }
      }
    }
  }
  .reply-footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: 20px;
    .reply-image-list {
      display: flex;
      .reply-image-item {
        position: relative;
        margin-right: 8px;
        &:hover {
          .delete-icon {
            display: inline-flex;
          }
        }
        img {
          width: 56px;
          height: 56px;
          object-fit: cover;
        }
        .delete-icon {
          position: absolute;
          top: 0;
          right: 0;
          display: none;
          align-items: center;
          justify-content: center;
          width: 16px;
          height: 16px;
          background: rgba(0, 0, 0, 0.3);
          cursor: pointer;
          .el-icon-close {
            color: #fff;
            cursor: pointer;
          }
        }
      }
      /deep/ .reply-img-upload {
        .add-image {
          width: 60px;
          height: 60px;
        }
      }
    }

    .reply-footer-left {
      display: flex;
      align-items: center;
      .reply-nickname {
        display: inline-block;
        margin-left: 8px;
        line-height: 28px;
        font-weight: 500;
        font-size: 16px;
        color: #606c66;
      }
    }
    .reply-footer-right {
      .reply-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 76px;
        height: 40px;
        padding: 0;
        line-height: 1;
        font-weight: 500;
        font-size: 14px;
        color: #ffffff;
        border: unset;
        background: #14af64;
        cursor: pointer;
      }
    }
  }
}
</style>
