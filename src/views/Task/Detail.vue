<template>
  <div class="page-detail">
    <div class="task-info" v-loading="loading">
      <div class="widget-info-left">
        <div class="tab-header">
          <div class="tab-header__nav-wrap">
            <div class="tab-list">
              <template v-for="(tab, tabIndex) in tabList">
                <div
                  v-if="tab.show"
                  class="tab-item"
                  :class="{
                    active: currentTab == tab.tab
                  }"
                  :key="tabIndex"
                  @click="handleChangeTab(tab.tab)"
                >
                  {{ tab.name }}<span class="border"> </span>
                  <span
                    class="circle"
                    v-if="tab.tab == 'supplementInfo'"
                  ></span>
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="info-body">
          <detail-info
            :tab="currentTab"
            :design-info="designInfo"
            :people-info="peopleInfo"
            :favor-info="favorInfo"
            :house-info="houseInfo"
            :house-info_images="houseInfo_images"
            :house-info_videos="houseInfo_videos"
            :space-info="spaceInfo"
            :attachment-info="attachmentInfo"
            :supplement-info="supplementInfo"
            @show="previewImage"
          />
        </div>
      </div>
      <div class="widget-info-right">
        <detail-task-card
          :task="taskInfo"
          @toggleShowDialog="toggleShowApplyDialog"
          @upload="handleUploadFile"
          @update="handleUpdateFile"
          @delete="handleDeleteFile"
        />
      </div>
    </div>
    <apply-dialog
      v-if="showApplyDialog"
      :task="taskInfo"
      :show-dialog.sync="showApplyDialog"
      :type="applyDialogType"
      @signUp="handleSignUP"
    ></apply-dialog>
    <preview-file-dialog
      :show-preview-file-dialog.sync="showPreviewFileDialog"
      :file-list="fileList"
      :file-type="fileType"
      :active-file-index.sync="activeFileIndex"
      @update="updateActiveIndex"
    ></preview-file-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import DetailInfo from "./widgets/DetailInfo";
import DetailTaskCard from "./widgets/DetailTaskCard";
import ApplyDialog from "./widgets/ApplyDialog";
import taskService from "@/global/service/task";
import PreviewFileDialog from "./widgets/PreviewFileDialog";

export default {
  name: "TaskDetail",
  components: {
    DetailInfo,
    DetailTaskCard,
    ApplyDialog,
    PreviewFileDialog
  },
  data() {
    return {
      loading: false,
      showApplyDialog: false,
      applyDialogType: "",
      showPreviewFileDialog: false,
      activeFileIndex: null,
      fileList: [],
      fileType: "",
      currentTab: "peopleInfo",
      taskInfo: {
        total_price: "00"
      },
      designInfo: {
        partly_nominated: [],
        wholly_nominated: [],
        selected: []
      },
      peopleInfo: [
        {
          description: "",
          frequence_id: "",
          id: null,
          name: ""
        }
      ],
      favorInfo: {
        cabinet_favor_id: 1,
        expectation: ""
      },
      houseInfo: [],
      houseInfo_images: [],
      houseInfo_videos: [],
      spaceInfo: [],
      attachmentInfo: [],
      supplementInfo: {},
      tabList: [{}]
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    getData() {
      this.loading = true;
      taskService
        .taskId(this.$route.params.id)
        .then(res => {
          const {
            designs = {},
            extra: {
              favorInfo = {},
              houseInfo = [],
              houseInfo_images = [],
              houseInfo_videos = [],
              peopleInfo = [],
              spaceInfo = [],
              supplementInfo = {},
              attachmentInfo = []
            } = {}
          } = res;

          const tabList = [];
          const is_designer = this.userInfo && this.userInfo.is_designer;
          designs &&
            tabList.push({
              tab: "designInfo",
              name: "入围和中标公示",
              show: is_designer
            });
          (peopleInfo || favorInfo) &&
            tabList.push({
              tab: "peopleInfo",
              name: "委托人基本信息",
              show: true
            });
          houseInfo.length &&
            tabList.push({
              tab: "houseInfo",
              name: "房屋概况",
              show: is_designer
            });
          spaceInfo.length &&
            tabList.push({
              tab: "spaceInfo",
              name: "需求详情",
              show: is_designer
            });
          attachmentInfo.length &&
            tabList.push({
              tab: "attachmentInfo",
              name: "附件下载",
              show: is_designer
            });
          (supplementInfo.content || supplementInfo.attachment_files) &&
            tabList.push({
              tab: "supplementInfo",
              name: "信息更新",
              show: is_designer
            });
          for (let i in designs) {
            designs[i].forEach((d, index) => {
              d.active = index === 0 ? true : false;
            });
          }
          this.currentTab = designs ? "designInfo" : "peopleInfo";
          this.tabList = tabList;
          this.designInfo = designs;
          this.taskInfo = res;
          this.peopleInfo = peopleInfo;
          this.favorInfo = favorInfo;
          this.houseInfo = houseInfo;
          this.houseInfo_images = houseInfo_images;
          //video url兼容
          houseInfo_videos.forEach(item => {
            item.url = item.url.split("?")[0];
          });
          this.houseInfo_videos = houseInfo_videos;

          spaceInfo.forEach(space => {
            space.space_videos.forEach(video => {
              video.url = video.url.split("?")[0];
            });
          });
          this.spaceInfo = spaceInfo;
          this.attachmentInfo = attachmentInfo;
          this.supplementInfo = supplementInfo
            ? {
                content: supplementInfo.content,
                attachment_files: JSON.parse(supplementInfo.attachment_files)
              }
            : {};
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleChangeTab(tab) {
      this.currentTab = tab;
    },
    toggleShowApplyDialog(e) {
      this.applyDialogType = e;
      this.showApplyDialog = !this.showApplyDialog;
    },
    previewImage(e) {
      const { activeFileIndex, fileList, fileType } = e;
      this.activeFileIndex = activeFileIndex;
      this.fileList = fileList;
      this.fileType = fileType;
      this.showPreviewFileDialog = true;
    },
    updateActiveIndex(e) {
      this.activeFileIndex = e;
    },
    handleSignUP() {
      const id = this.$route.params.id;
      taskService
        .taskApply(id)
        .then(() => {
          this.$notice({
            type: "success",
            title: `您已成功报名`
          });
          this.getData();
        })
        .finally(() => {
          this.showApplyDialog = false;
        });
    },
    handleUploadFile(e) {
      const { name, url } = e;
      const params = {
        file_name: name,
        file_url: url
      };
      this.loading = true;
      taskService
        .taskDesigns(this.$route.params.id, params)
        .then(() => {
          this.$notice({
            type: "success",
            title: `您已成功上传`
          });
          this.getData();
        })
        .catch(() => {
          this.$notice({
            type: "danger",
            title: `文件上传失败`
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleUpdateFile(e) {
      const { name, url } = e;
      const { status } = this.taskInfo;
      const key = status == 4 ? "source" : "final";
      const params = {
        [`${key}_file_name`]: name,
        [`${key}_file_url`]: url
      };
      this.loading = true;
      taskService
        .taskDesignUpdate(
          this.$route.params.id,
          this.taskInfo.my_designs_selected_id,
          params
        )
        .then(() => {
          this.$notice({
            type: "success",
            title: `您已成功上传`
          });
          this.getData();
        })
        .catch(() => {
          this.$notice({
            type: "danger",
            title: `文件上传失败`
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleDeleteFile(id) {
      this.loading = true;
      taskService
        .taskDesignDelete(this.$route.params.id, id)
        .then(() => {
          this.$notice({
            type: "success",
            title: `您已成功删除方案`
          });
          this.getData();
        })
        .finally(() => {
          this.loading = false;
        });
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
  padding: 38px 0;
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
        cursor: pointer;
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
