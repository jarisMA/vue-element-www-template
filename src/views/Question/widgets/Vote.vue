<template>
  <div
    :class="[
      'vote-wrapper',
      !question.authVote &&
      question.vote.resource_type === VOTE_RESOURCE_TYPE_PIC &&
      closeDayDiff > 0
        ? 'larger'
        : ''
    ]"
  >
    <template v-if="!question.authVote && closeDayDiff > 0">
      <div
        class="vote-word-wrapper"
        v-if="question.vote.resource_type === VOTE_RESOURCE_TYPE_WORD"
      >
        <div class="vote-list">
          <div
            :class="[
              'vote-item',
              selected.indexOf(option.id) > -1 ? 'active' : ''
            ]"
            v-for="(option, key) of question.vote_options"
            :key="option.id"
            @click="handleOptionSelect(option.id)"
          >
            <label class="vote-label">{{ VOTE_OPTION_INDEX[key] }}</label>
            <span class="vote-value">{{ option.title }}</span>
            <i class="el-icon-check"></i>
          </div>
        </div>
      </div>
      <div
        class="vote-pic-wrapper"
        v-if="question.vote.resource_type === VOTE_RESOURCE_TYPE_PIC"
      >
        <div class="vote-list">
          <div
            :class="[
              'vote-item',
              selected.indexOf(option.id) > -1 ? 'active' : ''
            ]"
            v-for="(option, key) of question.vote_options"
            :key="option.id"
            @click="handleOptionSelect(option.id)"
          >
            <div
              class="vote-item-top"
              :style="{ backgroundImage: `url(${option.image_url})` }"
            ></div>
            <div class="vote-item-bottom">
              <label class="vote-label">{{ VOTE_OPTION_INDEX[key] }}</label>
              <span class="vote-value">{{ option.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div class="vote-result-wrapper" v-else>
      <div class="vote-list">
        <div
          :class="[
            'vote-item',
            selected.indexOf(option.id) > -1 ? 'active' : ''
          ]"
          v-for="(option, key) of question.vote_options"
          :key="option.id"
        >
          <div class="vote-item-content">
            <label class="vote-label">
              {{ VOTE_OPTION_INDEX[key] }}
            </label>
            <div
              v-if="question.vote.resource_type === VOTE_RESOURCE_TYPE_PIC"
              class="vote-img"
              :style="{ backgroundImage: `url(${option.image_url})` }"
            ></div>
            <span class="vote-value">{{ option.title }}</span>
          </div>
          <div class="vote-item-footer">
            <div
              class="vote-item-progress"
              :style="{ width: precent(option.vote_count) + '%' }"
            ></div>
            <span
              class="
                 vote-footer-text"
              >{{ option.vote_count }}票</span
            >
            <span class="vote-footer-text"
              >{{ precent(option.vote_count) }}%</span
            >
          </div>
        </div>
      </div>
    </div>
    <p class="vote-tip">
      {{
        closeDayDiff > 0
          ? question.vote_user_count + "人参与，还有" + closeDayDiff + "天结束"
          : "投票已结束，共" + question.vote_user_count + "人参与"
      }}
    </p>
    <div
      class="vote-btn"
      v-if="!question.authVote && closeDayDiff > 0"
      @click="handleVote"
    >
      投票
    </div>
  </div>
</template>

<script>
import {
  VOTE_OPTION_INDEX,
  VOTE_TYPE_MULTI,
  VOTE_RESOURCE_TYPE_WORD,
  VOTE_RESOURCE_TYPE_PIC
} from "utils/const";
import { getCalDate, dateCompare } from "utils/moment";

export default {
  name: "QuestionVote",
  props: {
    question: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      VOTE_OPTION_INDEX,
      VOTE_RESOURCE_TYPE_WORD,
      VOTE_RESOURCE_TYPE_PIC,
      selected: []
    };
  },
  watch: {
    question: {
      handler() {
        this.getSelected();
      },
      deep: true
    }
  },
  computed: {
    closeDayDiff() {
      const vote_closed_at = this.question.vote.vote_closed_at;
      return dateCompare(
        getCalDate(vote_closed_at.replace(/-/g, "/"), 0).replace(/-/g, "/") +
          " 23:59:59",
        new Date()
      );
    },
    totalVotes() {
      return this.question.vote_options.reduce(function(prev, next) {
        return prev + next.vote_count;
      }, 0);
    },
    precent() {
      return count => {
        const total = this.totalVotes;
        if (total <= 0) {
          return 0;
        }
        return Math.floor((count * 100) / total);
      };
    }
  },
  created() {
    this.getSelected();
  },
  methods: {
    getSelected() {
      const question = this.question;
      if (question && question.authVote) {
        this.selected = question.authVote.option_ids
          .split(",")
          .map(item => parseInt(item));
      } else {
        this.selected = [];
      }
    },
    handleOptionSelect(id) {
      if (this.question.authVote || this.closeDayDiff < 1) {
        return;
      }
      const { vote_type } = this.question.vote;
      if (vote_type === VOTE_TYPE_MULTI) {
        const inSelectedIndex = this.selected.indexOf(id);
        inSelectedIndex > -1
          ? this.selected.splice(inSelectedIndex, 1)
          : this.selected.push(id);
      } else {
        this.selected = [id];
      }
    },
    handleVote() {
      if (this.selected.length < 1) {
        this.$notice({
          title: "至少选择一项投票",
          type: "warning"
        });
        return;
      }
      this.$emit("vote", this.selected);
    }
  }
};
</script>

<style lang="less" scoped>
@import "~styles/variable";

.vote-wrapper {
  width: 660px;
  margin: auto;
  .larger {
    width: 730px;
  }
  .vote-tip {
    line-height: 1;
    font-size: 12px;
    color: #8ea098;
  }
  .vote-btn {
    width: 100%;
    height: 38px;
    margin-top: 24px;
    line-height: 38px;
    color: #fff;
    text-align: center;
    background: @primaryColor;
    cursor: pointer;
  }
}
.vote-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .vote-item {
    position: relative;
    margin-bottom: 16px;
    .vote-label {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin-right: 16px;
      line-height: 24px;
      font-weight: 500;
      font-size: 14px;
      color: #2c3330;
      text-align: center;
      background: #eeeeee;
      border: 1px solid #dddddd;
    }
    .vote-value {
      line-height: 24px;
      font-size: 14px;
      color: #2c3330;
    }
  }
}
.vote-word-wrapper {
  .vote-list {
    .vote-item {
      width: 322px;
      padding: 15px;
      background: #fafafa;
      border: 1px solid #efefef;
      cursor: pointer;
      &.active {
        background: linear-gradient(
            0deg,
            rgba(20, 175, 100, 0.07),
            rgba(20, 175, 100, 0.07)
          ),
          #ffffff;
        border-color: @primaryColor;
        .vote-label {
          color: #fff;
          background: @primaryColor;
          border-color: @primaryColor;
        }
        .el-icon-check {
          display: inline-block;
        }
      }
      &:hover {
        background: #f4f4f4;
      }
      .vote-label {
        cursor: pointer;
      }
      .el-icon-check {
        position: absolute;
        right: 20px;
        top: 50%;
        display: none;
        font-weight: 600;
        font-size: 17px;
        color: @primaryColor;
        transform: translate(0, -50%);
      }
    }
  }
}
.vote-pic-wrapper {
  .vote-list {
    justify-content: flex-start;
    .vote-item {
      width: 238px;
      background: #fafafa;
      border: 1px solid #efefef;
      cursor: pointer;
      &:nth-child(3n-1) {
        margin-left: 8px;
        margin-right: 8px;
      }
      &.active {
        position: relative;
        background: linear-gradient(
            0deg,
            rgba(20, 175, 100, 0.07),
            rgba(20, 175, 100, 0.07)
          ),
          #ffffff;
        border-color: @primaryColor;
        .vote-label {
          color: #fff;
          background: @primaryColor;
          border-color: @primaryColor;
        }
        &::after {
          position: absolute;
          top: 0;
          right: 0;
          width: 40px;
          height: 40px;
          content: "";
          background: url("~images/question/selected1.svg") no-repeat;
        }
      }
      .vote-item-top {
        width: 100%;
        height: 236px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      }
      .vote-item-bottom {
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        padding: 0 8px;
        .vote-label {
          cursor: pointer;
        }
      }
    }
  }
}
.vote-result-wrapper {
  .vote-list {
    .vote-item {
      width: 322px;
      border: 1px solid #efefef;
      &.active {
        border-color: @primaryColor;
        .vote-item-content {
          background: #eff9f4;
        }
        .vote-label {
          color: #fff;
          background: @primaryColor;
          border-color: @primaryColor;
        }
      }
      .vote-item-content {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 15px;
        background: #fafafa;
        border: 1px solid #efefef;
        .vote-img {
          width: 40px;
          height: 40px;
          margin-right: 8px;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        }
      }
      .vote-item-footer {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 16px;
        padding: 0 2px;
        .vote-item-progress {
          position: absolute;
          left: 0;
          width: 0%;
          height: 100%;
          background: #baddcc;
        }
        .vote-footer-text {
          position: relative;
          line-height: 1;
          font-weight: 500;
          font-size: 12px;
          color: #2c3330;
          z-index: 1;
        }
      }
    }
  }
}
</style>
