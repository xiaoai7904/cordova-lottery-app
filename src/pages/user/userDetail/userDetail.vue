<template>
  <div class="userDetail">
    <Headers transparent> </Headers>
    <div class="head_box">
      <div class="user_box">
        <img :src="require('./assets/1.png')" />
        <div class="info">
          <div class="top">{{ privateRecordStore.hotUser.details.nikeName }}</div>
          <div class="bottom"><span>{{ privateRecordStore.hotUser.details.fans }}</span>粉丝</div>
        </div>
        <div class="follow" @click="follow2cancel">{{ isFoucs ? '已关注' : '+关注' }}</div>
      </div>
    </div>
    <div class="c_box">
      <div class="top">
        <div class="item">
          {{ privateRecordStore.hotUser.details }}
          <div>累计中奖</div>
        </div>
        <div class="item item1">
          {{ privateRecordStore.hotUser.details.profit }}
          <div>7日盈利</div>
        </div>
        <div class="item">
          <!-- {{privateRecordStore.hotUser.details}} -->
          <div>7日命中</div>
        </div>
      </div>
      <div class="bottom">
        <span>七天战绩</span>
        <div class="ball-box">
          <div class="item" v-for="(item, i) in betInfoStatusList" :key="i">
            <div class="ball" :class="Number(item) === 1 ? 'yes' : 'no'">
              {{ Number(item) === 1 ? '中' : '未' }}
            </div>
            <div class="arrow" v-if="i < betInfoStatusList.length - 1"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="flllow-box">
      <FlowOrderItem />
    </div>

    <div class="box">
      <div class="sub-box">
        <div class="title">近7天战绩</div>
        <div class="item" v-for="(item, i) in privateRecordStore.hotUser.details.betInfoDetail" :key="i">
          <div class="top">{{ item.name }}</div>
          <div class="bottom">
            <div class="win-box" :class="status[item.status]">
              {{ item.status == 2 ? item.money + '元' : prize[item.status] }}
            </div>
            <div class="money">
              自购：<span>{{ item.money }}元</span>
            </div>
            <div class="rq">
              <span>人气</span>
              <div class="start" v-for="(k, i) in item.join" :key="i"></div>
            </div>
            <div class="time">{{ item.time }}截止</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router'
import { useRecord, useUser } from 'src/hook'
import FlowOrderItem from '../flowOrderItem.vue';
export default defineComponent({
  components: { FlowOrderItem },
  setup() {

    const status: any = {
      0: '',
      1: 'no',
      2: 'yes',
    };
    const prize: any = {
      0: '待开奖',
      1: '未中奖',
    };

    const isFoucs = ref(false)



    const { query } = useRoute()
    const { getFoucsStatus } = useUser()
    const { privateRecordStore, getHotUserDetails, cancelFocus, addFocus } = useRecord();

    const betInfoStatusList = computed(() => privateRecordStore.hotUser.details?.betInfo?.split(',').filter((v: any) => v !== ''))

    const follow2cancel = async () => {
      isFoucs.value ? await cancelFocus() : await addFocus()
      isFoucs.value = !isFoucs.value
    }

    watch(() => privateRecordStore.hotUser.details, async (newValue) => {
      if (newValue && newValue.uid) {
        const data = await getFoucsStatus({ focusId: newValue.uid })
        isFoucs.value = data
      }
    }, { immediate: true })

    onMounted(() => {
      if (query.id) {
        getHotUserDetails(query.id as string)
      }
    })

    return { prize, status, privateRecordStore, isFoucs, betInfoStatusList, follow2cancel };
  },
});
</script>
<style scoped lang="scss">
.userDetail {
  background: #f6f6f6;
  // padding: 0 20px;
  padding-top: 44px;

  .head_box {
    margin: 0 auto;
    width: 100%;

    .user_box {
      display: flex;
      align-items: center;
      height: 95px;
      color: #48484b;

      img {
        margin-left: 34px;
        width: 58px;
        height: 58px;
        border-radius: 20px;
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 15px;
        height: 58px;

        .top {
          font-size: 19px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.85);
        }

        .bottom {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.5);

          span {
            margin-right: 5px;
            font-size: 14px;
            color: #232a24;
          }
        }
      }

      .follow {
        margin-left: auto;
        margin-right: 15px;
        width: 64px;
        height: 30px;
        color: #2e2f30;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        line-height: 30px;
        border-radius: 4px;
        background: linear-gradient(127deg, #fff120, #fcdf6b);
      }
    }
  }

  .c_box {
    margin: 0 auto 15px;
    width: 346px;
    background: url('./assets/u_bg.png') no-repeat top;
    background-size: 346px 159px;
    border-radius: 8px;
    box-shadow: 0 5px 9px 0 rgba(239, 236, 236, 0.71);

    .top {
      display: flex;
      padding: 20px 0;
      width: 100%;

      .item {
        flex: 1;
        position: relative;
        color: #fff;
        font-size: 16px;
        font-weight: 400;
        text-align: center;

        div {
          font-size: 12px;
          color: hsla(0, 0%, 100%, 0.85);
          margin-top: 8px;
        }
      }

      .item1 {
        &::before {
          content: '';
          position: absolute;
          top: 11px;
          width: 1px;
          height: 20px;
          background-color: #e0e0e0;
          left: 0;
        }

        &::after {
          content: '';
          position: absolute;
          top: 11px;
          width: 1px;
          height: 20px;
          background-color: #e0e0e0;
          right: 0;
        }
      }
    }

    .bottom {
      display: flex;
      align-items: center;
      padding: 15px 18px;
      width: 100%;

      span {
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        width: 115px;
      }

      .ball-box {
        flex: 1;
        display: flex;

        .item {
          display: flex;
        }

        .yes {
          color: #fff;
          background-color: #f73;
        }

        .no {
          color: rgba(0, 0, 0, 0.85);
          background-color: #fff;
        }

        .ball {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 26px;
          height: 26px;
          border-radius: 100%;
          font-size: 10px;
          font-weight: 500;
        }

        .arrow {
          width: 20px;
          height: 30px;
          background: url('./assets/left_arrow.png') no-repeat 50%;
          background-size: 12px auto;
        }
      }
    }
  }

  .box {
    margin: 0 auto 20px;
    width: 100%;

    .sub-box {
      display: flex;
      flex-direction: column;
      margin: 10px auto;
      padding: 0 10px 20px;
      width: 345px;
      border-radius: 8px;
      background-color: #fff;
      box-shadow: 0 2px 13px 0 hsla(0, 0%, 91.8%, 0.64);

      .title {
        margin-top: 10px;
        color: #1d2632;
        font-size: 16px;
        font-weight: 500;
      }

      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        width: 325px;
        height: 86px;
        border-bottom: 1px solid #efeff4;

        .top {
          color: #1d2632;
          font-size: 14px;
        }

        .bottom {
          display: flex;
          margin-top: 7px;
          color: #878484;
          font-size: 12px;

          .no {
            background: url('./assets/no.png') no-repeat 50%;
            background-size: 54px 54px;
          }

          .yes {
            color: #f73 !important;
            font-size: 14px;
            background: url('./assets/yes.png') no-repeat 50%;
            background-size: 54px 54px;
          }

          .win-box {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 10px;
            right: 10px;
            width: 54px;
            height: 54px;
            color: #8e8e93;
            font-size: 12px;
            font-weight: 600;
            word-break: keep-all;
            white-space: nowrap;
          }

          .money {
            color: #878484;
            font-size: 12px;
          }

          .rq {
            margin-left: 20px;

            span {
              margin-right: 5px;
            }

            .start {
              display: inline-block;
              margin-right: 2px;
              width: 10px;
              height: 10px;
              background: url('./assets/star.png') no-repeat 50%;
              background-size: 10px 10px;
            }
          }

          .time {
            margin-left: auto;
            color: #878484;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
