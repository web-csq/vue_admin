export const blankURL = (_this, route, query = {}) =>
  window.open(_this.$router.resolve(route, query).href, "_blank");
export function routeToTitle(route) {
  switch (route) {
    case "/testmanager":
      return "考试管理";
    case "/analyzelist":
      return "智慧分析";
    case "/basedata":
      return "基础数据";
  }
}