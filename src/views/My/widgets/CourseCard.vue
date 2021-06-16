<template>
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
        {{ COURSE_LEVEL[list.level] }} ｜
        <img src="~/images/home/keshi.svg" />
        {{ list.lesson_number }}课时 ｜
        <img src="~/images/home/fenzhong.svg" />
        {{ list.second_duration }}分钟
      </div>
    </div>
  </div>
</template>

<script>
import defaultCoverImg from "images/planCover.png";
import TheLoadingImage from "components/TheLoadingImage";
import { COURSE_LEVEL } from "utils/const";

export default {
  name: "CourseCard",
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
      COURSE_LEVEL,
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
  height: 278px;
  cursor: pointer;
  border: 1px solid #efefef;
  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  .course-img {
    width: 278px;
    height: 156px;
  }

  .course-down {
    padding: 16px;

    .course-title {
      margin-bottom: 8px;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #2c3330;
    }

    .course-time {
      display: flex;
      align-items: center;
      font-size: 14px;
      line-height: 24px;
      color: #8ea098;
    }
  }
}
</style>
