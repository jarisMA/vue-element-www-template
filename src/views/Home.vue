<template>
  <div class="home-page" v-loading="loading">
    <div class="banner-container">
      <div class="banner-section">
        <button class="apply">申请免费使用</button>
      </div>
    </div>
    <!-- 最新博文 -->
    <div class="article-container" v-if="false">
      <div class="article-section">
        <p class="article-title">最新博文</p>
        <div class="article-ima_list">
          <div class="swiper-container">
            <swiper class="swiper" ref="swiper" :options="swiperOption">
              <swiper-slide
                v-for="item in [1, 2, 3, 4, 5, 6, 7, 8]"
                :key="item"
              >
                <InspirationImageModule></InspirationImageModule>
              </swiper-slide>
              <div
                class="swiper-button-prev"
                slot="button-prev"
                @click="prev"
              ></div>
              <div
                class="swiper-button-next"
                slot="button-next"
                @click="next"
              ></div>
            </swiper>
          </div>
        </div>
      </div>
      <button class="look-article">
        <p class="look-article-text">查看更多</p>
        <img
          src="~@/assets/images/zxbw-ckgd-gd@2x.png"
          alt=""
          class="item-img"
        />
      </button>
    </div>

    <!-- 铁粉内测 -->
    <el-dialog
      :visible.sync="showFalse"
      width="416px"
      :show-close="false"
      center
    >
      <div class="closed-alpha_container">
        <div class="header">
          <p class="header-logo">PLAN GO</p>
          <img
            src="~@/assets/images/tc-qx@2x.png"
            alt=""
            class="header-cancel"
          />
        </div>
        <p class="title">铁粉内测阶段</p>
        <img src="~@/assets/images/tc-ewm@2x.png" alt="" class="image" />
        <p class="desc">想优先体验可微信扫码<br />添加工作人员邀请开通</p>
      </div>
    </el-dialog>

    <!-- 登陆扫码 -->
    <el-dialog
      :visible.sync="showFalse"
      width="416px"
      :show-close="false"
      center
    >
      <div class="wx-login_container">
        <div class="header">
          <img
            src="~@/assets/images/tc-qx@2x.png"
            alt=""
            class="header-cancel"
          />
        </div>
        <img src="~@/assets/images/tc-wdl-logo@2x.png" alt="" class="logo" />
        <p class="title">请用微信扫码登陆 / 注册</p>
        <img src="~@/assets/images/tc-ewm@2x.png" alt="" class="image" />
        <p class="desc">扫码后关注暖刻公众号，完成登录</p>
      </div>
    </el-dialog>

    <!-- 手机登陆 -->
    <el-dialog
      :visible.sync="showFalse"
      width="416px"
      :show-close="false"
      center
    >
      <div class="login_container">
        <div class="header">
          <img
            src="~@/assets/images/tc-qx@2x.png"
            alt=""
            class="header-cancel"
          />
        </div>
        <img src="~@/assets/images/tc-wdl-logo@2x.png" alt="" class="logo" />
        <div class="content">
          <p class="title">绑定手机</p>
          <el-form
            label-position="left"
            label-width="80px"
            :model="pohoneLogin"
          >
            <el-form-item>
              <el-input
                placeholder="请输入手机号"
                v-model="pohoneLogin.phone"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                placeholder="请输入6位短信验证码"
                v-model="pohoneLogin.code"
              ></el-input>
              <button :class="['code-get', pohoneLogin.Sent ? ' Sent' : '']">
                发送验证码
              </button>
            </el-form-item>
          </el-form>
          <div class="consent-button_section">
            <div
              :class="[
                'consent-button',
                pohoneLogin.consent ? ' consent_active' : ''
              ]"
            ></div>
            <div class="consent-title">
              同意<a>《服务协议》</a>和 <a>《隐私政策》</a>
            </div>
          </div>
          <button :class="['login-button', false ? 'login-active' : '']">
            完成
          </button>
        </div>
      </div>
    </el-dialog>

    <!-- 身份选择 -->
    <el-dialog
      :visible.sync="showFalse"
      width="416px"
      :show-close="false"
      center
    >
      <div class="identity-selector_container">
        <div class="header">
          <img
            src="~@/assets/images/home-logo.png"
            alt=""
            class="header-logo"
          />
        </div>
        <p class="title">请问您的身份是</p>
        <div class="content">
          <el-radio-group v-model="userInfo.selector">
            <div class="content-item">
              <el-radio-button label="家居爱好者"></el-radio-button>
            </div>
            <div class="content-item">
              <el-radio-button label="设计师"></el-radio-button>
            </div>
            <div class="content-item">
              <el-radio-button label="装修机构"></el-radio-button>
            </div>
          </el-radio-group>
        </div>
      </div>
    </el-dialog>

    <!-- 家居爱好者选择 -->
    <el-dialog
      :visible.sync="showFalse"
      width="416px"
      :show-close="false"
      center
    >
      <div class="home-decoration_container">
        <div class="header">
          <img
            src="~@/assets/images/tc-jjahz-fh@2x.png"
            alt=""
            class="header-logo"
          />
        </div>
        <p class="title">您的学习目的是</p>
        <div class="content">
          <div class="content-list">
            <div class="content-item content-item-active ">
              <div class="item-image diy"></div>
              <p class="item-title">学装修<br />DIY自己的家</p>
            </div>
            <div class="content-item ">
              <div class="item-image study"></div>
              <p class="item-title">想转行<br />成为设计师</p>
            </div>
          </div>
          <input class="home-decoration-input" placeholder="其他状况请写这里" />
        </div>
        <button class="home-decoration-button home-decoration-button-active">
          完成
        </button>
      </div>
    </el-dialog>

    <!-- 设计师选择 -->
    <el-dialog
      :visible.sync="showFalse"
      width="416px"
      :show-close="false"
      center
    >
      <div class="stylist_container">
        <div class="header">
          <img
            src="~@/assets/images/tc-jjahz-fh@2x.png"
            alt=""
            class="header-logo"
          />
        </div>
        <p class="title">您的学习目的是</p>
        <div class="content">
          <div class="content-list">
            <div class="content-item content-item-active ">
              <div class="item-image diy"></div>
              <p class="item-title">独立设计师</p>
            </div>
            <div class="content-item ">
              <div class="item-image study"></div>
              <p class="item-title">在职设计师</p>
            </div>
          </div>
          <input class="stylist-input" placeholder="其他状况请写这里" />
        </div>
        <button class="stylist-button stylist-button-active">确认</button>
      </div>
    </el-dialog>

    <!-- 装修机构 -->
    <el-dialog :visible.sync="show" width="416px" :show-close="false" center>
      <div class="decoration-company_container">
        <div class="header">
          <img
            src="~@/assets/images/tc-jjahz-fh@2x.png"
            alt=""
            class="header-logo"
          />
        </div>
        <p class="title">您的学习目的是</p>
        <div class="content">
          <div class="content-list">
            <div class="content-item content-item-active ">
              <div class="item-image diy"></div>
              <p class="item-title">纯设计工作室</p>
            </div>
            <div class="content-item ">
              <div class="item-image study"></div>
              <p class="item-title">装修公司</p>
            </div>
          </div>
          <input
            class="decoration-company-input"
            placeholder="其他状况请写这里"
          />
        </div>
        <button
          class="decoration-company-button decoration-company-button-active"
        >
          确认
        </button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import InspirationImageModule from "./../components/InspirationImageModule";

export default {
  name: "Home",
  data() {
    return {
      userInfo: {
        selector: ""
      },
      pohoneLogin: {
        code: null,
        phone: null,
        consent: false,
        Sent: false
      },
      showFalse: false,
      show: false,
      loading: false,
      swiperOption: {
        loop: true,
        initialSlide: 2,
        centeredSlides: true,
        slidesPerView: "auto",
        spaceBetween: 30,
        direction: "horizontal",
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  created() {},
  methods: {
    prev() {
      this.$refs.swiper.$swiper.slidePrev();
    },
    next() {
      this.$refs.swiper.$swiper.slideNext();
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    InspirationImageModule
  },
  directives: {
    swiper: directive
  }
};
</script>

<style type="text/css" lang="less" scoped>
.home-page {
  height: 900px;
  background: #f4f6f3;
  .banner-container {
    background: url("./../assets/images/Lark20200828-191144.png") no-repeat
      center;
    background-size: cover;
    width: 100%;
    height: 900px;
    text-align: center;
    .banner-section {
      position: relative;
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      .apply {
        position: absolute;
        left: 20px;
        bottom: 200px;
        background-color: #14af64;
        width: 280px;
        height: 64px;
        outline: none;
        border: none;
        font-size: 24px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #ffffff;
        &:hover {
          transition: all 0.2s;
          box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);
          cursor: pointer;
        }
      }
    }
  }
  .article-container {
    text-align: center;
    .article-section {
      background-color: #fff;
      text-align: center;
      height: 348px;
      position: relative;
      .article-title {
        display: inline-block;
        margin: 0 auto;
        padding: 100px 0 106px 0;
        font-size: 28px;
        font-family: Noto Sans S Chinese;
        font-weight: 500;
        line-height: 28px;
        color: #000000;
        position: relative;
        &:after {
          content: "";
          display: inline-block;
          height: 2px;
          width: 224px;
          background-color: #000;
          position: absolute;
          top: 50%;
          right: -276px;
        }
        &:before {
          content: "";
          display: inline-block;
          height: 2px;
          width: 224px;
          background-color: #000;
          position: absolute;
          top: 50%;
          left: -276px;
        }
      }
      .article-ima_list {
        position: absolute;
        bottom: -299px;
        left: 0;
        height: 413px;
        width: 100%;
        .swiper-container {
          width: 100%;
          height: 100%;
          --swiper-theme-color: #ff6600; /* 设置Swiper风格 */
          --swiper-navigation-color: #fff; /* 单独设置按钮颜色 */
          --swiper-navigation-size: 30px; /* 设置按钮大小 */
          .swiper-button-prev,
          .swiper-button-next {
            height: 100%;
            width: 160px;
            background: rgba(191, 191, 191, 0.61);
            top: 0;
            bottom: 0;
            margin-top: 0;
          }
          .swiper-button-prev {
            &:after {
              content: "";
              display: inline-block;
              background: url("./../assets/images/zxbw-gd-z@2x.png") no-repeat
                center;
              background-size: cover;
              width: 100px;
              height: 100px;
            }
            left: 0;
          }
          .swiper-button-next {
            &:after {
              content: "";
              display: inline-block;
              background: url("./../assets/images/zxbw-gd-y@2x.png") no-repeat
                center;
              background-size: cover;
              width: 100px;
              height: 100px;
            }
            right: 0;
          }
          .swiper {
            display: flex;
            .swiper-slide {
              height: 100%;
              width: 380px !important;
            }
          }
        }
      }
    }
    .look-article {
      width: 130px;
      height: 42px;
      outline: none;
      border: none;
      font-size: 16px;
      font-family: Noto Sans S Chinese;
      font-weight: 500;
      line-height: 16px;
      color: #ffffff;
      background-color: #14af64;
      margin: 393px 0 135px 0;
      &:hover {
        transition: all 0.2s;
        box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.3);
        cursor: pointer;
      }
      .look-article-text {
        display: inline-block;
      }
      .item-img {
        width: 16px;
        height: 16px;
        display: inline-block;
        vertical-align: bottom;
        margin-left: 10px;
      }
    }
  }
}
/deep/ .el-dialog .el-dialog__header {
  display: none;
}
/deep/ .el-dialog .el-dialog__body {
  padding: 0;
}
.login_container /deep/ .el-form-item__content {
  margin-left: 0 !important;
  display: flex;
  .el-input,
  .el-input__inner {
    background: #f4f4f4 !important;
    border: none;
  }
}
.closed-alpha_container {
  text-align: center;
  .header {
    display: flex;
    justify-content: space-between;
    .header-logo {
      font-size: 16px;
      font-family: Noto Sans S Chinese;
      font-weight: bold;
      color: #14af64;
      margin: 30px 30px 0;
    }
    .header-cancel {
      width: 30px;
      height: 30px;
      margin: 10px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .title {
    font-size: 34px;
    font-family: Noto Sans S Chinese;
    font-weight: bold;
    color: #14af64;
    margin: 46px auto 55px;
  }
  .image {
    width: 220px;
    height: 220px;
  }
  .desc {
    font-size: 20px;
    font-family: Noto Sans S Chinese;
    font-weight: 400;
    line-height: 34px;
    color: #363636;
    margin: 27px auto 0;
    padding-bottom: 80px;
  }
}
.wx-login_container {
  text-align: center;
  .header {
    text-align: right;
    .header-cancel {
      width: 30px;
      height: 30px;
      margin: 10px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .logo {
    width: 100px;
    height: 82.65px;
    margin: 29px auto;
  }
  .title {
    margin-bottom: 22px;
    font-size: 22px;
    font-family: Noto Sans S Chinese;
    color: #5f5f5f;
  }
  .image {
    width: 220px;
    height: 220px;
  }
  .desc {
    margin: 24px auto 0;
    padding-bottom: 81px;
    font-size: 20px;
    font-family: Noto Sans S Chinese;
    color: #5f5f5f;
  }
}
.login_container {
  text-align: center;
  .header {
    text-align: right;
    .header-cancel {
      width: 30px;
      height: 30px;
      margin: 10px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .logo {
    width: 100px;
    height: 82.65px;
    margin: 29px auto 39px;
  }
  .content {
    padding: 0 45px;
    .title {
      text-align: left;
      font-size: 16px;
      font-family: Noto Sans S Chinese;
      font-weight: 400;
      color: #000000;
      margin-bottom: 21px;
    }
    .code-get {
      display: inline-block;
      width: 110px;
      height: 42px;
      background: #14af64;
      border-radius: 2px;
      outline: none;
      margin-left: 10px;
      font-size: 12px;
      font-family: Noto Sans S Chinese;
      font-weight: 400;
      line-height: 20px;
      color: #ffffff;
      border: none;
      &:hover {
        cursor: pointer;
      }
    }
    .Sent {
      background-color: #999999;
    }
    .consent-button_section {
      display: flex;
      align-items: center;
      .consent-button {
        width: 16px;
        height: 16px;
        background: #ffffff;
        border: 1px solid #c6c6c6;
        border-radius: 50%;
        margin-right: 8px;
        &:hover {
          cursor: pointer;
        }
      }
      .consent_active {
        background-color: #14af64;
      }
      .consent-title {
        display: flex;
        font-size: 12px;
        font-family: Noto Sans S Chinese;
        color: #878787;
        a {
          text-decoration: none;
          color: #14af64;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .login-button {
      width: 200px;
      height: 40px;
      background: #999999;
      margin: 102px auto 63px;
      border: none;
      font-size: 20px;
      font-family: Noto Sans S Chinese;
      font-weight: 500;
      color: #ffffff;
      outline: none;
      border: none;
      &:hover {
        box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
        cursor: pointer;
      }
    }
    .login-active {
      background: #14af64;
    }
  }
}
.identity-selector_container {
  text-align: center;
  .header {
    text-align: left;
    .header-logo {
      width: 114px;
      height: 26px;
      margin: 30px 30px 0;
    }
  }
  .title {
    font-size: 26px;
    font-family: Noto Sans S Chinese;
    color: #000000;
    margin: 74px auto 62px;
  }
  .content {
    width: 326px;
    text-align: center;
    margin: 0 auto;
    padding-bottom: 74px;
    /deep/ .el-radio-group {
      width: 100%;
      .content-item {
        width: 100%;
        margin-bottom: 40px;
        .el-radio-button,
        .el-radio-button__orig-radio,
        .el-radio-button__inner {
          width: 100% !important;
          font-size: 16px;
          font-family: Noto Sans S Chinese;
          color: #999999;
        }
      }
      .is-active .el-radio-button__inner {
        background: #14af64;
        color: #fff;
      }
    }
  }
}
.home-decoration_container {
  text-align: center;
  .header {
    text-align: left;
    .header-logo {
      width: 30px;
      height: 30px;
      margin: 25px 25px 0;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .title {
    margin: 55px auto 45px;
    font-size: 26px;
    font-family: Noto Sans S Chinese;
    color: #000000;
  }
  .content {
    .content-list {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 22px;
      .content-item {
        width: 164px;
        height: 167px;
        border: 1px solid rgba(125, 125, 125, 0.6);
        margin: 0 5.5px;
        text-align: center;
        &:hover {
          cursor: pointer;
        }
        .diy {
          width: 108px;
          height: 108px;
          background: url("./../assets/images/tc-jjahz-diy-wxz@2x.png")
            no-repeat center;
          background-size: cover;
          margin: 0 auto;
        }
        .study {
          width: 108px;
          height: 108px;
          background: url("./../assets/images/tc-jjahz-sjs-wxz@2x.png")
            no-repeat center;
          background-size: cover;
          margin: 0 auto;
        }
        .item-title {
          margin-top: 6px;
          font-size: 14px;
          font-family: Noto Sans S Chinese;
          color: #999999;
        }
      }
      .content-item-active {
        border: 1px solid #14af64;
        .diy {
          background: url("./../assets/images/tc-jjahz-diy-xz@2x.png") no-repeat
            center;
        }
        .study {
          background: url("./../assets/images/tc-jjahz-sjs-xz@2x.png") no-repeat
            center;
        }
        .item-title {
          color: #14af64;
        }
      }
    }
    .home-decoration-input {
      width: 339px;
      height: 50px;
      background: #f4f4f4;
      outline: none;
      border: none;
      padding-left: 28px;
      font-size: 14px;
      font-family: Noto Sans S Chinese;
      color: #999999;
      border-radius: 2px;
      margin-bottom: 39px;
    }
  }
  .home-decoration-button {
    width: 200px;
    height: 40px;
    background: #999999;
    font-size: 20px;
    font-family: Noto Sans S Chinese;
    font-weight: 500;
    color: #ffffff;
    border: none;
    outline: none;
    margin-bottom: 63px;
    &:hover {
      box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }
  }
  .home-decoration-button-active {
    background: #14af64;
  }
}
.stylist_container {
  text-align: center;
  .header {
    text-align: left;
    .header-logo {
      width: 30px;
      height: 30px;
      margin: 25px 25px 0;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .title {
    margin: 55px auto 45px;
    font-size: 26px;
    font-family: Noto Sans S Chinese;
    color: #000000;
  }
  .content {
    .content-list {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 22px;
      .content-item {
        width: 164px;
        height: 167px;
        border: 1px solid rgba(125, 125, 125, 0.6);
        margin: 0 5.5px;
        text-align: center;
        padding-top: 19px;
        &:hover {
          cursor: pointer;
        }
        .diy {
          width: 108px;
          height: 108px;
          background: url("./../assets/images/tc-jjahz-sjs-wxz@2x.png")
            no-repeat center;
          background-size: cover;
          margin: 0 auto;
        }
        .study {
          width: 108px;
          height: 108px;
          background: url("./../assets/images/tc-sjs-zz-wxz@2x.png") no-repeat
            center;
          background-size: cover;
          margin: 0 auto;
        }
        .item-title {
          font-size: 14px;
          font-family: Noto Sans S Chinese;
          color: #999999;
          margin-top: 10px;
        }
      }
      .content-item-active {
        border: 1px solid #14af64;
        .diy {
          background: url("./../assets/images/tc-jjahz-sjs-xz@2x.png") no-repeat
            center;
        }
        .study {
          background: url("./../assets/images/tc-sjs-zz-xz@2x.png") no-repeat
            center;
        }
        .item-title {
          color: #14af64;
        }
      }
    }
    .stylist-input {
      width: 339px;
      height: 50px;
      background: #f4f4f4;
      outline: none;
      border: none;
      padding-left: 28px;
      font-size: 14px;
      font-family: Noto Sans S Chinese;
      color: #999999;
      border-radius: 2px;
      margin-bottom: 39px;
    }
  }
  .stylist-button {
    width: 200px;
    height: 40px;
    background: #999999;
    font-size: 20px;
    font-family: Noto Sans S Chinese;
    font-weight: 500;
    color: #ffffff;
    border: none;
    outline: none;
    margin-bottom: 63px;
    &:hover {
      box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }
  }
  .stylist-button-active {
    background: #14af64;
  }
}
.decoration-company_container {
  text-align: center;
  .header {
    text-align: left;
    .header-logo {
      width: 30px;
      height: 30px;
      margin: 25px 25px 0;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .title {
    margin: 55px auto 45px;
    font-size: 26px;
    font-family: Noto Sans S Chinese;
    color: #000000;
  }
  .content {
    .content-list {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 22px;
      .content-item {
        width: 164px;
        height: 167px;
        border: 1px solid rgba(125, 125, 125, 0.6);
        margin: 0 5.5px;
        text-align: center;
        padding-top: 19px;
        &:hover {
          cursor: pointer;
        }
        .diy {
          width: 108px;
          height: 108px;
          background: url("./../assets/images/tc-zxjg-sj-wxz@2x.png") no-repeat
            center;
          background-size: cover;
          margin: 0 auto;
        }
        .study {
          width: 108px;
          height: 108px;
          background: url("./../assets/images/tc-zxjg-zx-wxz@2x.png") no-repeat
            center;
          background-size: cover;
          margin: 0 auto;
        }
        .item-title {
          font-size: 14px;
          font-family: Noto Sans S Chinese;
          color: #999999;
          margin-top: 10px;
        }
      }
      .content-item-active {
        border: 1px solid #14af64;
        .diy {
          background: url("./../assets/images/tc-zxjg-sj-xz@2x.png") no-repeat
            center;
        }
        .study {
          background: url("./../assets/images/tc-zxjg-zx-wxz@2x.png") no-repeat
            center;
        }
        .item-title {
          color: #14af64;
        }
      }
    }
    .decoration-company-input {
      width: 339px;
      height: 50px;
      background: #f4f4f4;
      outline: none;
      border: none;
      padding-left: 28px;
      font-size: 14px;
      font-family: Noto Sans S Chinese;
      color: #999999;
      border-radius: 2px;
      margin-bottom: 39px;
    }
  }
  .decoration-company-button {
    width: 200px;
    height: 40px;
    background: #999999;
    font-size: 20px;
    font-family: Noto Sans S Chinese;
    font-weight: 500;
    color: #ffffff;
    border: none;
    outline: none;
    margin-bottom: 63px;
    &:hover {
      box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
      cursor: pointer;
    }
  }
  .decoration-company-button-active {
    background: #14af64;
  }
}
</style>
