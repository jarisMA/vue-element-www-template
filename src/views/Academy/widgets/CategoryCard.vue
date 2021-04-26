<template>
  <div class="category-card">
    <el-collapse>
      <el-collapse-item>
        <template slot="title">
          <div class="card-header">
            <div class="card-header-left">
              <i class="card-header-icon play-icon"></i>
            </div>
            <div class="card-header-content">
              <div class="card-header-content-left">
                <h4 class="card-header-title">
                  {{ category.title }}
                </h4>
                <p class="card-header-desc">
                  {{ category.desc }}
                </p>
              </div>
              <div class="card-header-content-right">
                <label class="card-header-count"
                  >{{ category.lesson_count }}节课</label
                >
                <label class="card-header-duration"
                  >（{{ Math.floor(category.duration / 60) }}分钟）</label
                >
              </div>
            </div>
          </div>
        </template>
        <div class="card-content">
          <div class="card-content-list">
            <div
              class="card-content-item"
              v-for="lesson of category.lessons"
              :key="lesson.id"
            >
              <div class="card-content-item-left">
                <i class="card-content-item-icon play-icon"></i>
                <h5 class="card-content-item-title">
                  {{ lesson.title }}
                </h5>
              </div>
              <div class="card-content-item-right">
                <label class="card-content-item-status">
                  {{ lesson.status }}
                </label>
                <label class="card-content-item-duration">
                  {{ lesson.duration }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: "AcademyCategoryCard",
  props: {
    category: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.category-card {
  width: 100%;
  /deep/ .el-collapse {
    border: unset;
    .el-collapse-item__header {
      height: auto;
    }
    .el-collapse-item__wrap {
      border: unset;
    }
    .el-collapse-item__content {
      padding: 0;
    }
  }
}
.category-card + .category-card {
  border-top: 1px solid #efefef;
}
.card-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 0;
  width: 100%;
  .card-header-left {
    flex: none;
    padding-right: 10px;
    .card-header-icon {
      display: block;
      width: 32px;
      height: 32px;
      background-color: @primaryColor;
      mask-repeat: no-repeat;
      mask-size: cover;
    }
  }

  .card-header-content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 5px;
    .card-header-title {
      line-height: 24px;
      font-weight: 500;
      font-size: 18px;
      color: #2c3330;
    }
    .card-header-desc {
      margin-top: 5px;
      line-height: 16px;
      font-size: 12px;
      color: #606c66;
    }
    .card-header-content-right {
      line-height: 2;
      font-size: 12px;
      color: #8ea098;
    }
  }
}

.card-content {
  width: calc(100% - 42px);
  margin-left: 42px;
  padding: 20px 0 20px 0;
  border-top: 1px solid #efefef;
  .card-content-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 11px 10px 11px 6px;
    cursor: pointer;
    &:hover {
      background: #f7fdfa;
    }
    .card-content-item-left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .card-content-item-icon {
        display: block;
        margin-right: 9px;
        width: 20px;
        height: 20px;
        background-color: #2c3330;
        mask-size: cover;
        mask-repeat: no-repeat;
      }
      .card-content-item-title {
        line-height: 21px;
        font-size: 14px;
        font-weight: normal;
        color: #2c3330;
      }
    }

    .card-content-item-right {
      display: inline-block;
      line-height: 16px;
      font-size: 12px;
      text-align: right;
      color: #8ea098;
      .card-content-item-status {
        margin-right: 25px;
      }
    }
  }
}

.play-icon {
  mask-image: url("~images/academy/play.svg");
}
</style>
