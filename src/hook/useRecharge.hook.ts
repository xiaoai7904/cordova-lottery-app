import { reactive } from 'vue';
import {
  GetRechargeAddressRequest,
  SubmitRechargeRequest,
  InrRechargeListRequest,
  InrRechargeLockRequest,
  InrRechargeUnLockRequest,
  InrRechargeConfirmRequest,
  RechargeHistoryRequest,
  RechargeUsdtAddessType,
  SubmitRechargeType,
  InrRechargeItemType,
  RechargeInrDetailsType,
  RechargeRecordItemType,
} from 'src/common';
import { useNotify } from 'src/hook';

interface RechargeStore {
  loading: boolean;
  usdtWallet: RechargeUsdtAddessType;
  submitInfo: SubmitRechargeType;
  rechargeInr: Record<string, any>;
  rechargeInrDetails: RechargeInrDetailsType;
  currenSelectOrderId: string;
  rechargeRecord: Record<string, any>;
}

/**
 * 充值逻辑
 */
export function useRecharge() {
  const rechargeStore = reactive<RechargeStore>({
    loading: false,
    usdtWallet: {
      walletId: '',
      walletAddr: '',
      qrImage: '',
    },
    submitInfo: {
      walletId: '',
      amount: 100,
      transactionId: '',
      recevieTime: '',
    },
    rechargeInr: {
      pageIndex: 1,
      total: 10,
      list: [] as InrRechargeItemType[],
      isLoadEnd: false,
    },
    rechargeInrDetails: {} as RechargeInrDetailsType,
    currenSelectOrderId: '',
    rechargeRecord: {
      pageIndex: 1,
      total: 10,
      list: [] as RechargeRecordItemType[],
      isLoadEnd: false,
    },
  });

  const { successNotify } = useNotify();

  const submitRechargeUsdt = async () => {
    try {
      rechargeStore.loading = true;
      await SubmitRechargeRequest(rechargeStore.submitInfo);
      successNotify(
        'Successfully submitted, please wait patiently for processing'
      );
    } finally {
      rechargeStore.loading = false;
    }
  };

  const getRechargeAddress = async () => {
    try {
      rechargeStore.loading = true;
      const data = await GetRechargeAddressRequest<
        any,
        RechargeUsdtAddessType
      >();
      rechargeStore.usdtWallet = { ...data };
      rechargeStore.submitInfo.walletId = data.walletId;
    } finally {
      rechargeStore.loading = false;
    }
  };

  const getRechargeInrList = async (params = {}) => {
    try {
      rechargeStore.loading = true;
      const data = await InrRechargeListRequest<any, any>({
        pageIndex: rechargeStore.rechargeInr.pageIndex,
        ...params,
      });

      data.drawList.forEach((element: any) => {
        element.expireTime = Date.now() + (element.expireTime || 0) * 1000;
      });

      if (rechargeStore.rechargeInr.pageIndex === 1) {
        rechargeStore.rechargeInr.list = [...data.drawList];
        updateOrderId(data.drawList?.[0]?.pOrderId);
      } else {
        rechargeStore.rechargeInr.list = [
          ...rechargeStore.rechargeInr.list,
          ...data.drawList,
        ];
      }

      rechargeStore.rechargeInr.total = data.totalCount;
      rechargeStore.rechargeInr.isLoadEnd =
        rechargeStore.rechargeInr.list.length >= data.totalCount;
      // rechargeStore.rechargeInr.pages = Math.ceil(data.total / investStore.limit);
    } finally {
      rechargeStore.loading = false;
    }
  };

  const rechargeDetailsByLock = async () => {
    try {
      rechargeStore.loading = true;
      const data = await InrRechargeLockRequest<any, RechargeInrDetailsType>({
        pOrderId: rechargeStore.currenSelectOrderId,
      });
      rechargeStore.rechargeInrDetails = { ...data };
    } finally {
      rechargeStore.loading = false;
    }
  };

  const rechargeDetailsByUnLock = async (params = {}) => {
    try {
      rechargeStore.loading = true;
      await InrRechargeUnLockRequest<any, any>(params);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject();
    } finally {
      rechargeStore.loading = false;
    }
  };

  const rechargeInrComfirm = async (params = {}) => {
    try {
      rechargeStore.loading = true;
      await InrRechargeConfirmRequest<any, any>(params);
      successNotify(
        'Successfully submitted, please wait patiently for processing'
      );
      return Promise.resolve();
    } catch (e) {
      return Promise.reject();
    } finally {
      rechargeStore.loading = false;
    }
  };

  const loadRechargeInrList = (index?: number) => {
    if (index) {
      rechargeStore.rechargeInr.pageIndex = index;
    } else {
      rechargeStore.rechargeInr.pageIndex++;
    }
  };

  const reloadRechargeInr = () => {
    rechargeStore.rechargeInr.pageIndex = 1;
    rechargeStore.rechargeInr.isLoadEnd = false;
    getRechargeInrList();
  };

  const updateOrderId = (orderId: string) => {
    rechargeStore.currenSelectOrderId = orderId;
  };

  const reloadHistoryOrder = () => {
    rechargeStore.rechargeRecord.pageIndex = 1;
    rechargeStore.rechargeRecord.isLoadEnd = false;
    getHistoryOrderList();
  };

  /**
   *获取历史充值
   */
  const getHistoryOrderList = async (params = {}) => {
    try {
      if (rechargeStore.rechargeRecord.pageIndex <= 0) return;
      const data = await RechargeHistoryRequest<object, any>({
        pageIndex: rechargeStore.rechargeRecord.pageIndex,
        ...params,
      });
      if (rechargeStore.rechargeRecord.pageIndex === 1) {
        rechargeStore.rechargeRecord.list = [...data.rechargeList];
      } else {
        rechargeStore.rechargeRecord.list = [
          ...rechargeStore.rechargeRecord.list,
          ...data.rechargeList,
        ];
      }

      rechargeStore.rechargeRecord.total = data.totalCount;
      rechargeStore.rechargeRecord.isLoadEnd =
        rechargeStore.rechargeRecord.list.length >= data.totalCount;
    } catch (error) {}
  };

  const loadRechargeRecordList = (index?: number) => {
    if (index) {
      rechargeStore.rechargeRecord.pageIndex = index;
      if (index === 1) {
        rechargeStore.rechargeRecord.isLoadEnd = false;
      }
    } else {
      rechargeStore.rechargeRecord.pageIndex++;
    }
  };

  return {
    rechargeStore,
    submitRechargeUsdt,
    getRechargeAddress,
    getRechargeInrList,
    loadRechargeInrList,
    rechargeDetailsByLock,
    rechargeDetailsByUnLock,
    rechargeInrComfirm,
    updateOrderId,
    getHistoryOrderList,
    loadRechargeRecordList,
    reloadRechargeInr,
    reloadHistoryOrder,
  };
}
