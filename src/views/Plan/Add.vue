<template>
  <div class="add-plan-container">
    <el-tabs
      v-model="activeName"
      @tab-click="handleTabClick"
      @click.native="handleTabClick"
    >
      <el-tab-pane label="搜户型" name="first">
        <search-floor-plan />
      </el-tab-pane>
      <el-tab-pane label="自己画" name="second" disabled> </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SearchFloorPlan from "./widgets/SearchFloorPlan";
import { goDrawPlan } from "utils/routes";
export default {
  name: "AddPlan",
  components: {
    SearchFloorPlan
  },
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleTabClick(e) {
      if (e.target.id === "tab-second") {
        goDrawPlan();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.add-plan-container {
  width: 100%;
  background: #fff !important;
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
    .el-tabs__item.is-disabled {
      color: #303133;
      cursor: pointer;
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
