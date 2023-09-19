<template>
  <div class="my-message">
    <div class="item">
      <img :src="require('../assets/info1.png')" />
      <div class="msg-con">这是一条测试消息</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
<style scoped lang="scss">
.my-message {
  background: #f6f6f6;
  min-height: 100vh;
  overflow: hidden;
  .item {
    display: flex;
    align-items: center;
    margin: 15px auto;
    width: 358px;
    height: 93px;
    border-radius: 6px;
    background-color: #fff;
    img {
      margin: 0 10px;
      width: 45px px;
      height: 45px;
    }
    .msg-con {
      display: flex;
      flex-direction: column;
      font-size: 16px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.85);
    }
  }
}
</style>
