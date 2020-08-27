<template>
  <div class="home-page" v-loading="loading">
    <div class="banner-section"></div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      loading: false
    };
  },
  created() {}
};
</script>

<style type="text/css" lang="less" scoped>
.home-page {
  height: 900px;
  background: #fcfcfc;
}
</style>
