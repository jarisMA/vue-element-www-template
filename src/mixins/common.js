import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapMutations(["UPDATA_LOGINDIAL_VISIBLE"]),
    checkIsLogin() {
      if (this.userInfo && this.userInfo.id) {
        return true;
      }
      this.UPDATA_LOGINDIAL_VISIBLE(1);
      return false;
    }
  }
};
