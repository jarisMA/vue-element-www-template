<template>
  <div class="bible-page">
    <div class="bible-page-wrapper">
    </div>
    <div class="bible-top">
      <div class="bible-top-center">
        <img src="~images/bible/title.svg"
             width="380"
             height="80"
             class="bible-title" />
        <img src="~images/bible/desc.svg"
             width="290"
             height="70"
             class="bible-desc" />
        <div class="bible-person-wrapper">
          <img src="~images/bible/person.svg"
               width="220"
               height="278"
               class="bible-person" />
          <div class="bible-person-shadow"></div>
        </div>
        <img src="~images/bible/dialog_1.png"
             width="404"
             height="108"
             class="bible-dialog_1" />
        <img src="~images/bible/dialog_2.png"
             width="402"
             height="104"
             class="bible-dialog_2" />
      </div>
    </div>
    <div class="bible-bottom">
      <ul class="bible-list">
        <li :class="['bible-item',bible.status === 0 ? 'gray' : '']"
            v-for="bible of bibles"
            :key="bible.id">
          <div class="bible-book"
               v-if="bible.id===1"></div>
          <div class="bible-cover"
               :style="{backgroundImage:`url(${bible.cover_url})`}"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import bibleService from "service/bible";

export default {
  name: "BibleIndex",
  data () {
    return {
      loading: true,
      bibles: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      bibleService.bibles().then(bibles => {
        this.bibles = bibles;
      }).finally(() => {
        this.loading = false;
      })
    }
  }
};
</script>

<style lang="less" scoped>
.bible-page {
  position: relative;
  // background-color: #f6f2dc !important;
  background-image: linear-gradient(
    to bottom,
    #fefedf,
    #fbf8da,
    #efe9df,
    #e8d8cb,
    #dcccbb
  ) !important;
  .bible-page-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("~images/bible/point.png") repeat;
    mix-blend-mode: overlay;
    opacity: 0.2;
  }
  &::before,
  &::after {
    position: absolute;
    bottom: 0;
    background-size: cover;
    background-repeat: no-repeat;
    content: "";
    z-index: 1;
  }
  &::before {
    left: 0;
    width: 790px;
    height: 205px;
    background-image: url("~images/bible/cloud_1.png");
  }
  &::after {
    right: 0;
    width: 749px;
    height: 230px;
    background-image: url("~images/bible/cloud_2.png");
  }
  .bible-top {
    position: relative;
    width: 100%;
    height: 664px;
    &::before,
    &::after {
      position: absolute;
      background-size: cover;
      background-repeat: no-repeat;
      content: "";
    }
    &::before {
      top: 80px;
      left: 176px;
      width: 330px;
      height: 136px;
      background-image: url("~images/bible/cloud_3.png");
    }
    &::after {
      bottom: 36px;
      right: 264px;
      width: 268px;
      height: 100px;
      background-image: url("~images/bible/cloud_4.png");
    }
    .bible-top-center {
      position: relative;
      width: 958px;
      margin: 42px auto 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      .bible-desc {
        margin-top: 3px;
      }
      .bible-person-wrapper {
        margin-top: 93px;
        .bible-person-shadow {
          margin: 3px auto;
          width: 134px;
          height: 26px;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 50%;
        }
      }
      .bible-dialog_1,
      .bible-dialog_2 {
        position: absolute;
      }
      .bible-dialog_1 {
        top: 265px;
        left: 0;
      }
      .bible-dialog_2 {
        top: 319px;
        right: 0;
      }
    }
  }
  .bible-bottom {
    .bible-list {
      display: flex;
      width: 1064px;
      margin: auto;
    }
    .bible-item {
      position: relative;
      width: 126px;
      height: 178px;
      cursor: pointer;
      transition: all 0.5s;
      .bible-cover {
        width: 126px;
        height: 150px;
        background-size: cover;
        background-repeat: no-repeat;
        transition: all 0.5s;
      }
      .bible-book {
        position: absolute;
        top: -242px;
        left: 50%;
        width: 340px;
        height: 222px;
        transform: translateX(-50%);
        background-image: url("~images/bible/book.svg");
        background-size: cover;
        background-repeat: no-repeat;
      }
      &::after {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 66px;
        height: 16px;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        transform: translateX(-50%);
        content: "";
      }
      &:hover {
        .bible-cover {
          transform: translateY(-20px);
        }
        &::after {
          width: 50px;
        }
      }
      &.gray {
        .bible-cover {
          position: relative;
          filter: grayscale(1);
          &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 126px;
            height: 150px;
            content: "";
            background-image: url("~images/bible/dashed.svg");
            background-size: cover;
            background-repeat: no-repeat;
            z-index: 10;
          }
        }
      }
    }
  }
}
</style>
