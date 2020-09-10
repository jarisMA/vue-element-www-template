<template>
  <div class="login_container">
    <div class="header">
      <img
        src="~@/assets/images/close_logo.svg"
        alt=""
        class="header-cancel"
        @click="show"
      />
    </div>
    <img src="~@/assets/images/logo_2.svg" alt="" class="logo" />
    <div class="content">
      <p class="title">绑定手机</p>
      <el-form
        label-position="left"
        label-width="80px"
        :model="pohoneLogin"
        :rules="phoneRef"
        ref="phoneRefs"
      >
        <el-form-item prop="phone">
          <el-input
            placeholder="请输入手机号"
            v-model="pohoneLogin.phone"
            @input="getInput"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            placeholder="请输入4位短信验证码"
            v-model="pohoneLogin.code"
            @input="GetcodeInput"
          ></el-input>
          <button
            type="button"
            @click="getCode"
            :class="['code-get', pohoneLogin.Sent ? ' Sent' : '']"
          >
            <span v-if="codeTime == 60">发送验证码</span>
            <span v-if="codeTime !== 60">{{ codeTime }}秒<br />可再次获取</span>
          </button>
        </el-form-item>
      </el-form>
      <div class="consent-button_section">
        <div
          @click="phoenConsent"
          :class="[
            'consent-button',
            pohoneLogin.consent ? ' consent_active' : ''
          ]"
        ></div>
        <div class="consent-title">
          同意
          <router-link tag="a" target="_blank" :to="{ name: 'Protocol' }">
            《服务协议》
          </router-link>
          和
          <router-link tag="a" target="_blank" :to="{ name: 'Protocol' }">
            《隐私政策》
          </router-link>
        </div>
      </div>
      <button
        type="button"
        :class="[
          'login-button',
          loginButton && pohoneLogin.consent ? 'login-active' : ''
        ]"
        @click="verify"
      >
        完成
      </button>
    </div>
  </div>
</template>
<script>
import smsService from "./../../globals/service/sms.js";

export default {
  data() {
    return {
      codeTime: 60,
      loginButton: false,
      codeKey: null,
      Sent: true,
      pohoneLogin: {
        phone: null,
        code: null,
        Sent: false,
        consent: false
      },
      phoneRef: {
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { pattern: /^\d{4}$/, message: "请输入正确验证码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    show() {
      this.$store.commit("DEL_DIALOG_SHOW");
    },
    verify() {
      if (!this.pohoneLogin.consent) {
        return this.$message({
          message: "请先同意《服务协议》和《隐私政策》",
          type: "warning"
        });
      }
      if (!this.codeKey) {
        return this.$message({
          message: "请先获取验证短信",
          type: "warning"
        });
      }
      this.$refs.phoneRefs.validate(valid => {
        if (valid) {
          const { unionid, avatar_url, sex, name } = this.$store.state.userInfo;
          smsService
            .bindingPhone({
              verification_key: this.codeKey,
              verification_code: this.pohoneLogin.code,
              phone_number: this.pohoneLogin.phone,
              unionid,
              nickname: name,
              avatar_url,
              gender: sex
            })
            .then(res => {
              this.$store.commit("SET_PHONE_CODE_KEY", {
                codeKey: this.codeKey,
                code: this.pohoneLogin.code,
                phone: this.pohoneLogin.phone
              });
              if (res.token && res.userInfo.avatar_url) {
                this.$store.commit("SET_WC_USER", res.userInfo);
                return this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", 4);
              }

              this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", 3);
            })
            .catch(err => {
              if (err.error_code == 1) {
                this.codeKey = null;
                this.pohoneLogin = {
                  phone: null,
                  code: null,
                  Sent: false,
                  consent: false
                };
              }
            });
        }
      });
    },
    GetcodeInput(value) {
      let reg = /^\d{4}$/;
      if (reg.test(value) && this.pohoneLogin.phone) {
        this.loginButton = true;
      } else {
        this.loginButton = false;
      }
      if (!/^1[3456789]\d{9}$/.test(this.pohoneLogin.phone)) {
        this.pohoneLogin.code = null;
        this.loginButton = false;
        return this.$message({
          message: "请填入正确的手机号码",
          type: "warning"
        });
      }
    },
    getCode() {
      if (this.pohoneLogin.Sent) {
        smsService
          .smsRegisterCode({ phone_number: this.pohoneLogin.phone })
          .then(res => {
            this.codeKey = res.key;
          });
        this.pohoneLogin.Sent = false;
        this.codeTime = 60;
        var myVar = setInterval(() => {
          this.codeTime -= 1;
        }, 1000);
        setTimeout(() => {
          this.Sent = true;
          this.pohoneLogin.Sent = true;
          clearInterval(myVar);
          this.codeTime = 60;
        }, 60000);
      }
    },
    getInput(value) {
      let reg = /^1[3456789]\d{9}$/;
      if (reg.test(value) && this.Sent) {
        this.Sent = false;
        this.pohoneLogin.Sent = true;
      }
    },
    phoenConsent() {
      this.pohoneLogin.consent = !this.pohoneLogin.consent;
    }
  }
};
</script>
<style lang="less" scoped>
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
    height: 83px;
    margin: 29px auto 39px;
  }
  .content {
    padding: 0 45px;
    .title {
      text-align: left;
      font-size: 16px;
      font-weight: 400;
      color: #000000;
      margin-bottom: 21px;
    }
    /deep/.el-input {
      border: 1px solid #000 !important;
      border-radius: 2px !important;
    }
    .code-get {
      display: inline-block;
      width: 110px;
      height: 42px;
      background-color: #999999;
      border-radius: 2px;
      outline: none;
      margin-left: 10px;
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;
      color: #ffffff;
      border: 1px solid #000 !important;
      &:hover {
        cursor: not-allowed;
      }
    }
    .Sent {
      background: #14af64;
      &:hover {
        cursor: pointer;
      }
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
        background: url("./../../assets/images/buttom_5-1-bg.svg") no-repeat
          center;
        background-size: cover;
        padding: none;
        border: #000;
      }
      .consent-title {
        display: flex;
        font-size: 12px;
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
      width: 206px;
      height: 46px;
      margin: 102px auto 63px;
      font-size: 20px;
      font-weight: 500;
      color: #ffffff;
      outline: none;
      border: none;
      background: url("./../../assets/images/buttom_4-1-bg.svg") no-repeat
        center;
      border: none;
      outline: none;
      padding: 0 4px 4px 0;
      &:hover {
        filter: drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.3));
        cursor: not-allowed;
        outline: none;
      }
    }
    .login-active {
      background: url("./../../assets/images/buttom_4-2-bg.svg") no-repeat
        center;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
