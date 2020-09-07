<template>
  <div>
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
            src="~@/assets/images/close_logo.svg"
            alt=""
            class="header-cancel"
          />
        </div>
        <p class="title">铁粉内测阶段</p>
        <img src="~@/assets/images/wx-QR_code.svg" alt="" class="image" />
        <p class="desc">想优先体验可微信扫码<br />添加工作人员邀请开通</p>
      </div>
    </el-dialog>

    <!-- 登录扫码 -->
    <el-dialog
      :visible.sync="showFalse"
      width="416px"
      :show-close="false"
      center
    >
      <div class="wx-login_container">
        <div class="header">
          <img
            src="~@/assets/images/close_logo.svg"
            alt=""
            class="header-cancel"
          />
        </div>
        <img src="~@/assets/images/logo_2.svg" alt="" class="logo" />
        <p class="title">请用微信扫码登录 / 注册</p>
        <img src="~@/assets/images/wx-QR_code.svg" alt="" class="image" />
        <p class="desc">扫码后关注暖刻公众号，完成登录</p>
      </div>
    </el-dialog>

    <!-- 手机登录 -->
    <el-dialog
      :visible.sync="showFalse"
      width="416px"
      :show-close="false"
      center
    >
      <div class="login_container">
        <div class="header">
          <img
            src="~@/assets/images/close_logo.svg"
            alt=""
            class="header-cancel"
          />
        </div>
        <img src="~@/assets/images/logo_2.svg" alt="" class="logo" />
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
          <img src="~@/assets/images/logo_1.svg" alt="" class="header-logo" />
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
            src="~@/assets/images/return_logo.png"
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
            src="~@/assets/images/return_logo.png"
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
            src="~@/assets/images/return_logo.png"
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

<script type="text/javascript">
export default {
  prop: {},
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
      showFalse: true,
      show: false
    };
  },
  created() {},
  methods: {}
};
</script>

<style type="text/css" lang="less" scoped>
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
          background: url("~@/assets/images/profession_3-1.svg") no-repeat
            center;
          background-size: cover;
          margin: 0 auto;
        }
        .study {
          width: 108px;
          height: 108px;
          background: url("~@/assets/images/profession_1-1.svg") no-repeat
            center;
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
          background: url("~@/assets/images/profession_3-2.svg") no-repeat
            center;
        }
        .study {
          background: url("~@/assets/images/dldlsjs-xz.svg") no-repeat center;
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
          background: url("~@/assets/images/profession_1-1.svg") no-repeat
            center;
          background-size: cover;
          margin: 0 auto;
        }
        .study {
          width: 108px;
          height: 108px;
          background: url("~@/assets/images/profession_5-1.svg") no-repeat
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
          background: url("~@/assets/images/dldlsjs-xz.svg") no-repeat center;
        }
        .study {
          background: url("~@/assets/images/zzdldlsjs-xz.svg") no-repeat center;
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
          background: url("~@/assets/images/profession_2-1.svg") no-repeat
            center;
          background-size: cover;
          margin: 0 auto;
        }
        .study {
          width: 108px;
          height: 108px;
          background: url("~@/assets/images/profession_4-1.svg") no-repeat
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
          background: url("~@/assets/images/profession_2-2.svg") no-repeat
            center;
        }
        .study {
          background: url("~@/assets/images/profession_4-1.svg") no-repeat
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
