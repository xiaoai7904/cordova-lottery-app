import { showSuccessToast } from 'vant';
import {
  WithdrawRequest,
  RechargeConfigRequest,
  RechargeRequest,
  RouterNameEnum,
} from 'src/common';
import { reactive } from 'vue';
import { useCustomRouter } from 'src/hook';
export function useRechargeWithdraw() {
  const router = useCustomRouter();
  const privateRechargeWithdraw = reactive({
    loading: false,
    withdrawParams: {
      amount: '',
      bankCardId: '',
    },
    rechargeParams: {
      amount: '',
      rcId: '',
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
      showSuccessToast('充值提交成功');
      router.push({ name: RouterNameEnum.MY });
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
