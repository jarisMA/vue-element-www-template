<template>
  <div class="course">
    <div class="course-list-wrapper">
      <div class="course-list-header">
        <h5 class="course-label">实战营班级</h5>
        <div class="course-pagination">
          <i
            :class="['course-pagination-prev', page === 1 ? 'disabled' : '']"
            @click="handleSwiperSlideTo(page - 1)"
          ></i>
          <span :class="['course-pagination-text']"
            >{{ page }}/{{ Math.ceil(terms.length / 3) }}</span
          >
          <i
            :class="[
              'course-pagination-next',
              page == Math.ceil(terms.length / 3) ? 'disabled' : ''
            ]"
            @click="handleSwiperSlideTo(page + 1)"
          ></i>
        </div>
      </div>
      <div class="course-list">
        <swiper
          class="swiper-no-swiping"
          ref="mySwiper"
          :options="swiperOptions"
        >
          <swiper-slide v-for="item of terms" :key="item.id">
            <div class="course-item">
              <term-card :detail="item" @itemClick="goTerm(item.id)" />
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import termService from "service/term";
import TermCard from "./TermCard.vue";
import { goTerm } from "utils/routes";

export default {
  components: { TermCard },
  name: "MyCourse",
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      terms: [],
      page: 1,
      swiperOptions: {
        slidesPerView: 3,
        spaceBetween: 0,
        autoplay: false
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    goTerm,
    getData() {
      this.$emit("update:loading", true);
      termService
        .myCampTerms()
        .then(res => {
          this.terms = res;
        })
        .finally(() => {
          this.$emit("update:loading", false);
        });
    },
    handleSwiperSlideTo(page, speed = 300) {
      const index = (page - 1) * 3;
      this.$refs["mySwiper"].$swiper.slideTo(index, speed, false);
      this.page = page;
    }
  }
};
</script>

<style lang="less" scoped>
.course {
  min-height: 100%;
  padding: 0px 0px 40px;
  .course-list-wrapper {
    & + .course-list-wrapper {
      margin-top: 40px;
    }
  }
  .course-list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .course-label {
      line-height: 28px;
      font-weight: 500;
      font-size: 16px;
      color: #2c3330;
    }
    .course-pagination {
      display: flex;
      align-items: center;
      .course-pagination-text {
        display: inline-block;
        margin: 0 2px;
        line-height: 24px;
        font-size: 14px;
        color: #2c3330;
      }
      .course-pagination-prev,
      .course-pagination-next {
        display: inline-block;
        width: 24px;
        height: 24px;
        mask-size: cover;
        mask-repeat: no-repeat;
        background-color: #2c3330;
        cursor: pointer;
        &.disabled {
          background-color: #c8d0cc;
          cursor: default;
        }
      }
      .course-pagination-prev {
        mask-image: url("~images/my/left.svg");
      }
      .course-pagination-next {
        mask-image: url("~images/my/right.svg");
      }
    }
  }
  .course-list {
    // display: flex;
    // flex-wrap: wrap;
    margin-top: 16px;
    /deep/ .swiper-container {
      height: 296px;
      .swiper-slide {
        .course-item {
          margin-left: 20px;
          width: 300px;
        }
      }
    }
  }
}
</style>
