<template>
  <div class="task-content">
    <div class="container-1180">
      <div class="container-left">
        <div class="banner-section">
          <div class="banner-title">
            <div class="banner-title-wrap common-ladder-2">
              何为斗西设计团？
              <div class="common-ladder-2__block"></div>
            </div>
          </div>
          <div class="banner-cotent-wrap common-ladder-2">
            <div class="common-ladder-2__block"></div>
            <div class="banner-description">
              <div class="banner-description-wrap common-ladder-2">
                <div class="common-ladder-2__block"></div>
                成员来自全国各地，是一群认可斗西的价值观和设计观的志同道合者<br />
                当中有多年经验的资深设计师，也有经过斗西训练营洗礼的优秀毕业生<br />
                所有成员能力都经斗西审核认证，并持续受斗西团队监督，以独立设计师的身份接受委派任务。
              </div>
            </div>
            <div class="banner-btn" @click="goTaskJoin">
              申请加入
            </div>
          </div>
        </div>
        <div class="card-section" v-loading="loading">
          <task-card v-for="item of taskList" :key="item.uuid" :task="item" />
        </div>
      </div>
      <div class="container-right">
        <div class="user-section">
          <div class="user-section-wrap common-ladder-2">
            <div class="common-ladder-2__block"></div>
            <div class="user-content">
              <div class="user-content-left">
                <img
                  v-if="userInfo && userInfo.id"
                  :src="userInfo.avatar_url"
                  alt=""
                  class="user-content__img"
                />
                <img
                  v-else
                  class="user-content__img--logout"
                  src="~images/task/index-user-logout.png"
                  alt=""
                />
              </div>
              <div class="user-content-right">
                <template v-if="userInfo && userInfo.id">
                  <div class="user-content__name">
                    {{ userInfo.nickname || userInfo.realname }}
                  </div>
                  <div class="user-content__level" v-if="!userInfo.is_designer">
                    <i
                      class="user-content__level-icon user-content__no-level--icon"
                    ></i>
                    <span class="user-content__level-text" @click="goTaskJoin"
                      >加入设计团</span
                    >
                  </div>
                  <div class="user-content__level" v-if="userInfo.is_designer">
                    <i class="user-content__level-icon"></i>
                  </div>
                </template>
                <template v-else>
                  <div class="user-content__name">
                    未登录
                  </div>
                  <div class="user-content__level">
                    <span class="user-content__level-text" @click="wxLogin"
                      >点击注册/登录</span
                    >
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="step-section">
          <div class="step-section-wrap common-ladder-2">
            <div class="common-ladder-2__block"></div>
            <div class="step-content">
              <div class="step-content__header">
                <span class="header__title">工作指南</span>
                <span class="header__all"
                  >查看全部<i class="header__all-icon"></i
                ></span>
              </div>
              <div class="step-content__body">
                <div class="step-list">
                  <div
                    class="step-item"
                    v-for="step in STEP_LIST"
                    :key="step.id"
                  >
                    <div class="stem-item__num">{{ step.id }}</div>
                    <div class="stem-item__text">{{ step.name }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { goTaskJoin } from "utils/routes";
import TaskCard from "./widgets/TaskCard.vue";
import taskService from "@/global/service/task";
export default {
  name: "Task",
  components: {
    TaskCard
  },
  data() {
    return {
      loading: false,
      STEP_LIST,
      taskList: [
        {
          uuid: "",
          name: "",
          level: null,
          cover_url: "",
          bid_type: null,
          bid_type_label: "",
          status: null,
          status_label: "",
          created_at: "",
          end_at: "",
          price: "",
          urgent_price: "",
          experience_point: null,
          city: {
            city: {
              id: null,
              name: ""
            },
            province: {
              id: null,
              name: ""
            },
            layout: {
              type1: null,
              type2: null,
              type3: null
            },
            square: null,
            max_apply: null
          }
        }
      ]
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      taskService
        .taskList({ page_size: 30 })
        .then(res => {
          this.taskList = res.list;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    goTaskJoin() {
      if (!this.userInfo) {
        return this.wxLogin();
      }
      goTaskJoin();
    },
    wxLogin() {
      this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", 1);
    }
  }
};
const STEP_LIST = [
  {
    id: 1,
    name: "申请加入「斗西设计团」",
    url: ""
  },
  {
    id: 2,
    name: "阅读 工作指南",
    url: ""
  },
  {
    id: 3,
    name: "领取任务 "
  },
  {
    id: 4,
    name: "提交方案"
  },
  {
    id: 5,
    name: "方案评审以及入围公示"
  },
  {
    id: 6,
    name: "业主选择心仪方案，中标公示"
  },
  {
    id: 7,
    name: "中标方案深化，最终交付"
  },
  {
    id: 8,
    name: "款项结算"
  }
];
</script>

<style lang="less" scoped>
.task-content {
  width: 100%;
  height: 100%;
  padding: 100px 0;
  background: #fafafa;
  .container-1180 {
    width: 1180px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .container-left {
      width: 780px;
      .banner-section {
        position: relative;
        height: 310px;
        .banner-title {
          position: absolute;
          top: -11px;
          left: 50%;
          transform: translateX(-50%);
          width: 232px;
          height: 42px;
          font-weight: 600;
          font-size: 24px;
          text-align: center;
          line-height: 38px;
          color: #000000;
          z-index: 8;
          .banner-title-wrap {
            width: 100%;
            height: 100%;
            border: 2px solid #e9e9e9;
            background: #fcc400;
          }
        }
        .banner-cotent-wrap {
          width: 100%;
          height: 100%;
          border: 2px solid #e9e9e9;
          background-color: #ffe2c6;
        }
        .banner-description-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          border: 2px solid #e9e9e9;
          background-color: #ffffff;
        }
        .banner-description {
          height: 184px;
          padding: 0 14px;
          margin: 55px 26px 0 26px;
          font-weight: 600;
          font-size: 14px;
          line-height: 28px;
          text-align: center;
        }
        .banner-btn {
          position: relative;
          bottom: 15px;
          margin: 0 auto;
          width: 228px;
          height: 52px;
          background: url("~images/task/index-banner-btn.png") no-repeat;
          background-size: 228px 52px;
          line-height: 52px;
          font-weight: 600;
          font-size: 18px;
          color: #fff;
          text-align: center;
          cursor: pointer;
        }
      }
    }
    .container-right {
      width: 380px;
      .user-section {
        height: 130px;
        margin-bottom: 20px;
        .user-section-wrap {
          width: 100%;
          height: 100%;
          border: 2px solid #e9e9e9;
          .user-content {
            display: flex;
            align-items: center;
            height: 100%;
            padding-left: 22px;
            padding-right: 22px;
            .user-content-left {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 84px;
              height: 84px;
              border: 2px solid #2b252f;
              background-color: #e3e3e3;
              margin-right: 17px;
              clip-path: polygon(
                0 2px,
                2px 2px,
                2px 0,
                calc(100% - 2px) 0,
                calc(100% - 2px) 2px,
                100% 2px,
                100% calc(100% - 2px),
                calc(100% - 2px) calc(100% - 2px),
                calc(100% - 2px) 100%,
                2px 100%,
                2px calc(100% - 2px),
                0 calc(100% - 2px)
              );
              .user-content__img {
                display: inline-block;
                width: 100%;
                height: 100%;
                object-fit: cover;
                vertical-align: middle;
              }
              .user-content__img--logout {
                width: 38px;
                height: 50px;
              }
            }
            .user-content-right {
              .user-content__name {
                margin-bottom: 9px;
                font-size: 24px;
                line-height: 34px;
                color: #000000;
              }
              .user-content__level {
                display: flex;
                height: 40px;
                font-size: 12px;
                line-height: 40px;
                text-decoration-line: underline;
                color: #14af64;
                .user-content__level-text {
                  cursor: pointer;
                }
                .user-content__level-icon {
                  display: inline-block;
                  width: 40px;
                  height: 40px;
                  background: url("~images/task/index-user-no-level.svg")
                    no-repeat;
                  background-size: 40px 40px;
                }
              }
              .user-content__icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
              }
            }
          }
        }
      }
      .step-section {
        height: 442px;
        .step-section-wrap {
          width: 100%;
          height: 100%;
          border: 2px solid #e9e9e9;
        }
        .step-content {
          height: 100%;
          .step-content__header {
            display: flex;
            justify-content: space-between;
            height: 43px;
            padding: 0 28px;
            background-color: #54bf00;
            line-height: 43px;
            .header__title {
              font-weight: 600;
              font-size: 18px;
              color: #000000;
            }
            .header__all {
              font-weight: 600;
              font-size: 12px;
              color: #fff;
              .header__all-icon {
                display: inline-block;
                width: 8px;
                height: 10px;
                margin-left: 12px;
                background: url("~images/task/step-icon.svg") no-repeat;
                background-size: 8px 10px;
              }
            }
          }
          .step-content__body {
            height: 396px;
            .step-list {
              display: flex;
              justify-content: space-between;
              flex-wrap: nowrap;
              flex-direction: column;
              height: 100%;
              padding: 26px 28px;
              .step-item {
                display: flex;
                align-items: center;
                .stem-item__num {
                  width: 26px;
                  height: 26px;
                  border: 2px solid #000000;
                  background-color: #ccbc94;
                  text-align: center;
                  line-height: 22px;
                  -webkit-text-stroke: 1px #000000;
                  color: #ffffff;
                  font-weight: 800;
                  clip-path: polygon(
                    0 2px,
                    2px 2px,
                    2px 0,
                    calc(100% - 2px) 0,
                    calc(100% - 2px) 2px,
                    100% 2px,
                    100% calc(100% - 2px),
                    calc(100% - 2px) calc(100% - 2px),
                    calc(100% - 2px) 100%,
                    2px 100%,
                    2px calc(100% - 2px),
                    0 calc(100% - 2px)
                  );
                }
                .stem-item__text {
                  font-size: 18px;
                  padding-left: 20px;
                }
              }
            }
          }
        }
      }
    }
  }
}
.card-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  .widget-task-card {
    margin-top: 56px;
  }
}
.task-head {
  width: 100%;

  .task-title {
    position: relative;
    display: flex;
    justify-content: center;
    top: 18px;
    padding-top: 8px;
    width: 151px;
    height: 48px;
    font-weight: 600;
    font-size: 14px;
    color: black;
    background-image: url("~images/task/title.svg");
    background-repeat: no-repeat;
    z-index: 1;
  }

  .task-ranking {
    position: relative;
    display: flex;
    padding: 55px 0px 0px 30px;
    width: 780px;
    height: 311px;
    background-image: url("~images/task/head.svg");
    z-index: 2;

    .ranking-left {
      width: 525px;
    }

    .ranking-right {
      position: relative;
      top: -30px;
      height: 185px;
    }
  }
}
</style>
<style lang="less">
.common-ladder-2 {
  position: relative;
  &:before {
    position: absolute;
    top: 0px;
    left: 0px;
    content: "";
    width: 2px;
    height: 2px;
    background-color: #e9e9e9;
  }
  &:after {
    position: absolute;
    top: 0px;
    right: 0px;
    content: "";
    width: 2px;
    height: 2px;
    background-color: #e9e9e9;
  }
  clip-path: polygon(
    0 100%,
    0 4px,
    2px 4px,
    2px 2px,
    4px 2px,
    4px 0,
    calc(100% - 4px) 0,
    calc(100% - 4px) 2px,
    calc(100% - 2px) 2px,
    calc(100% - 2px) 4px,
    100% 4px,
    100% calc(100% - 4px),
    calc(100% - 2px) calc(100% - 4px),
    calc(100% - 2px) calc(100% - 2px),
    calc(100% - 4px) calc(100% - 2px),
    calc(100% - 4px) 100%,
    4px 100%,
    4px calc(100% - 2px),
    2px calc(100% - 2px),
    2px calc(100% - 4px),
    0 calc(100% - 4px)
  );
}
.common-ladder-2__block {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  z-index: -3;
  &:before {
    position: absolute;
    bottom: 0;
    left: 0;
    content: "";
    width: 2px;
    height: 2px;
    background-color: #e9e9e9;
  }
  &:after {
    position: absolute;
    bottom: 0;
    right: 0;
    content: "";
    width: 2px;
    height: 2px;
    background-color: #e9e9e9;
  }
}
</style>
