// // import { render, VNode, createVNode } from 'vue';
// // import DialogView from './DialogView.vue';

// // export interface Options {
// //   show?: boolean;
// //   type?: 'info' | 'success' | 'error' | 'gift' | 'balance';
// //   showCancel?: boolean;
// //   cancelText?: string;
// //   showConfirm?: boolean;
// //   confirmText?: string;
// //   showClose?: boolean;
// //   title?: string;
// //   code?: string;
// //   desc?: string;
// //   cancel?: () => void;
// //   confirm?: () => void;
// //   close?: () => void;
// //   modalClass?: string;
// // }

// // export interface InstanceObj {
// //   isUnmounted: boolean;
// //   vm: VNode;
// //   open: () => void;
// //   unmount: () => void;
// // }

// // const mobileDialog = (option: Options) => {
// //   const { cancel, confirm, close, ...opt } = option;
// //   const dialogBox = document.createElement('div');
// //   // eslint-disable-next-line prefer-const
// //   let instance: InstanceObj;
// //   const vm: VNode = createVNode(DialogView, {
// //     ...opt,
// //     onCancel: cancel,
// //     onConfirm: confirm,
// //     'onUpdate:show'() {
// //       vm.component && (vm.component.props.show = false);
// //       close?.();
// //       instance?.unmount?.();
// //     },
// //   });
// //   instance = {
// //     isUnmounted: false,
// //     vm,
// //     open() {
// //       document.body.appendChild(dialogBox);
// //       render(vm, dialogBox);
// //       vm.component?.props && (vm.component.props.show = true);
// //     },
// //     unmount() {
// //       if (vm.component?.isUnmounted) return;
// //       instance.isUnmounted = true; // 设置销毁标记
// //       render(null, dialogBox);
// //       dialogBox?.parentNode?.removeChild(dialogBox);
// //     },
// //   };
// //   return instance;
// // };

// // export { mobileDialog };

// import { Quasar } from 'quasar';
// // import DialogView from './DialogView.vue';

// export const mobileDialog = () => {
//   // const $q = useQuasar();

//   const open = () => {
//     console.log(Quasar);
//     // $q.dialog({
//     //   component: DialogView,

//     //   // props forwarded to your custom component
//     //   componentProps: {
//     //     text: 'something',
//     //     // ...more..props...
//     //   },
//     // })
//     //   .onOk(() => {
//     //     console.log('OK');
//     //   })
//     //   .onCancel(() => {
//     //     console.log('Cancel');
//     //   })
//     //   .onDismiss(() => {
//     //     console.log('Called on OK or Cancel');
//     //   });
//   };

//   return {
//     open,
//   };
// };
