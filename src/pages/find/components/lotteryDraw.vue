import { GridItem } from 'vant';
<template>
  <div class="lotteryDraw">
    <div style="width: 100%">
      <van-tabs v-model:active="model.active">
        <van-tab title="足球" :name="1">
          <div>
            <div class="header">
              <div class="left"></div>
              <div class="con" @click="selectTime">
                <img :src="require('../assets/date.png')" />
                <span style="margin-left: 10px">{{ footBallActiveTime }}</span>
                <span style="margin-left: 10px">{{ footBallActiveWeek }}</span>
                <span style="margin-left: 10px; color: #f73">{{ privateMatchStore.football.total }}场</span>
              </div>
              <div class="right"></div>
            </div>
            <PageList ref="pageListRef1" isInit :requestApi="getFootballScoreList" :list="privateMatchStore.football.list"
              :total="privateMatchStore.football.total" :pages=privateMatchStore.football.pages
              :requestParams="footBallParams" v-model:current="privateMatchStore.football.pageNum" v-slot="slotProps">
              <div class="data-item" v-for="(item, index) in slotProps.list" :key="index">
                <div class="top">
                  <div class="one">{{ Utils.getWeek(item.matchTime * 1000) }}<span>{{ item.shortComp }}</span></div>
                  <div class="two">{{ getMatchResultText(item) }}</div>
                  <div class="three">{{ Utils.formatDate(item.matchTime * 1000, 'MM-DD HH:mm') }}</div>
                </div>
                <div class="bottom">
                  <div class="one">{{ item.home }}</div>
                  <div class="two">{{ item.homeScore }}:{{ item.awayScore }}</div>
                  <div class="three">{{ item.away }}</div>
                </div>
              </div>
            </PageList>
          </div>
        </van-tab>

        <van-tab title="篮球" :name="2">
          <div>
            <div class="header">
              <div class="left"></div>
              <div class="con" @click="selectTime">
                <img :src="require('../assets/date.png')" />
                <span style="margin-left: 10px">{{ basketBallActiveTime }}</span>
                <span style="margin-left: 10px">{{ basketBallActiveWeek }}</span>
                <span style="margin-left: 10px; color: #f73">{{ privateMatchStore.basketball.total }}场</span>
              </div>
              <div class="right"></div>
            </div>
            <PageList ref="pageListRef2" isInit :requestApi="getBaketBallScoreList"
              :list="privateMatchStore.basketball.list" :total="privateMatchStore.basketball.total"
              :pages=privateMatchStore.basketball.pages v-model:current="privateMatchStore.basketball.pageNum"
              :requestParams="basketBallParams" v-slot="slotProps">
              <div class="data-item" v-for="(item, index) in slotProps.list" :key="index">
                <div class="top">
                  <div class="one">{{ Utils.getWeek(item.matchTime * 1000) }}<span>{{ item.shortComp }}</span></div>
                  <div class="two">{{ getMatchResultText(item) }}</div>
                  <div class="three">{{ Utils.formatDate(item.matchTime * 1000, 'MM-DD HH:mm') }}</div>
                </div>
                <div class="bottom">
                  <div class="one">{{ item.home }}</div>
                  <div class="two">{{ item.homeScore }}:{{ item.awayScore }}</div>
                  <div class="three">{{ item.away }}</div>
                </div>
              </div>
            </PageList>
          </div>

        </van-tab>
      </van-tabs>
    </div>

    <van-action-sheet v-model:show="model.showTimeActionSheet" :actions="model.actionSheet" cancel-text="取消"
      teleport="body" close-on-click-action @select="onSelect" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { Utils } from 'src/common'
import { useMatch } from 'src/hook'
import { onMounted } from 'vue';
import { computed } from 'vue';

type PageListRefType = {
  resetStore: () => void;
  refreshList: () => void;
};

export default defineComponent({
  setup() {
    const { privateMatchStore, getBaketBallScoreList, getFootballScoreList } = useMatch()
    const yesterday = Utils.formatDate(Utils.getDayjs().subtract(1, 'day').toDate().getTime(), 'YYYY-MM-DD')
    const model = reactive({
      tabList: [
        { name: '足球', value: 1 },
        { name: '篮球', value: 2 },
      ],
      active: 1,
      showTimeActionSheet: false,
      actionSheet: [] as any[],
      footballTime: { beginTime: yesterday + ' 00:00:00', endTime: yesterday + ' 23:59:59' },
      basketballTime: { beginTime: yesterday + ' 00:00:00', endTime: yesterday + ' 23:59:59' }
    });

    const pageListRef1 = ref<PageListRefType | null>(null)
    const pageListRef2 = ref<PageListRefType | null>(null)

    const footBallParams = computed(() => ({ status: 2, ...model.footballTime }))
    const basketBallParams = computed(() => ({ status: 2, ...model.basketballTime }))
    const footBallActiveTime = computed(() => Utils.formatDate(new Date(model.footballTime.beginTime).getTime(), 'MM-DD'))
    const basketBallActiveTime = computed(() => Utils.formatDate(new Date(model.basketballTime.beginTime).getTime(), 'MM-DD'))
    const footBallActiveWeek = computed(() => Utils.getWeek(new Date(model.footballTime.beginTime).getTime()))
    const basketBallActiveWeek = computed(() => Utils.getWeek(new Date(model.basketballTime.beginTime).getTime()))

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

    const onSelect = (data: any) => {
      if (model.active === 1) {
        model.footballTime = { beginTime: data.value + ' 00:00:00', endTime: data.value + ' 23:59:59' }
        setTimeout(() => {
          pageListRef1?.value?.refreshList?.();
        }, 500)
      } else {
        model.basketballTime = { beginTime: data.value + ' 00:00:00', endTime: data.value + ' 23:59:59' }
        setTimeout(() => {
          pageListRef2?.value?.refreshList?.();
        }, 500)
      }
    }

    const selectTime = () => {
      model.showTimeActionSheet = true
    }

    const getMatchResultText = (item: any) => {
      if (item.homeScore > item.awayScore) return '负'
      if (item.homeScore < item.awayScore) return '胜'
      return '平'
    }
    onMounted(() => {
      createTime()
    })

    return {
      pageListRef1,
      pageListRef2,
      model,
      privateMatchStore,
      onSelect,
      selectTime,
      getBaketBallScoreList,
      getFootballScoreList,
      getMatchResultText,
      footBallParams,
      basketBallParams,
      footBallActiveTime,
      basketBallActiveTime,
      footBallActiveWeek,
      basketBallActiveWeek,
      Utils
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
    border-radius: 8px;
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

    .van-tabs__wrap {
      background-color: #fff;
      border-radius: 0 0 15px 15px;
    }
  }
}
</style>
