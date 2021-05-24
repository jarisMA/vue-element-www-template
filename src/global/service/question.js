import request from "request/axios.js";
import API from "request/api.js";

const questionService = {
  channels: () => {
    return request.get(API.questionChannels);
  },
  addLike: (params = {}) => {
    return request.post(API.questionLikeAdd, params);
  },
  questions: (params = {}) => {
    return request.get(API.questions, params);
  },
  myQuestions: (params = {}) => {
    return request.get(API.myQuestions, params);
  },
  addQuestion: params => {
    return request.post(API.questionAdd, params);
  },
  updateQuestion: (id, params) => {
    return request.post(API.question(id), params);
  },
  question: id => {
    return request.get(API.question(id));
  },
  deleteQuestion: id => {
    return request.delete(API.question(id));
  },
  answers: (questionId, params = {}) => {
    return request.get(API.questionAnswers(questionId), params);
  },
  addAnswer: (questionId, params = {}) => {
    return request.post(API.questionAnswerAdd(questionId), params);
  },
  updateAnswer: (id, params = {}) => {
    return request.post(API.questionAnswer(id), params);
  },
  deleteAnswer: id => {
    return request.delete(API.questionAnswer(id));
  },
  addComment: (answerId, params = {}) => {
    return request.post(API.questionCommentAdd(answerId), params);
  },
  deleteComment: id => {
    return request.delete(API.questionComment(id));
  },
  questionFavoriteAdd(params) {
    return request.post(API.questionFavoriteAdd, params);
  },
  questionFavoriteDelete(type, resourceId) {
    return request.delete(API.questionFavoriteDelete(type, resourceId));
  },
  acceptAnswer(id) {
    return request.put(API.questionAnswerAccept(id));
  },
  vote(params) {
    return request.post(API.questionVote, params);
  },
  myAnswer(params) {
    return request.get(API.myAnswer, {
      ...params
      // type: 2
    });
  },
  myQuestion(params) {
    return request.get(API.myQuestion, {
      ...params
      // type: 2
    });
  },
  myFavorite(params) {
    return request.get(API.myFavorite, {
      ...params
      // type: 2
    });
  }
};

export default questionService;
