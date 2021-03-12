<template>
  <div class="sku-list-wrapper">
    <label class="delete-icon bgImg" @click="handleCloseClick"></label>
    <div class="scroll-wrapper">
      <ul class="sku-list">
        <li
          class="sku-item"
          v-for="sku of skus"
          :key="sku.id"
          @click="handleAddModel(sku.kjl_sku_id)"
        >
          <the-loading-image :width="145" :height="145" :url="sku.img_id" />
          <label class="sku-price"> ¥{{ sku.unit_price || "0.00" }} </label>
          <div class="sku-size">
            {{ `${sku.size_x || 0}*${sku.size_y || 0}*${sku.size_z || 0}(mm)` }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage.vue";

export default {
  name: "CommoditySkuList",
  props: {
    skus: {
      type: Array,
      required: true
    }
  },
  components: { TheLoadingImage },
  methods: {
    handleAddModel(goodId) {
      this.$emit("addModel", goodId);
    },
    handleCloseClick() {
      this.$emit("update:skus", null);
    }
  }
};
</script>

<style lang="less" scoped>
@maxHeight: 424px;
.sku-list-wrapper {
  width: 155px;
  padding: 0 0 5px;
  max-height: @maxHeight;
  overflow: hidden;
  .delete-icon {
    width: 24px;
    height: 24px;
    background-image: url("~images/common/delete.svg");
    cursor: pointer;
  }
  .scroll-wrapper {
    padding: 0 5px;
    width: calc(100% + 15px);
    max-height: calc(@maxHeight - 24px);
    overflow-y: scroll;
    .sku-list {
      display: flex;
      flex-direction: column;
      .sku-item {
        position: relative;
        width: 145px;
        height: 145px;
        background: #fafafa;
        &:hover {
          .sku-price {
            bottom: 26px;
          }
          .sku-size {
            display: block;
          }
        }
        & + .sku-item {
          margin-top: 10px;
        }
        .sku-price {
          position: absolute;
          right: 5px;
          bottom: 5px;
          padding: 2px 4px;
          line-height: 1;
          font-size: 12px;
          color: #666666;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 8px;
          transition: bottom 0.2s;
        }
        .sku-size {
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
    }
  }
}
</style>
