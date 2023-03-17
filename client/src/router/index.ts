import Shop from "pages/Shop";
import Basket from "pages/Basket";
import Orders from "pages/Orders";
import Product from "pages/Product";
import Account from "pages/Account";
import AdminPanel from "pages/AdminPanel";
import Authentication from "pages/Authentication";

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
  REDIRECT_ROUTE: '*',
}

export const publicRoutes: Route[] = [
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
    path: RouteNames.REDIRECT_ROUTE,
    element: Shop,
  },
];

export const privateRoutes: Route[] = [
  ...publicRoutes,
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
];