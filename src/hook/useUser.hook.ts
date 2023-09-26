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
  BankItemType,
  CertificationInfoType,
  AddCertificationInfoType,
  MyFocusItemType,
  CustomItemType,
} from 'src/common';
import { useLocalStorage, useCustomRouter } from 'src/hook';

const userStore = reactive({
  loading: false,
  userInfo: {} as UserInfoType,
});

/**
 * 用户相关
 */
export function useUser() {
  const router = useCustomRouter();
  const { localStore } = useLocalStorage();
  const isLogin = computed(() => !!localStore.get(XA_TOKEN));
  const userInfo = computed(() => userStore.userInfo);
  const customerService = computed(
    () => privateUserStore.customerList?.[0] ?? {}
  );

  const privateUserStore = reactive({
    bankLoading: false,
    flowLoading: false,
    bankList: [] as BankItemType[],
    loginPassword: {
      oldPassword: '',
      newPassword: '',
      newPassword1: '',
      code: '',
    },
    bank: {
      openingBank: '',
      branchName: '',
      cardNumber: '',
      province: '',
      city: '',
      phone: '',
      code: '',
    },
    certificationInfo: {
      // 真实姓名
      realName: '',
      // 身份号码
      idCard: '',
      // 手机号
      phone: '',
    } as CertificationInfoType,
    addCertificationInfo: {
      // 真实姓名
      realName: '',
      // 身份号码
      idCard: '',
      // 手机号
      phone: '',
      image1: '',
      image2: '',
    },
    myfocus: {
      pageIndex: 1,
      total: 10,
      pages: 1,
      list: [] as MyFocusItemType[],
      isLoadEnd: false,
    },
    myFan: {
      pageIndex: 1,
      total: 10,
      pages: 1,
      list: [] as MyFocusItemType[],
      isLoadEnd: false,
    },
    customerList: [] as CustomItemType[],
  });
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
        privateUserStore.loginPassword
      );
      showSuccessToast('密码修改成功');
      router.back();
    } catch (error) {}
  };

  /**
   * 更新玩家头像
   */
  const updateUserAvatar = async (param = {}) => {
    try {
      await UpdateUserAvatarRequest<object, any>(param);
      await getUserInfo();
    } catch (error) {}
  };

  /**
   * 获取玩家绑定银行卡列表
   */
  const getUserBindBankList = async () => {
    try {
      privateUserStore.bankLoading = true;
      const data = await UserBankInfoRequest<object, BankItemType[]>();
      privateUserStore.bankList = [...data];
    } catch (error) {
    } finally {
      privateUserStore.bankLoading = false;
    }
  };

  /**
   * 增加银行卡
   */
  const addUserBank = async () => {
    try {
      privateUserStore.bankLoading = true;
      await SaveUserBankRequest(privateUserStore.bank);
      showSuccessToast('添加成功');
      router.back();
    } catch (error) {
    } finally {
      privateUserStore.bankLoading = false;
    }
  };

  /**
   * 实名认证信息
   */
  const getCertificationInfo = async () => {
    try {
      const data = await UserIdentityInfoRequest<any, CertificationInfoType>();
      privateUserStore.certificationInfo = { ...data };
    } catch (error) {
    } finally {
    }
  };

  /**
   * 添加实名认证
   */
  const addCertificationInfo = async () => {
    try {
      await SaveUserIdentityInfoRequest<AddCertificationInfoType, any>(
        privateUserStore.addCertificationInfo
      );
      showSuccessToast('添加成功');
      router.back();
    } catch (error) {}
  };

  /**
   * 取消关注
   * @returns {}
   */
  const cancelFocus = async () => {
    try {
      await CancelFousRequest<any, any>();
      showSuccessToast('取消成功');
      return Promise.resolve();
    } catch (error) {}
  };

  /**
   * 我的关注列表
   * @param params {}
   */
  const getMyFocusList = async (params = {}) => {
    try {
      privateUserStore.flowLoading = true;
      const data = await GetMyFocusRequest<any, any>({
        current: privateUserStore.myfocus.pageIndex,
        ...params,
      });

      if (privateUserStore.myfocus.pageIndex === 1) {
        privateUserStore.myfocus.list = [...data.records];
      } else {
        privateUserStore.myfocus.list = [
          ...privateUserStore.myfocus.list,
          ...data.records,
        ];
      }

      privateUserStore.myfocus.total = data.total;
      privateUserStore.myfocus.isLoadEnd =
        privateUserStore.myfocus.list.length >= data.total;
      privateUserStore.myfocus.pages = data.pages;
    } finally {
      privateUserStore.flowLoading = false;
    }
  };

  /**
   * 我的粉丝列表
   * @param params {}
   */
  const getMyFanList = async (params = {}) => {
    try {
      privateUserStore.flowLoading = true;
      const data = await GetMyFanRequest<any, any>({
        current: privateUserStore.myFan.pageIndex,
        ...params,
      });

      if (privateUserStore.myFan.pageIndex === 1) {
        privateUserStore.myFan.list = [...data.records];
      } else {
        privateUserStore.myFan.list = [
          ...privateUserStore.myFan.list,
          ...data.records,
        ];
      }

      privateUserStore.myFan.total = data.total;
      privateUserStore.myFan.isLoadEnd =
        privateUserStore.myFan.list.length >= data.total;
      privateUserStore.myFan.pages = data.pages;
    } finally {
      privateUserStore.flowLoading = false;
    }
  };

  /**
   * 客服信息
   */
  const getCustomList = async () => {
    try {
      const data = await CustomerListRequest<any, any>();
      privateUserStore.customerList = [...data];
    } catch (error) {}
  };

  return {
    userStore,
    privateUserStore,
    isLogin,
    userInfo,
    customerService,
    getUserInfo,
    updateLoginPassword,
    getUserBindBankList,
    addUserBank,
    getCertificationInfo,
    addCertificationInfo,
    getMyFocusList,
    getMyFanList,
    cancelFocus,
    getCustomList,
    updateUserAvatar,
  };
}
