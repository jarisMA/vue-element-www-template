<template>
  <div
    class="bible-detail-page"
    v-loading="loading"
    oncontextmenu="return false;"
    onselect="return false;"
  >
    <div class="bible-header" :style="{ backgroundColor: color }">
      <div class="container-1200">
        <div class="bible-title">
          <label class="bible-title-label ellipsis"> {{ detail.name }} </label>
        </div>
      </div>
    </div>
    <div class="bible-body">
      <div ref="bibleBody" class="scroll-inner">
        <div class="container-1200">
          <detail-menu
            :menus="menus"
            :activeSubMenu="activeSubMenu"
            :color="color"
            @foldChange="foldChange"
            @toggleMenu="toggleMenu"
          />
          <div class="bible-content">
            <ul class="bible-list" v-for="menu of menus" :key="menu.id">
              <label class="bible-list-name" :id="'menu-' + menu.id">{{
                menu.name
              }}</label>
              <ul class="bible-sublist">
                <li v-for="submenu of menu.children" :key="submenu.id">
                  <label
                    class="bible-sublist-name"
                    :id="'submenu-' + submenu.id"
                    >{{ submenu.name }}</label
                  >
                  <ul class="bible-item">
                    <li v-for="item of submenu.children" :key="item.id">
                      <div class="bible-item-card">
                        <div class="bible-card-top">
                          <the-loading-image
                            :width="260"
                            :height="190"
                            :url="item.cover_url"
                          />
                        </div>
                        <div class="bible-card-bottom">
                          {{ item.name }}
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bibleService from "service/bible";
import TheLoadingImage from "components/TheLoadingImage";
import DetailMenu from "./widgets/DetailMenu";

export default {
  name: "BibleDetail",
  components: {
    TheLoadingImage,
    DetailMenu
  },
  data() {
    return {
      loading: true,
      detail: {},
      menus: [],
      activeSubMenu: {},
      color: "#ff7300"
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      bibleService
        .bible(this.$route.params.id)
        .then(res => {
          this.detail = res;
          this.menus = res.children[0].children;
          this.activeSubMenu = this.menus[0].children[1];
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
      const offsetTop = document.getElementById("submenu-" + item.id).offsetTop;
      const dom = this.$refs["bibleBody"];
      dom.scrollTo(0, offsetTop);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
.bible-detail-page {
  user-select: none;
  background: #fff !important;
}
.bible-header {
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  height: 76px;
  background: @primaryColor;
  z-index: 1;
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
  height: calc(100vh - 60px);
  overflow: hidden;
  padding-top: 100px;
  .scroll-inner {
    width: calc(100% + 18px);
    height: 100%;
    overflow-y: scroll;
  }
  .container-1200 {
    display: flex;
    position: relative;
  }
  .bible-content {
    flex: 1;
    margin-left: 300px;
    width: 900px;
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
            height: 260px;
            background: #fafafa;
            cursor: pointer;
            &:hover {
              box-shadow: 0px 0px 11px 0px rgba(183, 183, 183, 0.5);
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
