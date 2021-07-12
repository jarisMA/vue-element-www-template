<template>
  <div class="task-content">
    <div class="container-1180">
      <div class="task-head">
        <div class="task-title">
          本周中标榜
        </div>
        <div class="task-ranking">
          <div class="ranking-left">
            <rank-card />
          </div>
          <div class="ranking-right">
            <ul>
              <li>
                <rank-item />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="task-body">
        <task-card v-for="item of task" :key="item.uuid" :task="item" />
      </div>
    </div>
  </div>
</template>

<script>
import TaskCard from "./widgets/TaskCard.vue";
import RankCard from "./widgets/RankCard.vue";
import RankItem from "./widgets/RankItem.vue";

export default {
  name: "Task",
  components: {
    TaskCard,
    RankCard,
    RankItem
  },
  data() {
    return {
      task: [
        {
          uuid: "CE4F4A8C-4A46-4363-B361-B903F2465101",
          name: "雅斯的空间",
          level: 2,
          cover_url:
            "http://docee.oss-cn-shanghai.aliyuncs.com/admin/2021/0701/task/ikxg02aVZd5Gm4R305tL1ZZUAVzjRiP7hVH8MGHP.png",
          type: 1,
          type_label: "布局任务",
          bid_type: 1,
          bid_type_label: "公开招募",
          status: 2,
          status_label: "进行中",
          created_at: "2021-06-30",
          end_at: "2021-09-30 23:59:59",
          price: "1000.00",
          urgent_price: "0.00",
          experience_point: 200,
          city: {
            city: {
              id: 130300,
              name: "秦皇岛市"
            },
            province: {
              id: 130000,
              name: "河北省"
            },
            layout: {
              type1: 2,
              type2: 2,
              type3: 2
            },
            square: 80,
            max_apply: 10
          }
        }
      ],
      rank: [
        {
          id: 1,
          no: 1,
          cover_url:
            "http://docee.oss-cn-shanghai.aliyuncs.com/admin/2021/0701/task/ikxg02aVZd5Gm4R305tL1ZZUAVzjRiP7hVH8MGHP.png",
          name: "雅斯的空间",
          price: "1000.00"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.task-content {
  width: 100%;
  height: 100%;
  background: white;

  .container-1180 {
    width: 1180px;
    height: 100%;
    margin: 0 auto;
    padding-top: 100px;

    .task-head {
      width: 100%;

      .task-title {
        position: relative;
        display: flex;
        justify-content: center;
        top: 18px;
        padding-top: 8px;
        width: 151px;
        height: 48px;
        font-weight: 600;
        font-size: 14px;
        color: black;
        background-image: url("~images/task/title.svg");
        background-repeat: no-repeat;
        z-index: 1;
      }

      .task-ranking {
        position: relative;
        display: flex;
        padding: 55px 0px 0px 30px;
        width: 780px;
        height: 311px;
        background-image: url("~images/task/head.svg");
        z-index: 2;

        .ranking-left {
          width: 525px;
        }

        .ranking-right {
          position: relative;
          top: -30px;
          height: 185px;
        }
      }
    }

    .task-body {
      padding-top: 100px;
    }
  }
}
</style>
