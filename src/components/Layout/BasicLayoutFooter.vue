<template>
  <footer :class="['page-footer', theme]">
    <div class="container-1200">
      <div class="left">
        Copyright © 2020 home-plan.cn All Rights Reserved
        <template v-if="theme !== 'primary'">
          <a class="beian" target="_blank" href="https://beian.miit.gov.cn/"
            >沪ICP备2020026846号</a
          >
          <p class="public">沪公网安备 31010102006648号</p>
        </template>
      </div>

      <div class="right" v-if="theme !== 'primary'">
        <p class="email">联系邮箱：kf@home-plan.cn</p>
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
  name: "BasicLayoutFooter",
  props: {
    theme: {
      type: String,
      default: "default"
    }
  },
  data() {
    return {};
  }
};
</script>
<style type="text/css" lang="less" scoped>
@import "~styles/variable";

.page-footer {
  height: 60px;
  line-height: 40px;
  font-size: 14px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  background-color: @primaryColor;
  &.primary {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
  }
  .container-1200 {
    width: calc(100vw - 88px);
    min-width: 1200px;
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
