<template>
  <div class="page" v-loading="loading">
    <div class="container-1180">
      <div class="page-header">
        <div class="page-header-left">
          <h3 class="page-header-title">
            家计划
            <el-select v-model="value" @change="handleOptionSelect">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </h3>
        </div>
        <div class="page-header-right">
          <span class="page-header-breadcrumb">{{ breadcrumb }}</span>
          <the-search-bar @search="handleKeywordChange" />
        </div>
      </div>
      <div class="page-content">
        <div class="page-content-left">
          <ul class="menu-list">
            <li class="menu-item">
              <div class="menu-item-header" @click="handleMenuActive(null)">
                <label :class="['menu-name', menuId === null ? 'active' : '']"
                  >全部</label
                >
              </div>
            </li>
            <li class="menu-item" v-for="(menu, index) of menus" :key="menu.id">
              <div class="menu-item-header" @click="handleFoldChange(index)">
                <label
                  :class="['menu-name', menuId === menu.id ? 'active' : '']"
                  @click="handleMenuActive(index)"
                  >{{ menu.name }}</label
                >
                <i
                  v-if="menu.children"
                  :class="[menu.unFold ? 'fold-icon' : 'unfold-icon']"
                ></i>
              </div>
              <ul class="submenu-list" v-show="menu.unFold">
                <li
                  :class="[
                    'submenu-item',
                    menuId === submenu.id ? 'active' : ''
                  ]"
                  v-for="(submenu, sIndex) of menu.children"
                  :key="submenu.id"
                  @click="handleMenuActive(index, sIndex)"
                >
                  {{ submenu.name }}
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="page-content-right">
          <div class="course-level-list">
            <div
              :class="[
                'course-level-item',
                levelValue === null ? 'active' : ''
              ]"
              @click="handleLevelChange(null)"
            >
              全部
            </div>
            <div
              :class="['course-level-item', levelValue === key ? 'active' : '']"
              v-for="(item, key) of COURSE_LEVEL"
              :key="key"
              @click="handleLevelChange(key)"
            >
              {{ item }}
            </div>
          </div>
          <template v-if="courses.length > 0">
            <ul class="course-list">
              <li class="course-item" v-for="item of courses" :key="item.id">
                <course-card :course="item" />
              </li>
            </ul>
            <pagination
              :pageSize="pagination.size"
              :current-page="pagination.page"
              :total="pagination.total"
              @change-page="getCourses"
            ></pagination>
          </template>
          <the-empty v-else-if="!loading" noText="暂无视频课" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheSearchBar from "components/TheSearchBar";
import CourseCard from "./widgets/CourseCard";
import courseService from "service/course";
import { COURSE_LEVEL } from "utils/const";
import Pagination from "components/Pagination";
import TheEmpty from "components/TheEmpty";
import { listMixin } from "./widgets/mixin";

export default {
  name: "AcademyCourseList",
  mixins: [listMixin],
  components: { TheSearchBar, CourseCard, Pagination, TheEmpty },
  data() {
    return {
      COURSE_LEVEL,
      loading: true,
      value: 1,
      menus: [],
      menuId: null,
      breadcrumb: "全部",
      pagination: {
        size: 12,
        page: 1,
        total: 0
      },
      courses: [],
      levelValue: null,
      keyword: null
    };
  },
  watch: {
    menuId() {
      this.getCourses();
    },
    levelValue() {
      this.getCourses();
    },
    ["$route"](val) {
      this.menuId = val.query.catId ? parseInt(val.query.catId) : null;
      this.levelValue = val.query.level || null;
    }
  },
  created() {
    const { catId, level } = this.$route.query;
    this.levelValue = level || null;
    if (catId) {
      this.menuId = parseInt(catId);
    }
    this.getData();
  },
  methods: {
    getData() {
      Promise.all([
        courseService.courseCategories(),
        courseService.courses({
          page_size: this.pagination.size,
          page: 1,
          cat_id: this.menuId,
          level: this.levelValue
        })
      ])
        .then(([category, courses]) => {
          if (this.menuId) {
            category.some(menu => {
              const submenu =
                menu.children &&
                menu.children.find(item => item.id === this.menuId);
              if (submenu) {
                menu.unFold = true;
                this.breadcrumb = menu.name + " / " + submenu.name;
                return true;
              }
            });
          }
          this.menus = category;
          this.courses = courses.list;
          this.pagination.total = courses.pagination.total;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getCourses(start = 1) {
      this.loading = true;
      courseService
        .courses({
          page_size: this.pagination.size,
          page: start,
          cat_id: this.menuId,
          name: this.keyword,
          level: this.levelValue
        })
        .then(courses => {
          this.courses = courses.list;
          this.pagination.total = courses.pagination.total;
          this.pagination.page = start;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleKeywordChange(keyword) {
      this.keyword = keyword;
      this.getCourses();
    },
    handleFoldChange(index) {
      const menu = this.menus[index];
      this.$set(this.menus, index, {
        ...menu,
        unFold: !menu.unFold
      });
    },
    handleMenuActive(mIndex, sIndex) {
      let breadcrumb = "";
      if (!mIndex && mIndex !== 0) {
        breadcrumb = "全部";
        this.breadcrumb = breadcrumb;
        this.handleRouteChange({
          catId: null
        });
        return;
      }
      const menu = this.menus[mIndex];
      breadcrumb += menu.name;
      if (menu.children && (sIndex || sIndex === 0)) {
        const submenu = menu.children[sIndex];
        submenu && (breadcrumb += ` / ${submenu.name}`);
        this.handleRouteChange({
          catId: submenu.id
        });
      } else {
        this.handleRouteChange({
          catId: menu.id
        });
      }
      this.breadcrumb = breadcrumb;
    },
    handleLevelChange(level) {
      this.handleRouteChange({
        level
      });
    },
    handleRouteChange(query) {
      this.$router.push({
        query: {
          ...this.$route.query,
          ...query
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.page {
  padding: 40px 0;
  background: #fff !important;
  .page-header {
    display: flex;
    align-items: center;
    .page-header-left {
      flex: none;
      width: 300px;
      .page-header-title {
        display: flex;
        line-height: 40px;
        font-weight: 600;
        font-size: 40px;
        color: #2c3330;
        .el-select {
          width: 150px;
          height: 40px;
          /deep/ .el-input {
            height: 100%;
            .el-select__caret {
              color: #81948b;
            }
            .el-input__inner {
              padding: unset;
              line-height: 40px;
              font-weight: 600;
              font-size: 40px;
              color: @primaryColor;
              background: transparent;
              border: unset;
            }
          }
        }
      }
    }
    .page-header-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .page-header-breadcrumb {
        line-height: 24px;
        font-size: 14px;
        color: #606c66;
      }
    }
  }
  .page-content {
    display: flex;
    margin-top: 20px;
    .page-content-left {
      flex: none;
      width: 220px;
      .menu-list {
        .menu-item {
          padding: 12px 0;
          & + .menu-item {
            border-top: 1px solid #2c3330;
          }
          .menu-item-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 0;
            line-height: 28px;
            font-weight: 500;
            font-size: 16px;
            color: #2c3330;
            cursor: pointer;
            .unfold-icon,
            .fold-icon {
              flex: none;
              display: inline-block;
              margin-left: 16px;
              width: 12px;
              height: 12px;
              cursor: pointer;
              background-size: cover;
              background-repeat: no-repeat;
            }
            .fold-icon {
              background-image: url("~images/academy/fold.svg");
            }
            .unfold-icon {
              background-image: url("~images/academy/unfold.svg");
            }
            .menu-name {
              flex: 1;
              cursor: pointer;
              &.active {
                color: @primaryColor;
              }
            }
          }
          .submenu-list {
            .submenu-item {
              padding: 12px 0;
              line-height: 28px;
              font-size: 16px;
              color: #606c66;
              cursor: pointer;
              &.active {
                color: @primaryColor;
              }
            }
          }
        }
      }
    }
    .page-content-right {
      flex: 1;
      margin-left: 80px;
      .course-level-list {
        display: flex;
        margin-bottom: 24px;
        .course-level-item {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 16px;
          line-height: 20px;
          font-size: 14px;
          color: #2c3330;
          cursor: pointer;
          & + .course-level-item {
            margin-left: 8px;
          }
          &.active {
            color: #fff;
            background: #2c3330;
          }
        }
      }
      .course-list {
        display: flex;
        flex-wrap: wrap;
        .course-item {
          margin-bottom: 40px;
          &:nth-child(3n-1) {
            margin-left: 20px;
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>
