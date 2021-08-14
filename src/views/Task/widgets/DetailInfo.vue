<template>
  <div class="widget-info">
    <div class="widget-content">
      <template v-if="tab == 'designInfo'">
        <template v-for="(design, designKey) of newDesignInfo">
          <div class="design-container" :key="designKey">
            <div class="design-title">
              {{
                designKey == "partly_nominated"
                  ? "部分入围"
                  : designKey == "wholly_nominated"
                  ? "入围方案"
                  : designKey == "selected"
                  ? "胜选方案"
                  : "交付结果"
              }}
            </div>
            <template v-if="design.length">
              <div class="design-user-list">
                <template v-for="(designUser, designUserIdx) in design">
                  <div class="design-user-item" :key="designUserIdx">
                    <img
                      class="user-item-avatar__img"
                      :src="designUser.user.avatar_url"
                      alt=""
                    />
                    <div
                      class="user-item-avatar__cover"
                      :class="{ active: designUser.active }"
                      @click="handleSelectUser(design, designUserIdx)"
                    ></div>
                    <div class="user-item-name">
                      {{ designUser.user.realname || designUser.user.nickname }}
                    </div>
                  </div>
                </template>
              </div>
              <div class="design-design-content">
                <div class="design-tab-header">
                  <div class="design-tab-header_nav-wrap">
                    <div class="tab-list">
                      <div class="tab-item active">
                        方案<span class="border"> </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="design-info-body">
                  <template v-for="(designItem, designItemIdx) in design">
                    <a
                      class="design-info-item"
                      :href="designItem.file_url"
                      target="_blank"
                      :key="designItemIdx"
                      v-show="designItem.active"
                    >
                      <i class="design-info-item__icon"></i>
                      <span class="design-info-item__name">{{
                        designItem.file_name
                      }}</span>
                    </a>
                  </template>
                </div>
              </div>
            </template>
            <div class="design-container-empty" v-if="!design.length">
              <i
                class="design-container-empty__icon"
                :class="['design-container-empty__icon--' + designKey]"
              ></i>
              <div class="design-container-empty__text">
                {{
                  designKey == "selected" ? "业主正在选择中" : "深化暂未完成"
                }}
              </div>
            </div>
          </div>
        </template>
      </template>
      <template v-if="tab == 'peopleInfo'">
        <div class="widget-title">
          基础情况
        </div>
        <div class="people-container">
          <div class="people-list">
            <div
              class="people-item"
              v-for="people in peopleInfo"
              :key="people.id"
            >
              <span class="people-tag"
                ><span class="people-tag__wrap">{{
                  people.frequence_id == 1 ? "常" : "偶"
                }}</span></span
              >
              <span class="people-name">{{ people.name }}</span>
              <span class="item-description">{{ people.description }}</span>
            </div>
          </div>
          <div class="favor-list">
            <div class="favor-item">
              <div class="favor-title">业主期待/核心诉求</div>
              <div class="item-description">{{ favorInfo.expectation }}</div>
            </div>
            <div class="favor-item">
              <div class="favor-title">柜体形式喜好</div>
              <div class="item-description">
                {{
                  CABINET_FAVOR.filter(
                    d => d.id == favorInfo.cabinet_favor_id
                  )[0].name
                }}
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="tab == 'houseInfo'">
        <div class="widget-title">
          基础情况
        </div>
        <div class="house-container">
          <div
            class="grid-item house-item"
            :class="{ 'flex-basis': item.type == 'input' }"
            v-for="(item, houseIndex) in houseInfo"
            :key="houseIndex"
          >
            <div class="item__title">{{ item.name }}</div>
            <div class="item__value" v-if="item.type == 'select' && item.value">
              {{ item.options.filter(d => d.id == item.value)[0].name }}
            </div>
            <div class="item__value" v-if="item.type == 'input' && item.value">
              {{ item.value }}
            </div>
          </div>
        </div>
        <template v-if="houseInfo_images.length">
          <div class="widget-title">
            图片
          </div>
          <div class="info-img-container">
            <img
              class="info-img__item"
              v-for="(img, imgIndex) in houseInfo_images"
              :key="imgIndex"
              :src="img.url + '?x-oss-process=style/pc_bible_300wh'"
              @click="previewImage(imgIndex, houseInfo_images, 'img')"
            />
          </div>
        </template>
        <template v-if="houseInfo_videos.length">
          <div class="widget-title">
            视频
          </div>
          <div class="info-img-container">
            <video
              class="info-img__item"
              v-for="(video, videoIndex) in houseInfo_videos"
              :key="videoIndex"
              :src="video.url"
              @click="previewImage(videoIndex, houseInfo_videos, 'video')"
            ></video>
          </div>
        </template>
      </template>
      <template v-if="tab == 'spaceInfo'">
        <div class="space-container">
          <div class="space-tab__nav">
            <div
              :class="[activeIndex == index ? 'active' : '']"
              class="space-tab__nav-item"
              v-for="(space, index) in newSpaceInfo"
              :key="space.id"
              @click="activeIndex = index"
            >
              {{ space.display_name || space.name }}
            </div>
          </div>
          <div class="space-tab-body">
            <template v-for="(space, spaceIndex) in newSpaceInfo">
              <div :key="spaceIndex" v-show="spaceIndex == activeIndex">
                <div class="tab-body__content">
                  <template
                    v-for="(spaceItem, spaceItemIndex) in space.children"
                  >
                    <div
                      :key="spaceItemIndex"
                      class="grid-item"
                      :class="{ 'flex-basis': spaceItem.type == 'input' }"
                    >
                      <div class="item__title">{{ spaceItem.name }}</div>
                      <div class="item__value">
                        {{ spaceItem.select_value }}
                      </div>
                    </div>
                  </template>
                </div>
                <template
                  v-if="space.space_images && space.space_images.length"
                >
                  <div class="widget-title">
                    图片
                  </div>
                  <div class="info-img-container">
                    <img
                      class="info-img__item"
                      v-for="(img, imgIndex) in space.space_images"
                      :key="imgIndex"
                      :src="img.url + '?x-oss-process=style/pc_bible_300wh'"
                      @click="previewImage(imgIndex, space.space_images, 'img')"
                    />
                  </div>
                </template>
                <template
                  v-if="space.space_videos && space.space_videos.length"
                >
                  <div class="widget-title">
                    视频
                  </div>
                  <div class="info-img-container">
                    <video
                      class="info-img__item"
                      v-for="(video, videoIndex) in space.space_videos"
                      :key="videoIndex"
                      :src="video.url"
                      @click="
                        previewImage(videoIndex, space.space_videos, 'video')
                      "
                    ></video>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </div>
      </template>
      <template v-if="tab == 'attachmentInfo'">
        <div class="attachment-container">
          <div
            class="attachment-item"
            v-for="(attachment, attachmentIndex) in attachmentInfo"
            :key="attachmentIndex"
          >
            <i class="attachment-item__icon"></i>
            <div class="attachment-item__name">{{ attachment.name }}</div>
            <a
              :href="attachment.url"
              :download="attachment.name"
              class="attachment-item__download"
              >下载</a
            >
          </div>
        </div>
      </template>
      <template v-if="tab == 'supplementInfo'">
        <div class="supplement-container">
          <div
            v-if="supplementInfo.content"
            v-html="supplementInfo.content"
            class="homework-card supplement-content"
          ></div>
          <div
            class="supplement-attachment"
            v-if="supplementInfo && supplementInfo.attachment_files"
          >
            <div class="attachment-container__title">附件</div>
            <div
              class="attachment-item"
              v-for="(attachment, attachmentIndex) in attachmentInfo"
              :key="attachmentIndex"
            >
              <i class="attachment-item__icon"></i>
              <div class="attachment-item__name">{{ attachment.name }}</div>
              <a
                :href="attachment.url"
                :download="attachment.name"
                class="attachment-item__download"
                >下载</a
              >
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import {
  CABINET_FAVOR,
  TASK_TYPE,
  TASK_BID_TYPE,
  TASK_STATUS
} from "../common";

export default {
  name: "WidgetDetailInfo",
  props: {
    tab: {
      type: String,
      default: "designInfo" || "peopleInfo"
    },
    designInfo: {
      type: Object,
      default: () => {}
    },
    peopleInfo: {
      type: Array,
      default: () => []
    },
    favorInfo: {
      type: Object,
      default: () => {}
    },
    houseInfo: {
      type: Array,
      default: () => []
    },
    houseInfo_images: {
      type: Array,
      default: () => []
    },
    houseInfo_videos: {
      type: Array,
      default: () => []
    },
    spaceInfo: {
      type: Array,
      default: () => []
    },
    attachmentInfo: {
      type: Array,
      default: () => []
    },
    supplementInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      CABINET_FAVOR,
      TASK_TYPE,
      TASK_BID_TYPE,
      TASK_STATUS,
      activeIndex: 0,
      newDesignInfo: {}
    };
  },
  watch: {
    designInfo(val) {
      this.dealDesignInfo(val);
    }
  },
  computed: {
    newSpaceInfo() {
      const result = this.spaceInfo.map(space => {
        return {
          display_name: space.display_name,
          id: space.id,
          name: space.name,
          space_images: space.space_images,
          space_videos: space.space_videos,
          children: space.children.map(spaceItem => {
            let select_value = "";
            if (spaceItem.type == "select") {
              const temArr = [];
              spaceItem.options.forEach(opt => {
                if (spaceItem.multiple) {
                  spaceItem.value.forEach(val => {
                    if (val == opt.id) {
                      temArr.push(opt.name);
                    }
                  });
                } else {
                  if (spaceItem.value == opt.id) {
                    temArr.push(opt.name);
                  }
                }
              });
              select_value = temArr.join("、");
            } else if (spaceItem.type == "input") {
              select_value = spaceItem.value;
            }
            return {
              id: spaceItem.id,
              name: spaceItem.name,
              type: spaceItem.type,
              select_value
            };
          })
        };
      });
      return result;
    }
  },
  created() {
    this.dealDesignInfo(this.designInfo);
  },
  methods: {
    dealDesignInfo(data) {
      this.newDesignInfo = Object.assign({}, data);
    },
    previewImage(idx, fileList, fileType) {
      this.$emit("show", {
        activeFileIndex: idx,
        fileList,
        fileType
      });
    },
    handleSelectUser(design, designUserIdx) {
      design.forEach((d, index) => {
        d.active = index === designUserIdx ? true : false;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.widget-info {
  padding: 0 6px 6px;
}

.widget-title {
  height: 48px;
  line-height: 48px;
  font-weight: 500;
  font-size: 14px;
  color: #000000;
}
.item-description {
  width: 610px;
  padding: 12px 11px 12px 30px;
  line-height: 17px;
  font-size: 12px;
  text-align: justify;
  color: #656565;
}
.grid-item {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-self: stretch;
  padding: 18px 5px;
  width: 191px;
  background-color: #f4f4f4;
  text-align: center;
  font-size: 12px;
  line-height: 17px;
  .item__title {
    margin-bottom: 4px;
    font-weight: 600;
    font-size: 12px;
    line-height: 17px;
    color: #14af64;
  }
  .item__value {
    color: #878787;
  }
}
.design-container {
  padding-top: 30px;
  .design-title {
    margin: 0 auto 30px;
    height: 40px;
    width: 108px;
    background-image: url("~images/task/detailInfo-design-title.svg");
    background-repeat: no-repeat;
    background-size: 108px 40px;
    line-height: 40px;
    font-weight: 600;
    font-size: 18px;
    color: #ffffff;
    text-align: center;
  }
  .design-user-list {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    .design-user-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 92px;
      padding: 0 4px;
      .user-item-avatar__cover {
        margin-bottom: 2px;
        width: 52px;
        height: 58px;
        mask-image: url("~images/task/detailInfo-avatar-border.svg");
        mask-repeat: no-repeat;
        mask-size: cover;
        background-color: #e9e9e9;
        cursor: pointer;
        &.active {
          background-color: #000000;
        }
      }
      .user-item-avatar__img {
        position: absolute;
        top: 0px;
        display: inline-block;
        width: 52px;
        height: 58px;
        object-fit: cover;
        clip-path: polygon(
          0 14px,
          26px 1px,
          100% 14px,
          100% calc(100% - 14px),
          26px calc(100% - 1px),
          0 calc(100% - 14px) ;
        );
      }
      .user-item-name {
        width: 100%;
        height: 24px;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        color: #2c3330;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .design-design-content {
    padding: 0 20px;
    .design-tab-header {
      padding: 0;
      position: relative;
      .design-tab-header_nav-wrap {
        position: relative;
        margin-bottom: -2px;
        clear: both;
        .tab-list {
          height: 40px;
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
      }
    }
    .design-info-body {
      clear: both;
      padding: 20px;
      border-top: 2px solid #d3d3d3;
      border-left: 2px solid #d3d3d3;
      border-right: 2px solid #d3d3d3;
      border-bottom: 2px solid #d3d3d3;
      background-color: #ffffff;
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
      .design-info-item {
        display: flex;
        align-items: center;
        height: 30px;
        padding: 0 13px;
        background: #f4f4f4;
        .design-info-item__icon {
          width: 14px;
          height: 20px;
          margin-right: 10px;
          background: url("~images/task/card-design.svg") no-repeat;
          background-size: 14px 20px;
        }
        .design-info-item__name {
          flex: 1;
          line-height: 30px;
          color: #000000;
          font-size: 14px;
          text-align: left;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        &:last-child {
          margin-bottom: 0;
        }
        &:hover {
          .design-info-item__name {
            color: #20b36c;
          }
        }
      }
    }
  }
  .design-container-empty {
    padding-bottom: 60px;
    .design-container-empty__icon {
      display: block;
      margin: 0 auto;
      width: 160px;
      height: 100px;
      &.design-container-empty__icon--selected {
        background-image: url("~images/task/detailInfo-design-selected.svg");
        background-repeat: no-repeat;
        background-size: 160px 100px;
      }
      &.design-container-empty__icon--final {
        background-image: url("~images/task/detailInfo-design-final.svg");
        background-repeat: no-repeat;
        background-size: 160px 100px;
      }
    }
    .design-container-empty__text {
      font-size: 14px;
      line-height: 20px;
      color: #c8d0cc;
      text-align: center;
    }
  }
  &:last-child {
    padding-bottom: 80px;
  }
}
.people-container {
  padding-bottom: 6px;
  .people-list {
    .people-item {
      display: flex;
      border-top: 1px solid #e4e4e4;
      .people-tag {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 15px;
        border-right: 1px solid #e4e4e4;
        .people-tag__wrap {
          display: inline-block;
          width: 24px;
          height: 24px;
          background-color: #14af64;
          color: #101010;
          font-weight: 500;
          line-height: 24px;
          text-align: center;
        }
      }
      .people-name {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 100px;
        padding: 0 4px;
        overflow: hidden;
        border-right: 1px solid #e4e4e4;
        color: #656565;
      }
    }
  }
  .favor-list {
    .favor-item {
      display: flex;
      border-top: 1px solid #e4e4e4;
      .favor-title {
        display: flex;
        align-items: center;
        width: 155px;
        padding-left: 15px;
        border-right: 1px solid #e4e4e4;
        color: #14af64;
        font-size: 12px;
        line-height: 17px;
      }
    }
  }
}
.house-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  line-height: 17px;
  .house-item {
    &.flex-basis {
      flex-basis: 50%;
      border-right: 1px solid #e4e4e4;
      &:first-child {
        border-right: 1px solid #e4e4e4;
      }
    }
    &:nth-child(n + 5):nth-child(-n + 8) {
      background-color: #ececec;
    }
    &:nth-last-child(-n + 2) {
      background-color: #ececec;
    }
    &:last-child {
      border-right: none;
    }
    &:nth-child(-n + 2) {
      border-right: 1px solid #e4e4e4;
    }
    &:nth-child(n + 5):nth-child(-n + 6) {
      border-right: 1px solid #e4e4e4;
    }
    &:nth-child(n + 9):nth-child(-n + 10) {
      border-right: 1px solid #e4e4e4;
    }
  }
}
.info-img-container {
  display: flex;
  flex-wrap: wrap;
  .info-img__item {
    display: inline-block;
    margin: 0 8px 8px 0;
    width: 50px;
    height: 50px;
    object-fit: cover;
    cursor: pointer;
  }
}
.space-container {
  padding: 17px 0;
  .space-tab__nav {
    display: flex;
    overflow: scroll;
    .space-tab__nav-item {
      width: fit-content;
      height: 27px;
      padding: 0 10px 5px;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
      color: #a5a5a5;
      cursor: pointer;
      white-space: nowrap;
      transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        border 0.2s ease-out;
      &.active {
        font-weight: 500;
        color: #434343;
        border-bottom: 2px solid #14af64;
      }
    }
  }
  .tab-body__content {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-top: 1px solid #a5a5a5;
    .grid-item {
      border-right: 1px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
      &:nth-child(2n) {
        background-color: #ececec;
      }
      &.flex-basis {
        flex-basis: 50%;
      }
    }
  }
}
.supplement-attachment,
.attachment-container {
  padding: 10px 0;
  .attachment-container__title {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #000000;
    margin-bottom: 10px;
  }
  .attachment-item {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 38px 0 27px;
    margin-bottom: 6px;
    background-color: #f4f4f4;
    line-height: 40px;
    .attachment-item__icon {
      width: 26px;
      height: 30px;
      background: url("~images/task/file-icon.svg") no-repeat;
      background-size: 26px 30px;
    }
    .attachment-item__name {
      flex: 1;
      padding: 0 17px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 14px;
      line-height: 20px;
      color: #000000;
    }
    .attachment-item__download {
      display: inline-block;
      font-size: 14px;
      line-height: 20px;
      text-decoration-line: underline;
      color: #14af64;
    }
  }
}
.supplement-container {
  padding: 17px 0;
  .supplement-content {
    background-color: #fafafa;
    padding: 10px;
  }
  .supplement-attachment {
    .attachment-item {
      background-color: #fafafa;
    }
  }
}
</style>
