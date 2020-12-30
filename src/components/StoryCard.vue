<template>
  <div class="story-card">
    <the-avatar class="avatar-wrapper" :size="40" :url="story.avatar" />
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
  width: 194px;
  height: 278px;
  padding: 36px 20px 0;
  background: url("~images/story_bg.png");
  .user-wrapper {
    display: inline-block;
    margin: 10px 0 10px;
    height: 24px;
    line-height: 16px;
    font-size: 16px;
    font-weight: bold;
    color: #333333;
  }
  .comment-wrapper {
    height: 128px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 8;
    line-clamp: 8;
    -webkit-box-orient: vertical;
    .comment {
      line-height: 16px;
      text-align: justify;
      font-size: 12px;
      font-weight: 400;
      color: #aeaeae;
    }
  }
}
</style>
