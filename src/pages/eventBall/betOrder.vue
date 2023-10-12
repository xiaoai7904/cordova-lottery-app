<template>
  <div class="bet-order">
    <Headers :title="title" transparent :backEvent="() => $emit('back')" />
    <div class="bet-order-content">
      <div class="clear flex-center" @click="clearOrder">
        <van-icon name="delete-o" size="14" />
        <span>清空赛事</span>
      </div>

      <div v-for="(item, index) in betStore.betInfo" :key="index" class="bet-order-item">
        <div class="flex-between">
          <h1>{{ item.shortHome }} VS {{ item.shortAway }}</h1>
          <div>
            <span class="week">{{ Utils.getWeek(item.matchTime) }}</span>
            <span class="name">{{ item.shortComp }}</span>
            <span class="time">{{ Utils.formatDate(item.matchTime, 'HH:mm') }}</span>
          </div>
        </div>
        <div class="flex-between">
          <span class="result">{{ item?.orderOdds?.map((item: any) => item.betName).join(" ") }}</span>
          <div class="op flex-center">
            <p>胆</p>
            <van-icon name="close" size="14" @click="delBetEvent(item)" />
          </div>
        </div>
      </div>

      <div class="bet-order-box flex-between">
        <div>{{ isSingle ? '单关' : '2串1' }}</div>
        <div class="flex-center field">
          <span>买</span>
          <van-stepper v-model="model.multiple" type="number" />
          <span>倍</span>
        </div>
      </div>
    </div>

    <div class="bet-order-bottom flex-between van-safe-area-bottom">
      <div class="center">
        <p>共<span class="value">{{ getBetCount() }}</span>注<span class="value">{{
          getBetTotalAmount() }}</span>元</p>
        <p>预计奖金 <span class="value">{{ getEstimatedBonus() }}</span>元</p>
      </div>
      <div class="flex-start">
        <div class="btn1" @click="addOrderEvent">自购</div>
        <div class="btn" @click="flolowOrderEvent">发单</div>
      </div>
    </div>

    <van-popup v-model:show="betOrderStore.sendOrderPopup" position="bottom" :style="{ width: '100vw', height: '100vh' }">
      <SendOrder :betType="BET_TYPE.FOOTEBALL" @back="() => betOrderStore.sendOrderPopup = false" />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { useBet, useNotify } from 'src/hook'
import { XA_DEL_BET, Utils, BET_TYPE } from 'src/common'
import { defineComponent, reactive } from 'vue';
import { PropType } from 'vue';
import SendOrder from './sendOrder.vue';
export default defineComponent({
  components: {
    SendOrder
  },
  props: {
    title: {
      type: String as PropType<string>,
      default: '投注单'
    },
    betType: {
      type: Number as PropType<BET_TYPE>,
      default: 1
    }
  },
  setup(props) {
    const { model, betStore, isSingle, getBetCount, getBetTotalAmount, getEstimatedBonus, addOrder } = useBet()
    const { showComfirmDialog } = useNotify()
    const betOrderStore = reactive({
      sendOrderPopup: false
    })

    const clearOrder = () => {
      window.xaCustomEvent.trigger(XA_DEL_BET)
    }

    const delBetEvent = (data: any) => {
      window.xaCustomEvent.trigger(XA_DEL_BET, { matchId: data.matchId, delAll: true })
    }

    const addOrderEvent = () => {
      addOrder(props.betType)
    }

    const flolowOrderEvent = () => {

      showComfirmDialog({
        title: '提示',
        content: `<div>
          <p>方案金额<span style="color:#FF7733;font-weight:500"> ${getBetTotalAmount()}</span></p>
          <p>您确定要进入发单设置吗？</p>
        </div>`,
        async confirm() {
          betOrderStore.sendOrderPopup = true
        },
      });

    }

    return { model, betStore, betOrderStore, isSingle, clearOrder, delBetEvent, getBetCount, getBetTotalAmount, getEstimatedBonus, addOrderEvent, flolowOrderEvent, Utils, BET_TYPE }
  }
})
</script>

<style>
/* :root {
    --van-stepper-background: #fff;
} */
</style>
<style scoped lang="scss">
.bet-order {
  background: #fffef5 url('./assets/member_bg.png') no-repeat top;
  background-size: 390px 100%;
  min-height: 100vh;

  &-content {
    padding: 44px 0 70px 0;

    .clear {
      background-color: #fff;
      border-radius: 15px;
      width: 128px;
      height: 28px;
      margin: 20px auto;
      font-size: 14px;
      color: #1d2632;

      >span {
        margin-left: 5px;
      }
    }


  }

  &-item {
    margin: 20px auto;
    padding: 15px;
    width: 345px;
    border-radius: 14px;
    background-color: #fff;

    h1 {
      color: #232a24;
      font-size: 14px;
      font-weight: 500;
    }

    .week,
    .time {
      color: #8e8e93;
      font-size: 12px;
      font-weight: 400;
    }

    .name {
      color: #7cd4ec;
      font-size: 12px;
      margin: 0 5px;
    }

    .result {
      font-size: 14px;
      font-weight: 500;
    }

    .op {
      padding: 10px 0 0 0;
      flex-direction: column;

      >p {
        padding: 3px 10px;
        color: #d2e4e9;
        font-size: 12px;
        font-weight: 500;
        border-radius: 4px;
        border: 0.5px solid #d2e4e9;
        margin-bottom: 8px;
      }
    }
  }

  &-box {
    background-color: #fff;
    border-radius: 8px;
    font-size: 12px;
    height: 40px;
    width: 345px;
    margin: 0 auto;

    >div {
      flex: 1;
      text-align: center;
      position: relative;
    }

    >div:first-child {
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 1px;
        height: 27px;
        background-color: rgba(72, 72, 75, .1);
        margin: 0 10px;
      }
    }

    .van-stepper {
      margin: 0 5px;
    }
  }

  &-bottom {
    font-size: 14px;
    width: 100%;
    height: 68px;
    background-color: #fff;
    box-shadow: 0 -2px 7px 0 #e5e5e5;
    position: fixed;
    left: 0;
    bottom: 0;

    >img {
      width: 18px;
      height: 23px;
      margin-left: 15px;
    }

    .center {
      color: #232a24;
      text-align: center;
      flex: 1;

      .value {
        color: #f73;
        margin: 0 5px;
      }

      >p:last-child {
        margin-top: 8px;
      }
    }

    .btn {
      width: 84px;
      height: 68px;
      font-size: 16px;
      color: #2e2f30;
      text-align: center;
      line-height: 68px;
      // box-shadow: -2px 4px 8px 0 #f2f4df;
      background: linear-gradient(127deg, #fff120, #fcdf6b);
      font-weight: 500;
    }

    .btn1 {
      width: 60px;
      font-size: 16px;
      color: #2e2f30;
      text-align: center;
      line-height: 68px;
      background: rgba(255, 240, 38, .16);
      font-weight: 500;
    }
  }
}
</style>
