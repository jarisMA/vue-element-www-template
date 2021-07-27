<template>
  <div class="widget-info-people">
    <div class="widget-title">
      基础情况
    </div>
    <div class="widget-content">
      <div class="people-list">
        <div class="people-item" v-for="people in peopleInfo" :key="people.id">
          <span class="people-tag"
            ><span class="people-tag__wrap">{{
              people.frequence_id == 1 ? "常" : "偶"
            }}</span></span
          >
          <span class="people-name">{{ people.name }}</span>
          <span class="item-description">{{ people.description }}</span>
        </div>
      </div>
      <div class="favor-container">
        <div class="favor-item">
          <div class="favor-title">业主期待/核心诉求</div>
          <div class="item-description">{{ favorInfo.expectation }}</div>
        </div>
        <div class="favor-item">
          <div class="favor-title">柜体形式喜好</div>
          <div class="item-description">
            {{
              CABINET_FAVOR.filter(d => d.id == favorInfo.cabinet_favor_id)[0]
                .name
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  CABINET_FAVOR,
  TASK_TYPE,
  TASK_BID_TYPE,
  TASK_STATUS
} from "../common";

export default {
  name: "WidgetDetailInfo",
  props: {
    peopleInfo: {
      type: Array,
      default: () => []
    },
    favorInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      CABINET_FAVOR,
      TASK_TYPE,
      TASK_BID_TYPE,
      TASK_STATUS
    };
  }
};
</script>
<style lang="less" scoped>
.widget-info-people {
  padding-left: 5px;
  padding-right: 5px;
}
.widget-title {
  height: 48px;
  line-height: 48px;
  font-weight: 500;
  font-size: 14px;
  color: #000000;
}
.item-description {
  width: 610px;
  padding: 12px 11px 12px 30px;
  line-height: 17px;
  font-size: 12px;
  text-align: justify;
  color: #656565;
}
.people-list {
  .people-item {
    display: flex;
    border-top: 1px solid #e4e4e4;
    .people-tag {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 15px;
      border-right: 1px solid #e4e4e4;
      .people-tag__wrap {
        display: inline-block;
        width: 24px;
        height: 24px;
        background-color: #14af64;
        color: #101010;
        font-weight: 500;
        line-height: 24px;
        text-align: center;
      }
    }
    .people-name {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      width: 100px;
      padding: 0 4px;
      overflow: hidden;
      border-right: 1px solid #e4e4e4;
      color: #656565;
    }
  }
}
.favor-container {
  .favor-item {
    display: flex;
    border-top: 1px solid #e4e4e4;
    .favor-title {
      display: flex;
      align-items: center;
      width: 155px;
      padding-left: 15px;
      border-right: 1px solid #e4e4e4;
      color: #14af64;
      font-size: 12px;
      line-height: 17px;
    }
  }
}
</style>
