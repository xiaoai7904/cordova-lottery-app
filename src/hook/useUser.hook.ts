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
  CustomerListRequest,
  IsFocusRequest,
  UpdateNikeNameRequest,
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
    nikeName: '',
    loginPassword: {
      oldPassword: '',
      newPassword: '',
      newPassword1: '',
      code: '',
    },
    bank: {
      name: '',
      openingBank: '',
      branchName: '',
      cardNumber: '',
      province: '',
      city: '',
      phone: '',
      code: '',
      password: '',
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
   *修改用户昵称
   */
  const updateNickName = async () => {
    try {
      if (!isLogin.value) return;
      await UpdateNikeNameRequest<object, any>({
        nikeName: privateUserStore.nikeName,
      });
      await getUserInfo();
      showSuccessToast('修改成功');
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
      return Promise.resolve(data);
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
   * 客服信息
   */
  const getCustomList = async () => {
    try {
      const data = await CustomerListRequest<any, any>();
      privateUserStore.customerList = [...data];
    } catch (error) {}
  };

  /**
   * 是否关注
   */
  const getFoucsStatus = async (params = {}) => {
    try {
      const data = await IsFocusRequest<any, any>(params);
      return Promise.resolve(data);
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
    updateNickName,
    getUserBindBankList,
    addUserBank,
    getCertificationInfo,
    addCertificationInfo,
    getCustomList,
    updateUserAvatar,
    getFoucsStatus,
  };
}
