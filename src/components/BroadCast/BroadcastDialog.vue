<template>
  <el-dialog
    :show-close="false"
    :visible="visible"
    width="700px"
    height="640px"
  >
    <div class="broadcast-container">
      <div class="title">
        公告
      </div>
      <div class="content">
        <p class="greeting">
          {{ greeting }}
        </p>
        <p class="passage">{{ passage1 }}</p>
        <p class="passage">{{ passage2 }}</p>
        <p class="passage">{{ passage3 }}</p>
        <p class="signature">{{ signature }}</p>
        <p class="date">{{ date }}</p>
      </div>
      <div
        :class="[countDown > 0 ? 'disabled' : 'confirm']"
        @click="handleVisible"
      >
        我已阅读并知情
        <span v-if="countDown > 0">({{ countDown }}s)</span>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "BroadcastDialog",
  data() {
    return {
      visible: false,
      countDown: 5,
      greeting: "亲爱的同学们:",
      passage1:
        "近期，我们发现有个别同学将其账号出售或出租给他人使用，造成未授权的用户访问平台，该行为既违反了法律的规定，也增加了平台此阶段的运营负担。为了保障平台的正常运行和广大学员的合法利益，从即日起，平台将采取相应的技术手段，对非法售卖的账号进行识别和封号处理，已支付的相关费用亦不予退还。",
      passage2:
        "请各位学员妥善保存好自己的账号和密码，防止被他人非法使用。如果您发现您的账号被他人盗用，请立即与我们联系并说明情况，我们将协助您采取相应的措施或重新对您的账号进行设置。",
      passage3:
        " 恳请广大学员能够遵守法律，合法合理使用自己的账号进行学习，共同营造良好的学习环境，感谢各位学员的配合与支持。",
      signature: "斗西家计划",
      date: "2021年7月15日",
    };
  },

  created() {
    this.init();
  },
  methods: {
    init() {
      let visible = !window.localStorage.getItem("20210715_broadcast");
      if (visible) {
        this.visible = visible;
        this.handleCountDown();
      }
    },
    handleCountDown() {
      let clock = window.setInterval(() => {
        this.countDown--;
        if (this.countDown <= 0) {
          clearInterval(clock);
        }
      }, 1000);
    },
    handleVisible() {
      this.visible = false;
      window.localStorage.setItem("20210715_broadcast", Date.now());
    },
  },
};
</script>

<style lang="less" scoped>
.broadcast-container {
  position: relative;
  width: 700px;
  height: 640px;
  padding: 90px;
  .title {
    position: absolute;
    line-height: 60px;
    left: 50%;
    transform: translateX(-50%) translateY(-185%);
    width: 232px;
    height: 66px;
    font-weight: 600;
    font-size: 36px;
    text-align: center;
    color: white;
    background-image: url("~images/broadcast/title.svg");
  }
  .content {
    line-height: 28px;
    font-size: 16px;
    font-weight: 400;
    color: #2c3330;

    .greeting {
      font-weight: 600;
    }

    .passage {
      margin-top: 15px;
      text-indent: 2em;
    }
    .signature {
      margin-top: 15px;
      text-align: right;
    }
    .date {
      text-align: right;
    }
  }

  .confirm,
  .disabled {
    position: absolute;
    line-height: 42px;
    left: 50%;
    transform: translateX(-50%) translateY(100%);
    width: 186px;
    height: 48px;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    color: white;
    background-image: url("~images/broadcast/confirm.svg");
    cursor: pointer;

    &.disabled {
      background-image: url("~images/broadcast/disabled.svg");
    }

    &:active {
      transform: translateX(-50%) translateY(125%);
      height: 42px;
      background-image: url("~images/broadcast/pressed.svg");
    }
  }
}

/deep/ .el-dialog {
  margin-top: 0px !important;
  background: transparent;
  box-shadow: unset;
  .el-dialog__body {
    margin-top: 50% !important;
    transform: translateY(-19%) !important;
    padding: 0px;
    background: transparent;
    background-image: url("~images/broadcast/bg.svg");
  }
}

/deep/ .el-dialog__header {
  display: none;
}
</style>
