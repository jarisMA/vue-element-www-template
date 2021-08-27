import router from "@/router";

export const goHome = (type = "_self") => {
  return goRoute(
    {
      name: "Home"
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
