<template>
  <div class="page-detail">
    <div class="widget-info">
      <div class="widget-info-left">
        <div class="tab-header">
          <div class="tab-header__nav-wrap">
            <div class="tab-list">
              <div class="tab-item">
                委托人基本信息<span class="border"></span>
              </div>
              <div class="tab-item">房屋概况<span class="border"></span></div>
              <div class="tab-item">需求详情<span class="border"></span></div>
              <div class="tab-item active">
                需求详情<span class="border"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="info-body">
          <detail-info :people-info="peopleInfo" :favor-info="favorInfo" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DetailInfo from "./widgets/DetailInfo";
import taskService from "@/global/service/task";
export default {
  components: {
    DetailInfo
  },
  data() {
    return {
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
      }
    };
  },
  created() {
    // this.getData();
  },
  methods: {
    getData() {
      taskService.taskId(this.$route.params.id).then(res => {
        this.taskInfo = res;
        this.peopleInfo = res.extra.peopleInfo;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.widget-info {
  width: 1180px;
  margin: 0 auto;
  padding-top: 38px;
  .widget-info-left {
    width: 780px;
    .tab-header {
      padding: 0;
      position: relative;
      border-bottom: 2px solid #d3d3d3;
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
        border-bottom: none;
        color: #c4c4c4;
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
          border-bottom: 2px solid #d3d3d3;
          z-index: 3;
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
      border-left: 2px solid #d3d3d3;
      border-right: 2px solid #d3d3d3;
      border-bottom: 2px solid #d3d3d3;
    }
  }
}
</style>
