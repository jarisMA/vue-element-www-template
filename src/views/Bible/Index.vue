<template>
  <div class="bible-page">
    <div class="bible-page-wrapper"></div>
    <div class="bible-top">
      <div class="bible-top-center">
        <img
          src="~images/bible/title.svg"
          width="380"
          height="80"
          class="bible-title"
        />
        <img
          src="~images/bible/desc.svg"
          width="290"
          height="70"
          class="bible-desc"
        />
        <div class="bible-person-wrapper">
          <img
            src="~images/bible/person.svg"
            width="220"
            height="278"
            class="bible-person"
          />
          <div class="bible-person-shadow"></div>
        </div>
        <img
          src="~images/bible/dialog_1.png"
          width="404"
          height="108"
          class="bible-dialog_1"
        />
        <img
          src="~images/bible/dialog_2.png"
          width="402"
          height="104"
          class="bible-dialog_2"
        />
      </div>
    </div>
    <div class="bible-bottom">
      <ul class="bible-list">
        <li
          :class="['bible-item', bible.status === 0 ? 'gray' : '']"
          v-for="bible of bibles"
          :key="bible.id"
          @click="bibleClick(bible)"
        >
          <div class="bible-book">
            <icon-svg
              svg-class="book-svg"
              svg-name="book"
              :style="{ fill: bible.color + ' !important' }"
            ></icon-svg>
            <div class="bible-book-content">
              <div class="bible-book-title">
                {{ bible.name }}
              </div>
              <div class="bible-book-desc">
                <p
                  v-for="(desc, key) of bible.description.split('\n') || []"
                  :key="key"
                >
                  {{ desc }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="bible-cover"
            :style="{ backgroundImage: `url(${bible.cover_url})` }"
          ></div>
        </li>
      </ul>
    </div>
    <el-dialog
      class="bible-dialog"
      width="788px"
      :visible.sync="visible"
      :show-close="false"
    >
      <div class="bible-dialog-body">
        <div v-if="activeBible.status === 0">
          <p>随着学习的精进，</p>
          <p>宝典会渐渐打开的....</p>
        </div>
        <div v-if="activeBible.status === 2 && !isVip()">
          <p>对不起少年，</p>
          <p>此宝典只对门下学徒开放....</p>
        </div>
      </div>
      <div class="bible-dialog-footer">
        <div class="confirm-btn" @click="visible = false">知道了</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import bibleService from "service/bible";
import { mapMutations, mapState } from "vuex";
import { isVip } from "utils/function";
import { goBibleDetail } from "utils/routes";

export default {
  name: "BibleIndex",
  data() {
    return {
      loading: true,
      bibles: [],
      visible: false,
      activeBible: {}
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  created() {
    this.getData();
  },
  methods: {
    ...mapMutations(["UPDATA_LOGINDIAL_VISIBLE"]),
    isVip,
    getData() {
      this.loading = true;
      bibleService
        .bibles()
        .then(bibles => {
          this.bibles = bibles;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    bibleClick(bible) {
      if (!this.userInfo) {
        this.UPDATA_LOGINDIAL_VISIBLE(1);
      }
      this.activeBible = bible;
      if (bible.status === 0) {
        this.visible = true;
        return;
      }
      if ((bible.status === 2 && isVip()) || bible.status === 1) {
        goBibleDetail(bible.id);
      }
      if (bible.status === 2 && !isVip()) {
        this.visible = true;
        return;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.bible-page {
  position: relative;
  min-height: 1150px;
  background-image: linear-gradient(
    to bottom,
    #fefedf,
    #fbf8da,
    #efe9df,
    #e8d8cb,
    #dcccbb
  ) !important;
  .bible-page-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("~images/bible/point.png") repeat;
    mix-blend-mode: overlay;
    opacity: 0.2;
  }
  &::before,
  &::after {
    position: absolute;
    bottom: 0;
    background-size: cover;
    background-repeat: no-repeat;
    content: "";
    z-index: 1;
  }
  &::before {
    left: 0;
    width: 790px;
    height: 205px;
    background-image: url("~images/bible/cloud_1.png");
  }
  &::after {
    right: 0;
    width: 749px;
    height: 230px;
    background-image: url("~images/bible/cloud_2.png");
  }
  .bible-top {
    position: relative;
    width: 100%;
    height: 664px;
    &::before,
    &::after {
      position: absolute;
      background-size: cover;
      background-repeat: no-repeat;
      content: "";
    }
    &::before {
      top: 80px;
      left: 176px;
      width: 330px;
      height: 136px;
      background-image: url("~images/bible/cloud_3.png");
    }
    &::after {
      bottom: 36px;
      right: 264px;
      width: 268px;
      height: 100px;
      background-image: url("~images/bible/cloud_4.png");
    }
    .bible-top-center {
      position: relative;
      width: 958px;
      margin: 42px auto 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      .bible-desc {
        margin-top: 3px;
      }
      .bible-person-wrapper {
        margin-top: 93px;
        .bible-person-shadow {
          margin: 3px auto;
          width: 134px;
          height: 26px;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 50%;
        }
      }
      .bible-dialog_1,
      .bible-dialog_2 {
        position: absolute;
      }
      .bible-dialog_1 {
        top: 265px;
        left: 0;
      }
      .bible-dialog_2 {
        top: 319px;
        right: 0;
      }
    }
  }
  .bible-bottom {
    .bible-list {
      display: flex;
      width: 1064px;
      margin: auto;
    }
    .bible-item {
      position: relative;
      width: 126px;
      height: 178px;
      cursor: pointer;
      transition: all 0.5s;
      .bible-cover {
        width: 126px;
        height: 150px;
        background-size: cover;
        background-repeat: no-repeat;
        transition: all 0.5s;
      }
      .bible-book {
        position: absolute;
        top: 0;
        left: 50%;
        width: 340px;
        height: 222px;
        transform: translateX(-50%) scale(0.1);
        transition: all 0.5s;
        opacity: 0;
        overflow: hidden;
        .book-svg {
          position: absolute;
          top: -70px;
          left: -15px;
          font-size: 370px;
          fill: red !important;
        }
        .bible-book-content {
          position: relative;
          padding: 40px 55px;
          .bible-book-title {
            margin-bottom: 10px;
            font-size: 20px;
            font-weight: 600;
            color: #333333;
            line-height: 28px;
            text-align: center;
          }
          .bible-book-desc {
            p {
              line-height: 20px;
              font-size: 14px;
              font-weight: 400;
              color: #333333;
            }
          }
        }
      }
      &::after {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 66px;
        height: 16px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        transform: translateX(-50%);
        content: "";
      }
      &:hover {
        .bible-cover {
          transform: translateY(-20px);
        }
        .bible-book {
          opacity: 1;
          top: -242px;
          transform: translateX(-50%) scale(1);
        }
        &::after {
          width: 50px;
        }
      }
      &.gray {
        .bible-cover {
          position: relative;
          filter: grayscale(1);
          &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 126px;
            height: 150px;
            content: "";
            background-image: url("~images/bible/dashed.svg");
            background-size: cover;
            background-repeat: no-repeat;
            z-index: 10;
          }
        }
      }
    }
  }
  /deep/ .bible-dialog {
    .el-dialog {
      background: transparent;
      box-shadow: unset;
    }
    .el-dialog__header {
      display: none;
    }
    .bible-dialog-body {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 170px;
      width: 788px;
      height: 430px;
      background: url("~images/bible/dialog_bg.png") no-repeat;
      background-size: cover;
      p {
        font-size: 30px;
        font-weight: 600;
        color: #000000;
        line-height: 50px;
        text-align: center;
      }
    }
    .bible-dialog-footer {
      width: 100%;
      .confirm-btn {
        margin-left: 292px;
        width: 206px;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        font-weight: 500;
        color: #ffffff;
        text-align: center;
        background: #14af64;
        border: 3px solid #000000;
        cursor: pointer;
      }
    }
  }
}
</style>
