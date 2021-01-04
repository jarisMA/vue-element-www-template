<template>
  <div class="work-card">
    <div class="content-wrapper">
      <div class="user-info">
        <the-avatar class="avatar-wrapper" :size="74" :url="work.avatar" />
        <div class="user-desc">
          <label class="user-name ellipsis">{{ work.nickname }}</label>
          <label class="user-term ellipsis">{{ work.term }}</label>
          <label class="user-homework ellipsis">{{ work.homework }}</label>
        </div>
      </div>
      <div class="user-comment">
        <p v-for="(item, key) of work.comments" :key="key">
          {{ item }}
        </p>
      </div>
    </div>
    <div class="img-wrapper">
      <el-carousel
        class="img-carousel"
        arrow="never"
        height="518px"
        direction="vertical"
        loop
        trigger="click"
        :interval="5000"
      >
        <el-carousel-item v-for="(item, key) in work.work_imgs" :key="key">
          <the-loading-image
            class="the-image-wrapper"
            :width="852"
            :height="518"
            :url="item"
          />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import TheAvatar from "components/TheAvatar";
import TheLoadingImage from "components/TheLoadingImage";

export default {
  name: "WorkCard",
  components: {
    TheAvatar,
    TheLoadingImage
  },
  props: {
    work: {
      type: Object
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.work-card {
  position: relative;
  width: 1110px;
  height: 688px;
  // background: url("~images/home/work_bg.svg") no-repeat;
  // background-size: cover;
  .content-wrapper {
    position: absolute;
    top: 135px;
    left: 0;
    width: 326px;
    height: 460px;
    padding: 93px 46px 58px;
    background: url("~images/home/work_content_bg.svg") no-repeat;
    background-size: cover;
    z-index: 5;
    .user-info {
      display: flex;
      margin-bottom: 37px;
      .avatar-wrapper {
        width: 74px;
        height: 74px;
      }
      .user-desc {
        flex: 1;
        width: 140px;
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        .user-name {
          display: inline-block;
          width: 100%;
          margin-bottom: 5px;
          line-height: 24px;
          font-size: 18px;
          font-weight: 600;
          color: #333333;
        }
        .user-term,
        .user-homework {
          width: 100%;
          height: 22px;
          line-height: 22px;
          font-size: 12px;
          font-weight: 400;
          color: #bfbfbf;
        }
      }
    }
    .user-comment {
      height: 198px;
      line-height: 22px;
      font-size: 14px;
      font-weight: 400;
      text-align: justify;
      color: #333333;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 9;
      line-clamp: 9;
      -webkit-box-orient: vertical;
    }
  }
  .img-wrapper {
    position: absolute;
    top: 106px;
    left: 240px;
    width: 852px;
    height: 518px;
    &::before {
      position: absolute;
      top: -15px;
      left: 14px;
      width: 852px;
      height: 518px;
      content: "";
      background: #d8efe4;
      border: 2px solid #333333;
    }
    .the-image-wrapper {
      border: 2px solid #333333;
    }
    /deep/ .img-carousel {
      width: 852px;
      height: 518px;
      .el-carousel__indicator {
        padding: 5px 12px;
        &.is-active {
          .el-carousel__button {
            background: rgba(255, 255, 255, 0.9);
            box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(151, 151, 151, 0.6);
          }
        }
        .el-carousel__button {
          width: 10px;
          height: 10px;
          background: rgba(51, 51, 51, 0.3);
          box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          opacity: 1 !important;
        }
      }
    }
  }
}
</style>
