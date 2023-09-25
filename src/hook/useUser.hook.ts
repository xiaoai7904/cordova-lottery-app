import { reactive, computed } from 'vue';
import { showSuccessToast } from 'vant';
import {
  GetUserInfoRequest,
  UpdateUserAvatarRequest,
  UpdateUserLoginPasswordRequest,
  UserIdentityInfoRequest,
  SaveUserIdentityInfoRequest,
  UserBankInfoRequest,
  SaveUserBankRequest,
  GetMyFocusRequest,
  GetMyFanRequest,
  CancelFousRequest,
  CustomerListRequest,
  XA_TOKEN,
  UserInfoType,
} from 'src/common';
import { useLocalStorage, useCustomRouter } from 'src/hook';

const userStore = reactive({
  loading: false,
  userInfo: {} as UserInfoType,
  bankList: [] as any[],
  loginPassword: {
    oldPassword: '',
    newPassword: '',
    newPassword1: '',
    code: '',
  },
});

/**
 * 用户相关
 */
export function useUser() {
  const router = useCustomRouter();
  const { localStore } = useLocalStorage();
  const isLogin = computed(() => !!localStore.get(XA_TOKEN));
  const userInfo = computed(() => userStore.userInfo);

  /**
   *获取用户信息
   */
  const getUserInfo = async () => {
    try {
      if (!isLogin.value) return;
      const data = await GetUserInfoRequest<object, UserInfoType>();

      userStore.userInfo = { ...data };
    } catch (error) {}
  };

  /**
   *修改用户登录密码
   */
  const updateLoginPassword = async () => {
    try {
      if (!isLogin.value) return;
      await UpdateUserLoginPasswordRequest<object, any>(
        userStore.loginPassword
      );
      showSuccessToast('密码修改成功');
      router.back();
    } catch (error) {}
  };

  return {
    userStore,
    isLogin,
    userInfo,
    getUserInfo,
    updateLoginPassword,
  };
}
