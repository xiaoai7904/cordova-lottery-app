<template>
  <div class="list-box">
    <div class="l-header">
      <img :src="require('./assets/1.png')" />
      <div class="info">
        <div class="left" @click="() => router.push('/userOrder')">
          <div class="top">以鹿为马</div>
          <div class="bottom">09-21 21:30截止</div>
        </div>
        <div class="right">
          <div class="top">0%</div>
          <div class="bottom">盈利率</div>
        </div>
      </div>
    </div>
    <div class="l-con">
      <span>[竞猜足球]</span>
      竞彩比赛精选方案！
    </div>
    <div class="l-footer">
      <div class="tab">
        <div>-</div>

        <div class="text">跟单热度</div>
      </div>
      <div class="tab">
        <div>264元</div>
        <div class="text">自购金额</div>
      </div>
      <div class="tab">
        <div>-</div>
        <div class="text">预估回报率</div>
      </div>
      <div class="btn">跟单</div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<any>,
      default: () => ({})
    }
  },
  setup(props, ctx) {
    return {}
  },
})
</script>

<style scoped lang="scss">
.list-box {
  display: flex;
  flex-direction: column;
  margin: 15px auto;
  padding: 0 12px;
  width: 358px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 hsla(0, 0%, 69%, 0.2);

  .l-header {
    display: flex;
    margin: 10px 0;
    width: 100%;

    img {
      width: 39px;
      height: 39px;
      border-radius: 100%;
    }

    .info {
      flex: 1;
      display: flex;
      justify-content: space-between;
      padding-left: 10px;

      .left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .top {
          display: flex;
          align-items: center;
          font-size: 18px;
          font-weight: 600;
          color: #4c5561;
        }

        .bottom {
          font-size: 12px;
          color: #8e8e93;
        }
      }

      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .top {
          font-size: 18px;
          color: #f73;
          font-weight: 600;
        }

        .bottom {
          font-size: 12px;
          color: #8e8e93;
        }
      }
    }
  }

  .l-con {
    font-size: 14px;
    color: #707579;

    span {
      margin-right: 5px;
      color: #73bfb8;
    }
  }

  .l-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px auto;
    padding: 0 10px;
    width: 333px;
    height: 52px;
    font-size: 15px;
    background: linear-gradient(179deg, #fffcf7, #fff7ec);

    .tab {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 78px;
      color: #030835;
      font-weight: 500;
      text-align: center;
      flex-wrap: wrap;

      div {
        width: 100%;
        margin-bottom: 5px;
      }

      .text {
        font-size: 10px;
        color: #8e8e93;
      }
    }

    .btn {
      width: 64px;
      height: 29px;
      color: #2e2f30;
      text-align: center;
      line-height: 29px;
      border-radius: 4px;
      background: linear-gradient(152deg, #fff120, #fcdf6b);
    }
  }
}
</style>
