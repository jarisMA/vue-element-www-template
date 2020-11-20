<template>
  <div class="plan-card">
    <div class="plan-card-top">
      <img :src="detail.planPic" :alt="detail.commName" />
    </div>
    <div class="plan-card-bottom">
      <span class="house-type"
        >{{ detail.srcArea }}㎡ {{ detail.specName }}</span
      >
      <label class="house-address"
        ><i class="el-icon-location-outline"></i> {{ detail.city }}
        {{ detail.commName }}</label
      >
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
    }
  }
};
</script>

<style lang="less" scoped>
.plan-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: calc(100% - 20px);
  border: 1px solid gray;
  box-shadow: 2px 2px gray;
  cursor: pointer;
  .plan-card-top {
    width: 100%;
    height: 200px;
    text-align: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .plan-card-bottom {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    line-height: 20px;
    border-top: 1px solid gray;
    .house-type {
      font-weight: bold;
    }
    .house-address {
      width: 100%;
      height: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
