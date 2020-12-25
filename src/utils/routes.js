import router from "@/router";

export const goHome = () => {
  return goRoute({
    name: "Home"
  });
};

export const goMy = (type = "_self") => {
  return goRoute(
    {
      name: "My"
    },
    type
  );
};

export const goProfile = (type = "_self") => {
  return goRoute(
    {
      name: "Profile"
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
