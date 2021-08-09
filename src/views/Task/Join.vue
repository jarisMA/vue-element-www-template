<template>
  <div class="join-page">
    <div class="container-756">
      <template v-if="!userInfo.is_designer">
        <div class="section-form" v-if="step == 1" v-loading="loading">
          <div class="section-title">
            欢迎加入「斗西设计团」，请先填写资料表单
          </div>
          <Step :step.sync="step" />
          <el-form
            :model="applyInfo"
            :rules="applyRules"
            label-position="top"
            ref="applyInfo"
            label-width="120px"
            class="apply-info"
          >
            <el-form-item label="真实姓名" prop="realname">
              <el-input
                class="w-576"
                v-model.trim="applyInfo.realname"
                placeholder="请输入真实姓名"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="生日" prop="birthday">
              <el-date-picker
                class="w-576"
                v-model="applyInfo.birthday"
                type="month"
                placeholder="请选择出生年月"
                format="yyyy 年 MM 月"
                value-format="yyyy-MM"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="坐标" prop="cityArr">
              <el-cascader
                ref="cascader"
                class="w-576"
                placeholder="请选择所在城市"
                :options="district_options"
                v-model="applyInfo.cityArr"
                :props="{ expandTrigger: 'hover' }"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="微信号" prop="wx_account">
              <el-input
                class="w-576"
                v-model.trim="applyInfo.wx_account"
                placeholder="请输入微信号"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="申请成为" prop="job_id">
              <el-select
                class="w-576"
                placeholder="请选择角色"
                clearable
                v-model="applyInfo.job_id"
              >
                <el-option
                  v-for="item of industryJobs"
                  :label="item.name"
                  :key="item.id"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作状态" prop="status">
              <el-select
                class="w-576"
                v-model="applyInfo.status"
                clearable
                placeholder="请选择工作状态"
              >
                <el-option label="在校生" :value="1"> </el-option>
                <el-option label="已工作" :value="2"> </el-option>
              </el-select>
            </el-form-item>
            <template v-if="applyInfo.status == 1">
              <el-form-item
                label="就读院校"
                prop="university"
                :rules="{
                  required: this.applyInfo.status == 1 ? true : false,
                  message: '请输入就读院校'
                }"
              >
                <el-input
                  class="w-576"
                  v-model="applyInfo.university"
                  placeholder="请输入就读院校"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item
                label="院系/专业"
                prop="faculty_major"
                :rules="{
                  required: this.applyInfo.status == 1 ? true : false,
                  message: '请输入就读院校'
                }"
              >
                <el-input
                  class="w-576"
                  v-model="applyInfo.faculty_major"
                  placeholder="请输入院系/专业"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item
                label="年级"
                prop="grade"
                :rules="{
                  required: this.applyInfo.status == 1 ? true : false,
                  message: '请选择年级'
                }"
              >
                <el-select
                  class="w-576"
                  v-model="applyInfo.grade"
                  clearable
                  placeholder="请选择年级"
                >
                  <el-option label="1" :value="1"> </el-option>
                  <el-option label="2" :value="2"> </el-option>
                  <el-option label="3" :value="3"> </el-option>
                  <el-option label="4" :value="4"> </el-option>
                </el-select>
              </el-form-item>
            </template>
            <template v-if="applyInfo.status == 2">
              <el-form-item
                label="当前职业"
                prop="job"
                :rules="{
                  required: this.applyInfo.status == 2 ? true : false,
                  message: '请输入当前职业'
                }"
              >
                <el-input
                  class="w-576"
                  v-model.trim="applyInfo.job"
                  placeholder="请输入当前职业"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item
                label="初次工作时间"
                prop="job_started_at"
                :rules="{
                  required: this.applyInfo.status == 2 ? true : false,
                  message: '请选择初次工作时间'
                }"
              >
                <el-date-picker
                  class="w-576"
                  v-model="applyInfo.job_started_at"
                  placeholder="请选择初次工作时间"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item
                prop="design_job_years"
                label="设计相关工作年限"
                :rules="{
                  required: this.applyInfo.status == 2 ? true : false,
                  message: '请选择设计相关工作年限'
                }"
              >
                <el-select
                  class="w-576"
                  placeholder="请选择设计相关工作年限"
                  v-model="applyInfo.design_job_years"
                >
                  <el-option
                    v-for="item of 20"
                    :key="item - 1"
                    :label="item - 1"
                    :value="item - 1"
                  ></el-option>
                </el-select>
              </el-form-item>
            </template>
            <el-form-item label="简历" class="upload-form-item">
              <span class="upload-tip">
                <i class="color-red">*</i>请提交PDF格式作品集，如无可不上传
              </span>
              <upload-file
                :url.sync="applyInfo.resume_url"
                :upload-limit="5120"
                :limit="3"
                space="www"
                folder="task"
              ></upload-file>
            </el-form-item>
            <div class="section-button-wrap">
              <div class="section-button" @click="handleSubmit">
                提交
              </div>
            </div>
          </el-form>
        </div>
        <div class="section-join" v-if="step == 2">
          <div class="section-title">
            资料提交成功
          </div>
          <Step :step.sync="step" />
          <div class="section-dialog">
            添加下方微信<br />备注赏金设计师<br />小青会邀请你进赏金设计团专属群
          </div>
          <div class="join-qrcode">
            <img
              src="~images/task/join-qrcode.png"
              alt=""
              class="qrcode__img"
            />
          </div>
          <div class="join-description">小青，微信id：DOUXI2021</div>
          <div class="section-button-wrap">
            <div class="section-button" @click="handleChangeStep(3)">
              已添加小青
            </div>
          </div>
        </div>
        <div class="section-work" v-if="step == 3">
          <div class="section-title">
            恭喜你，你已成功加入「斗西设计团」
          </div>
          <Step :step.sync="step" />
          <div class="section-dialog">
            设计师成就官阿镜为你准备了<br />
            一份「新手指南」请认真阅读。
          </div>
          <div class="work-img-wrap">
            <img src="~images/task/join-work.svg" alt="" class="work__img" />
            <div class="work__text">「新手指南」</div>
          </div>
          <div class="work-description">
            接下来，你可以返回任务广场，选择你想参与的任务，开始工作吧。
          </div>
          <div class="section-button-wrap">
            <div class="section-button" @click="handleFinish">
              返回广场
            </div>
          </div>
        </div>
      </template>
      <template v-if="userInfo.is_designer == 1">
        <div class="section-join">
          <div class="section-title">
            你已经是「斗西设计团」的一员啦，<br />
            快去广场领任务吧～
          </div>
          <div class="section-dialog">
            添加下方微信<br />备注赏金设计师<br />小青会邀请你进赏金设计团专属群
          </div>
          <div class="join-qrcode">
            <img
              src="~images/task/join-qrcode.png"
              alt=""
              class="qrcode__img"
            />
          </div>
          <div class="join-description">小青，微信id：DOUXI2021</div>
          <div class="section-button-wrap">
            <div class="section-button" @click="goTask()">
              返回任务广场
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { goTask } from "utils/routes";
import Step from "./widgets/JoinStep";
import taskService from "service/task";
import userService from "service/user";
import commonService from "service/common";
import UploadFile from "components/UploadFile";

export default {
  name: "TaskJoin",
  components: {
    Step,
    UploadFile
  },
  data() {
    return {
      step: 1,
      loading: false,
      btnLoading: false,
      district_options: [],
      industryJobs: [],
      city: {},
      applyInfo: {
        realname: null,
        birthday: null,
        cityArr: null,
        wx_account: null,
        job_id: null,
        status: null,
        university: null,
        college: null,
        grade: null,
        job: null,
        job_started_at: null,
        design_job_years: null
      },
      applyRules: {
        realname: { required: true, message: "请输入真实姓名" },
        birthday: { required: true, message: "请选择生日" },
        cityArr: { required: true, message: "请选择坐标" },
        wx_account: { required: true, message: "请输入微信号" },
        job_id: { required: true, message: "请选择申请角色" },
        status: { required: true, message: "请选择工作状态" }
      }
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  created() {
    this.getConst();
    this.getUserInfo();
  },
  methods: {
    ...mapMutations(["USERINFO"]),
    goTask,
    getConst() {
      Promise.all([
        commonService.districts(),
        taskService.industryJobsRoots()
      ]).then(([districtInfo, industryJobs]) => {
        this.district_options = districtInfo.map(item => {
          const children =
            (item.children &&
              item.children.map(child => {
                return {
                  label: child.label,
                  value: child.value
                };
              })) ||
            null;
          return {
            ...item,
            children: children
          };
        });
        this.industryJobs = industryJobs;
      });
    },
    getUserInfo() {
      const { realname, wx_account, province, city } = this.userInfo;
      const cityArr = province && city ? [Number(province), Number(city)] : [];
      this.applyInfo = {
        realname: realname,
        birthday: null,
        cityArr: cityArr,
        wx_account: wx_account,
        status: null,
        job_id: null,
        university: null,
        faculty_major: null,
        grade: null,
        job: null,
        job_started_at: null,
        design_job_years: null,
        resume_url: ""
      };
    },
    handleCityChange() {
      const nodes = this.$refs.cascader.getCheckedNodes();
      this.handleCityNode(nodes);
    },
    handleCityNode(nodes = []) {
      let result = {};
      nodes.forEach(city => {
        result = {
          province: {
            id: city.parent.value,
            name: city.parent.label
          },
          city: {
            id: city.value,
            name: city.label
          }
        };
      });
      this.applyInfo.city = result;
    },
    handleSubmit() {
      this.$refs["applyInfo"].validate(val => {
        if (val) {
          this.loading = true;
          this.btnLoading = true;
          const { cityArr } = this.applyInfo;
          const params = this.applyInfo;
          params.province = cityArr[0];
          params.city = cityArr[1];
          taskService
            .taskUserJoin(params)
            .then(() => {
              this.step = 2;
            })
            .finally(() => {
              this.loading = false;
              this.btnLoading = false;
            });
        }
      });
    },
    handleChangeStep() {
      this.step = 3;
    },
    handleFinish() {
      this.goTask();
      this.updateUserInfo();
    },
    updateUserInfo() {
      userService.getUserInfo().then(userInfo => {
        this.USERINFO({ ...userInfo });
      });
    },
    validateSize(file) {
      const fileName = file.name;
      const suffix = fileName.split(".").pop();
      const imageRegex = /(pdf)/;
      if (!imageRegex.test(suffix)) {
        this.$message.error(`请上传格式为pdf的文件`);
        return false;
      }
      return true;
    }
  }
};
</script>
<style lang="less" scoped>
.join-page {
  padding-top: 76px;
  .section-title {
    margin-bottom: 65px;
    font-weight: 600;
    font-size: 36px;
    text-align: center;
    line-height: 50px;
    color: #14af64;
  }
  .section-button-wrap {
    padding-top: 20px;
    padding-bottom: 60px;
    .section-button {
      width: 120px;
      height: 52px;
      background-image: url("~images/task/join-button.svg");
      background-size: 120px 52px;
      background-position: center;
      background-repeat: no-repeat;
      text-align: center;
      font-weight: 500;
      font-size: 16px;
      line-height: 52px;
      color: #ffffff;
      cursor: pointer;
    }
  }
  .section-dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 326px;
    height: 152px;
    margin: 80px auto 32px;
    background-image: url("~images/task/join-dialog.png");
    background-size: 326px 152px;
    background-position: center;
    background-repeat: no-repeat;
    text-align: center;
    font-size: 18px;
    line-height: 30px;
    text-align: center;
    color: #14af64;
  }
}
.section-form {
  /deep/.apply-info {
    padding-top: 67px;
    width: 576px;
    margin: 0 auto;
    .el-form-item {
      margin-bottom: 30px;
    }
    .el-form-item__label {
      height: 24px;
      margin-bottom: 8px;
      padding-bottom: 0px;
      font-size: 16px;
      line-height: 24px;
    }
    .el-input {
      &.is-focus {
        .el-input__inner {
          border-color: #efefef;
        }
      }
    }
    .el-input__inner {
      position: relative;
      border-left: none;
      border-right: none;
      border: 2px solid #efefef;
      clip-path: polygon(
        2px 0,
        2px 2px,
        0 2px,
        0 calc(100% - 2px),
        2px calc(100% - 2px),
        2px 100%,
        calc(100% - 2px) 100%,
        calc(100% - 2px) calc(100% - 2px),
        100% calc(100% - 2px),
        100% 2px,
        calc(100% - 2px) 2px,
        calc(100% - 2px) 0
      );
    }
    .el-cascader:not(.is-disabled):hover .el-input__inner {
      cursor: pointer;
      border-color: #efefef;
    }
    .upload-form-item {
      position: relative;
      .color-red {
        color: #ff0202;
      }
      .upload-tip {
        position: absolute;
        right: 0;
        font-size: 14px;
        height: 24px;
        top: -40px;
        color: #c6c6c6;
      }
    }
    .el-upload {
      width: 100%;
      .el-input__inner {
        text-align: left;
        color: #14af64;
        font-weight: 500;
        font-size: 16px;
        padding-top: 0;
        padding-bottom: 0;
      }
    }
  }
}
.section-join {
  .join-qrcode {
    margin: 0 auto;
    width: 200px;
    height: 200px;
    .qrcode__img {
      width: 100%;
      height: 100%;
    }
  }
  .join-description {
    height: 28px;
    margin-top: 18px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 20px;
    line-height: 28px;
    color: #606060;
  }
  .section-button {
    margin: 0 auto;
  }
}
.section-work {
  .section-dialog {
    color: #2c3330;
  }
  .work-img-wrap {
    width: 180px;
    height: 180px;
    padding-top: 26px;
    margin: 0 auto;
    background-color: #f2f2f2;
    .work__img {
      width: 94px;
      height: 106px;
      margin-left: 37px;
      text-align: center;
    }
    .work__text {
      margin-top: 10px;
      font-size: 18px;
      font-weight: 600;
      line-height: 25px;
      text-align: center;
      color: #2c3330;
    }
  }
  .work-description {
    margin-top: 72px;
    text-align: center;
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    color: #000000;
  }
  .section-button {
    margin: 0 auto;
  }
}
.w-576 {
  width: 576px !important;
}
</style>
