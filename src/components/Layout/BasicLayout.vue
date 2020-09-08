<template>
  <div class="page-basic-layout">
    <BasicLayoutHeader />
    <router-view class="page-basic-body" />
    <BasicLayoutFooter />
    <BasicLoginDialog />
  </div>
</template>
<script type="text/javascript">
import BasicLayoutHeader from "./BasicLayoutHeader.vue";
import BasicLayoutFooter from "./BasicLayoutFooter.vue";
import BasicLoginDialog from "./../BasicLoginDialog/Index.vue";

export default {
  components: {
    BasicLayoutHeader,
    BasicLayoutFooter,
    BasicLoginDialog
  }
};
</script>

<style type="text/css" lang="less" scoped>
.page-basic-layout {
  min-height: 100vh;
  min-width: 1200px;
  display: flex;
  flex-direction: column;
}
.page-basic-body {
  flex: 1;
  background-color: transparent !important;
}
</style>
