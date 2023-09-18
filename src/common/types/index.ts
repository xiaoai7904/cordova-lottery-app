export type RequestResponse<T> = {
  errorCode: number;
  data: T;
  errorMsg: string;
};

export type ListType<T> = {
  list: T[];
  total: number;
  currentPage: number;
};

export type RegisterType = {
  // 手机号
  phone: string;
  // 验证码
  smscode: string;
  // 密码
  password: string;
  // 密码
  password1: string;
  // 邀请码
  inviteCode: string;
};

export type LoginType = {
  phone: string;
  password: string;
};

export type HomeInfoType = {
  // 余额
  balance: number;
  // usdt费率(百分比)
  usdtRate: number;
  // 卢比费率(百分比)
  inrRate: number;
  // 当前牌价
  current: number;
  // wazirx交易所价格
  wazirx: number;
  // binance交易所价格
  binance: number;
  // coindcx交易所价格
  coindcx: number;

  banners: Record<string, any>;
  customer: Record<string, any>;
  [index: string]: any;
};

export type RechrageHistortType = {
  // 订单号
  id: string;
  // 充值类型 1 USDT 2 INR
  type: number;
  // 金额
  cash: number;
};

export type AccountCardType = {
  // 持卡人姓名
  accName: string;
  // 银行账户号
  accNo: string;
  // ifsc编号
  ifsc: string;
  // upi收款账号
  upi: string;
  qrUrl: string;
};

export type LoginStoreType = {
  loading: boolean;
  form: LoginType;
};

export type LoginResultType = {
  token: string;
};

export type ForgetPasswrodType = {
  // 手机号
  phone: string;
  // 验证码
  smscode: string;
  // 密码
  password: string;
  // 密码
  comfirmPassword: string;
};

export type RegisterStoreType = {
  loading: boolean;
  form: RegisterType;
  forgetPassword: ForgetPasswrodType;
};

export type UserInfoType = {
  userId: string;
  phone: string;
  balance: number;
  vip: number;
};

export enum RechargeTypeEnum {
  USDT = 'USDT',
  INR = 'INR',
}

export type HistoryOrderItem = {
  id: number;
  type: RechargeTypeEnum;
  cash: number;
};
export type InviteInfoType = {
  // 邀请码
  inviteCode: string;
  // 推广页URL
  inviteUrl: string;
};
export type PayCardInfoType = {
  // 持卡人姓名
  accName: string;
  // 银行账户号
  accNo: string;
  // ifsc编号
  ifsc: string;
  // upi收款账号
  upi: string;
  // 上传图片之后返回的图片名称
  qrUrl: string;
};

export type RechargeUsdtAddessType = {
  // 钱包id
  walletId: string;
  // 钱包地址
  walletAddr: string;
  // 二维码地址
  qrImage: string;
};

export type SubmitRechargeType = {
  // 钱包id
  walletId: string;
  // 金额
  amount: number;
  // hash
  transactionId: string;
  // 接受时间
  recevieTime: string;
};

export type InrRechargeItemType = {
  pOrderId: string;
  amount: number;
  price: number;
  expireTime: number;
};

export type OrderItemType = {
  // 订单号
  pOrderId: string;
  // utr
  utr: string;
  // 金额
  amount: string;
  // 过期时间
  expireTime: string;
  //  1:processing 2:completed 3:checking
  state: string;
};

export type RechargeInrDetailsType = {
  // 订单号
  pOrderId: string;
  // 金额 app用户需要支付金额
  amount: string;
  // 收益 可不展示
  price: string;
  // 收款人名称
  accountName: string;
  // 收款账号
  accountNo: string;
  // ifsc账号
  ifsc: string;
  // 超时时间 单位:秒
  expireTime: string;
};

export type RechargeRecordItemType = {
  id: string;
  // 充值类型 1 USDT 2 INR
  type: string;
  // 充值金额
  cash: string;
};

export type InviteRecordItemType = {
  childUserPhone: string;
  amount: number;
  profit: number;
  createTime: string;
};
