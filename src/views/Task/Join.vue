<template>
  <div class="join-page">
    <div class="container-756">
      <div class="section-form">
        <div class="section-title">
          欢迎加入「斗西设计团」，请先填写资料表单
        </div>
        <Step />
        <el-form
          :model="applyInfo"
          :rules="applyRules"
          ref="applyInfo"
          label-width="120px"
          class="apply-info"
        >
          <el-form-item
            label="真实姓名："
            prop="realname"
            :show-message="false"
          >
            <el-input
              class="w-580"
              v-model.trim="applyInfo.realname"
              placeholder="请输入真实姓名"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="生日：" prop="birthday" :show-message="false">
            <el-date-picker
              class="w-580"
              v-model="applyInfo.birthday"
              type="month"
              placeholder="选择月"
              format="yyyy 年 MM 月"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="坐标" prop="cityArr" :show-message="false">
            <el-cascader
              ref="cascader"
              class="w-580 mb-20"
              placeholder="请选择所在城市"
              :options="district_options"
              v-model="applyInfo.cityArr"
              size="small"
              :props="{ expandTrigger: 'hover' }"
              @change="handleCityChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item
            label="微信号："
            prop="wx_account"
            :show-message="false"
          >
            <el-input
              class="w-580 mb-20"
              v-model.trim="applyInfo.wx_account"
              placeholder="请输入微信号"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="工作状态："
            prop="identity"
            :show-message="false"
          >
            <el-select
              class="w-580 mb-20"
              v-model="applyInfo.identity"
              clearable
              placeholder="请选择工作状态"
            >
              <el-option label="1年级" :value="1"> </el-option>
              <el-option label="已工作" :value="2"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="就读院校："
            prop="university"
            :show-message="false"
          >
            <el-input
              class="w-580 mb-20"
              v-model="applyInfo.university"
              placeholder="请输入就读院校"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="院系/专业："
            prop="college"
            :show-message="false"
          >
            <el-input
              class="w-580 mb-20"
              v-model="applyInfo.college"
              placeholder="请输入院系/专业"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="年级：" prop="identity" :show-message="false">
            <el-select
              class="w-580 mb-20"
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
          <el-form-item label="职业方向：" prop="job" :show-message="false">
            <el-input
              class="w-580 mb-20"
              v-model.trim="applyInfo.job"
              placeholder="请输入职业方向"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="初次工作时间："
            prop="job_started_at"
            :show-message="false"
          >
            <el-date-picker
              class="w-580 mb-20"
              v-model="applyInfo.job_started_at"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              placeholder="请选择初次工作时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="design_job_years" label="设计相关工作经验">
            <el-select
              class="w-580 mb-20"
              size="small"
              placeholder="请选择设计相关工作经验"
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
          <el-form-item label="简历：">
            <el-upload
              class="w-580 mb-20 upload-demo"
              ref="upload"
              action=""
              :limit="1"
              :file-list="fileList"
              :before-upload="handleBeforeUpload"
              :on-preview="handleOnPreview"
              :on-remove="handleBeforeRemove"
              accept="application/pdf"
            >
              <el-button
                slot="trigger"
                :loading="btnLoading"
                plain
                type="primary"
                >选取文件</el-button
              >
              <span slot="tip" class="el-upload__tip ml-12">
                只能上传 pdf 格式文件
              </span>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import Step from "./widgets/JoinStep";
import ossService from "service/oss";
import commonService from "service/common";

export default {
  components: {
    Step
  },
  data() {
    return {
      district_options: [],
      city: {},
      applyInfo: {
        realname: null,
        birthday: null,
        cityArr: null,
        wx_account: null,
        identity: null,
        university: null,
        college: null,
        grade: null,
        job: null,
        job_started_at: null,
        design_job_years: null
      },
      fileList: [],
      applyRules: {}
    };
  },
  created() {
    this.getConst();
  },
  methods: {
    getConst() {
      Promise.all([commonService.districts()]).then(([districtInfo]) => {
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
      });
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
    handleBeforeUpload(file) {
      if (!file || !this.validateSize(file)) {
        return false;
      }
      const space = "task";
      const folder = "www";
      this.btnLoading = true;
      ossService
        .upload({ space, folder, file }, () => {})
        .then(res => {
          this.fileList = [{ name: res.name, url: res.path }];
          this.applyInfo.resume_id = res.id;
        })
        .finally(() => {
          this.btnLoading = false;
        });
      return false;
    },
    handleOnPreview(file) {
      window.open(file.url);
    },
    handleBeforeRemove(file) {
      if (file && file.status === "success") {
        this.fileList = [];
        this.applyInfo.resume_id = null;
      }
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
.w-580 {
  width: 580px;
}
</style>
