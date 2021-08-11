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
  kujialeRegister: `${WEB_PREFIX}/kujiale/register`,
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
  campTermWidgetResourceRecord: (campId, termId, widgetId, resourceId) =>
    `${WEB_PREFIX}/camp/${campId}/term/${termId}/widget/${widgetId}/resource/${resourceId}/record`,
  campTermWidgetResourceFinish: (campId, termId, widgetId, resourceId) =>
    `${WEB_PREFIX}/camp/${campId}/term/${termId}/widget/${widgetId}/resource/${resourceId}/finish`,
  campTermFeedback: id => `${WEB_PREFIX}/camp/term/${id}/feedback`,
  campHomework: (campId, termId, homeworkId) =>
    `${WEB_PREFIX}/camp/${campId}/term/${termId}/homework/${homeworkId}`,
  campHomeworkUpdate: id => `${WEB_PREFIX}/camp/homework/${id}`,
  checkTerm: id => `${WEB_PREFIX}/camp/term/${id}/check`,
  campAttaches: termId => `${WEB_PREFIX}/camp/term/${termId}/attach`,
  campTermWidgetFeedbacks: `${WEB_PREFIX}/camp_term_widget_feedback`,
  campTermWidgetFeedback: id => `${WEB_PREFIX}/camp_term_widget_feedback/${id}`,
  campTermLike: (campId, termId) =>
    `${WEB_PREFIX}/camp/${campId}/term/${termId}/like`,
  campTermVideoCat: termId => `${WEB_PREFIX}/camp/term/${termId}/video/cat`,

  bibles: `${WEB_PREFIX}/bible`,
  bible: id => `${WEB_PREFIX}/bible/${id}`,
  bibleNode: (bibleId, id) => `${WEB_PREFIX}/bible/${bibleId}/node/${id}`,
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
  questionFavoriteAdd: `${WEB_PREFIX}/question-favorite`,
  questionFavoriteDelete: (type, resourceId) =>
    `${WEB_PREFIX}/question-favorite/${type}/${resourceId}`,
  questionAnswerAccept: id => `${WEB_PREFIX}/question/answer/${id}/accepted`,
  questionVote: `${WEB_PREFIX}/question-vote-user`,

  commodityCats: `${WEB_PREFIX}/commodity/cat`,
  commodityCat: id => `${WEB_PREFIX}/commodity/cat/${id}`,
  commodityBrands: `${WEB_PREFIX}/commodity/brand`,
  commodities: `${WEB_PREFIX}/commodity`,
  commodityAttrs: `${WEB_PREFIX}/commodity/attr`,
  commodityCatAttrs: catId => `${WEB_PREFIX}/commodity/cat/${catId}/attrs`,
  commodityCatCommodities: catId =>
    `${WEB_PREFIX}/commodity/cat/${catId}/commodities`,
  commoditySkuFeedback: id => `${WEB_PREFIX}/commodity-sku/${id}/feedback`,
  courseCategories: `${WEB_PREFIX}/course-category`,
  courseCategory: id => `${WEB_PREFIX}/course-category/${id}`,
  course: id => `${WEB_PREFIX}/course/${id}`,
  courses: `${WEB_PREFIX}/course`,
  lessonRecord: (courseId, lessonId) =>
    `${WEB_PREFIX}/course/${courseId}/lesson/${lessonId}/record`,
  lessonFinish: (courseId, lessonId) =>
    `${WEB_PREFIX}/course/${courseId}/lesson/${lessonId}/finish`,
  courseSeriesCategory: `${WEB_PREFIX}/series-category`,
  courseSeries: `${WEB_PREFIX}/series`,
  courseSetDetail: id => `${WEB_PREFIX}/series/${id}/detail`,
  courseSetChapter: (id, chapterId) =>
    `${WEB_PREFIX}/series/${id}/chapter/${chapterId}`,
  courseSetSectionRecord: (id, chapterId, sectionId) =>
    `${WEB_PREFIX}/series/${id}/chapter/${chapterId}/section/${sectionId}/record`,
  courseSetSectionFinish: (id, chapterId, sectionId) =>
    `${WEB_PREFIX}/series/${id}/chapter/${chapterId}/section/${sectionId}/finish`,
  ossVideoToken: `${PREFIX}/api/file/alioss-video-token`,
  ossRefreshVideoToken: videoId =>
    `${PREFIX}/api/file/alioss-video-token/${videoId}`,
  ossVideoAuth: videoId => `${PREFIX}/api/file/alioss-video/${videoId}`,
  ossVideoStatus: videoId =>
    `${PREFIX}/api/file/alioss-video/${videoId}/status`,
  ossVideoPreview: videoId =>
    `${PREFIX}/api/file/alioss-video/preview/${videoId}`,
  clock: `${WEB_PREFIX}/mine/clock`,
  gainShineCount: `${WEB_PREFIX}/mine/gain-history/shine-count`,
  gainHistory: `${WEB_PREFIX}/mine/gain-history`,
  districts: `${PREFIX}/api/districts/all`,
  myAnswer: `${WEB_PREFIX}/mine/question-answer`,
  myQuestion: `${WEB_PREFIX}/mine/question`,
  myFavorite: `${WEB_PREFIX}/mine/question-favorite`,
  myDraft: `${WEB_PREFIX}/mine/question/draft`,
  vipSkus: `${WEB_PREFIX}/vip-skus`,
  orders: `${WEB_PREFIX}/order`,
  order: no => `${WEB_PREFIX}/order/${no}`,
  orderCheck: no => `${WEB_PREFIX}/order/${no}/check`,
  payByWechat: no => `${WEB_PREFIX}/payment/wechat/${no}`,
  payByAlipay: no => `${WEB_PREFIX}/payment/alipay/${no}`,

  myCourses: `${WEB_PREFIX}/course/mine`,
  mySeries: `${WEB_PREFIX}/series/mine`,
  myOrder: `${WEB_PREFIX}/order/mine`,
  myHistory: `${WEB_PREFIX}/vip/mine`,
  notifications: `${WEB_PREFIX}/notifications`,
  notification: id => `${WEB_PREFIX}/notifications/${id}`,

  industryJobsRoots: `${WEB_PREFIX}/industry/jobs/roots`,

  tasks: `${WEB_PREFIX}/tasks`,
  taskId: uuid => `${WEB_PREFIX}/tasks/${uuid}`,
  taskApply: uuid => `${WEB_PREFIX}/tasks/${uuid}/apply`,
  taskIsFull: uuid => `${WEB_PREFIX}/tasks/${uuid}/is-full`,
  taskUserJoin: `${WEB_PREFIX}/tasks/users/join`
};
