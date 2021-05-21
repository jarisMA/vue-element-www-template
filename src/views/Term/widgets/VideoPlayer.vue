<template>
  <div class="player-container">
    <div class="prism-player ali-player-container" :id="id"></div>
    <div v-if="!status && !loading">{{ vid }} 视频转码中 ～</div>
  </div>
</template>

<script>
import vodService from "service/vod";
import { mapState } from "vuex";
import Store from "@/store/index";

class PhoneNumberComponent {
  constructor() {}

  createEl(el) {
    const userInfo = Store.state.userInfo;
    const div = document.createElement("div");
    div.innerHTML = userInfo.phone + userInfo.nickname;
    div.className = "phone-container";
    div.id = "phone-container";
    setInterval(() => {
      div.style.top = Math.floor(Math.random() * (70 - 30 + 1)) + 30 + "%";
    }, 10 * 1000);
    el.appendChild(div);
  }
}
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
        document
          .querySelector("#videoPlayer video")
          .addEventListener("click", this.handleTogglePlay);
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
            encryptType: 1, //当播放私有加密流时需要设置。
            definition: "FD,LD,SD,HD",
            defaultDefinition: "HD",
            components: [PhoneNumberComponent]
          },
          player => {
            window.player = player;
            document.addEventListener("keydown", this.handleKeydown);
            document
              .querySelector("#videoPlayer video")
              .addEventListener("click", this.handleTogglePlay);
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
      // console.log("timeUpdate");
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
      // const status = this.player && this.player.getStatus();
      // // console.log(status);
      // if (status === "playing" || this.playing) {
      //   this.playing = false;
      //   this.player.pause();
      // } else if (status === "pause" || !this.playing) {
      //   this.playing = true;
      //   this.player.play();
      // }
      document.querySelector(".player-container .prism-play-btn").click();
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

@randomTop: `Math.floor(Math.random() * (70 - 30 + 1)) + 30 + "%" `;
@keyframes phoneMove {
  0% {
    right: 0;
  }
  100% {
    right: 100%;
  }
}
.player-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  word-break: keep-all;
  background: #272c30;
  /deep/ .prism-player {
    position: relative;
    background-color: #000;
    width: 100%;
    height: 100% !important;
    .phone-container {
      position: absolute;
      top: calc(~"@{randomTop}");
      right: -100%;
      line-height: 1;
      padding: 4px;
      font-weight: 600;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.8);
      background: rgba(0, 0, 0, 0.4);
      z-index: 1;
      animation: phoneMove 10s linear infinite;
    }
    video {
      background: #000;
    }
    .loading-center {
      .circle {
        border-color: rgba(20, 175, 100, 0.2) rgba(20, 175, 100, 0.5)
          rgba(20, 175, 100, 0.7) rgba(20, 175, 100, 0.1);
      }
    }
    .prism-progress-cursor {
      background: #fff !important;
      img {
        display: none;
      }
    }
    .prism-info-display {
      display: none !important;
    }
    .prism-big-play-btn {
      height: 96px;
      width: 96px;
      left: 50% !important;
      top: 50%;
      margin-left: -48px;
      margin-top: -48px;
      font-size: 10px;
      border: 0;
      opacity: 0.5;
      z-index: 99999;
      display: none !important;
      &:hover {
        opacity: 1;
      }
      .outter {
        display: none;
      }
      .vjs-button-icon .draw-fill {
        fill: #00b38a;
      }
    }
    .prism-controlbar {
      height: 40px;
      // display: block !important;
      .quality-components {
        float: right;
        color: #fff;
        position: relative;
        box-sizing: border-box;
        margin-top: 10px;
        height: 24px;
        .current-quality {
          display: flex;
          width: 70px;
          height: 100%;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
      }
      .prism-controlbar-bg {
        height: 36px;
        background: rgba(75, 75, 75, 0.3);
      }
      .prism-play-btn {
        width: 20px;
        height: 20px;
      }
      .prism-time-display {
        position: absolute;
        left: 70px;
        height: 36px;
        line-height: 36px;
      }
    }

    .prism-progress-played {
      background-color: @primaryColor;
    }
    .prism-cc-btn {
      display: none !important;
    }
    .prism-volume-control {
      .volume-value {
        background: @primaryColor;
      }
    }
    .prism-volume {
      float: left !important;
      margin-top: 8px !important;
      margin-left: 10px;
      transform: scale(0.7);
      // margin-top: 12px !important;
      // margin-right: 10px !important;
      // .volume-icon {
      //   width: 24px;
      //   height: 24px;
      //   background-image: url("~images/course/volume_on.svg");
      //   .short-horizontal {
      //     display: none;
      //   }
      //   .long-horizontal {
      //     display: none;
      //   }
      // }
    }
    .prism-setting-btn {
      // display: none;
      margin-top: 10px !important;
      margin-right: 10px !important;
      background-image: url("~images/course/settings.svg");
    }
    .prism-setting-item {
      &.prism-setting-cc,
      &.prism-setting-audio {
        display: none;
      }
    }
    .prism-fullscreen-btn {
      margin-top: 10px !important;
      margin-left: 16px;
      background-image: url("~images/course/fullscreen.svg");
    }
  }
}
</style>
