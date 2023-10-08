import { GridItem } from 'vant';
<template>
  <div class="lotteryDraw">
    <div style="width: 100%; background: #fff">
      <van-tabs v-model:active="model.active">
        <van-tab v-for="(item, i) in model.tabList" :key="i" :title="item.name" :name="item.value"></van-tab>
      </van-tabs>
    </div>
    <div class="header">
      <div class="left"></div>
      <div class="con" @click="selectTime">
        <img :src="require('../assets/date.png')" />
        <span style="margin-left: 10px">9-15</span>
        <span style="margin-left: 10px">周五</span>
        <span style="margin-left: 10px; color: #f73">5场</span>
      </div>
      <div class="right"></div>
    </div>
    <div class="data-item">
      <div class="top">
        <div class="one">周二001<span>亚运男足</span></div>
        <div class="two">平</div>
        <div class="three">09-19 16:00</div>
      </div>
      <div class="bottom">
        <div class="one">亚特</div>
        <div class="two">1:1</div>
        <div class="three">伊朗亚</div>
      </div>
    </div>
    <div class="data-item">
      <div class="top">
        <div class="one">周二001<span>亚运男足</span></div>
        <div class="two">未开奖</div>
        <div class="three">09-19 16:00</div>
      </div>
      <div class="bottom">
        <div class="one">沙特亚</div>
        <div class="two"></div>
        <div class="three">泰国亚</div>
      </div>
    </div>

    <van-action-sheet v-model:show="model.showTimeActionSheet" :actions="model.actionSheet" cancel-text="取消"
      teleport="body" close-on-click-action @select="onSelect" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { Utils } from 'src/common'
import { useMatch } from 'src/hook'
import { onMounted } from 'vue';
export default defineComponent({
  setup() {
    const { privateMatchStore, getBaketBallScoreList, getFootballScoreList } = useMatch()
    const model = reactive({
      tabList: [
        { name: '足球', value: 1 },
        { name: '篮球', value: 2 },
      ],
      active: 1,
      showTimeActionSheet: false,
      actionSheet: [] as any[]
    });

    const createTime = () => {
      let val = 0;
      let timeList = []
      while (true) {
        if (val > 7) break;

        timeList.push(Utils.formatDate(Utils.getDayjs().subtract(val, 'day').toDate().getTime(), 'YYYY-MM-DD'))
        val++
      }

      model.actionSheet = timeList.map(item => ({
        name: item,
        value: item
      }))
    }

    const onSelect = () => {
      console.log('11')
    }

    const selectTime = () => {
      model.showTimeActionSheet = true
    }
    onMounted(() => {
      createTime()
    })

    return {
      model,
      privateMatchStore,
      onSelect,
      selectTime,
      getBaketBallScoreList,
      getFootballScoreList
    };
  },
});
</script>
<style scoped lang="scss">
.lotteryDraw {
  background: #f6f6f6;
  min-height: 100vh;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 10;
    margin: 15px auto;
    width: 249px;
    height: 31px;
    color: #2e2f30;
    font-size: 12px;
    border-radius: 14px;
    background-color: #fff;

    .left {
      width: 31px;
      height: 31px;
      background: url('../assets/date_left.png') no-repeat 100%;
      background-size: 8px 12px;
    }

    .con {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 20px;
        height: 20px;
      }
    }

    .right {
      width: 31px;
      height: 31px;
      background: url('../assets/date_right.png') no-repeat 0;
      background-size: 8px 12px;
    }
  }

  .data-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 7px auto 10px;
    padding: 0 15px;
    width: 358px;
    height: 83px;
    color: #aaa;
    font-size: 12px;
    border-radius: 16prx;
    background-color: #fff;

    .top {
      display: flex;
      justify-content: space-between;
      width: 100%;

      .one {
        text-align: left;
        width: 109px;

        span {
          margin-left: 4px;
          color: #ae7817;
        }
      }

      .two {
        color: #f73;
        font-size: 16px;
        width: 109px;
        text-align: center;
      }

      .three {
        width: 109px;
        text-align: right;
      }
    }

    .bottom {
      margin-top: 5px;
      color: #48484b;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      width: 100%;

      .one {
        text-align: left;
        width: 109px;
      }

      .two {
        color: #f73;
        font-size: 18px;
        font-weight: 600;
        width: 109px;
        text-align: center;
      }

      .three {
        width: 109px;
        text-align: right;
      }
    }
  }

  :deep(.van-tabs__nav) {
    width: 100px;
  }

  :deep(.van-tab) {
    color: #2e2f30;
  }

  :deep(.van-tab--active) {
    color: #272929;
    font-size: 16px;
    font-weight: 600;
  }

  :deep(.van-tabs__line) {
    bottom: 23px;
    width: 29px;
    height: 3px;
    background: linear-gradient(63deg, #fff120, #fcdf6b);
  }
}
</style>
