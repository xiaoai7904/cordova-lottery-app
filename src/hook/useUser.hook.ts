import { reactive, computed } from 'vue';
import {
  GetUserInfoRequest,
  XA_TOKEN,
  HomeInfoType,
  UserInfoType,
  HistoryOrderItem,
  PayCardInfoType,
  InviteInfoType,
} from 'src/common';
import { useLocalStorage } from 'src/hook';

const userStore = reactive({
  loading: false,
  userInfo: {} as UserInfoType,
  homeInfo: {} as HomeInfoType,
  historyOrderList: [] as HistoryOrderItem[],
  payCardInfo: {} as PayCardInfoType,
  inviteInfo: {} as InviteInfoType,
});

/**
 * 用户相关
 */
export function useUser() {
  const { localStore } = useLocalStorage();
  const isLogin = computed(() => !!localStore.get(XA_TOKEN));
  const userInfo = computed(() => userStore.userInfo);
  const homeInfo = computed<HomeInfoType>(() => userStore.homeInfo);
  const payCardInfo = computed<PayCardInfoType>(() => userStore.payCardInfo);
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
    homeInfo,
    payCardInfo,
    getUserInfo,
  };
}
