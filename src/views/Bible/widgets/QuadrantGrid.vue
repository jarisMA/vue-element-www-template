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
      :use-css-transforms="true"
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
        <img v-if="item.image" :src="item.image" />
        <!-- <span v-else>{{ item.i }}</span> -->
      </grid-item>
      <div
        class="grid-image-preview"
        v-if="preview.image"
        :style="{ top: preview.y + 'px', left: preview.x + 'px' }"
      >
        <img :src="preview.image" />
      </div>
    </grid-layout>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";

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
      maxLayoutWidth: 500,
      maxLayoutHeight: 418,
      originLayouts: [],
      layouts: [],
      colNum: 6,
      rowNum: 5,
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
      this.colNum = Math.max(
        6,
        Math.max.apply(
          Math,
          grids.map(function(grid) {
            return grid.x;
          }),
          6
        ) + 1
      );
      this.rowNum = Math.max(
        5,
        Math.max.apply(
          Math,
          grids.map(function(grid) {
            return grid.y;
          })
        ) + 1
      );
      this.originLayouts = JSON.parse(JSON.stringify(grids));
      this.layouts = JSON.parse(JSON.stringify(this.originLayouts));
    },
    handleGridClick(data) {
      if (data.image) {
        this.$emit("gridClick", data);
      }
    },
    handleMouseover(e, image) {
      if (image) {
        this.preview = {
          image: image,
          x: e.pageX + 2,
          y: e.pageY + 2
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
    z-index: 1;
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
  width: 412px;
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
