<template>
  <div class="player-container">
    <div class="prism-player" :id="id"></div>
    <div v-if="!status && !loading">{{ vid }} 视频转码中 ～</div>
  </div>
</template>

<script>
import vodService from "service/vod";

export default {
  name: "VideoPlayer",
  props: {
    id: {
      type: String,
      default: "videoPlayer"
    },
    vid: {
      type: String,
      required: true
    },
    startTime: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      loading: true,
      player: null,
      status: 0,
      timestamp: new Date().valueOf(),
      timer: null
    };
  },
  watch: {
    vid(val, oldVal) {
      if (val !== oldVal) {
        this.checkTransformCodeStatus();
        this.handleClearTimer();
      }
    }
  },
  mounted() {
    this.checkTransformCodeStatus();
  },
  methods: {
    checkTransformCodeStatus() {
      vodService
        .ossVideoStatus(this.vid)
        .then(data => {
          if (
            data.status === 1 ||
            data.template_group_id === "VOD_NO_TRANSCODE"
          ) {
            this.initPlayer();
            this.status = data.status;
          } else {
            this.$notice({
              type: "warning",
              title: "视频转码中，请稍后播放～"
            });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    initPlayer() {
      if (this.player) {
        this.player.dispose();
      }
      vodService.ossVideoAuth(this.vid).then(data => {
        const { PlayAuth, VideoMeta } = data;
        // eslint-disable-next-line
        this.player = new Aliplayer({
            id: this.id,
            width: "100%",
            autoplay: true,
            vid: this.vid,
            playauth: PlayAuth,
            cover: VideoMeta.CoverURL,
            encryptType: 1 //当播放私有加密流时需要设置。
          },
          player => {
            player.seek(this.startTime);
            player.on("play", this.handlePlay);
            player.on("pause", this.handlePause);
            player.on("timeupdate", this.handleTimeUpdate);
            player.on("ended", this.handleEnded);
            player.on("completeSeek", this.handleCompleteSeek);
          }
        );
      });
    },
    handleSetRecord() {
      const nowTime = new Date().valueOf();
      const second_duration = (nowTime - this.timestamp) / 1000;
      const last_play_position = this.player.getCurrentTime();
      this.$emit("setRecord", {
        last_play_position,
        second_duration
      });
      this.timestamp = nowTime;
    },
    handleClearTimer() {
      this.timer && clearInterval(this.timer);
      this.timer = null;
    },
    handlePlay() {
      // console.log('play')
      this.timestamp = new Date().valueOf();
      this.timer = setInterval(() => {
        this.handleSetRecord();
      }, 2000);
    },
    handlePause() {
      // console.log('pause')
      this.handleSetRecord();
      this.handleClearTimer(this.timer);
    },
    handleTimeUpdate() {
      // console.log('timeUpdate');
      const currentTime = this.player.getCurrentTime();
      this.$emit("timeUpdate", currentTime);
    },
    handleCompleteSeek() {
      // console.log('completeSeek')
      this.handleSetRecord();
    },
    handleEnded() {
      // console.log('ended');
      this.handleSetRecord();
      this.handleClearTimer(this.timer);
      this.$emit("ended");
    }
  }
};
</script>

<style lang="less" scoped>
.player-container {
  width: 100%;
  height: 100%;
  /deep/ .prism-player {
    width: 100%;
    height: 100% !important;
  }
}
</style>
