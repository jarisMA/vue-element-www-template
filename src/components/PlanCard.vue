<template>
  <div class="plan-card" @click="itemClick">
    <div class="plan-card-top">
      <i class="el-icon-delete" v-if="canDelete" @click="deleteItem"></i>
      <img :src="detail.planPic" :alt="detail.commName" />
    </div>
    <div :class="['plan-card-bottom', theme]">
      <h4 v-if="theme === 'my'" class="plan-name">{{ detail.name }}</h4>
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
  data() {
    return {
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
    deleteItem(e) {
      e.stopPropagation();
      this.$emit("delete");
    }
  }
};
</script>

<style lang="less" scoped>
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
      // &::after {
      //   position: absolute;
      //   top: 0;
      //   left: -@padding;
      //   width: calc(100% + @padding * 2);
      //   height: 100%;
      //   content: "";
      //   z-index: 1;
      //   background: #0000004d;
      // }
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
      display: none;
      // top: 50%;
      // left: 50%;
      // transform: translate(-50%, -50%);
      top: @padding;
      right: 0;
      color: red;
      cursor: pointer;
      font-size: 12px;
      z-index: 2;
    }
    img {
      position: absolute;
      top: @padding;
      left: 0;
      width: 100%;
      object-fit: cover;
      background: #f7f7f7;
    }
  }
  .plan-card-bottom {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 11px 0 24px;
    border-top: 1px solid #e6e6e6;
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
