<template>
  <footer class="page-footer">
    <div class="container-1080">
      <div class="left">
        Copyright © 2020 home-plan.com All Rights Reserved
        <a class="beian" target="_blank" href="http://www.beian.miit.gov.cn/"
          >沪ICP备2020026846号</a
        >
      </div>
      <div class="right">
        <p class="title">联系邮箱：kf@home-plan.cn</p>
        <img src="~@/assets/images/wx-logo.svg" alt="" class="image" />
      </div>
    </div>
  </footer>
</template>
<script type="text/javascript">
export default {
  data() {
    return {};
  }
};
</script>
<style type="text/css" lang="less" scoped>
.page-footer {
  height: 60px;
  line-height: 40px;
  font-size: 14px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  background-color: #14af64;
  .container-1080 {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right {
      display: flex;
      align-items: center;
      .image {
        height: 42px;
        width: 42px;
        border-radius: 50%;
        border: 1px solid #fff;
        margin-left: 36px;
        padding: 5px;
      }
    }
  }
  .beian {
    color: #fff;
  }
}
</style>
