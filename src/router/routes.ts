import { RouteRecordRaw } from 'vue-router';
import { RouterNameEnum } from 'src/common';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: RouterNameEnum.HOME,
        component: () => import('src/pages/index/IndexPage.vue'),
        meta: {
          title: '首页',
          depth: 1,
          isFooter: true,
        },
      },
      {
        path: '/orders',
        name: RouterNameEnum.ORDERS,
        component: () => import('src/pages/index/IndexPage.vue'),
        meta: {
          title: '订单',
          depth: 1,
          isFooter: true,
        },
      },
      {
        path: '/share',
        name: RouterNameEnum.SHARE,
        component: () => import('src/pages/index/IndexPage.vue'),
        meta: {
          title: '分享',
          depth: 1,
          isFooter: true,
        },
      },
    ],
  },
  {
    path: '/Login',
    name: RouterNameEnum.LOGIN,
    component: () => import('pages/entry/EntyrIndex.vue'),
    meta: {
      title: '登录',
      depth: 2,
      isFooter: false,
    },
  },
  {
    path: '/Register',
    name: RouterNameEnum.REGISTER,
    component: () => import('pages/entry/EntyrIndex.vue'),
    meta: {
      title: '注册',
      depth: 2,
      isFooter: false,
    },
  },
  {
    path: '/forgetPassword',
    name: RouterNameEnum.FORGETPASSWORD,
    component: () => import('pages/forgetPassword/index.vue'),
    meta: {
      title: '忘记密码',
      depth: 3,
      isFooter: false,
    },
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
