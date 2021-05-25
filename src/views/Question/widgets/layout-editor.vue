<template>
  <div :class="['editor-wrapper', layout.is_south ? 'compass' : '']">
    <div
      class="editor-img-wrapper"
      v-show="!showCompass"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseout="handleMouseUp"
      ref="wrapper"
      :style="{ width: width + 'px', height: height + 'px' }"
    >
      <img class="editor-img" ref="editorImg" :src="layout.image_url" />
      <div
        class="editor-point"
        v-for="(item, index) of layout.points"
        :key="`${index}-${item.x}`"
        :style="{
          top: pos(item).y + 'px',
          left: pos(item).x + 'px',
          zIndex: 2
        }"
        @mousedown="e => handleMouseDown(e, index)"
      >
        <label class="editor-point-label">{{ item.index }}</label>
      </div>
      <template v-if="layout.is_south">
        <div
          class="editor-direction"
          v-for="direction of directions"
          :key="direction.id"
        >
          <div
            v-if="layout.is_south === direction.id"
            :class="['direction', direction.class]"
          ></div>
        </div>
      </template>
      <div class="editor-add_tag-operate editor-operate" @click="handleAddTag">
        <i class="editor-tag-icon editor-icon" />
        <span>添加标注</span>
      </div>
      <div
        class="editor-add_north-operate editor-operate"
        @click="handleShowCompass"
      >
        <i class="editor-compass-icon editor-icon" />
        <span>备注方位</span>
      </div>
      <div class="editor-delete-operate editor-operate" @click="handleDelete">
        <i class="editor-delete-icon editor-icon" />
        <span>删除图片</span>
      </div>
    </div>
    <div class="editor-compass-wrapper" v-show="showCompass">
      <div class="editor-compass-top">
        <img class="editor-compass-img" :src="layout.image_url" />
        <div
          v-for="direction of directions"
          :key="direction.id"
          :class="[
            'direction',
            activeDirectionId === direction.id ? 'active' : '',
            direction.class
          ]"
          @click="handleCompassSelect(direction.id)"
        ></div>
      </div>
      <div class="editor-compass-bottom">
        <div class="editor-compass-operate">
          <i class="el-icon-close" @click="handleCloseCompass"></i>
          <span>哪个方位是房屋的「南」面</span>
          <i class="el-icon-check" @click="handleConfirmCompass"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelpLayoutEditor",
  props: {
    layout: {
      type: Object,
      required: true
    },
    pointLen: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      activeDirectionId: 0,
      directions: [
        {
          class: "left-direction",
          id: 1
        },
        {
          class: "top_left-direction",
          id: 2
        },
        {
          class: "top-direction",
          id: 3
        },
        {
          class: "top_right-direction",
          id: 4
        },
        {
          class: "right-direction",
          id: 5
        },
        {
          class: "bottom_right-direction",
          id: 6
        },
        {
          class: "bottom-direction",
          id: 7
        },
        {
          class: "bottom_left-direction",
          id: 8
        }
      ],
      dragging: false,
      activePointIndex: null,
      startX: null,
      startY: null,
      pointX: null,
      pointY: null,
      showCompass: false,
      width: null,
      height: null
    };
  },
  watch: {
    layout(val, oldVal) {
      if (val.image_url !== oldVal.image_url) {
        this.$nextTick(() => {
          this.getImgSize();
        });
      }
      this.points = val.points;
    }
  },
  computed: {
    pos() {
      return point => {
        const imgWidth = this.width;
        const imgHeight = this.height;
        return {
          x: (point.x / point.moveWidth) * imgWidth,
          y: (point.y / point.moveHeight) * imgHeight
        };
      };
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getImgSize();
    });
  },
  methods: {
    getImgSize() {
      const { image_url } = this.layout;
      const image = new Image();
      image.src = image_url;
      const wrapper = this.$refs["wrapper"];

      // 判断是否有缓存
      if (image.complete) {
        this.getImageWH(
          image.width,
          image.height,
          wrapper.clientWidth,
          wrapper.clientHeight
        );
        this.updateLayout({
          width: image.width,
          height: image.height
        });
      } else {
        image.onload = () => {
          this.getImageWH(
            image.width,
            image.height,
            wrapper.clientWidth,
            wrapper.clientHeight
          );
          this.updateLayout({
            width: image.width,
            height: image.height
          });
        };
      }
    },
    getImageWH(width, height, maxWidth, maxHeight) {
      const rate = width / height;
      let calWidth = maxWidth;
      let calHeight = maxWidth / rate;
      if (rate < maxWidth / maxHeight) {
        calWidth = maxHeight * rate;
        calHeight = maxHeight;
      }
      this.width = calWidth;
      this.height = calHeight;
    },
    handleMouseDown(e, index) {
      this.dragging = true;
      const point = this.points[index];
      this.activePointIndex = index;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.pointX = point.x;
      this.pointY = point.y;
    },
    handleMouseMove(e) {
      if (this.dragging) {
        const point = this.layout.points[this.activePointIndex];
        const disX = e.clientX - this.startX;
        const disY = e.clientY - this.startY;
        const x = this.pointX + disX;
        const y = this.pointY + disY;
        const dom = this.$refs["editorImg"];
        const width = dom.width;
        const height = dom.height;
        point.x = x < 0 ? 0 : x > width - 70 ? width - 70 : x;
        point.y = y < 0 ? 0 : y > height ? height : y;
        this.updateLayout({
          points: this.layout.points
        });
      }
    },
    handleMouseUp() {
      this.dragging = false;
    },
    updateLayout(params) {
      this.$emit("update", {
        ...params
      });
    },
    handleAddTag() {
      const points = this.points;
      if (this.pointLen > 4) {
        this.$notice({
          type: "warning",
          title: "最多可添加5个标签"
        });
        return;
      }
      const image = this.$refs.editorImg;
      points.push({
        x: image.width / 2,
        y: image.height * (1 / 4),
        value: "",
        moveWidth: image.width,
        moveHeight: image.height
      });
      this.updateLayout({ points });
    },
    handleShowCompass() {
      this.activeDirectionId = this.layout.is_south;
      this.showCompass = true;
    },
    handleCompassSelect(id) {
      if (this.activeDirectionId !== id) {
        this.activeDirectionId = id;
      } else {
        this.activeDirectionId = 0;
      }
    },
    handleCloseCompass() {
      this.showCompass = false;
    },
    handleConfirmCompass() {
      this.updateLayout({
        is_south: this.activeDirectionId
      });
      this.handleCloseCompass();
    },
    handleDelete() {
      this.updateLayout({
        image_url: "",
        points: [],
        is_south: null,
        width: null,
        height: null
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
.editor-wrapper {
  width: 100%;
  background: #f4f4f4;
  user-select: none;
  &.compass {
    padding: 20px;
  }
  .editor-img-wrapper {
    display: flex;
    position: relative;
    width: 100%;
    .editor-img {
      width: 100%;
      height: auto;
    }
    .editor-operate {
      position: absolute;
      display: inline-block;
      padding: 4px 10px;
      line-height: 24px;
      font-size: 14px;
      color: #ffffff;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 16px;
      cursor: pointer;
      user-select: none;
      .editor-icon {
        display: inline-block;
        width: 24px;
        height: 24px;
        margin-right: 4px;
        background-color: #fff;
        mask-repeat: no-repeat;
        mask-size: cover;
        vertical-align: bottom;
      }
    }
    .editor-point {
      position: absolute;
      cursor: pointer;
      user-select: none;
      .editor-point-label {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-weight: 500;
        font-size: 20px;
        color: #fff;
        text-align: center;
        background: @primaryColor;
        border-radius: 50%;
        cursor: pointer;
        &::before {
          position: absolute;
          top: calc(50% - 1px);
          left: 100%;
          width: 18px;
          height: 2px;
          background: @primaryColor;
          content: "";
        }
      }
      &::before {
        position: absolute;
        top: calc(50% - 5px);
        left: 55px;
        width: 10px;
        height: 10px;
        background: @primaryColor;
        border-radius: 50%;
        content: "";
      }
      &::after {
        position: absolute;
        top: calc(50% - 10px);
        left: 50px;
        width: 20px;
        height: 20px;
        background: @primaryColor;
        opacity: 0.2;
        border-radius: 50%;
        content: "";
      }
    }
    .editor-direction {
      .direction {
        position: absolute;
        width: 20px;
        height: 20px;
        &::before {
          position: absolute;
          content: "";
          width: 0px;
          height: 0px;
          font-size: 0px;
          line-height: 0px;
        }
        &::after {
          position: absolute;
          content: "南";
          font-size: 12px;
          color: #14af14;
        }
      }

      .left-direction {
        left: 0;
        top: 50%;
        transform: translate(-100%, -50%);
        &::after {
          top: 50%;
          right: 5px;
          transform: translateY(-50%);
        }
      }

      .top_left-direction {
        top: -15px;
        left: -15px;
        transform: rotate(45deg);
        &:after {
          top: 50%;
          right: 5px;
          transform: translateY(-50%) rotate(-45deg);
        }
      }

      .top-direction {
        top: 0;
        left: 50%;
        transform: translate(-50%, -100%);
        &::before {
          left: 50%;
          bottom: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-bottom: 4px solid #14af64;
          transform: translateX(-50%);
        }
        &::after {
          bottom: 5px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      .top_right-direction {
        top: -15px;
        right: -15px;
        transform: rotate(-45deg);
        &::after {
          top: 50%;
          left: 5px;
          transform: translateY(-50%) rotate(45deg);
        }
      }

      .right-direction {
        top: 50%;
        right: 0;
        transform: translate(100%, -50%);
        ::after {
          top: 50%;
          left: 5px;
          transform: translateY(-50%);
        }
      }

      .bottom_right-direction {
        right: -15px;
        bottom: -15px;
        transform: rotate(45deg);
        &::after {
          top: 50%;
          left: 5px;
          transform: translateY(-50%) rotate(-45deg);
        }
      }
      .bottom-direction {
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 100%);
        &::before {
          top: 0;
          left: 50%;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 4px solid #14af64;
          transform: translateX(-50%);
        }
        &::after {
          top: 4px;
          left: 50%;
          transform: translateX(-50%);
        }
      }

      .bottom_left-direction {
        left: -15px;
        bottom: -15px;
        transform: rotate(-45deg);
        &::after {
          top: 50%;
          right: 5px;
          transform: translateY(-50%) rotate(45deg);
        }
      }
      .left-direction::before,
      .top_left-direction::before,
      .bottom_left-direction::before {
        top: 50%;
        right: 0;
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-right: 4px solid #14af64;
        transform: translateY(-50%);
      }

      .right-direction::before,
      .top_right-direction::before,
      .bottom_right-direction::before {
        top: 50%;
        left: 0;
        border-top: 4px solid transparent;
        border-bottom: 4px solid transparent;
        border-left: 4px solid #14af64;
        transform: translateY(-50%);
      }
    }
    .editor-add_tag-operate {
      top: 20px;
      left: 20px;
    }
    .editor-add_north-operate {
      top: 20px;
      left: 134px;
    }
    .editor-delete-operate {
      bottom: 20px;
      right: 20px;
    }
    .editor-tag-icon {
      mask-image: url("~images/question/tag.svg");
    }
    .editor-compass-icon {
      mask-image: url("~images/question/compass.svg");
    }
    .editor-delete-icon {
      mask-image: url("~images/question/delete.svg");
    }
  }
  .editor-compass-wrapper {
    width: 100%;
    background: #f4f4f4;
    .editor-compass-top {
      position: relative;
      width: 100%;
      padding: 80px;
      .editor-compass-img {
        width: 100%;
      }
      .direction {
        position: absolute;
        width: 50px;
        height: 50px;
        cursor: pointer;
        &::before {
          position: absolute;
          width: 24px;
          height: 4px;
          content: "";
          background: #8ea098;
        }
        &.active {
          &::before {
            background: @primaryColor;
          }
          &::after {
            position: absolute;
            content: "南";
            line-height: 1;
            font-size: 14px;
            color: @primaryColor;
          }
        }
      }

      .left-direction {
        left: 50px;
        top: 50%;
        transform: translate(-100%, -50%);
      }
      .top_left-direction {
        top: 10px;
        left: 10px;
        transform: rotate(45deg);
      }

      .top-direction {
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      }

      .top_right-direction {
        top: 10px;
        right: 10px;
        transform: rotate(-45deg);
      }
      .right-direction {
        top: 50%;
        right: 50px;
        transform: translate(100%, -50%);
      }

      .bottom_right-direction {
        right: 10px;
        bottom: 10px;
        transform: rotate(45deg);
      }

      .bottom-direction {
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
      }

      .bottom_left-direction {
        left: 15px;
        bottom: 15px;
        transform: rotate(-45deg);
      }

      .left-direction::before,
      .top_left-direction::before,
      .bottom_left-direction::before {
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
      .top-direction::before,
      .bottom-direction::before {
        width: 4px;
        height: 24px;
        left: 50%;
        transform: translateX(-50%);
      }

      .top-direction::before {
        bottom: 0;
      }

      .bottom-direction::before {
        top: 0;
      }

      .right-direction::before,
      .top_right-direction::before,
      .bottom_right-direction::before {
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }

      .left-direction.active::after {
        top: 50%;
        left: 12px;
        transform: translateY(-50%);
      }

      .top_left-direction.active:after {
        top: 50%;
        left: 7.5px;
        transform: translateY(-50%) rotate(-45deg);
      }

      .top-direction.active::after {
        top: 7.5px;
        left: 50%;
        transform: translateX(-50%);
      }
      .top_right-direction.active::after {
        top: 50%;
        right: 7.5px;
        transform: translateY(-50%) rotate(45deg);
      }

      .right-direction.active::after {
        top: 50%;
        right: 12px;
        transform: translateY(-50%);
      }

      .bottom_right-direction.active::after {
        top: 50%;
        right: 7.5px;
        transform: translateY(-50%) rotate(-45deg);
      }

      .bottom-direction.active::after {
        bottom: 7.5px;
        left: 50%;
        transform: translateX(-50%);
      }

      .bottom_left-direction.active::after {
        top: 50%;
        left: 7.5px;
        transform: translateY(-50%) rotate(45deg);
      }
    }
    .editor-compass-bottom {
      width: 100%;
      padding: 0 20px;
      .editor-compass-operate {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0;
        font-weight: 500;
        line-height: 28px;
        font-size: 20px;
        color: #2c3330;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        .el-icon-close,
        .el-icon-check {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
