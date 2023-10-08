import { api } from 'src/boot/axios';

export const uploadApi = '/api/common/upload';

export function UploadRequest<T, R>(params = {} as T, config: any) {
  return api.post<T, R>(uploadApi, params, config);
}
/**
 * 登录
 * @param params { "phone": "string","password": "string" }
 * @returns Promise<any>
 */
export function LoginRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/login', params);
}

/**
 * 退出
 * @param params {}
 * @returns Promise<any>
 */
export function LogoutRequest<T, R>(params = {} as T) {
  return api.get<T, R>('/api/logout', { params });
}

/**
 * 注册
 * @param params {
    "phone":"18822829501",
    "smscode":"666666",
    "password":"a12345678",
    "inviteCode":""
}
 * @returns Promise<any>
 */
export function RegisterRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/register', params);
}

/**
 * 重置密码
 * @param params {
    "phone":"18822829501",
    "smscode":"666666",
    "password":"12345678"
}
 * @returns Promise<any>
 */
export function RestPwdRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/app/user/resetpwd', params);
}

/**
 * 发送短信验证码
 * @param params {
    "phone":"18822829501",
}
 * @returns Promise<any>
 */
export function SendCodeRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/sendcode', params);
}

// /**
//  * 上传图片
//  * @param params {}
//  * @returns Promise<any>
//  */
// export function UploadRequest<T, R>(params = {} as T) {
//   return api.post<T, R>('/upload', params);
// }

/**
 * 用户信息
 * @param params {}
 * @returns Promise<any>
 */
export function GetUserInfoRequest<T, R>(params = {} as T) {
  return api.get<T, R>('/api/user/getInfo', { params });
}

/**
 * app版本号
 * @param params {}
 * @returns Promise<any>
 */
export function AppVersionRequest<T, R>(params = {} as T) {
  return api.get<T, R>('/tools/app_version', { params });
}

/**
 * 更新用户头像
 * @param params {uid, avatar}
 * @returns
 */
export function UpdateUserAvatarRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/user/updateAvatar', params);
}

/**
 * 更新用户登录密码
 * @param params {uid, oldPassword, newPassword, code}
 * @returns
 */
export function UpdateUserLoginPasswordRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/user/updatePassword', params);
}

/**
 * 用户实名信息
 * @param params {}
 * @returns
 */
export function UserIdentityInfoRequest<T, R>(params = {} as T) {
  return api.get<T, R>('/api/user/getIdentity', { params });
}

/**
 * 实名认证
 * @param params {}
 * @returns
 */
export function SaveUserIdentityInfoRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/user/saveIdentity', params);
}

/**
 * 玩家银行卡信息
 * @param params {}
 * @returns
 */
export function UserBankInfoRequest<T, R>(params = {} as T) {
  return api.get<T, R>('/api/user/getBankList', { params });
}

/**
 * 新增银行卡信息
 * @param params {}
 * @returns
 */
export function SaveUserBankRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/user/saveBankCard', params);
}

/**
 * 我的关注
 * @param params {}
 * @returns
 */
export function GetMyFocusRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/user/getMyFocus', params);
}

/**
 * 我的粉丝
 * @param params {}
 * @returns
 */
export function GetMyFanRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/user/getMyFan', params);
}

/**
 * 关注
 * @param params {}
 * @returns
 */
export function AddFousRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/user/addFocus', params);
}

/**
 * 取消关注
 * @param params {}
 * @returns
 */
export function CancelFousRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/user/cancelFocus', params);
}

/**
 * 客服列表
 * @param params {}
 * @returns
 */
export function CustomerListRequest<T, R>(params = {} as T) {
  return api.get<T, R>('/api/common/customerList', { params });
}

/**
 * 账号明细
 * @param params
 * @returns
 */
export function FinanceListRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/finance/list', params);
}

/**
 * 充值明细
 * @param params
 * @returns
 */
export function RechargeListRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/finance/rechareList', params);
}

/**
 * 提现明细
 * @param params
 * @returns
 */
export function WithdrawListRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/finance/withdrawList', params);
}

/**
 * 我的订单/我的跟单
 * 1投注,2跟单
 * @param params
 * @returns
 */
export function OrderListRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/order/list', params);
}

/**
 * 我的发单
 * @param params
 * @returns
 */
export function FollowListRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/order/followList', params);
}

/**
 * 消息列表
 * @param params
 * @returns
 */
export function MessageListRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/message/list', params);
}

/**
 * 消息详情
 * @param params
 * @returns
 */
export function MessageDetailsRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/message/detail', params);
}

/**
 * 咨询列表
 * @param params
 * @returns
 */
export function AdvisoryListRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/message/advisoryList', params);
}

/**
 * 咨询详情
 * @param params
 * @returns
 */
export function AdvisoryDetailsRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/message/advisoryDetail', params);
}

/**
 * 首页红榜
 * @param params {}
 * @returns
 */
export function HomeRedListRequest<T, R>(params = {} as T) {
  return api.get<T, R>('/api/home/redList', { params });
}

/**
 * 篮球比分
 * @param params
 * @returns
 */
export function BasketballRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/match/basketballList', params);
}

/**
 * 足球比分
 * @param params
 * @returns
 */
export function FootballRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/match/footballList', params);
}

/**
 * 热门用户
 * @param params
 * @returns
 */
export function HotUserListRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/followOrder/userList', params);
}

/**
 * 用户跟单详情
 * @param params {}
 * @returns
 */
export function FollowOrderUserDetailsRequest<T, R>(id = '' as T) {
  return api.get<T, R>('/api/followOrder/userDetail/' + id);
}

/**
 * 跟单列表
 * @param params {}
 * @returns
 */
export function FollowOrderListRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/followOrder/followList', params);
}

/**
 * 跟单详情
 * @param params {}
 * @returns
 */
export function FollowOrderDetailsRequest<T, R>(id = '' as T) {
  return api.get<T, R>('/api/followOrder/followDetail/' + id);
}

/**
 * 加入跟单
 * @param params {}
 * @returns
 */
export function AddFollowOrderRequest<T, R>(params = {} as T) {
  return api.get<T, R>('/api/followOrder/addFollowOrder', { params });
}

/**
 * banner
 * @param params {}
 * @returns
 */
export function BannerRequest<T, R>(params = {} as T) {
  return api.get<T, R>('/api/home/bannerList', { params });
}

/**
 * 提现
 * @param params {}
 * @returns
 */
export function WithdrawRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/finance/addWithdraw', params);
}

/**
 * 充值
 * @param params {}
 * @returns
 */
export function RechargeRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/api/finance/addRecharge', params);
}

/**
 * 充值信息
 * @param params {}
 * @returns
 */
export function RechargeConfigRequest<T, R>(params = {} as T) {
  return api.get<T, R>('/api/finance/rechargeConfig', { params });
}
