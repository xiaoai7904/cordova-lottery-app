import { useQuasar } from 'quasar';
import { useNotify, useRequestAndroidPermissions } from 'src/hook';
export function useSaveImage() {
  const $q = useQuasar();
  const {
    requestFileStoragePermission,
    checkFileReadStoragePermission,
    checkFileWriteStoragePermission,
  } = useRequestAndroidPermissions();

  const { successNotify } = useNotify();
  function imageToBase64(imgUrl: string) {
    return new Promise((resolve) => {
      const img = new Image();

      // 当图像加载完成后执行回调函数
      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);

        const base64Data = canvas.toDataURL('image/png');

        // 执行回调函数将 base64 数据传递出去
        resolve(base64Data);
      };

      img.src = imgUrl;
      img.setAttribute('crossOrigin', 'Anonymous');
    });
  }

  const getBase64 = (imageId: string) => {
    const imageEl: any = document.querySelector(imageId);
    // 创建Canvas元素
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // 将img标签图片绘制到Canvas上
    context?.drawImage(imageEl, 0, 0);

    // 获取Canvas中的图像数据
    return canvas.toDataURL('image/png');
  };

  function downloadBase64Image(base64Data: string, fileName: string) {
    // 创建一个 <a> 标签
    const link = document.createElement('a');

    // 设置链接的 href 属性为 base64 图片数据
    link.href = base64Data;

    // 设置链接的下载属性为指定的文件名
    link.download = fileName;

    // 添加链接到文档中
    document.body.appendChild(link);

    // 触发链接点击事件
    link.click();

    // 移除链接元素
    document.body.removeChild(link);
  }

  const saveImage = (imageUrl: string, isEl?: boolean) => {
    return new Promise(async (resolve, reject) => {
      if ($q.cordova && cordova.platformId == 'android') {
        Promise.all([
          checkFileReadStoragePermission,
          checkFileWriteStoragePermission,
        ]).then((values) => {
          if (values.length === 2 && values.every((v) => v)) {
            saveAndroidImage(imageUrl, isEl).then(resolve, reject);
          } else {
            requestFileStoragePermission().then(() => {
              saveAndroidImage(imageUrl, isEl).then(resolve, reject);
            });
          }
        });
      } else {
        downloadBase64Image(
          (isEl
            ? getBase64(imageUrl)
            : await imageToBase64(imageUrl)) as string,
          'EED_IMAGEN'
        );
      }
    });
  };

  const saveAndroidImage = (imageUrl: string, isEl?: boolean) => {
    return new Promise(async (resolve, reject) => {
      // 获取图片的 base64 数据
      let imageData = (
        isEl ? getBase64(imageUrl) : await imageToBase64(imageUrl)
      ) as string;
      imageData = imageData
        .replace('data:image/jpeg;base64,', '')
        .replace('data:image/png;base64,', '')
        .replace('data:image/jpg;base64,', '');
      // 创建文件系统
      window.resolveLocalFileSystemURL(
        cordova.file.externalRootDirectory,
        function (directoryEntry: any) {
          // 在根目录下创建一个名为 "Pictures" 的目录
          directoryEntry.getDirectory(
            'Pictures',
            { create: true, exclusive: false },
            function (picturesDir: any) {
              // 生成一个唯一的文件名
              const fileName = 'eed_image' + Date.now() + '.png';

              // 在 "Pictures" 目录下创建一个名为 fileName 的文件
              picturesDir.getFile(
                fileName,
                { create: true, exclusive: false },
                function (fileEntry: any) {
                  // 获取文件的绝对路径
                  const filePath = fileEntry.toURL();
                  // 将 base64 数据写入到文件中
                  writeFile(
                    filePath,
                    imageData,
                    function () {
                      successNotify('Picture saved successfully');
                      console.log('图片保存成功！文件路径：' + filePath);
                      resolve(filePath);
                    },
                    function (error: any) {
                      console.log('图片保存失败：', error, filePath);
                      reject(error);
                    }
                  );
                },
                function (e: any) {
                  console.log('发生错误2', e);
                  reject(e);
                }
              );
            },
            function (e: any) {
              console.log('发生错误3', e);
              reject(e);
            }
          );
        },
        function (e: any) {
          console.log('发生错误1', e);
          reject(e);
        }
      );

      // 写入文件的辅助函数
      function writeFile(
        filePath: string,
        data: any,
        successCallback: any,
        errorCallback: any
      ) {
        window.resolveLocalFileSystemURL(
          filePath,
          function (fileEntry: any) {
            fileEntry.createWriter(function (fileWriter: any) {
              fileWriter.onwriteend = successCallback;
              fileWriter.onerror = errorCallback;

              // 将 base64 数据转换为 Blob 对象
              const blob = b64toBlob(data, 'image/png');

              // 写入 Blob 对象到文件
              fileWriter.write(blob);
            }, errorCallback);
          },
          errorCallback
        );
      }

      // 将 base64 数据转换为 Blob 对象的辅助函数
      function b64toBlob(b64Data: any, contentType: any) {
        contentType = contentType || '';
        const sliceSize = 512;
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
        for (
          let offset = 0;
          offset < byteCharacters.length;
          offset += sliceSize
        ) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
      }
    });
  };
  // const saveImage = async (imageUrl: string, isEl?: boolean) => {
  //   if ($q.cordova && cordova.platformId == 'android') {
  //     console.log('externalRootDirectory', cordova.file.externalRootDirectory);
  //     // 保存Base64图片到相册

  //     window.resolveLocalFileSystemURL(
  //       cordova.file.externalRootDirectory + 'DCIM/Camera/',
  //       function (dirEntry: any) {
  //         dirEntry.getFile(
  //           'image.png',
  //           { create: true, exclusive: false },
  //           function (fileEntry: any) {
  //             fileEntry.createWriter(async function (writer: any) {
  //               writer.onwriteend = function () {
  //                 console.log('图片保存成功');
  //               };
  //               writer.onerror = function (error: any) {
  //                 console.log('图片保存失败：' + error);
  //               };
  //               const imageData: any = isEl
  //                 ? getBase64(imageUrl)
  //                 : await imageToBase64(imageUrl);
  //               imageData.replace('data:image/png;base64,', '');
  //               writer.write(imageData);
  //             });
  //           },
  //           function (error: any) {
  //             console.log('获取文件失败：' + error);
  //           }
  //         );
  //       },
  //       function (error) {
  //         console.log('获取目录失败：' + error);
  //       }
  //     );
  //   } else {
  //     downloadBase64Image(
  //       (isEl ? getBase64(imageUrl) : await imageToBase64(imageUrl)) as string,
  //       'EED_IMAGE'
  //     );
  //   }
  // };
  return {
    saveImage,
  };
}
