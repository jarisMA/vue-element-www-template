<template>
  <div class="sku-list-wrapper">
    <div class="scroll-wrapper">
      <ul class="sku-list">
        <li
          class="sku-item"
          v-for="sku of skus"
          :key="sku.id"
          @click="handleAddModel(sku.kjl_sku_id)"
        >
          <the-loading-image :width="145" :height="145" :url="sku.img_id" />
          <label class="sku-price"> ¥{{ sku.unit_price }} </label>
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
    }
  }
};
</script>

<style lang="less" scoped>
.sku-list-wrapper {
  width: 155px;
  max-height: 424px;
  overflow: hidden;
  .scroll-wrapper {
    padding: 5px;
    width: calc(100% + 15px);
    max-height: 424px;
    overflow-y: scroll;
    .sku-list {
      display: flex;
      flex-direction: column;

      .sku-item {
        position: relative;
        width: 145px;
        height: 145px;
        background: #fafafa;
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
        }
      }
    }
  }
}
</style>
