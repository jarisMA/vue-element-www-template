<template>
  <el-dialog
    class="add-dialog"
    :visible="visible"
    width="580px"
    :before-close="handleClose"
    :modal="false"
    v-loading="loading"
  >
    <el-form :model="form" ref="form" @submit.native.prevent>
      <el-form-item class="title-container" prop="title">
        <the-avatar :size="40" :url="userInfo.avatar_url" />
        <el-input
          type="textarea"
          v-model.trim="form.title"
          resize="none"
          :rows="2"
          :autosize="{ minRows: 2, maxRows: 2 }"
          placeholder="写下你的问题，准确地描述问题更容易得到解答"
        >
        </el-input>
      </el-form-item>
      <el-form-item class="content-container" prop="content">
        <el-input
          type="textarea"
          placeholder="对问题的补充描述（选填）"
          resize="none"
          :rows="3"
          :autosize="{ minRows: 3, maxRows: 3 }"
          v-model="form.content"
        >
        </el-input>
      </el-form-item>
      <el-form-item class="image-container" prop="images">
        <div class="image-tips">
          <icon-svg
            :svg-class="['pic-icon', form.images.length > 0 ? 'active' : '']"
            svg-name="pic"
          />
          <span class="tips" v-if="form.images.length > 0">
            已选择{{ form.images.length }}张，还可以选择{{
              3 - form.images.length
            }}张
          </span>
        </div>
        <ul class="image-list">
          <li
            class="image-wrapper"
            v-for="(item, key) of form.images"
            :key="item"
          >
            <img class="uploaded-img" :src="item" />
            <span class="delete-icon-wrapper" @click="deleteImage(key)">
              <icon-svg svg-class="delete-icon" svg-name="delete_2" />
            </span>
          </li>
          <li v-if="form.images.length < 3">
            <upload-image @added="addImage" theme="question" />
          </li>
        </ul>
      </el-form-item>
      <el-form-item class="select-container" prop="channel_id">
        <el-select v-model="form.channel_id" placeholder="选择一个家装领域">
          <el-option
            class="question-select"
            v-for="item of channels"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
            <label class="question-select-option">{{ item.name }}</label>
          </el-option>
        </el-select>
        <el-button
          class="submit-btn"
          type="primary"
          @click="submit"
          :loading="submiting"
          >修改问题</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import UploadImage from "components/UploadImage";
import TheAvatar from "components/TheAvatar";

import { mapState } from "vuex";
import questionService from "service/question";

export default {
  name: "QuestionEdit",
  components: {
    UploadImage,
    TheAvatar
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    question: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      loading: true,
      submiting: false,
      channels: [],
      form: this.getData(this.data)
    };
  },
  created() {
    this.getConst();
  },
  computed: {
    ...mapState(["userInfo"])
  },
  watch: {
    question: {
      handler(val) {
        this.form = this.getData(val);
      },
      deep: true
    }
  },
  methods: {
    getConst() {
      questionService
        .channels()
        .then(res => {
          this.channels = res;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getData(data) {
      if (data) {
        const { channel } = data;
        return JSON.parse(
          JSON.stringify({
            ...data,
            channel_id: (channel && channel.id) || null
          })
        );
      }
      return {
        title: "",
        content: "",
        images: [],
        channel_id: null
      };
    },
    handleClose() {
      if (this.submiting) {
        return false;
      }
      this.$emit("update:visible", false);
      this.form = this.getData(this.question);
    },
    addImage(url) {
      this.form.images.push(url);
    },
    deleteImage(key) {
      this.form.images.splice(key, 1);
    },
    submit() {
      const { title, content, images, channel_id } = this.form;
      if (!title) {
        this.$notice({
          type: "danger",
          title: "问题不能为空"
        });
        return;
      }
      if (!channel_id) {
        this.$notice({
          type: "danger",
          title: "请选择家装领域"
        });
        return;
      }
      this.submiting = true;
      questionService
        .updateQuestion(this.question.id, {
          title,
          content,
          images: images.join(","),
          channel_id,
          type: 1,
          status: 2
        })
        .then(() => {
          this.submiting = false;
          this.handleClose();
          let channel = {};
          this.channels.some(item => {
            if (channel_id === item.id) {
              channel = item;
              return true;
            }
          });
          this.$notice({
            type: "success",
            title: "问题修改成功～"
          });
          this.$emit("update", {
            title,
            content,
            images,
            channel
          });
        })
        .finally(() => {
          this.submiting = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
@baseColor: #8ea098;
.add-dialog {
  /deep/ .el-dialog {
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      padding: 44px 20px 30px;
    }
    .title-container {
      margin-bottom: 20px;
      .el-form-item__content {
        display: flex;
        align-items: center;
        .el-textarea__inner {
          padding: 0 24px 0 16px;
          height: 52px;
          line-height: 26px;
          font-weight: bold;
          font-size: 20px;
          color: #111111;
          border: unset;
          overflow: hidden;
          &::placeholder {
            color: @baseColor;
          }
        }
      }
    }
    .content-container {
      margin-bottom: 13px;
      .el-textarea__inner {
        padding: 14px;
        line-height: 21px;
        font-weight: 400;
        font-size: 14px;
        color: #2c3330;
        border: 1px solid #efefef;
        &::placeholder {
          color: @baseColor;
        }
        &:focus {
          border-color: @primaryColor;
        }
      }
    }
    .image-container {
      margin-bottom: 20px;
      .image-tips {
        display: flex;
        align-items: center;
        margin-bottom: 13px;
        .pic-icon {
          font-size: 24px;
          color: #8ea098;
          &.active {
            color: @primaryColor;
          }
        }
        .tips {
          display: inline-block;
          margin-left: 12px;
          line-height: 18px;
          font-size: 12px;
          color: @baseColor;
        }
      }
      .image-list {
        display: flex;
        li.image-wrapper {
          position: relative;
          width: 80px;
          height: 80px;
          .uploaded-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          &:not(:last-child) {
            margin-right: 20px;
          }
          .delete-icon {
            display: none;
            position: absolute;
            top: 0;
            right: 0;
            font-size: 22px;
            cursor: pointer;
            color: #fff;
            opacity: 0.5;
            z-index: 2;
            &:hover {
              opacity: 0.8;
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
    .select-container {
      margin-bottom: 0;
      .el-form-item__content {
        width: 100%;
      }
      .el-select {
        .el-select__caret {
          color: #606c66;
        }
        .el-input__inner {
          height: 30px;
          padding: 0 30px 0 0;
          line-height: 30px;
          font-size: 14px;
          border: unset;
          border-bottom: 1px solid #efefef;
          color: #2c3330;
          &::placeholder {
            color: #c8d0cc;
          }
        }
      }
      .submit-btn {
        float: right;
        height: 30px;
        padding: 8px 24px;
        border: unset;
        span {
          font-weight: 400;
          font-size: 14px;
          line-height: 14px;
        }
      }
    }
  }
}
</style>
