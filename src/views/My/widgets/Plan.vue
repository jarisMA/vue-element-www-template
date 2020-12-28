<template>
  <div class="my-plan-container">
    <!-- <div class="add-btn-wrapper">
      <el-button class="add-btn" type="primary" @click="addPlan">
        <icon-svg svg-class="add-icon" svg-name="add" />
        <span>新建方案</span>
      </el-button>
    </div> -->
    <plan-list canDelete
               :showNoTips="false"
               :plans="plans"
               :size="planCount"
               :page="planPage"
               :total="planTotalCount"
               theme="my"
               @itemClick="editPlan"
               @editClick="isEditPlanInfo"
               @delete="delelePlan"
               @pageChange="getPlan"
               @add="addPlan" />
    <edit-plan-name-dialog :visible.sync="addVisible"
                           :plan="plan"
                           :btnLoading="btnLoading"
                           @confirm="editPlanInfo"
                           @beforeClose="beforeCloseDialog" />
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
    }
  },
  data () {
    return {
      plans: [],
      planCount: 16,
      planPage: 1,
      planTotalCount: 0,
      addVisible: false,
      plan: {
        specName: "",
        planPic: "",
        srcArea: "",
        commName: "",
        city: ""
      },
      btnLoading: false,
      pardon: false
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  beforeRoute (to, from, next) {
    if (["EditPlan", "DrawPlan"].indexOf(from.name) > -1) {
      this.pardon = true;
    }
    next();
  },
  created () {
    this.getPlan();
    if (this.pardon) {
      const timer = setTimeout(() => {
        this.getPlan();
        clearTimeout(timer);
      }, 1000);
    }
  },
  methods: {
    goDrawPlan,
    getPlan (start = 1) {
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
    addPlan () {
      if (this.plans.length > 0 && this.userInfo.kujiale_type !== 1) {
        this.$notice({
          type: "warning",
          title: "oops～方案创建数量已达上限"
        });
      } else {
        goDrawPlan();
      }
    },
    editPlan (data) {
      goEditPlan({
        designId: data.designId
      });
    },
    delelePlan (index, plan) {
      this.$msgBox
        .showMsgBox({
          width: 400,
          height: 270,
          theme: 'img_h_80pc',
          content: "<p style='color:#333;font-weight:bold;'>确认删除方案</p>"
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
    beforeCloseDialog (done) {
      if (this.btnLoading) {
        return;
      }
      done();
    },
    isEditPlanInfo (index, data) {
      this.plan = { ...data, index };
      this.addVisible = true;
    },
    editPlanInfo (value) {
      if (!value) {
        return;
      }
      const data = this.plan;
      this.btnLoading = true;
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
