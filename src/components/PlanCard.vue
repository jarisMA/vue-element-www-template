<template>
  <div class="plan-card" @click="itemClick">
    <div class="plan-card-top">
      <i class="el-icon-delete" v-if="canDelete" @click="deleteItem"></i>
      <the-loading-image
        class="image-wrapper"
        :width="theme === 'my' ? 200 : 258"
        :height="theme === 'my' ? 214 : 270"
        :url="detail.planPic || defaultCoverImg"
      />
    </div>
    <div :class="['plan-card-bottom', theme]">
      <div v-if="theme === 'my'" class="plan-name-wrapper">
        <h4 class="plan-name">
          {{ detail.name }}
        </h4>
        <i class="el-icon-edit" @click="editClick"></i>
      </div>
      <span class="house-type"
        >{{ parseInt(detail.srcArea) }}㎡ | {{ detail.specName }}</span
      >
      <div class="house-desc">
        <label class="house-address"
          ><i class="el-icon-location-outline"></i> {{ filterCity }}
          {{ detail.commName }}</label
        >
        <span v-if="theme === 'my'" class="plan-date">{{ date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage";
import defaultCoverImg from "images/planCover.png";

export default {
  name: "PlanCard",
  props: {
    detail: {
      type: Object,
      required: true
    },
    canDelete: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: ""
    }
  },
  components: {
    TheLoadingImage
  },
  data() {
    return {
      defaultCoverImg,
      filterCity: "",
      date: ""
    };
  },
  created() {
    const { city, created } = this.detail;
    this.filterCity = city;
    if (this.theme === "my") {
      let arr = city.split(" ");
      this.filterCity = arr.length > 1 ? arr[1] : arr[0];
      this.date =
        new Date(created).getMonth() + 1 + "-" + new Date(created).getDay();
    }
  },
  methods: {
    itemClick() {
      this.$emit("itemClick");
    },
    editClick(e) {
      this.$emit("editClick");
      e.stopPropagation();
    },
    deleteItem(e) {
      e.stopPropagation();
      this.$emit("delete");
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable.less";
@padding: 12px;
.plan-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 @padding;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    .plan-card-top {
      .el-icon-delete {
        display: inline;
      }
    }
  }
  .plan-card-top {
    position: relative;
    padding: @padding 0;
    width: 100%;
    height: 0;
    padding-top: calc(100% + @padding * 2);
    text-align: center;
    .el-icon-delete {
      position: absolute;
      padding: 4px;
      display: none;
      top: @padding;
      right: 0;
      color: @dangerColor;
      cursor: pointer;
      font-size: 16px;
      z-index: 2;
      background: #e6e6e6b3;
    }
    .image-wrapper {
      position: absolute;
      top: @padding;
      left: 0;
      width: 100%;
    }
  }
  .plan-card-bottom {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 11px 0 24px;
    border-top: 1px solid #e6e6e6;
    .plan-name-wrapper {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .plan-name {
        flex: 1;
        margin-bottom: 0;
      }
      .el-icon-edit {
        color: @primaryColor;
        font-weight: 700;
        cursor: pointer;
        &:hover {
          transform: scale(1.5);
        }
      }
    }
    .plan-name,
    .house-type {
      margin-bottom: 10px;
      width: 100%;
      height: 14px;
      line-height: 14px;
      font-weight: 500;
      font-size: 14px;
      color: #333;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .house-desc {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 12px;
      line-height: 12px;
      font-size: 12px;
      font-weight: 400;
      color: #ababab;
      .house-address {
        flex: 1;
        height: 18px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .plan-date {
        width: 37px;
        text-align: right;
      }
    }
    &.my {
      .house-type {
        margin-bottom: 8px;
        height: 12px;
        line-height: 12px;
        font-size: 12px;
        font-weight: 400;
        color: #ababab;
      }
    }
  }
}
</style>
