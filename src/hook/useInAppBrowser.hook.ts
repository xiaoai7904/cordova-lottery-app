import { useQuasar } from 'quasar';
import { useCustomRouter } from 'src/hook';
export function useInAppBrowser() {
  const $q = useQuasar();
  const router = useCustomRouter();
  const open = (url: string) => {
    if (!url.startsWith('http')) {
      router.push({ path: url });
      return;
    }
    if ($q.cordova && cordova.platformId == 'android') {
      cordova.InAppBrowser.open(url, '_system');
    } else {
      window.open(url);
    }
  };

  return {
    open,
  };
}
