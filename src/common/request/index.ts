import { api } from 'src/boot/axios';

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
  return api.get<T, R>('/api/logout', { data: params });
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

/**
 * 上传图片
 * @param params {}
 * @returns Promise<any>
 */
export function UploadRequest<T, R>(params = {} as T) {
  return api.post<T, R>('/upload', params);
}

/**
 * 用户信息
 * @param params {}
 * @returns Promise<any>
 */
export function GetUserInfoRequest<T, R>(params = {} as T) {
  return api.get<T, R>('/api/user/getInfo', { data: params });
}

/**
 * app版本号
 * @param params {}
 * @returns Promise<any>
 */
export function AppVersionRequest<T, R>(params = {} as T) {
  return api.get<T, R>('/tools/app_version', { data: params });
}
