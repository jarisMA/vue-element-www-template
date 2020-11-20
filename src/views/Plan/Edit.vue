<template>
  <div class="edit-plan-container" v-loading="loading">
    <iframe class="iframe" :src="url" width="100%" frameborder="0"></iframe>
  </div>
</template>

<script>
import kujialeService from "@/globals/service/kujiale";
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
      kujialeService
        .iframe(1, {
          designid: this.$route.params.designId
        })
        .then(res => {
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
.iframe {
  height: calc(100vh - 120px);
}
</style>
