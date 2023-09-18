import { useNotify } from 'src/hook';
import { AppVersionRequest, XA_DOWNLOAD } from 'src/common';

export function useHotUpdateApk() {
  const { showComfirmDialog, showDownloadDialog } = useNotify();

  const checkAppVersion = async () => {
    if (!window.ApkUpdater) return false;

    const versionInfo = await window.ApkUpdater.getInstalledVersion();
    const currentAppVersion: any = await AppVersionRequest();

    console.log('versionInfo', versionInfo);
    console.log('downloadUrl', currentAppVersion.downloadUrl);

    const version = versionInfo.version.name;

    const oldVersionNum = Number(version?.split('.').join(''));
    const newVersionNum = Number(
      currentAppVersion.version?.split('.').join('')
    );

    console.log('oldVersionNum', oldVersionNum);
    console.log('newVersionNum', newVersionNum);

    if (oldVersionNum < newVersionNum) {
      showComfirmDialog({
        title: 'INFO',
        content: `New version found v${currentAppVersion.version}, please confirm installation`,
        confirm() {
          downloadApk(currentAppVersion.downloadUrl);
        },
      });
    }
  };

  // url = https://www.eeindo.com/download/eed_release_{版本号}.apk
  const downloadApk = (url: string) => {
    if (!window.ApkUpdater) return false;
    showDownloadDialog();
    window.ApkUpdater.download(
      url,
      {
        onDownloadProgress: (e: any) => {
          window.xaCustomEvent.trigger(XA_DOWNLOAD, e);
        },
      },
      function () {
        window.ApkUpdater.install(
          (data: any) => {
            console.log('install', data);
          },
          (e: any) => {
            console.log('install error', e);
          }
        );
      },
      console.error
    );
  };

  return {
    checkAppVersion,
    downloadApk,
  };
}
