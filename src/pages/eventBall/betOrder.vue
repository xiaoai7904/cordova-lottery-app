<template>
  <div class="bet-order">
    <Headers :title="betOrderStore.title" transparent />
    <div class="bet-order-content">
      <div class="clear flex-center" @click="clearOrder">
        <van-icon name="delete-o" size="14" />
        <span>清空赛事</span>
      </div>

      <div class="bet-order-item">
        <div class="flex-between">
          <h1>福冈黄蜂 VS 福冈黄蜂</h1>
          <div>
            <span class="week">周二</span>
            <span class="name">xxx杯</span>
            <span class="time">12:29</span>
          </div>
        </div>
        <div class="flex-between">
          <span class="result">3:3</span>
          <div class="op flex-center">
            <p>胆</p>
            <van-icon name="close" size="14" />
          </div>
        </div>
      </div>

      <div class="bet-order-box"></div>
    </div>

    <div class="bet-order-bottom flex-between van-safe-area-bottom">
      <div class="center">
        <p>共<span class="value">1</span>注<span class="value">100</span>元</p>
        <p>预计奖金 <span class="value">100～2000</span>元</p>
      </div>
      <div class="flex-start">
        <div class="btn1">自购</div>
        <div class="btn">发单</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router';
import { useBet } from 'src/hook'
import { XA_DEL_BET } from 'src/common'
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  setup() {
    const { query } = useRoute()
    const { betStore } = useBet()

    const betOrderStore = reactive({
      title: query.title
    })

    const clearOrder = () => {
      window.xaCustomEvent.trigger(XA_DEL_BET)
    }

    console.log(betStore)
    return { betOrderStore, clearOrder }
  }
})
</script>

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
