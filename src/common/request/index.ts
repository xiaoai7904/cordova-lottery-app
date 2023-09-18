import { api } from 'src/boot/axios';

/**
 * 用户推广页信息
 * @param params {}
 * @returns Promise<any>
 */
export const SseApi = '/sse';

/**
 * 登录
 * @param params { "phone": "string","password": "string" }
 * @returns Promise<any>
 */
export function LoginRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/app/user/login', params);
}

/**
 * 退出
 * @param params {}
 * @returns Promise<any>
 */
export function LogoutRequest<T, R>(params = {} as T) {
  return api.get<T, R>('/app/user/logout', { data: params });
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
  return api.post<T, R>('/app/user/register', params);
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
  return api.post<T, R>('/app/sendcode', params);
}

/**
 * 首页信息 - 包含余额，牌价，费率
 * @param params {}
 * @returns Promise<any>
 */
export function HomeInfoRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/app/user/info', params);
}

/**
 * 查询历史充值记录
 * @param params {}
 * @returns Promise<any>
 */
export function RechargeHistoryRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/app/recharge/histroy', params);
}

/**
 * 开始营业 - order页面open按钮
 * @param params {}
 * @returns Promise<any>
 */
export function OpStartRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/app/op/start', params);
}

/**
 * 停止营业 - order页面close按钮
 * @param params {}
 * @returns Promise<any>
 */
export function OpStopRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/app/op/stop', params);
}

/**
 * 上传图片
 * @param params {}
 * @returns Promise<any>
 */
export function UploadRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/upload', params);
}

/**
 * 确认收款
 * @param params {
    "pOrderId": "xxxx",
    "amount": 100,
    "utr": "xxxx",
    "sign": "md5("amount=amountValue&pOrderId=pOrderIdValue&utr=utrValue")"
}
 * @returns Promise<any>
 */
export function OpConfirmRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/app/op/confirm', params);
}

/**
 * 否认收款, 申诉订单
 * @param params {
    "pOrderId": "xxxx",
    "amount": 100,
    "utr": "xxxx",
    "sign": "xxxx"
}
 * @returns Promise<any>
 */
export function OpRejectRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/app/op/appeal', params);
}

/**
 * 查看收款订单
 * @param params {type: 1：waiting 2: completed 3: cancelled}
 * @returns Promise<any>
 */
export function OrderListRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/app/orderlist', params);
}

/**
 * 添加收款账户信息
 * @param params {
    "accName":"india name", 
    "accNo":"12347978789", 
    "ifsc":"HDFC1231321", 
    "upi":"123SFD@icicc", 
    "qrUrl":"image name"
}
 * @returns Promise<any>
 */
export function CardAddRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/app/card/add', params);
}

/**
 * 删除收款账户信息
 * @param params {}
 * @returns Promise<any>
 */
export function CardDelRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/app/card/del', params);
}

/**
 * 获取用户收款账号信息
 * @param params {}
 * @returns Promise<any>
 */
export function CardInfoRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/app/card/info', params);
}

/**
 * 编辑收款账户信息
 * @param params {}
 * @returns Promise<any>
 */
export function CardEditRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/app/card/edit', params);
}

/**
 * 编辑收款账户信息
 * @param params {}
 * @returns Promise<any>
 */
export function GetUserInfoRequest<T, R>(params = {} as T) {
  return api.get<T, R>('/app/user/center', { data: params });
}

/**
 * 获取充值钱包地址
 * @param params {}
 * @returns Promise<any>
 */
export function GetRechargeAddressRequest<T, R>(params = {} as T) {
  return api.get<T, R>('/app/recharge/wallet', { data: params });
}

/**
 * 提交充值
 * @param params {}
 * @returns Promise<any>
 */
export function SubmitRechargeRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/app/recharge/usdt_confirm', params);
}

/**
 * inr充值列表
 * @param params {}
 * @returns Promise<any>
 */
export function InrRechargeListRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/app/recharge/inr_list', params);
}

/**
 * inr充值详情
 * @param params {}
 * @returns Promise<any>
 */
export function InrRechargeInfoRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/app/recharge/inr_info', params);
}

/**
 * inr充值详情锁
 * @param params {}
 * @returns Promise<any>
 */
export function InrRechargeLockRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/app/recharge/inr_lock', params);
}

/**
 * inr充值详情解锁
 * @param params {}
 * @returns Promise<any>
 */
export function InrRechargeUnLockRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/app/recharge/inr_unlock', params);
}

/**
 * inr充值提交
 * @param params {}
 * @returns Promise<any>
 */
export function InrRechargeConfirmRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/app/recharge/inr_confirm', params);
}

/**
 * 忘记密码
 * @param params {}
 * @returns Promise<any>
 */
export function ForgetPasswordRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/app/user/resetpwd', params);
}

/**
 * 短信上报
 * @param params {}
 * @returns Promise<any>
 */
export function SmsReportRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/app/sms/report', params);
}

/**
 * app版本号
 * @param params {}
 * @returns Promise<any>
 */
export function AppVersionRequest<T, R>(params = {} as T) {
  return api.get<T, R>('/tools/app_version', { data: params });
}

/**
 * 用户推广页信息
 * @param params {}
 * @returns Promise<any>
 */
export function InviteRequest<T, R>(params = {} as T) {
  return api.get<T, R>('/app/invite/info', { data: params });
}

/**
 * 用户推广明细
 * @param params {}
 * @returns Promise<any>
 */
export function InviteRecordRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/app/invite/record', params);
}

/**
 *
 * @param params {"state": 1}
 * @returns
 */
export function SmsStatausRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/app/sms/state', params);
}
