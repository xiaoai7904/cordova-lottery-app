import { reactive } from 'vue';
import {
  RegisterRequest,
  SendCodeRequest,
  ForgetPasswordRequest,
  RegisterStoreType,
  RouterNameEnum,
} from 'src/common';
import { useNotify, useCustomRouter } from 'src/hook';

/**
 * 注册逻辑
 */
export function useRegister() {
  const registerStore = reactive<RegisterStoreType>({
    loading: false,
    form: {
      phone: '',
      smscode: '',
      password: '',
      password1: '',
      inviteCode: '',
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
  const register = async () => {
    try {
      registerStore.loading = true;
      await RegisterRequest(registerStore.form);
      successNotify('Successful registration');
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
      await ForgetPasswordRequest(registerStore.forgetPassword);
      successNotify('Password changed successfully, please log in again');
      setTimeout(() => router.push({ name: RouterNameEnum.LOGIN }), 500);
    } finally {
      registerStore.loading = false;
    }
  };

  const clearRegisterForm = () => {
    registerStore.form = {
      phone: '',
      smscode: '',
      password: '',
      password1: '',
      inviteCode: '',
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
