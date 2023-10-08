import { showSuccessToast } from 'vant';
import {
  WithdrawRequest,
  RechargeConfigRequest,
  RechargeRequest,
} from 'src/common';
import { reactive } from 'vue';

export function useRechargeWithdraw() {
  const privateRechargeWithdraw = reactive({
    loading: false,
    withdrawParams: {
      amount: '',
      bankCardId: '',
    },
    rechargeParams: {
      amount: '',
    },
  });

  const withdraw = async () => {
    try {
      privateRechargeWithdraw.loading = true;
      await WithdrawRequest(privateRechargeWithdraw.withdrawParams);
      showSuccessToast('提现申请成功');
    } finally {
      privateRechargeWithdraw.loading = false;
    }
  };

  const recharge = async () => {
    try {
      privateRechargeWithdraw.loading = true;
      await RechargeRequest(privateRechargeWithdraw.rechargeParams);
    } finally {
      privateRechargeWithdraw.loading = false;
    }
  };

  const rechargeConfig = async () => {
    try {
      privateRechargeWithdraw.loading = true;
      const data = await RechargeConfigRequest();
      return Promise.resolve(data);
    } finally {
      privateRechargeWithdraw.loading = false;
    }
  };

  return {
    privateRechargeWithdraw,
    withdraw,
    recharge,
    rechargeConfig,
  };
}
