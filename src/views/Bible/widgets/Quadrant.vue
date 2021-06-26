<template>
  <div :class="['quadrant-container']">
    <div
      v-for="(item, key) of axis"
      :class="'axis-' + key"
      :key="key"
      title="坐标名称"
    >
      <label
        class="axis-label"
        v-if="item.name"
        :style="{ backgroundColor: item.bgColor }"
        >{{ item.name }}
      </label>
    </div>

    <div class="quadrant-wrapper">
      <div class="x-axis"></div>
      <div class="y-axis"></div>
      <div
        :class="`quadrant-${key}`"
        :style="{ backgroundColor: item.bgColor }"
        v-for="(item, key) of quadrant"
        :key="key"
      >
        <div class="quadrant-label">第{{ item.key }}象限</div>
        <div class="quadrant-name" title="象限名称">
          <label class="quadrant-name-label" v-if="item.name">{{
            item.name
          }}</label>
        </div>
        <div class="quadrant-grid-wrapper">
          <quadrant-grid
            :ref="`quadrant-${key}`"
            :theme="key"
            :grids.sync="item.grids"
            :disabled="disabled"
            @gridClick="data => handleQuadrantGridClick(data.image, key)"
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
      }
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
  .axis-x_axis_top,
  .axis-x_axis_bottom,
  .axis-y_axis_left,
  .axis-y_axis_right {
    position: absolute;
    .axis-label {
      display: inline-block;
      padding: 10px;
      line-height: 20px;
      font-weight: 600;
      font-size: 14px;
      word-break: keep-all;
      background: @primaryColor;
      border-radius: 2px;
    }
  }
  .axis-x_axis_top {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .axis-x_axis_bottom {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .axis-y_axis_left {
    top: 50%;
    right: calc(100% - 40px);
    transform: translateY(-50%);
  }
  .axis-y_axis_right {
    top: 50%;
    left: calc(100% - 40px);
    transform: translateY(-50%);
  }
  .quadrant-wrapper {
    position: relative;
    width: 1028px;
    height: 1028px;
    .x-axis {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 4px;
      background: #2c3330;
      z-index: 1;
      transform: translateY(-50%);
      &::before,
      &::after {
        position: absolute;
        top: 0px;
        width: 8px;
        height: 8px;
        border-top: 4px solid #2c3330;
        border-left: 4px solid #2c3330;
        content: "";
      }
      &::before {
        left: -4px;
        transform-origin: center;
        transform: rotate(-45deg) translate(50%, 0);
      }
      &::after {
        right: 4px;
        transform: rotate(135deg) translate(-50%, 0);
      }
    }
    .y-axis {
      position: absolute;
      top: 0;
      left: 50%;
      width: 4px;
      height: 100%;
      background: #2c3330;
      z-index: 1;
      transform: translateX(-50%);
      &::before,
      &::after {
        position: absolute;
        left: 0px;
        width: 8px;
        height: 8px;
        border-top: 4px solid #2c3330;
        border-left: 4px solid #2c3330;
        content: "";
      }
      &::before {
        top: -4px;
        transform-origin: center;
        transform: rotate(45deg) translate(0, 50%);
      }
      &::after {
        bottom: 4px;
        transform: rotate(-135deg) translate(0, -50%);
      }
    }
    .quadrant-first,
    .quadrant-second,
    .quadrant-third,
    .quadrant-fourth {
      position: absolute;
      width: 514px;
      height: 432px;
      .quadrant-grid-wrapper {
        position: absolute;
      }
      .quadrant-name {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        .quadrant-name-label {
          display: inline-block;
          padding: 10px;
          line-height: 20px;
          font-weight: 600;
          font-size: 14px;
          color: #81948b;
        }
      }
      .quadrant-label {
        position: absolute;
        margin: 10px 0;
        line-height: 20px;
        font-weight: 600;
        font-size: 14px;
        color: #666666;
      }
    }
    .quadrant-first {
      left: 0;
      bottom: 0;
      .quadrant-name {
        bottom: -50px;
      }
      .quadrant-label {
        left: 0;
        bottom: -50px;
      }
      .quadrant-grid-wrapper {
        top: 7px;
        right: 7px;
      }
    }
    .quadrant-second {
      left: 0;
      top: 0;
      .quadrant-name {
        top: -50px;
      }
      .quadrant-label {
        left: 0;
        top: -50px;
      }
      .quadrant-grid-wrapper {
        bottom: 7px;
        right: 7px;
      }
    }
    .quadrant-fourth {
      right: 0;
      top: 0;
      .quadrant-name {
        top: -50px;
      }
      .quadrant-label {
        right: 0;
        top: -50px;
      }
      .quadrant-grid-wrapper {
        bottom: 7px;
        left: 7px;
      }
    }
    .quadrant-third {
      right: 0;
      bottom: 0;
      .quadrant-name {
        bottom: -50px;
      }
      .quadrant-label {
        right: 0;
        bottom: -50px;
      }
      .quadrant-grid-wrapper {
        top: 7px;
        left: 7px;
      }
    }
  }
}
</style>
