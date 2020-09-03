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
        this.$router.push({ path: "/" });
        this.$store.commit("SET_WC_USER", res.userInfo);
        if (res.userInfo && !res.userInfo.phone_number) {
          this.$store.commit("DIALOG_SHOW", true);
          this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", 2);
        } else {
          this.$store.commit("SET_TOKEN", res.token);
          this.$store.commit("DIALOG_SHOW", false);
          this.$store.commit("UPDATA_LOGINDIAL_VISIBLE", 0);
        }
      });
    }
  }
};
</script>
