<template>
  <div class="content-more" :class="showEvent && 'content-more-active'">
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
      <div>{{ betHistoryStore.history.matchCross?.win }}胜</div>
      <div>{{ betHistoryStore.history.matchCross?.draw }}平</div>
      <div>{{ betHistoryStore.history.matchCross?.lose }}负</div>
    </div>
    <!--近期战绩-->
    <div class="three-cloumn">
      <div class="title">近期战绩 近10场</div>
      <div class="game-con">
        <div class="game-info">
          <div>主</div>
          <div v-for="(item, index) in betHistoryStore.history?.homeHistory" :key="index"
            :class="{ 'win': item === 1, 'fai': item === -1, 'tie': item === 0 }">
            {{
              getText(item)
            }}
          </div>

        </div>
        <div class="game-info">
          <div>客</div>
          <div v-for="(item, index) in betHistoryStore.history?.awayHistory" :key="index"
            :class="{ 'win': item === 1, 'fai': item === -1, 'tie': item === 0 }">
            {{
              getText(item)
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { BET_TYPE } from 'src/common'
import { useMatch } from 'src/hook'
import { watch } from 'vue';
import { reactive } from 'vue';

export default defineComponent({
  props: {
    betType: {
      type: Number as PropType<BET_TYPE>,
      default: 1
    },
    params: {
      type: Object as PropType<any>,
      default: () => ({})
    },
    showEvent: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props) {
    const { getBaketBallHistory, getFootballHistory } = useMatch();

    const betHistoryStore = reactive({
      history: {} as any
    })

    watch(() => props.showEvent, async newValue => {
      // 1 赢  0平  -1输
      if (newValue && !Object.keys(betHistoryStore.history).length) {
        if (props.betType === BET_TYPE.FOOTEBALL) {
          const data = await getFootballHistory(props.params)
          betHistoryStore.history = { ...data }
        } else {
          const data = await getBaketBallHistory(props.params)
          betHistoryStore.history = { ...data }
        }
      }
    })

    const textMap: any = {
      1: '赢',
      0: '平',
      '-1': '输'
    }
    const getText = (value: number) => textMap[value]

    return { betHistoryStore, getText }
  }
})

</script>

<style scoped lang="scss">
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
</style>
