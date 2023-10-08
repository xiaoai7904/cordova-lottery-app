import { HomeRedListRequest, BannerRequest } from 'src/common';
import { reactive } from 'vue';

export function useHome() {
  const privateHomeStore = reactive({
    loading: false,
    redList: [] as any[],
    banner: [] as any[],
  });

  const getHomeRedList = async () => {
    try {
      privateHomeStore.loading = true;
      const data: any = await HomeRedListRequest();
      privateHomeStore.redList = [...data.data];
    } catch (error) {
    } finally {
      privateHomeStore.loading = false;
    }
  };

  const getHomeBannerList = async () => {
    try {
      privateHomeStore.loading = true;
      const data: any = await BannerRequest();
      privateHomeStore.banner = [...data];
    } catch (error) {
    } finally {
      privateHomeStore.loading = false;
    }
  };

  return { privateHomeStore, getHomeRedList, getHomeBannerList };
}
