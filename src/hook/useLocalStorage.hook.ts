import { LocalStorage } from 'quasar';
/**
 * 本地缓存
 */
export function useLocalStorage() {
  const localStore = {
    set(key: string, value: any, expires?: -1) {
      LocalStorage.set(key, JSON.stringify({ value, expires }));
    },
    get(key: string) {
      const result: string = LocalStorage.getItem(key) as string;
      if (result) {
        const store = JSON.parse(result);
        if (store.expires != -1 && store.expires < Date.now()) {
          localStore.remove(key);
          return -1;
        }
        return store.value;
      }
      return null;
    },
    remove(key: string) {
      LocalStorage.remove(key);
    },
  };
  return { localStore };
}
