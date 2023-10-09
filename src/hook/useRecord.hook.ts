import { showLoadingToast, showSuccessToast } from 'vant';
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
  GetMyFocusRequest,
  GetMyFanRequest,
  CancelFousRequest,
  HotUserListRequest,
  FollowOrderListRequest,
  FollowOrderUserDetailsRequest,
  FollowOrderDetailsRequest,
  AddFollowOrderRequest,
  AddFousRequest,
} from 'src/common';
import type { MyFocusItemType } from 'src/common';
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
    myfocus: {
      pageNum: 1,
      total: 10,
      pageSize: 1,
      pages: 0,
      list: [] as MyFocusItemType[],
      isLoadEnd: false,
      beginTime: '',
      endTime: '',
    },
    myFan: {
      pageNum: 1,
      total: 10,
      pageSize: 1,
      pages: 0,
      list: [] as MyFocusItemType[],
      isLoadEnd: false,
      beginTime: '',
      endTime: '',
    },
    hotUser: {
      loading: false,
      list: [] as any[],
      details: {} as any,
    },
    followOrder: {
      pageNum: 1,
      total: 10,
      pageSize: 1,
      pages: 0,
      list: [] as any[],
      isLoadEnd: false,
      beginTime: '',
      endTime: '',
      details: {} as any,
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
      const data = await OrderListRequest<any, any>(
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

  /**
   * 我的关注列表
   * @param params {}
   */
  const getMyFocusList = async (params = {}) => {
    try {
      privateRecordStore.loading = true;
      const data = await GetMyFocusRequest<any, any>(
        Object.assign(
          {
            pageNum: privateRecordStore.myfocus.pageNum,
            ...params,
          },
          privateRecordStore.myfocus.beginTime
            ? {
                beginTime: privateRecordStore.myfocus.beginTime,
                endTime: privateRecordStore.myfocus.endTime,
              }
            : {}
        )
      );

      if (privateRecordStore.myfocus.pageNum === 1) {
        privateRecordStore.myfocus.list = [{} as any, {} as any, {} as any]; //[...data.records];
      } else {
        privateRecordStore.myfocus.list = [
          ...privateRecordStore.myfocus.list,
          ...data.records,
        ];
      }

      privateRecordStore.myfocus.total = data.total;
      privateRecordStore.myfocus.isLoadEnd =
        privateRecordStore.myfocus.list.length >= data.total;
      privateRecordStore.myfocus.pageSize = data.pageSize;
      privateRecordStore.myfocus.pages = data.pages;
    } finally {
      privateRecordStore.loading = false;
    }
  };

  /**
   * 我的粉丝列表
   * @param params {}
   */
  const getMyFanList = async (params = {}) => {
    try {
      privateRecordStore.loading = true;
      const data = await GetMyFanRequest<any, any>(
        Object.assign(
          {
            pageNum: privateRecordStore.myFan.pageNum,
            ...params,
          },
          privateRecordStore.myFan.beginTime
            ? {
                beginTime: privateRecordStore.myFan.beginTime,
                endTime: privateRecordStore.myFan.endTime,
              }
            : {}
        )
      );

      if (privateRecordStore.myFan.pageNum === 1) {
        privateRecordStore.myFan.list = [...data.records];
      } else {
        privateRecordStore.myFan.list = [
          ...privateRecordStore.myFan.list,
          ...data.records,
        ];
      }

      privateRecordStore.myFan.total = data.total;
      privateRecordStore.myFan.isLoadEnd =
        privateRecordStore.myFan.list.length >= data.total;
      privateRecordStore.myFan.pageSize = data.pageSize;
      privateRecordStore.myFan.pages = data.pages;
    } finally {
      privateRecordStore.loading = false;
    }
  };

  /**
   * 热门用户
   * @param params {}
   */
  const getHotUserList = async (params = {}) => {
    try {
      privateRecordStore.hotUser.loading = true;
      const data: any = await HotUserListRequest<any, any>(params);
      privateRecordStore.hotUser.list = [...data];
    } finally {
      privateRecordStore.hotUser.loading = false;
    }
  };

  /**
   * 用户跟单详情
   * @param params {}
   */
  const getHotUserDetails = async (id: string) => {
    try {
      privateRecordStore.loading = true;
      const data: any = await FollowOrderUserDetailsRequest<any, any>(id);
      privateRecordStore.hotUser.details = { ...data };
    } finally {
      privateRecordStore.loading = false;
    }
  };

  /**
   * 跟单列表
   * @param params {}
   */
  const getFollowOrderList = async (params = {}) => {
    try {
      privateRecordStore.loading = true;
      const data = await FollowOrderListRequest<any, any>(
        Object.assign(
          {
            pageNum: privateRecordStore.followOrder.pageNum,
            ...params,
          },
          privateRecordStore.followOrder.beginTime
            ? {
                beginTime: privateRecordStore.followOrder.beginTime,
                endTime: privateRecordStore.followOrder.endTime,
              }
            : {}
        )
      );

      if (privateRecordStore.followOrder.pageNum === 1) {
        privateRecordStore.followOrder.list = [...data.records];
      } else {
        privateRecordStore.followOrder.list = [
          ...privateRecordStore.followOrder.list,
          ...data.records,
        ];
      }

      privateRecordStore.followOrder.total = data.total;
      privateRecordStore.followOrder.isLoadEnd =
        privateRecordStore.followOrder.list.length >= data.total;
      privateRecordStore.followOrder.pageSize = data.pageSize;
      privateRecordStore.followOrder.pages = data.pages;
    } finally {
      privateRecordStore.loading = false;
    }
  };

  /**
   * 用户跟单详情
   * @param params {}
   */
  const getFollowOrderDetails = async (id: string) => {
    try {
      privateRecordStore.loading = true;
      const data: any = await FollowOrderDetailsRequest<any, any>(id);
      privateRecordStore.followOrder.details = { ...data };
    } finally {
      privateRecordStore.loading = false;
    }
  };

  /**
   * 加入跟单
   * @returns {}
   */
  const addFollowOrder = async (params = {}) => {
    try {
      showLoadingToast('操作中...');
      await AddFollowOrderRequest<any, any>(params);
      showSuccessToast('跟单成功');
      return Promise.resolve();
    } catch (error) {}
  };

  /**
   * 关注
   * @returns {}
   */
  const addFocus = async (params = {}) => {
    try {
      showLoadingToast('关注中...');
      await AddFousRequest<any, any>(params);
      showSuccessToast('关注成功');
      return Promise.resolve();
    } catch (error) {}
  };

  /**
   * 取消关注
   * @returns {}
   */
  const cancelFocus = async (params = {}) => {
    try {
      showLoadingToast('取消中...');
      await CancelFousRequest<any, any>(params);
      showSuccessToast('取消成功');
      return Promise.resolve();
    } catch (error) {}
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
    getMyFocusList,
    getMyFanList,
    cancelFocus,
    addFocus,
    getHotUserList,
    getHotUserDetails,
    getFollowOrderList,
    getFollowOrderDetails,
    addFollowOrder,
  };
}
