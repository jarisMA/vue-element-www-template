<template>
  <div>
    <div v-if="type == 2">
      <ul :class="['bible-item', theme]" v-for="item of list" :key="item.id">
        <li v-for="(image, key) of getImages(item.cover_url)" :key="key">
          <the-loading-image
            :width="imageSize"
            :height="imageSize"
            :url="image"
            @click.stop.native="showPreviewImage(image)"
          />
        </li>
      </ul>
    </div>
    <ul :class="['bible-item', theme]" v-else>
      <li v-for="item of list" :key="item.id">
        <bible-card
          :bible="item"
          :theme="theme"
          @showDetail="showDetail(item)"
          @previewImage="showPreviewImage"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import BibleCard from "./BibleCard";
import TheLoadingImage from "components/TheLoadingImage";

export default {
  name: "BibleDetailList",
  components: {
    TheLoadingImage,
    BibleCard
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      default: "three"
    },
    depth: {
      type: Number,
      required: false
    },
    type: {
      type: Number
    }
  },
  computed: {
    getImages() {
      return val => {
        return (val && val.split(",")) || [];
      };
    },
    imageSize() {
      switch (this.theme) {
        case "two":
          return 410;
        default:
          return 260;
      }
    }
  },
  methods: {
    showDetail(data) {
      this.$emit("showDetail", data);
    },
    showPreviewImage(url) {
      this.$emit("previewImage", url);
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
  }
  &.three {
    li {
      &:nth-child(3n-1) {
        margin-left: 20px;
        margin-right: 20px;
      }
    }
  }
  &.two {
    li {
      &:nth-child(odd) {
        margin-right: 20px;
      }
    }
  }
}
</style>
