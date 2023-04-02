import Shop from "pages/Shop";
import Sizes from "pages/Sizes";
import Basket from "pages/Basket";
import Orders from "pages/Orders";
import AboutMe from "pages/AboutMe";
import Account from "pages/Account";
import Product from "pages/Product";
import AdminPanel from "pages/AdminPanel";
import Authentication from "pages/Authentication";
import Recommendations from "pages/Recommendations";

export interface Route {
  path: string;
  element: React.ComponentType;
}

export const RouteNames = {
  ACCOUNT_ROUTE: '/account',
  ADMIN_ROUTE: '/admin',
  LOGIN_ROUTE: '/login',
  REGISTRATION_ROUTE: '/registration',
  SHOP_ROUTE: '/',
  PRODUCT_ROUTE: '/product',
  BASKET_ROUTE: '/basket',
  ORDER_ROUTE: '/orders',

  ABOUT_ME_ROUTE: '/aboutme',
  SIZES_ROUTE: '/sizes',
  RECS_ROUTE: '/recommendations',

  REDIRECT_ROUTE: '*',
}

const commonRoutes: Route[] = [
  {
    path: RouteNames.SHOP_ROUTE,
    element: Shop,
  },
  {
    path: RouteNames.LOGIN_ROUTE,
    element: Authentication,
  },
  {
    path: RouteNames.REGISTRATION_ROUTE,
    element: Authentication,
  },
  {
    path: RouteNames.PRODUCT_ROUTE + '/:id',
    element: Product,
  },
  {
    path: RouteNames.ABOUT_ME_ROUTE,
    element: AboutMe,
  },
  {
    path: RouteNames.RECS_ROUTE,
    element: Recommendations,
  },
  {
    path: RouteNames.SIZES_ROUTE,
    element: Sizes,
  },
]

export const publicRoutes: Route[] = [
  ...commonRoutes,
  {
    path: RouteNames.ACCOUNT_ROUTE,
    element: Authentication,
  },
  {
    path: RouteNames.REDIRECT_ROUTE,
    element: Shop,
  },
];

export const privateRoutes: Route[] = [
  ...commonRoutes,
  {
    path: RouteNames.ACCOUNT_ROUTE,
    element: Account,
  },
  {
    path: RouteNames.ADMIN_ROUTE,
    element: AdminPanel,
  },
  {
    path: RouteNames.BASKET_ROUTE,
    element: Basket,
  },
  {
    path: RouteNames.ORDER_ROUTE,
    element: Orders,
  },
  {
    path: RouteNames.REDIRECT_ROUTE,
    element: Shop,
  },
];