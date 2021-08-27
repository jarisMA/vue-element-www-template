<template>
  <div class="page-basic-layout">
    <basic-layout-header class="page-basic-header" />
    <router-view :class="['page-basic-body']" />
    <basic-layout-footer />
    <basic-login-dialog />
  </div>
</template>
<script type="text/javascript">
import BasicLayoutHeader from "./BasicLayoutHeader";
import BasicLayoutFooter from "./BasicLayoutFooter";
import BasicLoginDialog from "../BasicLoginDialog/Index";

export default {
  name: "BasicLayout",
  components: {
    BasicLayoutHeader,
    BasicLayoutFooter,
    BasicLoginDialog
  },
  computed: {}
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
