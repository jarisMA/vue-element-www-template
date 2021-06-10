<template>
  <div class="page-body">
    <div class="slogan-section container-1180">
      <div class="slogan-content">
        <div class="slogan-content-hd">
          <div class="slogan-left">
            <div class="slogan-up">让每个人都能拥有</div>
            <div class="slogan-down">
              <div>好设计</div>
              <div>
                <vue-typed-js
                  :strings="['自学设计家', '找设计师', '找客户']"
                  :loop="true"
                  :typeSpeed="100"
                  :backSpeed="100"
                  :smartBackspace="false"
                  :cursorChar="'｜'"
                >
                  <span class="slogan-container typing"></span>
                </vue-typed-js>
              </div>
            </div>
          </div>
          <div class="slogan-middle">
            <span>家装领域<br />“价值观”驱动平台</span>
          </div>
          <div class="slogan-right">
            <img class="slogan-circle" src="~/images/home/slogan-circle.svg" />
            <img class="slogan-icon" :src="imagesUrl[imgIndex]" />
          </div>
        </div>
        <div class="slogan-content-ft">
          <img
            class="slogan-img"
            src="http://docee.oss-cn-shanghai.aliyuncs.com/www/2021/0609/home/hPLKkXKY2MO0K8ly4Fgu3NS8fKRLaMSMMnBTm0cm.jpg"
          />
        </div>
      </div>
    </div>
    <div class="people-section container-1180">
      <div class="people-title">
        <span class="page-font1">专为不同人群打造的课程体系</span>
      </div>
      <div class="people-img">
        <img src="~/images/home/dongshouzu.svg" />
        <img class="people-space" src="~/images/home/aihaozhe.svg" />
        <img src="~images/home/zhuanyeren.svg" />
      </div>
      <div class="people-img page-font2">
        <span>有房要装的动手族</span
        ><span class="people-space">开拓副业的爱好者</span
        ><span>设计为生的专业人</span>
      </div>
    </div>
    <!-- <div class="course-section container-1180">
      <div class="course-list">
        <span class="page-font3">家计划视频课</span
        ><span class="page-font4 course-left">日常布局小课堂</span
        ><span class="page-font5 course-left">斗西魔改家</span>
      </div>
      <div class="course-right">
        <span class="page-font5">查看全部&nbsp;&rarr;</span>
      </div>
      <div class="course-content">
        <div class="course-free">
          <img class="course-freeimage" src="http://docee.oss-cn-shanghai.aliyuncs.com/www/2021/0609/home/lOCvnG7cxOVfFfERLiDG3F29S42NrCByQdwAHySX.png" />
          <div class="course-text">
            <div class="course-title">
              动线+热区别乱做！中看不中用，入住悔断肠
            </div>
            <div class="course-length">
              入门&nbsp;&nbsp;|&nbsp;&nbsp;<img src="~/images/home/keshi.svg" />
              1课时&nbsp;&nbsp;|&nbsp;&nbsp;<img
                src="~/images/home/fenzhong.svg"
              />
              23分钟
            </div>
            <div class="course-ft">
              <div class="course-price course-price1">
                免费
              </div>
              <div class="course-price course-price1 course-invisibile">
                <span>开始学习</span><img src="~/images/home/arrow.svg" />
              </div>
            </div>
          </div>
        </div>
        <div class="course-free">
          <img class="course-freeimage" src="http://docee.oss-cn-shanghai.aliyuncs.com/www/2021/0609/home/lOCvnG7cxOVfFfERLiDG3F29S42NrCByQdwAHySX.png" />
          <div class="course-text">
            <div class="course-title">
              免费设计和¥1000/m2的设计师区别在哪？一个视频让你明白
            </div>
            <div class="course-length">
              入门&nbsp;&nbsp;|&nbsp;&nbsp;<img src="~/images/home/keshi.svg" />
              1课时&nbsp;&nbsp;|&nbsp;&nbsp;<img
                src="~/images/home/fenzhong.svg"
              />
              23分钟
            </div>
            <div class="course-ft">
              <div class="course-price course-price1">
                免费
              </div>
              <div class="course-price course-price1 course-invisibile">
                <span>开始学习</span><img src="~/images/home/arrow.svg" />
              </div>
            </div>
          </div>
        </div>
        <div class="course-free">
          <img class="course-freeimage" src="http://docee.oss-cn-shanghai.aliyuncs.com/www/2021/0609/home/lOCvnG7cxOVfFfERLiDG3F29S42NrCByQdwAHySX.png" />
          <div class="course-text">
            <div class="course-title">
              U型厨房要注意，台面过窄是禁忌！
            </div>
            <div class="course-length">
              入门&nbsp;&nbsp;|&nbsp;&nbsp;<img src="~/images/home/keshi.svg" />
              1课时&nbsp;&nbsp;|&nbsp;&nbsp;<img
                src="~/images/home/fenzhong.svg"
              />
              7分钟
            </div>
            <div class="course-ft">
              <div class="course-price course-price1">
                免费
              </div>
              <div class="course-price course-price1 course-invisibile">
                <span>开始学习</span><img src="~/images/home/arrow.svg" />
              </div>
            </div>
          </div>
        </div>
        <div class="course-free">
          <img class="course-freeimage" src="http://docee.oss-cn-shanghai.aliyuncs.com/www/2021/0609/home/lOCvnG7cxOVfFfERLiDG3F29S42NrCByQdwAHySX.png" />
          <div class="course-text">
            <div class="course-title">
              时代变了！乱画平面图也叫设计师吗？
            </div>
            <div class="course-length">
              入门&nbsp;&nbsp;|&nbsp;&nbsp;<img src="~/images/home/keshi.svg" />
              1课时&nbsp;&nbsp;|&nbsp;&nbsp;<img
                src="~/images/home/fenzhong.svg"
              />
              17分钟
            </div>
            <div class="course-ft">
              <div class="course-price course-price1">
                免费
              </div>
              <div class="course-price course-price1 course-invisibile">
                <span>开始学习</span><img src="~/images/home/arrow.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="course-list">
        <span class="page-font3">家计划体系课</span
        ><span class="page-font4 course-left">户型布局</span
        ><span class="page-font5 course-left">软装设计</span>
      </div>
      <div class="course-right">
        <span class="page-font5">查看全部&nbsp;&rarr;</span>
      </div>
      <div class="course-content">
        <div class="course-charge">
          <img class="course-chargeimage" src="http://docee.oss-cn-shanghai.aliyuncs.com/www/2021/0609/home/bShQqj7VqrprAbqjm8yBTo0fObHsxgCmF4DjDKIj.png" />
          <div class="course-text">
            <div class="course-title">
              体系课 - 家·软装进行时
            </div>
            <div class="course-length">
              入门&nbsp;&nbsp;|&nbsp;&nbsp;<img src="~/images/home/keshi.svg" />
              1课时&nbsp;&nbsp;|&nbsp;&nbsp;<img
                src="~/images/home/fenzhong.svg"
              />
              23分钟
            </div>
            <div class="course-ft">
              <div class="course-price course-price2">
                ¥399.90<span class="course-price3">¥599.90</span>
              </div>
              <div class="course-price course-price2 course-invisibile">
                <span>开始学习</span><img src="~/images/home/arrow.svg" />
              </div>
            </div>
          </div>
        </div>
        <div class="course-charge">
          <img class="course-chargeimage" src="http://docee.oss-cn-shanghai.aliyuncs.com/www/2021/0609/home/g4KiMud7LtTeaNdYg8NCdlYxJgyWpE5N0T9vTXoh.png" />
          <div class="course-text">
            <div class="course-title">
              体系课 - 家·平面布局的小秘密
            </div>
            <div class="course-length">
              入门&nbsp;&nbsp;|&nbsp;&nbsp;<img src="~/images/home/keshi.svg" />
              1课时&nbsp;&nbsp;|&nbsp;&nbsp;<img
                src="~/images/home/fenzhong.svg"
              />
              23分钟
            </div>
            <div class="course-ft">
              <div class="course-price course-price2">
                ¥399.90<span class="course-price3">¥599.90</span>
              </div>
              <div class="course-price course-price2 course-invisibile">
                <span>开始学习</span><img src="~/images/home/arrow.svg" />
              </div>
            </div>
          </div>
        </div>
        <div class="course-charge">
          <img class="course-chargeimage" src="http://docee.oss-cn-shanghai.aliyuncs.com/www/2021/0609/home/bShQqj7VqrprAbqjm8yBTo0fObHsxgCmF4DjDKIj.png" />
          <div class="course-text">
            <div class="course-title">
              体系课 - 家·软装进行时
            </div>
            <div class="course-length">
              入门&nbsp;&nbsp;|&nbsp;&nbsp;<img src="~/images/home/keshi.svg" />
              1课时&nbsp;&nbsp;|&nbsp;&nbsp;<img
                src="~/images/home/fenzhong.svg"
              />
              7分钟
            </div>
            <div class="course-ft">
              <div class="course-price course-price2">
                ¥399.90<span class="course-price3">¥599.90</span>
              </div>
              <div class="course-price course-price2 course-invisibile">
                <span>开始学习</span><img src="~/images/home/arrow.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="course-xueshe container-1180">
        <span>斗西家学社&nbsp;&rarr;</span>
      </div>
    </div> -->
    <div class="plango-section container-1180">
      <div class="bigtitle">
        <span class="page-font1 title">Plan Go</span
        ><span class="page-font2"
          >满足设计师的专业需求，同时小白也可轻松上手</span
        >
      </div>
      <div class="plango-content">
        <div class="plango-img">
          <img class="plango-img" :src="plangoUrl[plangoIndex]" />
        </div>
        <div class="plango-text">
          <div
            class="plango-sub"
            @mouseover="handleChangePlangoIndex(0)"
            :style="[plangoIndex === 0 ? 'background: #EAFAF2;' : ''] + ''"
          >
            <img
              class="plango-grey"
              :style="[plangoIndex === 0 ? 'filter: none' : ''] + ''"
              src="~/images/home/huxing.svg"
            />
            <div class="plango-subwidth">
              <div
                class="plango-subtext"
                :style="[plangoIndex === 0 ? 'color: #14AF64;' : ''] + ''"
              >
                户型精准匹配
              </div>
              <span class="plango-hoversub" v-if="plangoIndex === 0"
                >跟你的家绝配</span
              >
            </div>
          </div>
          <div
            class="plango-sub"
            @mouseover="handleChangePlangoIndex(1)"
            :style="[plangoIndex === 1 ? 'background: #EAFAF2;' : ''] + ''"
          >
            <img
              class="plango-grey"
              :style="[plangoIndex === 1 ? 'filter: none' : ''] + ''"
              src="~/images/home/moxing.svg"
            />
            <div class="plango-subwidth">
              <span
                class="plango-subtext"
                :style="[plangoIndex === 1 ? 'color: #14AF64;' : ''] + ''"
                >海量模型均可购买</span
              >
              <span class="plango-hoversub" v-if="plangoIndex === 1"
                >真的很多件，件件「超」美线</span
              >
            </div>
          </div>
          <div
            class="plango-sub"
            @mouseover="handleChangePlangoIndex(2)"
            :style="[plangoIndex === 2 ? 'background: #EAFAF2;' : ''] + ''"
          >
            <img
              class="plango-grey"
              :style="[plangoIndex === 2 ? 'filter: none' : ''] + ''"
              src="~/images/home/yusuan.svg"
            />
            <div class="plango-subwidth">
              <span
                class="plango-subtext"
                :style="[plangoIndex === 2 ? 'color: #14AF64;' : ''] + ''"
                >预算实时可见</span
              >
              <span class="plango-hoversub" v-if="plangoIndex === 2"
                >装修预算精准掌握</span
              >
            </div>
          </div>
          <div
            class="plango-sub"
            @mouseover="handleChangePlangoIndex(3)"
            :style="[plangoIndex === 3 ? 'background: #EAFAF2;' : ''] + ''"
          >
            <img
              class="plango-grey"
              :style="[plangoIndex === 3 ? 'filter: none' : ''] + ''"
              src="~/images/home/qingdan.svg"
            />
            <div class="plango-subwidth">
              <span
                class="plango-subtext"
                :style="[plangoIndex === 3 ? 'color: #14AF64;' : ''] + ''"
                >即刻生成购买清单</span
              >
              <span class="plango-hoversub" v-if="plangoIndex === 3"
                >照着清单买，设计落地马上来</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="prize-section container-1180">
      <div class="bigtitle">
        <span class="page-font1 prize-padding">见证我们的团队实力</span>
      </div>
      <div class="prize">
        <div class="prize-text">
          <div class="prize-sel" @mouseover="handleChangePrizeIndex(0)">
            <img
              class="prize-indisplay"
              src="~/images/home/bigarrow.svg"
            />FRAME 刊登
          </div>
          <div class="prize-sel" @mouseover="handleChangePrizeIndex(1)">
            <img
              class="prize-indisplay"
              src="~/images/home/bigarrow.svg"
            />艾特金奖
          </div>
          <div class="prize-sel" @mouseover="handleChangePrizeIndex(2)">
            <img
              class="prize-indisplay"
              src="~/images/home/bigarrow.svg"
            />艾鼎银奖
          </div>
          <div class="prize-sel" @mouseover="handleChangePrizeIndex(3)">
            <img
              class="prize-indisplay"
              src="~/images/home/bigarrow.svg"
            />FRAME Awards 2019
          </div>
        </div>
        <div class="prize-container">
          <img
            :class="[prizeIndex === 0 ? isBig : isSmall, 'prize-position1']"
            src="~/images/home/itafe.png"
          />
          <img
            :class="[prizeIndex === 1 ? isBig : isSmall, 'prize-position2']"
            src="http://docee.oss-cn-shanghai.aliyuncs.com/www/2021/0609/home/cysksK7fFt4CUjIGoJpaQJHRo8IaoOM4mOdbtDwS.png"
          />
          <img
            :class="[prizeIndex === 2 ? isBig : isSmall, 'prize-position3']"
            src="http://docee.oss-cn-shanghai.aliyuncs.com/www/2021/0609/home/72K1OeTRYEpW0hEunvIU8PaRHYx8N9izAV7fwl4Q.png"
          />
          <img
            :class="[prizeIndex === 3 ? isBig : isSmall, 'prize-position4']"
            src="http://docee.oss-cn-shanghai.aliyuncs.com/www/2021/0609/home/fBqH1ueo4ULxHNkgKQJqwwIo1VEi6fY31QPZS5v7.png"
          />
        </div>
      </div>
    </div>
    <div class="feedback-section">
      <div class="feedback">
        <span class="page-font1 title">学员对我们的认可</span
        ><span class="page-font2">体验了我们课程的学员这样说</span>
      </div>
      <div class="feedback-content">
        <swiper ref="mySwiper" :options="swiperOptions">
          <swiper-slide
            class="feedback-subcontainer"
            v-for="(item, key) of feedbacks"
            :key="key"
          >
            <div class="feedback-comment">
              {{ item.content }}
            </div>
            <div class="feedback-triangle1"></div>
            <div class="feedback-triangle2"></div>
            <div class="feedback-user">
              <div class="feedback-username">
                <span class="page-font4">{{ item.user.nickname }}</span
                ><br /><span class="page-font6">{{ item.termName }}</span>
              </div>
              <img class="feedback-avatar" :src="item.user.avatar_url" />
            </div>
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
import sofaSVG from "images/home/sofa.svg";
import chairSVG from "images/home/chair.svg";
import cabinetSVG from "images/home/cabinet.svg";
import tableSVG from "images/home/table.svg";
import bedSVG from "images/home/bed.svg";
import { feedbacks } from "utils/feedbacks.js";

export default {
  data() {
    return {
      feedbacks,
      imgIndex: "0",
      imagesUrl: [sofaSVG, chairSVG, cabinetSVG, tableSVG, bedSVG],
      timer: "",

      plangoIndex: "0",
      plangoUrl: [
        "http://docee.oss-cn-shanghai.aliyuncs.com/www/2021/0609/home/oEJ6gG8uqScuTGt1OjELpT0Sv5xk3x62PEw1Qutb.png",
        "http://docee.oss-cn-shanghai.aliyuncs.com/www/2021/0609/home/bu6rP8BC8t7lOLJtlYM9CQebnSokHgDqZfF1vjjC.png",
        "http://docee.oss-cn-shanghai.aliyuncs.com/www/2021/0609/home/aXw4rpSFTBMreyG8IxXDR72U9fshWkQqy6uEfdEh.png",
        "http://docee.oss-cn-shanghai.aliyuncs.com/www/2021/0609/home/JhAW6XZpqyDKHOvnca86ml842Zc8H9myN0WHs72i.png"
      ],

      prizeIndex: null,
      isBig: "prize-scale",
      isSmall: "prize-img",
      swiperOptions: {
        slidesPerView: "auto",
        slidesPerGroup: 1,
        spaceBetween: 0
      }
    };
  },

  //
  mounted() {
    (this.timer = setInterval(() => {
      this.handleNext();
    }, 1000)),
      this.handleChangePlangoIndex(0);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    handleNext() {
      if (this.imgIndex == this.imagesUrl.length - 1) {
        this.imgIndex = 0;
      } else {
        this.imgIndex++;
      }
    },

    handleChangePlangoIndex(index) {
      this.plangoIndex = index;
    },

    handleChangePrizeIndex(index) {
      this.prizeIndex = index;
    }
  }
};
</script>

<style type="text/css" lang="less" scoped>
.page-body {
  display: block;
  background-color: white;
  .bigtitle {
    margin: 120px auto 70px auto;
    text-align: center;
  }

  .title {
    margin: 0px auto 16px;
  }

  .page-font1 {
    display: block;
    font-weight: 600;
    font-size: 48px;
    line-height: 62px;
    color: #2c3330;
  }

  .page-font2 {
    line-height: 24px;
    font-weight: normal;
    font-size: 18px;
    color: #606c66;
  }

  .page-font3 {
    line-height: 48px;
    font-weight: 600;
    font-size: 36px;
    color: #2c3330;
  }

  .page-font4 {
    line-height: 24px;
    font-weight: 600;
    font-size: 16px;
    color: #2c3330;
  }

  .page-font5 {
    line-height: 24px;
    font-weight: normal;
    font-size: 16px;
    color: #81948b;
  }

  .page-font6 {
    line-height: 24px;
    font-weight: normal;
    font-size: 14px;
    color: #81948b;
  }
}
.container-1180 {
  width: 1180px;
  margin: 0 auto;
}

.slogan-section {
  margin-top: 70px;
  .slogan-content {
    margin-bottom: 70px;

    .slogan-content-hd {
      display: flex;
      justify-content: space-between;

      .slogan-left {
        display: inline-block;
        width: 700px;
        height: 161px;
        line-height: 78px;
        vertical-align: middle;
        font-style: normal;
        font-weight: 600;
        font-size: 72px;
        letter-spacing: 0.01em;
        color: #2c3330;

        .slogan-down {
          display: flex;
          height: 80px;

          .slogan-container {
            display: inline-block;
            padding-bottom: 3px;
            line-height: 80px;
            height: 95px;
            color: #14af64;
            border-bottom: 8px solid #14af64;
          }
        }
      }
      .slogan-middle {
        display: inline-flex;
        align-items: center;
        height: 160px;
        line-height: 42px;
        padding-left: 34px;
        margin-left: -15px;
        border-left: 2px solid;
        font-weight: normal;
        font-size: 32px;
        color: #2c3330;
      }

      .slogan-right {
        position: relative;
        width: 160px;
        height: 160px;

        .slogan-circle {
          position: relative;
          animation: rotate 10s linear infinite;
        }
        @keyframes rotate {
          0% {
            transform: rotateZ(0deg);
          }
          100% {
            transform: rotateZ(360deg);
          }
        }
      }

      .slogan-icon {
        position: absolute;
        top: 30%;
        left: 30%;
        width: 60px;
        height: 60px;
      }
    }

    .slogan-img {
      width: 1180px;
      height: 700px;
      margin-top: 84px;
      margin-bottom: 120px;
    }
  }
}

.people-section {
  .people-title {
    margin-bottom: 72px;
    text-align: center;
  }
  .people-space {
    margin: 0 333px;
  }
  .people-img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 19px 0;
  }
}

// .course-section {
//   .course-left {
//     margin-left: 40px;
//   }

//   .course-content {
//     display: flex;
//     justify-content: space-between;
//   }

//   .course-right {
//     float: right;
//     display: flex;
//     align-items: center;
//     margin-top: 128px;
//     margin-bottom: 31px;
//   }

//   .course-list {
//     display: inline-flex;
//     align-items: center;
//     margin-top: 120px;
//     margin-bottom: 31px;
//   }

//   .course-text {
//     padding: 17px;
//   }

//   .course-free {
//     width: 280px;
//     height: 318px;
//     border: 1px solid #efefef;
//   }

//   .course-free:hover {
//     width: 280px;
//     height: 318px;
//     border: 1px solid #efefef;
//     box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
//     cursor: pointer;
//   }

//   .course-ft {
//     display: flex;
//     justify-content: space-between;
//   }

//   .course-freeimage {
//     width: 278px;
//     height: 156px;
//   }

//   .course-chargeimage {
//     width: 378px;
//     height: 224px;
//   }
//   .course-title {
//     line-height: 24px;

//     font-weight: 600;
//     font-size: 16px;
//     color: #2c3330;
//   }

//   .course-length {
//     display: flex;
//     align-items: center;
//     margin-top: 8px;
//     line-height: 24px;

//     font-weight: normal;
//     font-size: 14px;
//     color: #8ea098;
//   }

//   .course-price {
//     line-height: 24px;
//     font-style: normal;
//     font-weight: 600;
//     font-size: 16px;
//     color: #14af64;
//   }

//   .course-price1 {
//     margin-top: 24px;
//   }

//   .course-price2 {
//     display: inline-block;
//     margin-top: 16px;
//   }

//   .course-price3 {
//     margin-left: 4px;
//     margin-bottom: 17px;
//     line-height: 24px;
//     font-weight: normal;
//     font-size: 14px;
//     text-decoration-line: line-through;
//     color: #8ea098;
//   }

//   .course-invisibile {
//     display: flex;
//     visibility: hidden;
//     align-items: flex-start;
//   }
//   .course-charge {
//     width: 380px;
//     height: 354px;
//     border: 1px solid #efefef;
//     box-sizing: border-box;
//   }

//   .course-charge:hover {
//     width: 380px;
//     height: 354px;
//     border: 1px solid #efefef;
//     box-sizing: border-box;
//     box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
//     cursor: pointer;
//   }

//   .course-charge:hover .course-invisibile {
//     visibility: visible;
//   }

//   .course-free:hover .course-invisibile {
//     visibility: visible;
//   }

//   .course-xueshe {
//     display: flex;
//     align-items: center;
//     width: 204px;
//     line-height: 24px;
//     margin: 80px auto;
//     padding: 16px 48px;
//     font-weight: normal;
//     font-size: 16px;
//     color: #2c3330;
//     border: 1px solid #2c3330;
//     cursor: pointer;
//     &:hover {
//       color: white;
//       background-color: #2c3330;
//     }
//   }
// }

.plango-section {
  .plango-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .plango-img {
      position: relative;
      display: inline-block;
      width: 779px;
      height: 496px;
    }
    .plango-text {
      display: inline;
      float: right;

      .plango-sub {
        width: 379px;
        height: 84px;
        padding-left: 20px;
        display: flex;
        align-items: center;
        cursor: pointer;
        .plango-grey {
          filter: grayscale(1) opacity(0.6);
        }
        .plango-subwidth {
          width: 200px;

          .plango-subtext {
            display: block;
            margin-left: 12px;
            line-height: 32px;
            font-weight: 600;
            font-size: 20px;
            color: #2c3330;
            cursor: pointer;
          }

          .plango-hoversub {
            margin-left: 12px;
            line-height: 20px;
            font-weight: normal;
            font-size: 14px;
            color: #606c66;
          }
        }
      }
    }
  }
}

.prize-section {
  .prize-padding {
    padding-top: 80px;
    padding-bottom: 0px;
  }
  .prize {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .prize-text {
      display: inline;
      line-height: 64px;
      font-size: 32px;
      font-weight: 400;
      color: #606c66;

      .prize-sel {
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          line-height: 64px;
          font-weight: normal;
          font-size: 32px;
          color: #2c3330;
          .prize-indisplay {
            display: inline;
          }
        }

        .prize-indisplay {
          display: none;
        }
      }
    }

    .prize-container {
      position: relative;
      margin-right: 95px;
      width: 425px;
      height: 425px;

      .prize-position1 {
        position: absolute;
      }

      .prize-position2 {
        position: absolute;
        left: 220px;
      }

      .prize-position3 {
        position: absolute;
        top: 220px;
      }

      .prize-position4 {
        position: absolute;
        left: 220px;
        top: 220px;
      }

      .prize-img {
        width: 150px;
        height: 150px;
      }

      .prize-scale {
        width: 150px;
        height: 150px;
        transform: scale(1.5);
        transition: transform 0.2s;
      }
    }
  }
}

.feedback-section {
  .feedback {
    margin: 100px auto 72px;
    text-align: center;
  }

  .feedback-content {
    position: relative;
    margin: 0 auto;
    height: 500px;

    .feedback-subcontainer {
      margin: 0px 10px;
      width: 382px;
      cursor: grab;

      .feedback-comment {
        display: inline-block;
        width: 382px;
        padding: 24px;
        line-height: 24px;
        font-weight: normal;
        font-size: 14px;
        letter-spacing: 1px;
        color: #2c3330;
        border: 1px solid #efefef;
        background: #fafafa;
        cursor: grab;
      }

      .feedback-triangle1 {
        position: absolute;
        left: 366px;
        width: 0;
        height: 0;
        border-top: 16px solid#EFEFEF;
        border-left: 16px solid transparent;
      }

      .feedback-triangle2 {
        position: relative;
        top: -1px;
        left: 366px;
        width: 0;
        height: 0;
        border-top: 15px solid #fafafa;
        border-left: 15px solid transparent;
      }

      .feedback-user {
        margin-top: 17px;
        width: 385px;
        text-align: right;

        .feedback-username {
          display: inline-block;
          margin-right: 16px;
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
