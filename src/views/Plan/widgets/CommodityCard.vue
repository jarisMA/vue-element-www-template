<template>
  <div
    :class="['commodity-card', type, columns > 4 ? 'multi' : '']"
    @click.prevent="handleAddModel"
    :style="{
      width: columns > 4 ? '93px' : ''
    }"
    :id="`commodity-${commodity.id}`"
  >
    <div class="card-top">
      <label
        class="bgImg multi"
        v-if="skus.length > 1"
        @click.stop="handleSkusClick"
        @mouseover="handleSkusClick"
      >
        <i class="multi-icon"></i>
      </label>
      <label
        class="bgImg info"
        @click.stop="handleDetailClick"
        @mouseover="handleClearTimer"
        @mouseout="handleDetailClick"
        ><i class="info-icon"></i
      ></label>
      <the-loading-image
        :width="columns > 4 ? 93 : 145"
        :height="columns > 4 ? 93 : 145"
        :url="(skus.length > 0 && skus[0].img_id) || ''"
      />
      <label class="bgImg feedback" @click.stop="handleShowFeedback(skus[0])">
        <i class="feedback-icon"></i>
      </label>
      <template v-if="type === 'model'">
        <label class="price-label"
          >¥{{ skus.length > 0 && (skus[0].unit_price || "0.00") }}</label
        >
        <div class="size-wrapper" v-if="columns <= 4 && skus.length > 0">
          {{
            `${skus[0].size_x || 0}*${skus[0].size_y || 0}*${skus[0].size_z ||
              0}(mm)`
          }}
        </div>
      </template>
    </div>
    <div class="card-bottom" v-if="type === 'texture'">
      <label class="card-name ellipsis">{{ skus[0].name }}</label>
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
    },
    type: {
      type: String,
      default: "model"
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
    },
    handleShowFeedback(sku) {
      this.$emit("showFeedback", sku);
    }
  }
};
</script>

<style lang="less" scoped>
@size: 145px;
.commodity-card {
  width: @size;
  margin-bottom: 10px;
  background: #fafafa;
  &:hover {
    .card-top {
      .price-label {
        bottom: 26px;
      }
      .size-wrapper {
        display: block;
      }
      .bgImg {
        display: flex;
      }
    }
  }
  &.multi {
    &:hover {
      .card-top {
        .price-label {
          bottom: 7px;
        }
      }
    }
  }
  &.texture {
    .card-top {
      .bgImg {
        &.feedback {
          bottom: 5px;
        }
      }
    }
  }
  .card-top {
    position: relative;
    .bgImg {
      position: absolute;
      display: flex;
      display: none;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.8);
      opacity: 0.8;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
      &.multi {
        top: 5px;
        left: 5px;
        .multi-icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          background-image: url("~images/commodity/multi-model.svg");
        }
      }
      &.info {
        top: 5px;
        right: 5px;
        .info-icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          background-image: url("~images/commodity/info.svg");
        }
      }
      &.feedback {
        bottom: 26px;
        left: 5px;
        .feedback-icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          background-image: url("~images/commodity/feedback.svg");
        }
      }
    }

    .price-label {
      position: absolute;
      display: inline-block;
      padding: 2px 4px;
      bottom: 7px;
      right: 7px;
      line-height: 1;
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
  .card-bottom {
    width: 100%;
    margin-top: 4px;
    .card-name {
      display: inline-block;
      width: 100%;
      line-height: 12px;
      font-size: 12px;
      color: #666666;
    }
  }
}
</style>
