<template>
  <footer class="page-footer">
    <div class="container-1200">
      <div class="left">
        Copyright © 2020 home-plan.cn All Rights Reserved
        <a class="beian" target="_blank" href="https://beian.miit.gov.cn/"
          >沪ICP备2020026846号</a
        >
        <p class="public">沪公网安备 31010102006648号</p>
      </div>
      <div class="right">
        <p class="title">联系邮箱：kf@home-plan.cn</p>
        <div class="img-hover">
          <img src="~images/wx-logo.svg" alt="" class="image" />
          <img src="~images/direction_logo-3.svg" class="look-wx_imag" />
        </div>
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
@import "~styles/variable.less";

.page-footer {
  height: 60px;
  line-height: 40px;
  font-size: 14px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  background-color: @primaryColor;
  .container-1200 {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right {
      display: flex;
      align-items: center;
      .img-hover {
        height: 42px;
        width: 42px;
        border-radius: 50%;
        border: 1px solid #fff;
        margin-left: 36px;
        padding: 5px;
        position: relative;
        font-size: 0;
        .image {
          height: 30px;
          width: 30px;
        }
        .look-wx_imag {
          display: none;
          position: absolute;
          width: 138px;
          height: 138px;
          top: -157px;
          left: -70px;
        }
        &:hover {
          .look-wx_imag {
            display: inline-block;
          }
        }
      }
    }
    .left {
      display: flex;
      a {
        margin: 0 10px;
      }
    }
  }
  .beian {
    color: #fff;
  }
}
</style>
