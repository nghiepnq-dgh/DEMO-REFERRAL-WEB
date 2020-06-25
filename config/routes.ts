import { IRoute } from 'umi';

export const routes: IRoute[] = [
  {
    exact: true,
    path: '/login',
    component: '@/pages/users/login',
    wrappers: ['@/layouts/UserLayout'],
  },
  {
    exact: true,
    path: '/customer',
    component: '@/pages/customers/login',
    wrappers: ['@/layouts/UserLayout'],
  },
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    wrappers: ['@/layouts/SecurityLayout'],
    exact: false,
    routes: [
      {
        path: '/',
        redirect: '/dashboard',
      },
      {
        path: '/dashboard',
        exact: true,
        name: 'dashboard',
        component: '@/pages/dashboard/index',
        icon: 'DashboardOutlined',
      },
      {
        path: '/product',
        exact: true,
        name: 'product',
        component: '@/pages/products/index',
        icon: 'DashboardOutlined',
        access:'readProduct'
      },
      {
        path: '/customers',
        exact: false,
        name: 'customers',
        icon: 'UserOutlined',
        access:'readCustomer',
        routes: [
          {
            exact: true,
            component: '@/pages/customers/index',
            path: '/customers',
          },
          {
            exact: true,
            component: '@/pages/customers/[id]',
            path: '/customers/:id',
          },
        ],
      }
    ],
  },
];
