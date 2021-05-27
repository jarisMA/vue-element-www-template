<template>
  <div class="card-wrapper" @click="handleEdit">
    <div class="card">
      <div class="card-top">
        <div class="card-top-left">
          <h3 class="card-top-title">{{ draft.title }}</h3>
        </div>
        <div class="card-top-right">
          <el-dropdown placement="top-end" trigger="hover">
            <i class="el-icon-more"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleEdit">
                <i class="el-icon-edit-outline"></i>
                <span>编辑</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-popconfirm
                  @confirm="handleDelete"
                  title="确定删除此草稿吗？"
                >
                  <div slot="reference">
                    <i class="el-icon-delete"></i>
                    <span>删除</span>
                  </div>
                </el-popconfirm>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="card-content" v-if="draft.content">
        <p>{{ draft.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyDraftCard",
  props: {
    draft: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleEdit() {
      this.$emit("edit");
    },
    handleDelete() {
      this.$emit("delete");
    }
  }
};
</script>

<style lang="less" scoped>
.card-wrapper {
  width: 100%;
  cursor: pointer;
  .card {
    padding: 16px 0;
    border-bottom: 1px solid #efefef;
    .card-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      .card-top-left {
        .card-top-title {
          line-height: 24px;
          font-weight: 600;
          font-size: 16px;
          color: #2c3330;
        }
      }
      .card-top-right {
        .el-icon-more {
          cursor: pointer;
        }
      }
    }
    .card-content {
      margin-top: 4px;
      line-height: 24px;
      font-size: 14px;
      color: #606c66;
    }
  }
}
</style>
