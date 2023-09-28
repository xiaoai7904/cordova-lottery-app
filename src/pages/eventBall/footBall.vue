<template>
  <div class="football">
    <Headers transparent>
      <template #title>
        <div class="title">
          <span>{{ getEventName(model.currEvent) }} </span>
          <van-icon
            name="play"
            :class="'icon'"
            @click="() => (model.showFilter = !model.showFilter)"
          />
        </div>
      </template>
      <template #right>
        <div
          class="img-box"
          @click="() => (model.showPlayer = !model.showPlayer)"
        >
          <img :src="require('./assets/menu.png')" class="img" />
        </div>
      </template>
    </Headers>
    <div
      class="content-title"
      @click="() => (model.showDown = !model.showDown)"
      :class="model.showDown && 'content-active'"
    >
      <span>09-29</span>
      <span class="week">星期五</span>
      <span>4场</span>
    </div>
    <div class="content-expand">
      <!--混合投注-->
      <template v-for="item in 4" :key="item">
        <HhBet v-if="model.currEvent == 2"></HhBet>
      </template>
    </div>
    <PlayerPopup
      v-model:show="model.showPlayer"
      v-if="model.showPlayer"
    ></PlayerPopup>
    <FilterPopup
      v-model:show="model.showFilter"
      :data="filterData"
      :currValue="model.currEvent"
      v-if="model.showFilter"
      @handlerSelect="handlerSelect"
    ></FilterPopup>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
import PlayerPopup from './components/playerPopup.vue';
import FilterPopup from './components/filerPopup.vue';
import HhBet from './components/hhBet.vue';
export default defineComponent({
  components: { PlayerPopup, FilterPopup, HhBet },
  setup() {
    const router = useRouter();
    const model = reactive({
      currEvent: '2',
      showFilter: false, // 是否展示删选栏
      showPlayer: false, // 是否展示右侧导航
      showDown: false, // 是否收起当前赛事
    });
    const filterData = [
      { label: '胜平负[让]', value: '1' },
      { label: '混合投注', value: '2' },
      { label: '猜比分', value: '3' },
      { label: '进球数', value: '4' },
      { label: '半全场', value: '5' },
      { label: '2选1', value: '6' },
      { label: '一场致胜', value: '7' },
    ];
    // 获取当前筛选label
    const getEventName = (value: string) => {
      return filterData.find((item) => item.value === model.currEvent)?.label;
    };
    // 筛选选择回调
    const handlerSelect = (val: string) => {
      model.currEvent = val;
      model.showFilter = false;
      // 列表请求
    };
    return { router, model, getEventName, filterData, handlerSelect };
  },
});
</script>
<style scoped lang="scss">
.football {
  padding-top: 44px;
  background: rgba(255, 255, 255, 0.5);
  overflow: hidden;
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
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAkCAYAAADl9UilAAAAAXNSR0IArs4c6QAABE5JREFUWEflmFtoHGUUx/9nvsmtJhIv1abSFi8YEzOzs52tWipo8UF8sLEPLShUUHyz1YKY3bSIedC4a73b4lMRQYMKBakg2Dw0FpFqMpuZ2WSLGLQWa5uoLUhbc9mdI3NJuk2y2TDZTQXn6Zs53znnN+ecOd83H6HgUlW1jUlKELAZwI0AqFBegbEDxiiIevOCksPp9Mi0jxnHiqY9QYwPAVRXAGAxJi8yYXvGNL9yJ3tgiqIoJImBqwgVgPOFnCzfnTWMUx6Yqmk9YDzujplxgiU8UyOE2dDQ4CzmVcPOGRsbk0VNzX3I80EirPXsEN61TXO3DxbRzgK42ROwtNG208fDOgujp2haOzG+8HUpY1uDqp9KNZInIskd56Yma7LZ7GQYB2F12tra1khCPuXFBTiTsczV0xFzU+aNr7+usaqvry8X1kkYvUgkcguDfgt0R23LXDUHDOwojiznwzgIq0PMN5HDfQuDhbVePr0iESufg7CWioL9FNbiEvRkALcumMr/bPH/L8E4sV4H6AYkjV7yWpZ/LapdVCpiHI+1g/kQCALEuyiZ3l8xME7EHgRzJwhHkDTeKoxC4YfAHbFmEP8A4FrvuYRX6DXjpZJgSkT7nYAmAH/alrlyMV8X742uQ04yATT68/lT1J17irpOjl8J1dwAqv8eQEvw/BdMjsfo7eFzpcGi0Y3EvIOYeyzL+rYUGG+DwO36N2BsmjX3OPJT7fSGPeahustcXD8EYGsw7xIcaRPt63dfaOYqWmOlQGbLORHrAvPLQaQcwN8ABPcnIaRHqXtgiOPr9wD0aoFsB6XSH8+2VxYwjuv3AzgKwG2KAHEHQO4WOQVABE7/BvAOgL0zzwjvUdJ4fr4gFAVradGbqqtzjwD42rKs08UiyLu1RtQKE4x1wZxepIyH3aLnjtgWkPMJQPVz9ekY6uofoq75dy0LtIuoDbAC4EfbMu8qChbXPwOwPZD/AYEIdRtnZpL44gYNwjkMxpqC9J2GmNSpe2i0mN0l9TFOxJ4G88HpQgK4nVLpL+fU3x69CXk6DHAMwDiYN9PrC++IQ4NxZ+ROOMK4nCY6QKmBnUUju+uOGqxo2ArIGUr1D5f6uEKBcVdrNf6p+w6A7hc7hlD714bZ/aqU84Xk4cASehyMZGDYbZ73UMrILAVk0e1CjWhF9/wcj+0H+NnA2HOUMt4vJ5RrK1zEOqMr4UjuunaCUsYH5YYKDVYJkLKk8mqDuf+R3nJy6eKF2pGRkYnlAJr20dqqr5Wr8r+697N/eN1laLUncOiBTGbw2HKCKZq2jRifBz5N2zKj04cqH4HxpC/gn1mSduYkyRQTExU9VBFCyIC41+H8ASJa5bvHPts2O3wwVW0GSWkAK5YzUvP4Op+bqmrNZvvPzhzcqWp0C4h7AFxzleDOs0SPZQb9MrriKFNRlNuIxAtwjzppmY46waOAdKRKlt40jMs7lX8B2pk0QzaNt8EAAAAASUVORK5CYII=)
        no-repeat 50%;
      background-size: contain;
    }
    &::after {
      content: '';
      margin-left: 5px;
      width: 11px;
      height: 6px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAMCAMAAABRJ730AAAAAXNSR0IArs4c6QAAAFFQTFRFAAAAAAAAADMzICAgFSoqICAwGCQxHScxGCgwHycuISc0HSUyHScyHCYxHiYyHiYyHCYyHiYyHicyHiYzHSYyHiYyHSYyHSYxHSYyHSYyHSYy9rci9QAAABp0Uk5TAAMFCAwQFRogISd7j6qztL29xs7W2N3j9Pkw4zOlAAAAV0lEQVQYGWXBBxJAMABFwUf0Lvq//0EZQ4ZkF+pDnqMGdgV2oFGgAaJWnjbiEvf66WJuZtTHYHgkVo5NcNJJjynlI5t1mzN+8lWXNcdTbtJWEKiWpeJ1AiX9DtRfGaQgAAAAAElFTkSuQmCC)
        no-repeat 50%;
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
}
</style>
