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
  }
};

export default questionService;
