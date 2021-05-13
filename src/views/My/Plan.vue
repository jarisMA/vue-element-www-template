<template>
  <div class="my-plan-page" v-loading="loading">
    <div class="container-1180">
      <div class="page-header">
        <span class="page-header-title">工作台</span>
        <div :class="['page-header-search_wrapper', !showSearch ? 'hide' : '']">
          <div class="page-header-search_bar">
            <label class="search-icon" @click="handleToggleShowSearch"></label>
            <input
              placeholder="在工作台搜索..."
              class="page-header-search_input"
              placeholder-class="page-header-search_input_placeholder"
              v-model="keyword"
              @keyup.enter="getPlan()"
              @blur="handleToggleShowSearch()"
              ref="searchInput"
            />
          </div>
        </div>
      </div>

      <plan-list
        canDelete
        :showNoTips="false"
        :plans="plans"
        :size="planCount"
        :page="planPage"
        :total="planTotalCount"
        theme="my"
        @itemClick="editPlan"
        @copyClick="copyPlan"
        @editClick="isEditPlanInfo"
        @delete="delelePlan"
        @pageChange="getPlan"
        @add="addPlan"
      />
    </div>
    <edit-plan-name-dialog
      :visible.sync="addVisible"
      :plan="plan"
      :btnLoading="btnLoading"
      :title="dialogTitle"
      @confirm="editPlanInfo"
      @beforeClose="beforeCloseDialog"
    />
  </div>
</template>

<script>
import PlanList from "components/PlanList";
import EditPlanNameDialog from "components/EditPlanNameDialog";
import kujialeService from "service/kujiale";
import { goEditPlan, goDrawPlan } from "utils/routes";
import { mapState } from "vuex";
import { isVip } from "utils/function";

export default {
  name: "MyPlan",
  components: {
    PlanList,
    EditPlanNameDialog
  },
  data() {
    return {
      loading: true,
      pardon: false,
      keyword: "",
      plans: [],
      planCount: 11,
      planPage: 1,
      planTotalCount: 0,
      addVisible: false,
      dialogTitle: "编辑方案",
      plan: {
        specName: "",
        planPic: "",
        srcArea: "",
        commName: "",
        city: ""
      },
      btnLoading: false,
      count: 0,
      editType: 1, // 1为编辑，2为复制
      showSearch: false
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (["EditPlan", "DrawPlan"].indexOf(from.name) > -1) {
        vm.pardon = true;
      }
    });
  },
  computed: {
    ...mapState(["userInfo"])
  },
  created() {
    this.getPlan();
    const timer = setTimeout(() => {
      if (this.pardon) {
        this.getPlan();
      }
      clearTimeout(timer);
    }, 1000);
  },
  methods: {
    goDrawPlan,
    getPlan(start = 1) {
      this.loading = true;
      kujialeService
        .designList({
          keyword: this.keyword || null,
          page: start,
          page_size: this.planCount
        })
        .then(res => {
          this.planTotalCount = res.totalCount;
          this.plans = res.result;
          this.planPage = start;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    addPlan() {
      if (this.plans.length > 0 && !isVip()) {
        this.$notice({
          type: "warning",
          title: "oops～方案创建数量已达上限"
        });
      } else {
        goDrawPlan();
      }
    },
    editPlan(data) {
      goEditPlan({
        designId: data.designId
      });
    },
    delelePlan(index, plan) {
      this.$msgBox
        .showMsgBox({
          theme: "img_s_420_274",
          content:
            "<p style='color:#14AF64FF;font-weight:400;font-size:24px;line-height:33px;'>确认删除方案</p>",
          showCloseBtn: false
        })
        .then(async () => {
          kujialeService
            .deleteDesign({
              plan_id: plan.planId
            })
            .then(() => {
              this.$notice({
                type: "success",
                title: "删除成功"
              });
              this.plans.splice(index, 1);
            });
        })
        .catch(() => {
          // ...
        });
    },
    beforeCloseDialog(done) {
      if (this.btnLoading) {
        return;
      }
      done();
    },
    copyPlan(data) {
      this.dialogTitle = "复制方案";
      this.plan = data;
      this.editType = 2;
      this.addVisible = true;
    },
    isEditPlanInfo(index, data) {
      this.dialogTitle = "编辑方案";
      this.plan = { ...data, index };
      this.editType = 1;
      this.addVisible = true;
    },

    editPlanInfo(value) {
      if (!value) {
        return;
      }
      const data = this.plan;
      this.btnLoading = true;
      if (this.editType === 1) {
        kujialeService
          .updateDesignName(data.planId, {
            name: value
          })
          .then(() => {
            this.addVisible = false;
            this.plans[data.index].name = value;
            this.$notice({
              type: "success",
              title: "方案编辑成功"
            });
          })
          .finally(() => {
            this.btnLoading = false;
          });
      } else {
        kujialeService
          .copyDesign(data.planId, {
            name: value
          })
          .then(() => {
            this.addVisible = false;
            this.$emit("update:loading", true);
            this.$notice({
              type: "success",
              title: "方案复制成功"
            });
            const timer = setTimeout(() => {
              this.getPlan();
              clearTimeout(timer);
            }, 2000);
          })
          .finally(() => {
            this.btnLoading = false;
          });
      }
    },
    handleToggleShowSearch() {
      if (!this.showSearch) {
        this.showSearch = true;
        this.$nextTick(() => {
          this.$refs["searchInput"].focus();
        });
      } else {
        if (this.keyword == "") {
          this.showSearch = false;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable.less";
.my-plan-page {
  width: 100%;
  height: 100%;
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 34px 0 16px 0;
    .page-header-title {
      font-weight: 600;
      font-size: 20px;
      line-height: 28px;
      color: #2c3330;
    }
    .page-header-search_wrapper {
      width: 280px;
      transition: width 0.2s;
      overflow: hidden;
      &.hide {
        width: 34px;
        .page-header-search_bar {
          background-color: transparent;
          .search-icon {
            background-color: #2c3330;
            cursor: pointer;
          }
        }
      }
      .page-header-search_bar {
        display: flex;
        align-items: center;
        width: 280px;
        height: 40px;
        padding: 8px;
        background-color: rgba(0, 0, 0, 0.03);
        .search-icon {
          display: inline-block;
          height: 24px;
          width: 24px;
          mask-image: url("~images/my/search.svg");
          mask-repeat: no-repeat;
          mask-size: cover;
          background: #81948b;
        }
        .page-header-search_input {
          width: 280px;
          height: 100%;
          margin-left: 10px;
          line-height: 20px;
          color: #2c3330;
          outline: none;
          border: 0;
          background: rgba(0, 0, 0, 0);
        }
        .page-header-search_input_placeholder {
          font-size: 14px;
          color: #999999;
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
    list-style: none;
    .plan-card {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px;
      width: calc(100% - 20px);
      height: 200px;
      border: 1px solid gray;
      box-shadow: 2px 2px gray;
      cursor: pointer;
    }
  }
}
</style>
