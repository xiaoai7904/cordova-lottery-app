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
