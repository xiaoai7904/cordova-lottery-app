import { reactive } from 'vue';
import {
  OpStartRequest,
  OpStopRequest,
  OpConfirmRequest,
  OpRejectRequest,
  OrderListRequest,
  OrderItemType,
  Utils,
} from 'src/common';
import { useNotify } from 'src/hook';

export function useOrder() {
  const { successNotify, showLoading, hidnLoading, showComfirmDialog } =
    useNotify();
  const orderStore = reactive({
    loading: false,
    orderList: [] as OrderItemType[],
    orderInfo: {
      pageIndex: 1,
      total: 10,
      isLoadEnd: false,
    },
    isOpen: false,
  });

  const getSign = (param: Record<string, string | number>) =>
    Utils.md5(
      `amount=${param.amount}&pOrderId=${param.pOrderId}&utr=${param.utr}`
    );
  // 开始营业
  const openOrder = () => {
    return new Promise(async (resolve, reject) => {
      try {
        showLoading('Open in...');
        await OpStartRequest<any, any>();
        // successNotify('Open successfully');
        resolve(true);
      } catch (e) {
        reject(e);
      } finally {
        hidnLoading();
      }
    });
  };

  // 开始营业
  const closeOrder = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        showLoading('Close in...');
        await OpStopRequest<any, any>();
        // successNotify('Closed successfully');
        resolve(true);
      } catch (e) {
        reject(e);
      } finally {
        hidnLoading();
      }
    });
  };

  // 确认订单
  const confirmOrder = (param = {} as Record<string, string | number>) => {
    showComfirmDialog({
      title: 'INFO',
      content: 'Are you sure you want to do this?',
      async confirm() {
        try {
          param.sign = getSign(param);
          await OpConfirmRequest<any, any>(param);
          successNotify('Recognition of receipts');
        } finally {
          orderStore.loading = false;
        }
      },
    });
  };

  // 申诉订单
  const rejectOrder = async (param = {} as Record<string, string | number>) => {
    showComfirmDialog({
      title: 'INFO',
      content: 'Are you sure you want to do this?',
      async confirm() {
        try {
          param.sign = getSign(param);
          await OpRejectRequest<any, any>(param);
          successNotify(
            'Successfully submitted, please wait patiently for processing'
          );
        } finally {
          orderStore.loading = false;
        }
      },
    });
  };

  // 订单列表
  const getOrderList = async (params = {}) => {
    try {
      orderStore.loading = true;
      const data = await OrderListRequest<any, any>({
        pageIndex: orderStore.orderInfo.pageIndex,
        ...params,
      });

      if (orderStore.orderInfo.pageIndex === 1) {
        orderStore.orderList = [...data.orderList];
      } else {
        orderStore.orderList = [...orderStore.orderList, ...data.orderList];
      }

      orderStore.isOpen = data.isOpen;
      orderStore.orderInfo = {
        pageIndex: data.pageIndex,
        total: data.totalCount,
        isLoadEnd: orderStore.orderList.length >= data.totalCount,
      };
    } finally {
      orderStore.loading = false;
    }
  };

  const loadOrderList = (pageIndex?: number) => {
    if (pageIndex === 1) {
      orderStore.orderList = [];
      orderStore.orderInfo.isLoadEnd = false;
    }

    if (pageIndex) {
      orderStore.orderInfo.pageIndex = pageIndex;
    } else {
      orderStore.orderInfo.pageIndex++;
    }
  };

  return {
    orderStore,
    openOrder,
    closeOrder,
    confirmOrder,
    rejectOrder,
    getOrderList,
    loadOrderList,
  };
}
