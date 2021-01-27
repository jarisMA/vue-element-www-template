<template>
  <div
    class="bible-detail-page"
    v-loading="loading"
    oncontextmenu="return false;"
    onselect="return false;"
  >
    <div class="bible-header" :style="{ backgroundColor: color }">
      <div class="container-1200">
        <div
          class="bible-title"
          :style="{ backgroundImage: `url(${detail.title_bg_url})` }"
        >
          <label class="bible-title-label ellipsis"> {{ detail.name }} </label>
        </div>
        <detail-nav
          :color="color"
          :navs="root.children"
          :activeNav="activeNav"
          @toggleNav="toggleNav"
        />
      </div>
    </div>
    <div class="bible-body">
      <div ref="bibleBody" class="scroll-inner">
        <div class="container-1200">
          <detail-menu
            :menus="menus"
            :activeSubMenu="activeSubMenu"
            :color="color"
            :depth="depth"
            @foldChange="foldChange"
            @toggleMenu="toggleMenu"
          />
          <div :class="['bible-content', depth < 2 ? 'more' : '']">
            <detail-content
              :menus="menus"
              :activeSubMenu="activeSubMenu"
              :color="color"
              :depth="depth"
              @showDetail="showDetail"
            />
          </div>
        </div>
      </div>
    </div>
    <el-drawer
      :title="activeCard.name"
      direction="rtl"
      :visible.sync="drawerVisible"
      size="700px"
    >
      <el-tabs v-model="activePane">
        <el-tab-pane
          v-for="(item, key) of activeCard.content"
          :label="item.label"
          :name="'pane-' + (key + 1)"
          :key="key"
        >
          <div class="pane-content" v-html="item.content"></div>
        </el-tab-pane>
      </el-tabs>
    </el-drawer>
  </div>
</template>

<script>
import bibleService from "service/bible";
import DetailMenu from "./widgets/DetailMenu";
import DetailNav from "./widgets/DetailNav";
import DetailContent from "./widgets/DetailContent";

import { isVip } from "utils/function";
import { goBible } from "utils/routes";
import { detailMixin } from "./mixin";

export default {
  name: "BibleDetail",
  mixins: [detailMixin],
  components: {
    DetailMenu,
    DetailNav,
    DetailContent
  },
  data() {
    return {
      loading: true,
      root: { children: [] },
      detail: {},
      activeNav: {},
      menus: [],
      activeSubMenu: {},
      color: "",
      drawerVisible: false,
      activeCard: {},
      activePane: null,
      depth: 0,
      scrollTimer: null
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    // window.addEventListener("scroll", this.handleScroll, false);
  },
  destroyed() {
    // window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    getData() {
      this.loading = true;
      const isPreview = this.$route.name === "BiblePreview";
      const id = this.$route.params.id;
      let promiseArr = [];
      if (isPreview) {
        promiseArr.push(bibleService.biblePreview(id));
      } else {
        promiseArr.push(bibleService.bible(id));
      }
      Promise.all(promiseArr)
        .then(([res]) => {
          if (!isPreview) {
            if (
              res.bible.status === 0 ||
              (res.bible.status === 2 && !isVip()) ||
              res.bible.is_online !== 1
            ) {
              this.$notice({
                type: "warning",
                title: "暂未开放~"
              });
              goBible("replace");
              return;
            }
          }
          this.root = res;
          this.detail = res.bible;
          this.color = res.bible.color || "";
          this.activeNav = res.children[0] || {};
          this.menus = this.activeNav.children || [];
          this.activeSubMenu =
            (this.menus[0] && this.menus[0].children[0]) || this.menus[0] || {};
          this.depth = this.getDepth(this.menus, 0);
        })
        .catch(error => {
          const { response } = error;
          if (response && response.status === 403) {
            goBible("replace");
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    foldChange(key) {
      const isFold = this.menus[key].isFold;
      this.$set(this.menus, key, { ...this.menus[key], isFold: !isFold });
    },
    toggleMenu(item) {
      this.activeSubMenu = item;
      const offsetTop = document.getElementById("menu-" + item.id).offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    },
    toggleNav(nav) {
      window.scrollTo(0, 0);
      this.activeNav = nav;
      this.menus = this.activeNav.children || [];
      this.depth = this.getDepth(this.menus, 0);
      this.activeSubMenu = ((this.menus[0] || {}).children || [])[0] || {};
    },
    showDetail(data) {
      this.activeCard = data;
      this.activePane = "pane-1";
      this.drawerVisible = true;
    },
    handleScroll() {
      let scroll = window.scrollY;
      let flag = false;
      for (let i = this.menus.length - 1; i >= 0; i--) {
        if (
          this.menus[i] &&
          this.menus[i].children &&
          this.menus[i].children.length > 0
        ) {
          for (let j = this.menus[i].children.length - 1; j >= 0; j--) {
            const item = this.menus[i].children[j];
            const dom = document.getElementById("menu-" + item.id);
            if (scroll >= dom.offsetTop) {
              this.activeSubMenu = item;
              flag = true;
              break;
            }
          }
        }
        if (flag) {
          break;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
.bible-detail-page {
  user-select: none;
  background: #fff !important;
  /deep/ .el-drawer__wrapper {
    .el-drawer {
      outline: unset;
    }
    .el-drawer__header {
      height: 60px;
      padding: 0 20px;
      margin: 0;
      span {
        font-size: 16px;
        font-weight: 600;
        color: #333333;
        outline: none;
      }
      .el-drawer__close-btn {
        outline: none;
      }
      .el-dialog__close {
        font-size: 30px;
        font-weight: bold;
        color: #333333;
      }
    }
    .el-drawer__body {
      .el-tabs__header {
        margin: 0;
        .el-tabs__nav-scroll {
          padding: 0 20px;
        }
        .el-tabs__nav {
          display: flex;
          width: 100%;
          .el-tabs__active-bar {
            height: 4px;
          }
          .el-tabs__item {
            flex: 1;
            width: 50px;
            height: 76px;
            line-height: 76px;
            font-size: 16px;
            font-weight: 600;
            text-align: center;
          }
        }
      }
      .el-tabs__content {
        overflow-y: auto;
        height: calc(100vh - 136px);
        padding: 13px 20px 20px;
      }
    }
  }
}
.bible-header {
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  height: 76px;
  background: @primaryColor;
  z-index: 1;
  .container-1200 {
    display: flex;
  }
  .bible-title {
    position: relative;
    width: 294px;
    height: 86px;
    background-image: url("~images/bible/1.png");
    background-size: cover;
    background-repeat: no-repeat;
    .bible-title-label {
      position: absolute;
      top: 19px;
      right: 29px;
      width: 159px;
      height: 46px;
      line-height: 46px;
      font-size: 22px;
      font-weight: 600;
      text-align: center;
      color: #000000;
    }
  }
}
.bible-body {
  padding-top: 100px;
  .container-1200 {
    display: flex;
    position: relative;
  }
  .bible-content {
    flex: 1;
    margin-left: 300px;
    width: 900px;
    &.more {
      margin: 0 150px;
    }
    .bible-list {
      .bible-list-name {
        line-height: 50px;
        font-size: 16px;
        font-weight: 600;
        color: #333330;
      }
      .bible-sublist {
        .bible-sublist-name {
          display: inline-block;
          margin-bottom: 15px;
          line-height: 20px;
          font-size: 14px;
          font-weight: 400;
          color: #333333;
        }
        .bible-item {
          display: flex;
          flex-wrap: wrap;
          li {
            margin-bottom: 20px;
            &:nth-child(3n-1) {
              margin-left: 20px;
              margin-right: 20px;
            }
          }
          .bible-item-card {
            display: flex;
            flex-direction: column;
            width: 280px;
            height: 330px;
            background: #fafafa;
            &:hover {
              box-shadow: 0px 0px 11px 0px rgba(183, 183, 183, 0.5);
            }
            &.info {
              position: relative;
              cursor: pointer;
              &::after {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 20px;
                height: 20px;
                background-image: url("~images/bible/warn.svg");
                background-size: cover;
                background-repeat: no-repeat;
                content: "";
              }
            }
            .bible-card-top {
              padding: 10px;
            }
            .bible-card-bottom {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 50px;
              font-size: 14px;
              font-weight: 600;
              color: #333333;
              text-shadow: 0px 0px 11px rgba(183, 183, 183, 0.5);
              border-top: 1px solid #b7b7b780;
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.pane-content {
  .homework-card {
    img {
      max-width: 100%;
    }
    ul li {
      list-style: disc;
    }
    ul,
    ol {
      margin-left: 20px;
    }
    ol,
    ol li {
      list-style: decimal;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-weight: 700;
      font-size: 0.67em;
    }

    h5 {
      font-size: 0.83em;
    }

    h4 {
      font-size: 1em;
    }

    h3 {
      font-size: 1.17em;
    }

    h2 {
      font-size: 1.5em;
    }

    h1 {
      font-size: 2em;
    }
  }
}
</style>
