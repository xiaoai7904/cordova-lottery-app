/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuasar } from 'quasar';
import { XA_SMS_STATUS } from 'src/common';

export function useRequestAndroidPermissions() {
  const $q = useQuasar();

  const requestPermissions = () => {
    if ($q && $q.cordova && $q.cordova.platformId == 'android') {
      const permissions = (cordova.plugins as any).permissions;
      //判断有无权限
      permissions.checkPermission(
        permissions.RECEIVE_SMS,
        function (status: any) {
          console.log('PERMISSIONSLIST', status);
          if (!status.hasPermission) {
            //获取权限
            permissions.requestPermissions(
              [permissions.RECEIVE_SMS],
              () => {
                // $q.notify({
                //   message: '短信权限开启成功',
                //   color: 'purple',
                //   timeout: 1000,
                // });
              },
              () => {
                $q.notify({
                  message: '短信权限开启失败',
                  color: 'negative',
                  timeout: 1000,
                });
              }
            );
          }
        }
      );
    }

    window.xaCustomEvent?.on(XA_SMS_STATUS, () => {
      if ($q && $q.cordova && $q.cordova.platformId == 'android') {
        const permissions = (cordova.plugins as any).permissions;

        permissions.checkPermission(
          permissions.RECEIVE_SMS,
          async (status: any) => {
            const hasPermission = status.hasPermission;

            // await SmsStatausRequest({ state: hasPermission ? 1 : 2 });
          }
        );
      }
    });
  };

  const requestFileStoragePermission = () => {
    return new Promise((reslove, reject) => {
      if ($q && $q.cordova && $q.cordova.platformId == 'android') {
        const permissions = (cordova.plugins as any).permissions;
        permissions.requestPermissions([permissions.READ_EXTERNAL_STORAGE]);
        permissions.requestPermissions(
          [permissions.WRITE_EXTERNAL_STORAGE],
          () => {
            reslove(true);
          },
          () => {
            reject(false);
          }
        );
      }
    });
  };

  const checkFileReadStoragePermission = () => {
    return new Promise((reslove) => {
      const permissions = (cordova.plugins as any).permissions;
      permissions.checkPermission(permissions.READ_EXTERNAL_STORAGE, reslove);
    });
  };

  const checkFileWriteStoragePermission = () => {
    return new Promise((reslove) => {
      const permissions = (cordova.plugins as any).permissions;
      permissions.checkPermission(permissions.WRITE_EXTERNAL_STORAGE, reslove);
    });
  };

  return {
    requestPermissions,
    requestFileStoragePermission,
    checkFileReadStoragePermission,
    checkFileWriteStoragePermission,
  };
}
