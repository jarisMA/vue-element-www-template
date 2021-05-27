<template>
  <div class="detail-page">
    <detail :id="id" />
  </div>
</template>

<script>
import Detail from "./widgets/Detail";

export default {
  name: "QuestionDetail",
  components: {
    Detail
  },
  data() {
    return {
      id: null
    };
  },
  created() {
    this.id = parseInt(this.$route.params.id);
  }
};
</script>
<style lang="less" scoped>
.detail-page {
  background: #f4f6f8 !important;
}
</style>
