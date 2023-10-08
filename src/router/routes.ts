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
        name: RouterNameEnum.USERDETAIL,
        component: () => import('src/pages/user/userDetail/userDetail.vue'),
        meta: {
          title: '',
          depth: 2,
        },
      },
      {
        path: '/userOrder',
        name: RouterNameEnum.USERORDER,
        component: () => import('src/pages/user/userOrder/userOrder.vue'),
        meta: {
          title: '',
          depth: 2,
        },
      },
      {
        path: '/footBall',
        name: RouterNameEnum.FOOTBALL,
        component: () => import('src/pages/eventBall/footBall.vue'),
        meta: {
          title: '赛事-足球',
          depth: 1,
        },
      },
      {
        path: '/basketball',
        name: RouterNameEnum.BASKETBALL,
        component: () => import('src/pages/eventBall/basketball.vue'),
        meta: {
          title: '赛事-篮球',
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
    path: '/setting',
    name: RouterNameEnum.SETTING,
    component: () => import('pages/setting/settingPage.vue'),
    meta: {
      title: '设置',
      depth: 3,
      isFooter: false,
    },
  },
  {
    path: '/settingPassword',
    name: RouterNameEnum.LOGINPASSWORD,
    component: () => import('pages/setting/settingPasswordPage.vue'),
    meta: {
      title: '修改登录密码',
      depth: 4,
      isFooter: false,
    },
  },
  {
    path: '/settingBank',
    name: RouterNameEnum.BANK,
    component: () => import('pages/setting/settingBankPage.vue'),
    meta: {
      title: '银行卡',
      depth: 5,
      isFooter: false,
    },
  },
  {
    path: '/settingAddBank',
    name: RouterNameEnum.ADDBANK,
    component: () => import('pages/setting/settingBankAddPage.vue'),
    meta: {
      title: '添加银行卡',
      depth: 6,
      isFooter: false,
    },
  },
  {
    path: '/realName',
    name: RouterNameEnum.REALNAME,
    component: () => import('pages/realName/realNamePage.vue'),
    meta: {
      title: '实名认证',
      depth: 3,
      isFooter: false,
    },
  },
  {
    path: '/accoutDetails',
    name: RouterNameEnum.ACCOUNTDETAILS,
    component: () => import('pages/accountDetails/accountDetailsPage.vue'),
    meta: {
      title: '账户明细',
      depth: 3,
      isFooter: false,
    },
  },
  {
    path: '/buyLottery',
    name: RouterNameEnum.BUYLOTTERY,
    component: () => import('pages/buyLottery/buyLottery.vue'),
    meta: {
      title: '购彩记录',
      depth: 3,
      isFooter: false,
    },
  },
  {
    path: '/myFocus',
    name: RouterNameEnum.MYFOCUS,
    component: () => import('pages/myFocus/myFocusPage.vue'),
    meta: {
      title: '我的关注',
      depth: 3,
      isFooter: false,
    },
  },
  {
    path: '/myFan',
    name: RouterNameEnum.MYFAN,
    component: () => import('pages/myFan/myFanPage.vue'),
    meta: {
      title: '我粉丝',
      depth: 3,
      isFooter: false,
    },
  },
  {
    path: '/recharge',
    name: RouterNameEnum.RECHARGE,
    component: () => import('pages/recharge/RechargePage.vue'),
    meta: {
      title: '充值',
      depth: 3,
      isFooter: false,
    },
  },
  {
    path: '/withdraw',
    name: RouterNameEnum.WITHDRAW,
    component: () => import('pages/withdraw/withdrawPage.vue'),
    meta: {
      title: '提现',
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
