const PREFIX = `${process.env.VUE_APP_HOST}`;

export default {
  devLogin: `${PREFIX}/api/web/users/dev-login`,
  users: `${PREFIX}/api/web/users`,
  logout: `${PREFIX}/api/web/logout`,
  userInfo: `${PREFIX}/api/web/users/user-info`,
  wechatAuth: `${PREFIX}/api/web/wechat/auth`,
  smsRegisterCode: `${PREFIX}/api/web/sms/register-code`,
  bindPhone: `${PREFIX}/api/web/sms/bind-phone`,
  statisticLog: `${PREFIX}/api/web/statistic/log`,
  gothrough: `${PREFIX}/api/web/kujiale/gothrough`,
  kujialeCommunity: `${PREFIX}/api/web/kujiale/community`,
  kujialeFloorplan: `${PREFIX}/api/web/kujiale/floorplan/standard`,
  kujialeDesignCreate: `${PREFIX}/api/web/kujiale/design/creation`,
  kujialeIframe: dest => `${PREFIX}/api/web/kujiale/${dest}/iframe`,
  kujialeDesignList: `${PREFIX}/api/web/kujiale/design/list`,
  kujialeDeleteDesign: `${PREFIX}/api/web/kujiale/design/deletion`,
  kujialeUpdateDesignName: designId =>
    `${PREFIX}/api/web/kujiale/design/${designId}/basic`,
  kujialeCopyDesign: designId =>
    `${PREFIX}/api/web/kujiale/design/${designId}/copy`,
  ossToken: `${PREFIX}/api/file/alioss-token`,
  ossStore: `${PREFIX}/api/file/alioss-store`,
  campTerms: `${PREFIX}/api/web/camp/terms`,
  campTerm: id => `${PREFIX}/api/web/camp/term/${id}`,
  campHomework: (campId, termId, homeworkId) =>
    `${PREFIX}/api/web/camp/${campId}/term/${termId}/homework/${homeworkId}`,
  campHomeworkUpdate: id => `${PREFIX}/api/web/camp/homework/${id}`,
  checkTerm: id => `${PREFIX}/api/web/camp/term/${id}/check`,
  campAttaches: termId => `${PREFIX}/api/web/camp/term/${termId}/attach`,
  bibles: `${PREFIX}/api/web/bible`,
  bible: id => `${PREFIX}/api/web/bible/${id}`,
  biblePreview: id => `${PREFIX}/api/admin/bible/${id}/preview`,

  questionChannels: `${PREFIX}/api/web/question/channels`,
  questions: `${PREFIX}/api/web/questions`,
  questionAdd: `${PREFIX}/question`,
  question: id => `${PREFIX}/question/${id}`,
  questionAnswers: questionId => `${PREFIX}/question/${questionId}/answers`,
  questionAnswerAdd: questionId => `${PREFIX}/question/${questionId}/answer`,
  questionAnswer: id => `${PREFIX}/question/answer/${id}`,
  questionCommentAdd: answerId =>
    `${PREFIX}/question/answer/${answerId}/comment`,
  questionComment: id => `${PREFIX}/question/answer/comment/${id}`
};
