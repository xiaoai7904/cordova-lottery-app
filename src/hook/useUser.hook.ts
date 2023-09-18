import { reactive, computed } from 'vue';
import {
  HomeInfoRequest,
  GetUserInfoRequest,
  CardInfoRequest,
  CardAddRequest,
  CardEditRequest,
  InviteRequest,
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
      const data = await GetUserInfoRequest<object, UserInfoType>();
      userStore.userInfo = { ...data };
    } catch (error) {}
  };

  /**
   *获取首页信息
   */
  const getHomeInfo = async () => {
    try {
      const data = await HomeInfoRequest<object, HomeInfoType>();
      userStore.homeInfo = { ...data };
    } catch (error) {}
  };

  /**
   *获取收款信息
   */
  const getPayCardInfo = async () => {
    try {
      const data = await CardInfoRequest<object, PayCardInfoType>();
      userStore.payCardInfo = { ...data };
    } catch (error) {}
  };

  /**
   *修改或者新增收款信息
   */
  const updatePayCardInfo = async (param = {}) => {
    try {
      userStore.loading = true;
      if (userStore.payCardInfo?.accName) {
        await CardEditRequest<object, PayCardInfoType>({
          ...userStore.payCardInfo,
          ...param,
        });
      } else {
        await CardAddRequest<object, PayCardInfoType>(param);
      }
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      userStore.loading = false;
    }
  };

  /**
   *获取推广信息
   */
  const getInviteInfo = async () => {
    try {
      if (Object.keys(userStore.inviteInfo).length) return;
      userStore.loading = true;
      const data = await InviteRequest<object, InviteInfoType>();
      userStore.inviteInfo = { ...data };
    } catch (error) {
    } finally {
      userStore.loading = false;
    }
  };

  return {
    userStore,
    isLogin,
    userInfo,
    homeInfo,
    payCardInfo,
    getUserInfo,
    getHomeInfo,
    getPayCardInfo,
    updatePayCardInfo,
    getInviteInfo,
  };
}
