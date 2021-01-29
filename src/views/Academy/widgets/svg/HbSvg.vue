<template>
  <div :draggable="draggable" @mousedown="mousedown">
    <svg
      width="108"
      height="140"
      viewBox="0 0 108 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="M103.135 5H5V131.401H103.135V5Z" fill="white" />
        <path
          d="M49.6521 20.4392H37.045V42.8205H49.6521V20.4392Z"
          fill="black"
        />
        <path
          d="M70.9787 20.4393H58.3717V42.8205H70.9787V20.4393Z"
          fill="black"
        />
        <path
          d="M82.616 57.1907L72.5627 47.1376L25.4381 94.2615L35.4913 104.315L82.616 57.1907Z"
          fill="black"
        />
        <path
          d="M72.6004 104.277L82.6537 94.2234L35.529 47.0996L25.4757 57.1527L72.6004 104.277Z"
          fill="black"
        />
        <path
          d="M38.989 114.407H41.3216C42.8211 114.407 43.5431 115.24 43.5431 116.74V121.516C43.5431 123.015 42.8211 123.848 41.3216 123.848H38.989V114.407ZM40.433 115.74V122.46H41.266C41.7103 122.46 42.0436 122.238 42.0436 121.571V116.684C42.0436 116.018 41.7659 115.795 41.266 115.795H40.433V115.74Z"
          fill="black"
        />
        <path
          d="M49.208 123.793H47.7085L47.4308 122.071H45.598L45.3204 123.793H43.9875L45.487 114.407H47.6529L49.208 123.793ZM45.8757 120.849H47.3197L46.5977 116.073L45.8757 120.849Z"
          fill="black"
        />
        <path
          d="M50.6519 120.683L48.7636 114.407H50.3186L51.4294 118.683L52.5401 114.407H53.9286L52.0403 120.683V123.793H50.5408V120.683H50.6519Z"
          fill="black"
        />
        <path
          d="M54.5949 114.407H56.0944V122.46H58.5381V123.793H54.6505V114.407H54.5949Z"
          fill="black"
        />
        <path
          d="M63.9252 123.793H62.4257L62.148 122.071H60.3153L60.0376 123.793H58.7047L60.2042 114.407H62.3702L63.9252 123.793ZM60.5374 120.849H61.9814L61.2594 116.073L60.5374 120.849Z"
          fill="black"
        />
        <path
          d="M69.0349 116.573V116.906C69.0349 117.85 68.7572 118.461 68.0907 118.794C68.8682 119.128 69.2015 119.794 69.2015 120.794V121.571C69.2015 123.015 68.4239 123.793 66.98 123.793H64.6474V114.407H66.8689C68.3684 114.407 69.0349 115.129 69.0349 116.573ZM66.0914 115.74V118.239H66.6467C67.2021 118.239 67.5353 118.017 67.5353 117.239V116.74C67.5353 116.073 67.3132 115.795 66.7578 115.795H66.0914V115.74ZM66.0914 119.572V122.46H66.9244C67.4243 122.46 67.7019 122.238 67.7019 121.516V120.738C67.7019 119.85 67.4243 119.572 66.7578 119.572H66.0914Z"
          fill="black"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="1"
          y="5"
          width="106.135"
          height="134.401"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<script>
import mixin from "./mixin";

export default {
  name: "HbSvg",
  mixins: [mixin]
};
</script>

<style lang="less" scoped></style>
