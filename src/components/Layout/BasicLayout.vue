<template>
  <div class="page-basic-layout">
    <BasicLayoutHeader class="page-basic-header" :theme="headerTheme" />
    <router-view :class="['page-basic-body', headerTheme]" />
    <BasicLayoutFooter :theme="headerTheme" />
    <BasicLoginDialog />
    <temporaryIndex />
    <broadcast-dialog />
  </div>
</template>
<script type="text/javascript">
import BasicLayoutHeader from "./BasicLayoutHeader.vue";
import BasicLayoutFooter from "./BasicLayoutFooter.vue";
import BasicLoginDialog from "./../BasicLoginDialog/Index.vue";
import temporaryIndex from "./../BasicLoginDialog/temporaryIndex";
import BroadcastDialog from "./../BroadCast/BroadcastDialog";
import { mapState } from "vuex";

export default {
  name: "BasicLayout",
  components: {
    BasicLayoutHeader,
    BasicLayoutFooter,
    BasicLoginDialog,
    temporaryIndex,
    BroadcastDialog
  },
  computed: {
    ...mapState(["headerTheme"])
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
.page-basic-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.page-basic-body {
  margin-top: 60px;
  flex: 1;
  background: #fafafa;
}
</style>
