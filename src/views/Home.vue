<template>
  <div class="home-page" v-loading="loading">
    <div class="img-wrapper">
      <div class="main-img-wrapper">
        <img class="main-img" src="~images/home.png" />
        <img class="douxi-gif" src="~images/douxi.gif" />
      </div>
    </div>
    <div class="enter-btn">
      <img src="~images/enter.png" @click="enterClass" />
    </div>
  </div>
</template>

<script>
import { goTerm } from "utils/routes";
import { mapState } from "vuex";
import termService from "service/term";
import douxiGif from "images/douxi2.gif";

export default {
  name: "Home",
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    enterClass() {
      if (this.userInfo) {
        termService.checkTerm().then(res => {
          if (res.status === 0) {
            goTerm(process.env.VUE_APP_TERM_ID);
          } else {
            this.$msgBox.showMsgBox({
              width: 400,
              height: 200,
              img: douxiGif,
              content:
                "<p style='color:#14AF64FF;'>抱歉，你好像并没有报名噢…</p>",
              confirmBtnText: "",
              confirmBtnIcon: "correct",
              showCancelBtn: false
            });
          }
        });
      } else {
        this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", 1);
      }
    }
  }
};
</script>

<style type="text/css" lang="less" scoped>
.home-page {
  .img-wrapper {
    position: relative;
    width: 100%;
    &::after {
      position: absolute;
      left: 0;
      bottom: 0;
      content: "";
      width: 100%;
      height: 233px;
      background: #d8efe4ff;
      border-bottom: 6px solid #000;
    }
  }
  .main-img-wrapper {
    position: relative;
    margin: 83px auto 61px;
    width: 772px;
    height: 594px;
    background: #fafafa;
    z-index: 1;
    &::before {
      position: absolute;
      left: 0;
      bottom: 0;
      content: "";
      width: 227px;
      height: 233px;
      background: #d8efe4ff;
      border-bottom: 6px solid #000;
      border-right: 6px solid #000;
      border-bottom-right-radius: 6px;
    }
    &::after {
      position: absolute;
      right: -1px;
      bottom: 0;
      content: "";
      width: 227px;
      height: 233px;
      background: #d8efe4ff;
      border-bottom: 6px solid #000;
      border-left: 6px solid #000;
      border-bottom-left-radius: 6px;
    }
    .main-img {
      width: 100%;
      height: 100%;
    }
    .douxi-gif {
      position: absolute;
      bottom: 65px;
      right: 229px;
      height: 300px;
    }
  }
  .enter-btn {
    margin: auto;
    width: 308px;
    height: 98px;
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
}
</style>
