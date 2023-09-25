import { reactive } from 'vue';
import {
  LoginRequest,
  LogoutRequest,
  RouterNameEnum,
  XA_TOKEN,
  XA_USERINFO,
  LoginStoreType,
  LoginResultType,
  XA_SSE_CLOSE,
  XA_SMS_STATUS,
} from 'src/common';
import { useLocalStorage, useCustomRouter, useUser } from 'src/hook';

export function useLogin() {
  const loginStore = reactive<LoginStoreType>({
    loading: false,
    form: {
      username: '',
      password: '',
    },
  });
  const router = useCustomRouter();
  const { localStore } = useLocalStorage();
  const { getUserInfo } = useUser();

  const login = async () => {
    try {
      loginStore.loading = true;
      window.xaCustomEvent.trigger(XA_SSE_CLOSE);
      const data = await LoginRequest<any, LoginResultType>(loginStore.form);
      localStore.set(XA_TOKEN, data);
      await getUserInfo();
      setTimeout(() => {
        router.push({ name: RouterNameEnum.HOME });
      }, 300);
    } finally {
      loginStore.loading = false;
    }
  };

  const logout = async () => {
    try {
      loginStore.loading = true;
      await LogoutRequest();
      setLocalStore({ token: '' });
      window.xaCustomEvent.trigger(XA_SSE_CLOSE);
      router.replace({ name: RouterNameEnum.LOGIN });
    } finally {
      loginStore.loading = false;
    }
  };

  const setLocalStore = (data: LoginResultType) => {
    localStore.set(XA_USERINFO, data);
  };

  return { loginStore, login, logout };
}
