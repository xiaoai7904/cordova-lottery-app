import { useClipboard } from '@vueuse/core';
import { useNotify } from 'src/hook';
import { useQuasar } from 'quasar';

export function useCopy() {
  const $q = useQuasar();
  const { successNotify } = useNotify();
  const { copy, isSupported } = useClipboard();
  const handleCopy = (text: string) => {
    if ($q.cordova) {
      (cordova.plugins as any).clipboard.copy(text);
      successNotify('Copy Success');
      return;
    }

    if (!isSupported) {
      return;
    }
    copy(text);
    successNotify('Copy Success');
  };

  // 获取 粘贴板 内容
  const getPaste = (): Promise<string> => {
    return new Promise(async (resolve) => {
      if ($q.cordova) {
        (cordova.plugins as any).clipboard.paste(function (text: string) {
          resolve(text);
        });
      } else {
        const text = await navigator.clipboard.readText();
        resolve(text);
      }
    });
  };

  //写入 粘贴板 内容
  const writeCliipaboard = async (text: string) => {
    if ($q.cordova) {
      (cordova.plugins as any).clipboard.copy(text);
      return;
    }
    await navigator.clipboard.writeText(text);
  };

  return {
    handleCopy,
    getPaste,
    writeCliipaboard,
  };
}
