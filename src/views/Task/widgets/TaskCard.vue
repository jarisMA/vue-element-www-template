<template>
  <div class="widget-task-card">
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
        <div class="card-flex">
          <div
            class="card-status__status"
            :class="'card-status-' + task.status"
          >
            {{ task.status_label }}
          </div>
          <div class="card-status__time">
            <template v-if="task.status == 2">
              <div class="card-status--green">
                初选截止：剩余 {{ formNowFormatDay(task.end_at) }}天
                {{ formatDate(task.end_at, "(YYYY/MM/DD)") }}
              </div>
              <div class="card-status--red" v-if="false">
                初选截止：剩余 {{ formNowFormatDay(task.end_at) }}天
                {{ formatDate(task.end_at, "(YYYY/MM/DD)") }}
              </div>
            </template>
          </div>
          div.
        </div>
        div.card
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
.widget-task-card {
  .card-level {
    display: flex;
    align-items: center;
    height: 30px;
    width: fit-content;
    padding: 0 4px;
    border-top: 2px solid #e9e9e9;
    border-bottom: 2px solid #e9e9e9;
    background-color: #ffffff;
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
}
</style>
