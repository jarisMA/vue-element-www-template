<template>
  <el-dialog
    class="page-wrapper"
    width="100%"
    top="0"
    lock-scroll
    :show-close="false"
    :visible="visible"
  >
    <div class="page">
      <div class="container-1144">
        <div class="page-header">
          <div class="page-header-title">标记式图文</div>
        </div>
        <div class="container-740">
          <div class="page-content">
            <div class="page-content-basic">
              <div class="form-title-wrapper">
                <the-avatar
                  class="avatar-wrapper"
                  :size="40"
                  :url="userInfo.avatar_url"
                />
                <el-input
                  class="form-title"
                  placeholder="请输入求助标题"
                  autofocus
                  :maxlength="45"
                  v-model="form.title"
                />
              </div>
              <div class="form-content-wrapper">
                <el-input
                  type="textarea"
                  placeholder="小贴士：此区域可以填写求助补充信息，例如房子是我和老公住，养一只中型犬，喜欢烹饪，不看电视等....（如不影响回答可不填）"
                  resize="none"
                  v-model="form.content"
                >
                </el-input>
              </div>
            </div>
            <div class="page-content-layout">
              <label class="page-label">
                上传户型图
              </label>
              <div class="form-layout-list">
                <div
                  class="form-layout-item"
                  v-for="(layout, index) of form.layouts"
                  :key="index"
                >
                  <div class="form-upload-layout" v-if="!layout.image_url">
                    <upload-image
                      class="form-upload-wrapper"
                      folder="question"
                      @added="
                        image_url => handleUpdateLayout(index, { image_url })
                      "
                    />
                    <i class="el-icon-picture" />
                    <p class="form-upload-title">
                      点击添加户型图
                    </p>
                    <p class="form-upload-tips">
                      建议图片清晰且户型结构不要被遮挡
                    </p>
                    <p class="form-upload-tips">
                      这样能够得到更好的解答
                    </p>
                  </div>
                  <div class="form-uploaded-layout" v-else>
                    <layout-editor
                      :layout="layout"
                      :pointLen="pointLen"
                      @update="params => handleUpdateLayout(index, params)"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="page-content-other">
              <label class="page-label">
                补充信息
                <span class="page-label-tips"
                  >信息完善有助于获得更全面的建议</span
                >
              </label>
              <div class="page-flex">
                <div class="form-city-wrapper flex-1">
                  <label class="form-label">房屋所在城市</label>
                  <el-cascader
                    class="form-city"
                    placeholder="选择所在城市"
                    :options="districts"
                    :show-all-levels="false"
                    v-model="form.informations.cityArr"
                    @change="handleCityChange"
                  ></el-cascader>
                </div>
                <div class="form-neighbourhood-wrapper flex-1">
                  <label class="form-label">小区名称</label>
                  <el-input
                    class="form-neighbourhood"
                    placeholder="输入小区名称"
                    :maxlength="8"
                    v-model="form.informations.neighbourhood"
                  ></el-input>
                </div>
              </div>
              <div class="page-flex">
                <div class="form-house_type-wrapper flex-1">
                  <label class="form-label">户型</label>
                  <div class="form-house_type">
                    <el-select
                      class="form-house_type-select form-house_type-1"
                      placeholder="请选择"
                      v-model="form.informations.houseType1"
                    >
                      <el-option
                        v-for="item of 10"
                        :key="item - 1"
                        :label="item - 1"
                        :value="item - 1"
                      ></el-option>
                    </el-select>
                    <el-select
                      class="form-house_type-select form-house_type-2"
                      placeholder="请选择"
                      v-model="form.informations.houseType2"
                    >
                      <el-option
                        v-for="item of 10"
                        :key="item - 1"
                        :label="item - 1"
                        :value="item - 1"
                      ></el-option>
                    </el-select>
                    <el-select
                      class="form-house_type-select form-house_type-3"
                      placeholder="请选择"
                      v-model="form.informations.houseType3"
                    >
                      <el-option
                        v-for="item of 10"
                        :key="item - 1"
                        :label="item - 1"
                        :value="item - 1"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
                <div class="form-area-wrapper flex-1">
                  <label class="form-label">建筑面积</label>
                  <el-input
                    class="form-area"
                    placeholder="输入建筑面积"
                    v-model="form.informations.area"
                    @keyup.native="handleAreaKeyUp"
                    :maxlength="5"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="page-footer">
            <div class="page-footer-left">
              <div class="form-channel-wrapper">
                <el-select
                  class="form-channel"
                  v-model="form.channel_id"
                  placeholder="选择一个板块"
                >
                  <el-option
                    v-for="channel of channels"
                    :key="channel.id"
                    :label="channel.name"
                    :value="channel.id"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="page-footer-right">
              <el-button
                :loading="saving"
                :disabled="publishing"
                @click="handlePublish(QUESTION_SAVE_STATUS)"
                >保存草稿</el-button
              >
              <el-button
                type="primary"
                :loading="publishing"
                :disabled="saving"
                @click="handlePublish(QUESTION_PUBLISH_STATUS)"
                >确认发布</el-button
              >
            </div>
          </div>
        </div>
        <div class="container-384">
          <label class="page-label">
            图片标注
            <span class="page-label-tips">上传图片后可添加</span>
          </label>
          <div class="page-point-tips" v-if="pointLen < 1">
            <div class="page-point-example bgImg"></div>
            <span class="page-label-tips"
              >图片标注能够让大家更准确地了解你的问题</span
            >
          </div>
          <div class="page-point-list" v-else>
            <div v-for="(layout, index) of form.layouts" :key="index">
              <div
                class="page-point-item"
                v-for="(item, key) of layout.points"
                :key="`${item.index}-${item.x}`"
              >
                <div class="page-point-item-top">
                  <div class="page-point-item-top_left">
                    问题<label class="page-point-label">{{ item.index }}</label>
                  </div>
                  <div
                    class="page-point-item-top_right"
                    @click="handleDeletePoint(index, key)"
                  >
                    <i class="page-point-item-delete_icon"></i>
                    删除
                  </div>
                </div>
                <el-input
                  class="page-point-item-content"
                  type="textarea"
                  autosize
                  resize="none"
                  placeholder="请简单描述你在这个区域遇到的问题"
                  :rows="1"
                  v-model.trim="item.value"
                  @focus="pointValueFocusIndex = item.index"
                  @blur="pointValueFocusIndex = null"
                ></el-input>
                <div
                  v-show="item.index === pointValueFocusIndex"
                  :class="[
                    'page-point-item-footer',
                    item.value.length > 80 ? 'danger' : ''
                  ]"
                >
                  {{
                    item.value.length > 80
                      ? `${item.value.length}/80 太多字数会影响参与者动力哦！`
                      : item.value.length > 0
                      ? `${item.value.length}/80`
                      : "简明扼要，控制在80字内哦"
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <i class="page-close-icon close-icon" @click="handleBeforeClose"></i>
    </div>
  </el-dialog>
</template>

<script>
import questionService from "service/question";
import commonService from "service/common";
import {
  QUESTION_TYPE_HELP,
  QUESTION_SAVE_STATUS,
  QUESTION_PUBLISH_STATUS
} from "utils/const";
import { mapState } from 'vuex';
import TheAvatar from "components/TheAvatar";
import UploadImage from 'components/UploadImage';
import LayoutEditor from './layout-editor';

export default {
  name: 'HelpTypeAdd',
  components: { TheAvatar, UploadImage, LayoutEditor, },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      QUESTION_TYPE_HELP,
      QUESTION_SAVE_STATUS,
      QUESTION_PUBLISH_STATUS,
      channels: [],
      districts: [],
      saving: false,
      publishing: false,
      pointValueFocusIndex: null,
      form: {
        title: '',
        content: '',
        channel_id: null,
        layouts: [{
          image_url: '',
          points: [],
          is_south: null,
          width: null,
          height: null
        }, {
          image_url: '',
          points: [],
          is_south: null,
          width: null,
          height: null
        }, {
          image_url: '',
          points: [],
          is_south: null,
          width: null,
          height: null
        }],
        informations: {
          cityArr: [],
          cityId: null,
          cityName: '',
          neighbourhood: '',
          houseType1: null,
          houseType2: null,
          houseType3: null,
          area: ''
        }
      }
    }
  },
  computed: {
    ...mapState(['userInfo']),
    layouts () {
      const { layouts } = this.form;
      return layouts;
    },
    pointLen () {
      return this.layouts.reduce((pre, cur) => {
        return pre + cur.points.length
      }, 0);
    }
  },
  watch: {
    layouts: {
      handler (val) {
        let index = 1;
        val.forEach(layout => {
          layout.points.forEach((point) => {
            point.index = index;
            index++;
          })
        });
      },
      deep: true
    }
  },
  created () {
    this.getData();
  },
  methods: {
    getData () {
      Promise.all([questionService.channels(), commonService.districts()]).then(([channels, districts]) => {
        this.channels = channels;
        this.districts = districts.map(item => {
          const children = (item.children && item.children.map(child => {
            return {
              label: child.label,
              value: child.value
            };
          })) || null
          return {
            ...item,
            children: children
          };
        });
      });
    },
    handleBeforeClose () {
      if (this.form.title) {
        this.$confirm('是否保存草稿', '', {
          confirmButtonText: '保存',
          cancelButtonText: '不保存',
          type: 'none'
        }).then(() => {
          this.handlePublish(QUESTION_SAVE_STATUS)
        }).catch(() => {
          this.handleClose();
        });
      } else {
        this.handleClose();
      }
    },
    handleClose () {
      this.$emit("update:visible", false);
    },
    handleUpdateLayout (index, params) {
      this.$set(this.form.layouts, index, {
        ...this.form.layouts[index],
        ...params
      })
    },
    handleDeletePoint (index, key) {
      const layout = this.form.layouts[index];
      layout.points.splice(key, 1);
    },
    handleCityChange (arr) {
      const parent = this.districts.find(item => item.value === arr[0]);
      const city = parent.children ? parent.children.find((item) => item.value === arr[1]) : parent;
      this.form.informations.cityId = city.value;
      this.form.informations.cityName = city.label;
    },
    handleAreaKeyUp () {
      // eslint-disable-next-line
      this.form.informations.area = this.form.informations.area.replace(/[^\d^\.]/g, '')
    },
    handleCheck (status = QUESTION_PUBLISH_STATUS) {
      let { title, layouts, informations, channel_id } = this.form;
      const { cityId, neighbourhood, houseType1, houseType2, houseType3, area } = informations;
      if (status === QUESTION_SAVE_STATUS && !title) {
        this.$notice({
          type: 'warning',
          title: '标题不能为空'
        })
        return false;
      }
      layouts.forEach(layout => {
        layout.points = layout.points.filter(point => point.value);
      })
      if (status === QUESTION_SAVE_STATUS) {
        return true;
      }
      if (!title || !layouts.some(item => item.image_url) || !cityId || !neighbourhood || houseType1 === null || houseType2 === null || houseType3 === null || !area || !channel_id) {
        this.$notice({
          type: 'warning',
          title: '必填项不能为空'
        })
        return false;

      }
      return true;
    },
    handlePublish (status = QUESTION_PUBLISH_STATUS) {
      if (this.handleCheck(status)) {
        const { id, informations, layouts } = this.form;
        const { cityId, cityName, neighbourhood, houseType1, houseType2, houseType3, area } = informations;
        const houseTypeArr = [houseType1 !== null ? houseType1 + '室' : null, houseType2 !== null ? houseType2 + '厅' : null, houseType3 !== null ? houseType3 + '卫' : null]
        const params = {
          ...this.form,
          type: QUESTION_TYPE_HELP,
          status,
          layouts: layouts.filter((item) => {
            return item.image_url
          }),
          informations: JSON.stringify({
            cityId,
            cityName,
            neighbourhood,
            houseTypeArr,
            houseType: (houseType1 ? houseType1 + '室' : '') + (houseType2 ? houseType2 + '厅' : '') + (houseType3 ? houseType3 + '卫' : ''),
            area
          })
        }
        const loadingName = status === QUESTION_SAVE_STATUS ? 'saving' : 'publishing';
        this.[loadingName] = true;
        if (id) {
          questionService.updateQuestion(id, params).then(() => {
            this.$notice({
              type: 'success',
              title: status === QUESTION_SAVE_STATUS ? '保存成功' : '发布成功'
            })
            if (status === QUESTION_PUBLISH_STATUS) {
              this.$emit('refresh')
            }
            this.handleClose();
          }).finally(() => {
            this.[loadingName] = false;
          })
        } else {
          questionService.addQuestion(params).then(() => {
            this.$notice({
              type: 'success',
              title: status === QUESTION_SAVE_STATUS ? '保存成功' : '发布成功'
            })
            if (status === QUESTION_PUBLISH_STATUS) {
              this.$emit('refresh')
            }
            this.handleClose();
          }).finally(() => {
            this.[loadingName] = false;
          })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "~styles/variable";

.page-wrapper {
  /deep/ .el-dialog {
    margin: 0;
    height: 100%;
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      width: 100%;
      height: 100%;
      padding: 0;
    }
    .page {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: auto;
      background: #fff;
      .close-icon {
        display: inline-block;
        width: 24px;
        height: 24px;
        mask: url("~images/question/close.svg") no-repeat center;
        background-color: #606c66;
        cursor: pointer;
      }
      .page-close-icon {
        position: absolute;
        top: 15px;
        right: 25px;
        width: 7px;
        height: 7px;
        transform: scale(2);
      }
      .page-label {
        display: flex;
        align-items: center;
        line-height: 28px;
        font-weight: 600;
        font-size: 20px;
        color: #2c3330;
        .page-label-tips {
          margin-left: 8px;
        }
      }
      .page-label-tips {
        display: inline-block;
        margin-left: 8px;
        font-weight: normal;
        line-height: 20px;
        font-size: 14px;
        color: #81948b;
      }
      .container-1144 {
        position: relative;
        width: 1144px;
        min-height: 100%;
        margin: auto;
        padding: 80px 0;
        .page-header {
          margin-bottom: 34px;
          .page-header-title {
            line-height: 32px;
            font-weight: 600;
            font-size: 24px;
            text-align: center;
            color: #2c3330;
          }
        }
        .container-740 {
          width: 740px;
          height: 100%;
          .page-content {
            .page-content-basic {
              .form-title-wrapper {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                .avatar-wrapper {
                  flex: none;
                }
                .form-title {
                  flex: 1;
                  width: 5px;
                  .el-input__inner {
                    padding: 0 10px;
                    line-height: 28px;
                    font-weight: 600;
                    font-size: 20px;
                    border: unset;
                    &::placeholder {
                      color: #c8d0cc;
                    }
                  }
                }
              }
              .form-content-wrapper {
                margin-top: 26px;
                .el-textarea__inner {
                  width: 100%;
                  height: 91px;
                  padding: 14px;
                  line-height: 24px;
                  font-size: 14px;
                  border-color: #efefef;
                  &::placeholder {
                    color: #c8d0cc;
                  }
                }
              }
            }
            .page-content-layout {
              margin-top: 40px;
              .form-layout-list {
                margin-top: 20px;
                .form-layout-item {
                  width: 100%;
                  & + .form-layout-item {
                    margin-top: 20px;
                  }
                  .form-upload-layout {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 160px;
                    background: #fafafa;
                    border: 2px dashed #efefef;
                    &:hover {
                      .el-icon-picture {
                        color: @primaryColor;
                      }
                    }
                    .form-upload-wrapper {
                      position: absolute;
                      top: 0;
                      left: 0;
                      z-index: 1;
                    }
                    .form-upload-wrapper,
                    .upload,
                    .el-upload {
                      width: 100%;
                      height: 100%;
                      .add-image {
                        width: 100%;
                        height: 100%;
                        opacity: 0;
                      }
                    }
                    .el-icon-picture {
                      font-size: 30px;
                      color: #c8d0cc;
                    }
                    .form-upload-title {
                      margin: 10px 0 7px;
                      line-height: 24px;
                      font-size: 14px;
                      color: #8ea098;
                    }
                    .form-upload-tips {
                      line-height: 16px;
                      font-size: 12px;
                      color: #8ea098;
                    }
                  }
                }
              }
            }
            .page-content-other {
              margin-top: 40px;
              .page-label {
                margin-bottom: 18px;
              }
              .page-flex {
                display: flex;
                align-items: center;
                & + .page-flex {
                  margin-top: 20px;
                }
                .form-label {
                  display: block;
                  margin-bottom: 10px;
                  line-height: 24px;
                  font-weight: normal;
                  font-size: 14px;
                  color: #606c66;
                }
                .flex-1 {
                  flex: 1;
                  & + .flex-1 {
                    margin-left: 30px;
                  }
                }
                .el-input__inner {
                  padding-left: 0;
                  font-size: 14px;
                  border: unset;
                  border-bottom: 1px solid #efefef;
                  &::placeholder {
                    color: #c8d0cc;
                  }
                }
                .el-input__icon {
                  color: #606c66;
                }
                .form-city-wrapper {
                  .form-city {
                    width: 100%;
                  }
                }
                .form-house_type {
                  display: flex;
                  align-items: center;
                  .form-house_type-select {
                    flex: 1;
                    .el-input {
                      position: relative;
                      &::before {
                        position: absolute;
                        top: 50%;
                        right: 30px;
                        font-size: 14px;
                        color: #2c3330;
                        content: "室";
                        transform: translate(0, -50%);
                      }
                    }
                    & + .form-house_type-select {
                      margin-left: 16px;
                    }
                  }
                  .form-house_type-1 {
                    .el-input {
                      &::before {
                        content: "室";
                      }
                    }
                  }
                  .form-house_type-2 {
                    .el-input {
                      &::before {
                        content: "厅";
                      }
                    }
                  }
                  .form-house_type-3 {
                    .el-input {
                      &::before {
                        content: "卫";
                      }
                    }
                  }
                }
                .form-area {
                  &.el-input {
                    position: relative;
                    &::before {
                      position: absolute;
                      top: 50%;
                      right: 0;
                      font-size: 14px;
                      color: #2c3330;
                      content: "m²";
                      transform: translate(0, -50%);
                    }
                    .el-input__inner {
                      padding-right: 25px;
                    }
                  }
                }
              }
            }
          }
          .page-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 80px;
            .form-channel {
              .el-input__inner {
                padding-left: 0;
                line-height: 24px;
                font-size: 14px;
                border: unset;
                border-bottom: 1px solid #efefef;
                &::placeholder {
                  color: #c8d0cc;
                }
              }
              .el-select__caret {
                color: #606c66;
              }
            }
            .page-footer-right {
              .el-button {
                padding: 7px 23px;
                line-height: 24px;
                font-size: 14px;
                & + .el-button {
                  margin-left: 8px;
                }
                &.el-button--default {
                  color: #2c3330;
                  border: 1px solid #efefef;
                }
              }
            }
          }
        }
        .container-384 {
          position: fixed;
          top: 184px;
          right: calc(50vw - 1144px / 2);
          width: 384px;
          max-height: calc(100vh - 184px * 2);
          padding: 0 20px;
          overflow: auto;
          .page-point-tips {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            margin-top: 20px;
            .page-point-example {
              width: 140px;
              height: 140px;
              background-image: url("~images/question/tagging.svg");
            }
          }
          .page-point-list {
            margin-top: 8px;
            .page-point-item {
              padding-top: 20px;
              & + .page-point-item {
                margin-top: 20px;
                border-top: 1px solid #efefef;
              }
              .page-point-item-top {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                margin-bottom: 8px;
                .page-point-item-top_left {
                  line-height: 1;
                  font-weight: 500;
                  font-size: 16px;
                  color: #2c3330;
                  .page-point-label {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    margin-left: 4px;
                    line-height: 16px;
                    font-weight: 500;
                    font-size: 14px;
                    color: #fff;
                    text-align: center;
                    border-radius: 50%;
                    background: @primaryColor;
                  }
                }
                .page-point-item-top_right {
                  line-height: 16px;
                  font-size: 12px;
                  color: #fa5151;
                  cursor: pointer;
                  .page-point-item-delete_icon {
                    display: inline-block;
                    margin-right: 2px;
                    width: 16px;
                    height: 16px;
                    mask: url("~images/question/delete.svg") no-repeat center;
                    background: #fa5151;
                    vertical-align: bottom;
                  }
                }
              }
              .page-point-item-content {
                .el-textarea__inner {
                  padding: 0;
                  font-size: 16px;
                  line-height: 28px;
                  border: unset;
                  &::placeholder {
                    color: #c8d0cc;
                  }
                }
              }
              .page-point-item-footer {
                display: inline-block;
                margin-top: 16px;
                padding: 4px 6px;
                line-height: 1;
                font-size: 12px;
                color: #ffffff;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 10px;
                &.danger {
                  color: #fa5151;
                  background: rgba(212, 0, 0, 0.1);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
