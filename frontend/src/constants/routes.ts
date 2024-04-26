/**
 * Is the list of all the routes
 */
export const routesName = {
  dashboard: "/dashboard",
  news: "/news",
  bookmark: "/bookmark",
  article: "/article",
  profile: "/profile",
  login: "/login",
  register: "/register",
  cryptoOverview: "overview",
  admin: "/admin",
};

/**
 * Is the list of query params find through out the app
 */
export const routesParamsName = {
  newsCategory: "category",
  articleId: "articleId",
  cryptoId: "cryptoId",
};

/**
 * Is the list of concatenated routes
 */
export const complexRoutePath = {
  newsCategoryPath: `${routesName.news}/:${routesParamsName.newsCategory}`,
  articlePath: `${routesName.news}${routesName.article}/:${routesParamsName.articleId}`,
  cryptoOverviewPath: `${routesName.dashboard}${routesName.cryptoOverview}/:${routesParamsName.cryptoId}`,
};
