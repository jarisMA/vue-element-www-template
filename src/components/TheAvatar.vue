<template>
  <el-avatar :size="size"
             :src="url || userLogo
            "></el-avatar>
</template>

<script>
import userLogo from "images/user_logo.svg";
export default {
  name: 'TheAvatar',
  props: {
    size: {
      type: Number,
      default: 80
    },
    url: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      userLogo
    }
  }
}
</script>

<style lang='less' scoped>
</style>