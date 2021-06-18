<template>
  <div class="vip-section">
    <div class="vip-top">
      <div class="vip-top-left">
        <div class="vip-top-left-header">
          <p class="vip-top-left-title">
            {{
              !isVip() && !userInfo.vip_expired
                ? "还没有成为家计划·会员"
                : isVip() && !userInfo.vip_expired
                ? `家计划·会员已过期${dateCompare(
                    new Date().valueOf(),
                    userInfo.vip_expired
                  )}天`
                : `家计划·会员剩余${dateCompare(
                    userInfo.vip_expired,
                    new Date().valueOf()
                  )}天`
            }}
          </p>
          <span class="vip-top-left-text" v-if="isVip()"
            >{{
              formatDate(userInfo.vip_expired, (format = "YYYY.MM.DD"))
            }}到期</span
          >
        </div>
        <el-progress
          v-if="isVip() && userInfo.vip_expired && false"
          :percentage="50"
          class="vip-top-left-bar"
        ></el-progress>
        <button class="vip-top-left-btn" @click="goVip('_self')">
          {{ isVip() ? "续费" : "成为会员" }}
        </button>
      </div>
    </div>
    <div class="vip-not-member-body" v-if="!isVip()">
      <p class="vip-not-member-body-top">成为会员可享受</p>
      <div class="vip-not-member-body-btm">
        <div class="vip-not-member-body-btm-left">
          <img
            class="vip-not-member-body-btm-img"
            src="~/images/my/video.svg"
          />
          <span class="vip-not-member-body-btm-text">付费课程免费看</span>
        </div>
        <div class="vip-not-member-body-btm-right">
          <img
            class="vip-not-member-body-btm-img img-left"
            src="~/images/my/plango.svg"
          /><span class="vip-not-member-body-btm-text">PlanGo工具开放使用</span>
        </div>
        <button class="vip-not-member-btn" @click="goVip('_self')">
          成为会员 &rarr;
        </button>
      </div>
    </div>

    <div class="vip-body">
      <p class="vip-body-top">
        {{
          isVip() && userInfo.vip_expired
            ? "可享受权益"
            : "续费会员后可享受权益"
        }}
      </p>
      <div v-if="isVip()">
        <div class="vip-body-btm-left">
          <img src="~/images/my/video.svg" /><span class="vip-body-btm-text"
            >付费课程免费看</span
          >
        </div>
        <div class="vip-body-btm-right">
          <img src="~/images/my/plango.svg" /><span class="vip-body-btm-text"
            >PlanGo工具开放使用</span
          >
        </div>
      </div>
    </div>
    <div class="vip-btm" v-if="isVip()">
      <p class="vip-btm-top">会员历史记录</p>
      <el-table :data="history" class="vip-btm-btm">
        <el-table-column
          prop="created_at"
          label="购买日期"
          min-width="20%"
        ></el-table-column>
        <el-table-column
          prop="vip_type"
          label="VIP类型"
          min-width="15%"
        ></el-table-column>
        <el-table-column
          prop="start_at"
          label="开始日期"
          min-width="20%"
        ></el-table-column>
        <el-table-column
          prop="expired_at"
          label="结束日期"
          min-width="20%"
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          min-width="25%"
        ></el-table-column>
      </el-table>
      <pagination
        :class="['pagination-wrapper']"
        :pageSize="size"
        :current-page="page"
        :total="total"
        @change-page="getData"
      />
    </div>
  </div>
</template>

<script>
import vipService from "service/vip";
import Pagination from "components/Pagination";
import { goVip } from "utils/routes";
import { isVip } from "utils/function";
import { mapState } from "vuex";
import { dateCompare, formatDate } from "utils/moment";

export default {
  components: { Pagination },
  name: "MyVip",

  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      history: [],
      size: 4,
      page: 1,
      total: 0
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    goVip,
    isVip,
    dateCompare,
    formatDate,
    getData(start = 1) {
      this.$emit("update:loading", true);
      vipService
        .myHistory({
          page_size: this.size,
          page: start
        })
        .then(res => {
          this.history = res.list;
          this.total = res.pagination.total;
          this.page = start;
        })
        .finally(() => {
          this.$emit("update:loading", false);
        });
    }
  },

  created() {
    this.getData();
  }
};
</script>

<style lang="less" scoped>
.vip-section {
  position: relative;
  width: 100%;
  height: 100%;

  .vip-top {
    display: flex;
    justify-content: space-between;
    padding: 40px;
    width: 980px;
    height: 208px;
    background-image: url(~images/my/bg.png);

    .vip-top-left-title {
      display: inline-block;
      line-height: 30px;
      font-weight: 600;
      font-size: 32px;
      color: #ffffff;
    }

    .vip-top-left-text {
      line-height: 24px;
      margin-left: 16px;
      font-size: 16px;
      color: #ffffff;
    }

    .vip-top-left-bar {
      margin: 15px 0px;
      width: 700px;
      color: #ffffff;
    }

    /deep/ .el-progress__text {
      display: none;
    }

    /deep/ .el-progress-bar__outer {
      background-color: rgba(255, 255, 255, 0.3);
    }
    /deep/ .el-progress-bar__inner {
      background-color: #ffffff;
    }

    .vip-top-left-btn {
      margin-top: 24px;
      padding: 12px 32px;
      font-weight: 600;
      font-size: 16px;
      color: #14af64;
      border: none;
      background: #ffffff;
      cursor: pointer;
    }
  }
  .vip-body {
    padding: 40px 0px;

    .vip-body-top {
      line-height: 34px;
      margin-bottom: 26px;
      font-weight: 600;
      font-size: 24px;
      color: #2c3330;
    }

    .vip-body-btm-left {
      display: inline-flex;
      align-items: center;
    }

    .vip-body-btm-right {
      display: inline-flex;
      align-items: center;
      margin-left: 100px;
    }

    .vip-body-btm-text {
      line-height: 24px;
      margin-left: 27px;
      font-size: 16px;
      text-align: center;
      color: #606c66;
    }
  }

  .vip-btm-top {
    line-height: 34px;
    margin-bottom: 26px;
    font-weight: 600;
    font-size: 24px;
    color: #2c3330;
  }

  .vip-btm-btm {
    font-size: 14px;
    line-height: 20px;
    color: #606c66;
  }

  .pagination-wrapper {
    position: absolute;
    top: 750px;
    left: 300px;
    z-index: 999;
  }
}

.vip-top-left-text {
  line-height: 45px;
  display: inline-block;
  font-weight: 600;
  font-size: 32px;
  color: #ffffff;
}

.vip-not-member-body {
  padding: 40px 0px;

  .vip-not-member-body-top {
    line-height: 45px;
    margin-bottom: 26px;
    font-weight: 600;
    font-size: 32px;
    color: #2c3330;
  }

  .vip-not-member-body-btm {
    display: flex;
    align-items: center;
  }

  .vip-not-member-body-btm-img {
    width: 150px;
    height: 80px;
  }

  .img-left {
    margin-left: 90px;
  }

  .vip-not-member-body-btm-left {
    display: inline-block;
    padding: 45px 90px;
    width: 330px;
    height: 210px;
    background: #fafafa;
  }

  .vip-not-member-body-btm-right {
    display: inline-block;
    margin-left: 20px;
    padding-top: 45px;
    width: 330px;
    height: 210px;
    background: #fafafa;
  }

  .vip-not-member-body-btm-text {
    display: block;
    line-height: 24px;
    margin-top: 25px;
    font-size: 20px;
    text-align: center;
    color: #606c66;
  }

  .vip-not-member-btn {
    display: inline-block;
    line-height: 56px;
    width: 188px;
    height: 56px;
    margin-left: 56px;
    font-weight: 600;
    font-size: 16px;
    color: #14af64;
    background-color: #ffffff;
    border: 1px solid #14af64;
  }
}
</style>
