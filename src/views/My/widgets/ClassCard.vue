<template>
  <div class="class-content">
    <div class="class-card" @click="itemClick">
      <div class="class-img">
        <the-loading-image
          class="image-wrapper"
          :width="240"
          :height="178"
          :url="detail.cover_file_url || defaultCoverImg"
        />
      </div>
      <div class="class-text">
        <div class="class-title">
          <span>{{ detail.name }}</span>
          <span
            :class="{
              'term-status': true,
              started: detail.status === 1,
              ended: detail.status === 2,
              unstart: detail.status === 0
            }"
            >{{ TERM_STATUS[detail.status] }}</span
          >
        </div>

        <div class="class-time">
          {{ formatDate(detail.start_at, "YYYY.MM.DD") }} -
          {{ formatDate(detail.end_at, "YYYY.MM.DD") }}
        </div>
        <div class="class-enter">进入班级&rarr;</div>
      </div>
    </div>
  </div>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage";
import defaultCoverImg from "images/planCover.png";
import { formatDate } from "utils/moment";
import { TERM_STATUS } from "utils/const";

export default {
  name: "PlanCard",
  props: {
    detail: {
      type: Object,
      required: true
    }
  },
  components: {
    TheLoadingImage
  },
  data() {
    return {
      TERM_STATUS,
      defaultCoverImg
    };
  },
  methods: {
    formatDate,
    itemClick() {
      this.$emit("itemClick");
    }
  }
};
</script>

<style lang="less" scoped>
.class-card {
  display: flex;
  margin-top: 20px;
  width: 880px;
  height: 180px;
  border: 1px solid #efefef;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .class-img {
    width: 240px;
    height: 178px;
  }

  .class-text {
    width: 650px;
    padding: 20px;
  }

  .class-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 24px;
    font-weight: 600;
    font-size: 20px;
    color: #2c3330;
  }

  .class-time {
    margin-top: 8px;
    line-height: 24px;
    font-weight: normal;
    font-size: 14px;
    color: #81948b;
  }

  .class-enter {
    margin-top: 60px;
    line-height: 24px;
    font-weight: 600;
    font-size: 16px;
    color: #14af64;
  }
}

.term-status {
  display: inline-block;
  padding: 2px 4px;
  line-height: 16px;
  font-size: 12px;
  font-weight: 400;
  color: #666666;
  background: #d8d8d8;
  border-radius: 10px;
  &.unstart {
    color: #e6752a;
    background: #f9f3ef;
  }
  &.started {
    color: #14af64;
    background: #eff9f4;
  }
  &.ended {
    color: #606c66;
    background: #d8d8d8ff;
  }
}
</style>
