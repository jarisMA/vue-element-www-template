<template>
  <div class="player-container">
    <div class="prism-player ali-player-container" :id="id"></div>
    <div v-if="!status && !loading">{{ vid }} 视频转码中 ～</div>
  </div>
</template>
<script>
import vodService from "service/vod";
import { mapState } from "vuex";
import {
  PhoneNumberComponent,
  FeedbackComponent,
  NoteComponent,
  NextVideoComponent
} from "./VideoPlayerComponent";

const skinLayout = [
  {
    name: "bigPlayButton",
    align: "blabs",
    x: 30,
    y: 80
  },
  {
    name: "H5Loading",
    align: "cc"
  },
  {
    name: "errorDisplay",
    align: "tlabs",
    x: 0,
    y: 0
  },
  {
    name: "infoDisplay"
  },
  {
    name: "tooltip",
    align: "blabs",
    x: 0,
    y: 56
  },
  {
    name: "thumbnail"
  },
  {
    name: "controlBar",
    align: "blabs",
    x: 0,
    y: 0,
    children: [
      {
        name: "progress",
        align: "blabs",
        x: 0,
        y: 44
      },
      {
        name: "playButton",
        align: "tl",
        x: 15,
        y: 12
      },
      {
        name: "timeDisplay",
        align: "tl",
        x: 10,
        y: 7
      },
      {
        name: "fullScreenButton",
        align: "tr",
        x: 10,
        y: 12
      },
      {
        name: "setting",
        align: "tr",
        x: 15,
        y: 12
      },
      {
        name: "volume",
        align: "tr",
        x: 5,
        y: 10
      }
    ]
  }
];
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
    isTrial: {
      type: Boolean,
      default: false
    },
    startTime: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 0
    },
    cover: {
      type: String
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    next: {
      type: Object,
      default: () => null
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
      playing: false,
      showActive: ""
    };
  },
  watch: {
    vid(val, oldVal) {
      if (val !== oldVal) {
        this.stopEmit = true;
        this.handleClearTimer();
        this.checkTransformCodeStatus();
      }
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    this.$nextTick(() => {
      this.checkTransformCodeStatus();
    });
  },
  beforeDestroy() {
    this.handleClearTimer();
    if (this.player) {
      document.querySelector("#videoPlayer video") &&
        document
          .querySelector("#videoPlayer video")
          .removeEventListener("click", this.handleTogglePlay);
      this.player.dispose();
      this.player = null;
      this.playing = false;
      this.seeked = false;
      document.removeEventListener("keydown", this.handleKeydown);
    }
  },
  methods: {
    checkTransformCodeStatus() {
      if (this.player) {
        document.querySelector("#videoPlayer video") &&
          document
            .querySelector("#videoPlayer video")
            .removeEventListener("click", this.handleTogglePlay);
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
      if (!this.isTrial) {
        vodService.ossVideoAuth(this.vid).then(data => {
          const { PlayAuth, VideoMeta } = data;
          const components = [
            PhoneNumberComponent,
            {
              name: "FeedbackComponent",
              type: FeedbackComponent,
              args: [this.handleShowActive.bind(this, "feedback")]
            },
            {
              name: "NoteComponent",
              type: NoteComponent,
              args: [this.handleShowActive.bind(this, "note")]
            }
          ];
          if (this.next) {
            components.push({
              name: "NextVideoComponent",
              type: NextVideoComponent,
              args: [5, this.next, this.handleNext.bind(this)]
            });
          }
          // eslint-disable-next-line
          this.player = new Aliplayer(
            {
              id: this.id,
              width: "100%",
              height: "100%",
              autoplay: this.autoplay,
              vid: this.vid,
              playauth: PlayAuth,
              format: "m3u8",
              cover: this.cover || VideoMeta.CoverURL,
              encryptType: 1, //当播放私有加密流时需要设置。
              definition: "FD,LD,SD,HD",
              defaultDefinition: "HD",
              components,
              playsinline: true,
              preload: true,
              controlBarVisibility: "hover",
              useH5Prism: true,
              skinLayout
            },
            player => {
              document.addEventListener("keydown", this.handleKeydown);
              // player.on("canplaythrough", this.handleCanplaythrough);
              player.on("canplay", this.handleCanplay);
              // player.on("ready", this.handleReady);
              player.on("play", this.handlePlay);
              // player.on("playing", this.handlePlaying);
              player.on("pause", this.handlePause);
              player.on("timeupdate", this.handleTimeUpdate);
              player.on("ended", this.handleEnded);
              player.on("startSeek", this.handleStartSeek);
              player.on("completeSeek", this.handleCompleteSeek);
              player.on("error", this.handleError);
            }
          );
        });
      } else {
        vodService.ossVideoPreview(this.vid).then(url => {
          // eslint-disable-next-line
          this.player = new Aliplayer(
            {
              id: this.id,
              width: "100%",
              height: "100%",
              autoplay: this.autoplay,
              source: url,
              format: "m3u8",
              cover: this.cover,
              encryptType: 1, //当播放私有加密流时需要设置。
              components: [PhoneNumberComponent],
              playsinline: true,
              preload: true,
              controlBarVisibility: "hover",
              useH5Prism: true,
              skinLayout
            },
            player => {
              document.addEventListener("keydown", this.handleKeydown);
              player.on("canplay", this.handleCanplay);
              player.on("play", this.handlePlay);
              player.on("pause", this.handlePause);
              player.on("timeupdate", this.handleTimeUpdate);
              player.on("ended", this.handleEnded);
              player.on("startSeek", this.handleStartSeek);
              player.on("completeSeek", this.handleCompleteSeek);
              player.on("error", this.handleError);
            }
          );
        });
      }
      setTimeout(() => {
        if (this.showActive) {
          document.getElementById(this.showActive).classList.add("active");
        }
      }, 1000);
    },
    handleShowActive(val) {
      this.$emit("handleContent", val);
      let feedback = document.getElementById("feedback");
      let note = document.getElementById("note");
      if (this.showActive !== val && val == "feedback") {
        feedback.classList.add("active");
        note.classList.remove("active");
        this.showActive = val;
      } else if (this.showActive == val && val == "feedback") {
        feedback.classList.remove("active");
        this.showActive = "";
      } else if (this.showActive !== val && val == "note") {
        note.classList.add("active");
        feedback.classList.remove("active");
        this.showActive = val;
      } else if (this.showActive == val && val == "note") {
        note.classList.remove("active");
        this.showActive = "";
      }
    },

    clean() {
      document.getElementById("feedback").classList.remove("active");
      document.getElementById("note").classList.remove("active");
      this.showActive = "";
    },

    handleSetRecord() {
      const nowTime = new Date().valueOf();
      const second_duration = parseInt((nowTime - this.timestamp) / 1000);
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
      if (!this.seeked) {
        this.$nextTick(() => {
          document
            .querySelector("#videoPlayer video")
            .addEventListener("click", this.handleTogglePlay);
          this.seeked = true;
          // this.handleTogglePlay();
          const startTime =
            this.startTime > this.duration * 0.9 ? 0 : this.startTime;
          this.player.seek(startTime);
          this.player.play();
        });
      }
    },
    // handleCanplaythrough () {
    //   // console.log("canplaythrough");
    // },
    // handleReady() {
    //   // console.log("ready");
    // },
    handlePlay() {
      // console.log("play");
      this.handleClearTimer();
      this.timestamp = new Date().valueOf();
      this.timer = setInterval(() => {
        this.handleSetRecord();
      }, 3000);
    },
    // handlePlaying() {
    //   console.log("playing");
    // },
    handlePause() {
      // console.log("pause");
      this.handleClearTimer(this.timer);
      this.handleSetRecord();
    },
    handleTimeUpdate() {
      // console.log("timeUpdate");
      const currentTime = this.player.getCurrentTime();
      if (!this.stopEmit) {
        this.$emit("timeUpdate", currentTime);
      }
    },
    handleStartSeek() {
      this.handleClearTimer(this.timer);
    },
    handleCompleteSeek() {
      // console.log("completeSeek");
      this.handlePlay();
    },
    handleEnded() {
      this.handleClearTimer(this.timer);
      this.handleSetRecord();
      this.$emit("ended");
      let nextVideoComponent = this.player.getComponent("NextVideoComponent");
      if (nextVideoComponent) {
        nextVideoComponent.show();
      }
    },
    handleKeydown(e) {
      // 空格
      if (e.keyCode === 32) {
        this.handleTogglePlay();
      }
    },
    handleTogglePlay() {
      const status = this.player && this.player.getStatus();
      if (["playing"].indexOf(status) > -1 || this.playing) {
        this.playing = false;
        this.player.pause();
      } else if (
        ["ready", "pause", "ended"].indexOf(status) > -1 ||
        !this.playing
      ) {
        this.playing = true;
        this.player.play();
      }
      // document.querySelector(".player-container .prism-play-btn").click();
    },
    handleError() {
      this.handleClearTimer();
    },
    handleNext() {
      this.$emit("next");
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

@randomTop: `Math.floor(Math.random() * (70 - 30 + 1)) + 30 + "%" `;
@keyframes phoneMove {
  0% {
    right: -200%;
    transform: translate3d(100%, 0, 0);
  }
  66% {
    transform: translate3d(0, 0, 0);
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
    .feedback-btn {
      margin: 10px 10px 0 16px;
      width: 24px;
      height: 24px;
      background-color: #fff;
      mask: url(~images/academy/video-feedback.svg) no-repeat;
      float: right;
      cursor: pointer;
      &:hover,
      &.active {
        background-color: @primaryColor;
      }
    }
    .note-btn {
      margin: 10px 10px 0 16px;
      width: 24px;
      height: 24px;
      background-color: #fff;
      mask: url(~images/academy/video-note.svg) no-repeat;
      float: right;
      cursor: pointer;
      &:hover,
      &.active {
        background-color: @primaryColor;
      }
    }
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
      animation: phoneMove 30s linear infinite;
      transform: translate3d(0, 0, 0);
    }
    .next-video-container {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1001;
      background: #000;
      .next-video-dialog {
        width: 420px;
        .next-video-dialog_header {
          margin-bottom: 8px;
          line-height: 24px;
          font-size: 14px;
          color: #fff;
        }
        .next-video-dialog_content {
          display: flex;
          align-items: center;
          padding: 16px;
          background: #eeeeee;
          .video-icon {
            display: inline-block;
            width: 32px;
            height: 32px;
            margin-right: 16px;
            background: #000;
            mask: url("~images/course/played.svg") no-repeat;
            mask-size: 100% 100%;
          }
          .next-video-name {
            line-height: 28px;
            font-weight: 600;
            font-size: 18px;
            color: #2c3330;
          }
        }
        .next-video-dialog_footer {
          margin-top: 30px;
          display: flex;
          justify-content: space-between;
          .next-video-btn {
            width: 205px;
            height: 48px;
            line-height: 48px;
            font-size: 16px;
            text-align: center;
            color: #fff;
            cursor: pointer;
            &.next-video-btn_cancel {
              background: #222222;
            }
            &.next-video-btn_submit {
              background: #585858;
            }
          }
        }
      }
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
    // .prism-big-play-btn {
    //   height: 96px;
    //   width: 96px;
    //   left: 50% !important;
    //   top: 50%;
    //   margin-left: -48px;
    //   margin-top: -48px;
    //   font-size: 10px;
    //   border: 0;
    //   opacity: 0.5;
    //   z-index: 99999;
    //   display: none !important;
    //   &:hover {
    //     opacity: 1;
    //   }
    //   .outter {
    //     display: none;
    //   }
    //   .vjs-button-icon .draw-fill {
    //     fill: #00b38a;
    //   }
    // }
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
      margin-left: 16px;
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
.vip-join {
  color: #00c1de;
}

.vip_limit_content {
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.vip_limit_content .title {
  font-size: 18px;
  line-height: 36px;
  color: #fff;
  text-align: center;
  width: 100%;
}

.vip_limit_button_box {
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
}

.vip_limit_btn {
  display: inline-block;
  min-width: 100px;
  position: relative;
  background: #f60;
  padding: 0 35px;
  margin: 0px 5px 20px 5px;
  border-radius: 38px;
  font-size: 18px;
  line-height: 38px;
  color: #623a0c;
  text-align: center;
  background-image: linear-gradient(
    -135deg,
    #fbe8a8 0%,
    #f8e7ac 15%,
    #e2c078 100%
  );
  cursor: pointer;
}

.vip_limit_close {
  text-align: center;
}
.vip_limit_close span {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 36px;
  background: rgba(165, 165, 165, 0.54);
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
}
</style>
