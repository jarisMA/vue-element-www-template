<template>
  <div class="camp-page" v-loading="loading">
    <div
      class="camp-banner"
      :style="{ backgroundImage: `url(${camp.banner_img_url})` }"
    >
      <div class="container-1180">
        <div class="camp-banner-left">
          <h4 class="camp-banner-slogan ellipsis">
            {{ camp.slogan }}
          </h4>
          <h3 class="camp-banner-title ellipsis">
            {{ camp.name }}
          </h3>
          <div class="camp-banner-left_footer">
            <label class="camp-banner-price">
              <span
                class="camp-banner-price_text"
                :style="{ color: camp.price_color }"
                >¥{{ (term && term.price) || 0 }}</span
              >
              <span class="camp-banner-unit">元</span>
            </label>
            <div
              :class="['camp-banner-btn', status !== 1 ? 'disabled' : '']"
              :style="{ backgroundColor: camp.price_color }"
              @click="status === 1 ? handleRegister() : null"
            >
              {{ campBtnText }}
              <i class="camp-banner-btn_icon" v-if="status === 1"></i>
            </div>
          </div>
        </div>
        <div class="camp-banner-right" v-if="camp.video_url">
          <video
            :src="camp.video_url"
            class="camp-banner-video"
            controls
          ></video>
        </div>
      </div>
    </div>
    <div class="camp-content">
      <div class="container-1180">
        <p v-html="camp.content"></p>
      </div>
    </div>
    <div class="camp-footer" v-if="!loading && term">
      <div class="camp-footer-wrapper">
        <div class="camp-footer-left" style=" backgroundColor: #14AF64 ">
          <h3 class="camp-footer-name ellipsis">{{ camp.name }}</h3>
          <div class="camp-footer-price">
            <span class="camp-footer-price_text"
              >¥{{ (term && term.price) || 0 }}</span
            >
            <span class="camp-footer-unit">元</span>
          </div>
        </div>
        <div class="camp-footer-right">
          <div
            :class="['camp-footer-btn', status !== 1 ? 'disabled' : '']"
            style=" backgroundColor: #7A55FF "
            @click="status === 1 ? handleRegister() : null"
          >
            {{ campBtnText }}
            <i class="camp-footer-btn_icon" v-if="status === 1"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import campService from "service/camp";
import { campMixin } from "./widgets/mixin";

export default {
  name: "AcademyCampDetail",
  mixins: [campMixin],
  data() {
    return {
      loading: true,
      camp: {},
      term: {},
      status: 3
    };
  },
  created() {
    this.getData();
  },
  computed: {
    campBtnText() {
      const status = this.status;
      return status === 1
        ? "立即报名"
        : status === 2
        ? "已开课"
        : "敬请期待...";
    }
  },
  methods: {
    getData() {
      campService
        .camp(this.$route.params.id)
        .then(res => {
          this.camp = res;
          res.term && (this.status = this.campStatus(res.term));
          this.term = res.term;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleRegister() {
      console.log("register");
    }
  }
};
</script>
<style lang="less" scoped>
@import "~styles/variable";

.camp-page {
  position: relative;
  width: 100%;
  min-height: 100%;
  background: #fff !important;
}
.camp-banner {
  width: 100%;
  height: calc(410 / 1920 * 100vw);
  background-repeat: no-repeat;
  background-size: contain;
  .container-1180 {
    position: relative;
    height: 100%;
  }
  .camp-banner-left {
    position: absolute;
    left: 0;
    bottom: 30px;
    width: 680px;
    .camp-banner-slogan {
      width: 100%;
      line-height: 36px;
      font-size: 36px;
      color: #333333;
      opacity: 0.8;
    }
    .camp-banner-title {
      margin-top: 10px;
      width: 100%;
      line-height: 93px;
      font-weight: 800;
      font-size: 64px;
      color: #333333;
    }
    .camp-banner-left_footer {
      margin-top: 54px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .camp-banner-price {
        .camp-banner-price_text {
          line-height: 36px;
          font-weight: 800;
          font-size: 48px;
          color: @primaryColor;
        }
        .camp-banner-unit {
          display: inline-block;
          margin-left: 10px;
          line-height: 16px;
          font-size: 16px;
          color: #333;
        }
      }
      .camp-banner-btn {
        display: flex;
        align-items: center;
        margin-left: 25px;
        padding: 12px 30px;
        line-height: 24px;
        font-weight: 500;
        font-size: 16px;
        color: #fff;
        background: @primaryColor;
        cursor: pointer;
        &:not(.disabled) {
          box-shadow: 0px 4px 8px rgba(155, 0, 255, 0.25);
          backdrop-filter: blur(4px);
        }
        &.disabled {
          background: #ccc !important;
          cursor: default;
        }
        .camp-banner-btn_icon {
          display: inline-block;
          margin-left: 4px;
          width: 24px;
          height: 24px;
          background-image: url("~images/academy/arrow.svg");
          background-size: cover;
          background-repeat: no-repeat;
        }
      }
    }
  }
  .camp-banner-right {
    position: absolute;
    right: 0;
    bottom: -30px;
    width: 476px;
    height: 267px;
    .camp-banner-video {
      width: 100%;
      height: 100%;
      border-radius: 12px;
    }
  }
}
.camp-content {
  margin-top: 80px;
  /deep/ img {
    max-width: 100%;
  }
}
.camp-footer {
  position: sticky;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  .camp-footer-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 1180px;
    height: 60px;
  }
  .camp-footer-left {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 5px;
    height: 100%;
    padding: 0 20px;
    background: @primaryColor;
    .camp-footer-name {
      flex: 1;
      width: 5px;
      line-height: 35px;
      font-weight: bold;
      font-size: 24px;
      color: #fff;
    }
    .camp-footer-price {
      flex: none;
      margin-left: 16px;
      .camp-footer-price_text {
        line-height: 1;
        font-weight: 800;
        font-size: 36px;
        color: #fff;
      }
      .camp-footer-unit {
        display: inline-block;
        margin-left: 10px;
        line-height: 1;
        font-size: 16px;
        color: #fff;
      }
    }
  }
  .camp-footer-right {
    flex: none;
    .camp-footer-btn {
      display: flex;
      align-items: center;
      padding: 18px 30px;
      line-height: 24px;
      font-weight: 500;
      font-size: 16px;
      color: #fff;
      background: #17bd00;
      cursor: pointer;
      &.disabled {
        background: #ccc !important;
        cursor: default;
      }
      .camp-footer-btn_icon {
        display: inline-block;
        margin-left: 4px;
        width: 24px;
        height: 24px;
        background-image: url("~images/academy/arrow.svg");
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>
