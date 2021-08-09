<template>
  <div
    class="feedback-wrapper"
    v-loading="loading"
    element-loading-background="#494949"
  >
    <div class="feedback-content">
      <div class="scroll-section" v-infinite-scroll="getData(true)">
        <div class="feedback-content-wrapper">
          <h3 class="feedback-content-title">看看同学们怎么说</h3>
          <p class="feedback-content-desc">
            「{{ category.title }}」中同学们的收获
          </p>
          <ul class="feedback-list" v-if="feedbacks.length > 0">
            <li
              class="feeback-item"
              v-for="(feedback, index) of feedbacks"
              :key="feedback.id"
            >
              <course-feedback-card
                :feedback="feedback"
                @addLike="count => handleAddLike(feedback.id, count, index)"
                @delete="handleDelete(feedback.id, index)"
              />
            </li>
          </ul>
          <div class="empty" v-else>
            <img src="~/images/course/empty.svg" class="empty-img" />
            <p>来做第一个分享的人吧</p>
          </div>
        </div>
      </div>
    </div>
    <div class="feedback-footer">
      <course-feedback
        :params="{
          camp_id: campId,
          term_id: termId,
          widget_id: category.id,
          resource_type: category.type,
          resource_id: category.resource_id || category.bible_id
        }"
        @added="handleAddedFeedback"
      />
    </div>
  </div>
</template>

<script>
import CourseFeedback from "./CourseFeedback";
import CourseFeedbackCard from "./CourseFeedbackCard";
import termService from "service/term";
import { mapState } from "vuex";

export default {
  name: "CourseFeedbackList",
  components: {
    CourseFeedback,
    CourseFeedbackCard
  },
  props: {
    campId: {
      type: Number
    },
    termId: {
      type: Number
    },
    category: {
      type: Object
    }
  },
  data() {
    return {
      loading: true,
      feedbacks: [],
      pagination: {
        size: 15,
        page: 1,
        total: 0,
        total_pages: 1
      },
      liking: false
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  created() {
    this.getData();
  },
  watch: {
    ["$route"]() {
      this.getData();
    }
  },
  methods: {
    getData(flag = false) {
      if (!flag) {
        this.pagination.page = 1;
        this.loading = true;
      } else {
        if (this.pagination.page < this.pagination.total_pages) {
          this.pagination.page += 1;
        } else {
          return;
        }
      }
      termService
        .termWidgetFeedbacks({
          page_size: this.pagination.size,
          page: this.pagination.page,
          camp_id: this.campId,
          term_id: this.termId,
          widget_id: this.category.id,
          resource_id: this.category.resource_id,
          type: this.category.type
        })
        .then(res => {
          if (flag) {
            this.feedbacks = this.feedbacks.concat(res.list);
          } else {
            this.feedbacks = res.list;
          }
          this.pagination.total = res.pagination.total;
          this.pagination.total_pages = res.pagination.total_pages;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleDelete(id, index) {
      termService.deleteTermWidgetFeedback(id).then(() => {
        this.$notice({
          type: "success",
          title: "反馈删除成功"
        });
        this.feedbacks.splice(index, 1);
      });
    },
    handleAddLike(resourceId, count, index) {
      if (!this.liking) {
        this.liking = true;
        termService
          .termLike(this.campId, this.termId, {
            widget_id: this.category.id,
            resource_id: resourceId,
            resource_type: 1,
            count
          })
          .then(() => {
            const diff = count - this.feedbacks[index].auth_like_count;
            this.$set(this.feedbacks, index, {
              ...this.feedbacks[index],
              auth_like_count: count,
              like_count: this.feedbacks[index].like_count + diff
            });
          })
          .finally(() => {
            this.liking = false;
          });
      } else {
        this.$notice({
          type: "warning",
          title: "太快了～"
        });
      }
    },
    handleAddedFeedback(params) {
      this.feedbacks.unshift({
        ...params,
        like_count: 0,
        auth_like_count: 0,
        user: this.userInfo
      });
    }
  }
};
</script>

<style lang="less" scoped>
.feedback-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #494949;
  .feedback-content {
    flex: 1;
    width: 100%;
    height: 5px;
    overflow: hidden;
    .scroll-section {
      width: calc(100% + 15px);
      height: 100%;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        width: 15px;
      }
    }
    .feedback-content-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 40px;
    }
    .feedback-content-title {
      line-height: 34px;
      font-weight: 600;
      font-size: 24px;
      color: #dddddd;
    }
    .feedback-content-desc {
      margin-top: 6px;
      line-height: 24px;
      font-size: 14px;
      color: #81948b;
    }
  }
  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    flex: 1;
    font-size: 16px;
    font-weight: 600;
    color: #dddddd;
  }

  .feedback-footer {
    flex: none;
    padding: 16px;
    background: #393939;
  }
}
</style>
