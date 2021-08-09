<template>
  <div :class="timeoutClass">
    <template v-if="showUnitText">
      <span class="card-head-text">{{ days || "00" }}</span>
      <span class="card-head-small-unit"> 天</span> :
      <span class="card-head-text">{{ hours || "00" }}</span>
      <span class="card-head-small-unit"> 时</span> :
      <span class="card-head-text">{{ minutes || "00" }}</span>
      <span class="card-head-small-unit"> 分</span>
      <span class="card-head-small-unit card-head-small-unit--top"
        ><span>{{ seconds || "00" }}</span>
        <span class="card-head-small-unit">秒</span></span
      >
    </template>
    <template v-else>
      {{ countdown }}
    </template>
  </div>
</template>

<script>
export default {
  props: {
    createdTime: String,
    format: {
      type: String,
      default: "dd:hh"
    },
    showUnitText: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      days: null,
      hours: null,
      minutes: null,
      seconds: null,
      countdown: "",
      timeout: false,
      timeoutClass: "",
      interval: null
    };
  },
  created() {
    const time = this.time(this.createdTime);
    this.countdown = this.value(time);
    this.handleCountdown();
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    time(created_time) {
      const curtime = new Date().getTime();
      const pastTime = new Date(created_time).getTime();
      const isDecrease = pastTime - curtime > 0 ? true : false;
      const aDay = 24 * 60 * 60 * 1000;
      const isOneDayleft = isDecrease && (pastTime - curtime) / aDay < 1;
      const decreaseTime = (pastTime - curtime) / 1000;
      return {
        isDecrease,
        isOneDayleft,
        decreaseTime
      };
    },
    value(time) {
      if (time.isDecrease) {
        return this.valueFormat(time.decreaseTime);
      } else if (time.isOneDayleft) {
        this.$emit("update");
      } else {
        this.timeout = true;
        this.timeoutClass = "danger-color";
        this.$emit("update");
        return "00:00";
      }
    },
    valueFormat(time) {
      let days = this.timeFormat(parseInt(time / (60 * 60 * 24)));
      let hours = this.timeFormat(parseInt((time % (60 * 60 * 24)) / 3600));
      let minutes = this.timeFormat(
        parseInt(((time % (60 * 60 * 24)) % 3600) / 60)
      );
      let seconds = this.timeFormat(
        parseInt(((time % (60 * 60 * 24)) % 3600) % 60)
      );
      let result = hours + ":" + minutes + ":" + seconds;
      this.days = days;
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
      switch (this.format) {
        case "dd":
          result = days;
          break;
        case "dd:hh:mm":
          result = days + ":" + hours + ":" + minutes;
          break;
        case "dd:hh:mm:ss":
          result = days + ":" + hours + ":" + minutes + ":" + seconds;
          break;
        case "hh:mm":
          result = hours + ":" + minutes;
          break;
        case "hh:mm:ss":
          result = hours + ":" + minutes + ":" + seconds;
          break;
        default:
          break;
      }
      return result;
    },
    timeFormat(time) {
      return time < 10 ? "0" + time : time;
    },
    handleCountdown() {
      this.interval = setInterval(() => {
        const time = this.time(this.createdTime);
        this.countdown = this.value(time);
        if (!time.isDecrease) {
          clearInterval(this.interval);
        }
      }, 1000);
    }
  }
};
</script>
