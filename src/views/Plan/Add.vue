<template>
  <div class="add-plan-container container-1200">
    <el-tabs v-model="activeName">
      <el-tab-pane label="搜户型" name="first">
        <search-floor-plan />
      </el-tab-pane>
      <el-tab-pane label="自己画" name="second">
        自己画
        <!-- <div class="iframe-container">
          <iframe :src="paintingUrl"
                  frameborder="0"></iframe>
        </div> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SearchFloorPlan from "./widgets/SearchFloorPlan";
import kujialeService from "@/global/service/kujiale";

export default {
  name: "AddPlan",
  components: {
    SearchFloorPlan
  },
  data() {
    return {
      activeName: "first",
      paintingUrl: null
    };
  },
  created() {
    this.painting();
  },
  methods: {
    painting() {
      kujialeService.iframe(4).then(res => {
        this.paintingUrl = res.url;
      });
    }
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
}
</style>
