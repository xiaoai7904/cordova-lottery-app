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
  // 用户名
  username: string;
  // 手机号
  phone: string;
  // 验证码
  code: string;
  // 密码
  password: string;
  // 密码
  password1: string;
  // 邀请码
  shareCode: string;
};

export type LoginType = {
  username: string;
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
  // 头像
  avatar: string;
  // 余额
  balance: string;
  freezen: string;
  id: number;
  // 邀请码
  inviteCode: string;
  // 登录时间
  loginTime: string;
  // 父级id
  parentId: number;
  // 手机号
  phone: string;
  // 用户名
  username: string;
  // 昵称
  nikeName: string;
  //关注
  focusNum: number;
  // 粉丝
  fanNum: number;
};

export type BankItemType = {
  id: string;
  uid: string;
  // 开户行
  openingBank: string;
  // 支行名称
  branchName: string;
  // 银行卡号
  cardNumber: string;
  // 所在省份
  province: string;
  // 所在城市
  city: string;
  createTime: string;
  updateTime: string;
};

export type CertificationInfoType = {
  uid: string;
  // 真实姓名
  realName: string;
  // 身份号码
  idCard: string;
  // 手机号
  phone: string;
};

export type AddCertificationInfoType = {
  uid?: string;
  // 真实姓名
  realName: string;
  // 身份号码
  idCard: string;
  // 手机号
  phone: string;
  image1: string;
  image2: string;
};

export type MyFocusItemType = {
  uid: string;
  // 用户昵称
  nikeName: string;
  // 盈亏率
  profit: number;
  // 中奖金额
  winAmount: number;
};

export type CustomItemType = {
  id: number;
  code: string;
  account: string;
  updateTime: string;
};
