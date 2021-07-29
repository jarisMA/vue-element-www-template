<template>
  <div class="widget-info">
    <div class="widget-content">
      <template v-if="tab == 'peopleInfo'">
        <div class="widget-title">
          基础情况
        </div>
        <div class="people-container">
          <div class="people-list">
            <div
              class="people-item"
              v-for="people in peopleInfo"
              :key="people.id"
            >
              <span class="people-tag"
                ><span class="people-tag__wrap">{{
                  people.frequence_id == 1 ? "常" : "偶"
                }}</span></span
              >
              <span class="people-name">{{ people.name }}</span>
              <span class="item-description">{{ people.description }}</span>
            </div>
          </div>
          <div class="favor-list">
            <div class="favor-item">
              <div class="favor-title">业主期待/核心诉求</div>
              <div class="item-description">{{ favorInfo.expectation }}</div>
            </div>
            <div class="favor-item">
              <div class="favor-title">柜体形式喜好</div>
              <div class="item-description">
                {{
                  CABINET_FAVOR.filter(
                    d => d.id == favorInfo.cabinet_favor_id
                  )[0].name
                }}
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="tab == 'houseInfo'">
        <div class="widget-title">
          基础情况
        </div>
        <div class="house-container">
          <div
            class="grid-item house-item"
            :class="{ 'flex-basis': item.type == 'input' }"
            v-for="(item, houseIndex) in houseInfo"
            :key="houseIndex"
          >
            <div class="item__title">{{ item.name }}</div>
            <div class="item__value" v-if="item.type == 'select' && item.value">
              {{ item.options.filter(d => d.id == item.value)[0].name }}
            </div>
            <div class="item__value" v-if="item.type == 'input' && item.value">
              {{ item.value }}
            </div>
          </div>
        </div>
      </template>
      <template v-if="tab == 'spaceInfo'">
        <div class="space-container">
          <div class="space-tab__nav">
            <div
              :class="[activeIndex == index ? 'active' : '']"
              class="space-tab__nav-item"
              v-for="(space, index) in newSpaceInfo"
              :key="space.id"
              @click="activeIndex = index"
            >
              {{ space.display_name || space.name }}
            </div>
          </div>
          <div class="space-tab-body">
            <template v-for="(space, spaceIndex) in newSpaceInfo">
              <div
                class="tab-body__content"
                :key="spaceIndex"
                v-show="spaceIndex == activeIndex"
              >
                <template v-for="(spaceItem, spaceItemIndex) in space.children">
                  <div
                    :key="spaceItemIndex"
                    class="grid-item"
                    :class="{ 'flex-basis': spaceItem.type == 'input' }"
                  >
                    <div class="item__title">{{ spaceItem.name }}</div>
                    <div class="item__value">
                      {{ spaceItem.select_value }}
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </div>
      </template>
      <template v-if="tab == 'attachmentInfo'">
        <div class="attachment-container">
          <div
            class="attachment-item"
            v-for="(attachment, attachmentIndex) in attachmentInfo"
            :key="attachmentIndex"
          >
            <i class="attachment-item__icon"></i>
            <div class="attachment-item__name">{{ attachment.name }}</div>
            <a
              :href="attachment.url"
              :download="attachment.name"
              class="attachment-item__download"
              >下载</a
            >
          </div>
        </div>
      </template>
      <template v-if="tab == 'supplementInfo'">
        <div class="supplement-container">
          <div
            v-if="supplementInfo.content"
            v-html="supplementInfo.content"
            class="homework-card supplement-content"
          ></div>
          <div
            class="supplement-attachment"
            v-if="supplementInfo && supplementInfo.attachment_files"
          >
            <div class="attachment-container__title">附件</div>
            <div
              class="attachment-item"
              v-for="(attachment, attachmentIndex) in attachmentInfo"
              :key="attachmentIndex"
            >
              <i class="attachment-item__icon"></i>
              <div class="attachment-item__name">{{ attachment.name }}</div>
              <a
                :href="attachment.url"
                :download="attachment.name"
                class="attachment-item__download"
                >下载</a
              >
            </div>
          </div>
        </div>
      </template>
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
    tab: {
      type: String,
      default: "peopleInfo"
    },
    peopleInfo: {
      type: Array,
      default: () => []
    },
    favorInfo: {
      type: Object,
      default: () => {}
    },
    houseInfo: {
      type: Array,
      default: () => []
    },
    spaceInfo: {
      type: Array,
      default: () => []
    },
    attachmentInfo: {
      type: Array,
      default: () => []
    },
    supplementInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      CABINET_FAVOR,
      TASK_TYPE,
      TASK_BID_TYPE,
      TASK_STATUS,
      activeIndex: 0
    };
  },
  computed: {
    newSpaceInfo() {
      const result = this.spaceInfo.map(space => {
        return {
          display_name: space.display_name,
          id: space.id,
          name: space.name,
          children: space.children.map(spaceItem => {
            let select_value = "";
            if (spaceItem.type == "select") {
              const temArr = [];
              spaceItem.options.forEach(opt => {
                if (spaceItem.multiple) {
                  spaceItem.value.forEach(val => {
                    if (val == opt.id) {
                      temArr.push(opt.name);
                    }
                  });
                } else {
                  if (spaceItem.value == opt.id) {
                    temArr.push(opt.name);
                  }
                }
              });
              select_value = temArr.join("、");
            } else if (spaceItem.type == "input") {
              select_value = spaceItem.value;
            }
            return {
              id: spaceItem.id,
              name: spaceItem.name,
              type: spaceItem.type,
              select_value
            };
          })
        };
      });
      return result;
    }
  }
};
</script>
<style lang="less" scoped>
.widget-info {
  padding-left: 6px;
  padding-right: 6px;
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
.grid-item {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-self: stretch;
  padding: 18px 5px;
  width: 191px;
  background-color: #f4f4f4;
  text-align: center;
  font-size: 12px;
  line-height: 17px;
  .item__title {
    margin-bottom: 4px;
    font-weight: 600;
    font-size: 12px;
    line-height: 17px;
    color: #14af64;
  }
  .item__value {
    color: #878787;
  }
}
.people-container {
  padding-bottom: 6px;
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
  .favor-list {
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
}
.house-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 25px;
  font-size: 12px;
  line-height: 17px;
  .house-item {
    &.flex-basis {
      flex-basis: 50%;
      border-right: 1px solid #e4e4e4;
      &:first-child {
        border-right: 1px solid #e4e4e4;
      }
    }
    &:nth-child(n + 5):nth-child(-n + 8) {
      background-color: #ececec;
    }
    &:nth-last-child(-n + 2) {
      background-color: #ececec;
    }
    &:last-child {
      border-right: none;
    }
    &:nth-child(-n + 2) {
      border-right: 1px solid #e4e4e4;
    }
    &:nth-child(n + 5):nth-child(-n + 6) {
      border-right: 1px solid #e4e4e4;
    }
    &:nth-child(n + 9):nth-child(-n + 10) {
      border-right: 1px solid #e4e4e4;
    }
  }
}
.space-container {
  padding: 17px 0 25px;
  .space-tab__nav {
    display: flex;
    overflow: scroll;
    .space-tab__nav-item {
      width: 72px;
      height: 27px;
      padding: 0 5px 5px 5px;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      color: #a5a5a5;
      transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        border 0.2s ease-out;
      &.active {
        font-weight: 500;
        color: #434343;
        border-bottom: 2px solid #14af64;
      }
    }
  }
  .tab-body__content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-top: 1px solid #a5a5a5;
    .grid-item {
      border-right: 1px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
      &:nth-child(2n) {
        background-color: #ececec;
      }
      &.flex-basis {
        flex-basis: 50%;
      }
    }
  }
}
.supplement-attachment,
.attachment-container {
  padding: 10px 0;
  .attachment-container__title {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #000000;
    margin-bottom: 10px;
  }
  .attachment-item {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 38px 0 27px;
    margin-bottom: 6px;
    background-color: #f4f4f4;
    line-height: 40px;
    .attachment-item__icon {
      width: 26px;
      height: 30px;
      background: url("~images/task/file-icon.svg") no-repeat;
      background-size: 26px 30px;
    }
    .attachment-item__name {
      flex: 1;
      padding: 0 17px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 14px;
      line-height: 20px;
      color: #000000;
    }
    .attachment-item__download {
      display: inline-block;
      font-size: 14px;
      line-height: 20px;
      text-decoration-line: underline;
      color: #14af64;
    }
  }
}
.supplement-container {
  padding: 17px 0;
  .supplement-content {
    background-color: #fafafa;
    padding: 10px;
  }
  .supplement-attachment {
    .attachment-item {
      background-color: #fafafa;
    }
  }
}
</style>
