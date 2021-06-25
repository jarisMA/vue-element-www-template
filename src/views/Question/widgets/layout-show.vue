<template>
  <div :class="['editor-wrapper', layout.is_south ? 'compass' : '']">
    <div
      class="editor-img-wrapper"
      ref="wrapper"
      :style="{ width: width + 'px', height: height + 'px' }"
    >
      <el-image
        ref="editorImg"
        :preview-src-list="[layout.image_url]"
        class="editor-img"
        :src="layout.image_url"
        fit="contain"
      >
      </el-image>

      <div
        class="editor-point"
        v-for="(item, index) of layout.points"
        :key="`${index}-${item.x}`"
        :style="{
          top: pos(item).y + 'px',
          left: pos(item).x + 'px',
          zIndex: 2
        }"
        @click="handlePointClick(item.index)"
      >
        <label
          :class="[
            'editor-point-label',
            activePointIndex === item.index ? 'active' : ''
          ]"
          >{{ item.index }}</label
        >
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
    </div>
  </div>
</template>

<script>
export default {
  name: "HelpLayoutShow",
  props: {
    layout: {
      type: Object,
      required: true
    },
    activePointIndex: {
      type: Number,
      default: 0
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
      } else {
        image.onload = () => {
          this.getImageWH(
            image.width,
            image.height,
            wrapper.clientWidth,
            wrapper.clientHeight
          );
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
    handlePointClick(index) {
      this.$emit("pointClick", index);
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
    height: 100%;
    .editor-img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
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
        color: @primaryColor;
        text-align: center;
        background: #fff;
        border-radius: 50%;
        border: 1px solid @primaryColor;
        cursor: pointer;
        &.active {
          color: #fff;
          background: @primaryColor;
        }
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
  }
}
</style>
