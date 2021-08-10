<template>
  <router-link
    target="_blank"
    :to="{ name: 'TaskDetail', params: { id: task.uuid } }"
    class="widget-task-card"
  >
    <div class="card-level">
      <i class="level-block"></i>
      <div class="level-list">
        <i
          class="level-item__icon"
          v-for="item of task.level"
          :key="item - 1"
        ></i>
      </div>
      <i class="level-block"></i>
    </div>
    <div class="card-header">
      <div class="card-title">{{ task.name }}</div>
      <div class="card-time">
        <span>发布时间:{{ formatDate(task.published_at) }}</span>
      </div>
    </div>
    <div class="card-body">
      <div class="card-cover">
        <the-loading-image :width="320" :height="320" :url="task.cover_url" />
      </div>

      <div class="card-location">
        <div class="card-layout" v-if="task.layout">
          {{ task.city.city.name }} ｜ {{ Math.ceil(task.square) }}平方 ｜
          {{ task.layout.type1 }}室{{ task.layout.type2 }}厅{{
            task.layout.type3
          }}卫
        </div>
        <div class="card-users" v-if="false">{{ task.user_count }}人已参与</div>
      </div>
      <div class="card-status">
        <div class="card-status__status" :class="'card-status-' + task.status">
          {{ task.status_label }}
        </div>
        <div class="card-status__time">
          <template v-if="task.status == 1">
            <div
              class="card-status--green"
              v-if="diff_day_type == 'isOneDayOver'"
            >
              初选截止:剩余{{ formNowFormatDay(task.submit_end_at) }}天({{
                display_submit_end_at
              }})
            </div>
            <div
              class="card-status--red"
              v-if="diff_day_type == 'isOneDayleft'"
            >
              初选截止:<Countdown
                :created-time="task.submit_end_at"
                format="hh:mm:ss"
                class="card-status__countdown"
              ></Countdown>
              ({{ display_submit_end_at }})
            </div>
          </template>
          <template v-if="diff_day_type == 'isTimeout'">
            <div class="card-status--grey">
              ------初选截止：已截稿------
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="card-footer-title">
        <div class="card-footer__title">
          悬赏金额
        </div>
        <i class="card-footer__icon"></i>
      </div>
      <div class="card-footer-price">
        <div class="card-price">¥{{ priceFormat(task.total_price) }}</div>
        <div class="card-price--hover">前往了解</div>
      </div>

      <div class="card-exp">
        <span>EXP</span>
        <span>{{ task.experience_point }}</span>
      </div>
    </div>
  </router-link>
</template>
<script>
import TheLoadingImage from "components/TheLoadingImage";
import Countdown from "./Countdown";
import { formatDate, formNowFormatDay, diffDayType } from "utils/moment";
import { priceFormat } from "utils/function";

export default {
  name: "TaskCard",
  components: {
    TheLoadingImage,
    Countdown
  },

  props: {
    task: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      display_submit_end_at: null,
      diff_day_type: null
    };
  },
  methods: {
    formatDate,
    formNowFormatDay,
    priceFormat,
    diffDayType
  },
  created() {
    this.display_submit_end_at = formatDate(this.task.submit_end_at);
    this.diff_day_type = this.diffDayType(this.task.submit_end_at, new Date());
  }
};
</script>
<style lang="less" scoped>
.widget-task-card {
  position: relative;
  display: block;
  width: 380px;
  height: 560px;
  padding: 24px 20px 0;
  background: url("~images/task/index-card-bg.png") no-repeat;
  background-size: 380px 560px;
  color: #000000;
  transition: all 0.3s;
  .card-level {
    position: absolute;
    left: 50%;
    top: -14px;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    height: 30px;
    width: fit-content;
    padding: 0 4px;
    border-top: 2px solid #e9e9e9;
    border-bottom: 2px solid #e9e9e9;
    background-color: #ffffff;
    transition: border 0.3s;
    .level-block {
      position: relative;
      display: inline-block;
      width: 10px;
      height: 2px;
      background-color: #e9e9e9;
      &:before {
        position: absolute;
        top: 4px;
        left: 0;
        content: "";
        width: 10px;
        height: 2px;
        background-color: #e9e9e9;
      }
      &:after {
        position: absolute;
        bottom: 4px;
        left: 0;
        content: "";
        width: 10px;
        height: 2px;
        background-color: #e9e9e9;
      }
    }
    .level-list {
      margin: 0 10px;
      .level-item__icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 9px;
        background: url("~images/task/index-card-star.svg") no-repeat;
        background-size: 20px 20px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .card-header {
    display: flex;
    align-items: center;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-weight: 600;
    .card-title {
      width: 202px;
      padding: 0 4px;
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .card-time {
      width: 138px;
      font-size: 12px;
    }
  }
  .card-body {
    .card-cover {
      padding: 8px 10px 8px;
    }
    .card-location {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      height: 26px;
      line-height: 26px;
      .card-layout {
        flex: 1;
        font-size: 12px;
      }
      .card-users {
        font-weight: 500;
        font-size: 12px;
        color: #ec9f00;
      }
    }
    .card-status {
      position: relative;
      display: flex;
      .card-status__status {
        position: absolute;
        top: -2px;
        left: 42px;
        width: 52px;
        height: 28px;
        line-height: 28px;
        font-weight: 600;
        font-size: 12px;
        text-align: center;
        &.card-status-1 {
          background: url("~images/task/index-card-status-1.png") no-repeat;
          background-size: 52px 28px;
          color: #0f6c00;
        }
        &.card-status-2 {
          background: url("~images/task/index-card-status-2.png") no-repeat;
          background-size: 52px 28px;
          color: #ffffff;
        }
        &.card-status-3,
        &.card-status-4,
        &.card-status-5,
        &.card-status-6 {
          background: url("~images/task/index-card-status-3.png") no-repeat;
          background-size: 52px 28px;
          color: #ffffff;
        }
        &.card-status-7 {
          background: url("~images/task/index-card-status-7.png") no-repeat;
          background-size: 52px 28px;
          color: #2d41f1;
        }
      }
      .card-status__time {
        width: 206px;
        height: 24px;
        margin-left: 94px;
        padding: 0 8px;
        line-height: 24px;
        font-size: 12px;
        font-weight: 600;
        text-align: center;
        .card-status--green {
          color: #1bc100;
        }
        .card-status--red {
          display: flex;
          align-items: center;
          color: #ff0000;
          .card-status__countdown {
            flex: 1;
            width: 55px;
            text-align: left;
          }
        }
        .card-status--grey {
          color: #7c7c7c;
        }
      }
    }
  }
  .card-footer {
    position: relative;
    padding-top: 12px;
    .card-footer-title {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
    }
    .card-footer__title {
      padding-left: 12px;
      width: 72px;
      height: 18px;
      border-top: 2px solid #ffc821;
      border-right: 2px solid #ffc821;
      background-color: #ffde45;
      font-weight: 600;
      font-size: 12px;
      line-height: 18px;
      clip-path: polygon(
        0 0,
        calc(100% - 2px) 0,
        calc(100% - 2px) 2px,
        100% 2px,
        100% 100%,
        0 100%
      );
    }
    .card-footer__icon {
      position: absolute;
      top: -3px;
      left: 122px;
      display: inline-block;
      width: 21px;
      height: 26px;
      background: url("~images/task/index-card-price.svg") no-repeat;
      background-size: contain;
      z-index: 88;
    }
    .card-footer-price {
      width: 228px;
      height: 52px;
      margin: 0 auto;
      line-height: 52px;
      font-weight: 600;
      font-size: 36px;
      color: #ffffff;
      text-align: center;
      transition: all 0.5s;
      .card-price {
        background: url("~images/task/index-card-btn.png") no-repeat;
        background-size: 228px 52px;
      }
      .card-price--hover {
        position: absolute;
        bottom: 20px;
        opacity: 0;
        width: 228px;
        height: 52px;
        overflow: hidden;
        font-size: 18px;
        z-index: 77;
      }
    }
    .card-exp {
      display: flex;
      justify-content: space-between;
      width: 76px;
      height: 20px;
      margin: 0 auto;
      background: url("~images/task/index-card-exp.png") no-repeat;
      background-size: 76px 20px;
      line-height: 20px;
      color: white;
      font-weight: 600;
      text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
      span {
        width: 50%;
        text-align: center;
      }
    }
  }
  &:hover {
    background: url("~images/task/index-card-bg-hover.png") no-repeat;
    background-size: 380px 560px;
    .card-level {
      border-color: #000000;
    }
    .card-footer {
      .card-footer-price {
        .card-price {
          opacity: 0;
          overflow: hidden;
        }
        .card-price--hover {
          opacity: 1;
          background: url("~images/task/index-card-btn-hover.png") no-repeat;
          background-size: 228px 52px;
        }
      }
    }
  }
}
</style>
