<template>
  <div class="story-card">
    <the-avatar class="avatar-wrapper" :size="62" :url="story.avatar" />
    <label class="user-wrapper">
      {{ story.nickname }}
    </label>
    <div class="comment-wrapper">
      <p class="comment" v-for="(item, key) of story.comments" :key="key">
        {{ item }}
      </p>
    </div>
  </div>
</template>

<script>
import TheAvatar from "./TheAvatar.vue";
export default {
  name: "StoryCard",
  components: { TheAvatar },
  props: {
    story: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="less" scoped>
.story-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
  width: 300px;
  height: 366px;
  padding: 68px 38px 46px;
  background: url("~images/story_bg.png");
  .user-wrapper {
    display: inline-block;
    margin: 10px 0 30px;
    height: 18px;
    line-height: 18px;
    font-size: 18px;
    font-weight: bold;
    color: #333333;
  }
  .comment-wrapper {
    height: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 7;
    line-clamp: 7;
    -webkit-box-orient: vertical;
    .comment {
      text-align: justify;
      font-size: 14px;
      font-weight: 400;
      color: #aeaeae;
      line-height: 20px;
    }
  }
}
</style>
