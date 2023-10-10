<template>
  <div class="hh-bet">
    <div class="content-item">
      <div class="top">
        <div class="left">{{ data.home }}<span>VS</span>{{ data.away }}</div>
        <div class="right"><span>{{ data.shortComp }}</span>{{ Utils.formatDate(data.matchTime, 'HH:mm') }}</div>
      </div>
      <div class="bottom">
        <div class="game-item">
          <!--比分-->
          <div class="source-box">
            <div>0</div>
            <div :class="{ 'up': Number(getBetValue(data.rq, 0)) > 0, 'down': Number(getBetValue(data.rq, 0)) < 0 }">
              {{
                getBetValue(data.rq, 0)
              }}
            </div>
          </div>
          <!--投注项-->
          <div class="bet-item">
            <div class="item" :class="'hasdan'" @click="selectBet(getBetValue(data.spf, 0), ODDS_MAP.spf)">
              胜 <span>{{ getBetValue(data.spf, 0) }}</span>
            </div>
            <div class="item" @click="selectBet(getBetValue(data.spf, 1), ODDS_MAP.spf)">平 <span>{{ getBetValue(data.spf,
              1)
            }}</span>
            </div>
            <div class="item" @click="selectBet(getBetValue(data.spf, 2), ODDS_MAP.spf)">负 <span>{{ getBetValue(data.spf,
              2)
            }}</span>
            </div>
            <div class="item" @click="selectBet(getBetValue(data.rq, 1), ODDS_MAP.rq)">让胜 <span>{{ getBetValue(data.rq, 1)
            }}</span>
            </div>
            <div class="item" @click="selectBet(getBetValue(data.rq, 2), ODDS_MAP.rq)">让平 <span>{{ getBetValue(data.rq, 2)
            }}</span>
            </div>
            <div class="item" @click="selectBet(getBetValue(data.rq, 3), ODDS_MAP.rq)">让负 <span>{{ getBetValue(data.rq, 3)
            }}</span>
            </div>
          </div>
          <!--选择值-->
          <div class="number-box" @click="explandAll">
            <span v-if="betCount === 0">展开<br />全部</span>
            <span v-else><span style="color: #de4e5b; font-size: 16px">{{ betCount }}</span><br />已选</span>
          </div>
        </div>
        <div class="right-icon" @click="() => (model.showEvent = !model.showEvent)">
          <div :class="model.showEvent && 'active'"></div>
        </div>
      </div>
    </div>
    <div class="content-more" :class="model.showEvent && 'content-more-active'">
      <!--平均赔率-->
      <div class="first-cloumn">
        <div>平均赔率</div>
        <div>-</div>
        <div>-</div>
        <div>-</div>
      </div>
      <!--历史交锋-->
      <div class="two-cloumn">
        <div>历史交锋 近10场</div>
        <div>5胜</div>
        <div>2平</div>
        <div>2负</div>
      </div>
      <!--近期战绩-->
      <div class="three-cloumn">
        <div class="title">近期战绩 近10场</div>
        <div class="game-con">
          <div class="game-info">
            <div>主</div>
            <div class="win">胜</div>
            <div class="fai">负</div>
            <div class="tie">平</div>
            <div class="win">胜</div>
            <div class="fai">负</div>
            <div class="tie">平</div>
            <div class="win">胜</div>
            <div class="fai">负</div>
            <div class="win">胜</div>
          </div>
          <div class="game-info">
            <div>客</div>
            <div class="win">胜</div>
            <div class="fai">负</div>
            <div class="tie">平</div>
            <div class="win">胜</div>
            <div class="fai">负</div>
            <div class="tie">平</div>
            <div class="win">胜</div>
            <div class="fai">负</div>
            <div class="win">胜</div>
          </div>
        </div>
      </div>
    </div>

    <van-dialog v-model:show="model.betModel">
      <template #footer>
        <div class="bet-modal-footer flex-between">
          <van-button @click="model.betModel = false">取消</van-button>
          <van-button type="primary" @click="confirm">确定</van-button>
        </div>
      </template>
      <div class="bet-modal-content">
        <BetView v-if="model.betModel" :data="data" :checkData="model.betList" @bet="betEvent" />
      </div>

    </van-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { useBet } from 'src/hook'
import { Utils, ODDS_MAP, betNameMap } from 'src/common'
import BetView from './betView.vue';
import { data } from 'autoprefixer';

export default defineComponent({
  components: { BetView },
  props: {
    data: {
      type: Object as PropType<any>,
      default: () => ({})
    }
  },
  setup(props) {
    const router = useRouter();
    const model = reactive({
      showEvent: false,
      betModel: false,
      tempBetList: [] as any[],
      betList: [] as any[]
    });
    const { addBet, delBet, getBetValue } = useBet()
    const betCount = computed(() => model.betList.length)
    const betNames = computed(() => model.betList.map(item => item.name))

    const explandAll = () => {
      model.betModel = true
    }
    const confirm = () => {
      model.tempBetList.forEach(item => {
        addBet({
          matchId: props.data.id,
          shortComp: props.data.shortComp,
          shortHome: props.data.shortHome,
          shortAway: props.data.shortAway,
          oddRate: item.value,
          odds: item.code
        })
      })

      model.betList = [...model.tempBetList]
      model.tempBetList = []
      model.betModel = false
    }
    const betEvent = (data: any) => {
      model.tempBetList = [...data]
    }
    const selectBet = (value: any, code: string) => {
      if (betNames.value.includes(betNameMap[code].name)) {
        model.betList = model.betList.filter(item => item.name !== betNameMap[code].name)
        delBet({
          matchId: props.data.id,
          odds: code
        })
      } else {
        model.betList.push({
          name: betNameMap[code].name, value, code
        })

        addBet({
          matchId: props.data.id,
          shortComp: props.data.shortComp,
          shortHome: props.data.shortHome,
          shortAway: props.data.shortAway,
          oddRate: value,
          odds: code
        })
      }

    }
    return { router, model, betCount, explandAll, confirm, betEvent, selectBet, getBetValue, Utils, ODDS_MAP };
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
    padding: 0 20px;
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
        width: 315px;
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
          width: 229px;
          height: 88px;
          text-align: center;
          line-height: 44px;
          justify-content: space-between;
          flex-wrap: wrap;

          .active {
            background-color: #fff853;
          }

          .item {
            position: relative;
            width: 69px;
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
        }

        .number-box {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 55px;
          height: 88px;
          color: #232a24;
          font-size: 12px;
          font-weight: 500;
          text-align: center;
          line-height: 20px;
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

.up {
  color: #2dae8b !important;
}

.down {
  color: #f73 !important;
}
</style>
