<template>
  <div class="edit-plan-container">
    <i class="el-icon-loading" />
    <iframe
      ref="iframe"
      class="iframe"
      :src="url"
      width="100%"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
import kujialeService from "@/global/service/kujiale";
export default {
  name: "EditPlan",
  data() {
    return {
      url: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let promiseArr = [];
      const routeName = this.$route.name;
      if (routeName === "EditPlan") {
        promiseArr.push(
          kujialeService.iframe(1, {
            designid: this.$route.params.designId
          })
        );
      } else {
        promiseArr.push(kujialeService.iframe(4));
      }
      Promise.all(promiseArr).then(([res]) => {
        this.url = res.url;
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable.less";

.edit-plan-container,
.iframe {
  width: 100vw;
  height: 100vh;
}
.edit-plan-container {
  position: relative;
  .el-icon-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 100px;
    color: @primaryColor;
    transform: translate(-50%, -50%);
  }
}
.iframe {
  position: relative;
  z-index: 1;
}
</style>
