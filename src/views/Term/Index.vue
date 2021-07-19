<template>
  <div class="page" v-loading="loading">
    <div class="container-1200">
      <div class="page-left">
        <the-loading-image
          :width="240"
          :height="180"
          :url="detail.cover_file_url"
        />
        <h3 class="page-left-title">{{ detail.name }}</h3>
        <p class="page-left-date">
          {{ formatDate(detail.start_at) }} – {{ formatDate(detail.end_at) }}
        </p>
        <p class="page-left-desc">
          {{ detail.description }}
        </p>
        <!-- <div class="page-left-more_list">
          <div class="page-left-more_item">
            班级公约
          </div>
          <div class="page-left-more_item">
            班级手册
          </div>
        </div> -->
      </div>
      <div class="page-right">
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane label="课程章节" name="category">
            <category
              :categories="categories"
              :loading="loading"
              :campId="detail.camp_id"
              :termId="detail.id"
            />
          </el-tab-pane>
          <el-tab-pane label="作业" name="homework">
            <homework
              :homeworks="homeworks"
              :loading="loading"
              @added="getData"
            />
          </el-tab-pane>
          <el-tab-pane label="资料包" name="attach">
            <attach :attaches="attaches" :loading="loading" />
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="go-top" @click="goTop">
        <i class="top-icon"></i>
      </div>
      <feedback
        v-if="
          detail.feedback_at &&
            new Date().valueOf() >= new Date(detail.feedback_at.valueOf())
        "
        ref="feedback"
        :defaultComment.sync="feedback.comment"
        :defaultScore.sync="feedback.score"
        @feedback="handleFeedback"
      />
    </div>
  </div>
</template>

<script>
import termService from "service/term";
import TheLoadingImage from "components/TheLoadingImage";
import Homework from "./widgets/Homework";
import Attach from "./widgets/Attach";

import { TERM_STATUS } from "utils/const";
import { formatDate } from "utils/moment";
import { goDrawPlan, goMyPlan } from "utils/routes";
import Feedback from "./widgets/Feedback.vue";
import Category from "./widgets/Category.vue";

export default {
  name: "Term",
  components: {
    TheLoadingImage,
    Category,
    Homework,
    Attach,
    Feedback
  },
  data() {
    return {
      TERM_STATUS,
      loading: true,
      detail: {},
      feedback: {
        comment: "",
        score: null
      },
      activeName: "category",
      categories: [],
      homeworks: [],
      attaches: [],
      feedbackSending: false,
      courseFeedbacking: false
    };
  },
  created() {
    const { tab } = this.$route.query;
    if (tab && ["category", "homework", "attach"].includes(tab)) {
      this.activeName = tab;
    }
    this.getData();
  },
  methods: {
    formatDate,
    goDrawPlan,
    getData() {
      this.loading = true;
      const id = this.$route.params.id;
      Promise.all([termService.campTerm(id), termService.campAttach(id)])
        .then(([res, attaches]) => {
          this.detail = res.camp_term;
          this.feedback = res.feedback;
          this.categories = res.categories.filter(item => item.type != 3);
          this.homeworks = res.homeworks.filter(
            item =>
              item.is_online === 1 &&
              new Date().valueOf() >= new Date(item.start_at).valueOf()
          );
          this.attaches = attaches;
        })
        .catch(() => {
          goMyPlan("replace");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    tabClick(tab) {
      if (tab.name !== this.$route.query.tab) {
        this.$router.push({
          query: {
            tab: tab.name
          }
        });
      }
    },
    handleFeedback(params) {
      if (this.feedbackSending) {
        this.$notice({
          type: "warning",
          title: "请耐心等待"
        });
        return;
      }
      this.feedbackSending = true;
      termService
        .termFeedback(this.$route.params.id, params)
        .then(() => {
          this.$refs.feedback.handleNext();
        })
        .finally(() => {
          this.feedbackSending = false;
        });
    },
    goTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
.page {
  width: 100%;
  padding: 20px 0px 40px;
}
.container-1200 {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 10px;
  .page-left {
    position: sticky;
    top: 60px;
    flex: none;
    margin-right: 20px;
    padding: 20px;
    width: 280px;
    background: #ffffff;
    .page-left-title {
      margin-top: 20px;
      line-height: 28px;
      font-size: 22px;
      font-weight: bold;
      color: #2c3330;
    }
    .page-left-date {
      margin-top: 10px;
      line-height: 21px;
      font-size: 14px;
      letter-spacing: 1px;
      color: #2c3330;
    }
    .page-left-desc {
      margin-top: 20px;
      line-height: 16px;
      font-size: 12px;
      color: #81948b;
    }
    .page-left-more_list {
      margin-top: 34px;
      width: 100%;
    }
    .page-left-more_item {
      padding: 10px 0;
      width: 100%;
      line-height: 21px;
      font-size: 14px;
      color: #2c3330;
      cursor: pointer;
    }
    .page-left-more_item + .page-left-more_item {
      border-top: 1px solid #efefef;
    }
  }
  .page-right {
    flex: 1;
    width: 880px;
    background: #fff;

    /deep/ .el-tabs__header {
      position: sticky;
      top: 60px;
      z-index: 3;
      background: white;
    }

    /deep/ .el-tabs {
      width: 100%;
      .el-tabs__header {
        margin: 0;
      }
      .el-tabs__nav-scroll {
        padding: 0 20px;
      }
      .el-tabs__item {
        padding: 20px;
        height: 69px;
        line-height: 28px;
        font-weight: normal;
        font-size: 16px;
        color: #81948b;
        &.is-active {
          color: #2c3330;
        }
      }
      .el-tabs__nav-wrap::after {
        background-color: #efefef;
      }
    }
  }
  .go-top {
    position: fixed;
    right: calc(50vw - 600px - 10px - 50px);
    bottom: 100px;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: #686868;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0.9;

    &:hover {
      opacity: 1;
    }

    .top-icon {
      display: inline-block;
      width: 24px;
      height: 24px;
      background-size: cover;
      background-repeat: no-repeat;
      background-image: url("~images/question/gotop.svg");
    }
  }
}
</style>
