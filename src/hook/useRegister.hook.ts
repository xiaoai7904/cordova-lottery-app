import { reactive } from 'vue';
import {
  RegisterRequest,
  SendCodeRequest,
  // ForgetPasswordRequest,
  RegisterStoreType,
  RouterNameEnum,
  XA_TOKEN,
} from 'src/common';
import { useNotify, useCustomRouter, useUser, useLocalStorage } from 'src/hook';

/**
 * 注册逻辑
 */
export function useRegister() {
  const registerStore = reactive<RegisterStoreType>({
    loading: false,
    form: {
      username: '',
      phone: '',
      code: '',
      password: '',
      password1: '',
      shareCode: '',
    },
    forgetPassword: {
      phone: '',
      smscode: '',
      password: '',
      comfirmPassword: '',
    },
  });
  const router = useCustomRouter();
  const { successNotify } = useNotify();
  const { getUserInfo } = useUser();
  const { localStore } = useLocalStorage();

  const register = async () => {
    try {
      registerStore.loading = true;
      const data = await RegisterRequest(registerStore.form);
      console.log(data);
      localStore.set(XA_TOKEN, data);
      successNotify('Successful registration');
      await getUserInfo();
      setTimeout(() => {
        router.push({ name: RouterNameEnum.HOME });
      }, 300);
      // clearRegisterForm();
      // setTimeout(() => router.push({ name: RouterNameEnum.LOGIN }), 500);
    } finally {
      registerStore.loading = false;
    }
  };

  const sendCode = async (params = {}) => {
    try {
      await SendCodeRequest(params);
      successNotify('Verification Code Sent Successfully');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject();
    } finally {
    }
  };

  const forgetPassword = async () => {
    try {
      registerStore.loading = true;
      // await ForgetPasswordRequest(registerStore.forgetPassword);
      successNotify('Password changed successfully, please log in again');
      setTimeout(() => router.push({ name: RouterNameEnum.LOGIN }), 500);
    } finally {
      registerStore.loading = false;
    }
  };

  const clearRegisterForm = () => {
    registerStore.form = {
      username: '',
      phone: '',
      code: '',
      password: '',
      password1: '',
      shareCode: '',
    };
  };
  return {
    registerStore,
    register,
    sendCode,
    clearRegisterForm,
    forgetPassword,
  };
}
