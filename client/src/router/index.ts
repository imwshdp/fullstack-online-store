export interface IRoute {
  path: string;
  exact?: boolean;
  // element: React.ComponentType;
}

export const RouteNames = {
  ADMIN_ROUTE: '/admin',
  LOGIN_ROUTE: '/login',
  REGISTRATION_ROUTE: '/registration',
  SHOP_ROUTE: '/',
  PRODUCT_ROUTE: '/product',
  BASKET_ROUTE: '/basket',
  ORDER_ROUTE: '/orders',
  REDIRECT_ROUTE: '*',
}

export const privateRoutes: IRoute[] = [
  {
    path: RouteNames.ADMIN_ROUTE,
    exact: true,
    // element: Admin,
  },
  {
    path: RouteNames.BASKET_ROUTE,
    // element: Basket,
  },
  {
    path: RouteNames.ORDER_ROUTE,
    // 
  },
]

export const publicRoutes: IRoute[] = [
  {
    path: RouteNames.SHOP_ROUTE,
    // element: Shop,
  },
  {
    path: RouteNames.LOGIN_ROUTE,
    // element: Auth,
  },
  {
    path: RouteNames.REGISTRATION_ROUTE,
    // element: Auth,
  },
  {
    path: RouteNames.PRODUCT_ROUTE + '/:id',
    // element: DevicePage,
  },
  {
    path: RouteNames.REDIRECT_ROUTE,
    // element: Shop,
  },
]