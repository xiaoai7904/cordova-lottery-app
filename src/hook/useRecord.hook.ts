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
      beginTime: '',
      endTime: '',
    },
    recharge: {
      pageNum: 1,
      total: 10,
      pageSize: 1,
      pages: 0,
      list: [] as any[],
      isLoadEnd: false,
      beginTime: '',
      endTime: '',
    },
    withdraw: {
      pageNum: 1,
      total: 10,
      pageSize: 1,
      pages: 0,
      list: [] as any[],
      isLoadEnd: false,
      beginTime: '',
      endTime: '',
    },
    order: {
      pageNum: 1,
      total: 10,
      pageSize: 1,
      pages: 0,
      list: [] as any[],
      isLoadEnd: false,
      beginTime: '',
      endTime: '',
    },
    follow: {
      pageNum: 1,
      total: 10,
      pageSize: 1,
      pages: 0,
      list: [] as any[],
      isLoadEnd: false,
      beginTime: '',
      endTime: '',
    },
    message: {
      pageNum: 1,
      total: 10,
      pageSize: 1,
      pages: 0,
      list: [] as any[],
      isLoadEnd: false,
      beginTime: '',
      endTime: '',
    },
    advisory: {
      pageNum: 1,
      total: 10,
      pageSize: 1,
      pages: 0,
      list: [] as any[],
      isLoadEnd: false,
      beginTime: '',
      endTime: '',
    },
  });

  /**
   * 账户明细
   */
  const getAccountDetailsList = async (params = {}) => {
    try {
      privateRecordStore.loading = true;
      const data = await FinanceListRequest<any, any>(
        Object.assign(
          {
            pageNum: privateRecordStore.accountDetails.pageNum,
            ...params,
          },
          privateRecordStore.accountDetails.beginTime
            ? {
                beginTime: privateRecordStore.accountDetails.beginTime,
                endTime: privateRecordStore.accountDetails.endTime,
              }
            : {}
        )
      );

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
      const data = await RechargeListRequest<any, any>(
        Object.assign(
          {
            pageNum: privateRecordStore.recharge.pageNum,
            ...params,
          },
          privateRecordStore.recharge.beginTime
            ? {
                beginTime: privateRecordStore.recharge.beginTime,
                endTime: privateRecordStore.recharge.endTime,
              }
            : {}
        )
      );

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
      const data = await WithdrawListRequest<any, any>(
        Object.assign(
          {
            pageNum: privateRecordStore.withdraw.pageNum,
            ...params,
          },
          privateRecordStore.withdraw.beginTime
            ? {
                beginTime: privateRecordStore.withdraw.beginTime,
                endTime: privateRecordStore.withdraw.endTime,
              }
            : {}
        )
      );

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
      const data = await WithdrawListRequest<any, any>(
        Object.assign(
          {
            pageNum: privateRecordStore.order.pageNum,
            ...params,
          },
          privateRecordStore.order.beginTime
            ? {
                beginTime: privateRecordStore.order.beginTime,
                endTime: privateRecordStore.order.endTime,
              }
            : {}
        )
      );

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
      const data = await FollowListRequest<any, any>(
        Object.assign(
          {
            pageNum: privateRecordStore.follow.pageNum,
            ...params,
          },
          privateRecordStore.follow.beginTime
            ? {
                beginTime: privateRecordStore.follow.beginTime,
                endTime: privateRecordStore.follow.endTime,
              }
            : {}
        )
      );

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
      const data = await MessageListRequest<any, any>(
        Object.assign(
          {
            pageNum: privateRecordStore.message.pageNum,
            ...params,
          },
          privateRecordStore.message.beginTime
            ? {
                beginTime: privateRecordStore.message.beginTime,
                endTime: privateRecordStore.message.endTime,
              }
            : {}
        )
      );

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
      const data = await AdvisoryListRequest<any, any>(
        Object.assign(
          {
            pageNum: privateRecordStore.advisory.pageNum,
            ...params,
          },
          privateRecordStore.advisory.beginTime
            ? {
                beginTime: privateRecordStore.advisory.beginTime,
                endTime: privateRecordStore.advisory.endTime,
              }
            : {}
        )
      );

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
