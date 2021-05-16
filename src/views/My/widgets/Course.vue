<template>
  <div class="course container-980">
    <div class="course-list-wrapper">
      <div class="course-list-header">
        <h5 class="course-label">实战营班级</h5>
        <div class="course-pagination">
          <i class="course-pagination-prev disabled"></i>
          <span class="course-pagination-text"
            >{{ page }}/{{ Math.ceil(terms.length / 3) }}</span
          >
          <i class="course-pagination-next disabled"></i>
        </div>
      </div>
      <ul class="course-list">
        <li class="course-item" v-for="item of terms" :key="item.id">
          <term-card :detail="item" @itemClick="goTerm(item.id)" />
        </li>
      </ul>
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
      page: 1
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
    }
  }
};
</script>

<style lang="less" scoped>
.course {
  min-height: 100%;
  padding: 0px 20px 40px;
  .course-list-wrapper {
    & + .course-list-wrapper {
      margin-top: 40px;
    }
  }
  .course-list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    display: flex;
    flex-wrap: wrap;
    margin-top: 16px;
    .course-item {
      width: 300px;
      &:nth-child(3n - 1) {
        margin-left: 20px;
      }
      &:nth-child(3n) {
        margin-left: 20px;
      }
    }
  }
}
</style>
