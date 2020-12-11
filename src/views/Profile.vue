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

        <el-form ref="form" class="form" :model="form" :rules="formRules">
          <el-form-item label="昵称" prop="nickname">
            <el-input
              v-model="form.nickname"
              placeholder="请设置你的昵称"
            ></el-input>
          </el-form-item>
          <div class="inline-item">
            <el-form-item label="手机号">
              <el-input v-model="phone" disabled></el-input>
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
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { GENDER, IDENTITY } from "utils/const";
import userService from "@/global/service/user";
import ossService from "@/global/service/oss";

export default {
  name: "Profile",
  data() {
    return {
      GENDER,
      IDENTITY,
      btnLoading: false,
      uploadingAvatar: false,
      phone: "",
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
      phone,
      gender,
      identity,
      remark,
      introduction,
      avatar_url
    } = this.userInfo;
    this.form = {
      nickname,
      gender,
      identity: identity + "",
      remark,
      introduction,
      avatar_url
    };
    this.phone = phone;
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapMutations(["USERINFO"]),
    uploadAvatar(file) {
      this.uploadingAvatar = true;
      ossService
        .put({
          file,
          space: "avatar",
          folder: "avatar"
        })
        .then(res => {
          this.form.avatar_url = res.url;
          this.uploadingAvatar = false;
        })
        .catch(flag => {
          flag &&
            this.$notice({
              type: "danger",
              title: "上传头像失败"
            });
          this.uploadingAvatar = false;
        });
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
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable.less";
.profile-container {
  .form-wrapper {
    margin: 12px 0;
    padding: 80px 282px 0;
    height: calc(100vh - 120px - 24px);
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
      margin-left: 24px;
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
}
</style>
