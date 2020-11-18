<template>
  <div class="add-plan-container container-1200">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="搜户型" name="first">
        <div class="input-wrapper">
          <el-input
            placeholder="请输入内容"
            v-model="address"
            class="input-with-select"
          >
            <el-cascader
              slot="prepend"
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
          </el-input>
        </div>
        <div class="plan-wrapper" v-loading="planLoading">
          <ul class="plan-list">
            <li class="plan-item" v-for="item of plans" :key="item.planId">
              <div class="plan-card">
                <div class="plan-card-top">
                  <img :src="item.planPic" :alt="item.commName" />
                </div>
                <div class="plan-card-bottom">
                  <span class="house-type">{{ item.specName }}</span>
                  <label class="house-address"
                    ><i class="el-icon-location-outline"></i>
                    {{ item.city }}</label
                  >
                </div>
              </div>
            </li>
          </ul>
          <pagination
            :pageSize="planCount"
            :total="planTotalCount"
            @change-page="search"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="自己画" name="second" disabled>自己画</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import cityData from "@/utils/city.json";
import kujialeService from "@/globals/service/kujiale";
import Pagination from "@/components/Pagination";

export default {
  name: "AddPlan",
  components: {
    Pagination
  },
  data() {
    return {
      activeName: "first",
      cityData: cityData,
      city: "",
      cityProps: {
        label: "name",
        children: "cities",
        value: "cityid"
      },
      address: "",

      plans: [],
      planCount: 8,
      planTotalCount: 0,
      planLoading: false
    };
  },
  methods: {
    handleClick() {},
    search(start = 1) {
      if (this.city && this.address) {
        this.planLoading = true;
        kujialeService
          .getFloorPlan({
            start: start - 1,
            num: this.planCount,
            q: this.address,
            city_id: this.city
          })
          .then(res => {
            this.plans = res.result;
            this.planTotalCount = res.totalCount;
          })
          .finally(() => {
            this.planLoading = false;
          });
      }
    },
    changeCity(data) {
      this.city = data[1];
    }
  }
};
</script>

<style lang="less" scoped>
.add-plan-container {
  padding: 20px 0;
  /deep/ .el-tabs {
    .el-tabs__nav-scroll {
      display: flex;
      justify-content: center;
    }
    .el-tabs__active-bar {
      display: none;
    }
    .el-tabs__item {
      position: relative;
      padding: 0 20px !important;
      &::after {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        content: "";
        height: 2px;
        background: gray;
      }
    }
    .el-tabs__nav-wrap::after {
      width: 0 !important;
    }
  }
  /deep/ .input-wrapper {
    margin: 10px auto;
    width: 500px;
    .el-input-group__prepend {
      padding: 0;
      width: 100px;
      border: unset;
    }
  }
  .plan-list {
    display: flex;
    flex-wrap: wrap;
    .plan-item {
      width: 25%;
      list-style: none;
      .plan-card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 10px;
        width: calc(100% - 20px);
        border: 1px solid gray;
        box-shadow: 2px 2px gray;
        cursor: pointer;
        .plan-card-top {
          width: 100%;
          height: 200px;
          text-align: center;
          img {
            max-width: 100%;
            max-height: 100%;
          }
        }
        .plan-card-bottom {
          display: flex;
          flex-direction: column;
          width: 100%;
          padding: 20px;
          line-height: 20px;
          border-top: 1px solid gray;
          .house-type {
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
