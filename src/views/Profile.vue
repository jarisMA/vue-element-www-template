<template>
  <div class="profile-container">
    <div class="container-1200">
      <div class="form-wrapper">
        <div class="avatar-wrapper">
          <el-avatar
            :size="80"
            :src="form.avatar_url"
            v-loading="uploadingAvatar"
          ></el-avatar>
          <div class="user-info">
            <el-tooltip
              v-if="userInfo && userInfo.kujiale_type === 1"
              popper-class="vip-popper"
              effect="light"
              content="您已是尊柜会员啦！"
              placement="bottom"
              :visible-arrow="false"
            >
              <img class="user-icon" src="~images/vip.png" />
            </el-tooltip>
            <el-tooltip
              v-else
              popper-class="vip-popper"
              effect="light"
              content="您仍旧是一棵浮木……"
              placement="bottom"
            >
              <img class="user-icon" src="~images/user.png" />
            </el-tooltip>

            <div class="upload-avatar-wrapper">
              <el-upload
                ref="upload"
                class="upload"
                action=""
                accept="image/*"
                :before-upload="uploadAvatar"
              >
                <div class="upload-avatar">
                  <icon-svg
                    svg-class="replace-icon"
                    svg-name="replace"
                  ></icon-svg>
                  <span>替换头像</span>
                </div>
                <label class="upload-tips">
                  只能上传JPG/PNG/JPEG格式文件，且不超过2MB
                </label>
              </el-upload>
            </div>
          </div>
        </div>

        <el-form
          ref="form"
          class="form"
          :model="form"
          :rules="formRules"
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
              <el-input v-model="userInfo.phone" disabled></el-input>
            </el-form-item>
            <el-form-item class="phone-change-button">
              <el-button
                type="primary"
                size="small"
                @click="phoneVisible = true"
                >更改手机号</el-button
              >
            </el-form-item>
          </div>
          <div class="inline-item">
            <el-form-item label="性别" prop="gender">
              <el-select v-model="form.gender" placeholder="请选择">
                <el-option
                  v-for="item in GENDER"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="身份" prop="identity">
              <el-select v-model="form.identity" placeholder="请选择">
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
            <el-input v-model="form.remark" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="个人介绍" prop="introduction">
            <el-input
              type="textarea"
              v-model="form.introduction"
              placeholder="请输入内容"
              maxlength="100"
              show-word-limit
              resize="none"
            ></el-input>
          </el-form-item>
          <el-form-item class="button-item">
            <el-button type="primary" :loading="btnLoading" @click="save"
              >保存</el-button
            >
          </el-form-item>
        </el-form>
      </div>
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
            <el-button slot="append" @click="sendVerifyCode">
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
import { mapMutations, mapState } from "vuex";
import { GENDER, IDENTITY } from "utils/const";
import userService from "service/user";
import ossService from "service/oss";
import smsService from "service/sms.js";

export default {
  name: "Profile",
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
                title: "手机号更改成功！"
              });
              this.$store.commit("UPDATA_PHONE", phone);
              this.phoneVisible = false;
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
@import "~styles/variable.less";
.profile-container {
  .form-wrapper {
    margin: 12px 0;
    padding: 80px 282px 30px;
    min-height: calc(100vh - 120px - 24px);
    background: #fff;
  }
  .avatar-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 60px;
    .upload-avatar-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      line-height: 1;
      .upload-avatar {
        display: flex;
        align-items: center;
        margin-bottom: 6px;
        text-align: left;
        color: @primaryColor;
        font-size: 14px;
        font-weight: 500;
        .replace-icon {
          font-size: 24px;
        }
        cursor: pointer;
      }
      .upload-tips {
        margin-left: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #ababab;
      }
    }
  }
  /deep/ .form {
    .el-form-item__label {
      margin-bottom: 16px;
      line-height: 1;
      font-size: 14px;
      font-weight: 500;
      color: #333333;
    }
    .phone-change-button {
      display: flex;
      align-items: flex-end;
    }
    .el-input.is-disabled {
      .el-input__inner {
        color: #cccccc;
        background: #fafafa;
      }
    }
    .el-textarea__inner,
    .el-input__inner {
      border-radius: unset;
      font-size: 14px;
      font-weight: 400;
      &::placeholder {
        color: #ccc;
      }
    }
    .el-select {
      width: 100%;
    }
    .el-input__inner {
      padding: 9px 12px;
      height: 32px;
    }
    .el-textarea__inner {
      padding: 12px;
      min-height: 76px;
    }
    .el-input__count {
      line-height: 1;
      bottom: 12px;
      right: 12px;
    }
    .el-form-item {
      margin-bottom: 50px;
    }
    .inline-item {
      display: flex;
      .el-form-item {
        width: 50%;
        &:nth-child(odd) {
          padding-right: 12px;
        }
        &:nth-child(even) {
          padding-left: 12px;
        }
      }
    }
    .button-item {
      margin: 0;
      padding-top: 10px;
      text-align: right;
      .el-button {
        width: 120px;
        height: 32px;
        padding: 0;
        line-height: 32px;
        border-radius: unset;
      }
    }
  }
  /deep/ .phoneDialog {
    .el-dialog {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: 0 !important;
      transform: translate(-50%, -50%);
      background: #f7f7f7ff;
    }
    .el-dialog__header {
      text-align: center;
      span {
        color: @primaryColor;
      }
    }
    .el-dialog__body {
      padding: 30px;
    }
    .phoneConfirmBtn {
      margin: 0;
      text-align: right;
      .el-form-item__content {
        margin-left: 0 !important;
      }
      .el-button {
        width: 80px;
      }
    }
    .el-input-group__append {
      .el-button {
        width: 98px;
      }
    }
  }
}
.user-info {
  margin-left: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .user-icon {
    margin: 0 0 17px 4px;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
}
</style>
