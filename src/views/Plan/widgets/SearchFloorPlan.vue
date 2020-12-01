<template>
  <div class="search-floor-plan-container" v-loading="loading">
    <div class="input-wrapper">
      <el-autocomplete
        placeholder="请输入楼盘名/小区"
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
          @click="search()"
        ></el-button>
      </el-autocomplete>
    </div>
    <div class="plan-wrapper" v-loading="planLoading">
      <div v-if="!firstLoading">
        <div class="result-tips">
          <p class="result">
            为您找到符合的户型：
            <span class="number">{{ planTotalCount }}</span> 张
          </p>
        </div>
        <ul class="filters">
          <li class="area-filter filter">
            <span class="text">面积:</span>
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
            <span class="text">房型:</span>
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
        :total="planTotalCount"
        @itemClick="createDesign"
        @pageChange="search"
      />
    </div>
  </div>
</template>

<script>
import cityData from "@/utils/city.json";
import kujialeService from "@/global/service/kujiale";
import PlanList from "@/components/PlanList";
export default {
  name: "SearchFloorPlan",
  components: {
    PlanList
  },
  data() {
    return {
      loading: false,
      cityData: cityData,
      selectedCity: [1, 36],
      city: 36,
      cityProps: {
        label: "name",
        children: "cities",
        value: "id"
      },
      address: "",
      plans: [],
      planCount: 8,
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
      firstLoading: true
    };
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
    },
    clickAreaFilter(key) {
      this.areaIndex = key;
      this.search();
    },
    clickSpecFilter(key) {
      this.specIndex = key;
      this.search();
    },
    createDesign(data) {
      this.loading = true;
      kujialeService
        .createDesign({
          plan_id: data.planId,
          name: data.name + "_副本"
        })
        .then(res => {
          this.$message.success("成功创建设计");
          this.$router.push({
            name: "EditPlan",
            params: {
              designId: res
            }
          });
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.search-floor-plan-container {
  /deep/ .input-wrapper {
    margin: 10px auto;
    width: 500px;
    .el-autocomplete {
      width: 100%;
    }
    .el-input-group__prepend {
      padding: 0;
      width: 105px;
      border: unset;
    }
  }
  .result-tips {
    margin-bottom: 10px;
    padding-bottom: 10px;
    font-size: 18px;
    color: #666;
    font-weight: 700;
    border-bottom: 2px solid #e6e6e6;
    span.number {
      color: #ea631a;
    }
  }
  .filters {
    font-size: 14px;
    color: #666;
    .filter {
      display: flex;
      padding: 5px 0 0;
      .filter-list {
        display: flex;
        .filter-item {
          padding: 0 10px;
          list-style: none;
          cursor: pointer;
          &.active {
            color: #35b558;
          }
        }
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
