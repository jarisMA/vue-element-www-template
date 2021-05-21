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
            />
          </template>
        </waterfall>
        <end
          :total="pagination.total"
          v-if="pagination.total === questions.length"
        />
      </div>
    </div>
    <div class="page-operate">
      <div class="page-operate-top" @click="goTop">
        <i class="back_to_top-icon"></i>
      </div>
      <div class="page-operate-add" @click="showQuestionTypeSelect = true">
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

export default {
  name: "QuestionList",
  components: {
    // TheSearchBar,
    QuestionCard,
    End,
    QuestionTypeDialog,
    QuestionTypeAdd,
    HelpTypeAdd,
    VoteTypeAdd
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
      voteAddVisble: false
    };
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
    calcCol() {
      const maxWidth = Math.max(window.innerWidth - 200, 1200 - 200);
      this.col = Math.floor(maxWidth / (262 + 15));
    },
    getData(start = 1) {
      this.loading = true;
      let params = {
        page: start,
        page_size: this.pagination.size
      };
      this.activeType ? (params.type = this.activeType) : "";
      questionService
        .questions(params)
        .then(res => {
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
        })
        .finally(() => {
          this.loading = false;
        });
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
    bottom: 120px;
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
</style>
