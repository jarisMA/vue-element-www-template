<template>
  <div
    :class="['commodity-card', columns > 4 ? 'multi' : '']"
    @click.prevent="handleAddModel"
    :style="{
      width: columns > 4 ? '93px' : '',
      height: columns > 4 ? '93px' : ''
    }"
    :id="`commodity-${commodity.id}`"
  >
    <label
      class="bgImg multi-icon"
      v-if="commodity.skus.length > 1"
      @click.stop="handleSkusClick"
    ></label>
    <label
      class="bgImg info-icon"
      @click.stop="handleDetailClick"
      @mouseover="handleClearTimer"
      @mouseout="handleDetailClick"
    ></label>
    <the-loading-image
      :width="columns > 4 ? 93 : 145"
      :height="columns > 4 ? 93 : 145"
      :url="commodity.skus[0].img_id"
    />
    <label class="price-label">¥{{ commodity.skus[0].unit_price }}</label>
    <div class="size-wrapper" v-if="columns <= 4">
      {{
        `${commodity.skus[0].size_x}*${commodity.skus[0].size_y}*${commodity.skus[0].size_z}(mm)`
      }}
    </div>
  </div>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage";

export default {
  name: "CommodityCard",
  components: { TheLoadingImage },
  props: {
    commodity: {
      type: Object,
      required: true
    },
    columns: {
      type: Number,
      default: 2
    }
  },
  methods: {
    handleDetailClick() {
      this.$emit("detail");
    },
    handleSkusClick() {
      this.$emit("showSkus", this.commodity.skus);
    },
    handleAddModel() {
      this.$emit("addModel", this.commodity.skus[0].kjl_sku_id);
    },
    handleClearTimer() {
      this.$emit("clearTimer");
    }
  }
};
</script>

<style lang="less" scoped>
@size: 145px;
.commodity-card {
  position: relative;
  width: @size;
  height: @size;
  margin-bottom: 10px;
  background: #fafafa;
  &:hover {
    .price-label {
      bottom: 26px;
    }
    .size-wrapper {
      display: block;
    }
    .bgImg {
      display: inline-block;
    }
  }
  &.multi {
    &:hover {
      .price-label {
        bottom: 7px;
      }
    }
  }
  .bgImg {
    display: none;
    position: absolute;
    top: 5px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  .multi-icon {
    left: 5px;
    background-image: url("~images/commodity/multi-model.svg");
  }
  .info-icon {
    right: 5px;
    background-image: url("~images/commodity/info.svg");
  }
  .price-label {
    position: absolute;
    display: inline-block;
    padding: 2px 4px;
    bottom: 7px;
    right: 7px;
    font-size: 12px;
    color: #666666;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    transition: bottom 0.2s;
  }
  .size-wrapper {
    display: none;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 0 5px;
    width: 100%;
    height: 21px;
    line-height: 21px;
    font-size: 12px;
    color: #666666;
    background: rgba(255, 255, 255, 0.8);
  }
}
</style>
