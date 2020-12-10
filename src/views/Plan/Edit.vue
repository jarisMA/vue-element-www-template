<template>
  <div class="edit-plan-container" v-loading="loading">
    <iframe class="iframe" :src="url" width="100%" frameborder="0"></iframe>
  </div>
</template>

<script>
import kujialeService from "@/global/service/kujiale";
export default {
  name: "EditPlan",
  data() {
    return {
      loading: true,
      url: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let promiseArr = [];
      const routeName = this.$route.name;
      if (routeName === "EditPlan") {
        promiseArr.push(
          kujialeService.iframe(1, {
            designid: this.$route.params.designId
          })
        );
      } else {
        promiseArr.push(kujialeService.iframe(4));
      }
      Promise.all(promiseArr)
        .then(([res]) => {
          this.url = res.url;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.edit-plan-container,
.iframe {
  width: 100vw;
  height: 100vh;
}
</style>
