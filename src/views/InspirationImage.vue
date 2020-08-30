<template>
  <div class="container">
    <div class="filtration-container">
      <div class="filtration-section">
        <div class="filtration-header">
          <div class="header-logo" @click="filtrationShowHandle">
            <img src="~@/assets/images/sx@2x.png" class="logo-img" />
            <p class="logo-title">筛选</p>
            <img
              v-if="!filtrationShow"
              src="~@/assets/images/sx-gd-wzk@2x.png"
              class="logo-image"
            />
            <img
              v-if="filtrationShow"
              src="~@/assets/images/sx-gd-zk@2x.png"
              class="logo-image"
            />
          </div>
          <div class="header-input">
            <img src="~@/assets/images/ss@2x.png" class="innput-logo" />
            <input type="text" class="input-content" />
          </div>
        </div>
        <div
          :class="[
            'filtration-content',
            filtrationShow ? 'filtration-content-active' : ''
          ]"
        >
          <div class="content-list">
            <p class="list-title">空间</p>
            <div class="list-content">
              <p class="item-title header active">全部</p>
              <p class="item-title">客厅</p>
              <p class="item-title">餐厅</p>
              <p class="item-title">卧室</p>
              <p class="item-title">书房</p>
              <p class="item-title">儿童房</p>
              <p class="item-title">卫生间</p>
              <p class="item-title">玄关</p>
              <p class="item-title">阳台</p>
            </div>
          </div>
          <div class="content-list">
            <p class="list-title">风格</p>
            <div class="list-content">
              <p class="item-title header active">全部</p>
              <p class="item-title">北欧</p>
              <p class="item-title">日系</p>
              <p class="item-title">法式</p>
              <p class="item-title">英式</p>
              <p class="item-title">美式</p>
              <p class="item-title">中式</p>
              <p class="item-title">现代</p>
              <p class="item-title">复古</p>
            </div>
          </div>
          <div class="content-list">
            <p class="list-title">颜色</p>
            <div class="list-content">
              <p class="item-title header active">全部</p>
              <p class="item-title">纯白</p>
              <p class="item-title">木色</p>
              <p class="item-title">灰色</p>
              <p class="item-title">蓝色</p>
              <p class="item-title">绿色</p>
              <p class="item-title">黄色</p>
              <p class="item-title">米色</p>
              <p class="item-title">多彩</p>
              <p class="item-title">莫兰迪</p>
              <p class="item-title">马卡龙</p>
              <p class="item-title">黑白</p>
              <p class="item-title">星空</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="inspiration-img_container">
      <div class="inspiration-img_section">
        <div class="inspiration-img_list">
          <div class="item" v-for="item in 10" :key="item">
            <InspirationImageModule></InspirationImageModule>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import InspirationImageModule from "./../components/InspirationImageModule";

export default {
  data() {
    return {
      filtrationShow: false
    };
  },
  components: {
    InspirationImageModule
  },
  methods: {
    filtrationShowHandle() {
      this.filtrationShow = !this.filtrationShow;
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  text-align: center;
  display: flex;
  flex-direction: column;
  .filtration-container {
    width: 100%;
    background-color: #fff;
    .filtration-section {
      padding: 30px 0;
      .filtration-header {
        width: 1200px;
        display: flex;
        align-items: center;
        margin: 0 auto;
        padding-left: 10px;
        .header-logo {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 30px;
          .logo-img {
            width: 20px;
            height: 20px;
            margin-right: 7px;
          }
          .logo-title {
            font-size: 14px;
            font-family: Noto Sans S Chinese;
            color: #14af64;
          }
          .logo-image {
            width: 16px;
            height: 16px;
            margin-left: 5px;
          }
        }
        .header-input {
          width: 957px;
          height: 34px;
          background: #f7f7f7;
          border-radius: 17px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding-left: 30px;
          .innput-logo {
            width: 15px;
            height: 15px;
            margin-right: 20px;
          }
          .input-content {
            flex: 1;
            background: #f7f7f7;
            border: none;
            outline: none;
            font-size: 14px;
            font-family: Noto Sans S Chinese;
          }
        }
      }
      .filtration-content {
        width: 1200px;
        margin: 30px auto 0;
        display: none;
        .content-list {
          margin-bottom: 15px;
          display: flex;
          padding-left: 42px;
          .list-title {
            display: inline-block;
            font-size: 14px;
            font-family: Noto Sans S Chinese;
            line-height: 24px;
            color: #333333;
            position: relative;
            &:after {
              content: "";
              display: inline-block;
              width: 0px;
              height: 20px;
              border: 1px solid #f1f1f1;
              position: absolute;
              line-height: 24px;
              right: -8px;
              top: 12px;
              transform: translateY(-50%);
            }
          }
          .list-content {
            margin-left: 20px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            .item-title {
              margin-right: 20px;
              padding: 3px 11px;
              border-radius: 10px;
              border: 1px solid #e3e3e3;
              font-size: 14px;
              font-family: Noto Sans S Chinese;
              color: #dfdfdf;
            }
            .header,
            .active {
              background: #14af64;
              border: none;
              color: #fff;
              font-weight: 500;
            }
          }
        }
      }
      .filtration-content-active {
        opacity: 1;
        animation: show 0.5s;
        display: inline-block;
      }
    }
  }
  .inspiration-img_container {
    background-color: #f4f6f3;
    flex: 1;
    padding: 68px 0 209px;
    .inspiration-img_section {
      width: 1200px;
      margin: 0 auto;
      .inspiration-img_list {
        display: flex;
        flex-wrap: wrap;
        .item {
          margin: 0 28px 30px 0;
          &:nth-child(3n + 3) {
            margin-right: 0;
          }
        }
      }
    }
  }
}
@keyframes show {
  0% {
    opacity: 0;
    display: inline-block;
  }
  100% {
    opacity: 1;
    display: inline-block;
  }
}
</style>
