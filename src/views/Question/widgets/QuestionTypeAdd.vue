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
      <div class="container-540">
        <div class="page-header">
          <div class="page-header-title">普通图文</div>
        </div>
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
                placeholder="写下你的问题，准确地描述问题更容易得到解答"
                autofocus
                :maxlength="45"
                v-model="form.title"
              />
            </div>
            <div class="form-content-wrapper">
              <el-input
                type="textarea"
                placeholder="对问题的补充描述（选填）"
                resize="none"
                v-model="form.content"
              >
              </el-input>
            </div>
            <div class="form-image-wrapper">
              <the-loading-image
                class="upload-image"
                v-for="image of form.images"
                :key="image"
                :url="image"
                :width="80"
                :height="80"
              />
              <upload-image
                v-if="form.images.length < 3"
                ref="uploadImage"
                folder="question"
                :class="['upload-image']"
                @added="handleAddImage"
              />
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
      <i class="page-close-icon close-icon" @click="handleBeforeClose"></i>
    </div>
  </el-dialog>
</template>

<script>
import questionService from "service/question";
import {
  QUESTION_TYPE_QUESTION,
  QUESTION_SAVE_STATUS,
  QUESTION_PUBLISH_STATUS
} from "utils/const";
import { mapState } from 'vuex';
import TheAvatar from "components/TheAvatar";
import UploadImage from "components/UploadImage";
import TheLoadingImage from 'components/TheLoadingImage';

export default {
  name: 'QuestionTypeAdd',
  components: { TheAvatar, UploadImage, TheLoadingImage },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number
    }
  },
  data () {
    return {
      QUESTION_TYPE_QUESTION,
      QUESTION_SAVE_STATUS,
      QUESTION_PUBLISH_STATUS,
      channels: [],
      saving: false,
      publishing: false,
      form: {
        title: '',
        content: '',
        images: [],
        channel_id: null
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
    this.getData();
  },
  methods: {
    getData () {
      let promiseArr = [questionService.channels()];
      if (this.id) {
        promiseArr.push(questionService.question(this.id))
      }
      Promise.all(promiseArr)
        .then(([channels, detail]) => {
          this.channels = channels;
          if (detail) {
            this.form = detail;
          }
        });
    },
    handleAddImage (url) {
      this.form.images.push(url);
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
    handleCheck (status = QUESTION_PUBLISH_STATUS) {
      const { title, channel_id } = this.form;
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
      if (!title || !channel_id) {
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
        const { id, images } = this.form;
        const params = {
          ...this.form,
          type: QUESTION_TYPE_QUESTION,
          status,
          images: images.join(',')
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
      .container-540 {
        width: 540px;
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
            .form-image-wrapper {
              display: flex;
              margin-top: 10px;
              .upload-image {
                width: 80px;
                height: 80px;
                margin-right: 10px;
                .add-image {
                  position: relative;
                  width: 80px;
                  height: 80px;
                  border: 2px dashed #efefef;
                  background: transparent;
                  img {
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
