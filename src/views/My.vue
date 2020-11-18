<template>
  <div class="my-container container-1200">
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
            :src="userLogo"
          ></el-avatar>
          <span>jaris</span>
        </div>
        <el-menu default-active="plan">
          <el-menu-item index="plan">我的方案</el-menu-item>
          <el-menu-item index="homework" disabled>我的作业</el-menu-item>
          <el-menu-item index="course" disabled>我的课程</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <ul class="plan-list">
          <li class="plan-item" v-for="item of 10" :key="item">
            <div class="plan-card">方案{{ item }}</div>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userLogo from "@/assets/images/user_logo.svg";

export default {
  name: "My",
  data() {
    return {
      userLogo
    };
  },
  methods: {
    addPlan() {
      this.$router.push({
        name: "AddPlan"
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
