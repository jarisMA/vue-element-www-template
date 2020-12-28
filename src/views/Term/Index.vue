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
        <el-step title="选择设计方案"></el-step>
        <el-step title="小结"></el-step>
      </el-steps>
      <div class="step-1 my-plan-wrapper" v-show="activeStep === 1">
        <div
          class="add-plan-button"
          v-if="plans.length > 0 && false"
          @click="goDrawPlan()"
        >
          <icon-svg svg-class="add-icon" svg-name="add" />
          新建方案
        </div>
        <plan-list
          :showNoTips="false"
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
        <div class="more-wrapper" v-if="!planLoading && plans.length === 0">
          <the-empty noText="还没有方案，你可以去新建一个" />
          <div class="new-button" @click="goDrawPlan()">
            <icon-svg svg-class="add-icon" svg-name="add" />
            新建方案
          </div>
        </div>
      </div>
      <div class="step-2" v-if="activeStep === 2">
        <h3 class="select-homework-title">
          {{ activeHomework.name }}
        </h3>
        <div class="step-2-content">
          <div class="select-plan-wrapper">
            <label class="label-title">已选方案</label>
            <div class="select-plan-card">
              <div class="card-top">
                <the-loading-image
                  :url="activePlan.planPic"
                  :width="260"
                  :height="260"
                />
              </div>
              <div class="card-bottom">
                <h4 class="card-name">
                  {{ activePlan.name }}
                </h4>
                <div class="card-bottom-right">
                  <div class="card-desc">
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
          <div class="homework-input-wrapper">
            <div class="homework-content">
              <label class="label-title">设计阐述与说明</label>
              <el-input
                type="textarea"
                placeholder="请简练的阐述问题与需求。
分段会更清晰：
1..  
2...
3....
4......
（控制在500字内）
"
                maxlength="500"
                show-word-limit
                v-model="activePlanContent"
                :rows="10"
              ></el-input>
            </div>
            <div class="homework-image">
              <label class="label-title">配图</label>
              <div class="homework-image-wrapper">
                <ul>
                  <li
                    class="image-wrapper"
                    v-for="(item, key) of activePlanPic"
                    :key="item"
                  >
                    <img :src="item" />
                    <icon-svg
                      svg-class="delete-icon"
                      svg-name="delete"
                      @click="deleteActivePlanPic(key)"
                    />
                  </li>
                  <li v-if="activePlanPic.length < 3">
                    <upload-image @added="addActivePlanPic" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <template v-if="plans.length > 0">
          <el-button class="button" @click="closeHomeworkDialog"
            >取消</el-button
          >
          <el-button
            class="button"
            type="primary"
            :disabled="!activePlan"
            :loading="submitLoading"
            @click="submit"
          >
            {{ activeStep === 2 ? "提交" : "下一步" }}
          </el-button>
        </template>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import termService from "service/term";
import TheLoadingImage from "components/TheLoadingImage";
import Homework from "./widgets/Homework";
import PlanList from "components/PlanList";
import TheEmpty from "components/TheEmpty";
import UploadImage from "components/UploadImage";
import kujialeService from "service/kujiale";

import { TERM_STATUS } from "utils/const";
import { formatDate } from "utils/moment";
import { goDrawPlan } from "utils/routes";
import submit_hw_img from "images/submit_hw.png";
import success_img from "images/success.svg";

export default {
  name: "Term",
  components: {
    TheLoadingImage,
    Homework,
    PlanList,
    TheEmpty,
    UploadImage
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
      activePlanContent: "",
      activePlanPic: [],
      submitLoading: false
    };
  },
  created() {
    this.getData();
    this.getPlans();
  },
  methods: {
    formatDate,
    goDrawPlan,
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
    addActivePlanPic(url) {
      this.activePlanPic.push(url);
    },
    deleteActivePlanPic(key) {
      this.activePlanPic.splice(key, 1);
    },
    submit() {
      if (this.activeStep === 1) {
        this.activeStep = 2;
      } else if (this.activeStep === 2) {
        this.$msgBox
          .showMsgBox({
            width: 400,
            height: 270,
            img: submit_hw_img,
            content:
              "<p style='color:#14AF64FF;'>作业一定要按照要求认真完成,</p><p style='color:#14AF64FF;'>乱做或敷衍会被老师无情驳回噢~</p></p>",
            confirmBtnText: "确定提交",
            cancelBtnText: "再调整一下",
            bodyClass: "submit-homework-modal-body"
          })
          .then(() => {
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
              q_content: JSON.stringify({
                content: this.activePlanContent,
                images: this.activePlanPic
              })
            };
            const { camp_id, term_id, id, user_homework } = this.activeHomework;
            this.submitLoading = true;
            if (user_homework) {
              termService
                .updateCampHomework(user_homework.id, params)
                .then(() => {
                  this.closeHomeworkDialog();
                  this.getData();
                  this.$msgBox.showMsgBox({
                    width: 400,
                    height: 270,
                    img: success_img,
                    content:
                      "<p style='color:#14AF64FF;'>提交成功</p><p style='color:#ABABABFF;'>请耐心等待老师的批复吧~</p></p>",
                    confirmBtnText: "确定",
                    showCancelBtn: false
                  });
                })
                .finally(() => {
                  this.submitLoading = false;
                });
            } else {
              termService
                .campHomework(camp_id, term_id, id, params)
                .then(() => {
                  this.closeHomeworkDialog();
                  this.getData();
                  this.$msgBox.showMsgBox({
                    width: 400,
                    height: 270,
                    img: success_img,
                    content:
                      "<p style='color:#14AF64FF;'>提交成功</p><p style='color:#ABABABFF;'>请耐心等待老师的批复吧~</p></p>",
                    confirmBtnText: "确定",
                    showCancelBtn: false
                  });
                })
                .finally(() => {
                  this.submitLoading = false;
                });
            }
          });
      }
    },
    closeHomeworkDialog() {
      this.visible = false;
      this.activeStep = 1;
      this.activeHomework = null;
      this.activePlan = null;
      this.activePlanContent = null;
      this.activePlanPic = [];
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
        margin-top: 25px;
        .add-plan-button {
          position: absolute;
          top: 50px;
          right: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100px;
          height: 30px;
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          background: @primaryColor;
          cursor: pointer;
          .add-icon {
            margin-right: 4px;
            font-size: 12px;
          }
        }
        .more-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .empty-wrapper {
            padding: 145px 0 20px;
            img {
              width: 170px;
              height: 120px;
            }
          }
          .new-button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 204px;
            height: 40px;
            font-size: 14px;
            font-weight: 500;
            color: #fff;
            background: @primaryColor;
            cursor: pointer;
            .add-icon {
              margin-right: 4px;
              font-size: 12px;
            }
          }
        }
      }
      .step-2 {
        padding-top: 44px;
        .label-title {
          display: inline-block;
          margin-bottom: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #787878;
        }
        .step-2-content {
          display: flex;
        }
        .select-plan-wrapper {
          width: 280px;
          margin-right: 24px;
        }
        .homework-input-wrapper {
          flex: 1;
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
          flex-direction: column;
          width: 100%;
          padding: 10px;
          background: #fff;
          .card-top {
            width: 260px;
            height: 260px;
            padding-bottom: 10px;
          }
          .card-bottom {
            display: flex;
            flex-direction: column;
            padding: 10px 0 0;
            height: 100px;
            border-top: 1px solid #e6e6e6ff;
            .card-name {
              font-size: 14px;
              font-weight: bold;
              color: #333333;
            }
            .card-bottom-right {
              flex: 1;
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
              .button {
                align-self: flex-end;
              }
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
                margin-top: 10px;
                font-size: 12px;
                font-weight: 400;
                color: #ababab;
              }
            }
          }
        }
        .homework-content {
          .el-textarea__inner {
            border-color: #ccccccff;
            border-radius: unset;
          }
        }
        .homework-image {
          margin-top: 25px;
          ul {
            display: flex;
          }
          .image-wrapper {
            position: relative;
            width: 100px;
            height: 100px;
            background: #d8d8d8;
            img {
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
/deep/ .submit-homework-modal-body {
  img {
    width: 104px;
  }
}
</style>
