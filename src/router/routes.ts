import { RouteRecordRaw } from 'vue-router';
import { RouterNameEnum } from 'src/common';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    children: [
      {
        path: '',
        name: RouterNameEnum.HOME,
        component: () => import('src/pages/home/IndexPage.vue'),
        meta: {
          title: '首页',
          depth: 1,
          isFooter: true,
        },
      },
      {
        path: '/score',
        name: RouterNameEnum.SCORE,
        component: () => import('src/pages/score/scorePage.vue'),
        meta: {
          title: '比分',
          depth: 1,
          isFooter: true,
        },
      },
      {
        path: '/orders',
        name: RouterNameEnum.ORDER,
        component: () => import('src/pages/order/orderPage.vue'),
        meta: {
          title: '跟单',
          depth: 1,
          isFooter: true,
        },
      },
      {
        path: '/find',
        name: RouterNameEnum.FIND,
        component: () => import('src/pages/find/findPage.vue'),
        meta: {
          title: '发现',
          depth: 1,
          isFooter: true,
        },
      },
      {
        path: '/my',
        name: RouterNameEnum.MY,
        component: () => import('src/pages/my/myPage.vue'),
        meta: {
          title: '我的',
          depth: 1,
          isFooter: true,
        },
      },
      {
        path: '/sliderInfo',
        name: RouterNameEnum.SLIDER,
        component: () => import('src/pages/sliderInfo/sliderInfo.vue'),
        meta: {
          title: '',
          depth: 1,
        },
      },
      {
        path: '/shopDetail',
        name: RouterNameEnum.SHOP,
        component: () => import('src/pages/shopDetail/shopDetail.vue'),
        meta: {
          title: '',
          depth: 1,
        },
      },
      {
        path: '/userDetail',
        name: RouterNameEnum.USER_DETAIL,
        component: () => import('src/pages/user/userDetail/userDetail.vue'),
        meta: {
          title: '',
          depth: 1,
        },
      },
      {
        path: '/userOrder',
        name: RouterNameEnum.USER_ORDER,
        component: () => import('src/pages/user/userOrder/userOrder.vue'),
        meta: {
          title: '',
          depth: 1,
        },
      },
      // {
      //   path: '/share',
      //   name: RouterNameEnum.HOME,
      //   component: () => import('src/pages/index/IndexPage.vue'),
      //   meta: {
      //     title: '分享',
      //     depth: 1,
      //     isFooter: true,
      //   },
      // },
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
