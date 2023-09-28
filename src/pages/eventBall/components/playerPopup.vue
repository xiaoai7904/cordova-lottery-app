<template>
  <div class="playerPopup" @click.stop="emit('update:show', false)">
    <div class="content">
      <div class="item item-a">开奖结果</div>
      <div class="item item-b">玩法介绍</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  setup(props, { emit }) {
    const router = useRouter();

    return { router, emit };
  },
});
</script>
<style scoped lang="scss">
.playerPopup {
  width: 100%;
  height: calc(100vh - 44px);
  background: rgba(0, 0, 0, 0.4);
  top: 44px;
  position: fixed;
  z-index: 99;
  .content {
    position: absolute;
    top: -2px;
    right: 16px;
    padding: 3px 20px;
    width: 156px;
    height: 72px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 3px 9px 0 rgba(132, 131, 131, 0.5);
    .item {
      position: relative;
      padding: 5px 0 5px 20px;
      height: 34px;
      line-height: 23px;
      color: #0c0c0c;
      font-size: 14px;
    }
    .item-a {
      &::before {
        content: '';
        position: absolute;
        top: 8px;
        left: 0;
        width: 14px;
        height: 15px;
        background: url('../assets/b.png') no-repeat 50%;
        background-size: 14px 15px;
      }
    }
    .item-b {
      &::before {
        content: '';
        position: absolute;
        top: 8px;
        left: 0;
        width: 14px;
        height: 15px;
        background: url('../assets/a.png') no-repeat 50%;
        background-size: 14px 15px;
      }
    }
  }
}
</style>
