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
  USERDETAIL = 'userDetail',
  // 用户下单详情
  USERORDER = 'userOrder',
  // 设置
  SETTING = 'setting',
  // 登录密码
  LOGINPASSWORD = 'loginPassword',
  // 银行卡
  BANK = 'bank',
  // 添加银行卡
  ADDBANK = 'addBank',
  // 实名认证
  REALNAME = 'realName',
  // 赛事-足球
  FOOTBALL = 'footBall',
  // 赛事-篮球
  BASKETBALL = 'basketball',
  // 账户明细
  ACCOUNTDETAILS = 'accountDetails',
  // 购彩记录
  BUYLOTTERY = 'buyLottery',
  // 我的关注
  MYFOCUS = 'myFocus',
  // 我的粉丝
  MYFAN = 'myFan',
  // 充值
  RECHARGE = 'recharge',
  // 提现
  WITHDRAW = 'witdraw',
  // 投注订单
  BETORDER = 'betOrder',
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

// 选择联赛
export const XA_MATCH_SELECT_FOOTBALL = 'XA_MATCH_SELECT_FOOTBALL';
// 选择联赛
export const XA_MATCH_SELECT_BASKETTBALL =
  'XA_MATCH_SELECT_XA_MATCH_SELECT_BASKETTBALL';
// 删除投注数据
export const XA_DEL_BET = 'XA_DEL_BET';

export enum ERROR_CODES {
  'INSUFFICIENT_BALANCE' = 1013,
  'UPI_ERROR' = 1014,
}

export enum BET_TYPE {
  // 足球
  'FOOTEBALL' = 1,
  // 篮球
  'BASKETBALL' = 2,
}

export enum MATCH_STATUS {
  // 未开赛
  'NOT_START_YET' = 0,
  // 进行中
  'ONGOING' = 1,
  // 结束
  'END' = 2,
}

// 玩法表
export const ODDS_MAP = {
  // 胜负平
  spf: 'spf',
  // 让球
  rq: 'rq',
  // 比分
  bf: 'bf',
  // 角球
  jq: 'jq',
  // 半全场
  bqc: 'bqc',

  // 篮球
  // 胜负
  sf: 'sf',
  // 让分胜负
  rf: 'rf',
  // 大小分
  dxf: 'dxf',
  // 胜分差
  sfc: 'sfc',
};

export const footBallOdds = ['spf', 'rq', 'bf', 'jq', 'bqc'];
export const baskteBallOdds = ['sf', 'rf', 'dxf', 'sfc'];

export const betNameMap: any = {
  spf: {
    name: '胜平负',
    betName: ['胜', '平', '负'],
    betCode: ['3', '1', '0'],
  },
  rq: {
    name: '让球',
    betName: ['让球数', '胜', '平', '负'],
    betCode: ['', '3', '1', '0'],
  },
  bf: {
    name: '比分',
    betName: [
      '1:0',
      '2:0',
      '2:1',
      '3:0',
      '3:1',
      '3:2',
      '4:0',
      '4:1',
      '4:2',
      '5:0',
      '5:1',
      '5:2',
      '胜其他',
      '0:0',
      '1:1',
      '2:2',
      '3:3',
      '平其他',
      '0:1',
      '0:2',
      '1:2',
      '0:3',
      '1:3',
      '2:3',
      '0:4',
      '1:4',
      '2:4',
      '0:5',
      '1:5',
      '2:5',
      '负其他',
    ],
    betCode: [
      '1:0',
      '2:0',
      '2:1',
      '3:0',
      '3:1',
      '3:2',
      '4:0',
      '4:1',
      '4:2',
      '5:0',
      '5:1',
      '5:2',
      '胜其他',
      '0:0',
      '1:1',
      '2:2',
      '3:3',
      '平其他',
      '0:1',
      '0:2',
      '1:2',
      '0:3',
      '1:3',
      '2:3',
      '0:4',
      '1:4',
      '2:4',
      '0:5',
      '1:5',
      '2:5',
      '负其他',
    ],
  },
  jq: {
    name: '进球数',
    betName: ['0球', '1球', '2球', '3球', '4球', '5球', '6球', '7+球'],
    betCode: ['0', '1', '2', '3', '4', '5', '6', '7+'],
  },
  bqc: {
    name: '半全场胜平负',
    betName: [
      '胜胜',
      '胜平',
      '胜负',
      '平胜',
      '平平',
      '平负',
      '负胜',
      '负平',
      '负负',
    ],
    betCode: ['3,3', '3,1', '3,0', '1,3', '1,0', '1,1', '0,3', '0,1', '0,0'],
  },
  sf: {
    name: '胜负',
    betName: ['胜', '负'],
    betCode: ['3', '0'],
  },
  rf: {
    name: '让分胜负',
    betName: ['让分数', '胜', '负'],
    betCode: ['', '3', '0'],
  },
  dxf: {
    name: '大小分',
    betName: ['预设分', '大', '小'],
    betCode: ['', '1', '0'],
  },
  sfc: {
    name: '胜分差',
    betName: [
      '主胜1-5',
      '客胜1-5,',
      '主胜6-10',
      '客胜6-10',
      '主胜11-15',
      '客胜11-15',
      '主胜16-20',
      '客胜16-20',
      '主胜21-25',
      '客胜21-25',
      '主胜26+',
      '客胜26+',
    ],
    betCode: [
      '主胜1-5',
      '客胜1-5,',
      '主胜6-10',
      '客胜6-10',
      '主胜11-15',
      '客胜11-15',
      '主胜16-20',
      '客胜16-20',
      '主胜21-25',
      '客胜21-25',
      '主胜26+',
      '客胜26+',
    ],
  },
};
