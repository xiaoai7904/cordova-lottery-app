<template>
  <div class="basketBall">
    <PageList isInit :requestApi="getBaketBallScoreList" :list="privateMatchStore.basketball.list"
      :total="privateMatchStore.basketball.total" :pages=privateMatchStore.basketball.pages
      v-model:current="privateMatchStore.basketball.pageNum" v-slot="slotProps">
      <div class="ball-box" v-for="(item, index) in slotProps.list" :key="index">
        <div class="a-box">
          周二301 美职女篮<span class="time">09-20 07:00</span>
        </div>
        <div class="a-box">
          <div class="left">
            <span class="left-item">
              <span>神秘人</span>
              <span>1</span>
            </span>
            <span class="left-item left-item-secend">
              <span>自由</span>
              <span>2</span>
            </span>
          </div>
          <span class="active"><span>未开赛</span></span>
        </div>
      </div>
    </PageList>
    <!-- <div class="ball-box">
      <div class="a-box">
        周二301 美职女篮<span class="time">09-20 07:00</span>
      </div>
      <div class="a-box">
        <div class="left">
          <span class="left-item">
            <span>神秘人</span>
            <span>1</span>
          </span>
          <span class="left-item left-item-secend">
            <span>自由</span>
            <span>2</span>
          </span>
        </div>
        <span class="active"><span>未开赛</span></span>
      </div>
    </div>
    <div class="ball-box">
      <div class="a-box">
        周二301 美职女篮<span class="time">09-20 07:00</span>
      </div>
      <div class="a-box">
        <div class="left">
          <span class="left-item">
            <span>神秘人</span>
            <span></span>
          </span>
          <span class="left-item left-item-secend">
            <span>自由</span>
            <span></span>
          </span>
        </div>
        <span class="active"><span>未开赛</span></span>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMatch } from 'src/hook'
export default defineComponent({
  setup() {
    const { privateMatchStore, getBaketBallScoreList } = useMatch();

    return { privateMatchStore, getBaketBallScoreList };
  }
});
</script>
<style scoped lang="scss">
.basketBall {
  min-height: calc(100vh - 160px);

  .ball-box {
    padding: 14px 20px;
    width: 100%;
    height: 100px;
    border-bottom: 0.5px solid #f4f4f4;

    .a-box:first-child {
      color: #aaa;
      font-size: 14px;
      font-weight: 500;

      .time {
        float: right;
      }
    }

    .a-box:last-child {
      display: flex;
      margin-top: 12px;
      font-size: 16px;
      color: #48484b;
      font-weight: 500;

      .left {
        flex: 1;
        height: 41px;

        .left-item {
          display: block;
          width: 100%;
          height: 20px;
          line-height: 20px;
          text-align: right;
          color: #aaa;

          span:nth-child(1) {
            float: left;
            color: #48484b;
          }

          span:nth-child(2) {
            color: #ffca2d;
            margin: 0 10px;
          }
        }
      }

      .active {
        width: 60px;
        height: 41px;
        text-align: right;
        line-height: 41px;
        border-left: 0.5px solid #f4f4f4;
        color: #c2c2c5;
      }
    }
  }
}
</style>
