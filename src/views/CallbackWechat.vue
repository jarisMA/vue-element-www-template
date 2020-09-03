<template>
  <div></div>
</template>
<script type="text/javascript">
import authService from "./../globals/service/auth.js";
export default {
  created() {
    const { code, state } = this.$route.query;
    if (
      this.$store.state.userInfo.avatar_url == null &&
      state === "born2code" &&
      code
    ) {
      authService.wechatAuth(code).then(res => {
        this.$store.commit("SET_WC_USER", res);
        this.$store.commit("DIALOG_SHOW", true);
        this.$router.push({ path: "/" });
      });
    }
  }
};
</script>
