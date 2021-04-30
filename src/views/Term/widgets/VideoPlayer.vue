<template>
  <div class="player-container">
    <div class="prism-player" :id="id" @click="handleTogglePlay">
      <div class="phone-container">{{ userInfo.phone.substr(-4, 4) }}</div>
    </div>
    <div v-if="!status && !loading">{{ vid }} 视频转码中 ～</div>
  </div>
</template>

<script>
import vodService from "service/vod";
import { mapState } from "vuex";

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
    },
    duration: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      stopEmit: false,
      loading: true,
      seeked: false,
      player: null,
      status: 0,
      timestamp: new Date().valueOf(),
      timer: null,
      playing: false
    };
  },
  watch: {
    vid(val, oldVal) {
      if (val !== oldVal) {
        this.stopEmit = true;
        this.checkTransformCodeStatus();
        this.handleClearTimer();
      }
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    this.checkTransformCodeStatus();
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.handleKeydown);
  },
  methods: {
    checkTransformCodeStatus() {
      if (this.player) {
        this.player.dispose();
        this.player = null;
        this.playing = false;
        this.seeked = false;
        document.removeEventListener("keydown", this.handleKeydown);
      }
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
      this.stopEmit = false;
      vodService.ossVideoAuth(this.vid).then(data => {
        const { PlayAuth, VideoMeta } = data;
        // eslint-disable-next-line
        this.player = new Aliplayer({
            id: this.id,
            width: "100%",
            height: "100%",
            autoplay: true,
            vid: this.vid,
            playauth: PlayAuth,
            cover: VideoMeta.CoverURL,
            encryptType: 1 //当播放私有加密流时需要设置。
          },
          player => {
            window.player = player;
            document.addEventListener("keydown", this.handleKeydown);
            player.on("canplaythrough", this.handleCanplaythrough);
            // player.on("canplay", this.handleCanplay);
            // player.on("ready", this.handleReady);
            player.on("play", this.handlePlay);
            // player.on("playing", this.handlePlaying);
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
      if (!this.stopEmit) {
        this.$emit("setRecord", {
          last_play_position,
          second_duration
        });
        this.timestamp = nowTime;
      }
    },
    handleClearTimer() {
      this.timer && clearInterval(this.timer);
      this.timer = null;
    },
    handleCanplay() {
      console.log("canplay");
    },
    handleCanplaythrough() {
      // console.log("canplaythrough");
      if (!this.seeked) {
        this.seeked = true;
        const startTime =
          this.startTime > this.duration * 0.9 ? 0 : this.startTime;
        this.player.seek(startTime);
      }
    },
    handleReady() {
      console.log("ready");
    },
    handlePlay() {
      // console.log("play");
      this.timestamp = new Date().valueOf();
      this.timer = setInterval(() => {
        this.handleSetRecord();
      }, 2000);
    },
    handlePlaying() {
      console.log("playing");
    },
    handlePause() {
      // console.log("pause");
      this.handleSetRecord();
      this.handleClearTimer(this.timer);
    },
    handleTimeUpdate() {
      console.log("timeUpdate");
      const currentTime = this.player.getCurrentTime();
      if (!this.stopEmit) {
        this.$emit("timeUpdate", currentTime);
      }
    },
    handleCompleteSeek() {
      // console.log("completeSeek");
      this.handleSetRecord();
    },
    handleEnded() {
      console.log("ended");
      this.handleSetRecord();
      this.handleClearTimer(this.timer);
      // this.$emit("ended");
    },
    handleKeydown(e) {
      console.log(e);
      // 空格
      if (e.keyCode === 32) {
        this.handleTogglePlay();
      }
    },
    handleTogglePlay() {
      const status = this.player && this.player.getStatus();
      // console.log(status);
      if (status === "playing" || this.playing) {
        this.playing = false;
        this.player.pause();
      } else if (status === "pause" || !this.playing) {
        this.playing = true;
        this.player.play();
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
@keyframes phoneMove {
  from {
    right: 0;
  }
  to {
    right: 100%;
  }
}
.player-container {
  width: 100%;
  height: 100%;
  /deep/ .prism-player {
    position: relative;
    width: 100%;
    height: 100% !important;
    overflow: hidden;
    .phone-container {
      position: absolute;
      top: 50%;
      right: -100%;
      padding: 5px 10px;
      color: #fff;
      font-weight: 600;
      font-size: 20px;
      z-index: 1;
      animation: phoneMove 10s linear 10s infinite;
      background: rgba(0, 0, 0, 0.3);
    }

    .prism-controlbar {
      // display: block !important;
    }
    .prism-progress-played {
      background-color: @primaryColor;
    }
    .prism-cc-btn {
      display: none !important;
    }
    .prism-volume {
      margin-top: 12px !important;
      margin-right: 10px !important;
      .volume-icon {
        width: 24px;
        height: 24px;
        background-image: url("~images/course/volume_on.svg");
        .short-horizontal {
          display: none;
        }
        .long-horizontal {
          display: none;
        }
      }
    }
    .prism-setting-btn {
      margin-right: 10px !important;
      background-image: url("~images/course/settings.svg");
    }
    .prism-fullscreen-btn {
      margin-right: 30px !important;
      background-image: url("~images/course/fullscreen.svg");
    }
  }
}
</style>
