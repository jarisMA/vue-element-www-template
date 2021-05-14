export const campMixin = {
  computed: {
    campStatus() {
      return ({ register_start_at, start_at }) => {
        const now = new Date().valueOf();
        const open = new Date(start_at).valueOf();
        const register = new Date(register_start_at).valueOf();
        console.log(register_start_at, start_at);
        if (now < register) {
          return 3; //敬请期待
        }
        if (now >= open) {
          return 2; // 开课了
        }
        if (now >= register) {
          return 1; // 开始报名了
        }
      };
    }
  }
};
