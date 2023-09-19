<template>
  <div class="myInformation">
    <div class="item" v-for="item in 10" :key="item">
      <div class="item-box">
        <div class="top">
          <i>足球</i>
          <span>9月19日竞彩足球解析:中国期待开门红 巴黎后场压力大</span>
        </div>
        <img :src="require('../assets/eye.png')" />
        <div class="text1">70</div>
        <div class="text2">2023-09-19 09:23</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
<style scoped lang="scss">
.myInformation {
  background: #f6f6f6;
  min-height: 100vh;
  overflow: hidden;
  padding-bottom: 108px;
  .item {
    position: relative;
    display: flex;
    padding: 13px 12px;
    margin: 10px auto 0;
    width: 358px;
    height: 99px;
    border-radius: 6px;
    background-color: #fff;
    .item-box {
      flex: 1;
      font-size: 13px;
      color: #c7c7cc;
      .top {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 10px;
        font-size: 16px;
        color: #484848;
        line-height: 20px;
        i {
          display: inline-block;
          margin-right: 5px;
          width: 41px;
          height: 18px;
          color: #f73;
          font-size: 14px;
          font-style: normal;
          text-align: center;
          line-height: 18px;
          border-radius: 3px;
          background-color: rgba(255, 119, 51, 0.15);
        }
      }
      img {
        position: absolute;
        bottom: 21px;
        left: 20px;
        width: 12px;
      }
      .text1 {
        position: absolute;
        bottom: 18px;
        left: 36px;
      }
      .text2 {
        position: absolute;
        bottom: 18px;
        left: 62px;
      }
    }
  }
}
</style>
