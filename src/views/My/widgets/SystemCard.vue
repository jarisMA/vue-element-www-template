<template>
  <div class="course-content">
    <div class="course-card" @click="itemClick">
      <div class="course-up">
        <the-loading-image
          class="course-img"
          :url="list.cover_url || defaultCoverImg"
        />
      </div>
      <div class="course-down">
        <div class="course-title">
          {{ list.name }}
        </div>
        <div class="course-time">
          <img src="~/images/home/keshi.svg" />{{ list.chapter_number }}门课 ｜
          <img src="~/images/home/fenzhong.svg" />{{ list.second_duration }}分钟
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import defaultCoverImg from "images/planCover.png";
import TheLoadingImage from "components/TheLoadingImage";

export default {
  name: "SystemCard",
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  components: {
    TheLoadingImage
  },
  data() {
    return {
      defaultCoverImg
    };
  },
  methods: {
    itemClick() {
      this.$emit("itemClick");
    }
  }
};
</script>

<style lang="less" scoped>
.course-card {
  margin-top: 21px;
  margin-right: 20px;
  width: 280px;
  height: 246px;
  cursor: pointer;
  border: 1px solid #efefef;
  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .course-img {
    width: 278px;
    height: 164px;
  }

  .course-down {
    padding: 8px 17px;

    .course-title {
      margin-bottom: 8px;
      line-height: 24px;
      font-weight: 600;
      font-size: 16px;
      color: #2c3330;
    }

    .course-time {
      display: flex;
      align-items: center;
      line-height: 24px;
      font-size: 14px;
      color: #8ea098;
    }
  }
}
</style>
