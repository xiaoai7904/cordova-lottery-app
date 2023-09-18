import { useQuasar } from 'quasar';

export function useAndroid() {
  const $q = useQuasar();
  // 修改状态栏背景色
  const setStatusBarColor = (color: string) => {
    if ($q.cordova && cordova.platformId == 'android') {
      window.StatusBar.backgroundColorByHexString(color);
    }
  };

  // 状态栏覆盖或不覆盖WebView
  const setOverlaysWebView = (value: boolean) => {
    if ($q.cordova && cordova.platformId == 'android') {
      window.StatusBar.overlaysWebView(value);
      value && updateStatusHeight();
    }
  };

  // 显示隐藏状态栏
  const showHidenStatusBar = (value: boolean) => {
    if ($q.cordova && cordova.platformId == 'android') {
      value ? window.StatusBar.show() : window.StatusBar.hide();
    }
  };

  // 状态栏模式
  const setStatusStyle = (model: string) => {
    if ($q.cordova && cordova.platformId == 'android') {
      model === 'dark'
        ? window.StatusBar.styleDefault()
        : window.StatusBar.styleLightContent();
    }
  };

  // 颜色名称设置状态栏的背景颜色
  const setBackgroundColorByName = (value: string) => {
    if ($q.cordova && cordova.platformId == 'android') {
      window.StatusBar.backgroundColorByName(value);
    }
  };

  const updateStatusHeight = () => {
    const statusBarHeight = window.StatusBar ? window.StatusBar.height : 0;
    document.body.style.paddingTop = statusBarHeight + 20 + 'px';
  };

  return {
    setStatusBarColor,
    setOverlaysWebView,
    showHidenStatusBar,
    setStatusStyle,
    setBackgroundColorByName,
  };
}
