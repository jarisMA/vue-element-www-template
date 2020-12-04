import router from "@/router";

export const goHome = () => {
  return goRoute({
    name: "Home"
  });
};

export const goMy = () => {
  return goRoute({
    name: "My"
  });
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
