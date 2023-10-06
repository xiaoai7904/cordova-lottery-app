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
      pageNum: 1,
      total: 10,
      pageSize: 1,
      pages: 0,
      list: [] as any[],
      isLoadEnd: false,
    },
    recharge: {
      pageNum: 1,
      total: 10,
      pageSize: 1,
      pages: 0,
      list: [] as any[],
      isLoadEnd: false,
    },
    withdraw: {
      pageNum: 1,
      total: 10,
      pageSize: 1,
      pages: 0,
      list: [] as any[],
      isLoadEnd: false,
    },
    order: {
      pageNum: 1,
      total: 10,
      pageSize: 1,
      pages: 0,
      list: [] as any[],
      isLoadEnd: false,
    },
    follow: {
      pageNum: 1,
      total: 10,
      pageSize: 1,
      pages: 0,
      list: [] as any[],
      isLoadEnd: false,
    },
    message: {
      pageNum: 1,
      total: 10,
      pageSize: 1,
      pages: 0,
      list: [] as any[],
      isLoadEnd: false,
    },
    advisory: {
      pageNum: 1,
      total: 10,
      pageSize: 1,
      pages: 0,
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
        pageNum: privateRecordStore.accountDetails.pageNum,
        ...params,
      });

      if (privateRecordStore.accountDetails.pageNum === 1) {
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
      privateRecordStore.accountDetails.pageSize = data.pageSize;
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
        pageNum: privateRecordStore.recharge.pageNum,
        ...params,
      });

      if (privateRecordStore.recharge.pageNum === 1) {
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
      privateRecordStore.recharge.pageSize = data.pageSize;
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
        pageNum: privateRecordStore.withdraw.pageNum,
        ...params,
      });

      if (privateRecordStore.withdraw.pageNum === 1) {
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
      privateRecordStore.withdraw.pageSize = data.pageSize;
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
        pageNum: privateRecordStore.order.pageNum,
        ...params,
      });

      if (privateRecordStore.order.pageNum === 1) {
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
      privateRecordStore.order.pageSize = data.pageSize;
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
        pageNum: privateRecordStore.follow.pageNum,
        ...params,
      });

      if (privateRecordStore.follow.pageNum === 1) {
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
      privateRecordStore.follow.pageSize = data.pageSize;
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
        pageNum: privateRecordStore.message.pageNum,
        ...params,
      });

      if (privateRecordStore.message.pageNum === 1) {
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
      privateRecordStore.message.pageSize = data.pageSize;
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
        pageNum: privateRecordStore.advisory.pageNum,
        ...params,
      });

      if (privateRecordStore.advisory.pageNum === 1) {
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
      privateRecordStore.advisory.pageSize = data.pageSize;
      privateRecordStore.advisory.pages = data.pages;
    } finally {
      privateRecordStore.loading = false;
    }
  };

  const loadAccountDetailsList = (index?: number) => {
    if (index) {
      privateRecordStore.accountDetails.pageNum = index;
    } else {
      privateRecordStore.accountDetails.pageNum++;
    }
  };

  const loadRechargeList = (index?: number) => {
    if (index) {
      privateRecordStore.recharge.pageNum = index;
    } else {
      privateRecordStore.recharge.pageNum++;
    }
  };

  const loadWithdrawList = (index?: number) => {
    if (index) {
      privateRecordStore.withdraw.pageNum = index;
    } else {
      privateRecordStore.withdraw.pageNum++;
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
    loadAccountDetailsList,
    loadRechargeList,
    loadWithdrawList,
  };
}
