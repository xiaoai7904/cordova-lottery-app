import Utils from './utils/Utils';
import Observer from './observer/Observer';
import api from '../boot/axios';
export * from './request';
export * from './types';

export { Utils, Observer, api };
export enum RouterNameEnum {
  // 首页
  HOME = 'Home',
  // 订单
  ORDERS = 'Orders',
  // share
  SHARE = 'Share',
  // 充值usdt
  RECHARGEUSDT = 'Rechargeusdt',
  // 充值INR
  RECHARGEINR = 'Rechargeinr',
  // 充值INR2
  RECHARGEINR2 = 'Rechargeinr2',
  // invitationrecord
  INVITATIONRECORD = 'Invitationrecord',
  //  ADDPAYMENT
  ADDPAYMENT = 'AddPayMent',
  //  充值INR记录
  RECHARGEINRRECORD = 'RechargeInrRecord',
  // 登录
  LOGIN = 'Login',
  // 注册
  REGISTER = 'Register',
  // 忘记密码
  FORGETPASSWORD = 'forgetPassword',
  // 个人中心
  PERSONALCENTER = 'Personalcenter',
  // 二级代理
  SECONDAGENT2 = 'Secondagent2',
  // 二级代理
  SECONDAGENT3 = 'Secondagent3',
  // 教程
  TUTORIAL = 'tutotial',
}

// 语言标识
export const XA_LANG = 'XA_LANG';
// 登陆状态
export const XA_LOGIN_STATUS = 'XA_LOGIN_STATUS';
// Token
export const XA_TOKEN = 'XA_TOKEN';
// loginExpired
export const XA_LOGIN_EXPIRED = 'XA_LOGIN_EXPIRED';
// 用户信息
export const XA_USERINFO = 'XA_USERINFO';

// sse事件
export const XA_SSE_UPDATE = 'XA_SSE_UPDATE';
// sse关闭事件
export const XA_SSE_CLOSE = 'XA_SSE_CLOSE';
// 下载进度
export const XA_DOWNLOAD = 'XA_DOWNLOAD';
// 短信权限状态
export const XA_SMS_STATUS = 'XA_SMS_STATUS';

export enum ERROR_CODES {
  'INSUFFICIENT_BALANCE' = 1013,
  'UPI_ERROR' = 1014,
}
