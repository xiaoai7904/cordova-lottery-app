<template>
  <div class="home">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <!-- <div class="orders">
      <div class="title">Recharge record</div>
      <PageList scroll-target="body" :pullRefreshDisable="true" :request-api="getHistoryOrderList" :request-params="{}"
        :pageList="rechargeStore.rechargeRecord.list" :pageInfo="rechargeStore.rechargeRecord"
        @load="loadRechargeRecordList" isShowAllLoadText v-slot="slotProps">
        <div class="list" :key="slotProps.index">
          <img class="icon" :src="require(`./assets/${slotProps.item.type === 1 ? 'order2' : 'INR'}.png`)" alt="" />
          <span class="name">{{ slotProps.item.type === 1 ? 'USDT' : 'INR' }}</span>
          <span class="val">{{ slotProps.item.cash > 0 ? '+' : '' }}{{ currency(slotProps.item.cash) }}</span>
        </div>
      </PageList>

    </div> -->
  </div>
</template>

<script lang="ts">
// import PageList from 'src/components/PageList.vue';
// import { Swipe, SwipeItem } from 'vant';
import { defineComponent } from 'vue';
export default defineComponent({
})
</script>
<style scoped lang="scss"></style>
