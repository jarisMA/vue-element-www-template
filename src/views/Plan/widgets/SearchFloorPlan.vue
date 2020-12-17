<template>
  <div class="search-floor-plan-container" v-loading="loading">
    <div class="input-wrapper">
      <el-autocomplete
        placeholder="请输入楼盘名/小区"
        prefix-icon="el-icon-location-outline"
        :fetch-suggestions="querySearch"
        v-model="address"
        class="input-with-select"
        @select="search()"
      >
        <el-cascader
          slot="prepend"
          v-model="selectedCity"
          :options="cityData"
          :show-all-levels="false"
          :props="cityProps"
          @change="changeCity"
        ></el-cascader>
        <el-button
          slot="append"
          icon="el-icon-search"
          type="primary"
          @click="search()"
        ></el-button>
      </el-autocomplete>
    </div>
    <div class="plan-wrapper" v-loading="planLoading">
      <div class="container-1200">
        <div v-if="!firstLoading && plans.length > 0">
          <div class="result-tips">
            <p class="result">
              为您找到符合的户型：
              <span class="number">{{ planTotalCount }}</span> 张
            </p>
          </div>
          <ul class="filters">
            <li class="area-filter filter">
              <span class="text">面积</span>
              <ul class="filter-list">
                <li
                  :class="['filter-item', key === areaIndex ? 'active' : '']"
                  v-for="(item, key) of areaFilters"
                  :key="key"
                  @click="clickAreaFilter(key)"
                >
                  {{ item.name }}
                </li>
              </ul>
            </li>
            <li class="spec-filter filter">
              <span class="text">房型</span>
              <ul class="filter-list">
                <li
                  :class="['filter-item', key === specIndex ? 'active' : '']"
                  v-for="(item, key) of specFilters"
                  :key="key"
                  @click="clickSpecFilter(key)"
                >
                  {{ item.name }}
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <plan-list
          :plans="plans"
          :size="planCount"
          :page="planPage"
          :total="planTotalCount"
          :showNoTips="plans.length === 0 && !firstLoading"
          :noPic="noResultPic"
          noText="无符合条件的方案"
          @itemClick="isCreateDesign"
          @pageChange="search"
        />
      </div>
    </div>
    <edit-plan-name-dialog
      title="新建方案"
      confirmText="新建"
      type="add"
      :visible.sync="addVisible"
      :plan="creatingDesign"
      :btnLoading="btnLoading"
      @beforeClose="beforeCloseDialog"
      @confirm="createDesign"
    />
  </div>
</template>

<script>
import cityData from "utils/city.json";
import kujialeService from "service/kujiale";
import PlanList from "components/PlanList";
import EditPlanNameDialog from "components/EditPlanNameDialog";

import { goEditPlan } from "utils/routes";
import noResultPic from "images/noResult.png";
import { mapState } from "vuex";

export default {
  name: "SearchFloorPlan",
  components: {
    PlanList,
    EditPlanNameDialog
  },
  data() {
    return {
      noResultPic,
      loading: false,
      addVisible: false,
      cityData: cityData,
      selectedCity: [9, 39],
      city: 39,
      cityProps: {
        label: "name",
        children: "cities",
        value: "id"
      },
      address: "",
      plans: [],
      planCount: 16,
      planPage: 1,
      planTotalCount: 0,
      areaFilters: [
        { area_min: null, area_max: null, name: "不限" },
        { area_min: null, area_max: 50, name: "50㎡及以下" },
        { area_min: 50, area_max: 80, value: 2, name: "50-80㎡" },
        { area_min: 80, area_max: 100, value: 3, name: "80-100㎡" },
        { area_min: 100, area_max: 130, value: 4, name: "100-130㎡" },
        { area_min: 130, area_max: null, name: "130㎡及以上" }
      ],
      areaIndex: 0,
      specFilters: [
        { value: null, name: "不限" },
        { value: 1, name: "一居" },
        { value: 2, name: "二居" },
        { value: 3, name: "三居" },
        { value: 4, name: "四居" },
        { value: 5, name: "五居及以上" }
      ],
      specIndex: 0,
      planLoading: false,
      firstLoading: true,
      creatingDesign: {
        specName: "",
        planPic: "",
        srcArea: "",
        commName: "",
        city: ""
      },
      btnLoading: false
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    search(start = 1) {
      if (this.city && this.address) {
        this.planLoading = true;
        kujialeService
          .getFloorPlan({
            page: start,
            page_size: this.planCount,
            q: this.address,
            city_id: this.city,
            area_min: this.areaFilters[this.areaIndex].area_min,
            area_max: this.areaFilters[this.areaIndex].area_max,
            room_count: this.specFilters[this.specIndex].value
          })
          .then(res => {
            this.plans = res.result;
            this.planTotalCount = res.totalCount;
            this.firstLoading = false;
            this.planPage = start;
          })
          .finally(() => {
            this.planLoading = false;
          });
      }
    },
    changeCity(data) {
      this.city = data[1];
    },
    querySearch(queryString, cb) {
      queryString &&
        kujialeService
          .getCommunity({
            num: 20,
            comm_name: queryString,
            city_id: this.city
          })
          .then(data => {
            cb(data.result.map(item => ({ value: item.name })));
          });
      !queryString && cb([]);
    },
    clickAreaFilter(key) {
      this.areaIndex = key;
      this.search();
    },
    clickSpecFilter(key) {
      this.specIndex = key;
      this.search();
    },
    beforeCloseDialog() {
      if (this.btnLoading) {
        return;
      }
      this.addVisible = false;
    },
    isCreateDesign(data) {
      kujialeService
        .designList({
          page: 0,
          page_size: 5
        })
        .then(res => {
          if (res.totalCount > 0 && this.userInfo.kujiale_type !== 1) {
            return this.$notice({
              type: "warning",
              title: "oops～方案创建数量已达上限"
            });
          }
          this.creatingDesign = data;
          this.addVisible = true;
        });
    },
    createDesign(value) {
      if (!value) {
        return;
      }
      const data = this.creatingDesign;
      this.btnLoading = true;
      kujialeService
        .createDesign({
          plan_id: data.planId,
          name: value
        })
        .then(res => {
          this.addVisible = false;
          this.$notice({
            type: "success",
            title: "方案创建成功"
          });

          goEditPlan({
            designId: res
          });
        })
        .finally(() => {
          this.btnLoading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable.less";

.search-floor-plan-container {
  margin-top: 15px;
  /deep/ .input-wrapper {
    margin: 10px auto 40px;
    width: 500px;
    .el-autocomplete {
      width: 100%;
    }
    .el-input-group__prepend {
      padding: 0;
      width: 105px;
      border: unset;
    }
    .el-input-group__append {
      border-radius: unset;
      border-color: @primaryColor;
      .el-button {
        width: 102px;
        border-radius: unset;
        background: @primaryColor;
        .el-icon-search {
          font-size: 16px;
          font-weight: 700;
          color: #fff;
        }
      }
    }
  }
  .plan-wrapper {
    width: 100%;
    min-height: calc(100vh - 120px - 175px);
    background: #fafafa;
  }
  .result-tips {
    padding-top: 40px;
    margin-bottom: 15px;
    padding-bottom: 15px;
    line-height: 24px;
    font-size: 16px;
    color: #333;
    font-weight: 500;
    border-bottom: 1px solid #e6e6e6;
    span.number {
      color: @primaryColor;
    }
  }
  .filters {
    padding-bottom: 47px;
    line-height: 14px;
    font-size: 14px;
    font-weight: 500;
    color: #333;
    .filter {
      display: flex;
      padding: 5px 0 0;
      .filter-list {
        display: flex;
        .filter-item {
          padding: 0 10px;
          list-style: none;
          font-weight: 400;
          cursor: pointer;
          &.active {
            color: @primaryColor;
          }
          &:first-child {
            padding-left: 48px;
          }
        }
      }
      &:not(:last-child) {
        margin-bottom: 12px;
      }
    }
  }
  .plan-list {
    display: flex;
    flex-wrap: wrap;
    .plan-item {
      width: 25%;
    }
  }
}
</style>
