<template>
  <div :class="['quadrant-grid-wrapper', theme]">
    <grid-layout
      :style="{
        width: colNum * rowHeight + margin + 'px',
        height: rowNum * rowHeight + margin + 'px',
        overflow: 'hidden'
      }"
      :layout="layouts"
      :colNum="colNum"
      :row-height="rowHeight - 2"
      :maxRows="rowNum"
      :is-draggable="false"
      :is-resizable="false"
      :is-mirrored="false"
      :vertical-compact="false"
      :margin="[margin, margin]"
      :use-css-transforms="false"
      ref="grid"
    >
      <grid-item
        v-for="item in layouts"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        @click.native="handleGridClick(item)"
        @mouseover.native="e => handleMouseover(e, item.image)"
        @mouseout.native="handleMouseout"
      >
        <img
          v-if="item.image"
          :src="item.image + '?x-oss-process=style/pc_bible_300wh'"
        />
        <!-- <span v-else>{{ item.i }}</span> -->
      </grid-item>
      <div
        class="grid-image-preview"
        v-if="preview.image"
        :style="{ top: preview.y + 'px', left: preview.x + 'px' }"
      >
        <img :src="preview.image + '?x-oss-process=style/pc_bible_300wh'" />
      </div>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
const colNum = 5;
const rowNum = 5;
export default {
  name: "BibleQuadrantGrid",
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  props: {
    theme: {
      type: String
    },
    grids: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      maxLayoutWidth: 408,
      maxLayoutHeight: 408,
      originLayouts: [],
      layouts: [],
      colNum,
      rowNum,
      rowHeight: 82,
      margin: 2,
      preview: {
        image: null,
        x: null,
        y: null
      }
    };
  },
  watch: {
    colNum(val) {
      this.rowHeight = Math.min(
        Math.floor(this.maxLayoutHeight / this.rowNum),
        Math.floor(this.maxLayoutWidth / val)
      );
    },
    rowNum(val) {
      this.rowHeight = Math.min(
        Math.floor(this.maxLayoutHeight / val),
        Math.floor(this.maxLayoutWidth / this.colNum)
      );
    },
    grids(val) {
      this.setLayout(val);
    }
  },
  created() {
    this.setLayout(this.grids);
  },
  methods: {
    setLayout(data) {
      const grids = data.filter(item => item.image);
      this.colNum =
        Math.max.apply(
          Math,
          data.map(function(grid) {
            return grid.x;
          })
        ) + 1;
      this.rowNum =
        Math.max.apply(
          Math,
          data.map(function(grid) {
            return grid.y;
          })
        ) + 1;
      this.originLayouts = JSON.parse(JSON.stringify(grids));
      this.layouts = JSON.parse(JSON.stringify(this.originLayouts));
    },
    handleGridClick(data) {
      if (data.image) {
        this.$emit("gridClick", data);
      }
    },
    getOffsetLeft(obj) {
      let tmp = obj.offsetLeft;
      let val = obj.offsetParent;
      while (val != null) {
        tmp += val.offsetLeft;
        val = val.offsetParent;
      }
      return tmp;
    },
    getOffsetTop(obj) {
      let tmp = obj.offsetTop;
      let val = obj.offsetParent;
      while (val != null) {
        tmp += val.offsetTop;
        val = val.offsetParent;
      }
      return tmp;
    },

    handleMouseover(e, image) {
      var st = window.getComputedStyle(e.target.offsetParent, null);
      var tr =
        st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform") ||
        "FAIL";
      // 矩阵的各个值 matrix(scaleX, skewY, skewX, scaleY, translateX, translateY)
      var values = tr
        .split("(")[1]
        .split(")")[0]
        .split(",");
      if (image && this.preview.image !== image) {
        this.preview = {
          image: image,
          x:
            this.getOffsetLeft(e.target) +
            parseInt(values[4]) +
            e.clientX -
            e.pageX +
            12,
          y:
            this.getOffsetTop(e.target) +
            e.target.clientHeight +
            parseInt(values[5]) +
            e.clientY -
            e.pageY +
            12
        };
      }
    },
    handleMouseout() {
      this.preview = {
        image: null,
        x: null,
        y: null
      };
    }
  }
};
</script>

<style lang="less" scoped>
.quadrant-grid-wrapper {
  position: relative;
  .grid-image-preview {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 6;
    background: #c4c4c4;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    img {
      max-width: 300px;
      max-height: 300px;
    }
  }
  &.first {
    .grid-upload-wrapper {
      bottom: 0;
      left: 0;
      /deep/ .upload-wrapper {
        .el-upload {
          border-left: unset;
          border-bottom: unset;
        }
      }
    }
  }
  &.second {
    .grid-upload-wrapper {
      top: 0;
      left: 0;
      /deep/ .upload-wrapper {
        .el-upload {
          border-top: unset;
          border-left: unset;
        }
      }
    }
  }
  &.third {
    .grid-upload-wrapper {
      bottom: 0;
      right: 0;
      /deep/ .upload-wrapper {
        .el-upload {
          border-right: unset;
          border-bottom: unset;
        }
      }
    }
  }
  &.fourth {
    .grid-upload-wrapper {
      top: 0;
      right: 0;
      /deep/ .upload-wrapper {
        .el-upload {
          border-right: unset;
          border-top: unset;
        }
      }
    }
  }
}
.vue-grid-layout {
  position: relative;
  width: 408px;
  height: 408px;
}
.vue-grid-item {
  transition-duration: 100ms;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  user-select: none;
  touch-action: none;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
}
</style>
