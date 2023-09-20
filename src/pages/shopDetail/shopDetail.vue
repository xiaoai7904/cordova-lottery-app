<template>
  <div class="shopDetail">
    <Headers transparent> </Headers>
    <div class="header-box">
      <div class="left">
        <div>线下实体店铺</div>
        <div>遍及32个地区-全国100余家店铺</div>
        <div>服务10000+客户</div>
      </div>
      <div class="right"><img :src="require('./assets/store1.png')" /></div>
    </div>
    <div class="content-box">
      <div class="title">店铺资质</div>
      <div class="img"><img :src="require('./assets/store2.png')" /></div>
      <div class="title">店铺实景</div>
      <div class="img1"><img :src="require('./assets/store3.png')" /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {};
  },
});
</script>
<style scoped lang="scss">
.shopDetail {
  background: linear-gradient(126deg, #f0df1e, #fce06a 100%, #fcdf6b 0);
  overflow: hidden;
  .header-box {
    display: flex;
    justify-content: space-between;
    width: 390px;
    margin-top: 44px;
    .left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: left;
      div:nth-of-type(1) {
        position: relative;
        width: 156px;
        margin-left: 5px;
        color: #484631;
        font-size: 31px;
        font-weight: 600;
        word-break: keep-all;
        white-space: normal;
      }
      div:nth-of-type(2) {
        align-self: flex-end;
        color: #484631;
        font-size: 12px;
        margin-top: 3px;
      }
      div:nth-of-type(3) {
        margin-top: 15px;
        width: 149px;
        height: 29px;
        color: #857900;
        font-size: 12px;
        text-align: center;
        line-height: 29px;
        background: #f7ecaf;
        border-radius: 28px;
      }
    }
    .right {
      width: 199px;
      height: 214px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .content-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: -31px;
    padding-bottom: 20px;
    width: 100%;
    background: linear-gradient(180deg, #fffbc7, #fff);
    border-radius: 20px 20px 0 0;
    .title {
      position: relative;
      width: 156px;
      height: 72px;
      color: #484631;
      font-size: 20px;
      font-weight: 600;
      text-align: center;
      line-height: 72px;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: -79px;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        width: 79px;
        height: 2px;
        background: linear-gradient(90deg, #fdfdf3 0, #fff120);
      }
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -79px;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        width: 79px;
        height: 2px;
        background: linear-gradient(270deg, #fdfdf3 0, #fff120);
      }
    }
    .img {
      width: 348px;
      height: 257px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .img1 {
      width: 350px;
      height: 570px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
