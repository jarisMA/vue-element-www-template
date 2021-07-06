<template>
  <div :class="['quadrant-container']">
    <div
      :class="['quadrant-risk', showRisk ? '' : 'grey']"
      @click="handleShowRisk"
       v-if="quadrant.first.risk"
    >
      <img src="~images/bible/risk.svg" />
    </div>
    <div
      v-for="(item, key) of axis"
      :class="'axis-' + key"
      :key="key"
      title="坐标名称"
      :style="{
        backgroundColor: item.bgColor
      }"
    >
      <label class="axis-label" v-if="item.name">{{ item.name }} </label>
    </div>

    <div class="quadrant-wrapper">
      <img class="x-axis" src="~images/bible/x-axis.svg" />
      <i
        class="x-fill"
        :style="{
          background: `linear-gradient(to right, ${axis.y_axis_left.bgColor}, ${axis.y_axis_right.bgColor})`
        }"
      />
      <img class="y-axis" src="~images/bible/y-axis.svg" />
      <i
        class="y-fill"
        :style="{
          background: `linear-gradient(to bottom, ${axis.x_axis_top.bgColor}, ${axis.x_axis_bottom.bgColor})`
        }"
      />
      <div
        :class="`quadrant-${key}`"
        :style="{ 'border-color': item.bgColor }"
        v-for="(item, key) of quadrant"
        :key="key"
      >
        <div
          class="quadrant-name"
          title="象限名称"
          :style="{ backgroundColor: item.bgColor }"
        >
          <label class="quadrant-name-label" v-if="item.name">{{
            item.name
          }}</label>
        </div>
        <div class="quadrant-grid-wrapper">
          <div
            v-show="showRisk"
            class="quadrant-tips"
            :style="{ backgroundColor: item.risk ? item.risk.bgColor : '' }"
          >
            {{ item.risk ? item.risk.name : "" }}
          </div>

          <quadrant-grid
            :ref="`quadrant-${key}`"
            :theme="key"
            :grids.sync="item.grids"
            :disabled="disabled"
            @gridClick="data => handleQuadrantGridClick(data.image, key)"
            v-show="!showRisk"
          />
        </div>
      </div>
    </div>
    <el-dialog
      custom-class="preview-image-wrapper"
      :visible="showPreviewImage"
      :show-close="false"
    >
      <div
        class="preview-image-container"
        @click="showPreviewImage = false"
        v-if="images[activeImageKey.quadrant].length > 0"
      >
        <div class="preview-image-close">
          <i class="close-icon"></i>
        </div>

        <div class="preview-image-content">
          <div class="preview-image-content_image">
            <img
              :src="images[activeImageKey.quadrant][activeImageKey.image]"
              @click.stop
            />
          </div>
          <div class="preview-image-content_pagination">
            {{ activeImageKey.image + 1 }}/{{
              images[activeImageKey.quadrant].length
            }}
          </div>
          <div
            class="preview-image-prev"
            v-if="activeImageKey.image > 0"
            @click.stop="
              handleQuadrantGridClick(
                images[activeImageKey.quadrant][activeImageKey.image - 1],
                activeImageKey.quadrant
              )
            "
          >
            <i class="prev-icon"></i>
          </div>
          <div
            class="preview-image-next"
            v-if="
              activeImageKey.image + 1 < images[activeImageKey.quadrant].length
            "
            @click.stop="
              handleQuadrantGridClick(
                images[activeImageKey.quadrant][activeImageKey.image + 1],
                activeImageKey.quadrant
              )
            "
          >
            <i
              class="
               next-icon"
            ></i>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import QuadrantGrid from "./QuadrantGrid";
const axis = {
  x_axis_top: {
    name: "",
    bgColor: ""
  },
  x_axis_bottom: {
    name: ""
  },
  y_axis_left: {
    name: ""
  },
  y_axis_right: {
    name: ""
  }
};
const quadrant = {
  first: {
    key: 1,
    name: "",
    bgColor: "",
    grids: []
  },
  second: {
    key: 2,
    name: "",
    bgColor: "",
    grids: []
  },
  third: {
    key: 3,
    name: "",
    bgColor: "",
    grids: []
  },
  fourth: {
    key: 4,
    name: "",
    bgColor: "",
    grids: []
  }
};

const images = {
  first: [],
  second: [],
  third: [],
  fourth: []
};
export default {
  components: { QuadrantGrid },
  name: "BibleQuadrant",
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    content: {
      type: String
    }
  },
  data() {
    return {
      axis: JSON.parse(JSON.stringify(axis)),
      quadrant: JSON.parse(JSON.stringify(quadrant)),
      showPreviewImage: false,
      images: JSON.parse(JSON.stringify(images)),
      activeImageKey: {
        quadrant: "first",
        image: 0
      },
      showRisk: false
    };
  },
  watch: {
    content(val) {
      if (val) {
        const content = JSON.parse(val);
        this.axis = content.axis;
        this.quadrant = content.quadrant;
        Object.keys(this.quadrant).map(key => {
          this.images[key] = this.quadrant[key].grids
            .filter(item => item.image)
            .map(item => item.image);
        });
      } else {
        this.axis = JSON.parse(JSON.stringify(axis));
        this.quadrant = JSON.parse(JSON.stringify(quadrant));
        this.images = JSON.parse(JSON.stringify(images));
      }
    }
  },
  created() {
    if (this.content) {
      const content = JSON.parse(this.content);
      this.axis = content.axis;
      this.quadrant = content.quadrant;
      Object.keys(this.quadrant).map(key => {
        this.images[key] = this.quadrant[key].grids
          .filter(item => item.image)
          .map(item => item.image);
      });
    }
  },
  methods: {
    handleQuadrantGridClick(url, key) {
      if (url) {
        this.activeImageKey.quadrant = key;
        this.activeImageKey.image =
          this.images[key].findIndex(item => item === url) || 0;
        this.showPreviewImage = true;
      }
    },
    handleShowRisk() {
      this.showRisk = !this.showRisk;
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.quadrant-container {
  position: relative;
  display: inline-block;
  padding: 50px;
  margin-top: 40px;
  .quadrant-risk {
    position: absolute;
    top: -28px;
    right: 0px;
    background-color: #ffe7e7;
    width: 32px;
    height: 32px;
    padding: 4px;
    border-radius: 50%;
    cursor: pointer;
  }
  .grey {
    filter: grayscale(1);
  }

  .axis-x_axis_top,
  .axis-x_axis_bottom,
  .axis-y_axis_left,
  .axis-y_axis_right {
    position: absolute;
    .axis-label {
      display: inline-block;
      line-height: 46px;
      font-weight: 600;
      font-size: 20px;
      word-break: keep-all;
      color: white;
    }
  }
  .axis-x_axis_top {
    top: -34px;
    left: 50%;
    width: 112px;
    height: 46px;
    text-align: center;
    transform: translateX(-50%);
    border-radius: 28px;
    &::before {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100px;
      height: 34px;
      border: 6px solid rgba(0, 0, 0, 0.2);
      border-radius: 28px;
      background: transparent;
      content: "";
    }
  }
  .axis-x_axis_bottom {
    bottom: 22px;
    left: 50%;
    width: 112px;
    height: 46px;
    text-align: center;
    transform: translateX(-50%);
    border-radius: 28px;
    &::before {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100px;
      height: 34px;
      border: 6px solid rgba(0, 0, 0, 0.2);
      border-radius: 28px;
      background: transparent;
      content: "";
    }
  }
  .axis-y_axis_left {
    top: 50%;
    right: calc(100% - 40px);
    transform: translateY(-73%);
    width: 46px;
    height: 112px;
    text-align: center;
    writing-mode: vertical-rl;
    border-radius: 28px;
    &::before {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 34px;
      height: 100px;
      border: 6px solid rgba(0, 0, 0, 0.2);
      border-radius: 28px;
      background: transparent;
      content: "";
    }
  }
  .axis-y_axis_right {
    top: 50%;
    left: calc(100% - 40px);
    transform: translateY(-73%);
    width: 46px;
    height: 112px;
    text-align: center;
    writing-mode: vertical-rl;
    border-radius: 28px;
    &::before {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 34px;
      height: 100px;
      border: 6px solid rgba(0, 0, 0, 0.2);
      border-radius: 28px;
      background: transparent;
      content: "";
    }
  }
  .quadrant-wrapper {
    position: relative;
    width: 864px;
    height: 920px;
    .x-axis {
      position: absolute;
      top: 432px;
      left: 0;
      width: 100%;
      height: 48px;
      transform: translateY(-50%);
      z-index: 4;
    }
    .x-fill {
      position: absolute;
      top: 432px;
      left: 0;
      width: 100%;
      height: 48px;
      transform: translateY(-50%);
      z-index: 3;
      mask-image: url(~images/bible/x-fill.svg);
    }

    .y-axis {
      position: absolute;
      top: -28px;
      left: 50%;
      width: 100px;
      height: 100%;
      z-index: 2;
      transform: translateX(-50%);
    }
    .y-fill {
      position: absolute;
      top: 432px;
      left: 408px;
      width: 48px;
      height: 100%;
      transform: translateY(-50%);
      z-index: 1;
      mask-image: url(~images/bible/y-fill.svg);
    }
    .quadrant-first,
    .quadrant-second,
    .quadrant-third,
    .quadrant-fourth {
      position: absolute;
      width: 432px;
      height: 460px;
      border-width: 12px;
      border-style: solid;
      .quadrant-grid-wrapper {
        position: absolute;
      }

      .quadrant-tips {
        line-height: 52px;
        padding-top: 124px;
        margin: 45px;
        width: 300px;
        height: 300px;
        text-align: center;
        font-weight: 800;
        font-size: 36px;
        border-radius: 50%;
      }

      .quadrant-name {
        position: absolute;
        border-radius: 15px;
        .quadrant-name-label {
          display: inline-block;
          padding: 12px 30px;
          line-height: 16px;
          font-weight: 600;
          font-size: 16px;
          color: #2c3330;
        }
      }
    }
    .quadrant-first {
      left: 0;
      bottom: 28px;
      .quadrant-name {
        bottom: -12px;
        left: -12px;
      }
      .quadrant-grid-wrapper {
        top: -1px;
        right: -1px;
      }
    }
    .quadrant-second {
      left: 0;
      top: -28px;
      .quadrant-name {
        left: -12px;
        top: -12px;
      }
      .quadrant-grid-wrapper {
        bottom: -1px;
        right: -1px;
      }
    }
    .quadrant-fourth {
      right: 0;
      top: -28px;
      .quadrant-name {
        top: -12px;
        right: -12px;
      }
      .quadrant-grid-wrapper {
        bottom: -1px;
        left: -1px;
      }
    }
    .quadrant-third {
      right: 0;
      bottom: 28px;
      .quadrant-name {
        bottom: -12px;
        right: -12px;
      }
      .quadrant-grid-wrapper {
        top: -1px;
        left: -1px;
      }
    }
  }
}
</style>
