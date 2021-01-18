const pathsMap = {
  home: () => '/home',
  signIn: () => '/sign-in',
  signUp: () => '/sign-up',
  plan: () => '/plan',
  purchase: () => '/purchase',
  purchaseSuccess: () => '/purchase-success',
  howItWork: () => '/how-it-work',
  subscription: () => '/subscription',
  blogList: () => '/blog-list',
  blogDetail: () => '/blog-Detail',
  addArticle: () => '/add-article',
  discovery: () => '/discovery',
  hub: () => '/hub',
  viewArticle: (articleId: string) => `/articles/${articleId}`,
  editArticle: (articleId: string) => `/articles/${articleId}/edit`,
};
type PathsMap = typeof pathsMap;

export const getPath = <TRoute extends keyof PathsMap>(
  route: TRoute,
  ...params: Parameters<PathsMap[TRoute]>
) => {
  const pathCb: (...args: any[]) => string = pathsMap[route];

  return pathCb(...params);
};
