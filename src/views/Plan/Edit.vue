<template>
  <div :class="['edit-plan-container', headerUnfold ? 'unfold' : '']">
    <i class="el-icon-loading"></i>
    <div class="iframe-wrapper">
      <iframe
        ref="iframe"
        class="iframe"
        :src="url"
        width="100%"
        frameborder="0"
      >
      </iframe>
    </div>
  </div>
</template>

<script>
import kujialeService from "service/kujiale";
import { goMy } from "utils/routes";
import { mapMutations, mapState } from "vuex";
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
  beforeDestroy() {
    this.updateHeaderUnfold(false);
  },
  computed: {
    ...mapState(["headerUnfold"])
  },
  methods: {
    ...mapMutations(["updateHeaderUnfold"]),
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
        this.listener();
      });
    },
    listener() {
      if (window.postMessage) {
        const callback = ev => {
          // console.log(ev);
          if (
            ev.origin === "http://www.kujiale.com" ||
            ev.origin === "http://yun.kujiale.com" ||
            ev.origin === "https://www.kujiale.com" ||
            ev.origin === "https://yun.kujiale.com"
          ) {
            const data =
              (ev.data && typeof ev.data !== "object" && JSON.parse(ev.data)) ||
              null;
            // if (data && data.action === "kjl_loaded") { // 监听是否加载完成
            // }
            if (data && data.action === "kjl_completed") {
              // 监听是否点击退出按钮
              this.exit();
            }
          }
        };
        if ("addEventListener" in document) {
          window.addEventListener("message", callback, false);
        } else if ("attachEvent" in document) {
          window.attachEvent("onmessage", callback);
        }
      }
    },
    exit() {
      goMy();
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable.less";

.edit-plan-container {
  width: 100vw;
  height: calc(100vh - 36px);
  transition: all 0.5s ease;
  &.unfold {
    height: calc(100vh - 72px);
  }
}
.iframe-wrapper {
  width: 100%;
  height: 100%;
}
.edit-plan-container {
  position: relative;
  .el-icon-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 42px;
    color: @primaryColor;
    transform: translate(-50%, -50%);
  }
}
.iframe {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
