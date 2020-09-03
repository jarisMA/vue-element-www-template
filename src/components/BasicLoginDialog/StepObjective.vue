<template>
  <div>
    <div class="step-objective_container" v-show="!studyObjectiveDisplay">
      <div class="identity-selector_container">
        <div class="header">
          <img
            src="~@/assets/images/home-logo.png"
            alt=""
            class="header-logo"
          />
        </div>
        <p class="title">请问您的身份是</p>
        <div class="content">
          <el-radio-group v-model="studyObjectiveDisplay">
            <div class="content-item">
              <el-radio-button label="家居爱好者"></el-radio-button>
            </div>
            <div class="content-item">
              <el-radio-button label="设计师"></el-radio-button>
            </div>
            <div class="content-item">
              <el-radio-button label="装修机构"></el-radio-button>
            </div>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="step-identity_container" v-show="studyObjectiveDisplay">
      <div class="header">
        <img
          @click="handleBack"
          src="~@/assets/images/tc-jjahz-fh@2x.png"
          alt=""
          class="header-logo"
        />
      </div>
      <p class="title">{{ objectiveIdentity.question }}</p>
      <div class="content">
        <div class="content-list">
          <div
            @click="handleSelectIdentity(item)"
            v-for="item in objectiveIdentity.children"
            :key="item.id"
            :class="[
              'content-item',
              objectiveIdentity.select === item.id ? 'content-item-active' : ''
            ]"
          >
            <div
              class="item-image"
              :style="{
                backgroundImage:
                  'url(' +
                  (objectiveIdentity.select === item.id
                    ? item.image_select
                    : item.image) +
                  ')'
              }"
            ></div>
            <p class="item-title">{{ item.name }}</p>
          </div>
        </div>
        <input
          v-model="otherObjective"
          @input="handleInput"
          class="decoration-company-input"
          placeholder="其他状况请写这里"
        />
      </div>
      <button
        @click="handleSubmit"
        :class="[
          'decoration-company-button',
          objectiveIdentity.select || otherObjective
            ? 'decoration-company-button-active'
            : ''
        ]"
      >
        确认
      </button>
    </div>
  </div>
</template>

<script type="text/javascript">
import userObjective from "@/datas/user_objective.js";

export default {
  data() {
    return {
      studyObjectiveDisplay: null,
      temp: {
        '家居爱好者': 0,
        '设计师': 1,
        '装修机构': 2
      },
      objectiveIdentity: {
        children: []
      },
      otherObjective: ""
    };
  },
  watch: {
    studyObjectiveDisplay(val) {
      if (val) {
        this.objectiveIdentity = userObjective[this.temp[val]];
      }
    }
  },
  methods: {
    // 返回身份选择
    handleBack() {
      this.studyObjectiveDisplay = null;
      this.otherObjective = "";
    },
    // 选择身份状态
    handleSelectIdentity(item) {
      this.objectiveIdentity.select = item.id;
      this.otherObjective = "";
    },
    // 输入其他目标
    handleInput() {
      this.objectiveIdentity.select = 0;
    },
    handleSubmit() {
      const objectiveIdentity = this.objectiveIdentity;
      const otherObjective = this.otherObjective;
      if (!objectiveIdentity.select && !otherObjective) {
        return;
      }
      this.$emit(
        "submit",
        objectiveIdentity.id,
        objectiveIdentity.select,
        otherObjective
      );
    }
  }
};
</script>
<style type="text/css" lang="less">
.step-objective_container {
  text-align: center;
  width: 416px;
  .header {
    text-align: left;
    .header-logo {
      width: 114px;
      height: 26px;
      margin: 30px 30px 0;
    }
  }
  .title {
    font-size: 26px;
    font-family: Noto Sans S Chinese;
    color: #000000;
    margin: 74px auto 62px;
  }
  .content {
    width: 326px;
    text-align: center;
    margin: 0 auto;
    padding-bottom: 74px;
    /deep/ .el-radio-group {
      width: 100%;
      .content-item {
        width: 100%;
        margin-bottom: 40px;
        .el-radio-button,
        .el-radio-button__orig-radio,
        .el-radio-button__inner {
          width: 100% !important;
          font-size: 16px;
          font-family: Noto Sans S Chinese;
          color: #999999;
        }
      }
      .is-active .el-radio-button__inner {
        background: #14af64;
        color: #fff;
      }
    }
  }
}
.step-identity_container {
  text-align: center;
  width: 416px;
  .header {
    text-align: left;
    .header-logo {
      width: 30px;
      height: 30px;
      margin: 25px 25px 0;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .title {
    margin: 55px auto 45px;
    font-size: 26px;
    font-family: Noto Sans S Chinese;
    color: #000000;
  }
  .content {
    .content-list {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 22px;
      .content-item {
        width: 164px;
        height: 167px;
        border: 1px solid rgba(125, 125, 125, 0.6);
        margin: 0 5.5px;
        text-align: center;
        padding-top: 19px;
        &:hover {
          cursor: pointer;
        }
        .item-title {
          font-size: 14px;
          font-family: Noto Sans S Chinese;
          color: #999999;
          margin-top: 10px;
        }
        .item-image {
          width: 108px;
          height: 108px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          margin: 0 auto;
        }
      }
      .content-item-active {
        border: 1px solid #14af64;
        .diy {
          background: url("~@/assets/images/tc-zxjg-sj-xz@2x.png") no-repeat
            center;
        }
        .study {
          background: url("~@/assets/images/tc-zxjg-zx-wxz@2x.png") no-repeat
            center;
        }
        .item-title {
          color: #14af64;
        }
      }
    }
    .decoration-company-input {
      width: 339px;
      height: 50px;
      background: #f4f4f4;
      outline: none;
      border: none;
      padding-left: 28px;
      font-size: 14px;
      font-family: Noto Sans S Chinese;
      color: #999999;
      border-radius: 2px;
      margin-bottom: 39px;
    }
  }
  .decoration-company-button {
    width: 200px;
    height: 40px;
    background: #999999;
    font-size: 20px;
    font-family: Noto Sans S Chinese;
    font-weight: 500;
    color: #ffffff;
    border: none;
    outline: none;
    margin-bottom: 63px;
    cursor: not-allowed;
    &:hover {
      box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
    }
  }
  .decoration-company-button-active {
    background: #14af64;
    cursor: pointer;
  }
}
</style>
