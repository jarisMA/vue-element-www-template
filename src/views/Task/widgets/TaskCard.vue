<template>
  <div class="task-card">
    <div class="card-level">
      <img src="~images/task/lv1.svg" v-if="task.level == 1" />
      <img src="~images/task/lv2.svg" v-if="task.level == 2" />
      <img src="~images/task/lv3.svg" v-if="task.level == 3" />
      <img src="~images/task/lv4.svg" v-if="task.level == 4" />
      <img src="~images/task/lv5.svg" v-if="task.level == 5" />
    </div>
    <div class="card-head">
      <div class="card-title">{{ task.name }}的{{ task.type_label }}</div>
      <div class="card-time">
        <div>发布时间</div>
        <div>{{ task.created_at }}</div>
      </div>
    </div>
    <div class="card-body">
      <the-loading-image :width="328" :height="274" :url="task.cover_url" />
      <div class="card-location">
        <div class="card-layout">
          {{ task.city.city.name }} ｜ {{ task.city.square }}平方 ｜
          {{ task.city.layout.type1 }}室{{ task.city.layout.type2 }}厅{{
            task.city.layout.type3
          }}卫
        </div>
        <div class="card-participation">
          人参与,人中标
        </div>
      </div>
      <div class="card-status">
        <div class="card-flex" v-if="task.status == 2">
          <div class="card-implementing status-size">
            {{ task.status_label }}
          </div>
          <div class="text-implementing">
            初选截止：剩余 {{ formNowFormatDay(task.end_at) }}天
            {{ formatDate(task.end_at, "(YYYY/MM/DD)") }}
          </div>
        </div>
        <div class="card-flex" v-if="task.status == 3">
          <div class="card-judging status-size"></div>
          <div class="text-finalized">------初选截止：已截稿------</div>
        </div>
        <div class="card-flex" v-if="task.status == 4">
          <div class="card-tendering status-size"></div>
          <div class="text-finalized">------初选截止：已截稿------</div>
        </div>
        <div class="card-flex" v-if="task.status == 1">
          <div class="card-finalized status-size"></div>
          <div class="text-finalized">------已截稿------</div>
        </div>
      </div>
    </div>
    <div class="card-foot">
      <div class="card-reward">
        悬赏金额
      </div>
      <div class="card-coin">
        <p class="card-price">¥{{ priceFormat(task.price) }}</p>
        <p class="card-go-detail">前往了解</p>
      </div>
      <div class="card-exp">
        <span>EXP</span>
        <span>{{ task.experience_point }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage";
import { formatDate, formNowFormatDay } from "utils/moment";
import { priceFormat } from "utils/function";

export default {
  name: "TaskCard",
  components: {
    TheLoadingImage
  },

  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate,
    formNowFormatDay,
    priceFormat
  }
};
</script>

<style lang="less" scoped>
.task-card {
  width: 380px;
  height: 562px;
  background-image: url("~images/task/task-card.svg");
  background-repeat: no-repeat;

  .card-level {
    position: relative;
    top: -56px;
    text-align: center;
  }

  .card-head {
    display: flex;
    position: relative;
    top: -41px;
    left: 22px;

    .card-title {
      width: 239px;
      height: 38px;
      line-height: 38px;
      padding: 0px 5px;
      text-align: center;
      font-weight: 500;
      font-size: 18px;
      color: black;
      background-image: url("~images/task/task-title-bg.svg");
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .card-time {
      width: 82px;
      height: 38px;
      margin-left: 15px;
      padding-top: 2px;
      text-align: center;
      color: black;
      font-weight: 600;
      font-size: 12px;
      background-image: url("~images/task/task-time-bg.svg");
    }
  }

  .card-body {
    position: relative;
    top: -21px;
    padding-left: 26px;

    .card-location {
      display: flex;
      justify-content: space-between;
      padding: 20px 5px 28px 25px;
      width: 336px;
      height: 32px;
      font-size: 12px;

      .card-layout {
        color: black;
      }
      .card-participation {
        color: #feb317;
      }
    }

    .card-status {
      display: flex;
      justify-content: space-between;
      padding: 0px 31px;
      font-size: 12px;
      font-weight: 600;

      .card-flex {
        display: flex;
      }

      .status-size {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 54px;
        height: 28px;
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

      .text-implementing {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 213px;
        color: #1bc100;
      }

      .text-finalized {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 213px;
        color: #7c7c7c;
      }
    }
  }

  .card-foot {
    width: 227px;
    margin: -7px auto;
    .card-reward {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 71px;
      height: 20px;
      margin: 0 auto;
      font-weight: 600;
      font-size: 12px;
      color: white;
      background-image: url("~images/task/reward.svg");
      background-repeat: no-repeat;
    }

    .card-coin {
      width: 233px;
      height: 53px;
      padding: 4px 0px 0px 66px;
      color: white;
      background-image: url("~images/task/coin.svg");
      background-repeat: no-repeat;
      font-weight: 600;
      font-size: 36px;
      cursor: pointer;
      &:hover {
        padding: 0px;
        font-size: 18px;
        background-image: url("~images/task/go-detail.svg");
        background-repeat: no-repeat;

        .card-price {
          visibility: hidden;
        }

        .card-go-detail {
          margin: -6px 80px;
          visibility: visible;
        }
      }
    }

    .card-go-detail {
      visibility: hidden;
    }

    .card-exp {
      display: flex;
      justify-content: space-between;
      width: 81px;
      height: 21px;
      margin: -2px auto;
      padding: 2px 9px;
      color: white;
      font-weight: 600;
      text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
      background-image: url("~images/task/exp.svg");
      background-repeat: no-repeat;
    }
  }
}
</style>
