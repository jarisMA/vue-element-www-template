<template>
  <div class="academy-page" v-loading="loading">
    <div class="academy-banner" ref="banner">
      <day-logo-svg
        ref="dayLogoSvg"
        @mousedown="e => mousedown(e, 'dayLogoSvg')"
        class="day-logo-svg"
        :style="{ zIndex: 2 }"
      />
      <docee-svg
        ref="doceeSvg"
        @mousedown="e => mousedown(e, 'doceeSvg')"
        class="docee-svg"
        :style="{ zIndex: 3 }"
      />
      <dog-svg
        ref="dogSvg"
        @mousedown="e => mousedown(e, 'dogSvg')"
        class="dog-svg"
        :style="{ zIndex: 1 }"
      />
      <dxjxs-svg
        ref="dxjxsSvg"
        @mousedown="e => mousedown(e, 'dxjxsSvg')"
        class="dxjxs-svg"
        :style="{ zIndex: 1 }"
      />
      <dz-svg
        ref="dzSvg"
        @mousedown="e => mousedown(e, 'dzSvg')"
        class="dz-svg"
        :style="{ zIndex: 1 }"
      />
      <gz-svg
        ref="gzSvg"
        @mousedown="e => mousedown(e, 'gzSvg')"
        class="gz-svg"
        :style="{ zIndex: 1 }"
      />
      <hb-svg
        ref="hbSvg"
        @mousedown="e => mousedown(e, 'hbSvg')"
        class="hb-svg"
        :style="{ zIndex: 1 }"
      />
      <jz-svg
        ref="jzSvg"
        @mousedown="e => mousedown(e, 'jzSvg')"
        class="jz-svg"
        :style="{ zIndex: 1 }"
      />
      <ldd-svg
        ref="lddSvg"
        @mousedown="e => mousedown(e, 'lddSvg')"
        class="ldd-svg"
        :style="{ zIndex: 2 }"
      />
      <lsy-svg
        ref="lsySvg"
        @mousedown="e => mousedown(e, 'lsySvg')"
        class="lsy-svg"
        :style="{ zIndex: 2 }"
      />
      <sf-svg
        ref="sfSvg"
        @mousedown="e => mousedown(e, 'sfSvg')"
        class="sf-svg"
        :style="{ zIndex: 2 }"
      />
      <sz-svg
        ref="szSvg"
        @mousedown="e => mousedown(e, 'szSvg')"
        class="sz-svg"
        :style="{ zIndex: 1 }"
      />
      <xg-svg
        ref="xgSvg"
        @mousedown="e => mousedown(e, 'xgSvg')"
        class="xg-svg"
        :style="{ zIndex: 1 }"
      />
      <yz-svg
        ref="yzSvg"
        @mousedown="e => mousedown(e, 'yzSvg')"
        class="yz-svg"
        :style="{ zIndex: 1 }"
      />
      <zwj-svg
        ref="zwjSvg"
        @mousedown="e => mousedown(e, 'zwjSvg')"
        class="zwj-svg"
        :style="{ zIndex: 1 }"
      />
      <zz-svg
        ref="zzSvg"
        @mousedown="e => mousedown(e, 'zzSvg')"
        class="zz-svg"
        :style="{ zIndex: 4 }"
      />
    </div>
    <div class="academy-content">
      <div class="container-1180">
        <div
          class="academy-courses"
          v-if="courses1.length > 0 || courses2.length > 0"
        >
          <div class="academy-content-header">
            <h3 class="academy-content-title">
              家计划<span class="primary">视频课</span>
            </h3>
            <div class="academy-content-more" @click="goAcademyCourseList()">
              查看全部<i class="more-icon"></i>
            </div>
          </div>
          <div class="academy-course-wrapper" v-if="courses1.length > 0">
            <div class="course-wrapper-left">
              <h4 class="course-cat-title">{{ courseCategory1.name }}</h4>
              <div
                class="course-cat-btn"
                @click="
                  goAcademyCourseList({
                    catId: VUE_APP_COURSE_CAT_1
                  })
                "
              >
                全部<i class="more-icon"></i>
              </div>
            </div>
            <div class="academy-course-list">
              <course-card
                class="academy-course-item"
                v-for="item of courses1"
                :key="item.id"
                :course="item"
              />
            </div>
          </div>
          <div class="academy-course-wrapper" v-if="courses2.length > 0">
            <div class="course-wrapper-left">
              <h4 class="course-cat-title">{{ courseCategory2.name }}</h4>
              <div
                class="course-cat-btn"
                @click="
                  goAcademyCourseList({
                    catId: VUE_APP_COURSE_CAT_2
                  })
                "
              >
                全部<i class="more-icon"></i>
              </div>
            </div>
            <div class="academy-course-list">
              <course-card
                class="academy-course-item"
                v-for="item of courses2"
                :key="item.id"
                :course="item"
              />
            </div>
          </div>
          <div
            class="academy-content-more center"
            @click="goAcademyCourseList()"
          >
            查看全部视频课<i class="more-icon"></i>
          </div>
        </div>
        <div class="academy-series" v-if="series.length > 0">
          <div class="academy-content-header">
            <h3 class="academy-content-title">
              家计划<span class="primary">体系课</span>
            </h3>
            <div class="academy-content-more" @click="goAcademySeriesList()">
              查看全部<i class="more-icon"></i>
            </div>
          </div>
          <div class="academy-series-list">
            <set-card
              class="academy-series-item"
              v-for="item of series"
              :key="item.id"
              :series="item"
            />
          </div>
        </div>
        <div class="academy-camp" v-if="camps.length > 0">
          <div class="academy-content-header">
            <h3 class="academy-content-title">
              家计划<span class="primary">训练营</span>
            </h3>
            <div class="academy-content-more" @click="goAcademyCampList()">
              查看全部<i class="more-icon"></i>
            </div>
          </div>
          <div class="academy-camp-list">
            <camp-card
              v-for="camp of camps"
              :key="camp.id"
              :camp="camp"
              @go="goAcademyCampDetail"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DayLogoSvg from "./widgets/svg/DayLogoSvg";
import DoceeSvg from "./widgets/svg/DoceeSvg.vue";
import DogSvg from "./widgets/svg/DogSvg.vue";
import DxjxsSvg from "./widgets/svg/DxjxsSvg.vue";
import DzSvg from "./widgets/svg/DzSvg.vue";
import GzSvg from "./widgets/svg/GzSvg.vue";
import HbSvg from "./widgets/svg/HbSvg.vue";
import JzSvg from "./widgets/svg/JzSvg.vue";
import LddSvg from "./widgets/svg/LddSvg.vue";
import LsySvg from "./widgets/svg/LsySvg.vue";
import SfSvg from "./widgets/svg/SfSvg.vue";
import SzSvg from "./widgets/svg/SzSvg.vue";
import XgSvg from "./widgets/svg/XgSvg.vue";
import YzSvg from "./widgets/svg/YzSvg.vue";
import ZwjSvg from "./widgets/svg/ZwjSvg.vue";
import ZzSvg from "./widgets/svg/ZzSvg.vue";

import campService from "service/camp";
import courseService from "service/course";
import {
  goAcademyCourseList,
  goAcademySeriesList,
  goAcademyCampList,
  goAcademyCampDetail
} from "utils/routes";
import CampCard from "./widgets/CampCard";
import SetCard from "./widgets/SetCard";
import CourseCard from "./widgets/CourseCard";

export default {
  name: "Academy",
  components: {
    DayLogoSvg,
    DoceeSvg,
    DogSvg,
    DxjxsSvg,
    DzSvg,
    GzSvg,
    HbSvg,
    JzSvg,
    LddSvg,
    LsySvg,
    SfSvg,
    SzSvg,
    XgSvg,
    YzSvg,
    ZwjSvg,
    ZzSvg,
    CampCard,
    SetCard,
    CourseCard
  },
  data() {
    return {
      loading: true,
      moveDom: null,
      left: 0,
      top: 0,
      startX: 0,
      startY: 0,
      VUE_APP_COURSE_CAT_1: process.env.VUE_APP_COURSE_CAT_1,
      VUE_APP_COURSE_CAT_2: process.env.VUE_APP_COURSE_CAT_2,
      courseCategory1: {},
      courseCategory2: {},
      courses1: [],
      courses2: [],
      series: [],
      camps: []
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    this.$nextTick(() => {
      const timer = setTimeout(() => {
        const banner = this.$refs["banner"];
        banner.className = "academy-banner animation";
        clearTimeout(timer);
      }, 100);
    });
    window.addEventListener("mouseup", this.mouseup);
    window.addEventListener("mousemove", this.mousemove);
  },
  beforeDestroy() {
    window.removeEventListener("mouseup", this.mouseup);
    window.removeEventListener("mousemove", this.mousemove);
  },
  methods: {
    goAcademyCourseList,
    goAcademySeriesList,
    goAcademyCampList,
    goAcademyCampDetail,
    getData() {
      Promise.all([
        courseService.courseCategory(this.VUE_APP_COURSE_CAT_1),
        courseService.courseCategory(this.VUE_APP_COURSE_CAT_2),
        courseService.courses({
          page_size: 3,
          page: 1,
          cat_id: this.VUE_APP_COURSE_CAT_1
        }),
        courseService.courses({
          page_size: 3,
          page: 1,
          cat_id: this.VUE_APP_COURSE_CAT_2
        }),
        courseService.series({
          page_size: 3,
          page: 1
        }),
        campService.camps({
          page_size: 2,
          page: 1
        })
      ])
        .then(
          ([
            courseCategory1,
            courseCategory2,
            courses1,
            courses2,
            series,
            camps
          ]) => {
            this.courseCategory1 = courseCategory1;
            this.courseCategory2 = courseCategory2;
            this.courses1 = courses1.list;
            this.courses2 = courses2.list;
            this.series = series.list;
            this.camps = camps.list;
          }
        )
        .finally(() => {
          this.loading = false;
        });
    },
    mouseup() {
      this.moveDom = null;
    },
    mousemove(e) {
      if (this.moveDom) {
        const banner = this.$refs["banner"];
        const maxWidth = banner.clientWidth;
        const maxHeight = banner.clientHeight;
        let disX = e.clientX - this.startX;
        let disY = e.clientY - this.startY;
        const el = this.moveDom;
        this.getMaxZIndex(el);
        if (
          this.left + disX + el.clientWidth > maxWidth ||
          this.left + disX < 0
        ) {
          return;
        }
        if (
          this.top + disY + el.clientHeight > maxHeight ||
          this.top + disY < 0
        ) {
          return;
        }
        el.style.left = this.left + disX + "px";
        el.style.top = this.top + disY + "px";
        this.getMaxZIndex(el);
      }
    },
    mousedown(e, ref) {
      this.moveDom = this.$refs[ref].$el;
      this.left = this.moveDom.offsetLeft;
      this.top = this.moveDom.offsetTop;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.getMaxZIndex(this.moveDom);
    },
    getMaxZIndex(el, left, top) {
      let doms = document.querySelectorAll(".academy-banner>div");
      const minX = left || el.offsetLeft;
      const minY = top || el.offsetTop;
      const maxX = minX + el.clientWidth;
      const maxY = minY + el.clientHeight;
      let zIndex = el.style.zIndex - 0;
      doms.forEach(dom => {
        const dMinX = dom.offsetLeft;
        const dMinY = dom.offsetTop;
        const dMaxX = dom.offsetLeft + dom.clientWidth;
        const dMaxY = dom.offsetTop + dom.clientHeight;
        if (
          (dMinX >= minX && dMinX <= maxX && dMinY >= minY && dMinY <= maxY) ||
          (dMinX >= minX && dMinX <= maxX && dMaxY >= minY && dMaxY <= maxY) ||
          (dMaxX >= minX && dMaxX <= maxX && dMinY >= minY && dMinY <= maxY) ||
          (dMaxX >= minX && dMaxX <= maxX && dMaxY >= minY && dMaxY <= maxY) ||
          (minX >= dMinX && minX <= dMaxX && minY >= dMinY && minY <= dMaxY) ||
          (minX >= dMinX && minX <= dMaxX && maxY >= dMinY && maxY <= dMaxY) ||
          (maxX >= dMinX && maxX <= dMaxX && minY >= dMinY && minY <= dMaxY) ||
          (maxX >= dMinX && maxX <= dMaxX && maxY >= dMinY && maxY <= dMaxY)
        ) {
          if (dom.style.zIndex - 0 > zIndex) {
            zIndex = dom.style.zIndex - 0;
          }
        }
      });
      el.style.zIndex = zIndex - 0 + 1;
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
@baseLeft: calc((100vw - 1200px) / 2);
.academy-page {
  background: #fff !important;
}
.academy-banner {
  position: relative;
  width: 100%;
  height: 830px;
  background: url("~images/academy/xs-bj.svg") repeat;
  z-index: 0;
  & > div {
    position: absolute;
    top: 0;
    left: 0;
    filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
    transform-origin: center;
    transition-property: top, left;
    transition-duration: 0.2s;
    transition-timing-function: ease;
    cursor: move;
    &:hover {
      transition: transform 0.3s;
      transform: scale(1.05);
    }
  }
  &.animation {
    & > div {
      &.day-logo-svg {
        top: 537px;
        left: calc(@baseLeft + 791px);
      }
      &.dxjxs-svg {
        top: 555px;
        left: calc(@baseLeft + 319px);
      }
      &.dz-svg {
        top: 288px;
        left: calc(@baseLeft + 343px);
      }
      &.dog-svg {
        top: 420px;
        left: calc(@baseLeft + 922px);
      }
      &.yz-svg {
        top: 385px;
        left: calc(@baseLeft + 120px);
      }
      &.lsy-svg {
        top: 212px;
        left: calc(@baseLeft + 301px);
      }
      &.gz-svg {
        top: 82px;
        left: calc(@baseLeft + 922px);
      }
      &.zz-svg {
        top: 317px;
        left: calc(@baseLeft + 562px);
      }
      &.ldd-svg {
        top: 207px;
        left: calc(@baseLeft + 765px);
      }
      &.sf-svg {
        top: 182px;
        left: calc(@baseLeft + 436px);
      }
      &.docee-svg {
        top: 182px;
        left: calc(@baseLeft + 481px);
      }
      &.sz-svg {
        top: 39px;
        left: calc(@baseLeft + 718px);
      }
      &.xg-svg {
        top: 39px;
        left: calc(@baseLeft + 450px);
      }
      &.jz-svg {
        top: 47px;
        left: calc(@baseLeft + 339px);
      }
      &.hb-svg {
        top: 51px;
        left: calc(@baseLeft + 224px);
      }
      &.zwj-svg {
        top: 105px;
        left: calc(@baseLeft + 101px);
      }
    }
  }
}

.academy-content {
  width: 100%;
  .academy-content-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 36px;
    .academy-content-title {
      line-height: 48px;
      font-weight: 600;
      font-size: 36px;
      color: #2c3330;
    }
  }
  .academy-content-more {
    line-height: 24px;
    font-size: 16px;
    color: #606c66;
    cursor: pointer;
    .more-icon {
      display: inline-block;
      margin-left: 4px;
      width: 24px;
      height: 24px;
      mask: url("~images/academy/vector.svg") no-repeat center;
      background: #606c66;
      vertical-align: bottom;
    }
  }
  .academy-courses {
    padding: 80px 0;
    .academy-course-wrapper {
      display: flex;
      & + .academy-course-wrapper {
        margin-top: 80px;
      }
      .course-wrapper-left {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        width: 300px;
        .course-cat-title {
          line-height: 32px;
          font-weight: 600;
          font-size: 24px;
          color: #2c3330;
        }
        .course-cat-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 40px;
          width: 180px;
          height: 56px;
          line-height: 24px;
          font-weight: 500;
          font-size: 16px;
          color: #2c3330;
          border: 1px solid #2c3330;
          cursor: pointer;
          .more-icon {
            display: inline-block;
            margin-left: 4px;
            width: 24px;
            height: 24px;
            mask: url("~images/academy/vector.svg") no-repeat center;
            background: #2c3330;
            vertical-align: bottom;
          }
        }
      }
      .academy-course-list {
        display: flex;
        .academy-course-item {
          &:nth-child(2) {
            margin-left: 20px;
            margin-right: 20px;
          }
        }
      }
    }
    .academy-content-more.center {
      margin-top: 80px;
      text-align: center;
    }
  }
  .academy-series {
    padding: 60px 0;
    .academy-series-list {
      display: flex;
      .academy-series-item {
        &:nth-child(2) {
          margin-left: 20px;
          margin-right: 20px;
        }
      }
    }
  }
  .academy-camp {
    padding: 100px 0 160px;
    .academy-camp-list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
  }
}
</style>
