<template>
  <div class="withdraw">
    <Headers title="提现" transparent />
    <div class="withdraw-content">
      <div>
        <div class="top row justify-between">
          <h2 class="title">银行卡</h2>
          <span class="red">修改</span>
        </div>
        <div>
          <img class="bank" src="./assets/bank_bg.png" alt="">
          <div class="op-amount">
            <div>
              <h2 class="title">金额</h2>
              <q-input v-model="amount" placeholder="请输入提现金额" />
            </div>
            <div class="all">
              <p>余额¥ <span>{{ userInfo.balance || 0 }}</span>&nbsp;&nbsp;<span class="red"
                  @click="withdrawAll">全部提款</span></p>
            </div>
          </div>
        </div>
      </div>

      <div class="send-code">
        <q-input placeholder="验证码" v-model="code" :maxlength="6">
          <template v-slot:append>
            <div :class="{ send: true, disbale: count }" @click.stop="sendSmsCode">
              {{ count > 0 ? count + ' 秒' : '发送验证码' }}
            </div>
          </template>
        </q-input>
      </div>

      <div class="btn row justify-center">
        <q-btn label="提现" type="submit" color="primary" :disabled="!amount" />
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUser, useCountDown } from 'src/hook';
export default defineComponent({
  setup() {
    const amount = ref<any>('');
    const code = ref();

    const { userInfo } = useUser();
    const { count, start } = useCountDown();

    const sendSmsCode = async () => {
      // await sendCode({ phone: registerStore.form.phone })
      start(60);
    }

    const withdrawAll = () => {
      amount.value = userInfo.value.balance || 0
    }

    return { amount, userInfo, count, code, sendSmsCode, withdrawAll }
  }
})
</script>

<style scoped lang="scss">
.withdraw {
  background: #fffef5 url('../../css/common/body.png') no-repeat top;
  background-size: 390px 100%;
  min-height: 100vh;
  font-size: 14px;
  ;

  &-content {

    padding: 44px 15px 15px 15px;

    >div:first-child {
      background: #fff;
      border-radius: 8px;
      padding: 15px 0;
      box-shadow: 0 2px 4px 0 hsla(0, 0%, 91.8%, .5);
    }

    .top {
      padding: 0 15px 15px 15px;
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

    .op-amount {
      padding: 15px 15px 0 15px;
    }

    .all {
      padding: 15px 0 0 0;
      text-align: right;
    }

    .red {
      color: #f73;
    }

    .bank {
      width: 100%;
      height: 89px;
    }

    .send {
      font-size: 15px;
      color: #f73;
    }

    .send-code {
      background: #fff;
      border-radius: 8px;
      padding: 0 15px;
      box-shadow: 0 2px 4px 0 hsla(0, 0%, 91.8%, .5);
      margin-top: 20px;

      :deep(.q-field--standard) {
        .q-field__control:before {
          border-bottom: 0
        }
      }

      :deep(.q-field__native) {
        // font-size: 18px;
        color: grey;
        // font-weight: 900;
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

    :deep(.q-field__control) {
      height: 50px;
    }

    :deep(.q-field__native) {
      // font-size: 18px;
      color: grey;
      font-weight: 900;
    }
  }
}
</style>
