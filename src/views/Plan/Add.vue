<template>
  <div class="add-plan-container">
    <el-tabs v-model="activeName">
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
  width: 100%;
  background: #fff;
  padding: 25px 0 0;
  /deep/ .el-tabs {
    .el-tabs__nav-scroll {
      display: flex;
      justify-content: center;
    }
    .el-tabs__active-bar {
      // display: none;
    }
    .el-tabs__item {
      position: relative;
      padding: 0 20px !important;
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
