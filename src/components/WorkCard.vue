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
      <the-loading-image :width="852" :height="518" :url="work.work_img" />
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
  width: 1200px;
  height: 688px;
  background: url("~images/home/work_bg.svg") no-repeat;
  background-size: cover;
  .content-wrapper {
    position: absolute;
    top: 135px;
    left: 50px;
    width: 326px;
    height: 460px;
    padding: 93px 46px 58px;
    background: url("~images/home/work_content_bg.svg") no-repeat;
    background-size: cover;
    z-index: 1;
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
    left: 290px;
    width: 852px;
    height: 518px;
    background: @primaryColor;
  }
}
</style>
