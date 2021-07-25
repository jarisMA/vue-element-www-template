<template>
  <div class="mission-card">
    <div class="card-head">
      <img class="card-head-up" src="~images/task/top.svg" />
      <div class="card-head-top">
        <div class="card-head-up-text">
          <span>初选截止倒计时</span>
          <span>截止日：{{ mission.created_at }}</span>
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
          【{{ mission.name }}】的{{ mission.type_label }}
        </div>
        <div class="card-head-btm-down">
          <div class="card-head-btm-down-left">
            <div v-for="n in mission.level" :key="n">
              <img src="~/images/task/star.svg" class="card-star" />
            </div>
          </div>
          <div class="card-head-btm-down-right">
            <span class="card-head-btm-down-text"
              >发布时间 {{ mission.created_at }}</span
            >
            <div
              :class="[
                'card-head-btm-down-status',
                mission.status == 2 ? 'card-implementing' : '',
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
        {{ mission.city.city.name }} ｜ {{ mission.city.square }}平方 ｜
        {{ mission.city.layout.type1 }}室{{ mission.city.layout.type2 }}厅{{
          mission.city.layout.type3
        }}卫
        <img class="card-foot-foot" src="~images/task/btm.svg" />
      </div>
      <div class="card-foot-down">
        <img class="card-layout-top" src="~images/task/top.svg" />
        <the-loading-image
          :width="357"
          :height="375"
          :url="mission.cover_url"
        />
        <img class="card-layout-btm" src="~images/task/btm.svg" />
      </div>
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
  components: {
    TheLoadingImage
  },
  methods: {
    formatDate,
    formNowFormatDay,
    priceFormat
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
      background: blueviolet;
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
      padding: 4px;
      .card-head-btm-up {
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

        .card-body-left-text::before {
          position: absolute;
          left: -6px;
          top: -1px;
          display: inline-block;
          content: "";
          width: 21px;
          height: 26px;
          background-image: url("~images/task/gold.svg");
          background-size: cover;
          background-repeat: no-repeat;
        }
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
      text-align: center;
      border-left: 2px solid #f0f0f0;
      border-right: 2px solid #f0f0f0;

      &::before {
        position: absolute;
        left: 0px;
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
}
</style>
