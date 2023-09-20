<template>
  <div class="home">
    <div class="top">
      <van-swipe
        class="my-swipe"
        :show-indicators="false"
        :autoplay="3000"
        indicator-color="white"
      >
        <van-swipe-item @click="() => router.push('/sliderInfo')"
          ><img
            src="http://xcpicture.oss-cn-shanghai.aliyuncs.com/app/news/banner/2023/06/26/155233.png"
        /></van-swipe-item>
        <van-swipe-item @click="() => router.push('/sliderInfo')"
          ><img
            src="http://xcpicture.oss-cn-shanghai.aliyuncs.com/app/news/banner/2023/06/26/154727.png"
        /></van-swipe-item>
        <van-swipe-item @click="() => router.push('/sliderInfo')"
          ><img
            src="http://xcpicture.oss-cn-shanghai.aliyuncs.com/app/news/banner/2023/06/08/160954.png"
        /></van-swipe-item>
      </van-swipe>
      <div class="notice_view">
        店铺资质环境展示
        <div class="detail_btn" @click="() => router.push('/shopDetail')">
          <span>详情</span>
        </div>
      </div>
      <!--nav-->
      <div class="nav">
        <div class="item">
          <img :src="require('./assets/cz1.png')" /><span>竞彩足球</span>
        </div>
        <div class="item">
          <img :src="require('./assets/cz2.png')" /><span>竞彩篮球</span>
        </div>
      </div>
    </div>
    <div class="gods_box">
      <div class="item" v-for="(item, i) in model.topList" :key="i">
        <span>{{ i + 1 }}</span>
        <img :src="item.img" />
        <span class="name">{{ item.name }}</span>
        <span class="money">
          {{ item.money }}
          <span>元</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import PageList from 'src/components/PageList.vue';
// import { Swipe, SwipeItem } from 'vant';
import { reactify } from '@vueuse/core';
import { defineComponent, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const router = useRouter();
    const model = reactive({
      topList: [
        {
          name: '中国第一彩团',
          img: require('./assets/1.png'),
          money: '23609.6',
        },
        { name: '梦都足球', img: require('./assets/2.png'), money: '29910.92' },
        { name: '博哥玩球', img: require('./assets/3.png'), money: '8664' },
        { name: '出手就赢', img: require('./assets/4.png'), money: '54775.2' },
      ],
    });
    return { model, router };
  },
});
</script>
<style scoped lang="scss">
.home {
  color: #2e2f30;
  overflow: hidden;
  padding-bottom: 108px;
  .top {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    margin: 0 auto;
    width: 358px;
    border-radius: 14px;
    background-color: #fff;
    box-shadow: 0 6px 11px 0 rgba(222, 220, 195, 0.39);
    margin-top: 20px;
    .my-swipe {
      width: 100%;
      height: 148px;
      border-radius: 14px 14px 0 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .notice_view {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      margin-top: 10px;
      padding-left: 75px;
      width: 327px;
      height: 26px;
      color: #2e2f30;
      font-size: 14px;
      font-weight: 500;
      background: url('./assets/notice_bg.png') no-repeat 0;
      background-size: 65px 15px;
      ::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 70px;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        width: 1px;
        height: 12px;
        background-color: #ededed;
      }
      .detail_btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 52px;
        height: 20px;
        color: #fff;
        background: #f73;
        border-radius: 4px;
      }
    }
    .nav {
      width: 100%;
      display: flex;
      align-items: center;
      width: 358px;
      height: 112px;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 93px;
        height: 93px;
        color: #2e2f30;
        font-size: 14px;
        font-weight: 500;
        img {
          width: 65px;
          height: 64px;
        }
      }
    }
  }
  .gods_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 15px auto;
    padding: 85px 0 22px 0;
    width: 380px;
    height: 446px;
    background: url('./assets/top.png') no-repeat;
    background-size: 380px 446px;
    .item {
      display: flex;
      align-items: center;
      margin: 15px 0;
      padding: 0 26px;
      width: 100%;
      height: 52px;
      font-size: 14px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.85);
      img {
        margin-left: 10px;
        width: 43px;
        height: 43px;
        border-radius: 100%;
      }
      .name {
        margin-left: 12px;
        width: 114px;
      }
      .money {
        margin-left: auto;
        color: #f73;
        font-size: 16px;
        span {
          margin-left: 5px;
          color: #c2c2c2;
          font-size: 12px;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
