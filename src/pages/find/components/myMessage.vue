<template>
  <div class="my-message">
    <PageList ref="pageListRef1" isInit :requestApi="getMessageList" :list="privateRecordStore.message.list"
      :total="privateRecordStore.message.total" :pages=privateRecordStore.message.pages
      v-model:current="privateRecordStore.message.pageNum" v-slot="slotProps">
      <div class="item" v-for="(item, index) in slotProps.list" :key="index">
        <img :src="require('../assets/info1.png')" />
        <div class="msg-con">这是一条测试消息</div>
      </div>
    </PageList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRecord } from 'src/hook';

export default defineComponent({
  setup() {
    const { privateRecordStore, getMessageList } = useRecord();
    return { privateRecordStore, getMessageList }
  }
});
</script>
<style scoped lang="scss">
.my-message {
  // background: #f6f6f6;
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
