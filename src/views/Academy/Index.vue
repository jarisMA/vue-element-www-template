<template>
  <div class="academy-page">
    <div class="academy-banner" ref="banner">
      <day-logo-svg
        ref="dayLogoSvg"
        @mousedown="e => mousedown(e, 'dayLogoSvg')"
        class="day-logo-svg"
        :style="{ zIndex: 2 }"
      />
      <docee-svg
        ref="doceeSvg"
        @mousedown="e => mousedown(e, 'doceeSvg')"
        class="docee-svg"
        :style="{ zIndex: 3 }"
      />
      <dog-svg
        ref="dogSvg"
        @mousedown="e => mousedown(e, 'dogSvg')"
        class="dog-svg"
        :style="{ zIndex: 1 }"
      />
      <dxjxs-svg
        ref="dxjxsSvg"
        @mousedown="e => mousedown(e, 'dxjxsSvg')"
        class="dxjxs-svg"
        :style="{ zIndex: 1 }"
      />
      <dz-svg
        ref="dzSvg"
        @mousedown="e => mousedown(e, 'dzSvg')"
        class="dz-svg"
        :style="{ zIndex: 1 }"
      />
      <gz-svg
        ref="gzSvg"
        @mousedown="e => mousedown(e, 'gzSvg')"
        class="gz-svg"
        :style="{ zIndex: 1 }"
      />
      <hb-svg
        ref="hbSvg"
        @mousedown="e => mousedown(e, 'hbSvg')"
        class="hb-svg"
        :style="{ zIndex: 1 }"
      />
      <jz-svg
        ref="jzSvg"
        @mousedown="e => mousedown(e, 'jzSvg')"
        class="jz-svg"
        :style="{ zIndex: 1 }"
      />
      <ldd-svg
        ref="lddSvg"
        @mousedown="e => mousedown(e, 'lddSvg')"
        class="ldd-svg"
        :style="{ zIndex: 2 }"
      />
      <lsy-svg
        ref="lsySvg"
        @mousedown="e => mousedown(e, 'lsySvg')"
        class="lsy-svg"
        :style="{ zIndex: 2 }"
      />
      <sf-svg
        ref="sfSvg"
        @mousedown="e => mousedown(e, 'sfSvg')"
        class="sf-svg"
        :style="{ zIndex: 2 }"
      />
      <sz-svg
        ref="szSvg"
        @mousedown="e => mousedown(e, 'szSvg')"
        class="sz-svg"
        :style="{ zIndex: 1 }"
      />
      <xg-svg
        ref="xgSvg"
        @mousedown="e => mousedown(e, 'xgSvg')"
        class="xg-svg"
        :style="{ zIndex: 1 }"
      />
      <yz-svg
        ref="yzSvg"
        @mousedown="e => mousedown(e, 'yzSvg')"
        class="yz-svg"
        :style="{ zIndex: 1 }"
      />
      <zwj-svg
        ref="zwjSvg"
        @mousedown="e => mousedown(e, 'zwjSvg')"
        class="zwj-svg"
        :style="{ zIndex: 1 }"
      />
      <zz-svg
        ref="zzSvg"
        @mousedown="e => mousedown(e, 'zzSvg')"
        class="zz-svg"
        :style="{ zIndex: 4 }"
      />
    </div>

    <div class="academy-content">
      <div class="academy-content-card">
        <div class="card-img"></div>

        <div class="card-content">
          <span class="card-content-label">// CAMP:</span>
          <span class="card-content-title">妙笔生花 软装训练</span>
          <div class="card-content-desc-surround">
            <div class="card-content-desc">
              <div>
                <span class="desc-fontstyle desc-trainingcamp"
                  >超软装设计·训练营</span
                >
                <span class="desc-fontstyle desc-stage">一期班</span>
              </div>
              <span class="desc-fontstyle desc-status">热招中</span>
            </div>
          </div>
        </div>

        <div class="card-footer">
          <span class="card-footer-dollar">￥4999</span>
          <button class="card-footer-btn">立即报名 →</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DayLogoSvg from "./widgets/svg/DayLogoSvg";
import DoceeSvg from "./widgets/svg/DoceeSvg.vue";
import DogSvg from "./widgets/svg/DogSvg.vue";
import DxjxsSvg from "./widgets/svg/DxjxsSvg.vue";
import DzSvg from "./widgets/svg/DzSvg.vue";
import GzSvg from "./widgets/svg/GzSvg.vue";
import HbSvg from "./widgets/svg/HbSvg.vue";
import JzSvg from "./widgets/svg/JzSvg.vue";
import LddSvg from "./widgets/svg/LddSvg.vue";
import LsySvg from "./widgets/svg/LsySvg.vue";
import SfSvg from "./widgets/svg/SfSvg.vue";
import SzSvg from "./widgets/svg/SzSvg.vue";
import XgSvg from "./widgets/svg/XgSvg.vue";
import YzSvg from "./widgets/svg/YzSvg.vue";
import ZwjSvg from "./widgets/svg/ZwjSvg.vue";
import ZzSvg from "./widgets/svg/ZzSvg.vue";
export default {
  name: "Academy",
  components: {
    DayLogoSvg,
    DoceeSvg,
    DogSvg,
    DxjxsSvg,
    DzSvg,
    GzSvg,
    HbSvg,
    JzSvg,
    LddSvg,
    LsySvg,
    SfSvg,
    SzSvg,
    XgSvg,
    YzSvg,
    ZwjSvg,
    ZzSvg
  },
  data() {
    return {
      moveDom: null,
      left: 0,
      top: 0,
      startX: 0,
      startY: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      const timer = setTimeout(() => {
        const banner = this.$refs["banner"];
        banner.className = "academy-banner animation";
        clearTimeout(timer);
      }, 100);
    });
    window.addEventListener("mouseup", this.mouseup);
    window.addEventListener("mousemove", this.mousemove);
  },
  beforeDestroy() {
    window.removeEventListener("mouseup", this.mouseup);
    window.removeEventListener("mousemove", this.mousemove);
  },
  methods: {
    mouseup() {
      this.moveDom = null;
    },
    mousemove(e) {
      if (this.moveDom) {
        const banner = this.$refs["banner"];
        const maxWidth = banner.clientWidth;
        const maxHeight = banner.clientHeight;
        let disX = e.clientX - this.startX;
        let disY = e.clientY - this.startY;
        const el = this.moveDom;
        this.getMaxZIndex(el);
        if (
          this.left + disX + el.clientWidth > maxWidth ||
          this.left + disX < 0
        ) {
          return;
        }
        if (
          this.top + disY + el.clientHeight > maxHeight ||
          this.top + disY < 0
        ) {
          return;
        }
        el.style.left = this.left + disX + "px";
        el.style.top = this.top + disY + "px";
        this.getMaxZIndex(el);
      }
    },
    mousedown(e, ref) {
      this.moveDom = this.$refs[ref].$el;
      this.left = this.moveDom.offsetLeft;
      this.top = this.moveDom.offsetTop;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.getMaxZIndex(this.moveDom);
    },
    getMaxZIndex(el, left, top) {
      let doms = document.querySelectorAll(".academy-banner>div");
      const minX = left || el.offsetLeft;
      const minY = top || el.offsetTop;
      const maxX = minX + el.clientWidth;
      const maxY = minY + el.clientHeight;
      let zIndex = el.style.zIndex - 0;
      doms.forEach(dom => {
        const dMinX = dom.offsetLeft;
        const dMinY = dom.offsetTop;
        const dMaxX = dom.offsetLeft + dom.clientWidth;
        const dMaxY = dom.offsetTop + dom.clientHeight;
        if (
          (dMinX >= minX && dMinX <= maxX && dMinY >= minY && dMinY <= maxY) ||
          (dMinX >= minX && dMinX <= maxX && dMaxY >= minY && dMaxY <= maxY) ||
          (dMaxX >= minX && dMaxX <= maxX && dMinY >= minY && dMinY <= maxY) ||
          (dMaxX >= minX && dMaxX <= maxX && dMaxY >= minY && dMaxY <= maxY) ||
          (minX >= dMinX && minX <= dMaxX && minY >= dMinY && minY <= dMaxY) ||
          (minX >= dMinX && minX <= dMaxX && maxY >= dMinY && maxY <= dMaxY) ||
          (maxX >= dMinX && maxX <= dMaxX && minY >= dMinY && minY <= dMaxY) ||
          (maxX >= dMinX && maxX <= dMaxX && maxY >= dMinY && maxY <= dMaxY)
        ) {
          if (dom.style.zIndex - 0 > zIndex) {
            zIndex = dom.style.zIndex - 0;
          }
        }
      });
      el.style.zIndex = zIndex - 0 + 1;
    }
  }
};
</script>

<style lang="less" scoped>
@baseLeft: calc((100vw - 1200px) / 2);
.academy-banner {
  position: relative;
  width: 100%;
  height: 830px;
  background: url("~images/academy/xs-bj.svg") repeat;
  z-index: 0;
  & > div {
    position: absolute;
    top: 0;
    left: 0;
    filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
    transform-origin: center;
    transition-property: top, left;
    transition-duration: 0.2s;
    transition-timing-function: ease;
    cursor: move;
    &:hover {
      transition: transform 0.3s;
      transform: scale(1.05);
    }
  }
  &.animation {
    & > div {
      &.day-logo-svg {
        top: 537px;
        left: calc(@baseLeft + 791px);
      }
      &.dxjxs-svg {
        top: 555px;
        left: calc(@baseLeft + 319px);
      }
      &.dz-svg {
        top: 288px;
        left: calc(@baseLeft + 343px);
      }
      &.dog-svg {
        top: 420px;
        left: calc(@baseLeft + 922px);
      }
      &.yz-svg {
        top: 385px;
        left: calc(@baseLeft + 120px);
      }
      &.lsy-svg {
        top: 212px;
        left: calc(@baseLeft + 301px);
      }
      &.gz-svg {
        top: 82px;
        left: calc(@baseLeft + 922px);
      }
      &.zz-svg {
        top: 317px;
        left: calc(@baseLeft + 562px);
      }
      &.ldd-svg {
        top: 207px;
        left: calc(@baseLeft + 765px);
      }
      &.sf-svg {
        top: 182px;
        left: calc(@baseLeft + 436px);
      }
      &.docee-svg {
        top: 182px;
        left: calc(@baseLeft + 481px);
      }
      &.sz-svg {
        top: 39px;
        left: calc(@baseLeft + 718px);
      }
      &.xg-svg {
        top: 39px;
        left: calc(@baseLeft + 450px);
      }
      &.jz-svg {
        top: 47px;
        left: calc(@baseLeft + 339px);
      }
      &.hb-svg {
        top: 51px;
        left: calc(@baseLeft + 224px);
      }
      &.zwj-svg {
        top: 105px;
        left: calc(@baseLeft + 101px);
      }
    }
  }
}

.academy-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 900px;
  background-color: white;
}

.academy-content-card {
  border: 1px solid #efefef;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);

  width: 540px;
  // background-color: black;
}

.card-img {
  width: 508px;
  height: 286px;
  margin: 16px 0 0 16px;
  // background-color: blanchedalmond;
  background: url("~images/academy/cardimg.png");
  background-size: cover;
}

.card-content {
  width: 100%;
  padding-top: 16px;
  // background-color: blue;
}

.card-content-label {
  display: block;
  padding-left: 16px;
  font-size: 24px;
  font-weight: 800;
  font-style: normal;
  font-family: Source Han Sans SC;
  line-height: 30px;
  color: #dddddd;
  // background-color: red;
}

.card-content-title {
  display: block;
  padding-top: 10px;
  padding-left: 16px;
  font-size: 40px;
  font-weight: 800;
  font-style: normal;
  font-family: Source Han Sans SC;
  color: #ff9100;
  // background-color: seagreen;
}

.card-content-desc-surround {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 24px;
}

.card-content-desc {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 508px;
  background-color: #fafafa;
}

.desc-fontstyle {
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 14px;
  font-weight: 400;
  font-family: PingFang SC;
  line-height: 24px;
  color: #606c66;
}

.desc-trainingcamp {
  font-style: normal;
  font-weight: normal;
  text-transform: uppercase;
  padding-left: 12px;
}

.desc-stage {
  padding-left: 8px;
  font-weight: 500;
  text-transform: uppercase;
}

.desc-status {
  padding-right: 12px;
  color: #9b00ff;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-top: 28px;
  padding-bottom: 28px;
  padding-left: 16px;
  padding-right: 16px;
  // background-color: greenyellow;
}

.card-footer-dollar {
  font-family: Open Sans;
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 40px;
  /* identical to box height, or 100% */
  color: #9b00ff;
  // background-color: honeydew;
}

.card-footer-btn {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 30px;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: white;
  background-color: #9b00ff;
  border: 0;
  outline: none;
  cursor: pointer;
}
</style>
