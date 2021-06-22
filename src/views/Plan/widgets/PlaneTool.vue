<template>
  <div class="tool-wrapper">
    <div class="tool-left">
      <el-scrollbar class="scroll-section">
        <ul class="tool-left-list">
          <template v-for="(cat, index) of cats">
            <li v-show="index < 3 || showMore"
                :class="['tool-left-item', index === activeIndex ? 'active' : '']"
                :key="cat.id"
                @click="handleToggleCat(index)">
              {{ cat.name }}
            </li>
          </template>
          <li v-if="cats.length > 3"
              class="tool-left-more"
              @click="showMore = !showMore">
            <i :class="['expand-icon', showMore ? 'unexpand' : '']"></i>
          </li>
        </ul>
      </el-scrollbar>
    </div>
    <div class="tool-right"
         v-loading="loading">
      <div class="tool-main">
        <div class="tool-main-header">
          <el-input ref="nameSearch"
                    class="name-search"
                    type="text"
                    placeholder="在「布平面」下搜索"
                    prefix-icon="search-icon bgImg"
                    v-model="name"
                    clearable>
          </el-input>
        </div>
        <div class="tool-main-content">
          <div class="scroll-section"
               ref="mainScroll">
            <div class="tool-scroll-wrapper">
              <template v-for="cat of cats">
                <ul class="tool-main-cat-list"
                    v-if="cat.children && cat.children.length > 0"
                    :key="cat.id"
                    :id="`cat-${cat.id}`">
                  <template v-for="subCat of cat.children">
                    <li class="tool-main-cat-item"
                        v-if="subCat.commodities && subCat.commodities.length > 0"
                        :key="subCat.id">
                      <h4 class="tool-main-cat-title">
                        <span>{{ subCat.name }}</span>
                      </h4>
                      <ul class="tool-main-commodity-list">
                        <li class="tool-main-commodity-item"
                            v-for="commodity of subCat.commodities"
                            :key="commodity.id"
                            :title="commodity.skus[0].name"
                            @click="handleAddModel(commodity.skus[0].kjl_sku_id)">
                          <div class="commodity-top">
                            <the-loading-image :width="94"
                                               :height="94"
                                               :url="commodity.skus[0].img_id" />
                            <div class="commodity-top-footer">
                              <label class="bgImg feedback"
                                     @click.stop="
                                  handleShowFeedback(commodity.skus[0])
                                ">
                                <i class="feedback-icon"></i>
                              </label>
                              <label class="size-label">
                                {{
                                  `${commodity.skus[0].size_x || 0}*${commodity
                                    .skus[0].size_y || 0}*${commodity.skus[0]
                                    .size_z || 0}(mm)`
                                }}
                              </label>
                            </div>
                          </div>
                          <div class="commodity-bottom ellipsis">
                            {{ commodity.skus[0].name }}
                          </div>
                        </li>
                      </ul>
                    </li>
                  </template>
                </ul>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheLoadingImage from "components/TheLoadingImage";
import commodityService from "service/commodity";

export default {
  name: "PlaneTool",
  components: {
    TheLoadingImage
  },
  data () {
    return {
      loading: true,
      name: "",
      activeIndex: 0,
      showMore: false,
      originalCats: []
    };
  },
  computed: {
    cats () {
      const cats = this.originalCats;
      const name = this.name;
      if (!name) {
        return cats;
      }
      return cats.map(cat => {
        return {
          id: cat.id,
          name: cat.name,
          children:
            (cat.children &&
              cat.children.map(subCat => {
                return {
                  id: subCat.id,
                  name: subCat.name,
                  commodities: (subCat.commodities || []).filter(
                    commodity => commodity.skus[0].name.indexOf(name) > -1
                  )
                };
              })) ||
            null
        };
      });
    }
  },
  created () {
    this.getData();
  },
  methods: {
    getData () {
      commodityService
        .catCommodities(process.env.VUE_APP_PLANE_CAT_ID)
        .then(res => {
          this.originalCats = res;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleShowFeedback (sku) {
      this.$emit("showFeedback", sku);
    },
    handleToggleCat (index) {
      this.activeIndex = index;
      this.$nextTick(() => {
        const scrollDom = this.$refs["mainScroll"];
        const cat = this.cats[index];
        const catDom = document.getElementById(`cat-${cat.id}`);
        if (catDom) {
          scrollDom.scrollTo({
            top: catDom.offsetTop - 76,
            behavior: "smooth"
          });
        }
      });
    },
    handleAddModel (goodId) {
      this.$emit("addModel", goodId);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.tool-wrapper {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 345px;
  height: 100%;
  .tool-left {
    position: absolute;
    left: -44px;
    top: 0;
    width: 44px;
    max-height: 100%;
    overflow: auto;
    .tool-left-list {
      width: 100%;
      padding: 8px 0;
      background: #fff;
      .tool-left-item {
        width: 100%;
        padding: 8px 10px;
        line-height: 16px;
        font-weight: 600;
        font-size: 12px;
        text-align: center;
        color: #2c3330;
        cursor: pointer;
        &.active {
          color: @primaryColor;
        }
      }
    }
    .tool-left-more {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .expand-icon {
        display: inline-block;
        width: 24px;
        height: 24px;
        mask: url("~images/commodity/expand.svg") no-repeat center;
        background: #2c3330;
        transition: transform 0.1s;
        &.unexpand {
          transform: rotate(180deg);
        }
      }
    }
  }
  .tool-right {
    flex: 1;
    width: 320px;
    height: 100%;
    background: #fff;
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.05);
    border-left: 1px solid #efefef;
  }
  .tool-main {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0 10px;
    .tool-main-header {
      flex: none;
      width: 100%;
      padding: 8px 0;
      /deep/ .name-search {
        margin-left: 10px;
        width: calc(100% - 10px);
        .el-input__inner {
          width: 100%;
          height: 28px;
          background: #fafafa;
          border: unset;
          font-size: 12px;
          border-radius: 2px;
          &::placeholder {
            color: #999999;
          }
        }
        .el-input__icon {
          margin-top: 2px;
          line-height: 24px;
          &.search-icon {
            width: 24px;
            height: 24px;
            background: url("~images/common/search.svg");
          }
        }
        .el-input__suffix {
          right: 2px;
          .el-input__suffix-inner {
            .el-input__icon {
              background: red;
              width: 24px;
              height: 24px;
              background: url("~images/commodity/cancel.svg") no-repeat;
              border: unset;
              &::before {
                display: none;
              }
            }
          }
        }
      }
    }
    .tool-main-content {
      flex: 1;
      width: 100%;
      height: 5px;
      overflow: hidden;
      .scroll-section {
        display: flex;
        justify-content: center;
        width: calc(100% + 15px);
        height: 100%;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          width: 15px;
        }
        .tool-scroll-wrapper {
          width: 300px;
          padding-bottom: 10px;
        }
        .tool-main-cat-list {
          .tool-main-cat-item {
            margin-top: 20px;
            .tool-main-cat-title {
              position: relative;
              height: 20px;
              line-height: 20px;
              font-weight: 600;
              font-size: 14px;
              color: #2c3330;
              text-align: center;
              &::before {
                position: absolute;
                left: 0;
                top: calc(50% - 1px);
                width: 100%;
                border-top: 1px dotted #81948b;
                content: "";
              }
              span {
                position: relative;
                display: inline-block;
                padding: 0 20px;
                background: #fff;
                z-index: 1;
              }
            }
            .tool-main-commodity-list {
              display: flex;
              flex-wrap: wrap;
              .tool-main-commodity-item {
                margin-top: 10px;
                width: 94px;
                cursor: pointer;
                &:nth-child(3n - 1) {
                  margin-left: 9px;
                  margin-right: 9px;
                }
                &:hover {
                  .commodity-top {
                    .feedback {
                      display: flex;
                    }
                  }
                }
                .commodity-top {
                  position: relative;
                  &:hover {
                    .commodity-top-footer {
                      display: block;
                    }
                  }
                  /deep/ .cover-img {
                    background-color: #fafafa;
                  }
                  .commodity-top-footer {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    display: none;
                    width: 100%;
                    .feedback {
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      margin: 0 0 5px 4px;
                      width: 16px;
                      height: 16px;
                      border-radius: 50%;
                      background: rgba(255, 255, 255, 0.8);
                      opacity: 0.8;
                      cursor: pointer;
                      &:hover {
                        opacity: 1;
                      }
                      .feedback-icon {
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                        background-image: url("~images/commodity/feedback.svg");
                        cursor: pointer;
                      }
                    }
                    .size-label {
                      display: inline-block;
                      width: 100%;
                      padding: 4px 5px;
                      line-height: 14px;
                      font-size: 12px;
                      word-break: break-all;
                      color: #666666;
                      background: rgba(255, 255, 255, 0.8);
                    }
                  }
                }
                .commodity-bottom {
                  margin-top: 4px;
                  line-height: 16px;
                  font-size: 12px;
                  text-align: center;
                  color: #81948b;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
