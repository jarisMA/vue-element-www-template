<template>
  <div class="detail-task-card">
    <div class="card-head">
      <img class="card-head-up" src="~images/task/top.svg" />
      <div
        class="card-head-top"
        :class="[
          diff_day_type == 'isOneDayleft'
            ? 'card-head-top--red'
            : diff_day_type == 'isTimeout'
            ? 'card-head-top--grey'
            : '',
          task.status == 7 ? 'card-head-top--finished' : ''
        ]"
      >
        <div class="card-head-up-text">
          <span>初选截止倒计时</span>
          <span v-if="diff_day_type !== 'isTimeout'"
            >截止日：{{ formatDate(task.submit_end_at) }}</span
          >
          <span v-if="diff_day_type == 'isTimeout'">初选截止：已截稿</span>
        </div>
        <div class="card-head-btm-text">
          <div v-if="task.status == 7" class="card-head-btm-finished">
            ------任务已完成------
          </div>
          <Countdown
            v-if="task.status && task.status != 7"
            class="card-head-btm-countdown"
            :created-time="task.submit_end_at"
            format="dd:hh:mm"
            :showUnitText="true"
            @update="getDiffDayType"
          ></Countdown>
        </div>
      </div>
      <div class="card-head-btm">
        <div class="card-head-btm-up">
          {{ task.name }}
        </div>
        <div class="card-head-btm-down">
          <div class="card-head-btm-down-left">
            <div v-for="n in task.level" :key="n">
              <img src="~/images/task/star.svg" class="card-star" />
            </div>
          </div>
          <div class="card-head-btm-down-right">
            <span class="card-head-btm-down-text"
              >发布时间 {{ formatDate(task.published_at) }}</span
            >
            <div
              :class="[
                'card-head-btm-down-status',
                'task-card-status-' + task.status
              ]"
            >
              {{ task.status_label }}
            </div>
          </div>
        </div>
      </div>
      <img class="card-head-down" src="~images/task/btm.svg" />
    </div>
    <div class="card-body">
      <div class="card-body-left">
        <img class="card-body-left-top" src="~images/task/left-top.svg" />
        <div class="card-body-left-head">
          <span class="card-body-left-text">悬赏金额</span>
        </div>
        <i class="card-body-left-icon"></i>
        ¥{{ priceFormat(task.total_price) }}
        <img class="card-body-left-btm" src="~images/task/left-btm.svg" />
      </div>
      <div class="card-body-right">
        <img class="card-body-right-top" src="~images/task/right-top.svg" />
        <div class="card-body-right-head">
          <span class="card-body-right-text">经验值</span>
        </div>
        {{ task.experience_point }}<span class="card-body-right-exp"> exp</span>
        <img class="card-body-right-btm" src="~images/task/right-btm.svg" />
      </div>
    </div>
    <div class="card-foot">
      <div class="card-foot-up">
        <img class="card-foot-head" src="~images/task/top.svg" />
        <span v-if="task.city">{{ task.city.city.name }}</span> ｜
        {{ Math.ceil(task.square) }}平方 ｜
        <span v-if="task.layout"
          >{{ task.layout.type1 }}室{{ task.layout.type2 }}厅{{
            task.layout.type3
          }}卫</span
        >
        <img class="card-foot-foot" src="~images/task/btm.svg" />
      </div>
      <div class="card-foot-down">
        <img class="card-layout-top" src="~images/task/top.svg" />
        <the-loading-image :width="357" :height="357" :url="task.cover_url" />
        <img class="card-layout-btm" src="~images/task/btm.svg" />
      </div>
    </div>
    <div class="card-design" v-if="task.my_designs && task.my_designs.length">
      <div class="design-title">方案提交</div>
      <div class="design-list">
        <div
          class="design-item"
          v-for="(design, designIdx) in task.my_designs"
          :key="designIdx"
        >
          <i class="design-item__icon"></i>
          <span class="design-item__name">{{ design.file_name }}</span>
          <i class="design-item__delete" @click="handleDelete(design.id)"> </i>
        </div>
      </div>
    </div>
    <div class="card-btn-container">
      <template>
        <div class="card-btn-tips">
          <template v-if="!task.has_joined">
            {{ task.users_count }}人参与，还剩{{ applyLeft }}个名额
          </template>
          <template v-if="task.has_joined && canApplyOrUpload">
            <span class="card-btn-tips--yellow">已参与</span
            >点击上传方案，最多上传3个方案
          </template>
          <template v-if="task.has_joined && !canApplyOrUpload">
            <span class="card-btn-tips--yellow">已参与</span>方案提交已截止，{{
              task.users_count
            }}参与
          </template>
        </div>
        <div class="card-btn">
          <div
            v-if="!task.has_joined"
            :class="['card-btn', applyBtnColor]"
            @click="handleApplyBtn"
          >
            {{ applyBtnText }}
          </div>
          <upload-file
            v-if="task.has_joined && canApplyOrUpload"
            :class="['upload-file', 'card-btn', applyBtnColor]"
            :url.sync="fileList"
            :upload-limit="5120"
            :limit="1"
            :showFileList="false"
            :text="task.my_designs.length ? '重新上传' : '上传方案'"
            :show-icon="false"
            space="www"
            folder="task"
            :disabled="uploadBtnDisabled"
          ></upload-file>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import TheLoadingImage from "components/TheLoadingImage";
import UploadFile from "components/UploadFile";
import { formatDate, formNowFormatDay, diffDayType } from "utils/moment";
import Countdown from "./Countdown";
import { priceFormat } from "utils/function";

export default {
  name: "DetailTaskCard",
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      level: 0,
      diff_day_type: null,
      fileList: ""
    };
  },
  watch: {
    task(val) {
      if (val) {
        this.getDiffDayType();
      }
    },
    fileList(val) {
      if (val) {
        this.handleUploadFile();
      }
    }
  },
  computed: {
    ...mapState(["userInfo"]),
    applyLeft() {
      const { max_apply, users_count } = this.task;
      return max_apply - users_count >= 0 ? max_apply - users_count : 0;
    },
    userJobInfo() {
      const { jobs = [] } = this.userInfo;
      const { job = {} } = this.task;
      return jobs.find(d => d.parent_job_id === job.job_id) || {};
    },
    canApplyOrUpload() {
      return this.task.status == 1 && this.diff_day_type != "isTimeout";
    },
    uploadBtnDisabled() {
      return this.task.my_designs && this.task.my_designs.length >= 3;
    },
    applyBtnDisabled() {
      const { is_backdoor, max_apply, users_count, level } = this.task;
      // 非后门任务,满员或用户等级小于难度
      if (
        !is_backdoor &&
        (max_apply <= users_count || this.userJobInfo.level < level)
      ) {
        return true;
      }
      return false;
    },
    applyBtnColor() {
      const { is_backdoor, max_apply, users_count, level } = this.task;
      // 非后门任务,满员或用户等级小于难度
      if (
        !is_backdoor &&
        (max_apply <= users_count || this.userJobInfo.level < level)
      ) {
        return "card-btn--grey disabled";
      }

      return this.canApplyOrUpload
        ? "card-btn--green"
        : "card-btn--grey disabled";
    },
    applyBtnText() {
      const {
        is_backdoor,
        max_apply,
        users_count,
        has_joined,
        my_designs,
        level,
        heart_count,
        status,
        status_label
      } = this.task;
      const { userJobInfo } = this;
      const heartText = heart_count ? heart_count + "暖心" + "立即参与" : "";

      // Todo
      // 1. Task API Add designs
      // 2. 已中标提交源文件文字判断

      if (!this.canApplyOrUpload) {
        return "已截稿";
      }

      if (status >= 2) {
        return "任务" + status_label;
      }

      //temp const
      if (has_joined) {
        return my_designs.length > 0 ? "重新上传" : "上传方案";
      }

      const isFull = max_apply <= users_count;
      if (!is_backdoor && isFull) {
        return "任务已满员";
      }

      if (!userJobInfo.id) {
        return "无赏参与"; // 无职业情况
      }

      if (is_backdoor && (isFull || userJobInfo.level < level)) {
        return "无赏参与";
      }

      if (!is_backdoor && (isFull || userJobInfo.level < level)) {
        return "不可报名";
      }

      return heartText;
    }
  },
  methods: {
    formatDate,
    formNowFormatDay,
    diffDayType,
    priceFormat,
    getDiffDayType() {
      this.diff_day_type = this.diffDayType(
        this.task.submit_end_at,
        new Date()
      );
    },
    handleApplyBtn() {
      if (this.applyBtnDisabled || !this.canApplyOrUpload) return;
      const { has_joined } = this.task;

      if (!this.userInfo) {
        return this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", 1);
      }

      if (has_joined) {
        return this.handleUploadFile();
      }

      const TYPE = !this.userJobInfo.id ? "JOIN_DESIGNER" : "APPLY_TASK";
      this.$emit("toggleShowDialog", TYPE);
    },
    handleUploadFile() {
      return this.$emit("upload", this.fileList);
    },
    handleDelete(id) {
      return this.$emit("delete", id);
    }
  },
  components: {
    TheLoadingImage,
    Countdown,
    UploadFile
  }
};
</script>
<style type="text/css" lang="less" scoped>
.detail-task-card {
  width: 380px;
  padding-bottom: 80px;
  .card-head {
    position: relative;
    width: 100%;
    border-left: 2px solid #f0f0f0;
    border-right: 2px solid #f0f0f0;
    .card-head-top {
      width: 100%;
      height: 86px;
      padding: 7px 32px;
      background-color: #ffe24c;
      color: #000000;
      &.card-head-top--red {
        background-color: #ff3938;
        color: #ffffff;
        .card-head-up-text {
          border-bottom-color: #ffffff;
        }
      }
      &.card-head-top--grey {
        background-color: #bcbcbc;
        .card-head-up-text {
          border-bottom-color: #7c7c7c;
          color: #7c7c7c;
        }
        /deep/.card-head-btm-text {
          color: #e5e5e5;
        }
      }
      &.card-head-top--finished {
        background-color: #2e41f1;
        .card-head-up-text {
          border-bottom-color: #7c7c7c;
          color: #fafafa;
        }
        .card-head-btm-text {
          width: 100%;
          .card-head-btm-finished {
            width: 100%;
            color: #fff067;
            font-size: 18px;
            text-align: center;
          }
        }
      }

      .card-head-up-text {
        display: flex;
        justify-content: space-between;
        font-weight: 600;
        font-size: 12px;
        padding-bottom: 3px;
        margin-bottom: 3px;
        border-bottom: 1px solid #000000;
      }
      /deep/.card-head-btm-text {
        display: flex;
        justify-content: space-between;
        line-height: 46px;
        font-weight: 600;
        font-size: 48px;
        .card-head-btm-countdown {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .card-head-text {
            flex: none;
            width: 60px;
            text-align: center;
          }
          .card-head-small-unit {
            display: inline-block;
            height: 16px;
            line-height: 16px;
            font-size: 12px;
            &.card-head-small-unit--top {
              display: flex;
              justify-content: space-between;
              flex: none;
              width: 32px;
              align-self: flex-start;
            }
          }
        }
      }
    }
    .card-head-btm {
      padding: 4px 4px 2px 4px;
      .card-head-btm-up {
        height: 54px;
        line-height: 54px;
        text-align: center;
        font-weight: 600;
        font-size: 28px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .card-head-btm-down {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 28px;
        padding-left: 6px;
        background: url("~images/task/detail-card-level-bg.svg") 369px 28px;
        background-size: 369px 28px;
        .card-head-btm-down-left {
          display: flex;
          align-items: center;
          width: 150px;
          .card-star {
            margin-right: 3px;
          }
        }
        .card-head-btm-down-right {
          display: flex;
          align-items: center;

          .card-head-btm-down-text {
            font-weight: 600;
            font-size: 12px;
            color: black;
            margin-right: 9px;
          }
          .card-head-btm-down-status {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 52px;
            height: 28px;
            line-height: 28px;
            font-weight: 600;
            font-size: 12px;
            &.task-card-status-1 {
              color: #0f6c00;
              background-image: url("~images/task/green.svg");
              background-size: 52px 28px;
            }
            &.task-card-status-2 {
              color: #ffffff;
              background-image: url("~images/task/red.svg");
              background-size: 52px 28px;
            }
            &.task-card-status-3,
            &.task-card-status-4,
            &.task-card-status-5,
            &.task-card-status-6 {
              color: #ffffff;
              background-image: url("~images/task/blue.svg");
              background-size: 52px 28px;
            }
            &.task-card-status-7 {
              color: #2d41f1;
              background-image: url("~images/task/yellow.svg");
              background-size: 52px 28px;
            }
          }
        }
      }
    }
    .card-head-up {
      position: absolute;
      top: -2px;
    }
    .card-head-down {
      position: absolute;
    }
  }
  .card-body {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 34px 0 20px 0;

    .card-body-left,
    .card-body-right {
      position: relative;
      text-align: center;
      padding-top: 6px;
      font-weight: 600;
      font-size: 36px;
      border-left: 2px solid #f0f0f0;
      border-right: 2px solid #f0f0f0;
    }

    .card-body-left {
      position: relative;
      width: 203px;
      height: 50px;
      color: #ffa90e;
      .card-body-left-head {
        position: absolute;
        top: -12px;
        left: 3px;
        height: 18px;
        padding: 0 3px 0 18px;
        font-size: 12px;
        text-align: right;
        color: black;
        background: #ffde45;
        border: 1px solid #f3b700;
        clip-path: polygon(
          0 0,
          calc(100% - 1px) 0,
          calc(100% - 1px) 1px,
          100% 1px,
          100% calc(100% - 1px),
          calc(100% - 1px) calc(100% - 1px),
          calc(100% - 1px) 100%,
          0 100%
        );
      }
      .card-body-left-icon {
        position: absolute;
        top: -12px;
        left: -2px;
        display: inline-block;
        width: 21px;
        height: 26px;
        background-image: url("~images/task/gold.svg");
        background-size: cover;
        background-repeat: no-repeat;
      }
      .card-body-left-top {
        position: absolute;
        left: 0px;
        top: -4px;
      }
      .card-body-left-btm {
        position: absolute;
        top: 100%;
        left: 0px;
      }
    }
    .card-body-right {
      position: relative;
      text-align: center;
      width: 159px;
      height: 50px;
      color: #2d41f1;
      .card-body-right-exp {
        font-size: 14px;
      }
      .card-body-right-head {
        position: absolute;
        top: -12px;
        left: -2px;
        height: 18px;
        padding: 0 10px;
        font-size: 12px;
        text-align: right;
        color: white;
        background: #2d41f1;
        border: 1px solid #67e4ff;
        clip-path: polygon(
          0 0,
          calc(100% - 1px) 0,
          calc(100% - 1px) 1px,
          100% 1px,
          100% calc(100% - 1px),
          calc(100% - 1px) calc(100% - 1px),
          calc(100% - 1px) 100%,
          1px 100%,
          1px calc(100% - 1px),
          0 calc(100% - 1px),
          0 1px,
          1px 1px,
          1px 0
        );
      }
      .card-body-right-top {
        position: absolute;
        left: 0px;
        top: -4px;
      }
      .card-body-right-btm {
        position: absolute;
        top: 100%;
        left: 0px;
      }
    }
  }
  .card-foot {
    position: relative;
    width: 100%;
    font-weight: 600;
    font-size: 12px;
    color: #000000;

    .card-foot-up {
      position: relative;
      height: 24px;
      border-left: 2px solid #f0f0f0;
      border-right: 2px solid #f0f0f0;
      text-align: center;
      line-height: 24px;
      &::before {
        position: absolute;
        left: -2px;
        top: -4px;
        display: inline-block;
        content: "";
        width: 23px;
        height: 28px;
        background-image: url("~images/task/location.svg");
        background-size: cover;
        background-repeat: no-repeat;
        z-index: 2;
      }
    }
    .card-foot-head {
      position: absolute;
      left: 0;
      top: -4px;
    }
    .card-foot-foot {
      position: absolute;
      left: 0;
      top: 100%;
      z-index: 1;
    }
    .card-foot-down {
      position: relative;
      margin-top: 5px;
      padding: 10px;
      border-left: 2px solid #f0f0f0;
      border-right: 2px solid #f0f0f0;

      .card-layout-top {
        position: absolute;
        left: 0;
        top: -3px;
      }
      .card-layout-btm {
        position: absolute;
        left: 0;
        bottom: -4px;
      }
    }
  }
  .card-design {
    .design-title {
      height: 20px;
      margin: 15px 0;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #000000;
    }
    .design-list {
      .design-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 30px;
        padding: 0 13px;
        margin-bottom: 4px;
        background: #f4f4f4;
        &:last-child {
          margin-bottom: 0;
        }
        .design-item__icon {
          width: 14px;
          height: 20px;
          margin-right: 10px;
          background: url("~images/task/card-design.svg") no-repeat;
          background-size: 14px 20px;
        }
        .design-item__name {
          flex: 1;
          line-height: 30px;
          color: #000000;
          font-size: 14px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .design-item__delete {
          width: 12px;
          height: 12px;
          background: url("~images/task/card-delete.svg") no-repeat;
          background-size: 12px 12px;
          cursor: pointer;
        }
      }
    }
  }
  .card-btn-container {
    margin-top: 80px;
    .card-btn-tips {
      height: 24px;
      width: fit-content;
      padding: 0 6px;
      margin: 0 auto;
      border: 2px solid #f0f0f0;
      border-bottom: none;
      color: #20b36c;
      font-weight: 600;
      font-size: 12px;
      line-height: 24px;
      clip-path: polygon(
        0 2px,
        2px 2px,
        2px 0,
        calc(100% - 2px) 0,
        calc(100% - 2px) 2px,
        100% 2px,
        100% 100%,
        0 100%
      );
      .card-btn-tips--yellow {
        position: relative;
        left: -6px;
        display: inline-block;
        margin-right: 3px;
        background-color: #ffde45;
        text-align: center;
        color: #000000;
      }
    }
    .card-btn {
      width: 381px;
      height: 52px;
      background-size: 381px 52px;
      background-repeat: no-repeat;
      font-weight: 500;
      font-size: 24px;
      text-align: center;
      line-height: 52px;
      color: #ffffff;
      cursor: pointer;
      &.card-btn--green {
        background-image: url("~images/task/card-btn-green.png");
      }
      &.card-btn--grey {
        background-image: url("~images/task/card-btn-grey.png");
        color: #b4b4b4;
      }
      &.card-btn--light-green {
        background-image: url("~images/task/card-btn-light-green.png");
      }
    }
    /deep/.upload-file {
      width: 100%;
      .el-upload {
        width: 100%;
        height: 52px;
      }
      .el-button {
        width: 100%;
        height: 52px;
        background: transparent;
        padding: 0;
        border: none;
        font-weight: 500;
        font-size: 24px;
        text-align: center;
        line-height: 52px;
        color: #ffffff;
        cursor: pointer;
      }
    }
  }
}
</style>
