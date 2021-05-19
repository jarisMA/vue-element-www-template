<template>
  <el-dialog
    class="page-wrapper"
    width="100%"
    top="0"
    :show-close="false"
    :visible="visible"
  >
    <div class="page">
      <div class="container-540">
        <div class="page-header">
          <div class="page-header-title">发布投票</div>
        </div>
        <div class="page-content">
          <div class="page-content-basic">
            <div class="form-title-wrapper">
              <the-avatar :size="40" :url="userInfo.avatar_url" />
              <el-input
                class="form-title"
                placeholder="投票标题"
                autofocus
                :maxlength="45"
                v-model="form.title"
              />
            </div>
            <div class="form-content-wrapper">
              <el-input
                type="textarea"
                placeholder="对投票的补充描述（选填）"
                resize="none"
                v-model="form.content"
              >
              </el-input>
            </div>
            <div class="form-image-wrapper">
              <upload-image
                v-if="!form.images"
                ref="uploadImage"
                :class="['upload-image']"
                @added="handleAddImage"
              />
              <div
                v-else
                class="form-image"
                :style="{ backgroundImage: `url(${form.images})` }"
              ></div>
            </div>
          </div>
          <div class="page-content-option">
            <div class="page-content-option_header">
              <span class="page-config-label">选项类型</span>
              <div class="form-radio-wrapper">
                <div
                  class="form-radio-item"
                  v-for="item of resourceTypes"
                  :key="item.value"
                  @click="form.resource_type = item.value"
                >
                  <div
                    :class="[
                      'form-radio-circle',
                      item.value === form.resource_type ? 'active' : ''
                    ]"
                  ></div>
                  <span class="form-radio-text">{{ item.label }}</span>
                </div>
              </div>
            </div>
            <div class="page-content-option_content">
              <template v-if="form.resource_type === VOTE_RESOURCE_TYPE_WORD">
                <div
                  class="form-word_option-item"
                  v-for="(option, index) of form.vote_options"
                  :key="index"
                >
                  <div class="word-option-content">
                    <el-input
                      class="word-option-input"
                      :placeholder="`选项${VOTE_OPTION_INDEX[index]}`"
                      v-model="option.title"
                      :maxlength="15"
                    />
                    <i
                      class="close-icon"
                      @click="handleRemoveVoteOption(index)"
                    ></i>
                  </div>
                </div>
                <div
                  class="form-word_option-item"
                  v-if="form.vote_options.length < optionMaxLength"
                >
                  <div
                    class="word-option-content pointer"
                    @click="handleAddVoteOption"
                  >
                    <i class="option-add_icon"></i>
                    <span class="option-add_text">添加选项</span>
                  </div>
                </div>
              </template>
              <div
                class="form-pic_option-list"
                v-if="form.resource_type === VOTE_RESOURCE_TYPE_PIC"
              >
                <div
                  class="form-pic_option-item"
                  v-for="(option, index) of form.vote_options"
                  :key="index"
                >
                  <div class="pic-option-content">
                    <div class="pic-option-upload">
                      <upload-image
                        class="upload-wrapper"
                        @added="url => handleAddVoteImg(index, url)"
                      />
                      <i class="el-icon-plus" v-if="!option.image_url"></i>
                      <div
                        class="pic-option-image"
                        v-else
                        :style="{ backgroundImage: `url(${option.image_url})` }"
                      ></div>
                    </div>
                    <el-input
                      class="pic-option-input"
                      :placeholder="`选项${VOTE_OPTION_INDEX[index]}`"
                      v-model="option.title"
                      :maxlength="15"
                    />
                    <i
                      class="close-icon"
                      @click="handleRemoveVoteOption(index)"
                    ></i>
                  </div>
                </div>
                <div
                  class="form-pic_option-item add"
                  v-if="form.vote_options.length < optionMaxLength"
                  @click="handleAddVoteOption"
                >
                  <i class="option-add_icon"></i>
                  <span class="option-add_text">添加选项</span>
                </div>
              </div>
            </div>
            <div
              :class="[
                'page-content-option_footer',
                form.resource_type === VOTE_RESOURCE_TYPE_PIC
                  ? 'margin-none'
                  : ''
              ]"
            >
              <div class="form-switch-wrapper">
                <span class="page-config-label">允许多选</span>
                <el-switch
                  class="form-switch"
                  v-model="form.vote_type"
                  active-color="#14AF64"
                  inactive-color="#C8D0CC"
                  :active-value="VOTE_TYPE_MULTI"
                  :inactive-value="VOTE_TYPE_SINGLE"
                >
                </el-switch>
              </div>
              <div class="form-date-wrapper">
                <span class="page-config-label">截止时间</span>
                <el-date-picker
                  class="form-date"
                  v-model="form.vote_closed_at"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  :clearable="false"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
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
      <i class="page-close-icon close-icon" @click="handleClose"></i>
    </div>
  </el-dialog>
</template>

<script>
import questionService from "service/question";
import { mapState } from "vuex";
import TheAvatar from "components/TheAvatar";
import UploadImage from "components/UploadImage";
import {
  QUESTION_TYPE_VOTE,
  VOTE_OPTION_INDEX,
  VOTE_RESOURCE_TYPE_WORD,
  VOTE_RESOURCE_TYPE_PIC,
  VOTE_TYPE_SINGLE,
  VOTE_TYPE_MULTI,
  QUESTION_SAVE_STATUS,
  QUESTION_PUBLISH_STATUS
} from "utils/const";
import { getCalDate } from 'utils/moment';

const resourceTypes = [
  {
    label: "文字",
    value: VOTE_RESOURCE_TYPE_WORD
  },
  {
    label: "图片",
    value: VOTE_RESOURCE_TYPE_PIC
  }
];

export default {
  components: { TheAvatar, UploadImage },
  name: "QuestionVoteTypeAdd",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      VOTE_OPTION_INDEX,
      VOTE_RESOURCE_TYPE_WORD,
      VOTE_RESOURCE_TYPE_PIC,
      VOTE_TYPE_SINGLE,
      VOTE_TYPE_MULTI,
      QUESTION_SAVE_STATUS, QUESTION_PUBLISH_STATUS,
      resourceTypes,
      optionMaxLength: 6,
      channels: [],
      saving: false,
      publishing: false,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now();
        },
      },
      form: {
        title: "",
        content: "",
        images: "",
        resource_type: VOTE_RESOURCE_TYPE_WORD,
        vote_options: [
          {
            image_url: "",
            title: ""
          },
          {
            image_url: "",
            title: ""
          }
        ],
        vote_type: VOTE_TYPE_SINGLE,
        vote_closed_at: null,
        channel_id: null
      }
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  created () {
    this.form.vote_closed_at = getCalDate(new Date(), 7)
    this.getData();
  },
  methods: {
    getData () {
      questionService.channels().then(channels => {
        this.channels = channels;
      });
    },
    handleClose () {
      this.$emit("update:visible", false);
    },
    handleAddImage (url) {
      this.form.images = url;
    },
    handleAddVoteOption () {
      this.form.vote_options.push({
        image_url: "",
        tilte: ""
      });
    },
    handleRemoveVoteOption (index) {
      this.form.vote_options.splice(index, 1);
    },
    handleAddVoteImg (index, url) {
      this.$set(this.form.vote_options, index, {
        ...this.form.vote_options[index],
        image_url: url
      });
    },
    handleCheck (status = QUESTION_PUBLISH_STATUS) {
      const { title, resource_type, vote_options, vote_closed_at, channel_id } = this.form;
      if (status === QUESTION_SAVE_STATUS && !title) {
        this.$notice({
          type: 'warning',
          title: '标题不能为空'
        })
        return false;
      }
      if (status === QUESTION_SAVE_STATUS) {
        return true;
      }
      if (!title || !resource_type || vote_options.length < 2 || !vote_closed_at || !channel_id) {
        this.$notice({
          type: 'warning',
          title: '必填项不能为空'
        })
        return false;

      }
      if (resource_type === VOTE_RESOURCE_TYPE_WORD && vote_options.some(item => !item.title)) {
        this.$notice({
          type: 'warning',
          title: '选项内容不能为空'
        })
        return false;

      }
      if (resource_type === VOTE_RESOURCE_TYPE_PIC && vote_options.some(item => !item.image_url)) {
        this.$notice({
          type: 'warning',
          title: '选项图片不能为空'
        })
        return false;
      }
      return true;
    },
    handlePublish (status = QUESTION_PUBLISH_STATUS) {
      if (this.handleCheck(status)) {
        const { id, vote_options } = this.form;
        const params = {
          ...this.form,
          type: QUESTION_TYPE_VOTE,
          status,
          vote_options: vote_options.map((item, index) => {
            return {
              ...item,
              sort: vote_options.length - index - 1
            }
          }),
        }
        const loadingName = status === QUESTION_SAVE_STATUS ? 'saving' : 'publishing';
        this.[loadingName] = true;
        if (id) {
          questionService.updateQuestion(id, params).then(() => {
            this.$notice({
              type: 'success',
              title: '发布成功'
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
              title: '发布成功'
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
};
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
      .container-540 {
        width: 540px;
        height: 100%;
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
        .page-content {
          .page-content-basic {
            .form-title-wrapper {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              .form-title {
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
            .form-image-wrapper {
              margin-top: 10px;
              .upload-image {
                width: 80px;
                .add-image {
                  position: relative;
                  width: 80px;
                  height: 80px;
                  border: 2px dashed #efefef;
                  background: transparent;
                  &::after {
                    position: absolute;
                    top: 47px;
                    left: 4px;
                    line-height: 17px;
                    font-size: 12px;
                    letter-spacing: -0.02em;
                    color: #81948b;
                    content: "问题辅助图片";
                  }
                  img {
                    margin-bottom: 21px;
                    width: 24px;
                    height: 24px;
                  }
                }
              }
              .form-image {
                width: 80px;
                height: 80px;
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
              }
            }
          }
          .page-content-option {
            margin-top: 30px;
            padding: 10px 10px 18px;
            background: #fafafa;
            .page-content-option_header {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              .form-radio-wrapper {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                margin-left: 22px;
                .form-radio-item {
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  cursor: pointer;
                  & + .form-radio-item {
                    margin-left: 12px;
                  }
                  .form-radio-circle {
                    margin-right: 6px;
                    width: 16px;
                    height: 16px;
                    border: 1px solid #cccccc;
                    border-radius: 50%;
                    &.active {
                      position: relative;
                      border-color: @primaryColor;
                      background-color: @primaryColor;
                      &::after {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        width: 4px;
                        height: 4px;
                        content: "";
                        background: #fff;
                        border-radius: 50%;
                        transform: translate(-50%, -50%);
                      }
                    }
                  }
                  .form-radio-text {
                    line-height: 24px;
                    font-size: 14px;
                    color: #2c3330;
                  }
                }
              }
            }
            .page-content-option_content {
              margin-top: 10px;
              .option-add_icon {
                display: inline-block;
                margin-right: 5px;
                width: 20px;
                height: 20px;
                background: url("~images/question/add.svg") no-repeat center;
              }
              .option-add_text {
                line-height: 24px;
                font-size: 14px;
                color: @primaryColor;
              }
              .form-word_option-item {
                & + .form-word_option-item {
                  margin-top: 10px;
                }
                .word-option-content {
                  display: flex;
                  align-items: center;
                  .word-option-input {
                    flex: 1;
                    width: 5px;
                    .el-input__inner {
                      padding: 0 10px;
                      line-height: 24px;
                      font-size: 14px;
                      border: 1px solid #efefef;
                      &::placeholder {
                        color: #c8d0cc;
                      }
                    }
                  }
                  .close-icon {
                    flex: none;
                    margin-left: 10px;
                  }
                }
              }
              .form-pic_option-list {
                display: flex;
                flex-wrap: wrap;
                .form-pic_option-item {
                  position: relative;
                  width: 166px;
                  min-height: 161px;
                  margin-bottom: 10px;
                  background: #ffffff;
                  &.add {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: transparent;
                    border: 2px dashed #c8d0cc;
                    cursor: pointer;
                  }
                  &:nth-child(3n-1) {
                    margin-left: 10px;
                    margin-right: 10px;
                  }
                  .pic-option-content {
                    .pic-option-upload {
                      position: relative;
                      width: 166px;
                      height: 124px;
                      border: 2px dashed #cccccc;
                      .upload-wrapper {
                        position: relative;
                        z-index: 1;
                      }
                      .upload-wrapper,
                      .upload,
                      .el-upload {
                        width: 100%;
                        height: 100%;
                        .add-image {
                          display: none;
                        }
                      }
                      .el-icon-plus {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        font-size: 24px;
                        transform: translate(-50%, -50%);
                        cursor: pointer;
                      }
                      .pic-option-image {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size: cover;
                      }
                    }
                    .pic-option-input {
                      .el-input__inner {
                        font-size: 14px;
                        padding: 0 24px 0 7px;
                        border-color: #ccc;
                        border-top: unset;
                        &::placeholder {
                          color: #c8d0cc;
                        }
                      }
                    }
                    .close-icon {
                      position: absolute;
                      right: 0;
                      bottom: 6px;
                    }
                  }
                }
              }
            }
            .page-content-option_footer {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 18px;
              padding: 18px 34px 0 0;
              border-top: 1px solid #efefef;
              &.margin-none {
                margin-top: 0;
              }
              .form-switch-wrapper {
                .form-switch {
                  margin-left: 20px;
                }
              }
              .form-date-wrapper {
                .form-date {
                  width: 243px;
                  margin-left: 20px;
                  .el-input__inner {
                    font-size: 14px;
                    line-height: 20px;
                    border: 1px solid #eeeeee;
                    &::placeholder {
                      color: #c8d0cc;
                    }
                  }
                }
              }
            }
          }
          .page-config-label {
            line-height: 24px;
            font-size: 14px;
            color: #606c66;
          }
        }
        .page-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 40px;
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
    }
  }
}
</style>
