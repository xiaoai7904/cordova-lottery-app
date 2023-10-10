<template>
  <div class="football">
    <Headers>
      <template #title>
        <div class="title" @click="() => (model.showFilter = !model.showFilter)">
          <span>{{ getEventName() }} </span>
          <van-icon name="play" :class="'icon'" />
        </div>
      </template>
      <template #right>
        <div class="img-box" @click="() => (model.showPlayer = !model.showPlayer)">
          <img :src="require('./assets/menu.png')" class="img" />
        </div>
      </template>
    </Headers>

    <div class="skeleton" v-if="privateMatchStore.loading">
      <van-skeleton title :row="3" />
      <van-skeleton title :row="3" />
      <van-skeleton title :row="3" />
      <van-skeleton title :row="3" />
      <van-skeleton title :row="3" />
      <van-skeleton title :row="3" />
    </div>

    <van-collapse v-else v-model="model.activeMatch" :border="false">
      <van-collapse-item v-for="(data, index) in privateMatchStore.footballGroup.data" :name="index" :key="index">
        <template #title>
          <div class="content-title" :class="model.activeMatch.includes(String(index)) && 'content-active'">
            <span>{{ index }}</span>
            <span class="week">{{ Utils.getWeek(new Date(index).getTime()) }}</span>
            <span>{{ data.length }}场</span>
          </div>
        </template>
        <div class="content-expand">
          <!--胜平负[让]-->
          <template v-for="item in data" :key="item">
            <SpfhBet v-if="model.currEvent == '1'" :data="item"></SpfhBet>
          </template>
          <!--混合投注-->
          <template v-for="item in data" :key="item">
            <HhBet v-if="model.currEvent == '2'" :data="item"></HhBet>
          </template>
          <!--猜比分-->
          <template v-for="item in data" :key="item">
            <CbfBet v-if="model.currEvent == '3'" :data="item"></CbfBet>
          </template>
          <!--进球数-->
          <template v-for="item in data" :key="item">
            <JqsBet v-if="model.currEvent == '4'" :data="item"></JqsBet>
          </template>
          <!--进球数-->
          <template v-for="item in data" :key="item">
            <BqcBet v-if="model.currEvent == '5'" :data="item"></BqcBet>
          </template>
          <!--2选1-->
          <template v-for="item in data" :key="item">
            <Choose2Bet v-if="model.currEvent == '6'" :data="item"></Choose2Bet>
          </template>
          <!--一场致胜-->
          <template v-for="item in data" :key="item">
            <YczsBet v-if="model.currEvent == '7'" :data="item"></YczsBet>
          </template>
        </div>
      </van-collapse-item>
    </van-collapse>


    <div class="content-bottom flex-between van-safe-area-bottom">
      <img src="./assets/del.png" alt="Del" @click="delBet()">
      <div class="center">
        <p>已选<span class="value">{{ getBetMatchCount() }}</span>场</p>
        <span class="tips">页面赔率仅供参考</span>
      </div>
      <div class="btn" @click="gotoBetOrder">确定</div>
    </div>
    <PlayerPopup v-model:show="model.showPlayer" v-if="model.showPlayer"></PlayerPopup>
    <FilterPopup v-model:show="model.showFilter" :data="filterData" :currValue="model.currEvent" v-if="model.showFilter"
      @handlerSelect="handlerSelect"></FilterPopup>

    <van-popup v-model:show="model.betOrderPopup" position="bottom" :style="{ width: '100vw', height: '100vh' }">
      <BetOrder :title="model.betOrderTitle" :isSingle="model.isSingle" @back="() => model.betOrderPopup = false" />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, computed } from 'vue';
import PlayerPopup from './components/playerPopup.vue';
import FilterPopup from './components/filerPopup.vue';
import HhBet from './components/hhBet.vue';
import SpfhBet from './components/spfBet.vue';
import CbfBet from './components/cbfBet.vue';
import JqsBet from './components/jqsBet.vue';
import BqcBet from './components/bqcBet.vue';
import Choose2Bet from './components/choose2Bet.vue';
import YczsBet from './components/yczsBet.vue';
import BetOrder from './betOrder.vue';
import { useMatch, useCustomRouter, useBet, useNotify } from 'src/hook';
import { Utils, MATCH_STATUS, XA_DEL_BET, RouterNameEnum } from 'src/common'
import { watch } from 'vue';
export default defineComponent({
  components: {
    PlayerPopup,
    FilterPopup,
    HhBet,
    SpfhBet,
    CbfBet,
    JqsBet,
    BqcBet,
    Choose2Bet,
    YczsBet,
    BetOrder
  },
  setup() {
    const router = useCustomRouter();
    const { privateMatchStore, getFootBallGroupList } = useMatch();
    const { getBetMatchCount } = useBet();
    const { errorNotify } = useNotify()
    const model = reactive({
      currEvent: '2',
      showFilter: false, // 是否展示删选栏
      showPlayer: false, // 是否展示右侧导航
      showDown: false, // 是否收起当前赛事
      activeMatch: [] as any[],
      betOrderPopup: false, // 订单页面
      betOrderTitle: '' as any,
      isSingle: false,
    });
    const filterData = [
      { label: '胜平负[让]', value: '1' },
      { label: '混合投注', value: '2' },
      { label: '猜比分', value: '3' },
      { label: '进球数', value: '4' },
      { label: '半全场', value: '5' },
      // { label: '2选1', value: '6' },
      // { label: '一场致胜', value: '7' },
    ];

    // 获取当前筛选label
    const getEventName = () => {
      return filterData.find((item) => item.value === model.currEvent)?.label;
    };
    // 筛选选择回调
    const handlerSelect = (val: string) => {
      model.currEvent = val;
      model.showFilter = false;
      // 列表请求
      window.xaCustomEvent.trigger(XA_DEL_BET)
    };


    // const getMatchTime = () => {
    //   const startTime = Utils.formatDate(new Date().getTime())
    //   const endTime = Utils.formatDate(Utils.getDayjs().add(3, 'day').toDate().getTime())

    //   return [startTime, endTime]
    // }

    const delBet = () => {
      window.xaCustomEvent.trigger(XA_DEL_BET)
    }

    const gotoBetOrder = () => {
      if (model.currEvent === '2' && getBetMatchCount() < 2) {
        errorNotify('至少选择两场比赛')
        return;
      }

      model.betOrderTitle = getEventName()
      model.isSingle = model.currEvent === '2'

      model.betOrderPopup = true

      // router.push({ name: RouterNameEnum.BETORDER, query: { title: getEventName() } })
    }

    watch(() => privateMatchStore.footballGroup.data, newValue => {
      if (Object.keys(newValue).length) {
        model.activeMatch = [Object.keys(newValue)[0]]
      }
    }, {
      immediate: true,
    })

    onMounted(() => {
      // const [startTime, endTime] = getMatchTime()
      getFootBallGroupList({ status: MATCH_STATUS.NOT_START_YET })
    })

    return { router, model, privateMatchStore, getEventName, filterData, handlerSelect, gotoBetOrder, Utils, getBetMatchCount, delBet };
  },
});
</script>
<style scoped lang="scss">
.football {
  padding: 44px 0 70px 0;
  background: url('./assets/member_bg.png') no-repeat;
  overflow: hidden;
  min-height: 100vh;

  .title {
    font-size: 18px;
    font-weight: normal;
    color: #1d2632;
    margin-right: 3px;

    .icon {
      transform: rotateZ(90deg);
    }
  }

  .img-box {
    width: 44px;
    height: 44px;
    // display: flex;
    // justify-content: center;
    // align-content: center;
    text-align: center;
    line-height: 44px;

    img {
      width: 19px;
      height: 14px;
    }
  }

  .content-active {
    &::after {
      transform: rotateZ(-180deg);
      transition: all 0.5s;
    }
  }

  .content-title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px auto;
    width: 100%;
    height: 29px;
    color: #2e2f30;
    font-size: 14px;
    border-radius: 27px;

    &::before {
      content: '';
      margin-right: 5px;
      width: 19px;
      height: 18px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAkCAYAAADl9UilAAAAAXNSR0IArs4c6QAABE5JREFUWEflmFtoHGUUx/9nvsmtJhIv1abSFi8YEzOzs52tWipo8UF8sLEPLShUUHyz1YKY3bSIedC4a73b4lMRQYMKBakg2Dw0FpFqMpuZ2WSLGLQWa5uoLUhbc9mdI3NJuk2y2TDZTQXn6Zs53znnN+ecOd83H6HgUlW1jUlKELAZwI0AqFBegbEDxiiIevOCksPp9Mi0jxnHiqY9QYwPAVRXAGAxJi8yYXvGNL9yJ3tgiqIoJImBqwgVgPOFnCzfnTWMUx6Yqmk9YDzujplxgiU8UyOE2dDQ4CzmVcPOGRsbk0VNzX3I80EirPXsEN61TXO3DxbRzgK42ROwtNG208fDOgujp2haOzG+8HUpY1uDqp9KNZInIskd56Yma7LZ7GQYB2F12tra1khCPuXFBTiTsczV0xFzU+aNr7+usaqvry8X1kkYvUgkcguDfgt0R23LXDUHDOwojiznwzgIq0PMN5HDfQuDhbVePr0iESufg7CWioL9FNbiEvRkALcumMr/bPH/L8E4sV4H6AYkjV7yWpZ/LapdVCpiHI+1g/kQCALEuyiZ3l8xME7EHgRzJwhHkDTeKoxC4YfAHbFmEP8A4FrvuYRX6DXjpZJgSkT7nYAmAH/alrlyMV8X742uQ04yATT68/lT1J17irpOjl8J1dwAqv8eQEvw/BdMjsfo7eFzpcGi0Y3EvIOYeyzL+rYUGG+DwO36N2BsmjX3OPJT7fSGPeahustcXD8EYGsw7xIcaRPt63dfaOYqWmOlQGbLORHrAvPLQaQcwN8ABPcnIaRHqXtgiOPr9wD0aoFsB6XSH8+2VxYwjuv3AzgKwG2KAHEHQO4WOQVABE7/BvAOgL0zzwjvUdJ4fr4gFAVradGbqqtzjwD42rKs08UiyLu1RtQKE4x1wZxepIyH3aLnjtgWkPMJQPVz9ekY6uofoq75dy0LtIuoDbAC4EfbMu8qChbXPwOwPZD/AYEIdRtnZpL44gYNwjkMxpqC9J2GmNSpe2i0mN0l9TFOxJ4G88HpQgK4nVLpL+fU3x69CXk6DHAMwDiYN9PrC++IQ4NxZ+ROOMK4nCY6QKmBnUUju+uOGqxo2ArIGUr1D5f6uEKBcVdrNf6p+w6A7hc7hlD714bZ/aqU84Xk4cASehyMZGDYbZ73UMrILAVk0e1CjWhF9/wcj+0H+NnA2HOUMt4vJ5RrK1zEOqMr4UjuunaCUsYH5YYKDVYJkLKk8mqDuf+R3nJy6eKF2pGRkYnlAJr20dqqr5Wr8r+697N/eN1laLUncOiBTGbw2HKCKZq2jRifBz5N2zKj04cqH4HxpC/gn1mSduYkyRQTExU9VBFCyIC41+H8ASJa5bvHPts2O3wwVW0GSWkAK5YzUvP4Op+bqmrNZvvPzhzcqWp0C4h7AFxzleDOs0SPZQb9MrriKFNRlNuIxAtwjzppmY46waOAdKRKlt40jMs7lX8B2pk0QzaNt8EAAAAASUVORK5CYII=) no-repeat 50%;
      background-size: contain;
    }

    &::after {
      content: '';
      margin-left: 5px;
      width: 11px;
      height: 6px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAMCAMAAABRJ730AAAAAXNSR0IArs4c6QAAAFFQTFRFAAAAAAAAADMzICAgFSoqICAwGCQxHScxGCgwHycuISc0HSUyHScyHCYxHiYyHiYyHCYyHiYyHicyHiYzHSYyHiYyHSYyHSYxHSYyHSYyHSYy9rci9QAAABp0Uk5TAAMFCAwQFRogISd7j6qztL29xs7W2N3j9Pkw4zOlAAAAV0lEQVQYGWXBBxJAMABFwUf0Lvq//0EZQ4ZkF+pDnqMGdgV2oFGgAaJWnjbiEvf66WJuZtTHYHgkVo5NcNJJjynlI5t1mzN+8lWXNcdTbtJWEKiWpeJ1AiX9DtRfGaQgAAAAAElFTkSuQmCC) no-repeat 50%;
      background-size: contain;
      transition: all 0.5s;
    }

    .week {
      margin: 0 5px;
    }
  }

  .content-expand {
    width: 100%;
    border-radius: 20px 20px 0 0;
    background-color: #fff;
    transition: all 0.5s;
  }

  .content-bottom {
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

      .value {
        color: #ffa765;
        margin: 0 5px;
      }

      .tips {
        display: block;
        color: #77838d;
        font-size: 12px;
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
      box-shadow: -2px 4px 8px 0 #f2f4df;
      background: linear-gradient(127deg, #fff120, #fcdf6b);
    }
  }

  :deep(.van-collapse-item) {
    .van-collapse-item__title {
      padding: 0;
      background: transparent;
    }

    .van-cell__right-icon {
      display: none;
    }

    .van-collapse-item__content {
      border-radius: 15px 15px 0 0;
      padding: 0;
    }
  }

  .skeleton {
    :deep(.van-skeleton-paragraph) {
      background-color: #fff;
    }
  }
}
</style>
