/* eslint-disable */

// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface CordovaPluginsExtend extends CordovaPlugins {}

interface XaCustomEvent {
  trigger: (name: string, arg?: any) => void;
  on: (name: string, fn: (value: any) => void) => XaCustomEvent;
  off: (name: string) => XaCustomEvent;
}
declare interface Window {
  SMS: any;
  xaCustomEvent: XaCustomEvent;
  cordova: Cordova;
  chcp: any;
  ApkUpdater: any;
  appVersion: string;
  appName: string;
  StatusBar: any;
  isDisabledBack: boolean;
}

declare module 'cordova' {
  interface Cordova {
    plugins: any;
  }
}

declare module 'js-md5';
