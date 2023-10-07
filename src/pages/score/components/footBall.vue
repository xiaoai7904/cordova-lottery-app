import { GridItem } from 'vant';
<template>
  <div class="football">
    <van-tabs v-model:active="model.active">
      <van-tab v-for="(item, i) in model.tabList" :key="i" :title="item.name" :name="item.value">
        <PageList isInit :requestApi="getFootballScoreList" :list="privateMatchStore.football.list"
          :total="privateMatchStore.football.total" :pages=privateMatchStore.football.pages
          :requestParams="{ status: item.value }" v-model:current="privateMatchStore.football.pageNum" v-slot="slotProps">
          <div class="data-item" v-for="(item, i) in slotProps.list" :key="i">
            <div class="base-box">
              {{ item.week }}
              <br />
              <span>
                <span class="edg">[{{ item.number }}]</span>{{ item.homeName }}</span>
            </div>
            <div class="base-box">
              <span class="edg">{{ item.eventName }}</span><br />
              <span>
                <span class="gameTime">4 <a class="time-animate">'</a></span>
                VS
                <span class="tag source"> {{ item.tag }}{{ item.result }} </span>
              </span>
            </div>
            <div class="base-box">
              <span>{{ item.time }}</span>
              <br />
              <span>{{ item.awayName }}</span>
            </div>
          </div>
        </PageList>
      </van-tab>
    </van-tabs>
    <!-- <van-list v-model:loading="model.loading" :finished="model.finished" finished-text="没有更多了" @load="onLoad">
      <div class="data-item" v-for="(item, i) in model.dataList" :key="i">
        <div class="base-box">
          {{ item.week }}
          <br />
          <span>
            <span class="edg">[{{ item.number }}]</span>{{ item.homeName }}</span>
        </div>
        <div class="base-box">
          <span class="edg">{{ item.eventName }}</span><br />
          <span>
            <span class="gameTime">4 <a class="time-animate">'</a></span>
            VS
            <span class="tag source"> {{ item.tag }}{{ item.result }} </span>
          </span>
        </div>
        <div class="base-box">
          <span>{{ item.time }}</span>
          <br />
          <span>{{ item.awayName }}</span>
        </div>
      </div>
    </van-list> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useMatch } from 'src/hook'
export default defineComponent({
  setup() {
    const model = reactive({
      tabList: [
        { name: '全部', value: 1 },
        { name: '未开赛', value: 2 },
        { name: '进行中', value: 3 },
        { name: '已完赛', value: 4 },
      ],
      active: 1,
      loading: false,
      finished: false,
      dataList: [
        {
          week: '周二004',
          homeName: '巴黎圣曼',
          awayName: '多特蒙德',
          time: '09-20 03:00',
          eventName: '欧冠',
          result: '0:0',
          tag: '半',
          number: -1,
        },
        {
          week: '周二004',
          homeName: '巴黎圣曼',
          awayName: '多特蒙德',
          time: '09-20 03:00',
          eventName: '欧冠',
          result: '0:0',
          tag: '半',
          number: -2,
        },
        {
          week: '周二004',
          homeName: '巴黎圣曼',
          awayName: '多特蒙德',
          time: '09-20 03:00',
          eventName: '欧冠',
          result: '0:0',
          tag: '满',
          number: -3,
        },
        {
          week: '周二004',
          homeName: '巴黎圣曼',
          awayName: '多特蒙德',
          time: '09-20 03:00',
          eventName: '欧冠',
          result: '0:0',
          tag: '半',
          number: -1,
        },
        {
          week: '周二004',
          homeName: '巴黎圣曼',
          awayName: '多特蒙德',
          time: '09-20 03:00',
          eventName: '欧冠',
          result: '0:0',
          tag: '半',
          number: -1,
        },
        {
          week: '周二004',
          homeName: '巴黎圣曼',
          awayName: '多特蒙德',
          time: '09-20 03:00',
          eventName: '欧冠',
          result: '0:0',
          tag: '半',
          number: -1,
        },
        {
          week: '周二004',
          homeName: '巴黎圣曼',
          awayName: '多特蒙德',
          time: '09-20 03:00',
          eventName: '欧冠',
          result: '0:0',
          tag: '半',
          number: -1,
        },
        {
          week: '周二004',
          homeName: '巴黎圣曼',
          awayName: '多特蒙德',
          time: '09-20 03:00',
          eventName: '欧冠',
          result: '0:0',
          tag: '半',
          number: -1,
        },
        {
          week: '周二004',
          homeName: '巴黎圣曼',
          awayName: '多特蒙德',
          time: '09-20 03:00',
          eventName: '欧冠',
          result: '0:0',
          tag: '半',
          number: -1,
        },
        {
          week: '周二004',
          homeName: '巴黎圣曼',
          awayName: '多特蒙德',
          time: '09-20 03:00',
          eventName: '欧冠',
          result: '0:0',
          tag: '半',
          number: -1,
        },
      ],
    });

    const { privateMatchStore, getFootballScoreList } = useMatch();
    return {
      model,
      privateMatchStore,
      getFootballScoreList
    };
  },
});
</script>
<style scoped lang="scss">
.football {
  :deep(.van-tab) {
    color: rgb(139, 142, 145);
    font-size: 16px;
  }

  :deep(.van-tab--active) {
    color: rgb(255, 202, 45);
    font-size: 16px;
    z-index: 3;
    font-weight: bold;
  }

  :deep(.van-tabs__line) {
    background: rgb(255, 202, 45);
    width: 20px;
    height: 3px;
  }

  :deep(.van-tabs__content) {
    min-height: calc(100vh - 160px);
  }

  .data-item {
    display: flex;
    padding: 12px 0;
    width: 100%;
    height: 72px;
    border-bottom: 0.5px solid #f4f4f4;

    .base-box {
      flex: 1;
      height: 47px;
      color: #aaa;
      font-size: 14px;
      text-align: center;
      line-height: 24px;

      .edg {
        color: #ffca2d !important;
      }

      .time-animate {
        animation: ss 1s linear infinite;
      }

      @keyframes ss {
        to {
          opacity: 0;
        }

        from {
          opacity: 1;
        }
      }

      .gameTime {
        position: absolute;
        top: 24px;
        left: 50%;
        color: #aaa !important;
        font-size: 12px !important;
        font-weight: 500;
        transform: translateX(-31px);
      }

      .source {
        position: absolute;
        top: 24px;
        left: 50%;
        color: #aaa !important;
        font-size: 12px !important;
        transform: translateX(20px);
      }

      span {
        color: #48484b;
        font-size: 15px;
        font-weight: 500;
      }
    }

    .base-box:nth-child(2) {
      position: relative;
      color: #ffca2d !important;
    }
  }
}
</style>
