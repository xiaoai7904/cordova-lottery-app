import { reactive, computed } from 'vue';
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
import { useLocalStorage } from 'src/hook';

const userStore = reactive({
  loading: false,
  userInfo: {} as UserInfoType,
});

/**
 * 用户相关
 */
export function useUser() {
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

  return {
    userStore,
    isLogin,
    userInfo,
    getUserInfo,
  };
}
