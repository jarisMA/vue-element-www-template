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
        <div v-if="!firstLoading">
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
          :total="planTotalCount"
          @itemClick="isCreateDesign"
          @pageChange="search"
        />
      </div>
    </div>
    <el-dialog
      width="700px"
      :visible.sync="addVisible"
      @before-close="beforeCloseDialog"
    >
      <div class="dialog-body">
        <div class="dialog-left">
          <img :src="creatingDesign.planPic" :alt="creatingDesign.commName" />
        </div>
        <div class="dialog-right">
          <h3 class="dialog-title">新建方案</h3>
          <p class="dialog-input">
            <label class="dialog-label">方案名称：</label>
            <el-input
              placeholder="请输入方案名称"
              v-model="planName"
            ></el-input>
          </p>
          <p class="dialog-desc">
            <label class="dialog-label">详细信息：</label>
            <span
              >{{ creatingDesign.srcArea }}㎡ |
              {{ creatingDesign.specName }}</span
            >
            <span
              ><i class="el-icon-location-outline"></i>
              {{ creatingDesign.city }} {{ creatingDesign.commName }}
            </span>
          </p>
          <div class="dialog-right-footer">
            <el-button @click="addVisible = false">取消</el-button>
            <el-button
              type="primary"
              @click="createDesign"
              :loading="btnLoading"
              >创建</el-button
            >
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import cityData from "utils/city.json";
import kujialeService from "@/global/service/kujiale";
import PlanList from "components/PlanList";
export default {
  name: "SearchFloorPlan",
  components: {
    PlanList
  },
  data() {
    return {
      loading: false,
      addVisible: false,
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
      planCount: 16,
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
        commName: ""
      },
      planName: "",
      btnLoading: false
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
    beforeCloseDialog(done) {
      if (this.btnLoading) {
        return;
      }
      this.planName = "";
      this.creatingDesign = null;
      done();
    },
    isCreateDesign(data) {
      this.creatingDesign = data;
      this.addVisible = true;
    },
    createDesign() {
      const value = this.planName;
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
          this.$router.push({
            name: "EditPlan",
            params: {
              designId: res
            }
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
  /deep/ .el-dialog {
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      padding: 40px 30px;
    }
    .dialog-body {
      display: flex;
      width: 100%;
      height: 320px;
      .dialog-left,
      .dialog-right {
        padding: 10px 0;
      }
      .dialog-left {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 30px;
        width: 300px;
        height: 100%;
        img {
          width: 100%;
          max-height: 300px;
          object-fit: cover;
        }
      }
      .dialog-right {
        flex: 1;
        width: 310px;
        line-height: 1;
        padding-left: 30px;
        border-left: 1px solid #e6e6e6ff;
        .dialog-title {
          font-size: 16px;
          font-weight: bold;
          color: @primaryColor;
        }
        .dialog-input,
        .dialog-desc {
          display: flex;
          flex-direction: column;
          margin-top: 40px;
        }
        .dialog-label {
          margin-bottom: 10px;
          line-height: 14px;
          font-size: 14px;
          font-weight: 400;
          color: #787878;
        }
        .dialog-input {
          .el-input__inner {
            height: 32px;
            line-height: 32px;
            border-radius: unset;
            border-color: #e6e6e6ff;
            &::placeholder {
              color: #e6e6e6;
            }
          }
        }
        .dialog-desc {
          .dialog-label {
            margin-bottom: 12px;
          }
          span {
            display: inline-block;
            line-height: 12px;
            font-size: 12px;
            font-weight: 400;
            color: #ababab;
            &:not(:last-child) {
              margin-bottom: 10px;
            }
          }
        }
        .dialog-right-footer {
          display: flex;
          justify-content: flex-end;
          margin-top: 46px;
          .el-button {
            padding: 9px 22px;
            border-radius: unset;
            &:not(:last-child) {
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
