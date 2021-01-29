<template>
  <div class="academy-page">
    <div class="academy-banner" ref="banner">
      <day-logo-svg class="day-logo-svg" />
      <docee-svg class="docee-svg" />
      <dog-svg class="dog-svg" />
      <dxjxs-svg class="dxjxs-svg" />
      <dz-svg class="dz-svg" />
      <gz-svg class="gz-svg" />
      <hb-svg class="hb-svg" />
      <jz-svg class="jz-svg" />
      <ldd-svg class="ldd-svg" />
      <lsy-svg class="lsy-svg" />
      <sf-svg class="sf-svg" />
      <sz-svg class="sz-svg" />
      <xg-svg class="xg-svg" />
      <yz-svg class="yz-svg" />
      <zwj-svg class="zwj-svg" />
      <zz-svg class="zz-svg" />
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
  mounted() {
    const timer = setTimeout(() => {
      const banner = this.$refs["banner"];
      banner.className = "academy-banner animation";
      clearTimeout(timer);
    }, 100);
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
  z-index: 1;
  svg {
    position: absolute;
    top: 0;
    left: 0;
    filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
    transform-origin: center;
    transition-property: top, left;
    transition-duration: 2s;
    transition-timing-function: ease;
    cursor: move;
    &:hover {
      transition: transform 0.3s;
      transform: scale(1.05);
    }
    &.day-logo-svg {
      z-index: 2;
    }
    &.dxjxs-svg {
      z-index: 1;
    }
    &.dz-svg {
      z-index: 3;
    }
    &.dog-svg {
      z-index: 4;
    }
    &.yz-svg {
      z-index: 5;
    }
    &.lsy-svg {
      z-index: 6;
    }
    &.gz-svg {
      z-index: 7;
    }
    &.zz-svg {
      z-index: 11;
    }
    &.ldd-svg {
      z-index: 9;
    }
    &.sf-svg {
      z-index: 8;
    }
    &.docee-svg {
      z-index: 10;
    }
    &.sz-svg {
      z-index: 12;
    }
    &.xg-svg {
      z-index: 13;
    }
    &.jz-svg {
      z-index: 14;
    }
    &.hb-svg {
      z-index: 15;
    }
    &.zwj-svg {
      z-index: 16;
    }
  }
  &.animation {
    svg {
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
</style>
