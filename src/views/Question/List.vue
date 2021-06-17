<template>
  <div class="page" v-loading="loading">
    <div
      class="page-header"
      :style="{ width: col * 262 + (col - 1) * 30 + 'px' }"
    >
      <div class="page-header-left">
        <el-select v-model="activeType" @change="getData()">
          <el-option :value="0" label="全部"></el-option>
          <el-option
            v-for="item of QUESTION_TYPE"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </div>
      <!-- <div class="page-header-middle">
        <ul class="page-header-channels">
          <li :class="[
              'page-header-channel',
              activeChannel === 0 ? 'active' : ''
            ]"
              @click="activeChannel = 0">
            全部
          </li>
          <li :class="[
              'page-header-channel',
              activeChannel === index + 1 ? 'active' : ''
            ]"
              v-for="(item, index) of channels"
              :key="index"
              @click="activeChannel = index + 1">
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="page-header-right">
        <the-search-bar />
      </div> -->
    </div>
    <div class="page-content">
      <div class="page-content-list">
        <waterfall :col="col" :width="262" :gutterWidth="30" :data="questions">
          <template>
            <question-card
              v-for="item of questions"
              :key="item.id"
              :question="item"
              @click.native="handleShowDetail(item.id)"
            />
          </template>
        </waterfall>
        <div
          class="loading-wrapper"
          ref="loading"
          v-if="moreLoading"
          v-loading="moreLoading"
        ></div>
        <end
          :total="pagination.total"
          v-else-if="!loading && pagination.total === questions.length"
        />
      </div>
    </div>
    <div class="page-operate">
      <div class="page-operate-top" @click="goTop">
        <i class="back_to_top-icon"></i>
      </div>
      <div class="page-operate-add" @click="handleShowQuestionTypeSelect">
        <i class="ask-icon"></i>
      </div>
    </div>
    <question-type-dialog
      :visible.sync="showQuestionTypeSelect"
      @select="handleQuestionTypeSelect"
    />
    <question-type-add
      v-if="questionAddVisble"
      :visible.sync="questionAddVisble"
      @refresh="getData()"
    />
    <help-type-add
      v-if="helpAddVisible"
      :visible.sync="helpAddVisible"
      @refresh="getData()"
    />
    <vote-type-add
      v-if="voteAddVisble"
      :visible.sync="voteAddVisble"
      @refresh="getData()"
    />
    <el-dialog
      v-if="detailVisible"
      class="detail-dialog"
      width="100%"
      :close-on-click-modal="true"
      :visible.sync="detailVisible"
    >
      <detail
        showNavigation
        :id="detailId"
        :visible.sync="detailVisible"
        @deleted="handleDeleteQuestion"
        @next="handleNextQuestion"
        @prev="handlePrevQuestion"
      />
    </el-dialog>
  </div>
</template>

<script>
import {
  QUESTION_TYPE,
  QUESTION_TYPE_QUESTION,
  QUESTION_TYPE_HELP,
  QUESTION_TYPE_VOTE
} from "utils/const";
// import TheSearchBar from "components/TheSearchBar";
import questionService from "service/question";
import QuestionCard from "./widgets/QuestionCard";
import End from "./widgets/End";
import QuestionTypeDialog from "./widgets/QuestionTypeDialog";
import QuestionTypeAdd from "./widgets/QuestionTypeAdd";
import HelpTypeAdd from "./widgets/HelpTypeAdd";
import VoteTypeAdd from "./widgets/VoteTypeAdd";
import Detail from "./widgets/Detail";
import commonMixins from "mixins/common";

export default {
  name: "QuestionList",
  mixins: [commonMixins],
  components: {
    // TheSearchBar,
    QuestionCard,
    End,
    QuestionTypeDialog,
    QuestionTypeAdd,
    HelpTypeAdd,
    VoteTypeAdd,
    Detail
  },
  data() {
    return {
      QUESTION_TYPE,
      channels: [
        {
          name: "户型布局"
        },
        {
          name: "软装搭配"
        },
        {
          name: "家电设备"
        },
        {
          name: "施工经验"
        }
      ],
      loading: true,
      moreLoading: false,
      activeType: 0,
      activeChannel: 0,
      keyword: "",
      questions: [],
      pagination: {
        page: 1,
        total: 0,
        size: 30
      },
      col: 6,
      showQuestionTypeSelect: false,
      questionAddVisble: false,
      helpAddVisible: false,
      voteAddVisble: false,
      detailVisible: false,
      detailId: null,
      timer: null
    };
  },
  watch: {
    questionAddVisble(val) {
      this.handleToggleLockScroll(val);
    },
    helpAddVisible(val) {
      this.handleToggleLockScroll(val);
    },
    voteAddVisble(val) {
      this.handleToggleLockScroll(val);
    },
    detailVisible(val) {
      this.handleToggleLockScroll(val);
    }
  },
  created() {
    this.calcCol();
    this.getData();
  },
  mounted() {
    window.addEventListener("resize", this.calcCol);
    window.addEventListener("scroll", this.scroll);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.calcCol);
    window.removeEventListener("scroll", this.scroll);
  },
  methods: {
    handleToggleLockScroll(flag) {
      if (flag) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
    calcCol() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        const maxWidth = Math.max(window.innerWidth - 200, 1200 - 200);
        this.col = Math.floor(maxWidth / (262 + 30));
      }, 300);
    },
    getData(start = 1) {
      if (!this.moreLoading) {
        let loadingName = "loading";
        if (start > 1) {
          loadingName = "moreLoading";
        }
        this[loadingName] = true;
        let params = {
          page: start,
          page_size: this.pagination.size
        };
        this.activeType ? (params.type = this.activeType) : "";
        questionService
          .questions(params)
          .then(res => {
            setTimeout(() => {
              this[loadingName] = false;
              if (start === 1) {
                this.questions = [];
                this.$nextTick(() => {
                  this.questions = res.list;
                  this.$waterfall.forceUpdate();
                });
              } else {
                this.questions = this.questions.concat(res.list);
              }
              this.pagination.page = start;
              this.pagination.total = res.pagination.total;
            }, 1000);
          })
          .catch(() => {
            this[loadingName] = false;
          });
      }
    },
    handleSearch(keyword) {
      this.keyword = keyword;
      this.getData();
    },
    scroll() {
      const dom = document.querySelector("html");
      if (
        dom.scrollHeight - dom.scrollTop === dom.clientHeight &&
        this.questions.length < this.pagination.total
      ) {
        this.getData(this.pagination.page + 1);
      }
    },
    goTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    handleShowQuestionTypeSelect() {
      if (!this.checkIsLogin()) {
        return;
      }
      this.showQuestionTypeSelect = true;
    },
    handleShowDetail(id) {
      this.detailId = id;
      this.detailVisible = true;
    },
    handleQuestionTypeSelect(type) {
      switch (type) {
        case QUESTION_TYPE_QUESTION:
          this.questionAddVisble = true;
          break;
        case QUESTION_TYPE_HELP:
          this.helpAddVisible = true;
          break;
        case QUESTION_TYPE_VOTE:
          this.voteAddVisble = true;
          break;
        default:
          break;
      }
    },
    handleDeleteQuestion() {
      const index = this.questions.findIndex(item => item.id === this.detailId);
      this.questions.splice(index, 1);
      this.detailVisible = false;
    },
    handlePrevQuestion() {
      const index = this.questions.findIndex(item => item.id === this.detailId);
      if (this.questions[index - 1]) {
        this.detailId = this.questions[index - 1].id;
      } else {
        this.$notice({
          type: "warning",
          title: "没有更多的了"
        });
      }
    },
    handleNextQuestion() {
      const index = this.questions.findIndex(item => item.id === this.detailId);
      if (this.questions[index + 1]) {
        this.detailId = this.questions[index + 1].id;
      } else {
        this.$notice({
          type: "warning",
          title: "没有更多的了"
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
.page {
  width: 100%;
  padding: 30px 100px;
  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: auto;
    .page-header-left {
      width: 116px;
      /deep/ .el-select {
        .el-input__inner {
          padding-left: 10px;
          font-size: 14px;
          color: #2c3330;
          border: 1px solid #efefef;
        }
      }
    }
    .page-header-middle {
      .page-header-channels {
        display: flex;
        align-items: center;
        .page-header-channel {
          line-height: 24px;
          font-weight: 500;
          font-size: 14px;
          color: #606c66;
          cursor: pointer;
          &.active {
            color: #2c3330;
          }
          & + .page-header-channel {
            margin-left: 32px;
          }
        }
      }
    }
    .page-header-right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 280px;
    }
  }
  .page-content {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    .page-content-list {
      height: 100%;
      overflow: auto;
      /deep/ .question-card {
        margin-bottom: 30px;
      }
    }
  }
  .page-operate {
    position: fixed;
    right: 35px;
    bottom: 80px;
    .page-operate-top,
    .page-operate-add {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
    }
    .page-operate-top {
      background: rgba(0, 0, 0, 0.3);
    }
    .page-operate-add {
      background: @primaryColor;
    }
    .back_to_top-icon,
    .ask-icon {
      display: inline-block;
      width: 24px;
      height: 24px;
      mask-size: cover;
      mask-repeat: no-repeat;
      background-color: #fff;
    }
    .back_to_top-icon {
      mask-image: url("~images/question/back_to_top.svg");
    }
    .ask-icon {
      mask-image: url("~images/question/ask.svg");
    }
  }
}
.detail-dialog {
  background: rgba(0, 0, 0, 0.9);
  /deep/ .el-dialog {
    height: 100%;
    margin: 0 auto !important;
    background: transparent;
    box-shadow: unset;
    overflow: hidden;
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      width: 100%;
      height: 100%;
      padding: 0;
      overflow: hidden;
    }
  }
}
.loading-wrapper {
  width: 100%;
  height: 120px;
  /deep/ .el-loading-mask {
    background: transparent;
  }
}
</style>
