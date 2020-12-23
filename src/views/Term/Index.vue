<template>
  <div class="term-container" v-loading="loading">
    <div class="term-info-wrapper" v-if="detail">
      <div class="container-1200">
        <div class="term-cover">
          <the-loading-image
            :url="detail.cover_file_url"
            :width="350"
            :height="196"
          />
        </div>
        <div class="term-info">
          <div class="term-name-wrapper">
            <h4 class="term-name">{{ detail.name }}</h4>
            <label
              :class="{
                'term-status': true,
                started: detail.status === 1,
                ended: detail.status === 2,
                unstart: detail.status === 0
              }"
              >{{ TERM_STATUS[detail.status] }}</label
            >
          </div>
          <div class="term-time-wrapper">
            <span class="term-start"
              >{{ formatDate(detail.start_at) }} 开课
            </span>
            |
            <span class="term-end"
              >{{ formatDate(detail.end_at) }} 前有效
            </span>
          </div>
          <p class="term-desc">
            {{ detail.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="term-content container-1200">
      <el-tabs v-model="activeName">
        <el-tab-pane label="作业" name="homework">
          <p class="homework-tips">
            *请先在「我的方案」中创建方案并完成作业要求，再进行作业提交。
          </p>
          <ul class="homework-list">
            <li v-for="homework of homeworks" :key="homework.id">
              <homework
                :homework="homework"
                @submitClick="showHomeworkDialog(homework)"
              />
            </li>
          </ul>
          <the-empty
            v-if="homeworks.length === 0 && !loading"
            noText="暂无作业可发挥"
          />
        </el-tab-pane>
        <el-tab-pane label="讨论区" name="discussion" disabled> </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      class="submitHomeworkDialog"
      width="800px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-steps class="step-wrapper" align-center :active="activeStep">
        <el-step title="选择方案"></el-step>
        <el-step title="小结"></el-step>
      </el-steps>
      <div class="step-1 my-plan-wrapper" v-show="activeStep === 1">
        <plan-list
          :showNoTips="!planLoading"
          :plans="plans"
          :activeIndex="activePlan && activePlan.planId"
          :size="dialogPagination.size"
          :page="dialogPagination.page"
          :total="dialogPagination.total"
          :paginationLayout="paginationLayout"
          theme="homework"
          @itemClick="selectPlan"
          @pageChange="getPlans"
        />
      </div>
      <div class="step-2" v-if="activeStep === 2">
        <h3 class="select-homework-title">
          {{ activeHomework.name }}
        </h3>
        <div class="select-plan-wrapper">
          <label class="label-title">方案</label>
          <div class="select-plan-card">
            <div class="card-left">
              <the-loading-image
                :url="activePlan.planPic"
                :width="200"
                :height="200"
              />
            </div>
            <div class="card-right">
              <h4 class="card-name">
                {{ activePlan.name }}
              </h4>
              <div class="card-right-bottom">
                <div class="card-desc">
                  <label>详细信息：</label>
                  <span class="card-type">
                    {{ parseInt(activePlan.srcArea) }}㎡ |
                    {{ activePlan.specName }}
                  </span>
                  <span class="card-address">
                    <i class="el-icon-location-outline"></i>
                    {{ activePlan.filterCity }} {{ activePlan.commName }}
                  </span>
                </div>
                <el-button class="button" type="primary" @click="stepBack">
                  重新选择
                </el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="homework-content">
          <label class="label-title">小结</label>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            maxlength="500"
            show-word-limit
            v-model="activePlanContent"
            :rows="5"
          ></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="button" @click="closeHomeworkDialog">取消</el-button>
        <el-button
          class="button"
          type="primary"
          :disabled="!activePlan"
          @click="submit"
        >
          {{ activeStep === 2 ? "提交" : "下一步" }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import termService from "service/term";
import TheLoadingImage from "components/TheLoadingImage";
import Homework from "./widgets/Homework";
import PlanList from "components/PlanList";
import TheEmpty from "components/TheEmpty.vue";

import kujialeService from "service/kujiale";

import { TERM_STATUS } from "utils/const";
import { formatDate } from "utils/moment";

export default {
  name: "Term",
  components: {
    TheLoadingImage,
    Homework,
    PlanList,
    TheEmpty
  },
  data() {
    return {
      TERM_STATUS,
      loading: true,
      detail: null,
      activeName: "homework",
      homeworks: [],
      visible: false,
      activeStep: 1,
      dialogPagination: {
        size: 8,
        page: 1,
        total: 0
      },
      paginationLayout: {
        small: true
      },
      plans: [],
      planLoading: true,
      activeHomework: null,
      activePlan: null,
      activePlanContent: ""
    };
  },
  created() {
    this.getData();
    this.getPlans();
  },
  methods: {
    formatDate,
    getData() {
      this.loading = true;
      termService
        .campTerm(this.$route.params.id)
        .then(res => {
          this.detail = res.camp_term;
          this.homeworks = res.homeworks;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getPlans(start = 1) {
      this.planLoading = true;
      kujialeService
        .designList({
          page: start,
          page_size: this.dialogPagination.size
        })
        .then(res => {
          this.dialogPagination.total = res.totalCount;
          this.plans = res.result;
          this.dialogPagination.page = start;
        })
        .finally(() => {
          this.planLoading = false;
        });
    },
    showHomeworkDialog(homework) {
      this.activeHomework = homework;
      this.visible = true;
    },
    selectPlan(item) {
      this.activePlan = item;
      let arr = item.city.split(" ");
      this.activePlan.filterCity = arr.length > 1 ? arr[1] : arr[0];
    },
    stepBack() {
      this.activeStep = 1;
      this.activePlan = null;
    },
    submit() {
      if (this.activeStep === 1) {
        this.activeStep = 2;
      } else if (this.activeStep === 2) {
        this.$confirm(
          `请确认已按要求完成作业，提交后请耐心等待老师批复。`,
          "",
          {
            confirmButtonText: "确定提交",
            cancelButtonText: "再调整一下"
          }
        ).then(() => {
          const {
            planId,
            name,
            planPic,
            srcArea,
            specName,
            city,
            commName
          } = this.activePlan;
          const params = {
            study_design_id: planId,
            study_design_name: name,
            study_design_pic: planPic,
            study_design_src_area: srcArea,
            study_design_spec_name: specName,
            study_design_city: city,
            study_design_comm_name: commName,
            q_content: this.activePlanContent
          };
          const { camp_id, term_id, id } = this.activeHomework;
          termService.campHomework(camp_id, term_id, id, params).then(res => {
            this.$notice({
              title: res.msg
            });
            this.closeHomeworkDialog();
            this.getData();
          });
        });
      }
    },
    closeHomeworkDialog() {
      this.visible = false;
      this.activeStep = 1;
      this.activeHomework = null;
      this.activePlan = null;
      this.activePlanContent = null;
      if (this.dialogPagination.page !== 1) {
        this.getPlans();
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
.term-container {
  min-height: calc(100vh - 130px);
  /deep/ .submitHomeworkDialog {
    .el-dialog {
      background: #f7f7f7ff;
      .el-dialog__header {
        padding: 0;
      }
      .el-dialog__body {
        padding: 20px 30px;
        height: 650px;
      }
      .el-dialog__footer {
        padding: 0 30px 20px;
      }
      .step-wrapper {
        margin: auto;
        width: 167px;
        .el-step__head {
          &.is-finish {
            .el-step__icon.is-text {
              background: @primaryColor;
            }
          }
          .el-step__icon.is-text {
            width: 30px;
            height: 30px;
            color: #fff;
            background: #d9d9d9ff;
            border: none;
            .el-step__icon-inner {
              font-size: 14px;
              font-weight: bold;
            }
          }
        }
        .el-step__title {
          margin-top: 10px;
          line-height: 1;
          font-size: 12px;
          font-weight: 400;
          color: #ababab;
        }
      }
      .my-plan-wrapper {
        margin-top: 18px;
      }
      .step-2 {
        padding-top: 44px;
        .label-title {
          display: inline-block;
          margin-bottom: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #333333;
        }
        .select-homework-title {
          position: relative;
          margin-bottom: 20px;
          padding-left: 14px;
          line-height: 20px;
          font-size: 20px;
          font-weight: bold;
          color: #333333;
          &::before {
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            content: "";
            background: @primaryColor;
          }
        }
        .select-plan-card {
          display: flex;
          width: 100%;
          height: 224px;
          padding: 10px 20px 14px 11px;
          background: #fff;
          .card-left {
            width: 200px;
            height: 200px;
            margin-right: 19px;
          }
          .card-right {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 10px 0;
            .card-name {
              font-size: 18px;
              font-weight: bold;
              color: #333333;
            }
            .card-right-bottom {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
            }
            .card-desc {
              display: flex;
              flex-direction: column;
              line-height: 1;
              label {
                margin-bottom: 12px;
                font-size: 14px;
                font-weight: 400;
                color: #787878;
              }
              span {
                display: inline-block;
                font-size: 12px;
                font-weight: 400;
                color: #ababab;
                &:not(:last-child) {
                  margin-bottom: 10px;
                }
              }
            }
          }
        }
        .homework-content {
          margin-top: 50px;
          .el-textarea__inner {
            border-color: #ccccccff;
            border-radius: unset;
          }
        }
      }
      .button {
        width: 74px;
        height: 32px;
        padding: 0;
        line-height: 32px;
        font-size: 14px;
        font-weight: 400;
        color: #787878;
        border-radius: unset;
        &.el-button--primary {
          color: #fff;
          &:focus {
            background: @primaryColor;
            border-color: @primaryColor;
          }
        }
      }
    }
  }
}
.term-info-wrapper {
  width: 100%;
  height: 210px;
  padding-top: 60px;
  background: #fff;
  .container-1200 {
    display: flex;
    .term-cover {
      margin-right: 20px;
      width: 350px;
      height: 196px;
    }
    .term-info {
      flex: 1;
      .term-name-wrapper {
        display: flex;
        align-items: center;
        .term-name {
          margin-right: 15px;
          max-width: 755px;
          line-height: 1;
          font-size: 24px;
          font-weight: bold;
          color: #333333;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .term-status {
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          font-weight: 400;
          color: #666666;
          background: #d8d8d8;
          border-radius: 10px;
          &.unstart {
            color: #6e6e6e;
            background: #ffedcfff;
          }
          &.started {
            color: #fff;
            background: #18c20eff;
          }
          &.ended {
            color: #666666;
            background: #d8d8d8ff;
          }
        }
      }
      .term-time-wrapper {
        margin: 12px 0 24px;
        line-height: 1;
        font-size: 14px;
        font-weight: bold;
        color: #ababab;
      }
      .term-desc {
        line-height: 17px;
        font-size: 12px;
        font-weight: 400;
        color: #ababab;
      }
    }
  }
}
.term-content {
  margin-top: 108px;
  margin-bottom: 30px;
  /deep/ .el-tabs {
    .el-tabs__header {
      margin-bottom: 20px;
    }
    .el-tabs__nav-scroll {
      display: flex;
    }
    .el-tabs__active-bar {
      // display: none;
      width: 70px !important;
      transform: translateX(0) !important;
    }
    .el-tabs__item {
      position: relative;
      padding: 0 20px !important;
      font-size: 16px;
      font-weight: bold;
      color: #333333;
    }
    .el-tabs__nav-wrap::after {
      width: 0 !important;
    }
    .el-tabs__item.is-disabled {
      color: #cccccc;
    }
  }
  .homework-tips {
    margin-bottom: 5px;
    line-height: 17px;
    font-size: 12px;
    font-weight: 400;
    color: #ababab;
  }
  .homework-list {
    li:not(:last-child) {
      margin-bottom: 20px;
    }
  }
}
</style>
