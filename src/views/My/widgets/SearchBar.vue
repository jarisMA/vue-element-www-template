<template>
  <div class="search">
    <input
      type="text"
      class="search-bar"
      :placeholder="holder"
      v-model.trim="keyword"
      @keyup.enter="handleSearch"
    />
    <img src="~/images/search.svg" class="search-icon" />
  </div>
</template>

<script>
export default {
  name: "MySearchBar",
  props: {
    holder: {
      type: String
    }
  },

  data() {
    return {
      keyword: ""
    };
  },

  methods: {
    handleSearch() {
      this.$emit("search", this.keyword);
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  position: relative;

  .search-bar {
    width: 290px;
    height: 32px;
    padding-left: 9px;
    border: 1px solid #efefef;
  }

  .search-icon {
    position: absolute;
    left: 260px;
    top: 4px;
  }
}
</style>
