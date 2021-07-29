<template>
  <div class="page-detail">
    <div class="task-info">
      <div class="widget-info-left">
        <div class="tab-header">
          <div class="tab-header__nav-wrap">
            <div class="tab-list">
              <div
                class="tab-item"
                :class="{
                  active: currentTab == tab.tab
                }"
                v-for="(tab, tabIndex) in tabList"
                :key="tabIndex"
                @click="handleChangeTab(tab.tab)"
              >
                {{ tab.name }}<span class="border"> </span>
                <span class="circle" v-if="tab.tab == 'supplementInfo'"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="info-body">
          <detail-info
            :tab="currentTab"
            :people-info="peopleInfo"
            :favor-info="favorInfo"
            :house-info="houseInfo"
            :space-info="spaceInfo"
            :attachment-info="attachmentInfo"
            :supplement-info="supplementInfo"
          />
        </div>
      </div>
      <div class="widget-info-right">
        <mission-card
          :mission="taskInfo"
          @toggleShowDialog="toggleShowDialog"
        />
      </div>
    </div>
    <confirm-dialog
      :task="taskInfo"
      :show-dialog.sync="showDialog"
      :type="'signup'"
      @signUp="handleSignUP"
    ></confirm-dialog>
  </div>
</template>
<script>
import DetailInfo from "./widgets/DetailInfo";
import MissionCard from "./widgets/MissionCard";
import ConfirmDialog from "./widgets/ConfirmDialog";
import taskService from "@/global/service/task";
export default {
  name: "TaskDetail",
  components: {
    DetailInfo,
    MissionCard,
    ConfirmDialog
  },
  data() {
    return {
      showDialog: false,
      currentTab: "peopleInfo",
      taskInfo: {},
      peopleInfo: [
        {
          description: "主人",
          frequence_id: "1",
          id: 1,
          name: "小龙"
        },
        {
          description: "主人",
          frequence_id: "1",
          id: 2,
          name: "小龙"
        }
      ],
      favorInfo: {
        cabinet_favor_id: 1,
        expectation: "极简风"
      },
      houseInfo: [],
      spaceInfo: [],
      attachmentInfo: [],
      supplementInfo: {},
      tabList: [{}]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      taskService.taskId(this.$route.params.id).then(res => {
        this.taskInfo = res;
        this.peopleInfo = res.extra.peopleInfo;
        this.favorInfo = res.extra.favorInfo;
        this.houseInfo = res.extra.houseInfo;
        this.spaceInfo = res.extra.spaceInfo;
        this.attachmentInfo = JSON.parse(res.extra?.fileInfo?.attachment_files);
        this.supplementInfo = res.extra.supplementInfo
          ? {
              content: res.extra.supplementInfo.content,
              attachment_files: JSON.parse(
                res.extra?.supplementInfo?.attachment_files
              )
            }
          : {};
        const tabList = [];
        this.peopleInfo &&
          tabList.push({ tab: "peopleInfo", name: "委托人基本信息" });
        this.houseInfo && tabList.push({ tab: "houseInfo", name: "房屋概况" });
        this.spaceInfo && tabList.push({ tab: "spaceInfo", name: "需求详情" });
        this.attachmentInfo &&
          tabList.push({ tab: "attachmentInfo", name: "附件下载" });
        this.supplementInfo &&
          tabList.push({ tab: "supplementInfo", name: "信息更新" });
        this.tabList = tabList;
      });
    },
    handleChangeTab(tab) {
      this.currentTab = tab;
    },
    toggleShowDialog() {
      console.log("hello");
      this.showDialog = !this.showDialog;
    },
    handleSignUP() {
      console.log("singup");
    }
  }
};
</script>
<style lang="less" scoped>
.task-info {
  display: flex;
  justify-content: space-between;
  width: 1180px;
  margin: 0 auto;
  padding-top: 38px;
  .widget-info-left {
    width: 780px;
    .tab-header {
      padding: 0;
      position: relative;
      .tab-header__nav-wrap {
        position: relative;
        margin-bottom: -2px;
        clear: both;
      }
      .tab-list {
        height: 40px;
      }
      .tab-item {
        display: inline-block;
        position: relative;
        height: 40px;
        width: 112px;
        margin-left: -2px;
        border: 2px solid #e9e9e9;
        background-color: #f5f5f5;
        text-align: center;
        line-height: 38px;
        font-size: 12px;
        border-bottom: none;
        color: #c4c4c4;
        transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
          border 0.3s ease-in-out;
        .border {
          position: absolute;
          bottom: 0px;
          left: 0;
          content: "";
          width: 100%;
          height: 2px;
          background-color: #d3d3d3;
        }
        &:first-child {
          margin-left: 0px;
        }
        &.active {
          border-color: #d3d3d3;
          background-color: #fff;
          color: #000000;
          font-weight: 600;
          border-bottom: none;
          z-index: 3;
          .circle {
            position: absolute;
            top: 13px;
            right: 24px;
            content: "";
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: #ff0000;
          }
          .border {
            position: absolute;
            bottom: -2px;
            left: 0;
            content: "";
            width: 100%;
            height: 2px;
            background-color: #ffffff;
          }
          &:before,
          &:after {
            background-color: #d3d3d3;
          }
        }
        &:before {
          position: absolute;
          top: 0px;
          left: 0px;
          content: "";
          width: 2px;
          height: 2px;
          background-color: #e9e9e9;
        }
        &:after {
          position: absolute;
          top: 0px;
          right: 0px;
          content: "";
          width: 2px;
          height: 2px;
          background-color: #e9e9e9;
        }
        clip-path: polygon(
          0 100%,
          0 4px,
          2px 4px,
          2px 2px,
          4px 2px,
          4px 0,
          calc(100% - 4px) 0,
          calc(100% - 4px) 2px,
          calc(100% - 2px) 2px,
          calc(100% - 2px) 4px,
          100% 4px,
          100% 100%
        );
      }
    }
    .info-body {
      clear: both;
      width: 780px;
      background-color: #ffffff;
      border-top: 2px solid #d3d3d3;
      border-left: 2px solid #d3d3d3;
      border-right: 2px solid #d3d3d3;
      border-bottom: 2px solid #d3d3d3;
      clip-path: polygon(
        0 0,
        0 calc(100% - 2px),
        2px calc(100% - 2px),
        2px 100%,
        calc(100% - 2px) 100%,
        calc(100% - 2px) calc(100% - 2px),
        100% calc(100% - 2px),
        100% 2px,
        calc(100% - 2px) 2px,
        calc(100% - 2px) 0
      );
    }
  }
}
</style>
