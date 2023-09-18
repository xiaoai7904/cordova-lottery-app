import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { XA_TOKEN } from 'src/common';
import { LoadingBar } from 'quasar';
import { useLocalStorage, useNotify } from 'src/hook';

export const BASE_URL = '';

const { localStore } = useLocalStorage();
const { errorNotify } = useNotify();
const codes = [1013];
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(
  (config: any) => {
    LoadingBar.start();

    const token = localStore.get(XA_TOKEN);
    if (token) {
      config.headers['X-API-TOKEN'] = `${token}`;
    }
    return config;
  },
  (error: any) => {
    console.error(error);
    LoadingBar.stop();
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    LoadingBar.stop();
    if (
      response.status === 200 &&
      response.data &&
      response.data.errorCode === 0
    ) {
      return Promise.resolve(response.data.data);
    }
    // if (response.data && response.data.errorCode === 1012) {
    //   localStore.remove(XA_TOKEN);
    //   window.xaCustomEvent.trigger(XA_LOGIN_EXPIRED);
    //   return Promise.reject(response);
    // }

    if (
      response.data &&
      response.data.errorCode &&
      !codes.includes(response.data.errorCode)
    ) {
      errorNotify(response.data.errorMsg);
      // Notify.create({
      //   message: response.data.errorMsg,
      //   timeout: 1000,
      //   position: 'top',
      // });

      return Promise.reject(response);
    }
    if (response.data && response.data.status) {
    }
    if (!response.data) {
    }
    return Promise.reject(response);
  },
  (error: any) => {
    console.error(error);
    LoadingBar.stop();
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
