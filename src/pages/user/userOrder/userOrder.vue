<template>
  <div class="userOrder">
    <Headers transparent> </Headers>
    <div class="head_box">
      <div class="user_box">
        <img :src="require('./assets/1.png')" />
        <div class="info">
          <div class="top">博哥玩球</div>
          <div class="bottom"><span>783</span>粉丝</div>
        </div>
        <div class="follow" @click="follow2cancel">已关注</div>
      </div>
    </div>
    <div class="c_box">
      <!--中奖信息-->
      <div class="top">
        <div class="item">
          11109.56
          <div>累计中奖</div>
        </div>
        <div class="item item1">
          227%
          <div>7日盈利</div>
        </div>
        <div class="item">
          11109.56
          <div>7日命中</div>
        </div>
      </div>
      <!--七天战绩-->
      <div class="bottom">
        <span>七天战绩</span>
        <div class="ball-box">
          <div class="item" v-for="(item, i) in data" :key="i">
            <div class="ball" :class="item.value ? 'yes' : 'no'">
              {{ item.label }}
            </div>
            <div class="arrow" v-if="i < data.length - 1"></div>
          </div>
        </div>
      </div>
      <!--游戏信息-->
      <div class="game_box">
        <div class="top">
          <img src="./assets/ball.png" />
          <span>竞彩足球(2串1)</span>
          <span class="right"> 09-24 17:30截止 </span>
        </div>
        <div class="middle">
          SP6.9倍！奖金89700元，决胜
          17:30分。高赔真正的王者，我十余次命中5.8-7.8倍水位，平局王者！看盘有自己独特风格以及超高命中率！
        </div>
        <div class="bottom">
          <div class="item">
            <div>1300元</div>
            <div>自购</div>
          </div>
          <div class="item">
            <div>10%</div>
            <div>佣金</div>
          </div>
          <div class="item">
            <div>25772.3</div>
            <div>奖金</div>
          </div>
          <div class="item">
            <div>13380</div>
            <div>佣金</div>
          </div>
        </div>
      </div>
      <!--方案详情、跟单用户-->
      <div class="box">
        <van-tabs v-model:active="activeName">
          <!--方案详情-->
          <van-tab title="方案详情" name="a">
            <div class="tab_box">
              <table>
                <th>
                <td>场次</td>
                <td>对阵</td>
                <td>比分</td>
                <td>投注</td>
                <td>胆</td>
                </th>
                <tr>
                  <td>
                    <p>周日</p>
                    <p>004</p>
                  </td>
                  <td>
                    <div class="tag">大邱</div>
                    <div class="tag">VS</div>
                    <div class="tag">浦项制铁</div>
                  </td>
                  <td>
                    <div class="tag">0:0</div>
                    <div class="tag">0:0</div>
                  </td>
                  <td>
                    <div>平@4.50</div>
                    <div class="tag">负@1.30</div>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <p>周日</p>
                    <p>004</p>
                  </td>
                  <td>
                    <div class="tag">大邱</div>
                    <div class="tag">VS</div>
                    <div class="tag">浦项制铁</div>
                  </td>
                  <td>
                    <div class="tag">0:0</div>
                    <div class="tag">0:0</div>
                  </td>
                  <td>
                    <div>平@4.50</div>
                    <div class="tag">负@1.30</div>
                  </td>
                  <td></td>
                </tr>
              </table>
            </div>
          </van-tab>
          <!--跟单用户-->
          <van-tab title="跟单用户" name="b">
            <div class="tab_box">
              <div class="tab-item">
                <div>跟单人</div>
                <div>跟单金额</div>
                <div>跟单时间</div>
              </div>
              <div class="tab-item">
                <div>重***连</div>
                <div><span class="tag">3000</span>元</div>
                <div>2023-09-23 21:02:06</div>
              </div>
              <div class="tab-item">
                <div>重***连</div>
                <div><span class="tag">3000</span>元</div>
                <div>2023-09-23 21:02:06</div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router'
import { useRecord } from 'src/hook'
import { onMounted } from 'vue';
export default defineComponent({
  setup() {
    const { privateRecordStore, getFollowOrderDetails, cancelFocus, addFocus, } = useRecord();
    const { query } = useRoute()
    const activeName = ref('a')
    const data = [
      { label: '中', value: 1 },
      { label: '中', value: 1 },
      { label: '中', value: 1 },
      { label: '中', value: 1 },
      { label: '未', value: 0 },
    ];

    const follow2cancel = () => {
      cancelFocus()
      addFocus()
    }

    onMounted(() => {
      if (query.id) {
        getFollowOrderDetails(query.id as string)
      }
    })
    return { data, activeName, follow2cancel };
  },
});
</script>
<style scoped lang="scss">
.userOrder {
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
    background: url('./assets/u_bg.png') no-repeat;
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

    .game_box {
      display: flex;
      flex-direction: column;
      margin-top: 25px;
      width: 100%;
      background-color: #fff;

      .top {
        display: flex;
        align-items: center;
        margin-bottom: 24px;
        padding: 0 15px;
        width: 100%;
        height: 44px;

        img {
          width: 44px;
          height: 44px;
        }

        span {
          font-size: 15px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.85);
        }

        .right {
          margin-left: auto;
          color: #6d7278;
          font-size: 12px;
          font-weight: 500;
        }
      }

      .middle {
        padding: 0 15px;
        color: #7b7d7e;
        font-size: 13px;
        line-height: 16px;
      }

      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0;
        width: 100%;
        height: 57px;
        border-radius: 4px;
        background-color: #fff7ec;

        .item:last-child {
          &::before {
            background: none !important;
          }
        }

        .item {
          flex: 1;
          color: #1d2632;
          font-size: 16px;
          font-weight: 500;
          text-align: center;
          position: relative;

          &::before {
            content: '';
            position: absolute;
            top: 50%;
            right: 0;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            width: 1px;
            height: 24px;
            background: #e0e0e0;
          }

          div:nth-of-type(2) {
            font-size: 10px;
            color: rgba(0, 0, 0, 0.5);
            margin-top: 3px;
          }
        }
      }
    }
  }

  .box {
    overflow: hidden;
    margin: 15px auto;
    width: 100%;
    height: 291px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 13px 0 hsla(0, 0%, 91.8%, 0.64);
    padding: 0 10px;

    .tab_box {
      width: 100%;
      height: 234px;
      background-color: #f6f6f6;
      overflow-y: auto;

      .tag {
        color: #f73
      }

      table {
        width: 100%;
        font-size: 12px;
        color: #303133;
        margin-top: 3px;

        th {
          text-align: center;
          display: flex;

          td {
            flex: 1;
            text-align: center;
            padding: 5px 3px;
          }
        }

        tr {
          display: flex;

          td {
            flex: 1;
            display: flex;
            align-items: center;
            ;
            text-align: center;
            padding: 5px 3px;
            flex-wrap: wrap;
            justify-content: center;

            div,
            p {
              width: 100%;
            }

          }
        }
      }

      .tab-item {
        width: 100%;
        font-size: 12px;
        display: flex;
        color: #303133;
        margin-top: 3px;

        div {
          padding: 5px 3px;
          text-align: center;
        }

        div:nth-of-type(1) {
          width: 30%
        }

        div:nth-of-type(2) {
          width: 30%
        }

        div:nth-of-type(3) {
          width: 40%
        }
      }
    }

    :deep(.van-tab--active) {
      color: #f73;
    }

    :deep(.van-tabs__line) {
      background: #f73;
      height: 2px;
      // bottom: -3px;
    }

  }
}
</style>
