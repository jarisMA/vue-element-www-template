import router from "@/router";

export const goHome = (type = "_self") => {
  return goRoute(
    {
      name: "Home"
    },
    type
  );
};

export const goAcademy = () => {
  return goRoute({
    name: "Academy"
  });
};

export const goMyPlan = (type = "_self") => {
  return goRoute(
    {
      name: "MyPlan"
    },
    type
  );
};

export const goMySetting = (type = "_self") => {
  return goRoute(
    {
      name: "MySetting"
    },
    type
  );
};

export const goMyCourse = (type = "_self") => {
  return goRoute(
    {
      name: "MyCourse"
    },
    type
  );
};

export const goMyQuestion = (type = "_self") => {
  return goRoute(
    {
      name: "MyQuestion"
    },
    type
  );
};

export const goAddPlan = () => {
  return goRoute({
    name: "AddPlan"
  });
};

export const goEditPlan = (params, type = "_blank") => {
  return goRoute(
    {
      name: "EditPlan",
      params
    },
    type
  );
};
export const goDrawPlan = (type = "_blank") => {
  return goRoute(
    {
      name: "DrawPlan"
    },
    type
  );
};

export const goTerm = (id, type = "_self") => {
  return goRoute(
    {
      name: "Term",
      params: {
        id
      }
    },
    type
  );
};

export const goCourse = (id, lessonIndex, type = "_blank") => {
  return goRoute(
    {
      name: "Course",
      params: {
        id,
        lessonIndex
      }
    },
    type
  );
};

export const goSeriesCourse = (id, courseId, lessonIndex, type = "_blank") => {
  return goRoute(
    {
      name: "SeriesCourse",
      params: {
        id,
        courseId,
        lessonIndex
      }
    },
    type
  );
};

export const goBible = (type = "_self") => {
  return goRoute(
    {
      name: "Bible"
    },
    type
  );
};

export const goBibleDetail = (id, query = {}, type = "_self") => {
  return goRoute(
    {
      name: "BibleDetail",
      params: {
        id
      },
      query
    },
    type
  );
};

export const goQuestion = (type = "_self") => {
  return goRoute(
    {
      name: "Question"
    },
    type
  );
};

export const goQuestionDetail = (id, type = "_blank") => {
  return goRoute(
    {
      name: "QuestionDetail",
      params: {
        id
      }
    },
    type
  );
};
export const goQuestionAnswer = (id, type = "_blank") => {
  return goRoute(
    {
      name: "QuestionAnswer",
      params: {
        id
      }
    },
    type
  );
};

export const goAcademyCourseList = (query = {}, type = "_self") => {
  return goRoute(
    {
      name: "AcademyCourseList",
      query: {
        ...query
      }
    },
    type
  );
};

export const goAcademyCourseDetail = (id, type = "_self") => {
  return goRoute(
    {
      name: "AcademyCourseDetail",
      params: {
        id
      }
    },
    type
  );
};

export const goAcademySeriesList = (type = "_self") => {
  return goRoute(
    {
      name: "AcademySeriesList"
    },
    type
  );
};

export const goAcademySeriesDetail = (id, type = "_self") => {
  return goRoute(
    {
      name: "AcademySeriesDetail",
      params: {
        id
      }
    },
    type
  );
};

export const goAcademyCampList = (type = "_self") => {
  return goRoute(
    {
      name: "AcademyCampList"
    },
    type
  );
};

export const goAcademyCampDetail = (id, type = "_self") => {
  return goRoute(
    {
      name: "AcademyCampDetail",
      params: {
        id
      }
    },
    type
  );
};

export const goOrder = (no, type = "_blank") => {
  return goRoute(
    {
      name: "Order",
      params: {
        no
      }
    },
    type
  );
};

export const goVip = (type = "replace") => {
  return goRoute(
    {
      name: "VipIndex"
    },
    type
  );
};

export const go404 = (type = "replace") => {
  return goRoute(
    {
      name: "NotFound"
    },
    type
  );
};

export const goMyClasses = (type = "_self") => {
  return goRoute(
    {
      name: "Classes"
    },
    type
  );
};

export const goMyCourses = (type = "_self") => {
  return goRoute(
    {
      name: "Courses"
    },
    type
  );
};

export const goMySystems = (type = "_self") => {
  return goRoute(
    {
      name: "Systems"
    },
    type
  );
};

export const goMyVip = (type = "_self") => {
  return goRoute(
    {
      name: "Vip"
    },
    type
  );
};

export const goPurchase = (type = "_self") => {
  return goRoute(
    {
      name: "Purchase"
    },
    type
  );
};

export const goRoute = (route, type = "_self") => {
  return (
    router.history.current.name !== route.name &&
    (type === "replace"
      ? router.replace(route)
      : type !== "_self"
      ? typeof route === "object"
        ? window.open(router.resolve(route).href, type)
        : window.open(route, type)
      : router.push(route))
  );
};
