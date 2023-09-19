<template>
  <div class="source">
    <div class="navbar-inner">
      <div class="left">
        <div class="slot-wrap">
          <div
            v-for="(item, i) in model.navList"
            :key="i"
            :class="model.currIndex == i && 'active'"
            @click="changeIndex(item, i)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="right" @click="() => (model.show = true)"></div>
    </div>
    <div class="content">
      <component :is="model.currTab" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import FootBall from './components/footBall.vue';
import BasketBall from './components/basketBall.vue';
interface tabItem {
  name: string;
  value: string;
}
export default defineComponent({
  components: {
    FootBall,
    BasketBall,
  },
  setup() {
    const model = reactive({
      navList: [
        { name: '开奖', value: 'FootBall' },
        { name: '消息', value: 'BasketBall' },
        { name: '资讯', value: 'BasketBall' },
      ],
      currIndex: 0,
      currTab: 'FootBall',
      show: false,
    });
    const changeIndex = (item: tabItem, i: number) => {
      model.currIndex = i;
      model.currTab = item.value;
    };
    return { model, changeIndex };
  },
});
</script>
<style scoped lang="scss">
.source {
  .navbar-inner {
    display: flex;
    justify-content: space-between;
    position: relative;
    align-items: center;
    height: 44px;
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      .slot-wrap {
        display: flex;
        align-items: center;
        flex: 1;
        margin-left: 10px;
        font-size: 18px;
        font-weight: 600;
        color: #fff;
        .active {
          color: #2e2f30;
          font-size: 20px;
          font-weight: 600;
        }
        div {
          width: 64px;
          height: 30px;
          color: #8b8e91;
          font-size: 16px;
          text-align: center;
          line-height: 30px;
        }
      }
    }
    .right {
      display: inline-block;
      width: 28px;
      height: 28px;
      margin-top: 6px;
      padding: 5px;
      margin-right: 20px;
      background: url('./assets/filter.png') no-repeat 50%;
      background-size: 18px 18px;
    }
  }
  .content {
    overflow: hidden;
    width: 100%;
    border-radius: 24px 24px 0 0;
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);
    background-color: #fff;
    box-shadow: 0 11px 19px 0 rgba(151, 195, 206, 0.17);
  }
}
</style>
