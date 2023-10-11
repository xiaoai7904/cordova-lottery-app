<template>
  <div class="cbf-bet">
    <div class="content-item">
      <div class="top">
        <div class="left">{{ data.home }}<span>VS</span>{{ data.away }}</div>
        <div class="right"><span>{{ data.shortComp }}</span>{{ Utils.formatDate(data.matchTime, 'HH:mm') }}</div>
      </div>
      <div class="bottom">
        <div class="game-item" @click="explandAll">
          {{
            betStr ? betStr : '点击展开投注区'
          }}</div>
        <div class="right-icon" @click="() => (model.showEvent = !model.showEvent)">
          <div :class="model.showEvent && 'active'"></div>
        </div>
      </div>
    </div>
    <BetHistory :showEvent="model.showEvent" :params="{ shortHome: data.shortHome, shortAway: data.shortAway }" />
    <van-dialog v-model:show="model.betModel">
      <template #footer>
        <div class="bet-modal-footer flex-between">
          <van-button @click="model.betModel = false">取消</van-button>
          <van-button type="primary" @click="confirmEvent">确定</van-button>
        </div>
      </template>
      <div class="bet-modal-content">
        <BetView v-if="model.betModel" :data="data" :type="ODDS_MAP.bf" :checkData="model.betList" @bet="betEvent" />
      </div>

    </van-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { useBet } from 'src/hook'
import { Utils, betNameMap, ODDS_MAP } from 'src/common'
import BetView from './betView.vue';
import BetHistory from './betHistory.vue';

export default defineComponent({
  components: { BetView, BetHistory },
  props: {
    data: {
      type: Object as PropType<any>,
      default: () => ({})
    }
  },
  setup(props) {
    const {
      model,
      confirm,
      getBetValue,
      betEvent,
      selectBet, explandAll } = useBet()

    const betStr = computed(() => model.betList.map((v: any) => v.name).join(' '))

    const confirmEvent = () => {
      confirm(props.data)
    }

    const selectBetEvent = (value: any, code: string, playCode: string) => {
      selectBet(props.data, value, code, playCode)
    }

    return { model, selectBetEvent, betEvent, getBetValue, confirmEvent, explandAll, Utils, betNameMap, ODDS_MAP, betStr };
  },
});
</script>
<style scoped lang="scss">
.cbf-bet {
  overflow: hidden;
  margin-bottom: 12px;
  width: 100%;

  .content-item {
    display: flex;
    flex-direction: column;
    padding: 0 15px;
    width: 100%;
    height: 150px;

    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 52px;
      color: #232a24;
      font-size: 14px;
      font-weight: 500;

      .left {
        color: #232a24;
        font-size: 14px;
        font-weight: 500;

        span {
          margin: 0 5px;
        }
      }

      .right {
        color: #8e8e93;
        font-size: 12px;

        span {
          color: rgb(0, 153, 0);
          margin: 0 5px;
        }
      }
    }

    .bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 83px;

      .game-item {
        width: 100%;
        height: 48px;
        border-radius: 4px;
        background-color: #fff7ec;
        text-align: center;
        line-height: 48px;
        font-size: 12px;
        text-align: center;
        color: #232a24;
      }

      .right-icon {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 33px;
        height: 88px;

        .active {
          transform: rotateZ(-180deg);
          transition: all 0.5s;
        }

        div {
          width: 19px;
          height: 18px;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAkCAYAAADl9UilAAAAAXNSR0IArs4c6QAAAuZJREFUWEfNmEtoE1EUhv8zj9pHsrMrH6BuqnSliFhLQahR0I0LoeILS1sttuDOjSCCG3eCldS2VHxhwYUbBa0FQWpFRFdFsxAEH6u6EJK2scnMkZnJYzJJ5t5MUpjZ3vuf880595z7IAT4mFe3IZM9DFA3CDsB3gpQ1DHFSYB+gPEV4Hno2iuilu+1uiFZATOrMFZPgI0RMLoAyGoZhAWQOga15SkRGTI+pYxzJtUL5tsAOmSM+sxJgGiU9MicyI4vGDM3w1i5BeYhMEv9hMghiBhEE1BbLxNRutr8qs6Yk+3I0gsw7xU6CzKB6CM0PkoUXaokrwiWg3oL5npT549MlIDGPZXgysDs9GWXLaj1iZQX1Y5cW483reVg2eVxmOaFINkJrFGUu6S1XXTrS8Ds6gNmG7bQZUmtggBi7motgNl9KpNabEBLkMXxzktAj3Tm+1wRLLvSB9N4EtRqQ3SKepK01hnLVhEsk5wH40BDHAQ1QnhHerS7AMbpv9uhqN9q2GaCuhbpGLq2w9pb7YjxWtKqiLifyjRNTN17iM5dHejav0/koGR84f0HLH5JYOD8GSiKItIOU1N0PAeWegTwKT/Fz1+/cex4H1RVxc0b13Co96DIgT3+eu4Nrly9DsMw8PzZDLZs3iTQ0WNqipx2wDKpT2DeLfJ0Jz6Fien70nBuqKH+c7g0PCByARB9Jj2yJweWXAJjo1gFjMUnMTn9QAjnhhrsP4uR4UEZ81Y5/iE92p6PWBrMG+SUYrjAUHY50j/SI82BwCx9tcjVBVUOJp9Kd1S9cNZYfqHXlD63UU8qpRZ/pVS74axxq/oCQzkRcy3+NXG78Ft/eThrTl1QthN3u5BosKLCeDnrHOOPxKwDSl2fq8GGdUtymmwIN3EbLLTHnrAeFHN7ZviO1vk64jBeRuyohfX65sDZt/BwXXgLKQ3jE0ERLoSPKu5NJXTPUCVwYXy4827J9nVP12MweN2eOv8Dzh+lNGvMb9YAAAAASUVORK5CYII=) no-repeat 50%;
          background-size: 19px 18px;
          transition: all 0.5s;
        }
      }
    }
  }

}

.bet-modal-content {
  max-height: 70vh;
  overflow: auto;
}

.bet-modal-footer {
  height: 60px;
  padding: 0 15px;

  .van-button {
    width: 45%;
    height: 40px;
    border-radius: 8px;
  }

  .van-button--default {
    color: #2e2f30;
    font-size: 14px;
    border-color: #2e2f30;
  }

  .van-button--primary {
    background: linear-gradient(127deg, #fff120, #fcdf6b);
    box-shadow: 0 2px 3px 0 #feffdc;
    border-color: #fff120;
    color: #2e2f30;
  }

}
</style>
