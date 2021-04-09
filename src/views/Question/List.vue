<template>
  <div class="question-wrapper">
    <div class="container-1200">
      <div class="operate-container" v-if="userInfo">
        <ul class="filter-container">
          <li :class="[isAll ? 'active' : '']" @click="getAllData(true)">
            全部
          </li>
          <li :class="[!isAll ? 'active' : '']" @click="getAllData(false)">
            只看我的
          </li>
        </ul>
        <el-button class="add-btn" type="primary" @click="addVisible = true"
          >我要提问</el-button
        >
      </div>
      <div class="question-container" v-loading="loading">
        <template v-if="questions.length > 0">
          <ul class="question-list">
            <li
              class="question-item"
              v-for="(item, key) of questions"
              :key="item.id"
            >
              <question-card
                :question="item"
                @like="toggleLike(item.id, key, true)"
                @unlike="toggleLike(item.id, key, false)"
                @detail="goDetail(key)"
              />
            </li>
          </ul>
          <pagination
            :pageSize="pagination.size"
            :current-page="pagination.page"
            :total="pagination.total"
            @change-page="getData"
          />
          <div class="question-more" v-if="userInfo">
            <p>没有想了解的内容？</p>
            <p>
              你还可以
              <span class="primary" @click="addVisible = true">去提问</span>
            </p>
          </div>
        </template>
        <div v-else-if="!loading" class="empty-container">
          <the-empty noText="还没有人提出过问题" />
          <el-button
            v-if="userInfo"
            class="add-btn"
            type="primary"
            @click="addVisible = true"
            >我要提问</el-button
          >
        </div>
      </div>
    </div>
    <el-dialog
      v-if="userInfo"
      class="add-dialog"
      :visible.sync="addVisible"
      width="580px"
      :before-close="handleClose"
    >
      <el-form :model="addForm" ref="addForm" @submit.native.prevent>
        <el-form-item class="title-container" prop="title">
          <the-avatar :size="40" :url="userInfo.avatar_url" />
          <el-input
            ref="titleInput"
            type="textarea"
            v-model.trim="addForm.title"
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
            <icon-svg
              :svg-class="[
                'pic-icon',
                addForm.images.length > 0 ? 'active' : ''
              ]"
              svg-name="pic"
            />
            <span class="tips" v-if="addForm.images.length > 0">
              已选择{{ addForm.images.length }}张，还可以选择{{
                3 - addForm.images.length
              }}张
            </span>
          </div>
          <ul class="image-list">
            <li
              class="image-wrapper"
              v-for="(item, key) of addForm.images"
              :key="item"
            >
              <img class="uploaded-img" :src="item" />
              <span class="delete-icon-wrapper" @click="deleteImage(key)">
                <icon-svg svg-class="delete-icon" svg-name="delete_2" />
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
            @click="addQuestion"
            :loading="submiting"
            >发布问题</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-drawer
      :visible.sync="drawer"
      size="1000px"
      direction="rtl"
      custom-class="question-drawer"
      ref="drawer"
    >
      <question-detail
        :id="questionId"
        @backTop="drawerBackTop"
        @update="updateQuestion"
        @deleted="deleteQuestion"
      />
    </el-drawer>
  </div>
</template>

<script>
import TheAvatar from "components/TheAvatar";
import UploadImage from "components/UploadImage";
import QuestionCard from "./widgets/QuestionCard";
import Pagination from "components/Pagination";
import TheEmpty from "components/TheEmpty";
import QuestionDetail from "@/views/Question/Detail";

import { mapState } from "vuex";
import questionService from "service/question";

export default {
  name: "Question",
  components: {
    TheAvatar,
    UploadImage,
    QuestionCard,
    Pagination,
    TheEmpty,
    QuestionDetail
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
      questions: [],
      liking: false,
      drawer: false,
      questionId: null,
      questionIndex: null
    };
  },
  watch: {
    addVisible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs["titleInput"].focus();
        });
      }
    }
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
      if (this.userInfo) {
        questionService.channels().then(res => {
          this.channels = res;
        });
      }
    },
    getAllData(flag) {
      if (this.isAll === flag) {
        return;
      }
      this.isAll = flag;
      this.getData();
    },
    getData(start = 1) {
      this.loading = true;
      let params = {
        page: start,
        page_size: this.pagination.size,
        type: 1
      };
      !this.isAll && (params.mine = true);
      questionService
        .questions(params)
        .then(res => {
          this.questions = res.list;
          this.pagination.page = start;
          this.pagination.total = res.pagination.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    goDetail(index) {
      if (this.userInfo) {
        this.drawer = true;
        this.questionIndex = index;
        this.questionId = this.questions[index].id;
        const dom = document.querySelector(".question-drawer .el-drawer__body");
        if (dom) {
          this.$nextTick(() => {
            dom.scrollTo(0, 0);
          });
        }
      }
    },
    addQuestion() {
      const { title, content, images, channel_id } = this.addForm;
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
        .addQuestion({
          title,
          content,
          images: images.join(","),
          channel_id
        })
        .then(res => {
          this.handleClose();
          const { id, nickname, avatar_url } = this.userInfo;
          let channel = {};
          this.channels.some(item => {
            if (channel_id === item.id) {
              channel = item;
              return true;
            }
          });
          this.questions.unshift({
            id: res.id,
            like_count: 0,
            is_like: false,
            answer_count: 0,
            title,
            content,
            images: images.join(","),
            channel,
            user: { id, nickname, avatar_url }
          });
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        })
        .finally(() => {
          this.submiting = false;
        });
    },
    addImage(url) {
      this.addForm.images.push(url);
    },
    deleteImage(key) {
      this.addForm.images.splice(key, 1);
    },
    handleClose(done) {
      this.$refs["addForm"].resetFields();
      done && done();
      this.addVisible = false;
    },
    toggleLike(id, key, flag = true) {
      if (!this.liking) {
        this.liking = true;
        questionService
          .addLike({
            type: 1,
            resource_id: id,
            count: flag ? 1 : 0
          })
          .then(() => {
            const count = flag ? 1 : -1;
            this.$set(this.questions, key, {
              ...this.questions[key],
              like_count: this.questions[key].like_count + count,
              is_like: flag
            });
          })
          .finally(() => {
            this.liking = false;
          });
      }
    },
    drawerBackTop() {
      const drawer = this.$refs["drawer"].$el.children[0].children[0]
        .children[1];
      drawer.scrollTo({
        top: 0,
        behaviour: "smooth"
      });
    },
    updateQuestion(data) {
      this.$set(this.questions, this.questionIndex, {
        ...data,
        images: data.images.join(",")
      });
    },
    deleteQuestion() {
      this.questions.splice(this.questionIndex, 1);
      this.drawer = false;
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
@baseColor: #8ea098;
.question-wrapper {
  padding: 0 10px;
  .container-1200 {
    margin-top: 20px;
  }
  .question-container {
    min-height: calc(100vh - 528px - 50px);
  }
  .rz-icon {
    font-size: 24px;
  }
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
    .question-item {
      position: relative;
      &:not(:last-child) {
        &::after {
          position: absolute;
          bottom: 0;
          left: 20px;
          width: calc(100% - 40px);
          height: 1px;
          content: "";
          background: #efefef;
        }
      }
    }
  }
  .question-more {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 30px auto 60px;
    width: 108px;
    line-height: 18px;
    font-size: 12px;
    text-align: center;
    color: #8ea098;
    &::before,
    &::after {
      position: absolute;
      top: 50%;
      width: 60px;
      height: 1px;
      background: #efefef;
      content: "";
      transform: translateY(-50%);
    }
    &::before {
      left: -80px;
    }
    &::after {
      right: -80px;
    }
    .primary {
      color: @primaryColor;
      cursor: pointer;
    }
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
        font-size: 15px;
        line-height: 1.67;
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
            position: absolute;
            top: 0;
            right: 0;
            display: none;
            font-size: 22px;
            cursor: pointer;
            color: #fff;
            opacity: 0.5;
            cursor: pointer;
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
  /deep/ .question-drawer {
    background: #fafafa !important;
    outline: unset;
    .el-drawer__header {
      height: 60px;
      padding: 20px;
      margin: 0;
    }
    .el-drawer__body {
      overflow: auto;
    }
  }
}
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0 40px;
  width: 100%;
  height: 515px;
  background: #fff;
  /deep/ .empty-wrapper {
    padding: 0 0 20px;
    img {
      width: 260px;
    }
    span {
      margin-top: 27px;
      line-height: 21px;
      font-size: 14px;
      color: #8ea098;
    }
  }
}
</style>
<style lang="less">
.el-select-dropdown {
  /deep/ .question-select {
    .question-select-option {
      position: relative;
      padding-left: 17px;
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 17px;
        height: 17px;
        background: url("~images/question/rz.svg");
        background-repeat: no-repeat;
        background-size: cover;
        content: "";
      }
    }
  }
}
</style>
