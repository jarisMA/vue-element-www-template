<template>
  <div class="page-basic-layout">
    <BasicLayoutHeader />
    <router-view class="page-basic-body" />
    <BasicLayoutFooter />
    <BasicLoginDialog />
    <temporaryIndex />
  </div>
</template>
<script type="text/javascript">
import BasicLayoutHeader from "./BasicLayoutHeader.vue";
import BasicLayoutFooter from "./BasicLayoutFooter.vue";
import BasicLoginDialog from "./../BasicLoginDialog/Index.vue";
import temporaryIndex from "./../BasicLoginDialog/temporaryIndex";

export default {
  components: {
    BasicLayoutHeader,
    BasicLayoutFooter,
    BasicLoginDialog,
    temporaryIndex
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
  // background-color: transparent;
}
</style>
