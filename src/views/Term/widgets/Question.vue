<template>
  <div class="question-wrapper" v-loading="loading">
    <div class="operate-container">
      <ul class="filter-container">
        <li :class="[isAll ? 'active' : '']">全部</li>
        <li :class="[!isAll ? 'active' : '']">只看我的</li>
      </ul>
      <el-button class="add-btn" type="primary" @click="addVisible = true"
        >我要提问</el-button
      >
    </div>
    <ul class="question-list">
      <li class="question-item" v-for="item of questions" :key="item.id">
        <question-card :question="item" />
      </li>
    </ul>
    <el-dialog
      class="add-dialog"
      :visible.sync="addVisible"
      width="580px"
      :before-close="handleClose"
    >
      <el-form :model="addForm" ref="addForm">
        <el-form-item class="title-container" prop="title">
          <the-avatar :size="40" :url="userInfo.avatar_url" />
          <el-input
            type="textarea"
            v-model="addForm.title"
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
            v-model="addForm.content"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="image-container" prop="images">
          <div class="image-tips">
            <icon-svg svg-class="pic-icon" svg-name="pic" />
            <span class="tips" v-if="addForm.images.length > 0">
              已选择{{ addForm.images.length }}张，还可以选择{{
                3 - addForm.images.length
              }}张
            </span>
          </div>
          <ul class="image-list">
            <li v-for="(item, key) of addForm.images" :key="item">
              <img class="uploaded-img" :src="item" />
              <span class="delete-icon-wrapper" @click="deleteImage(key)">
                <icon-svg svg-class="delete-icon" svg-name="delete" />
              </span>
            </li>
            <li v-if="addForm.images.length < 3">
              <upload-image @added="addImage" theme="question" />
            </li>
          </ul>
        </el-form-item>
        <el-form-item class="select-container" prop="channel_id">
          <el-select
            v-model="addForm.channel_id"
            placeholder="选择一个家装领域"
          >
            <el-option
              v-for="item of channels"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
              <icon-svg svg-class="rz-icon" svg-name="rz"></icon-svg>
              {{ item.name }}
            </el-option>
          </el-select>
          <el-button
            class="submit-btn"
            type="primary"
            @click="addQuestion"
            :loading="submiting"
            >发布问题</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import TheAvatar from "components/TheAvatar";
import UploadImage from "components/UploadImage";
import QuestionCard from "./QuestionCard";

import { mapState } from "vuex";
import questionService from "service/question";

export default {
  name: "Question",
  components: {
    TheAvatar,
    UploadImage,
    QuestionCard
  },
  data() {
    return {
      loading: true,
      isAll: true,
      addVisible: false,
      submiting: false,
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      channels: [],
      addForm: {
        title: "",
        content: "",
        images: [],
        channel_id: null
      },
      questions: []
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  created() {
    this.getConst();
    this.getData();
  },
  methods: {
    getConst() {
      questionService.channels().then(res => {
        this.channels = res;
      });
    },
    getData(start = 1) {
      this.loading = true;
      questionService
        .questions({
          page: start,
          page_size: this.pagination.size
        })
        .then(res => {
          this.questions = res.list;
          this.pagination.page = start;
          this.pagination.total = res.pagination.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    addQuestion() {
      const { title, content, images, channel_id } = this.addForm;
      this.submiting = true;
      questionService
        .addQuestion({
          title,
          content,
          images: images.join(","),
          channel_id
        })
        .then(() => {
          this.$notice({
            title: "提问成功"
          });
          this.handleClose();
          this.getData();
        })
        .finally(() => {
          this.submiting = false;
        });
    },
    addImage(url) {
      this.addForm.images.push(url);
    },
    deleteImage(key) {
      this.addForm.images.splice(key);
    },
    handleClose(done) {
      this.$refs["addForm"].resetFields();
      done && done();
      this.addVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
@baseColor: #8ea098;
.question-wrapper {
  .operate-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .filter-container {
      display: flex;
      li {
        line-height: 18px;
        font-weight: 400;
        font-size: 12px;
        color: #81948b;
        cursor: pointer;
        &:not(:last-child) {
          margin-right: 20px;
        }
        &.active,
        &:hover {
          color: @primaryColor;
        }
      }
    }
  }
  .question-list {
    margin-top: 20px;
  }
  /deep/ .add-btn {
    height: 30px;
    padding: 8px 24px;
    border: unset;
    span {
      font-weight: 400;
      font-size: 14px;
      line-height: 14px;
    }
  }
  /deep/ .add-dialog {
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
          fill: #606c66;
          stroke: #606c66;
          &.active {
            fill: @primaryColor;
            stroke: @primaryColor;
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
        li {
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
            position: absolute;
            top: 0;
            right: 0;
            font-size: 22px;
            cursor: pointer;
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
<style lang="less" scoped>
.rz-icon {
  font-size: 24px;
}
</style>
