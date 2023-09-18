import { useQuasar } from 'quasar';
import { showToast, showLoadingToast, showSuccessToast } from 'vant';
import DialogView from 'src/components/MobileDialog/DialogView.vue';
import DownloadProgressView from 'src/components/DownloadProgress.vue';

export type DialogOptionType = {
  title: string;
  content: string;
  cancelText?: string;
  confirmText?: string;
  cancel?: () => void;
  confirm?: () => void;
};

export type DownloadDialogOptionType = {
  title: string;
  value?: number;
  total?: number;
};

export function useNotify() {
  const $q = useQuasar();
  const successNotify = (content: string) => {
    showSuccessToast(content);
    // Notify.create({
    //   type: 'positive',
    //   position: 'top',
    //   progress: true,
    //   message: content,
    //   timeout: 300,
    // });
  };

  const errorNotify = (content: string) => {
    showToast(content);
    // Notify.create({
    //   type: 'positive',
    //   position: 'top',
    //   color: 'negative',
    //   progress: true,
    //   timeout: 1000,
    //   message: content,
    // });
  };

  const showLoading = (content: string) => {
    showLoadingToast(content);
    // $q.loading.show({
    //   message: content,
    //   boxClass: 'bg-grey-2 text-grey-9',
    //   spinnerColor: 'primary',
    // });
  };

  const hidnLoading = () => {
    $q.loading.hide();
  };

  const showComfirmDialog = (options: DialogOptionType) => {
    $q.dialog({
      component: DialogView,
      componentProps: options,
    });
  };

  const showDownloadDialog = (options?: DownloadDialogOptionType) => {
    $q.dialog({
      component: DownloadProgressView,
      componentProps: options,
    });
  };

  return {
    successNotify,
    errorNotify,
    showLoading,
    hidnLoading,
    showComfirmDialog,
    showDownloadDialog,
  };
}
