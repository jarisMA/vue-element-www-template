<template>
  <div class="clap-card">
    <div class="card-left">
      <div class="clap-icon-wrapper">
        <i class="clap-icon"></i>
      </div>
      <span class="card-left-nickname">{{ clap.user.nickname }}</span>
    </div>
    <div class="card-right">
      <the-avatar :size="24" :url="clap.user.avatar_url" />
    </div>
  </div>
</template>

<script>
import TheAvatar from "components/TheAvatar";
export default {
  name: "QuestionClapCard",
  components: { TheAvatar },
  props: {
    clap: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="less" scoped>
.clap-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
}

.card-left {
  display: flex;
  align-items: center;
}
.clap-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #e7f7ef;
  .clap-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url("~images/question/claped.svg") no-repeat center;
  }
}

.card-left-nickname {
  margin-left: 16px;
  line-height: 1;
  font-size: 14px;
  color: #606c66;
}
</style>
