<template>
  <div class="attach-wrapper">
    <ul class="attach-list" v-if="attaches.length > 0">
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
  padding-top: @padding;
}
.attach-list {
  width: 100%;
  padding: 0 20px;
  li + li {
    border-top: 1px solid #efefef;
  }
}
</style>