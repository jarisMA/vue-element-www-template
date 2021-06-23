<template>
  <div class="noti-section">
    <div class="container-1180">
      <div class="noti-title">
        消息通知
      </div>
      <div class="noti-content">
        <div class="noti-left">
          <ul>
            <li
              class="noti-left-item"
              v-for="item of notifications"
              :key="item.id"
              @click="handleNotificationClick(item)"
            >
              <!-- <img
                class="noti-left-icon"
                src="~images/notification/approve.svg"
              /> -->
              <img
                :class="[item.read_at ? 'grey-scale' : '', 'noti-left-icon']"
                src="~images/notification/highlight.svg"
                v-if="item.data.type == 'question_like'"
              />
              <img
                :class="[item.read_at ? 'grey-scale' : '', 'noti-left-icon']"
                src="~images/notification/clap.svg"
                v-else-if="item.data.type == 'question_answer_like'"
              />
              <img
                :class="[item.read_at ? 'grey-scale' : '', 'noti-left-icon']"
                src="~images/notification/reply.svg"
                v-else
              />
              <!-- <img
                class="noti-left-icon"
                src="~images/notification/reject.svg"
              /> -->
              <div>
                <p>
                  <span class="item-title">{{ item.data.title }}</span>
                  <span class="item-time">{{
                    formatDate(item.created_at, (format = "MM/DD"))
                  }}</span>
                </p>
                <p class="item-descri">{{ item.data.description }}</p>
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
        <div class="noti-right">
          <ul>
            <li @click="getData(); handleTabChange(1)"  :class="['noti-right-text', activeTab === 1 ? 'text-bold' : '']">回复我的</li>
            <li @click="getData(1, 'question_answer_like'); handleTabChange(2)"  :class="['noti-right-text', activeTab === 2 ? 'text-bold' : '']">获得鼓掌</li>
            <li @click="getData(1, 'question_like'); handleTabChange(3)" :class="['noti-right-text', activeTab === 3 ? 'text-bold' : '']">帮忙擦亮</li>
          </ul>

          <!-- <div class="noti-right-title">
            <span class="noti-filter">筛选</span>
            <el-checkbox v-model="checkAll" @change="handleAll"
              >选择全部</el-checkbox
            >
          </div>
          <div class="noti-right-content">
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
const homework = ["作业批复", "作业驳回"];
const question = ["回复我的", "获得鼓掌", "帮忙擦亮"];
export default {
  components: { Pagination },
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
      activeTab: '1',
    };
  },
  created() {
    this.getData();
    this.activeTab = 1;
  },

  methods: {
    formatDate,
    goQuestionDetail,
    handleTabChange(index){
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
      goQuestionDetail(item.data.question_id);
      item.read_at = true;
    },
    getData(start = 1, type) {
      notificationService
        .notifications({
          page_size: this.size,
          page: start,
          type,
        })
        .then((res) => {
          this.notifications = res.list;
          this.total = res.pagination.total;
          this.page = start;
        })
        .finally(() => {
          console.log(this.notifications);
          console.log(this.patination);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.noti-section {
  width: 100%;
  height: 100%;

  .container-1180 {
    width: 1180px;
    height: 100%;
    margin: 0 auto;

    .noti-title {
      padding: 40px 0px;
      font-size: 24px;
      font-weight: 600;
      color: #2c3330;
    }

    .noti-content {
      display: flex;
      width: 100%;
      height: 100%;

      .noti-left {
        width: 860px;
        height: 100%;

        .noti-left-item {
          display: flex;
          align-items: center;
          height: 90px;
          border-bottom: 1px solid #efefef;
          cursor: pointer;

          &:hover {
            .item-title,
            .item-descri {
              color: #606c66;
            }
          }

          .noti-left-icon {
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

          .item-time {
            margin-left: 10px;
            font-size: 16px;
            font-weight: 500;
            color: #8ea098;
          }

          .item-descri {
            margin-top: 15px;
            font-size: 14px;
            font-weight: 400px;
            color: #2c3330;
          }
        }
      }

      .noti-right {
        margin-left: 40px;
        padding: 16px;
        width: 280px;
        height: 152px;
        border: 1px solid #efefef;
        font-size: 14px;
        font-weight: 400;
        color: #606c66;

        .noti-right-text{
          padding-left:  6px;
          line-height: 40px;

          &.text-bold{
            font-weight: 600;
            color: #14AF64;
          }

          &:hover{
            color: #14AF64;
            background-color: #EFF9F4;
            cursor: pointer;
          }
        }

        .noti-right-title {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .noti-filter {
            font-size: 16px;
            font-weight: 500;
            color: #2c3330;
          }
        }

        .noti-right-content {
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
  margin-top: 100px;
}

/deep/ .el-checkbox {
  margin: 8px;
}
</style>
