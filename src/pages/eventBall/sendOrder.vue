<template>
  <div class="send-order">
    <Headers title="发单设置" transparent :backEvent="() => $emit('back')" />
    <div class="pl"></div>
    <div class="send-order-content">
      <h1 class="flex-start">
        <img src="./assets/ball.png" alt="">
        <span>
          {{
            `竞猜${betType === BET_TYPE.BASKETBALL ? '篮球' : '足球'}(${isSingle ? '单关' : '2串1'})`
          }}
        </span>

      </h1>
      <div class="top flex-center">
        <h1>{{ getBetTotalAmount() }}</h1>
        <p>方案金额(元)</p>
      </div>
      <div class="commission">
        <h2>提成比例</h2>
        <div>
          <div v-for="(item, index) in 10" :key="item" :class="{ 'active': Number(sendOrderStore.commission) === index }"
            @click="() => sendOrderStore.commission = index">
            {{
              index }}%</div>
        </div>

      </div>
      <div class="field">
        <h2>方案宣言</h2>
        <van-field v-model="model.cdesc" rows="2" autosize type="textarea" maxlength="500" placeholder="请输入留言"
          show-word-limit />
      </div>

      <div class="btn">
        <q-btn label="确认发单" type="submit" color="primary" :loading="privateMatchStore.loading" @click="sendOrderEvent" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, PropType } from 'vue';
import { useBet } from 'src/hook';
import { BET_TYPE } from 'src/common'

export default defineComponent({
  props: {
    betType: {
      type: Number as PropType<BET_TYPE>,
      default: 1
    }
  },
  setup(props) {
    const sendOrderStore = reactive({
      commission: -1
    })
    const { model, privateMatchStore, isSingle, flolowOrder, getBetTotalAmount } = useBet();
    const sendOrderEvent = () => {
      flolowOrder(props.betType, sendOrderStore.commission)
    }

    return { privateMatchStore, model, sendOrderStore, isSingle, sendOrderEvent, getBetTotalAmount, BET_TYPE }
  }
})
</script>

<style scoped lang="scss">
.send-order {
  background: #fffef5 url('./assets/member_bg.png') no-repeat top;
  background-size: 390px 100%;
  min-height: 100vh;

  .pl {
    height: 60px;
    background-color: transparent;
  }

  &-content {
    padding: 44px 15px 70px 15px;
    background-color: #fff;
    border-radius: 24px 24px 0 0;

    >h1 {
      font-size: 16px;
      font-weight: 500;
      padding: 0 0 20px 0;

      >img {
        width: 50px;
        height: 50px;
      }
    }



    .top {
      flex-direction: column;
      margin-bottom: 20px;

      >h1 {
        font-size: 20px;
        color: #FF7733;
        font-weight: 500;
        margin-bottom: 10px;
      }

      >p {
        font-size: 14px;
        color: $title;
      }
    }

    .commission {
      margin-bottom: 20px;

      >div {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(55px, 5fr));
        grid-gap: 10px;
        font-size: 12px;

        >div {
          border: 1px solid #e3e3e3;
          border-radius: 2px;
          padding: 10px 0;
          text-align: center;
        }
      }

      .active {
        background-color: $primary;
        color: $title;
        border-color: $primary;
      }
    }

    .field {
      .van-field {
        border: 1px solid #e3e3e3;
      }

      margin-bottom: 20px;
    }

    .btn {
      width: 100%;
      padding: 0 15px;

      .q-btn {
        width: 100%;
        height: 44px;
        border-radius: 25px;
        font-size: 16px;
      }
    }

    h2 {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 20px;
    }
  }
}
</style>
