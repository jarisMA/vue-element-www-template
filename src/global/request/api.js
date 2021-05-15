const PREFIX = `${process.env.VUE_APP_HOST}`;
const WEB_PREFIX = `${PREFIX}/api/web`;

export default {
  devLogin: `${WEB_PREFIX}/users/dev-login`,
  users: `${WEB_PREFIX}/users`,
  logout: `${WEB_PREFIX}/logout`,
  userInfo: `${WEB_PREFIX}/users/user-info`,
  wechatAuth: `${WEB_PREFIX}/wechat/auth`,
  smsRegisterCode: `${WEB_PREFIX}/sms/register-code`,
  bindPhone: `${WEB_PREFIX}/sms/bind-phone`,
  statisticLog: `${WEB_PREFIX}/statistic/log`,
  gothrough: `${WEB_PREFIX}/kujiale/gothrough`,
  kujialeCommunity: `${WEB_PREFIX}/kujiale/community`,
  kujialeFloorplan: `${WEB_PREFIX}/kujiale/floorplan/standard`,
  kujialeDesignCreate: `${WEB_PREFIX}/kujiale/design/creation`,
  kujialeIframe: dest => `${WEB_PREFIX}/kujiale/${dest}/iframe`,
  kujialeDesignList: `${WEB_PREFIX}/kujiale/design/list`,
  kujialeDeleteDesign: `${WEB_PREFIX}/kujiale/design/deletion`,
  kujialeCopyDesign: designId =>
    `${WEB_PREFIX}/kujiale/design/${designId}/copy`,
  kujialeListState: listingId =>
    `${WEB_PREFIX}/kujiale/listing/${listingId}/state`,
  kujialeListSync: listingId =>
    `${WEB_PREFIX}/kujiale/listing/${listingId}/sync`,
  kujialeListingBrief: listingId =>
    `${WEB_PREFIX}/kujiale/listing/${listingId}/brief`,
  kujialeDesignBasic: designId =>
    `${WEB_PREFIX}/kujiale/design/${designId}/basic`,
  ossToken: `${PREFIX}/api/file/alioss-token`,
  ossStore: `${PREFIX}/api/file/alioss-store`,
  camps: `${WEB_PREFIX}/camps`,
  camp: id => `${WEB_PREFIX}/camp/${id}`,
  myCampTerms: `${WEB_PREFIX}/camp/terms`,
  campTerm: id => `${WEB_PREFIX}/camp/term/${id}`,
  campTermFeedback: id => `${WEB_PREFIX}/camp/term/${id}/feedback`,
  campHomework: (campId, termId, homeworkId) =>
    `${WEB_PREFIX}/camp/${campId}/term/${termId}/homework/${homeworkId}`,
  campHomeworkUpdate: id => `${WEB_PREFIX}/camp/homework/${id}`,
  checkTerm: id => `${WEB_PREFIX}/camp/term/${id}/check`,
  campAttaches: termId => `${WEB_PREFIX}/camp/term/${termId}/attach`,

  bibles: `${WEB_PREFIX}/bible`,
  bible: id => `${WEB_PREFIX}/bible/${id}`,
  bibleNode: id => `${WEB_PREFIX}/bible-node/${id}`,
  biblePreview: id => `${PREFIX}/api/admin/bible/${id}/preview`,

  questionChannels: `${WEB_PREFIX}/question/channels`,
  questions: `${WEB_PREFIX}/questions`,
  myQuestions: `${WEB_PREFIX}/mine/question`,
  questionAdd: `${WEB_PREFIX}/question`,
  question: id => `${WEB_PREFIX}/question/${id}`,
  questionAnswers: questionId => `${WEB_PREFIX}/question/${questionId}/answers`,
  questionAnswerAdd: questionId =>
    `${WEB_PREFIX}/question/${questionId}/answer`,
  questionAnswer: id => `${WEB_PREFIX}/question/answer/${id}`,
  questionCommentAdd: answerId =>
    `${WEB_PREFIX}/question/answer/${answerId}/comment`,
  questionComment: id => `${WEB_PREFIX}/question/answer/comment/${id}`,
  questionLikeAdd: `${WEB_PREFIX}/question-like`,
  commodityCats: `${WEB_PREFIX}/commodity/cat`,
  commodityCat: id => `${WEB_PREFIX}/commodity/cat/${id}`,
  commodityBrands: `${WEB_PREFIX}/commodity/brand`,
  commodities: `${WEB_PREFIX}/commodity`,
  commodityAttrs: `${WEB_PREFIX}/commodity/attr`,
  commodityCatAttrs: catId => `${WEB_PREFIX}/commodity/cat/${catId}/attrs`,
  commoditySkuFeedback: id => `${WEB_PREFIX}/commodity-sku/${id}/feedback`,
  course: id => `${WEB_PREFIX}/course/${id}`,
  lessonRecord: (courseId, lessonId) =>
    `${WEB_PREFIX}/course/${courseId}/lesson/${lessonId}/record`,
  ossVideoToken: `${PREFIX}/api/file/alioss-video-token`,
  ossRefreshVideoToken: videoId =>
    `${PREFIX}/api/file/alioss-video-token/${videoId}`,
  ossVideoAuth: videoId => `${PREFIX}/api/file/alioss-video/${videoId}`,
  ossVideoStatus: videoId => `${PREFIX}/api/file/alioss-video/${videoId}/status`
};
