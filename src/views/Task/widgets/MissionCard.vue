<template>
  <div class="mission-card">
    <div class="card-head">
      <img class="card-head-up" src="~images/task/top.svg" />
      <div class="card-head-top">
        <div class="card-head-up-text">
          <span>初选截止倒计时</span>
          <span>截止日：{{ mission.end_at }}</span>
        </div>
        <div class="card-head-btm-text">
          <div>
            {{ formNowFormatDay(mission.end_at)
            }}<span class="card-head-small-text"> 天</span>
          </div>
          <div>:</div>
          <div>15<span class="card-head-small-text"> 时</span></div>
          <div>:</div>
          <div>15<span class="card-head-small-text"> 分</span></div>
        </div>
      </div>
      <div class="card-head-btm">
        <div class="card-head-btm-up">
          「{{ mission.name }}」的{{ mission.type_label }}
        </div>
        <div class="card-head-btm-down">
          <div class="card-head-btm-down-left">
            <div v-for="n in mission.level" :key="n">
              <img src="~/images/task/star.svg" class="card-star" />
            </div>
          </div>
          <div class="card-head-btm-down-right">
            <span class="card-head-btm-down-text"
              >发布时间 {{ mission.published_at }}</span
            >
            <div
              :class="[
                'card-head-btm-down-status',
                mission.status == 2 ? 'card-implementing' : '',
                mission.status == 3 ? 'card-judging' : '',
                mission.status == 4 ? 'card-tendering' : '',
                mission.status == 1 ? 'card-finalized' : ''
              ]"
            >
              {{ mission.status_label }}
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
        ¥{{ priceFormat(mission.price) }}
        <img class="card-body-left-btm" src="~images/task/left-btm.svg" />
      </div>
      <div class="card-body-right">
        <img class="card-body-right-top" src="~images/task/right-top.svg" />
        <div class="card-body-right-head">
          <span class="card-body-right-text">经验值</span>
        </div>
        {{ mission.experience_point
        }}<span class="card-body-right-exp"> exp</span>
        <img class="card-body-right-btm" src="~images/task/right-btm.svg" />
      </div>
    </div>
    <div class="card-foot">
      <div class="card-foot-up">
        <img class="card-foot-head" src="~images/task/top.svg" />
        <span v-if="mission.city">{{ mission.city.city.name }}</span> ｜
        {{ mission.square }}平方 ｜
        <span v-if="mission.layout"
          >{{ mission.layout.type1 }}室{{ mission.layout.type2 }}厅{{
            mission.layout.type3
          }}卫</span
        >
        <img class="card-foot-foot" src="~images/task/btm.svg" />
      </div>
      <div class="card-foot-down">
        <img class="card-layout-top" src="~images/task/top.svg" />
        <the-loading-image
          :width="357"
          :height="357"
          :url="mission.cover_url"
        />
        <img class="card-layout-btm" src="~images/task/btm.svg" />
      </div>
    </div>
    <div class="card-design" v-if="designs.length">
      <div class="design-title">方案提交</div>
      <div class="design-list">
        <div
          class="design-item"
          v-for="(design, designIdx) in designs"
          :key="designIdx"
        >
          <i class="design-item__icon"></i>
          <span class="design-item__name">{{ design.name }}</span>
          <i class="design-item__delete"> </i>
        </div>
      </div>
    </div>
    <div class="card-btn">
      <template>
        <div class="card-btn-tips">
          <template v-if="!is_join && mission.status == 2 && level == 0">
            {{ mission.users_count }}人参与，还剩{{
              mission.max_apply - mission.users_count
            }}个名额
          </template>
          <template v-if="is_join && mission.status == 2">
            <span class="card-btn-tips--yellow">已参与</span
            >点击上传方案，可上传多个方案
          </template>
          <template
            v-if="is_join && (mission.status == 4 || mission.status == 6)"
          >
            <span class="card-btn-tips--yellow">已参与</span>方案提交已截止，{{
              mission.users_count
            }}参与
          </template>
        </div>
        <div class="card-btn-container">
          <!-- 未参与且任务是进行中 -->
          <template v-if="!is_join && mission.status == 2 && level !== 0">
            <div class="card-btn card-btn--green" @click="handleShowDialog">
              {{ mission.heart_count }}暖心立即参与
            </div>
          </template>
          <!-- 已参与且任务是进行中 -->
          <template v-if="is_join && mission.status == 2 && !designs.length">
            <div class="card-btn card-btn--green">
              上传方案
            </div>
          </template>
          <!-- 已参与且任务是进行中 -->
          <template v-if="is_join && mission.status == 2 && designs.length">
            <div class="card-btn card-btn--green">
              重新上传
            </div>
          </template>
          <!-- 已参与且任务评审中 -->
          <template v-if="is_join && mission.status == 4">
            <div class="card-btn card-btn--grey">
              任务评审中
            </div>
          </template>
          <!-- 已参与且任务已完成 -->
          <template v-if="is_join && mission.status == 6">
            <div class="card-btn card-btn--grey">
              任务已完成
            </div>
          </template>
          <!-- 新手 -->
          <template v-if="!is_join && level == 0">
            <div class="card-btn card-btn--green" @click="handleShowDialog">
              无赏参与
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import TheLoadingImage from "components/TheLoadingImage";
import { formatDate, formNowFormatDay } from "utils/moment";
import { priceFormat } from "utils/function";
export default {
  name: "MissionCard",
  props: {
    mission: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      is_join: false,
      level: 0,
      designs: [
        {
          name: "简历.pdf",
          url:
            "http://docee.oss-cn-shanghai.aliyuncs.com/admin/2021/0728/degree/4OS8uXyI8GyToghu3NPjtp1GK3N9pmqkuyy42r8g.pdf"
        }
      ]
    };
  },
  components: {
    TheLoadingImage
  },
  methods: {
    formatDate,
    formNowFormatDay,
    priceFormat,
    handleShowDialog() {
      this.$emit("toggleShowDialog");
    }
  }
};
</script>
<style type="text/css" lang="less" scoped>
.mission-card {
  width: 380px;
  .card-head {
    position: relative;
    width: 100%;
    border-left: 2px solid #f0f0f0;
    border-right: 2px solid #f0f0f0;
    .card-head-top {
      width: 100%;
      height: 86px;
      padding: 7px 32px;
      background: #ffe24c;
      .card-head-up-text {
        display: flex;
        justify-content: space-between;
        color: black;
        font-weight: 600;
        font-size: 12px;
        padding-bottom: 3px;
        margin-bottom: 3px;
        border-bottom: 1px solid black;
      }
      .card-head-btm-text {
        display: flex;
        justify-content: space-between;
        line-height: 46px;
        font-weight: 600;
        font-size: 48px;
        color: black;
        .card-head-small-text {
          font-size: 12px;
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
        background: #eaeaea;
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
          }
          .card-implementing {
            color: #0f6c00;
            background-image: url("~images/task/green.svg");
          }

          .card-judging {
            color: white;
            background-image: url("~images/task/red.svg");
          }

          .card-tendering {
            color: white;
            background-image: url("~images/task/blue.svg");
          }

          .card-finalized {
            color: #2d41f1;
            background-image: url("~images/task/yellow.svg");
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
  .card-btn {
    position: fixed;
    bottom: 90px;
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
    .card-btn-container {
      width: 381px;
      height: 52px;
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
    }
  }
}
</style>
