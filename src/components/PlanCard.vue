<template>
  <div
    :class="['plan-card', theme, activeIndex === detail.planId ? 'active' : '']"
    @click="itemClick"
  >
    <div :class="['plan-card-top', theme]">
      <!-- <i class="el-icon-delete" v-if="canDelete" @click="deleteItem"></i> -->
      <the-loading-image
        class="image-wrapper"
        :width="theme === 'my' ? 245 : theme === 'homework' ? 150 : 258"
        :height="theme === 'my' ? 245 : theme === 'homework' ? 150 : 258"
        :url="detail.planPic || defaultCoverImg"
      />
    </div>
    <div :class="['plan-card-bottom', theme]">
      <div
        v-if="theme === 'my' || theme === 'homework'"
        class="plan-name-wrapper"
      >
        <span class="plan-name">
          {{ detail.name }}
        </span>
        <!-- <i class="el-icon-edit"
           @click="editClick"
           v-if="theme === 'my'"></i> -->
        <el-dropdown class="dropdown-wrapper" v-if="theme === 'my'">
          <i class="el-icon-more" @click.stop></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="isVip()" @click.native="copyClick"
              >复制</el-dropdown-item
            >
            <el-dropdown-item @click.native="editClick">编辑</el-dropdown-item>
            <el-dropdown-item @click.native="deleteItem" v-if="canDelete"
              >删除</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="house-type-wrapper">
        <img src="~images/plan/area.svg" class="house-type-img" alt="" />
        <span class="house-type"> {{ parseInt(detail.srcArea) }}㎡ </span>
        <img src="~images/plan/structure.svg" class="house-type-img" alt="" />
        <span class="house-type">{{ detail.specName }}</span>
      </div>

      <div class="house-desc" v-if="theme !== 'homework'">
        <div class="house-address-wrapper">
          <img
            src="~images/plan/location.svg"
            class="house-type-img_address"
            alt=""
          />
          <span class="house-address">
            {{ filterCity }} · {{ detail.commName }}
          </span>
        </div>
        <span v-if="theme === 'my'" class="plan-date">{{ date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage";
import defaultCoverImg from "images/planCover.png";
import { isVip } from "utils/function";

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
    isVip,
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
  padding-top: 8px;
  width: 261px;
  border: 1px solid #efefef;
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
    text-align: center;
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
  }
  .plan-card-bottom {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0px 8px 17px 8px;
    &.homework {
      padding: 10px 10px;
    }
    .plan-name {
      flex: 1;
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
      color: #2c3330;
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
    .plan-name-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  &.my,
  &.homework {
    .house-desc {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 38px 2px 0 2px;
      .house-address-wrapper {
        display: flex;
        align-items: center;
      }
      .house-address {
        display: inline-block;
        padding-left: 2px;
        line-height: 12px;
        font-size: 12px;
        color: #81948b;
      }
      .plan-date {
        display: inline-block;
        font-size: 12px;
        line-height: 12px;
        color: #81948b;
      }
    }
    .house-type-wrapper {
      display: flex;
      align-items: center;
      margin: 10px 2px 0 2px;
    }
    .house-type {
      display: inline-block;
      padding-left: 2px;
      padding-right: 13.5px;
      font-size: 12px;
      line-height: 12px;
      color: #81948b;
      .house-type-img {
        display: inline-block;
        width: 16px;
        height: 16px;
      }
      .house-type-img-address {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-bottom: 2px;
      }
    }
  }
}
</style>
