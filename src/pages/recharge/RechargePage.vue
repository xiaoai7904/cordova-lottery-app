<template>
  <div class="recharge">
    <Headers title="充值" transparent />
    <div class="recharge-content">
      <div>
        <div>
          <h2 class="title">金额</h2>
          <q-input v-model="privateRechargeWithdraw.rechargeParams.amount" placeholder="请输入充值金额" />
        </div>
        <div class="row wrap justify-between items-center content-center q-gutter-sm amount-list">
          <div v-for="item in  rechargeAmountList " :key="item" class="row justify-center items-center amount-item"
            :class="{ 'check': checkAmount === item }" @click="selectAmount(item)">
            {{ item }}元
          </div>
        </div>
        <div class="tips">
          <h2>充值说明</h2>
          <p class="red">1、未满18岁未成年人禁止充值与投注。</p>
          <p>2、充值金额以奇数(1-3-5-7-9)结尾，将享受优先到账。</p>
          <p>3、已发起的支付必须完成支付，否则10分钟内不允许再次发起请求。</p>
          <p>4、充值金额全部用于充入店主彩票机内进行出票，非整百金额可享优先到账，大额支付请联系店主。</p>
        </div>
      </div>

      <div class="btn row justify-center">
        <q-btn label="充 值" type="submit" color="primary" :disabled="!privateRechargeWithdraw.rechargeParams.amount"
          :loading="privateRechargeWithdraw.loading" @click="submitRecharge" />
      </div>
    </div>

    <van-dialog v-model:show="rechargeModel" title="充值信息" show-cancel-button>
      <div class="recharge-modal-content">
        <div class="flex-between">
          <span>姓名</span>
          <div class="flex-start">
            <span>xxx</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" @click="copy('')">
              <path fill="currentColor"
                d="M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8Zm-56 176H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z" />
            </svg>
          </div>
        </div>

        <div class="flex-between">
          <span>银行</span>
          <div class="flex-start">
            <span>中国银行</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" @click="copy('')">
              <path fill="currentColor"
                d="M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8Zm-56 176H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z" />
            </svg>
          </div>
        </div>
        <div class="flex-between">
          <span>开户行</span>
          <div class="flex-start">
            <span>中国银行</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" @click="copy('')">
              <path fill="currentColor"
                d="M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8Zm-56 176H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z" />
            </svg>

          </div>

        </div>
        <div class="flex-between">
          <span>卡号</span>
          <div class="flex-start">
            <span>{{ Utils.formatBank('123444444444444') }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" @click="copy('')">
              <path fill="currentColor"
                d="M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8Zm-56 176H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z" />
            </svg>
          </div>

        </div>

      </div>
    </van-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRechargeWithdraw, useCopy } from 'src/hook';
import { Utils } from 'src/common'
export default defineComponent({
  setup() {
    const rechargeAmountList = ref([13, 26, 75, 243, 416, 638, 1091, 4991]);
    const checkAmount = ref(0);
    const rechargeModel = ref(false);
    const rechargeInfo = ref<any>({});

    const { privateRechargeWithdraw, recharge, rechargeConfig } = useRechargeWithdraw();
    const { handleCopy } = useCopy();

    const selectAmount = (item: any) => {
      checkAmount.value = item;
      privateRechargeWithdraw.rechargeParams.amount = item
    }

    const submitRecharge = async () => {
      await recharge();
      const data = await rechargeConfig();
      rechargeInfo.value = data
      rechargeModel.value = true
    }

    const copy = (text: string) => {
      handleCopy(text)
    }
    return { rechargeAmountList, checkAmount, privateRechargeWithdraw, rechargeModel, submitRecharge, selectAmount, copy, Utils }
  }
})
</script>

<style scoped lang="scss">
.recharge {
  background: #fffef5 url('../../css/common/body.png') no-repeat top;
  background-size: 390px 100%;
  min-height: 100vh;

  &-content {

    padding: 44px 15px 15px 15px;

    >div:first-child {
      background: #fff;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 2px 4px 0 hsla(0, 0%, 91.8%, .5);
    }

    .title {
      font-size: 14px;
      font-weight: 600;
    }

    .amount-item {
      border-radius: 5px;
      background: #fff;
      color: #77838d;
      font-size: 14px;
      width: 60px;
      height: 35px;
      border: 0.5px solid rgba(119, 131, 141, .5);

    }

    .amount-list {
      margin: 10px 0 15px 0;
    }

    .tips {
      font-size: 14px;

      >h2 {
        margin-bottom: 10px;
        font-weight: 600;
      }

      .red {
        color: #f73 !important;
      }

      p {
        font-size: 12px;
        color: #77838d;
        margin-bottom: 5px;
        line-height: 1.5em;
      }
    }

    .btn {
      width: 100%;
      padding: 20px 0;

      .q-btn {
        width: 85%;
        height: 48px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
      }
    }

    .check {
      color: #f73;
      border-color: #f73;
    }

    :deep(.q-field__control) {
      height: 50px;
    }

    :deep(.q-field__native) {
      font-size: 18px;
      color: #f73;
      font-weight: 900;
    }
  }
}

.recharge-modal-content {
  padding: 20px 15px;

  >div {
    margin-bottom: 15px;

    svg {
      margin-left: 5px;
    }

    span {
      font-size: 14px;
      font-weight: 500;
    }
  }
}
</style>
