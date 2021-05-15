import router from "@/router";

export const goHome = () => {
  return goRoute({
    name: "Home"
  });
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

export const goBible = (type = "_self") => {
  return goRoute(
    {
      name: "Bible"
    },
    type
  );
};

export const goBibleDetail = (id, type = "_self") => {
  return goRoute(
    {
      name: "BibleDetail",
      params: {
        id
      }
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

export const goAcademyCamp = (id, type = "_self") => {
  return goRoute(
    {
      name: "AcademyCamp",
      params: {
        id
      }
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
