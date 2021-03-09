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
      v-if="skus.length > 1"
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
      :url="(skus.length > 0 && skus[0].img_id) || ''"
    />
    <label class="price-label"
      >¥{{ skus.length > 0 && skus[0].unit_price }}</label
    >
    <div class="size-wrapper" v-if="columns <= 4 && skus.length > 0">
      {{
        `${skus[0].size_x || 0}*${skus[0].size_y || 0}*${skus[0].size_z ||
          0}(mm)`
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
    },
    values: {
      type: Array
    }
  },
  computed: {
    skus() {
      let skus = JSON.parse(JSON.stringify(this.commodity.skus));
      if (!this.values || this.values.length < 1) {
        return skus;
      }
      const size_x = this.values.filter(item => item.type === "size_x");
      const size_y = this.values.filter(item => item.type === "size_y");
      const size_z = this.values.filter(item => item.type === "size_z");
      const values = this.values
        .filter(item => item.type === "value")
        .map(item => item.value.id);
      skus = skus.filter(sku => {
        let flag = true;
        if (size_x.length > 0) {
          if (size_x[0].value.min_size_x) {
            if (sku.size_x < size_x[0].value.min_size_x) {
              flag = false;
            }
          }
          if (size_x[0].value.max_size_x) {
            if (sku.size_x > size_x[0].value.max_size_x) {
              flag = false;
            }
          }
        }
        if (size_y.length > 0) {
          if (size_y[0].value.min_size_y) {
            if (sku.size_y < size_y[0].value.min_size_y) {
              flag = false;
            }
          }
          if (size_y[0].value.max_size_y) {
            if (sku.size_y > size_y[0].value.max_size_y) {
              flag = false;
            }
          }
        }
        if (size_z.length > 0) {
          if (size_z[0].value.min_size_z) {
            if (sku.size_z < size_z[0].value.min_size_z) {
              flag = false;
            }
          }
          if (size_z[0].value.max_size_z) {
            if (sku.size_z > size_z[0].value.max_size_z) {
              flag = false;
            }
          }
        }
        return (
          flag &&
          (values.length > 0
            ? sku.values.filter(item => values.indexOf(item.value_id) > -1)
                .length > 0
            : true)
        );
      });
      return skus;
    }
  },
  methods: {
    handleDetailClick() {
      this.$emit("detail");
    },
    handleSkusClick() {
      this.$emit("showSkus", this.skus);
    },
    handleAddModel() {
      this.$emit("addModel", this.skus[0].kjl_sku_id);
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
