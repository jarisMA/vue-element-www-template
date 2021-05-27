<template>
  <div class="page">
    <div class="page-header">
      <div
        :class="['tab-item', activeTabIndex === 1 ? 'active' : '']"
        @click="handleTabChange(1)"
      >
        我参与的
      </div>
      <div
        :class="['tab-item', activeTabIndex === 2 ? 'active' : '']"
        @click="handleTabChange(2)"
      >
        我发布的
      </div>
      <div
        :class="['tab-item', activeTabIndex === 3 ? 'active' : '']"
        @click="handleTabChange(3)"
      >
        我收藏的
      </div>
      <div
        :class="['tab-item', activeTabIndex === 4 ? 'active' : '']"
        @click="handleTabChange(4)"
      >
        优质回答
      </div>
      <div
        :class="['tab-item', activeTabIndex === 5 ? 'active' : '']"
        @click="handleTabChange(5)"
      >
        我的草稿
      </div>
    </div>
    <div class="page-content">
      <template v-if="activeTabIndex === 1">
        <answer-card
          v-for="(answer, index) of myAnswers.list"
          :key="answer.id"
          :answer="answer"
          @delete="handelAnswerDelete(index, 'myAnswers')"
        />
        <pagination
          class="pagination-wrapper"
          :pageSize="pageSize"
          :current-page="myAnswers.pagination.page"
          :total="myAnswers.pagination.total"
          @change-page="getMyAnswers"
        />
        <div class="end-wrapper" v-if="!loading && myAnswers.list.length < 1">
          <the-empty noText="这里还没有内容" />
        </div>
      </template>
      <template v-if="activeTabIndex === 2">
        <question-card
          v-for="(question, index) of myQuestions.list"
          mine
          :key="question.id"
          :question="question"
          @delete="handelQuestionDelete(index)"
        />
        <pagination
          class="pagination-wrapper"
          :pageSize="pageSize"
          :current-page="myQuestions.pagination.page"
          :total="myQuestions.pagination.total"
          @change-page="getMyQuestions"
        />
        <div class="end-wrapper" v-if="!loading && myQuestions.list.length < 1">
          <the-empty noText="这里还没有内容" />
        </div>
      </template>
      <template v-if="activeTabIndex === 3">
        <question-card
          v-for="(question, index) of myFavorites.list"
          :key="question.id"
          :question="question.resource"
          @unFavorite="handleQuestionUnFavorite(index)"
        />
        <pagination
          class="pagination-wrapper"
          :pageSize="pageSize"
          :current-page="myFavorites.pagination.page"
          :total="myFavorites.pagination.total"
          @change-page="getMyFavorites"
        />
        <div class="end-wrapper" v-if="!loading && myFavorites.list.length < 1">
          <the-empty noText="这里还没有内容" />
        </div>
      </template>
      <template v-if="activeTabIndex === 4">
        <answer-card
          v-for="(answer, index) of myPerfectAnswers.list"
          :key="answer.id"
          :answer="answer"
          @delete="handelAnswerDelete(index, 'myPerfectAnswers')"
        />
        <pagination
          class="pagination-wrapper"
          :pageSize="pageSize"
          :current-page="myPerfectAnswers.pagination.page"
          :total="myPerfectAnswers.pagination.total"
          @change-page="getMyPerfectAnswers"
        />
        <div
          class="end-wrapper"
          v-if="!loading && myPerfectAnswers.list.length < 1"
        >
          <the-empty noText="这里还没有内容" />
        </div>
      </template>
      <template v-if="activeTabIndex === 5">
        <draft-card
          v-for="(draft, index) of myDrafts"
          :key="draft.id"
          :draft="draft"
          @delete="handleDraftDelete(index)"
          @edit="handleDraftEdit(index)"
        />
        <div class="end-wrapper" v-if="!loading && myDrafts.length < 1">
          <the-empty noText="这里还没有内容" />
        </div>
      </template>
    </div>
    <question-type-add
      v-if="questionVisible && draftId"
      :visible.sync="questionVisible"
      :id="draftId"
      @refresh="handleQuestionPublished"
    />
    <help-type-add
      v-if="helpVisible && draftId"
      :visible.sync="helpVisible"
      :id="draftId"
      @refresh="handleQuestionPublished"
    />
    <vote-type-add
      v-if="voteVisible && draftId"
      :visible.sync="voteVisible"
      :id="draftId"
      @refresh="handleQuestionPublished"
    />
  </div>
</template>

<script>
import questionService from 'service/question';
import AnswerCard from './AnswerCard';
import QuestionCard from './QuestionCard';
import TheEmpty from "components/TheEmpty";
import Pagination from "components/Pagination";
import {
  TYPE_QUESTION, QUESTION_TYPE_QUESTION,
  QUESTION_TYPE_HELP,
  QUESTION_TYPE_VOTE
} from 'utils/const';

import DraftCard from './DraftCard.vue';
import HelpTypeAdd from '@/views/Question/widgets/HelpTypeAdd';
import QuestionTypeAdd from '@/views/Question/widgets/QuestionTypeAdd.vue';
import VoteTypeAdd from '@/views/Question/widgets/VoteTypeAdd.vue';

export default {
  name: 'MyQuestion',
  components: {
    AnswerCard,
    QuestionCard,
    TheEmpty,
    Pagination,
    DraftCard,
    HelpTypeAdd,
    QuestionTypeAdd,
    VoteTypeAdd,
  },
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      questionVisible: false,
      helpVisible: false,
      voteVisible: false,
      draftId: null,
      activeTabIndex: 1,
      pageSize: 15,
      myAnswers: {
        list: [],
        pagination: {
          page: 1,
          total: 0
        }
      },
      myQuestions: {
        list: [],
        pagination: {
          page: 1,
          total: 0
        }
      },
      myFavorites: {
        list: [],
        pagination: {
          page: 1,
          total: 0
        }
      },
      myPerfectAnswers: {
        list: [],
        pagination: {
          page: 1,
          total: 0
        }
      },
      myDrafts: []
    }
  },
  created () {
    this.getData();
  },
  methods: {
    getData () {
      const page_size = this.pageSize;
      const page = 1;
      const high_quality = 1;
      Promise.all([
        questionService.myAnswer({ page_size, page }),
        questionService.myQuestion({ page_size, page, status: 2 }),
        questionService.myFavorite({ page_size, page }),
        questionService.myAnswer({ page_size, page, high_quality }),
        questionService.myDraft()
      ]).then(([myAnswers, myQuestions, myFavorites, myPerfectAnswers, myDrafts]) => {
        myAnswers.pagination = {
          page,
          size: page_size,
          total: myAnswers.pagination.total
        };
        myQuestions.pagination = {
          page,
          size: page_size,
          total: myQuestions.pagination.total
        };
        myFavorites.pagination = {
          page,
          size: page_size,
          total: myFavorites.pagination.total
        };
        myPerfectAnswers.pagination = {
          page,
          size: page_size,
          total: myPerfectAnswers.pagination.total
        };
        this.myAnswers = myAnswers;
        this.myQuestions = myQuestions;
        this.myFavorites = myFavorites;
        this.myPerfectAnswers = myPerfectAnswers;
        this.myDrafts = myDrafts;
      }).finally(() => {
        this.$emit('update:loading', false);
      })
    },
    getMyAnswers (start = 1) {
      const page_size = this.pageSize;
      this.$emit('update:loading', true);
      questionService.myAnswer({ page_size, page: start }).then((myAnswers) => {
        myAnswers.pagination = {
          page: start,
          size: page_size,
          total: myAnswers.pagination.total
        };
        this.myAnswers = myAnswers;
      }).finally(() => {
        this.$emit('update:loading', false);
      })
    },
    getMyPerfectAnswers (start = 1) {
      const page_size = this.pageSize;
      this.$emit('update:loading', true);
      questionService.myAnswer({ page_size, page: start, high_quality: 1 }).then((myAnswers) => {
        myAnswers.pagination = {
          page: start,
          size: page_size,
          total: myAnswers.pagination.total
        };
        this.myAnswers = myAnswers;
      }).finally(() => {
        this.$emit('update:loading', false);
      })
    },
    getMyQuestions (start = 1) {
      const page_size = this.pageSize;
      this.$emit('update:loading', true);
      questionService.myQuestion({ page_size, page: start, status: 2 }).then((myQuestions) => {
        myQuestions.pagination = {
          page: start,
          size: page_size,
          total: myQuestions.pagination.total
        };
        this.myQuestions = myQuestions;
      }).finally(() => {
        this.$emit('update:loading', false);
      })
    },
    getMyFavorites (start = 1) {
      const page_size = this.pageSize;
      this.$emit('update:loading', true);
      questionService.myFavorite({ page_size, page: start }).then((myFavorites) => {
        myFavorites.pagination = {
          page: start,
          size: page_size,
          total: myFavorites.pagination.total
        };
        this.myFavorites = myFavorites;
      }).finally(() => {
        this.$emit('update:loading', false);
      })
    },
    handleTabChange (index) {
      this.activeTabIndex = index;
    },
    handelAnswerDelete (index, paramName) {
      const { id } = this.[paramName].list[index];
      this.$emit('update:loading', true);
      questionService.deleteAnswer(id).then(() => {
        this.[paramName].list.splice(index, 1);
        this.$notice({
          title: '删除成功',
          type: 'success'
        })
      }).finally(() => {
        this.$emit('update:loading', false);
      });
    },
    handelQuestionDelete (index) {
      const { id } = this.myQuestions.list[index];
      this.$emit('update:loading', true);
      questionService
        .deleteQuestion(id)
        .then(() => {
          this.$notice({
            title: "删除问题成功",
            type: 'success'
          });
          this.myQuestions.list.splice(index, 1)
        })
        .finally(() => {
          this.$emit('update:loading', false);
        });
    },
    handleQuestionUnFavorite (index) {
      const { resource } = this.myFavorites.list[index];
      this.$emit('update:loading', true);
      questionService.questionFavoriteDelete(TYPE_QUESTION, resource.id).then(() => {
        this.myFavorites.list.splice(index, 1);
        this.$notice({
          title: '取消收藏成功',
          type: 'success'
        })
      }).finally(() => {
        this.$emit('update:loading', false);
      });
    },
    handleDraftDelete (index) {
      const { id } = this.myDrafts[index];
      this.$emit('update:loading', true);
      questionService
        .deleteQuestion(id)
        .then(() => {
          this.$notice({
            title: "删除草稿成功",
            type: 'success'
          });
          this.myDrafts.splice(index, 1)
        })
        .finally(() => {
          this.$emit('update:loading', false);
        });
    },
    handleDraftEdit (index) {
      const { id, type } = this.myDrafts[index];
      this.draftId = id;
      switch (type) {
        case QUESTION_TYPE_QUESTION:
          this.questionVisible = true;
          break;
        case QUESTION_TYPE_HELP:
          this.helpVisible = true;
          break;
        case QUESTION_TYPE_VOTE:
          this.voteVisible = true;
          break;
      }
    },
    handleQuestionPublished () {
      const index = this.myDrafts.findIndex(item => item.id === this.draftId);
      this.myDrafts.splice(index, 1);
    }
  }
}
</script>

<style lang="less" scoped>
.page {
  padding: 0 20px;
  .page-header {
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    .tab-item {
      line-height: 28px;
      font-weight: 500;
      font-size: 16px;
      color: #81948b;
      cursor: pointer;
      & + .tab-item {
        margin-left: 40px;
      }
      &.active {
        color: #2c3330;
      }
    }
  }
}
.pagination-wrapper {
  margin-top: 20px;
}
</style>
