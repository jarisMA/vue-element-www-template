<template>
  <div class="my-container container-1200" v-loading="loading">
    <div class="add-btn-wrapper">
      <el-button class="add-btn" type="success" @click="addPlan"
        >新建方案</el-button
      >
    </div>
    <el-row :gutter="24">
      <el-col :span="3">
        <div class="login-user-wrapper">
          <el-avatar
            :size="60"
            class="login-user-image"
            :src="userInfo.avatar_url ? userInfo.avatar_url : userLogo"
          ></el-avatar>
          <span>{{ userInfo.nickname }}</span>
        </div>
        <el-menu default-active="plan">
          <el-menu-item index="plan">我的方案</el-menu-item>
          <el-menu-item index="homework" disabled>我的作业</el-menu-item>
          <el-menu-item index="course" disabled>我的课程</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <plan-list
          canDelete
          :plans="plans"
          :size="planCount"
          :total="planTotalCount"
          @itemClick="editPlan"
          @delete="delelePlan"
        />
      </el-col>
    </el-row>
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
      kujialeService
        .deleteDesign({
          plan_id: plan.planId
        })
        .then(() => {
          this.$message.success("删除成功");
          this.plans.splice(index, 1);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.my-container {
  padding: 20px 0;
  .add-btn-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
    .add-btn {
      margin-right: 10px;
      box-shadow: 2px 2px gray;
    }
  }
  .login-user-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    .login-user-image {
      margin-bottom: 10px;
      border: 2px solid #14af64;
      background-color: transparent;
      :hover {
        cursor: pointer;
      }
    }
  }
  .el-menu-item {
    margin-bottom: 2px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border: 1px solid gray;
    box-shadow: 2px 2px gray;
    &.is-active {
      background: #ebf8ee;
    }
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
