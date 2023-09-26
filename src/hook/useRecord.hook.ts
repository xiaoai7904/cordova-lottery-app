import {
  FinanceListRequest,
  RechargeListRequest,
  WithdrawListRequest,
  OrderListRequest,
  FollowListRequest,
  MessageListRequest,
  MessageDetailsRequest,
  AdvisoryListRequest,
  AdvisoryDetailsRequest,
} from 'src/common';
import { reactive } from 'vue';

export function useRecord() {
  const privateRecordStore = reactive({
    loading: false,
    accountDetails: {
      pageIndex: 1,
      total: 10,
      pages: 1,
      list: [] as any[],
      isLoadEnd: false,
    },
    recharge: {
      pageIndex: 1,
      total: 10,
      pages: 1,
      list: [] as any[],
      isLoadEnd: false,
    },
    withdraw: {
      pageIndex: 1,
      total: 10,
      pages: 1,
      list: [] as any[],
      isLoadEnd: false,
    },
    order: {
      pageIndex: 1,
      total: 10,
      pages: 1,
      list: [] as any[],
      isLoadEnd: false,
    },
    follow: {
      pageIndex: 1,
      total: 10,
      pages: 1,
      list: [] as any[],
      isLoadEnd: false,
    },
    message: {
      pageIndex: 1,
      total: 10,
      pages: 1,
      list: [] as any[],
      isLoadEnd: false,
    },
    advisory: {
      pageIndex: 1,
      total: 10,
      pages: 1,
      list: [] as any[],
      isLoadEnd: false,
    },
  });

  /**
   * 账户明细
   */
  const getAccountDetailsList = async (params = {}) => {
    try {
      privateRecordStore.loading = true;
      const data = await FinanceListRequest<any, any>({
        current: privateRecordStore.accountDetails.pageIndex,
        ...params,
      });

      if (privateRecordStore.accountDetails.pageIndex === 1) {
        privateRecordStore.accountDetails.list = [...data.records];
      } else {
        privateRecordStore.accountDetails.list = [
          ...privateRecordStore.accountDetails.list,
          ...data.records,
        ];
      }

      privateRecordStore.accountDetails.total = data.total;
      privateRecordStore.accountDetails.isLoadEnd =
        privateRecordStore.accountDetails.list.length >= data.total;
      privateRecordStore.accountDetails.pages = data.pages;
    } finally {
      privateRecordStore.loading = false;
    }
  };

  /**
   * 充值列表
   */
  const getRechargeList = async (params = {}) => {
    try {
      privateRecordStore.loading = true;
      const data = await RechargeListRequest<any, any>({
        current: privateRecordStore.recharge.pageIndex,
        ...params,
      });

      if (privateRecordStore.recharge.pageIndex === 1) {
        privateRecordStore.recharge.list = [...data.records];
      } else {
        privateRecordStore.recharge.list = [
          ...privateRecordStore.recharge.list,
          ...data.records,
        ];
      }

      privateRecordStore.recharge.total = data.total;
      privateRecordStore.recharge.isLoadEnd =
        privateRecordStore.recharge.list.length >= data.total;
      privateRecordStore.recharge.pages = data.pages;
    } finally {
      privateRecordStore.loading = false;
    }
  };

  /**
   * 提现列表
   */
  const getWithdrawList = async (params = {}) => {
    try {
      privateRecordStore.loading = true;
      const data = await WithdrawListRequest<any, any>({
        current: privateRecordStore.withdraw.pageIndex,
        ...params,
      });

      if (privateRecordStore.withdraw.pageIndex === 1) {
        privateRecordStore.withdraw.list = [...data.records];
      } else {
        privateRecordStore.withdraw.list = [
          ...privateRecordStore.withdraw.list,
          ...data.records,
        ];
      }

      privateRecordStore.withdraw.total = data.total;
      privateRecordStore.withdraw.isLoadEnd =
        privateRecordStore.withdraw.list.length >= data.total;
      privateRecordStore.withdraw.pages = data.pages;
    } finally {
      privateRecordStore.loading = false;
    }
  };

  /**
   * 我的订单列表
   */
  const getOrderList = async (params = {}) => {
    try {
      privateRecordStore.loading = true;
      const data = await WithdrawListRequest<any, any>({
        current: privateRecordStore.order.pageIndex,
        ...params,
      });

      if (privateRecordStore.order.pageIndex === 1) {
        privateRecordStore.order.list = [...data.records];
      } else {
        privateRecordStore.order.list = [
          ...privateRecordStore.order.list,
          ...data.records,
        ];
      }

      privateRecordStore.order.total = data.total;
      privateRecordStore.order.isLoadEnd =
        privateRecordStore.order.list.length >= data.total;
      privateRecordStore.order.pages = data.pages;
    } finally {
      privateRecordStore.loading = false;
    }
  };

  /**
   * 我的发单列表
   */
  const getFollowList = async (params = {}) => {
    try {
      privateRecordStore.loading = true;
      const data = await FollowListRequest<any, any>({
        current: privateRecordStore.follow.pageIndex,
        ...params,
      });

      if (privateRecordStore.follow.pageIndex === 1) {
        privateRecordStore.follow.list = [...data.records];
      } else {
        privateRecordStore.follow.list = [
          ...privateRecordStore.follow.list,
          ...data.records,
        ];
      }

      privateRecordStore.follow.total = data.total;
      privateRecordStore.follow.isLoadEnd =
        privateRecordStore.follow.list.length >= data.total;
      privateRecordStore.follow.pages = data.pages;
    } finally {
      privateRecordStore.loading = false;
    }
  };

  /**
   * 我的消息列表
   */
  const getMessageList = async (params = {}) => {
    try {
      privateRecordStore.loading = true;
      const data = await MessageListRequest<any, any>({
        current: privateRecordStore.message.pageIndex,
        ...params,
      });

      if (privateRecordStore.message.pageIndex === 1) {
        privateRecordStore.message.list = [...data.records];
      } else {
        privateRecordStore.message.list = [
          ...privateRecordStore.message.list,
          ...data.records,
        ];
      }

      privateRecordStore.message.total = data.total;
      privateRecordStore.message.isLoadEnd =
        privateRecordStore.message.list.length >= data.total;
      privateRecordStore.message.pages = data.pages;
    } finally {
      privateRecordStore.loading = false;
    }
  };

  /**
   * 咨询列表
   */
  const getAdvisoryList = async (params = {}) => {
    try {
      privateRecordStore.loading = true;
      const data = await AdvisoryListRequest<any, any>({
        current: privateRecordStore.advisory.pageIndex,
        ...params,
      });

      if (privateRecordStore.advisory.pageIndex === 1) {
        privateRecordStore.advisory.list = [...data.records];
      } else {
        privateRecordStore.advisory.list = [
          ...privateRecordStore.advisory.list,
          ...data.records,
        ];
      }

      privateRecordStore.advisory.total = data.total;
      privateRecordStore.advisory.isLoadEnd =
        privateRecordStore.advisory.list.length >= data.total;
      privateRecordStore.advisory.pages = data.pages;
    } finally {
      privateRecordStore.loading = false;
    }
  };

  return {
    privateRecordStore,
    getAccountDetailsList,
    getRechargeList,
    getWithdrawList,
    getFollowList,
    getOrderList,
    getMessageList,
    getAdvisoryList,
  };
}
