<template>
  <detail class="page-wrapper" :id="id" />
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
    this.id = this.$route.params.id;
  }
};
</script>
<style lang="less" scoped>
.page-wrapper {
  background: #fff !important;
}
</style>
