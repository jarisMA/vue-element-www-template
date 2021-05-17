<template>
  <div :class="['search-wrapper', !showSearch ? 'hide' : '']">
    <div class="search-bar">
      <i
        class="search-icon"
        @click="!showSearch ? handleToggleShowSearch() : null"
      ></i>
      <input
        placeholder="搜索..."
        class="search-input"
        placeholder-class="search-input_placeholder"
        v-model.trim="keyword"
        @keyup.enter="handleSearch"
        @blur="handleToggleShowSearch()"
        ref="searchInput"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TheSearchBar",
  data() {
    return {
      showSearch: false,
      keyword: ""
    };
  },
  methods: {
    handleSearch() {
      this.$emit("search", this.keyword);
    },
    handleToggleShowSearch() {
      if (!this.showSearch) {
        this.showSearch = true;
        this.$nextTick(() => {
          this.$refs["searchInput"].focus();
        });
      } else if (!this.keyword) {
        this.showSearch = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.search-wrapper {
  width: 280px;
  transition: width 0.2s;
  overflow: hidden;
  &.hide {
    width: 34px;
    .search-bar {
      background-color: transparent;
      .search-icon {
        background-color: #2c3330;
        cursor: pointer;
      }
    }
  }
  .search-bar {
    display: flex;
    align-items: center;
    width: 280px;
    height: 40px;
    padding: 8px;
    background-color: rgba(0, 0, 0, 0.03);
    .search-icon {
      display: inline-block;
      height: 24px;
      width: 24px;
      mask-image: url("~images/my/search.svg");
      mask-repeat: no-repeat;
      mask-size: cover;
      background: #81948b;
    }
    .search-input {
      width: 280px;
      height: 100%;
      margin-left: 10px;
      line-height: 20px;
      color: #2c3330;
      outline: none;
      border: 0;
      background: rgba(0, 0, 0, 0);
    }
    .search-input_placeholder {
      font-size: 14px;
      color: #999999;
    }
  }
}
</style>
