<template>
  <div class="comment-wrapper">
    <the-avatar :size="32" :url="userInfo.avatar_url" />
    <el-form
      class="add-form"
      ref="addForm"
      :model="addForm"
      @submit.native.prevent
    >
      <el-form-item prop="content">
        <el-input
          placeholder="写下你的想法"
          v-model="addForm.content"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item-wrapper" prop="images">
        <upload-image
          class="upload-image-wrapper"
          theme="comment"
          @added="addImage"
        />
        <el-button
          class="submit-btn"
          type="primary"
          :loading="submiting"
          @click="submit"
          >回复</el-button
        >
      </el-form-item>
    </el-form>
    <div class="images-wrapper" v-if="addForm.images.length > 0">
      <div class="images-operate">
        <label class="images-tip">
          <span class="primary">{{ addForm.images.length }}</span
          >/3
        </label>
        <label
          class="delete-operate"
          v-if="addForm.images.length > 0"
          @click="deleteAllImage"
        >
          <icon-svg class="delete-icon" svg-name="delete_2"></icon-svg>删除全部
        </label>
      </div>
      <ul class="image-list">
        <li class="image-item" v-for="(item, key) of addForm.images" :key="key">
          <img class="uploaded-img" :src="item" />
          <icon-svg
            class="delete-icon"
            svg-name="delete_2"
            @click.native="deleteImage(key)"
          ></icon-svg>
        </li>
        <li v-if="addForm.images.length < 3">
          <upload-image theme="comment-more" @added="addImage" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TheAvatar from "components/TheAvatar";
import UploadImage from "components/UploadImage";
import { mapState } from "vuex";
import questionService from "service/question";

export default {
  name: "QuestionComment",
  props: {
    parent: {
      type: Object,
      default: () => null
    },
    answerId: {
      type: Number,
      required: true
    }
  },
  components: {
    TheAvatar,
    UploadImage
  },
  data() {
    return {
      addForm: {
        content: "",
        images: []
      },
      submiting: false
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    submit() {
      if (!this.addForm.content) {
        this.$notice({
          type: "danger",
          title: "请写下你的想法～"
        });
        return;
      }
      let params = {
        content: this.addForm.content,
        images: this.addForm.images.join(",")
      };
      if (this.parent) {
        params.parent_id = this.parent.id;
        params.cited_user_id = this.parent.user.id;
      }
      this.submiting = true;
      questionService
        .addComment(this.answerId, params)
        .then(res => {
          const { id, nickname, avatar_url } = this.userInfo;
          this.$emit("commented", {
            ...params,
            ...res,
            cited_user: this.parent ? this.parent.user : null,
            user: { id, nickname, avatar_url }
          });
          this.$refs["addForm"].resetFields();
        })
        .finally(() => {
          this.submiting = false;
        });
    },
    addImage(url) {
      this.addForm.images.push(url);
    },
    deleteAllImage() {
      this.addForm.images.splice(0);
    },
    deleteImage(key) {
      this.addForm.images.splice(key, 1);
    }
  }
};
</script>

<style lang="less" scoped>
.comment-wrapper {
  position: relative;
  display: flex;
  /deep/ .add-form {
    flex: 1;
    margin-left: 15px;
    width: 678px;
    .form-item-wrapper {
      .el-form-item {
        margin-bottom: 0;
        &:not(:last-child) {
          margin-bottom: 10px;
        }
      }
      .el-form-item__content {
        display: flex;
        width: 100%;
        .upload-image-wrapper {
          flex: 1;
        }
        .submit-btn {
          padding: 8px 24px;
        }
      }
    }
  }
}
.images-wrapper {
  position: absolute;
  padding: 10px;
  top: 102px;
  background: #ffffff;
  border: 1px solid #efefef;
  box-sizing: border-box;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
  z-index: 10;
  &::before {
    position: absolute;
    top: -5px;
    left: 52px;
    width: 10px;
    height: 10px;
    content: "";
    border: 1px solid rgba(0, 0, 0, 0.05);
    background: #fff;
    transform: rotate(45deg);
    z-index: 0;
  }
  &::after {
    position: absolute;
    top: -0;
    left: 48px;
    width: 20px;
    height: 10px;
    content: "";
    background: #fff;
    z-index: 0;
  }
  .images-operate {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    line-height: 18px;
    font-weight: normal;
    font-size: 12px;
    color: #8ea098;
    .delete-operate {
      display: flex;
      align-items: center;
      cursor: pointer;
      .delete-icon {
        font-size: 24px;
      }
    }
  }
  .image-list {
    display: flex;
    .image-item {
      position: relative;
      margin-right: 10px;
      width: 130px;
      height: 130px;
      .uploaded-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .delete-icon {
        position: absolute;
        top: 5px;
        right: 5px;
        display: none;
        font-size: 24px;
        color: #fff;
        opacity: 0.3;
        z-index: 10;
        cursor: pointer;
        transition: opacity 0.1s;
        &:hover {
          opacity: 0.5;
        }
      }
      &:hover {
        &::after {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          content: "";
          background: rgba(0, 0, 0, 0.3);
        }
        .delete-icon {
          display: inline-block;
        }
      }
    }
  }
}
</style>
