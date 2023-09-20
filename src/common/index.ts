import Utils from './utils/Utils';
import Observer from './observer/Observer';
import api from '../boot/axios';
export * from './request';
export * from './types';

export { Utils, Observer, api };
export enum RouterNameEnum {
  // 首页
  HOME = 'Home',
  // 登录
  LOGIN = 'Login',
  // 注册
  REGISTER = 'Register',
  // 忘记密码
  FORGETPASSWORD = 'forgetPassword',
  // 比分
  SCORE = 'score',
  // 发现
  FIND = 'find',
  // 我的
  MY = 'my',
  // 跟单
  ORDER = 'order',
  // banner详情
  SLIDER = 'slider',
  // 商店详情
  SHOP = 'shop',
  // 用户详情
  USER_DETAIL = 'userDetail',
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
