<template>
  <div
    :class="['plan-card', theme, activeIndex === detail.planId ? 'active' : '']"
    @click="itemClick"
  >
    <div :class="['plan-card-top', theme]">
      <!-- <i class="el-icon-delete" v-if="canDelete" @click="deleteItem"></i> -->
      <the-loading-image
        class="image-wrapper"
        :width="theme === 'my' ? 200 : theme === 'homework' ? 150 : 258"
        :height="theme === 'my' ? 200 : theme === 'homework' ? 150 : 258"
        :url="detail.planPic || defaultCoverImg"
      />
    </div>
    <div :class="['plan-card-bottom', theme]">
      <div
        v-if="theme === 'my' || theme === 'homework'"
        class="plan-name-wrapper"
      >
        <h4 class="plan-name">
          {{ detail.name }}
        </h4>
        <!-- <i class="el-icon-edit"
           @click="editClick"
           v-if="theme === 'my'"></i> -->
        <el-dropdown class="dropdown-wrapper" v-if="theme === 'my'">
          <i class="el-icon-more" @click.stop></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="copyClick">复制</el-dropdown-item>
            <el-dropdown-item @click.native="editClick">编辑</el-dropdown-item>
            <el-dropdown-item @click.native="deleteItem" v-if="canDelete"
              >删除</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <span class="house-type"
        >{{ parseInt(detail.srcArea) }}㎡ | {{ detail.specName }}</span
      >
      <div class="house-desc" v-if="theme !== 'homework'">
        <label class="house-address">
          <icon-svg class="location-icon" svg-name="location"></icon-svg
          >{{ filterCity }}
          {{ detail.commName }}
        </label>
      </div>
      <span v-if="theme === 'my'" class="plan-date">{{ date }}</span>
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
    },
    activeIndex: {
      type: [String, Number],
      default: null
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
        new Date(created).getFullYear() +
        "-" +
        (new Date(created).getMonth() + 1) +
        "-" +
        new Date(created).getDate();
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
    copyClick(e) {
      this.$emit("copyClick");
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
@import "~styles/variable";
@padding: 12px;
@homeworkPadding: 10px;
.plan-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  cursor: pointer;
  &.homework {
    height: 224px;
  }
  &.active {
    position: relative;
    border: 2px solid @primaryColor;
    &::after {
      position: absolute;
      top: -10px;
      right: -10px;
      width: 20px;
      height: 20px;
      content: "";
      background: url("~images/active.svg");
      background-size: cover;
    }
  }
  &:hover {
    box-shadow: 0px 0px 12px 0px #cccccc;
    .plan-card-top {
      .el-icon-delete {
        display: inline;
      }
    }
  }
  .plan-card-top {
    position: relative;
    padding: @padding;
    width: 100%;
    height: 282px;
    text-align: center;
    &.my {
      height: 224px;
    }
    &.homework {
      height: 170px;
      padding: @homeworkPadding;
    }
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
      left: @padding;
      width: 100%;
      height: 100%;
    }
  }
  .plan-card-bottom {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 5px @padding 10px;
    border-top: 1px solid #e6e6e6;
    &.homework {
      padding: 10px 10px;
    }
    .plan-name-wrapper {
      display: flex;
      align-items: center;
      .plan-name {
        flex: 1;
      }
      .el-icon-edit {
        color: @primaryColor;
        font-weight: 700;
        cursor: pointer;
        &:hover {
          transform: scale(1.5);
        }
      }
      .dropdown-wrapper {
        .el-icon-more {
          padding: 4px;
          color: @primaryColor;
          cursor: pointer;
          font-size: 16px;
        }
      }
    }
    .plan-name,
    .house-type {
      margin-bottom: 6px;
      width: 100%;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      font-weight: 500;
      color: #333;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .house-desc {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 16px;
      line-height: 16px;
      font-size: 12px;
      font-weight: 400;
      color: #ababab;
      .house-address {
        width: 100%;
        height: 18px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .plan-date {
      display: inline-block;
      margin-top: 8px;
      width: 100%;
      height: 16px;
      line-height: 16px;
      font-size: 12px;
      font-weight: 400;
      text-align: right;
      color: #ababab;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &.my,
    &.homework {
      .house-type {
        margin-bottom: 6px;
        width: 100%;
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        font-weight: 400;
        color: #ababab;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    &.homework {
      .plan-name,
      .house-type {
        margin: 0;
        height: 18px;
        line-height: 18px;
        font-size: 12px;
        text-shadow: 0px 0px 12px #cccccc;
      }
      .house-type {
        height: 13px;
        line-height: 13px;
      }
    }
  }
}
</style>
