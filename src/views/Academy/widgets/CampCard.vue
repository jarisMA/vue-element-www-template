<template>
  <div class="card">
    <the-loading-image
      :url="camp.cover_file_url + '?x-oss-process=style/pc_camp_index'"
      class="card-cover"
    />
    <div class="card-content">
      <span class="card-label">// CAMP:</span>
      <h3 class="card-title ellipsis" :style="{ color: camp.title_color }">
        {{ camp.name }}
      </h3>
      <div class="card-desc">
        <h4 class="card-desc_camp">{{ camp.term.name }}</h4>
        <span class="card-desc_status" :style="{ color: camp.price_color }">{{
          campStatus(camp.term) === 1
            ? "热招中"
            : campStatus(camp.term) === 2
            ? "已开课"
            : "敬请期待"
        }}</span>
      </div>
    </div>
    <div class="card-footer">
      <span class="card-price" :style="{ color: camp.price_color }"
        >￥{{ camp.term.price }}</span
      >
      <button
        class="card-btn"
        :style="{ background: camp.price_color }"
        @click="goAcademyCampDetail(camp.id)"
      >
        {{
          campStatus(camp.term) === 1
            ? "开始报名"
            : campStatus(camp.term) === 2
            ? "查看详情"
            : "敬请期待"
        }}
        <img
          src="~images/academy/vector.svg"
          v-if="campStatus(camp.term) === 1"
          class="card-btn_vector"
        />
      </button>
    </div>
  </div>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage";
import { campMixin } from "./mixin";
import { goAcademyCampDetail } from "utils/routes";
export default {
  name: "CampCard",
  components: { TheLoadingImage },
  mixins: [campMixin],
  props: {
    camp: {
      type: Object,
      required: true
    }
  },
  methods: {
    goAcademyCampDetail
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.card {
  width: 540px;
  padding: 15px 15px 23px;
  border: 1px solid #efefef;
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  }
  .card-cover {
    width: 508px;
    height: 286px;
  }
  .card-content {
    width: 100%;
    margin-top: 16px;
    .card-label {
      display: block;
      font-size: 24px;
      font-weight: 800;
      line-height: 30px;
      color: #dddddd;
      cursor: default;
    }
    .card-title {
      margin-top: 10px;
      line-height: 1;
      font-size: 40px;
      font-weight: 800;
      color: @primaryColor;
      cursor: default;
    }
    .card-desc {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 24px;
      width: 100%;
      padding: 12px;
      background: #fafafa;
      .card-desc_camp {
        line-height: 24px;
        font-size: 14px;
        font-weight: 400;
        color: #606c66;
        cursor: default;
      }
      .card-desc_status {
        line-height: 24px;
        font-size: 14px;
        font-weight: 400;
        color: #606c66;
        cursor: default;
      }
    }
  }
}
.card-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 24px;
  .card-price {
    font-weight: 800;
    font-size: 40px;
    line-height: 40px;
    color: @primaryColor;
    cursor: default;
  }
  .card-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 30px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    border: 0;
    outline: none;
    color: white;
    background-color: @primaryColor;
    cursor: pointer;
  }
  .card-btn_vector {
    width: 16px;
    height: 10px;
    margin-top: 3px;
    margin-left: 8px;
  }
}
</style>
