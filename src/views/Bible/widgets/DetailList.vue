<template>
  <ul class="bible-item">
    <li v-for="item of list" :key="item.id">
      <div
        :class="['bible-item-card', isShowDetail(item) ? 'info' : '']"
        @click="showDetail(item)"
      >
        <div class="bible-card-top">
          <the-loading-image :width="260" :height="260" :url="item.cover_url" />
        </div>
        <div class="bible-card-bottom">
          {{ item.name }}
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage";

export default {
  name: "BibleDetailList",
  components: {
    TheLoadingImage
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  computed: {
    isShowDetail() {
      return data => {
        data.content =
          data.content instanceof Array
            ? data.content
            : (data.content && JSON.parse(data.content)) || [];
        if (data.content.length < 1 || !data.content[0].label) {
          return false;
        }
        return true;
      };
    }
  },
  methods: {
    showDetail(data) {
      if (this.isShowDetail(data)) {
        this.$emit("showDetail", data);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.bible-item {
  display: flex;
  flex-wrap: wrap;
  li {
    margin-bottom: 20px;
    &:nth-child(3n-1) {
      margin-left: 20px;
      margin-right: 20px;
    }
  }
  .bible-item-card {
    display: flex;
    flex-direction: column;
    width: 280px;
    height: 330px;
    background: #fafafa;
    &:hover {
      box-shadow: 0px 0px 11px 0px rgba(183, 183, 183, 0.5);
    }
    &.info {
      position: relative;
      cursor: pointer;
      &::after {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 20px;
        height: 20px;
        background-image: url("~images/bible/warn.svg");
        background-size: cover;
        background-repeat: no-repeat;
        content: "";
      }
    }
    .bible-card-top {
      padding: 10px;
    }
    .bible-card-bottom {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      font-size: 14px;
      font-weight: 600;
      color: #333333;
      text-shadow: 0px 0px 11px rgba(183, 183, 183, 0.5);
      border-top: 1px solid #b7b7b780;
    }
  }
}
</style>
