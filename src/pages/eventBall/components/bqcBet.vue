<template>
  <div class="hh-bet">
    <div class="content-item">
      <div class="top">
        <div class="left">{{ data.home }}<span>VS</span>{{ data.away }}</div>
        <div class="right"><span>{{ data.shortComp }}</span>{{ Utils.formatDate(data.matchTime, 'HH:mm') }}</div>
      </div>
      <div class="bottom">
        <div class="game-item">
          <!--投注项-->
          <div class="bet-item">
            <div v-for="(item, index) in betNameMap.bqc.betName" :key="index" class="item flex-center"
              :class="{ 'active': isBqcSelect(item), 'hidden': index === 4 }"
              @click="selectBetEvent(getBetValue(data.bqc, index), ODDS_MAP.bqc, betNameMap[ODDS_MAP.bqc].betCode[index])">
              {{ item }} <span>{{ getBetValue(data.bqc, index) }}</span>
            </div>
          </div>
          <!--选择值-->
          <div class="number-box" :class="{ 'active': isBqcSelect('平平') }"
            @click="selectBetEvent(getBetValue(data.bqc, 4), ODDS_MAP.bqc, betNameMap[ODDS_MAP.bqc].betCode[4])">
            <span>平平<br />{{ getBetValue(data.bqc, 4) }}</span>
          </div>
        </div>
        <div class="right-icon" @click="() => (model.showEvent = !model.showEvent)">
          <div :class="model.showEvent && 'active'"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { useBet } from 'src/hook'
import { Utils, betNameMap, ODDS_MAP } from 'src/common'

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<any>,
      default: () => ({})
    }
  },
  setup(props) {
    const {
      model,
      betNames,
      getBetValue,
      betEvent,
      selectBet, isBqcSelect } = useBet()

    const betItems = computed(() => betNameMap.bqc.betName.filter((v: string) => v !== '平平'))

    const selectBetEvent = (value: any, code: string, playCode: string) => {
      selectBet(props.data, value, code, playCode)
    }
    return { model, selectBetEvent, betEvent, getBetValue, isBqcSelect, Utils, betNameMap, betItems, betNames, ODDS_MAP };
  },
});
</script>
<style scoped lang="scss">
.hh-bet {
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
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        height: 88px;
        border-radius: 4px;
        background-color: #fff7ec;

        .source-box {
          display: flex;
          flex-direction: column;
          width: 40px;
          height: 88px;
          color: #232a24;
          font-size: 14px;
          font-weight: 500;
          text-align: center;
          line-height: 41px;
          justify-content: center;

          div {
            width: 40px;
            height: 44px;
            color: #232a24;
            font-size: 14px;
            font-weight: 500;
            text-align: center;
            line-height: 41px;
          }
        }

        .bet-item {
          display: flex;
          flex-wrap: wrap;
          flex: 1;
          height: 88px;
          text-align: center;
          line-height: 44px;
          justify-content: space-between;

          font-weight: 500;
          color: #232a24;



          .item {
            position: relative;
            width: 62px;
            height: 41px;
            border-radius: 6px;
            color: #2e2f30;
            font-size: 12px;
          }

          .hasdan {
            &::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 22px;
              height: 18px;
              background: url('../assets/dan.png') no-repeat 50%;
              background-size: 22px 18px;
            }
          }

          .hidden {
            display: none;
          }
        }

        .active {
          background-color: #fff853;
        }

        .number-box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 45px;
          height: 88px;
          color: #232a24;
          font-size: 12px;
          font-weight: 500;
          text-align: center;
          line-height: 20px;
          margin-left: 3px;
        }
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

  .content-more-active {
    height: 124px !important;
  }

  .content-more {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
    height: 0;
    color: #fff;
    font-size: 12px;
    transition: all 0.5s;
    background: linear-gradient(158deg, #312f1f, #2e2f30);

    .first-cloumn {
      display: flex;
      align-items: center;
      margin-top: 12px;
      width: 100%;
      color: #fff;
      font-size: 12px;

      div:first-child {
        padding-left: 12px;
        width: 113px !important;
        text-align: left;
      }

      div {
        width: 88px;
        text-align: center;
      }
    }

    .two-cloumn {
      display: flex;
      align-items: center;
      margin-top: 12px;
      width: 100%;
      color: #fff;
      font-size: 12px;

      div:first-child {
        padding-left: 12px;
        width: 113px !important;
        text-align: left;
      }

      div {
        width: 88px;
        text-align: center;
      }
    }

    .three-cloumn {
      display: flex;
      align-items: center;
      margin-top: 12px;
      width: 100%;
      color: #fff;
      font-size: 12px;

      .title {
        padding-left: 12px;
        width: 113px !important;
      }

      .game-con {
        .game-info {
          color: #fff;
          font-size: 12px;
          display: flex;

          :first-child {
            margin: 0 41px 0 10px;
          }

          .win {
            color: #e8b04f;
          }

          .fai {
            color: #7cec80;
          }

          .tie {
            color: #7cd4ec;
          }

          div {
            margin: 0 3px;
          }
        }
      }
    }
  }
}
</style>
