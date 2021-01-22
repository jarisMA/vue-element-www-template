<template>
  <div class="attach-wrapper">
    <ul class="attach-list" v-if="attaches.length > 0">
      <li class="list-th">
        <div class="list-th-label type">类型</div>
        <label class="list-th-label w-360">资料名</label>
        <label class="list-th-label w-380">描述</label>
        <label class="list-th-label w-80">大小</label>
        <label class="list-th-label w-96">操作</label>
      </li>
      <li v-for="attach of attaches" :key="attach.id">
        <attach-card
          :attach="attach"
          @copy="value => showDialog(attach, value)"
          @download="download(attach)"
        />
      </li>
    </ul>
    <the-empty noText="暂时还没资料分享" v-else-if="!loading" />
    <edit-plan-name-dialog
      type="copy"
      :visible.sync="visible"
      :plan="plan"
      :btnLoading="btnLoading"
      :title="dialogTitle"
      :showDesc="false"
      @confirm="editPlanInfo"
      @beforeClose="beforeCloseDialog"
    />
  </div>
</template>

<script>
import AttachCard from "./AttachCard";
import kujialeService from "service/kujiale";

import EditPlanNameDialog from "components/EditPlanNameDialog";

import { saveAs } from "file-saver";
import TheEmpty from "components/TheEmpty.vue";

export default {
  name: "TermAttach",
  components: {
    AttachCard,
    EditPlanNameDialog,
    TheEmpty
  },
  props: {
    attaches: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      visible: false,
      dialogTitle: "复制方案",
      plan: {
        planPic: ""
      },
      btnLoading: false
    };
  },
  methods: {
    showDialog(data) {
      this.plan = data;
      this.plan.planPic = data.design_cover_url;
      this.visible = true;
    },
    editPlanInfo(value) {
      if (!value) {
        return;
      }
      const data = this.plan;
      this.btnLoading = true;
      kujialeService
        .copyDesign(data.design_id, {
          name: value
        })
        .then(() => {
          this.$notice({
            type: "success",
            title: "方案复制成功~"
          });
          this.visible = false;
        })
        .finally(() => {
          this.btnLoading = false;
        });
    },
    beforeCloseDialog(done) {
      if (this.btnLoading) {
        return;
      }
      done && done();
    },
    download(data) {
      /* eslint-disable */
      saveAs(data.url, data.name)
    }
  }
}
</script>

<style lang='less' scoped>
@padding: 20px;
.attach-wrapper {
  // margin-top: 16px;
}
.attach-list {
  width: 100%;
  padding: 0 10px;
}
.list-th {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 20px;
  .list-th-label {
    display: inline-block;
    line-height: 16px;
    font-size: 14px;
    font-weight: 400;
    color: #9b9b9b;

    &.type {
      width: 80px;
      margin-right: @padding;
      text-align: center;
    }
    &.w-360 {
      width: 360px;
      margin-right: @padding;
    }
    &.w-380 {
      width: 380px;
      margin-right: @padding;
    }
    &.w-80 {
      width: 80px;
      margin-right: 84px;
      text-align: center;
    }
    &.w-96 {
      width: 96px;
      text-align: left;
    }
  }
}
</style>