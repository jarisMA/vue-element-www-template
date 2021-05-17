<template>
  <div class="profile container-580">
    <div class="form-wrapper">
      <label class="form-label">头像</label>
      <div class="avatar-wrapper">
        <div class="avatar">
          <the-avatar
            :size="80"
            :url="form.avatar_url"
            v-loading="uploadingAvatar"
          ></the-avatar>
          <el-upload
            ref="upload"
            class="avatar-upload"
            action=""
            accept="image/*"
            :before-upload="uploadAvatar"
            >更换头像</el-upload
          >
        </div>

        <span class="avatar-tips">只能上传JPG/PNG格式文件，且不超过2MB</span>
      </div>
      <el-form
        ref="form"
        class="form"
        :model="form"
        :rules="formRules"
        hide-required-asterisk
        @submit.native.prevent
      >
        <el-form-item label="昵称" prop="nickname">
          <el-input
            v-model="form.nickname"
            placeholder="请设置你的昵称"
          ></el-input>
        </el-form-item>
        <div class="inline-item">
          <el-form-item label="手机号">
            <div class="phone-wrapper">
              <el-input
                class="phone-input"
                v-model="userInfo.phone"
                disabled
              ></el-input>
              <el-button
                class="phone-btn"
                type="plain"
                @click="phoneVisible = true"
                >更改手机号</el-button
              >
            </div>
          </el-form-item>
        </div>
        <div class="flex">
          <el-form-item class="flex-1" label="性别" prop="gender">
            <el-select class="w-280" v-model="form.gender" placeholder="请选择">
              <el-option
                v-for="item in GENDER"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="flex-1" label="身份" prop="identity">
            <el-select
              class="w-280"
              v-model="form.identity"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, key) of IDENTITY"
                :key="key"
                :label="item"
                :value="key"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="学习目的" prop="remark">
          <el-input
            v-model="form.remark"
            placeholder="请输入学习目的"
          ></el-input>
        </el-form-item>
        <el-form-item label="个人介绍" prop="introduction">
          <el-input
            type="textarea"
            v-model="form.introduction"
            placeholder="介绍一下自己"
            maxlength="100"
            show-word-limit
            resize="none"
          ></el-input>
        </el-form-item>
        <el-form-item align="right">
          <el-button
            class="submit-btn"
            type="primary"
            :loading="btnLoading"
            @click="save"
            >保存更改</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      class="phoneDialog"
      width="400px"
      title="更改手机号"
      :visible.sync="phoneVisible"
      :before-close="beforeClosePhoneDialog"
    >
      <el-form
        size="small"
        :model="phoneForm"
        :rules="phoneFormRules"
        ref="phoneForm"
        label-width="80px"
        class="phoneForm"
        @submit.native.prevent
      >
        <el-form-item label="手机号">
          <el-input type="text" v-model="userInfo.phone" disabled></el-input>
        </el-form-item>
        <el-form-item label="新手机号" prop="phone">
          <el-input
            type="text"
            v-model="phoneForm.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input type="text" v-model="phoneForm.code" autocomplete="off">
            <el-button
              slot="append"
              @click="
                sendRequesting && sendPhoneCountDown > 0
                  ? null
                  : sendVerifyCode()
              "
            >
              {{
                sendRequesting && sendPhoneCountDown > 0
                  ? `${sendPhoneCountDown}s`
                  : "发送验证码"
              }}
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item class="phoneConfirmBtn">
          <el-button
            type="primary"
            size="medium"
            :loading="phoneRequesting"
            @click="submitPhoneForm"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { GENDER, IDENTITY } from "utils/const";
import { mapMutations, mapState } from "vuex";
import TheAvatar from "components/TheAvatar";
import ossService from "service/oss";
import smsService from "service/sms";
import userService from "service/user";

export default {
  name: "MyProfile",
  components: {
    TheAvatar
  },
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    const validateRePhone = (rule, value, callback) => {
      if (value === this.userInfo.phone) {
        callback(new Error("新手机号不能与之前的手机号相同"));
      }
      callback();
    };
    return {
      GENDER,
      IDENTITY,
      btnLoading: false,
      uploadingAvatar: false,
      phoneVisible: false,
      phoneForm: {
        phone: "",
        code: "",
        key: ""
      },
      phoneFormRules: {
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          },
          {
            validator: validateRePhone
          }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { pattern: /^\d{4}$/, message: "请输入正确验证码", trigger: "blur" }
        ]
      },
      sendRequesting: false,
      sendPhoneCountDown: 0,
      phoneRequesting: false,
      form: {
        nickname: "",
        gender: "",
        identity: "",
        remark: "",
        introduction: "",
        avatar_url: ""
      },
      formRules: {
        nickname: [{ required: true, message: "昵称不能为空" }],
        gender: [{ required: true, message: "性别不能为空" }],
        identity: [{ required: true, message: "身份不能为空" }],
        remark: [{ required: true, message: "标注不能为空" }]
      }
    };
  },
  created() {
    const {
      nickname,
      gender,
      identity,
      remark,
      introduction,
      avatar_url
    } = this.userInfo;
    this.form = {
      nickname,
      gender,
      identity: identity ? identity + "" : "",
      remark,
      introduction,
      avatar_url
    };
    this.$emit("update:loading", false);
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapMutations(["USERINFO"]),
    uploadAvatar(file) {
      this.uploadingAvatar = true;
      ossService.upload(
        {
          file,
          space: "avatar",
          folder: "avatar"
        },
        res => {
          this.form.avatar_url = res.url;
        },
        () => {
          this.$notice({
            type: "danger",
            title: "上传头像失败"
          });
        },
        () => {
          this.$refs.upload.clearFiles();
          this.uploadingAvatar = false;
        }
      );
      return false;
    },
    save() {
      this.$refs["form"].validate(res => {
        if (res) {
          if (this.uploadingAvatar) {
            return this.$notice({
              type: "warning",
              title: "等待头像上传成功..."
            });
          }
          this.btnLoading = true;
          userService
            .updateUserInfo(this.form)
            .then(() => {
              this.$notice({
                type: "success",
                title: "保存成功"
              });
              this.USERINFO({ ...this.userInfo, ...this.form });
            })
            .finally(() => {
              this.btnLoading = false;
            });
        }
      });
    },
    sendVerifyCode() {
      this.$refs.phoneForm.validateField("phone", err => {
        if (!err) {
          const { phone } = this.phoneForm;
          this.sendRequesting = true;
          smsService
            .smsRegisterCode({ phone })
            .then(res => {
              this.countDown(60);
              this.phoneForm.key = res.key;
            })
            .catch(() => {
              this.sendRequesting = false;
            });
        }
      });
    },
    countDown(time = 60) {
      this.sendPhoneCountDown = time;
      const timer = setInterval(() => {
        --this.sendPhoneCountDown;
        if (this.sendPhoneCountDown <= 0) {
          this.sendRequesting = false;
          clearInterval(timer);
        }
      }, 1000);
    },
    submitPhoneForm() {
      this.$refs.phoneForm.validate(res => {
        if (res) {
          const { phone, code, key } = this.phoneForm;
          if (!key) {
            this.$notice({
              type: "warning",
              title: "请先发送验证码"
            });
            return;
          }
          this.phoneRequesting = true;
          smsService
            .smsBindPhone({
              key,
              code,
              phone
            })
            .then(() => {
              this.$notice({
                type: "success",
                title: "手机号更改成功！"
              });
              this.$store.commit("UPDATA_PHONE", phone);
              this.phoneVisible = false;
              this.sendPhoneCountDown = 0;
              this.$refs.phoneForm.resetFields();
            })
            .finally(() => {
              this.phoneRequesting = false;
            });
        }
      });
    },
    beforeClosePhoneDialog(done) {
      this.$refs.phoneForm.resetFields();
      done();
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
.profile {
  height: 100%;
  .form-label {
    display: block;
    margin-bottom: 8px;
    line-height: 24px;
    font-size: 14px;
    color: #606c66;
  }
  .flex {
    display: flex;
    .flex-1 {
      flex: 1;
      & + .flex-1 {
        margin-left: 20px;
      }
    }
  }
  .w-280 {
    width: 280px;
  }
  .avatar-wrapper {
    display: flex;
    align-items: center;
    .avatar {
      position: relative;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      cursor: pointer;
      &:hover {
        /deep/ .avatar-upload {
          display: inline-block;
        }
      }
    }
    /deep/ .avatar-upload {
      display: none;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 30px;
      background: rgba(0, 0, 0, 0.9);
      overflow: hidden;
      text-align: center;
      .el-upload--text {
        line-height: 30px;
        font-weight: 500;
        font-size: 12px;
        color: #fff !important;
      }
    }
    .avatar-tips {
      display: inline-block;
      margin-left: 24px;
      line-height: 16px;
      font-size: 12px;
      color: #8ea098;
    }
  }
  /deep/ .form {
    margin-top: 32px;
    .el-form-item {
      margin-bottom: 32px;
    }
    .el-form-item__label {
      margin-bottom: 8px;
      line-height: 24px;
      font-size: 14px;
      color: #606c66;
    }
    .el-input__inner,
    .el-textarea__inner {
      padding: 8px 10px;
      border: 1px solid #efefef;
    }
    .el-textarea__inner {
      min-height: 88px !important;
    }
    .el-textarea {
      .el-input__count {
        line-height: 1;
        bottom: 8px;
      }
    }
    .el-input.is-disabled {
      .el-input__inner {
        background: #f4f4f4;
        border: 1px solid #efefef;
      }
    }
    .phone-wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      .phone-input {
        flex: 1;
        width: 5px;
      }
      .phone-btn {
        flex: none;
        margin-left: 8px;
        padding: 8px 37px;
        color: @primaryColor;
        line-height: 24px;
        font-weight: 500;
        font-size: 14px;
        border: 1px solid #efefef;
      }
    }
    .submit-btn {
      width: 146px;
      height: 40px;
      padding: 0;
      border: 1px solid #efefef;
      span {
        line-height: 40px;
        font-weight: 500;
        font-size: 14px;
        color: #fff;
      }
    }
  }
}
</style>
