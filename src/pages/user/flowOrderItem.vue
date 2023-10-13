<template>
  <div class="flow-order">
    <div class="flex-between">
      <div class="top">
        <img src="./userOrder/assets/ball.png" alt="">
        <span>{{ data.title }}</span>
      </div>
      <span class="time">10-12 16:10截止</span>
    </div>

    <div class="flex-between">
      <div class="title flex-start">
        <div>
          <h2>1111</h2>
          <p>自购金额</p>
        </div>
        <div>
          <div class="start" v-for="(item, i) in 4" :key="i"></div>
          <p>跟单人气</p>
        </div>
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
  setup() {
    return {}

  }
})
</script>

<style scoped lang="scss">
.flow-order {
  width: 345px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px 15px;

  .top {
    font-size: 14px;
    font-weight: 600;

    >img {
      width: 50px;
      height: 50px;
    }
  }

  .time {
    font-size: 12px;
    color: #6d7278;
  }

  .title {
    font-size: 14px;

    >div {
      text-align: center;

      >h2 {
        font-size: 14px;
        font-weight: 600;
      }

      >p {
        margin-top: 8px;
        font-size: 12px;
        color: #8e8e93;
        font-weight: 500;
      }
    }

    >div:first-child {
      margin-right: 20px;
    }
  }

  .btn {
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

  .start {
    display: inline-block;
    margin-right: 2px;
    width: 10px;
    height: 10px;
    background: url('./userDetail/assets/star.png') no-repeat 50%;
    background-size: 10px 10px;
  }

}
</style>
