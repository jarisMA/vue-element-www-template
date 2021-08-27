<template>
  <div
    :class="['the-fold-wrapper', visible ? 'unthe-fold-wrapper' : '']"
    :style="{ maxHeight: maxHeight + 'px', minHeight: maxHeight + 'px' }"
  >
    <div class="whole-wrapper" ref="whole">
      <slot> </slot>
      <div
        class="fold-operate"
        v-if="showFoldBtn"
        @click.stop="visible = !visible"
      >
        {{ !visible ? "展开" : "收起" }}
        <icon-svg v-if="!visible" svg-class="down-icon" svg-name="down" />
        <icon-svg v-else svg-class="up-icon" svg-name="down" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheFold",
  props: {
    maxHeight: {
      type: Number,
      default: 75
    },
    isFold: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: true,
      showFoldBtn: false
    };
  },
  watch: {
    // isFold (val) {
    //   if (val) {
    //     this.judge();
    //   }
    // }
  },
  mounted() {
    // this.judge();
  },
  methods: {
    judge() {
      const height =
        (this.$refs.whole && this.$refs.whole.offsetHeight) || this.maxHeight;
      if (height > this.maxHeight) {
        this.showFoldBtn = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.the-fold-wrapper {
  position: relative;
  overflow-x: visible;
  overflow-y: hidden;
  &.unthe-fold-wrapper {
    max-height: unset !important;
    overflow: visible;
  }
}
.fold-operate {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 26px;
  background: linear-gradient(180deg, rgba(238, 238, 238, 0) 0%, #d8d8d8 100%);
  font-size: 12px;
  font-weight: 400;
  color: @primaryColor;
  line-height: 26px;
  text-align: center;
  cursor: pointer;
}
.up-icon {
  transform: rotate(180deg);
}
</style>
