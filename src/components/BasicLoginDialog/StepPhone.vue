<template>
  <!-- 手机登陆 -->
  <div class="login_container">
    <div class="header">
      <img
        src="~@/assets/images/tc-qx@2x.png"
        alt=""
        class="header-cancel"
        @click="show"
      />
    </div>
    <img src="~@/assets/images/tc-wdl-logo@2x.png" alt="" class="logo" />
    <div class="content">
      <p class="title">绑定手机</p>
      <el-form
        label-position="left"
        label-width="80px"
        :model="pohoneLogin"
        :rules="phoneRef"
        ref="phoneRef"
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
          同意<a>《服务协议》</a>和 <a>《隐私政策》</a>
        </div>
      </div>
      <button
        type="button"
        :class="['login-button', loginButton ? 'login-active' : '']"
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
          { max_age: 11, validator: /^1[3456789]\d{9}$/, trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { max_age: 4, validator: /^\d{4}$/, trigger: "blur" }
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
      this.$refs.phoneRef.validate(valid => {
        if (valid) {
          smsService
            .smsVerify({
              verification_key: this.codeKey,
              verification_code: this.pohoneLogin.code,
              phone_number: this.pohoneLogin.phone
            })
            .then(() => {
              this.$store.commit("SET_PHONE_CODE_KEY", {
                codeKey: this.codeKey,
                code: this.pohoneLogin.code,
                phone: this.pohoneLogin.phone
              });
              this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", 3);
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
        }, 6000);
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
      background-color: #999999;
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
      background: #14af64;
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
        border-color: #14af64;
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
</style>
