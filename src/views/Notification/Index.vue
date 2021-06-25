<template>
  <div class="notification-section" v-loading="loading">
    <div class="container-1180">
      <div class="notification-title">
        消息通知
      </div>
      <div class="notification-content">
        <div class="notification-left" v-if="total > 0">
          <ul>
            <li
              class="notification-left-item"
              v-for="item of notifications"
              :key="item.id"
              @click="handleNotificationClick(item)"
            >
              <!-- <img
                class="notification-left-icon"
                src="~images/notification/approve.svg"
              /> -->
              <img
                :class="[
                  item.read_at ? 'grey-scale' : '',
                  'notification-left-icon'
                ]"
                src="~images/notification/highlight.svg"
                v-if="item.data.type == 'question_like'"
              />
              <img
                :class="[
                  item.read_at ? 'grey-scale' : '',
                  'notification-left-icon'
                ]"
                src="~images/notification/clap.svg"
                v-else-if="item.data.type == 'question_answer_like'"
              />
              <img
                :class="[
                  item.read_at ? 'grey-scale' : '',
                  'notification-left-icon'
                ]"
                src="~images/notification/reply.svg"
                v-else
              />
              <!-- <img
                class="notification-left-icon"
                src="~images/notification/reject.svg"
              /> -->
              <div>
                <p>
                  <span
                    :class="[item.read_at ? 'item-read' : '', 'item-title']"
                    >{{ item.data.title }}</span
                  >
                  <span class="item-time">{{
                    formatDate(item.created_at, (format = "MM/DD"))
                  }}</span>
                </p>
                <p
                  :class="[item.read_at ? 'item-read' : '', 'item-description']"
                >
                  {{ item.data.description }}
                </p>
              </div>
            </li>
          </ul>
          <pagination
            class="pagination"
            :pageSize="size"
            :current-page="page"
            :total="total"
            @change-page="getData"
          />
        </div>
        <the-empty
          v-else-if="!loading"
          noText="你的信箱空空如也"
          class="empty-content"
        />
        <div class="notification-right" v-if="!loading">
          <ul>
            <li
              @click="getData(1, '', 1)"
              :class="[
                'notification-right-text',
                activeTab === 1 ? 'text-bold' : ''
              ]"
            >
              回复我的
            </li>
            <li
              @click="getData(1, 'question_answer_like', 2)"
              :class="[
                'notification-right-text',
                activeTab === 2 ? 'text-bold' : ''
              ]"
            >
              获得鼓掌
            </li>
            <li
              @click="getData(1, 'question_like', 3)"
              :class="[
                'notification-right-text',
                activeTab === 3 ? 'text-bold' : ''
              ]"
            >
              帮忙擦亮
            </li>
          </ul>

          <!-- <div class="notification-right-title">
            <span class="noti-filter">筛选</span>
            <el-checkbox v-model="checkAll" @change="handleAll"
              >选择全部</el-checkbox
            >
          </div>
          <div class="notification-right-content">
            <el-checkbox v-model="checkCourse" @change="handleCourse">
              课程消息</el-checkbox
            >
            <el-checkbox-group v-model="checkHomework">
              <el-checkbox
                class="sub-checkbox"
                v-for="homework in homeworks"
                :label="homework"
                :key="homework"
                >{{ homework }}</el-checkbox
              >
            </el-checkbox-group>

            <el-checkbox v-model="checkQuestion" @change="handleQuestion">
              问答消息</el-checkbox
            >
            <el-checkbox-group v-model="checkAnswer">
              <el-checkbox
                class="sub-checkbox"
                v-for="question in questions"
                :label="question"
                :key="question"
                >{{ question }}</el-checkbox
              >
            </el-checkbox-group>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import notificationService from "service/notification";
import Pagination from "components/Pagination";
import { goQuestionDetail } from "utils/routes";
import { formatDate } from "utils/moment";
import TheEmpty from "components/TheEmpty";

const homework = ["作业批复", "作业驳回"];
const question = ["回复我的", "获得鼓掌", "帮忙擦亮"];
export default {
  components: { Pagination, TheEmpty },
  name: "Notification",
  data() {
    return {
      checkAll: true,
      checkCourse: true,
      checkQuestion: true,
      homeworks: homework,
      questions: question,
      checkHomework: ["作业批复", "作业驳回"],
      checkAnswer: ["回复我的", "获得鼓掌", "帮忙擦亮"],
      notifications: [],
      size: 8,
      page: 1,
      total: 0,
      activeTab: "1",
      loading: true
    };
  },
  created() {
    this.getData();
    this.activeTab = 1;
  },

  methods: {
    formatDate,
    goQuestionDetail,
    handleTabChange(index) {
      this.activeTab = index;
    },
    handleAll(val) {
      this.checkHomework = val ? homework : [];
      this.checkAnswer = val ? question : [];
      this.checkCourse = val;
      this.checkQuestion = val;
    },
    handleCourse(val) {
      this.checkHomework = val ? homework : [];
    },
    handleQuestion(val) {
      this.checkAnswer = val ? question : [];
    },
    handleNotificationClick(item) {
      notificationService.notification(item.id).then((item.read_at = true));
      if (item.data.question_id) {
        goQuestionDetail(item.data.question_id);
      }
    },
    getData(start = 1, type, index) {
      this.activeTab = index;
      notificationService
        .notifications({
          page_size: this.size,
          page: start,
          type
        })
        .then(res => {
          this.notifications = res.list;
          this.total = res.pagination.total;
          this.page = start;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.notification-section {
  width: 100%;
  height: 100%;
  background: #fff !important;

  .container-1180 {
    width: 1180px;
    height: 100%;
    margin: 0 auto;

    .notification-title {
      padding: 40px 0px;
      font-size: 24px;
      font-weight: 600;
      color: #2c3330;
    }

    .notification-content {
      display: flex;
      width: 100%;
      height: 100%;

      .empty-content {
        width: 860px;
        height: 100%;
      }

      .notification-left {
        width: 860px;
        height: 100%;

        .notification-left-item {
          display: flex;
          align-items: center;
          height: 90px;
          border-bottom: 1px solid #efefef;
          cursor: pointer;

          &:hover {
            .item-title,
            .item-description {
              color: #606c66;
            }
          }

          .notification-left-icon {
            width: 40px;
            height: 40px;
            margin-right: 16px;
          }

          .grey-scale {
            filter: grayscale(1);
          }

          .item-title {
            font-size: 16px;
            font-weight: 500;
            color: #2c3330;
          }

          .item-read {
            color: #81948b;
          }

          .item-time {
            margin-left: 10px;
            font-size: 16px;
            font-weight: 500;
            color: #8ea098;
          }

          .item-description {
            margin-top: 15px;
            font-size: 14px;
            font-weight: 400px;
            color: #2c3330;
          }
        }
      }

      .notification-right {
        margin-left: 40px;
        padding: 16px;
        width: 280px;
        height: 152px;
        border: 1px solid #efefef;
        font-size: 14px;
        font-weight: 400;
        color: #606c66;

        .notification-right-text {
          padding-left: 6px;
          line-height: 40px;

          &.text-bold {
            font-weight: 600;
            color: #14af64;
          }

          &:hover {
            color: #14af64;
            background-color: #eff9f4;
            cursor: pointer;
          }
        }

        .notification-right-title {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .noti-filter {
            font-size: 16px;
            font-weight: 500;
            color: #2c3330;
          }
        }

        .notification-right-content {
          font-size: 14px;
          font-weight: 400px;
          color: #606c66;

          .sub-checkbox {
            display: block;
            margin-left: 35px;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
.pagination {
  margin-top: 40px;
  margin-bottom: 80px;
}
</style>
