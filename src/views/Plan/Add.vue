<template>
  <div class="add-plan-container container-1200">
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="搜户型" name="first">
        <search-floor-plan />
      </el-tab-pane>
      <el-tab-pane label="自己画" name="second" disabled>
        自己画
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SearchFloorPlan from "./widgets/SearchFloorPlan";

export default {
  name: "AddPlan",
  components: {
    SearchFloorPlan
  },
  data() {
    return {
      activeName: "first"
    };
  }
};
</script>

<style lang="less" scoped>
.add-plan-container {
  padding: 20px 0;
  /deep/ .el-tabs {
    .el-tabs__nav-scroll {
      display: flex;
      justify-content: center;
    }
    .el-tabs__active-bar {
      display: none;
    }
    .el-tabs__item {
      position: relative;
      padding: 0 20px !important;
      &::after {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        content: "";
        height: 2px;
        background: gray;
      }
    }
    .el-tabs__nav-wrap::after {
      width: 0 !important;
    }
  }
  .iframe-container {
    width: 100%;
    height: calc(100vh - 120px - 114px);
    iframe {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
