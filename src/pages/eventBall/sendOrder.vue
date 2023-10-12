<template>
  <div class="send-order">
    <Headers title="发单设置" transparent :backEvent="() => $emit('back')" />
    <div class="send-order-content">
      <div class="top flex-center">
        <h1>200</h1>
        <p>方案金额(元)</p>
      </div>
      <div class="commission">
        <h2>提成比例</h2>
        <div>
          <div v-for="(item, index) in 10" :key="item">{{ index }}%</div>
        </div>

      </div>
      <div>
        <h2>方案宣言</h2>
        <van-field v-model="sendOrderStore.message" rows="2" autosize type="textarea" maxlength="50" placeholder="请输入留言"
          show-word-limit />
      </div>

      <div class="btn">
        <q-btn label="确认发单" type="submit" color="primary" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const sendOrderStore = reactive({
      message: ''
    })

    return { sendOrderStore }
  }
})
</script>

<style scoped lang="scss">
.send-order {
  background: #fffef5 url('./assets/member_bg.png') no-repeat top;
  background-size: 390px 100%;
  min-height: 100vh;

  &-content {
    padding: 44px 15px 70px 15px;
    background-color: #fff;
    border-radius: 15px 15px 0 0;

    .top {
      >h1 {
        font-size: 18px;
        color: #FF7733;
        font-weight: 500;
      }

      >p {
        font-size: 14px;
        color: $title;
      }
    }

    .btn {
      width: 100%;

    }

    h2 {
      font-size: 14px;
    }
  }
}
</style>
