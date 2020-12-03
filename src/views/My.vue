<template>
  <div class="my-container " v-loading="loading">
    <div class="container-1200">
      <el-row :gutter="24">
        <el-col :span="5">
          <div class="login-user-wrapper">
            <el-avatar
              :size="80"
              class="login-user-image"
              :src="userInfo.avatar_url ? userInfo.avatar_url : userLogo"
            ></el-avatar>
            <span class="nickname">{{ userInfo.nickname }}</span>
          </div>
          <el-menu default-active="plan">
            <el-menu-item index="plan">我的方案</el-menu-item>
            <el-menu-item index="homework" disabled>我的作业</el-menu-item>
            <el-menu-item index="course" disabled>我的课程</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="19">
          <!-- <el-scrollbar class="scrollbar-section"> -->
          <div class="add-btn-wrapper">
            <el-button class="add-btn" type="success" @click="addPlan">
              <img
                src="@/assets/images/common/add.svg"
                width="12"
                height="12"
              />
              新建方案
            </el-button>
          </div>
          <plan-list
            canDelete
            :plans="plans"
            :size="planCount"
            :total="planTotalCount"
            theme="my"
            @itemClick="editPlan"
            @delete="delelePlan"
          />
          <!-- </el-scrollbar> -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import userLogo from "@/assets/images/user_logo.svg";
import { mapState } from "vuex";
import PlanList from "@/components/PlanList";
import kujialeService from "@/global/service/kujiale";

export default {
  name: "My",
  components: {
    PlanList
  },
  data() {
    return {
      userLogo,
      loading: true,
      plans: [],
      planCount: 8,
      planTotalCount: 0
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  created() {
    this.getPlan();
  },
  methods: {
    getPlan(start = 1) {
      kujialeService
        .designList({
          page: start,
          page_size: this.planCount
        })
        .then(res => {
          this.planTotalCount = res.totalCount;
          this.plans = res.result;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    addPlan() {
      this.$router.push({
        name: "AddPlan"
      });
    },
    editPlan(data) {
      this.$router.push({
        name: "EditPlan",
        params: {
          designId: data.designId
        }
      });
    },
    delelePlan(index, plan) {
      this.$msgBox
        .showMsgBox({
          title: "添加分类",
          content: "请填写分类名称",
          isShowInput: true
        })
        .then(async () => {
          kujialeService
            .deleteDesign({
              plan_id: plan.planId
            })
            .then(() => {
              this.$message.success("删除成功");
              this.plans.splice(index, 1);
            });
        })
        .catch(() => {
          // ...
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/styles/variable.less";

@leftWidth: 224px;
.my-container {
  background: #fafafa;
  .add-btn-wrapper {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
    .add-btn {
      width: 118px;
      height: 32px;
      line-height: 32px;
      padding: 0;
      font-size: 14px;
      font-weight: 500;
      color: #ffffff;
      background: @primaryColor;
      border-radius: unset;
      img {
        vertical-align: unset;
        margin-right: 2px;
      }
    }
  }
  .login-user-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
    width: @leftWidth;
    height: @leftWidth;
    background: #fff;
    .nickname {
      display: inline-block;
      line-height: 30px;
      font-size: 20px;
      font-weight: 500;
      color: #333333;
    }
    .login-user-image {
      margin-bottom: 20px;
      border: 2px solid @primaryColor;
      background-color: transparent;
      :hover {
        cursor: pointer;
      }
    }
  }
  .el-menu {
    width: @leftWidth;
    border: unset;
  }
  .el-menu-item {
    position: relative;
    height: 50px;
    line-height: 50px;
    text-align: left;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    background: #fff;
    &:not(:last-child) {
      border-bottom: 1px solid #e6e6e6ff;
    }
    &.is-active {
      &::before {
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: 100%;
        content: "";
        background: @primaryColor;
      }
    }
  }
  .scrollbar-section {
    height: calc(100vh - 120px);
  }
  .plan-list {
    display: flex;
    flex-wrap: wrap;
    .plan-item {
      width: 25%;
      list-style: none;
      .plan-card {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;
        width: calc(100% - 20px);
        height: 200px;
        border: 1px solid gray;
        box-shadow: 2px 2px gray;
        cursor: pointer;
      }
    }
  }
}
</style>
