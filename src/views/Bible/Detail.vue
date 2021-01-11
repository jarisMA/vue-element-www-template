<template>
  <div class="bible-detail-page" v-loading="loading">
    <div class="bible-header">
      <div class="container-1200"></div>
    </div>
    <div class="bible-body">
      <div class="container-1200">
        <div class="bible-menu-wrapper">
          <ul class="bible-menu" v-for="(menu, key) of menus" :key="menu.id">
            <div class="bible-menu-header" @click="foldChange(key)">
              <label
                :class="[
                  'menu-header-icon',
                  'bible-menu-label',
                  isActiveMenu(key) ? 'active' : ''
                ]"
                >{{ menu.name }}</label
              >
              <img
                :class="[menu.isFold ? 'unfold-icon' : 'fold-icon']"
                src="~images/bible/fold.svg"
              />
            </div>
            <div
              :class="[
                'bible-submenu-wrapper',
                menu.isFold ? 'fold' : 'unfold'
              ]"
              :style="{
                maxHeight: menu.isFold ? '0px' : maxHeight(menu.children)
              }"
            >
              <ul class="bible-submenu">
                <li
                  v-for="item of menu.children"
                  :key="item.id"
                  :class="item.id === activeSubMenu.id ? 'active' : ''"
                  @click="toggleMenu(item)"
                >
                  <div class="bible-submenu-name">
                    {{ item.name }}
                  </div>
                  <template v-if="item.cover_url">
                    <div
                      :class="[
                        'bible-submenu-cover',
                        item.id === activeSubMenu.id ? 'active' : ''
                      ]"
                    >
                      <the-loading-image
                        :width="260"
                        :height="260"
                        :url="item.cover_url"
                      />
                    </div>
                  </template>
                </li>
              </ul>
            </div>
          </ul>
        </div>
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
</template>

<script>
import bibleService from "service/bible";
import TheLoadingImage from "components/TheLoadingImage";

export default {
  name: "BibleDetail",
  components: {
    TheLoadingImage
  },
  data() {
    return {
      loading: true,
      menus: [],
      activeSubMenu: null
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    if (this.$route.hash) {
      this.$router.push({
        hash: this.$route.hash
      });
    }
  },
  computed: {
    isActiveMenu() {
      return key => {
        let flag = false;
        ((this.menus[key] || {}).children || []).some(item => {
          if (item.id === this.activeSubMenu.id) {
            flag = true;
            return true;
          }
        });
        return flag;
      };
    },
    maxHeight() {
      return arr => {
        let height = 0;
        if (arr && arr.length > 0) {
          arr.map(item => {
            if (item.cover_url) {
              height += 280;
            }
            height += 40;
          });
        }
        return height + "px";
      };
    }
  },
  methods: {
    getData() {
      this.loading = true;
      bibleService
        .bible(this.$route.params.id)
        .then(res => {
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
      this.$router.push({
        hash: "#submenu-" + item.id
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";
.bible-detail-page {
  background: #fff !important;
}
.bible-header {
  width: 100%;
  height: 76px;
  background: @primaryColor;
}
.bible-body {
  padding-top: 40px;
  .container-1200 {
    display: flex;
    position: relative;
  }
  .bible-menu-wrapper {
    margin-right: 20px;
    width: 280px;
    .bible-menu {
      width: 100%;
      user-select: none;
      .bible-menu-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 50px;
        border-bottom: 1px solid #efefefff;
        cursor: pointer;
        .menu-header-icon {
          transition: all 0.2s;
        }
        .unfold-icon {
          transform: rotate(180deg);
        }
      }
      .bible-menu-label {
        position: relative;
        display: inline-block;
        line-height: 50px;
        font-size: 14px;
        font-weight: 600;
        color: #9ba2a5;
        &::after {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 4px;
          content: "";
          background: #efefef;
        }
        &.active {
          color: @primaryColor;
          &::after {
            background: @primaryColor;
          }
        }
      }
      .bible-submenu-wrapper {
        margin-top: 10px;
        transition: all 0.2s;
        &.fold {
          overflow: hidden;
        }
        .bible-submenu {
          li {
            cursor: pointer;
            .bible-submenu-name {
              padding: 0 50px;
              height: 40px;
              line-height: 40px;
              font-size: 12px;
              color: #9ba2a5;
              transition: all 0.2;
            }
            .bible-submenu-cover {
              height: 0;
              overflow: hidden;
              transition: height 0.1s;
              &.active {
                padding: 10px;
                height: 280px;
              }
            }
            &:hover {
              .bible-submenu-name {
                font-size: 16px;
                color: @primaryColor;
              }
            }
            &.active {
              .bible-submenu-name {
                font-size: 16px;
                color: #ffffff;
                background: @primaryColor;
              }
              .bible-submenu-cover {
                border: 1px solid @primaryColor;
                border-top: unset;
              }
            }
          }
        }
      }
    }
  }
  .bible-content {
    flex: 1;
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
