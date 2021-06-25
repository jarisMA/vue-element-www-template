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
      >
        <img v-if="item.image" :src="item.image" />
        <!-- <span v-else>{{ item.i }}</span> -->
      </grid-item>
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
      margin: 2
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
      this.originLayouts = JSON.parse(JSON.stringify(val));
      this.layouts = JSON.parse(JSON.stringify(this.originLayouts));
      this.colNum =
        Math.max.apply(
          Math,
          val.map(function(grid) {
            return grid.x;
          })
        ) + 1;
      this.rowNum =
        Math.max.apply(
          Math,
          val.map(function(grid) {
            return grid.y;
          })
        ) + 1;
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.grids.length > 0) {
        this.colNum =
          Math.max.apply(
            Math,
            this.grids.map(function(grid) {
              return grid.x;
            })
          ) + 1;
        this.rowNum =
          Math.max.apply(
            Math,
            this.grids.map(function(grid) {
              return grid.y;
            })
          ) + 1;
        this.originLayouts = JSON.parse(JSON.stringify(this.grids));
        this.layouts = JSON.parse(JSON.stringify(this.originLayouts));
      } else {
        this.initLayouts();
      }
    });
  },
  methods: {
    initLayouts() {
      const widthCol = this.colNum;
      const heightCol = this.rowNum;
      const layouts = [];
      switch (this.theme) {
        case "first":
          for (let j = 0; j < heightCol; j++) {
            for (let i = widthCol - 1; i >= 0; i--) {
              layouts.push({
                x: i,
                y: j,
                w: 1,
                h: 1,
                i: layouts.length,
                image: null
              });
            }
          }
          break;
        case "second":
          for (let j = heightCol - 1; j >= 0; j--) {
            for (let i = widthCol - 1; i >= 0; i--) {
              layouts.push({
                x: i,
                y: j,
                w: 1,
                h: 1,
                i: layouts.length,
                image: null
              });
            }
          }
          break;
        case "fourth":
          for (let j = heightCol - 1; j >= 0; j--) {
            for (let i = 0; i < widthCol; i++) {
              layouts.push({
                x: i,
                y: j,
                w: 1,
                h: 1,
                i: layouts.length,
                image: null
              });
            }
          }
          break;
        case "third":
        default:
          for (let j = 0; j < heightCol; j++) {
            for (let i = 0; i < widthCol; i++) {
              layouts.push({
                x: i,
                y: j,
                w: 1,
                h: 1,
                i: layouts.length,
                image: null
              });
            }
          }
          break;
      }
      this.$emit("update:grids", JSON.parse(JSON.stringify(layouts)));
    },
    handleGridClick(data) {
      if (data.image) {
        this.$emit("gridClick", data);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.quadrant-grid-wrapper {
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
  border: 1px dashed #cccccc;
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
