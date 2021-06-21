<template>
  <div class="page-body">
    <div class="slogan-section"></div>
    <div class="people-section">
      <div class="people-title">
        <img src="https://docee.oss-cn-shanghai.aliyuncs.com/admin/2021/0621/commodity/Xo406HM7nJmsY0VMoN4jDfiRLIM0AMUXx8nnNBgf.png" class="people-title-img" />
      </div>
      <div class="people-content">
        <div class="people-img">
          <div class="people-no">
            <img class="people-no-size" src="~images/home/no1.png" />
          </div>
          <div><img class="people-icon" src="~images/home/diy.png" /></div>
          <div><img class="people-sub-size" src="~images/home/diy.svg" /></div>
        </div>
        <div class="people-img">
          <div class="people-no">
            <img class="people-no-size" src="~images/home/no2.png" />
          </div>
          <div><img class="people-icon" src="~images/home/lover.png" /></div>
          <div>
            <img class="people-sub-size" src="~images/home/lover.svg" />
          </div>
        </div>
        <div class="people-img">
          <div class="people-no">
            <img class="people-no-size" src="~images/home/no3.png" />
          </div>
          <div><img class="people-icon" src="~images/home/designer.png" /></div>
          <div>
            <img class="people-sub-size" src="~images/home/designer.svg" />
          </div>
        </div>
      </div>
    </div>
    <div class="feedback-section">
      <div class="feedback-tip">
        <img class="feedback-appre" src="https://docee.oss-cn-shanghai.aliyuncs.com/admin/2021/0621/commodity/DPsS7Z7mchjt9e5wqzt3dEdWNGAwrm9bbfz6rV1l.png" />
        <p class="feedback-say">体验了我们课程的学员这样说</p>
      </div>
      <div class="feedback-content">
        <swiper ref="mySwiper" :options="swiperOptions">
          <swiper-slide
            class="feedback-subcontainer"
            v-for="(item, key) of feedbacks"
            :key="key"
          >
            <div class="feedback-user">
              <div class="feedback-icon">
                <img class="feedback-avatar" :src="item.user.avatar_url" />
              </div>
              <div class="feedback-name">
                <p class="page-font4">{{ item.user.nickname }}</p>
                <p class="page-font6">{{ item.termName }}</p>
              </div>
            </div>
            <img class="feedback-top" src="~images/home/top.png" />
            <div class="feedback-comment">
              {{ item.content }}
            </div>
            <img class="feedback-btn" src="~images/home/bottom.png" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div class="product-section">
      <div class="product-flex container-1180">
        <div class="product-left">
          <img class="product-logo" src="~/images/home/logo.svg" />
          <div class="product-text">
            <span>每个人都能拥有好设计<br />家装领域“价值观”驱动平台</span>
            <div class="product-contact">
              <div class="product-wechat-section">
                <img class="product-wechat" src="~/images/home/wechat.svg" />
                <img class="product-qr" src="~/images/home/QRcode.svg" />
              </div>

              <a href="mailto:kf@home-plan.cn">
                <img class="product-email" src="~/images/home/email.svg" />
              </a>
            </div>
          </div>
        </div>
        <div class="product-right">
          <div class="product-container2">
            <span class="product-title">设计教育</span
            ><span class="product-text"
              >平面布局训练营<br />“超”软装设计训练营<br />斗西家宝典</span
            >
          </div>
          <div class="product-container3">
            <span class="product-title">更多产品</span
            ><span class="product-text">daylab</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { feedbacks } from "utils/feedbacks.js";

export default {
  data() {
    return {
      feedbacks,
      swiperOptions: {
        slidesPerView: "auto",
        slidesPerGroup: 1,
        spaceBetween: 0
      }
    };
  }
};
</script>

<style type="text/css" lang="less" scoped>
.page-body {
  display: block;
  width: 100%;
  height: 100%;
  background-color: white;

  .page-font4 {
    font-weight: 600;
    font-size: 16px;
    color: #2c3330;
  }

  .page-font5 {
    font-weight: normal;
    font-size: 16px;
    color: #81948b;
  }

  .page-font6 {
    line-height: 24px;
    font-weight: normal;
    font-size: 12px;
    color: #7b7b7b;
  }
}

.slogan-section {
  width: 100%;
  height: 890px;
  background-image: url('https://docee.oss-cn-shanghai.aliyuncs.com/admin/2021/0621/commodity/fMYUDpX9FaPpC20f7Mq0yTiFsrabtOAHocnabvsp.png');
  background-position: center center;
  background-size: 1920px 890px;
  background-repeat: no-repeat;
}

.people-section {
  width: 100%;
  height: 840px;
  background-color: #dde0ff;

  .people-title {
    padding: 100px 0px;
    text-align: center;

    .people-title-img {
      width: 783px;
      height: 74px;
    }
  }

  .people-content {
    display: flex;
    justify-content: center;
    align-items: center;

    .people-img {
      margin: 0px 85px 158px;
      width: 240px;
      height: 500px;

      .people-no {
        text-align: center;
        margin-bottom: 48px;
      }

      .people-no-size {
        width: 60px;
        height: 60px;
      }

      .people-icon {
        width: 240px;
        height: 160px;
        margin-bottom: 20px;
      }

      .people-sub-size {
        width: 240px;
        height: 57px;
      }
    }
  }
}

.feedback-section {
  width: 100%;
  height: 593px;
  background-color: #fff1cd;

  .feedback-tip {
    position: relative;
    top: -89px;
    margin: 0 auto;
    text-align: center;
    padding-top: 45px;
    width: 668px;
    height: 89px;
    background-image: url(~images/home/tip.png);
  }

  .feedback-appre {
    width: 482px;
    height: 75px;
  }

  .feedback-say {
    margin-top: 16px;
    font-weight: 600;
    font-size: 24px;
  }

  .feedback-content {
    position: relative;
    margin: 25px auto 0px;
    height: 500px;

    .feedback-subcontainer {
      margin: 0px 10px;
      width: 382px;
      cursor: grab;

      .feedback-comment {
        position: relative;
        top: -37px;
        display: inline-block;
        width: 382px;
        padding: 60px 24px 30px;
        line-height: 24px;
        font-weight: normal;
        font-size: 14px;
        letter-spacing: 1px;
        color: #2c3330;
        border: 4px solid #ffd099;
        box-shadow: 0 0 0 4px #383838;
        background: #fffcf1;
        cursor: grab;
      }

      .feedback-top {
        position: relative;
        left: -4px;
        top: -28px;
        width: 390px;
        height: 24px;
        z-index: 998;
      }

      .feedback-btn {
        position: relative;
        left: -4px;
        top: -45px;
        width: 390px;
        height: 24px;
        z-index: 998;
      }

      .feedback-user {
        position: relative;
        top: 15px;
        left: -4px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 5px;
        margin-top: 17px;
        width: 270px;
        height: 65px;
        background-image: url(~images/home/user-bg.png);
        background-size: 100% 100%;
        z-index: 999;

        .feedback-icon {
          display: inline-block;
        }

        .feedback-name {
          display: inline-block;
          margin-left: 20px;
        }

        .feedback-avatar {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
}

.product-section {
  display: flex;
  justify-content: center;
  height: 330px;
  padding-top: 80px;
  background: #fafafa;

  .product-flex {
    display: inline-flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0 auto;

    .product-left {
      display: inline-block;
      width: 170px;
    }

    .product-right {
      display: inline-flex;
      align-items: flex-start;
    }
  }

  .product-text {
    display: inline-block;
    margin-bottom: 22px;
    line-height: 27px;
    font-weight: normal;
    font-size: 14px;
    color: #606c66;
    opacity: 0.8;

    .product-contact {
      position: relative;
      margin-top: 42px;
      cursor: pointer;

      .product-email {
        margin-left: 16px;
      }

      .product-wechat-section {
        display: inline;

        .product-wechat {
          &:hover {
            & + .product-qr {
              position: absolute;
              visibility: visible;
              left: -58px;
              top: -170px;
            }
          }
        }
      }
    }
  }

  .product-container2 {
    display: inline-block;
    text-align: left;
  }

  .product-container3 {
    display: inline-block;
    margin-left: 72px;
    text-align: left;
  }

  .product-title {
    display: block;
    line-height: 34px;
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 24px;

    color: #2c3330;
  }

  .product-qr {
    position: absolute;
    visibility: hidden;
    left: -58px;
    top: -170px;
  }
}
</style>
