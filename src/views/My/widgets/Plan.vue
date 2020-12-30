<template>
  <div class="my-plan-container">
    <!-- <div class="add-btn-wrapper">
      <el-button class="add-btn" type="primary" @click="addPlan">
        <icon-svg svg-class="add-icon" svg-name="add" />
        <span>新建方案</span>
      </el-button>
    </div> -->
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

export default {
  name: "MyPlan",
  components: {
    PlanList,
    EditPlanNameDialog
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    pardon: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      plans: [],
      planCount: 16,
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
      editType: 1 // 1为编辑，2为复制
    };
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
      this.$emit("update:loading", true);
      kujialeService
        .designList({
          page: start,
          page_size: this.planCount
        })
        .then(res => {
          this.planTotalCount = res.totalCount;
          this.plans = res.result;
          this.planPage = start;
        })
        .finally(() => {
          this.$emit("update:loading", false);
        });
    },
    addPlan() {
      if (this.plans.length > 0 && this.userInfo.kujiale_type !== 1) {
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
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable.less";
.my-plan-container {
  padding: 20px 0;
}
.add-btn-wrapper {
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
  .add-btn {
    width: 118px;
    height: 32px;
    line-height: 32px;
    padding: 0;
    font-size: 14px;
    font-weight: 500;
    border-radius: unset;
    .add-icon {
      font-size: 12px;
      margin: 0 4px 1px 0;
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
