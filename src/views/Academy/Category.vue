<template>
  <div class="category-page">
    <div class="container-1200">
      <div class="page-left">
        <the-loading-image
          :width="240"
          :height="180"
          url="https://homeplan-public.oss-cn-shanghai.aliyuncs.com/rich-text/2021/0122/rich-text/T7tUS4HC41y4is3m9fBXBvEjDAy7RVm4PtWZNs0P.png"
        />
        <h3 class="page-left-title">户型大改造一期超级炫酷班</h3>
        <p class="page-left-date">2020.07.17 – 2020.12.30</p>
        <p class="page-left-desc">
          课程会教给大家如何从零开始，设计出一个合理科学的平面布局。
        </p>
        <div class="page-left-more_list">
          <div class="page-left-more_item">
            班级公约
          </div>
          <div class="page-left-more_item">
            班级手册
          </div>
        </div>
      </div>
      <div class="page-right">
        <el-tabs v-model="activeName" @tab-click="handleTabClick">
          <el-tab-pane label="课程章节" name="category">
            <div class="category-list">
              <CategoryCard
                v-for="index of 5"
                :key="index"
                :category="category"
              />
            </div>
          </el-tab-pane>
          <el-tab-pane label="作业" name="homework" disabled></el-tab-pane>
          <el-tab-pane label="资料包" name="attach" disabled></el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage.vue";
import CategoryCard from "./widgets/CategoryCard.vue";

export default {
  name: "AcademyCategory",
  components: {
    TheLoadingImage,
    CategoryCard
  },
  data() {
    return {
      activeName: "category",
      category: {
        title: "第1课 一条价值百万的装修建议",
        desc: "和大家聊聊天，顺便给大家一个惊天大建议",
        lesson_count: 4,
        duration: 65 * 60,
        lessons: [
          {
            title: "P01 – 学习这门课的意义",
            status: "已学完",
            duration: "12:11"
          }
        ]
      }
    };
  },
  methods: {
    handleTabClick() {}
  }
};
</script>

<style lang="less" scoped>
.category-page {
  width: 100%;
  padding: 40px 0;
}
.container-1200 {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 10px;
}
.page-left {
  flex: none;
  margin-right: 20px;
  padding: 20px;
  width: 280px;
  background: #ffffff;
}
.page-left-title {
  margin-top: 20px;
  line-height: 28px;
  font-size: 22px;
  font-weight: bold;
  color: #2c3330;
}
.page-left-date {
  margin-top: 10px;
  line-height: 21px;
  font-size: 14px;
  letter-spacing: 1px;
  color: #2c3330;
}
.page-left-desc {
  margin-top: 20px;
  line-height: 16px;
  font-size: 12px;
  color: #81948b;
}
.page-left-more_list {
  margin-top: 34px;
  width: 100%;
}
.page-left-more_item {
  padding: 10px 0;
  width: 100%;
  line-height: 21px;
  font-size: 14px;
  color: #2c3330;
  cursor: pointer;
}
.page-left-more_item + .page-left-more_item {
  border-top: 1px solid #efefef;
}
.page-right {
  flex: 1;
  width: 880px;
  background: #fff;
  /deep/ .el-tabs {
    width: 100%;
    .el-tabs__header {
      margin: 0;
    }
    .el-tabs__nav-scroll {
      padding: 0 20px;
    }
    .el-tabs__item {
      padding: 20px;
      height: 69px;
      line-height: 28px;
      font-weight: normal;
      font-size: 16px;
      color: #81948b;
      &.is-active {
        color: #2c3330;
      }
    }
    .el-tabs__nav-wrap::after {
      background-color: #efefef;
    }
  }
}
.category-list {
  padding: 0 20px;
  width: 100%;
}
</style>
