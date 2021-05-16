<template>
  <div class="container">
    <div class="header">
      <div class="header-left">
        <h5 class="header-title">
          <i class="pageback-icon" @click="handleBack"></i>
          暖心记录
        </h5>
        <div class="picker">
          {{ getDateShow(date) }}
          <img class="drop-icon" src="~/images/my/drop_downS.svg" />
          <el-date-picker
            v-model="date"
            type="month"
            format="M月"
            value-format="yyyy-MM"
            :clearable="false"
            @change="getData()"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="total">
        <div class="total-item">
          <span>增加 {{ getAddTotal }}</span>
        </div>
        <div class="total-item">
          <span>消耗 {{ getSubTotal }}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="gain" v-for="gain of gains" :key="gain.id">
        <div class="gain-left">
          <span class="gain-title">{{ gain.remark }}</span>
          <span class="gain-time">{{ gain.created_at }}</span>
        </div>
        <div :class="['gain-right', gain.number > 0 ? '' : 'sub']">
          <span>{{ gain.number > 0 ? "+" : "" }}{{ gain.number }}</span>
        </div>
      </div>
      <pagination
        layout="prev, pager, next"
        :class="['pagination-wrapper']"
        :pageSize="pagination.size"
        :current-page="pagination.page"
        :total="pagination.total"
        :paginationLayout="pagination.layout"
        @change-page="getData"
      />
    </div>
  </div>
</template>

<script>
import Pagination from "components/Pagination";
import userService from "service/user";

export default {
  name: "MyGainHistory",
  components: { Pagination },
  data() {
    return {
      date:
        new Date().getFullYear() +
        "-" +
        ("0" + (new Date().getMonth() + 1)).substr(-2),
      gains: [],
      pagination: {
        size: 5,
        page: 1,
        total: 0,
        layout: { small: true }
      }
    };
  },
  created() {
    this.getData();
  },
  computed: {
    getDateShow() {
      return date => {
        return new Date(date).getMonth() + 1 + "月";
      };
    },
    getAddTotal() {
      return this.gains.reduce(function(pre, cur) {
        return pre + (cur.number > 0 ? cur.number : 0);
      }, 0);
    },
    getSubTotal() {
      return this.gains.reduce(function(pre, cur) {
        return pre + (cur.number < 0 ? Math.abs(cur.number) : 0);
      }, 0);
    }
  },
  methods: {
    getData(start = 1) {
      userService
        .gainHistory({
          date: this.date,
          paged: true,
          page: start,
          page_size: this.pagination.size
        })
        .then(res => {
          this.gains = res.list;
          this.pagination.page = start;
          this.pagination.total = res.pagination.total;
        });
    },
    handleBack() {
      this.$emit("back");
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px 20px;
  width: 100%;
  .header-left {
    display: flex;
    align-items: center;
    .header-title {
      display: flex;
      align-items: center;
      margin-right: 16px;
      line-height: 28px;
      font-weight: 600;
      font-size: 20px;
      .pageback-icon {
        margin-right: 8px;
        display: inline-block;
        width: 24px;
        height: 24px;
        background-image: url("~images/my/pageback.svg");
        background-repeat: no-repeat;
        background-size: cover;
        cursor: pointer;
      }
    }
  }
}
.picker {
  position: relative;
  display: flex;
  align-items: center;
  line-height: 1;
  font-size: 14px;
  color: #81948b;
  overflow: hidden;
  cursor: pointer;
  /deep/ .el-date-editor {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
.drop-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.total {
  display: flex;
  align-items: center;
  line-height: 1;
  font-size: 14px;
  color: #2c3330;
}

.total-item + .total-item {
  margin-left: 20px;
}

.content {
  width: 100%;
  padding: 0 20px 0 52px;
}

.gain {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px 0;
}
.gain-left {
  display: flex;
  flex-direction: column;
}
.gain-title {
  line-height: 1;
  font-size: 16px;
  color: #2c3330;
}

.gain-time {
  margin-top: 10px;
  line-height: 1;
  font-size: 12px;
  color: #8ea098;
}

.gain-right {
  line-height: 1;
  font-size: 22px;
  color: #14af64;
}

.gain-right.sub {
  color: #2c3330;
}
</style>
