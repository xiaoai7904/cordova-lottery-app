<template>
  <div class="order">
    <Headers transparent :hidenLeft="true">
      <template #title><span class="title">大神跟单</span></template>
      <template #right>
        <span class="rules" @click="() => (model.show = true)"
          ><van-icon name="info-o" size="25px"
        /></span>
      </template>
    </Headers>
    <div class="search">
      <div class="left">大神搜索</div>
      <div class="right"><span>我的关注</span></div>
    </div>
    <div class="content-box">
      <div class="common-box">
        <!--榜单前八名-->
        <div class="item-box">
          <template v-for="(item, i) in model.navList" :key="i">
            <div
              class="item"
              v-if="i <= 7"
              @click="() => router.push('/userDetail')"
            >
              <img :src="item.img" />
              <span>{{ item.nid }}</span>
            </div>
          </template>
        </div>
        <!--店主推荐-->
        <div class="tj-box">
          <div class="d1"></div>
          <template v-for="(item, i) in model.nav2List" :key="i">
            <div
              class="d2"
              v-if="i <= 3"
              @click="() => router.push('/userDetail')"
            >
              <img :src="item.img" />
              <span>{{ item.name }}</span>
            </div>
          </template>
        </div>
      </div>
      <div class="rule-box">复制跟单规则说明</div>
      <div class="list-title">大神晒单</div>
      <div class="tab-box">
        <div
          class="item"
          v-for="(item, i) in model.filterNav"
          :key="i"
          :class="model.active == i && 'active'"
          @click="changeTab(item, i)"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="list-box" v-for="item in 5" :key="item">
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
    </div>
    <van-dialog v-model:show="model.show" :showConfirmButton="false">
      <div class="dialog-title">
        规则说明
        <img
          :src="require('./assets/order_del.png')"
          @click="() => (model.show = false)"
        />
      </div>
      <div class="dialog-con">
        <div class="item">
          <div class="line-title">基础规则</div>
          <div class="line">近七天命中≥50％！</div>
          <div class="line">近七天返奖率≥180％！</div>
          <div class="line">近七天下单总下单数≥3单！</div>
          <div class="line">每单下单金额≥200元！</div>
          <div class="line">投注天数≥2天！</div>
          <div class="line">每单串关赔率≥1.8，单关赔率≥1.7！</div>
          <div class="line">每日下单≤3单！</div>
          <div class="line">下单金额不能高于上一单10倍！</div>
          <div class="line">
            封神榜后三位为店主推荐位：每日由店主推荐优质大神上榜！
          </div>
        </div>

        <div class="item">
          <div class="line-title">下榜规则</div>
          <div class="line">近七天命中＜50%！</div>
          <div class="line">近七天返奖率＜120%！</div>
          <div class="line">上榜三连黑！</div>
          <div class="line">2天不出单！</div>
          <div class="line">除返奖率外，不满足基础规则也将下榜!</div>
        </div>
        <div class="item">
          <div class="line-title">下榜时间</div>
          <div class="line">隔日下榜！</div>
        </div>
        <div class="item">
          <div class="line-title">跟单大厅显示规则</div>
          <div class="line">禁止发布任何虚假，攻击性宣言！%！</div>
          <div class="line">禁止以任何形式，留下联系方式！%！</div>
          <div class="line">禁止抄袭他人方案宣言！</div>
          <div class="line">禁止宣言以一定，肯定及确定等名词诱导用户跟单！</div>
          <div class="line">禁止取用敏感词作为用户名及宣言！!</div>
          <div class="line">一经发现一律严惩！!</div>
          <div class="line">
            任何以小金额刷连红，后等待七天战绩消失后，再以大金额出现在跟单大厅的账号，一律取消推广资格！!
          </div>
        </div>
        <div class="bd_list"><span>注</span>最终解释权归本彩店所有！</div>
      </div>
    </van-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const router = useRouter();
    const model = reactive({
      navList: [
        {
          nid: '出手就赢',
          img: require('./assets/1.png'),
        },
        {
          img: require('./assets/2.png'),
          nid: '傲雪鹏少',
        },
        {
          nid: '斗皇强者',
          img: require('./assets/3.png'),
        },
        {
          nid: '红单菩萨',
          img: require('./assets/4.png'),
        },
        {
          nid: '博哥玩球',
          img: require('./assets/5.png'),
        },
        {
          nid: '藏龙卧虎',
          img: require('./assets/6.png'),
        },
        {
          nid: '晚场竞彩大神',
          img: require('./assets/1.png'),
        },
        {
          nid: '皓月千里照神州',
          img: require('./assets/8.png'),
        },
      ],
      nav2List: [
        { name: '萌度足球', img: require('./assets/a1.png') },
        { name: '收米哥哥', img: require('./assets/a2.png') },
        { name: '杭州马云', img: require('./assets/a3.png') },
        { name: '会所有嫩模', img: require('./assets/a4.png') },
      ],
      filterNav: [
        { label: '金额', value: 1 },
        { label: '人气', value: 2 },
        { label: '命中', value: 3 },
        { label: '我的关注', value: 4 },
      ],
      active: 0,
      show: false,
    });
    const changeTab = (item: any, i: number) => {
      model.active = i;
    };

    return { model, changeTab, router };
  },
});
</script>
<style scoped lang="scss">
.order {
  background: url('./assets/aa.png') no-repeat top;
  background-size: 390px 228px;
  background-color: #fff;
  overflow: hidden;
  .dialog-title {
    position: relative;
    width: 100%;
    height: 54px;
    color: #48484b;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    line-height: 54px;
    background: rgba(239, 239, 244, 0.8);
    img {
      position: absolute;
      top: 11px;
      right: 10px;
      padding: 5px;
      width: 31px;
      height: 31px;
    }
  }
  .dialog-con {
    height: 447px;
    border-radius: 0px 0px 19px 19px;
    overflow-y: auto;
    padding: 20px;
    .item {
    }
    .bd_list {
      padding-top: 30px;
      padding-bottom: 20px;
      text-align: center;
      position: relative;
      color: #48484b;
      font-size: 12px;
      font-weight: 700;
      span {
        margin-right: 5px;
        color: #ae2d7b;
      }
    }
    .line-title {
      position: relative;
      padding: 10px 0 10px 20px;
      color: #48484b;
      font-size: 14px;
      font-weight: 700;
      &::before {
        content: '';
        position: absolute;
        top: 8px;
        left: 0;
        width: 14px;
        height: 16px;
        background: url('./assets/rule_book.png') no-repeat 50%;
        background-size: 14px 16px;
      }
    }
    .line {
      display: block;
      position: relative;
      padding-left: 19px;
      line-height: 21px;
      font-size: 13px;
      color: #727272;
      &::before {
        content: '';
        position: absolute;
        top: 7px;
        left: 7px;
        width: 4px;
        height: 4px;
        border-radius: 100%;
        background-color: #d8d8d8;
      }
    }
  }
  .title {
    color: #2e2f30;
    font-size: 18px;
    font-weight: 600;
  }
  .rules {
    margin-right: 18px;
    font-weight: 600;
  }
  .search {
    display: flex;
    justify-content: space-between;
    margin: 60px auto 15px;
    padding: 0 10px 0 15px;
    width: 100%;
    height: 41px;
    .left {
      position: relative;
      padding-left: 20px;
      width: 284px;
      height: 41px;
      color: #2e2f30;
      font-size: 14px;
      font-weight: 500;
      line-height: 41px;
      border-radius: 20px;
      background-color: rgba(255, 242, 138, 0.61);
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        right: 15px;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        width: 17px;
        height: 18px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAkCAYAAADsHujfAAAAAXNSR0IArs4c6QAABSBJREFUWEfNl3uIVFUcx7+/e2dmTc0VUzP/aLda0HZn7rl3J9segqBEBQsSFVoYRAkWwRZESpBB70AhLClKgv7IDHsaZYlGEJmWjPeeO9tGuMViuRY93PHVrjP3/OLO7ty9d3b2MbtTdv4b5vf4nN/ve875XcL/ZFE1HOl0evpAodCug1YowCLgMgD1YPaY6AQRjgD4lon2ZG37CwDeRONPCMSyrIUe83pWfA8RXTjB4MdA2AKlXnZd98x4PuOCGIbVAVLPADRzvGAV/2ccBbR1rnv4s7H8RwVpbGycVl8/exsDayYFEHXywHjUdZ1No8WqCGIYxgxo2l4wrq3g2EuED1hpHyt17khdXd1xAPGBAV6o657BTCsZ3F6phQR6VUr7vkowlUDIEOIdgG4tc/iLQM+eOXNqa3d398BYVbIsa56n1GMA3e9DRmwZ6ytVZgSIENbjDH4i4kxwNWCl4zg91bQpZVnLSPG7AOaG/Dyw1l6umQiIEKKFQXZ4FwQcyufPLe/q6jpdDUTJtrW1tangqQMRmKKAVXP4NEVAUsJ8n4BbQgl7dY2W2LbdOxmIks9QZfZG2kRY7zrD4g1AUqnU5SDtCBFpQVKN7nRte8dUIEq+hhBbAOoIxTrmSqehdOkNgwhrI4GfHDakw660rwLAtQDxBVzw1I/h08Qa3ZC17X1+/ADEEOZXAK4vJSVQh5T2S7WACKpimG+BcEcQk7DZdZxHwiCUMsRZIppWMorH9IZMJnO0liBCiFUMejsE8qXrOMsCkLa2tll/9w/kQklzrnRm1xLCj5VMtl6p6aqrFJeB41npLAxADMOYD9J+CwwY32ddp7nWIOl0uj5f8PqCuMz9risvCECSyeTFmh77dVgfkFI65r8AMj1f8MIvcd6VTiIAMU1ztmKcCCX+3ZXO/FqDJJPJKzQ91h2K+4crnXlhseqGMP33Qx8yUqy8udlsNgw3ZS7DaL0JpD4NaeRQVjpXlx1fywU4FRgR1mQdZ/uUs4cCCNPcyowHQhJ4TUpnXRTEMF8A4aEQ7SdZ6bTXCqSpqalu+oyZPwEonhJ/KfCqTil3loEYbSDtYCgxK8LSTsf5uhYwQlgPM3jz8MnkU4l4bEEmkzkbAfF/GML8BkCxZ4OLMydzuaU9PT39U4ExTbNRMTIA5gRxCFtcxwk6UD4G3MigyGxJwHYpnUmPi83NzTNjicR+MIzQBk/rmrYo/KqPGIwMYe0AeHW4Aj5MLte3ttrK+NO/UvwhA0siFWV60HXtF8tyRIte3EEssR8U3sFgmxRRxwQ1Q4ZlrYYqaiIQ55AW3pTSuau81RWHZ8uyGjxPHQTRgjIHZmA3CDvgebvL75l0On1poaBWMnA3wK0jdEU4cLKvb3mlyo76OTEIwx+NrEwQXgH4k4BexUgQFXdeP7qo+b14LHZv3vNuZ+ZLYpr2+pgaCQcqtilet61cM1WeoDyBnpbSfkoI8RyDNgz5/6K8wnWdnZ0/jzi+oyUQQvinyZ/eQkd7bBxmViDapYE3Sim/G7wexAGArgl5dsZj+tJMJpMb95MznM4wjDZAWw2iFQD7Y0LpbRq8dZj7iSjDoD1Qhe3ZbNa/SYMlhNjAoOejW+DP47HYzVWBlLUtkUgkGjxPm6XryiOiE7Zt+2X2tTPaIsMwd4JwW8SAsGnSIFXqJDAf+qbex6H5GMAP/zmIT7R48eKLEnXT9gNYVCQkvHJeQPzcLS0tc7R4fC2Y+7x8/o3zBlLe2n8Affj49wLUic4AAAAASUVORK5CYII=)
          no-repeat;
        background-size: 17px 18px;
      }
    }
    .right {
      padding-top: 20px;
      width: 49px;
      height: 41px;
      color: #2e2f30;
      font-size: 12px;
      background: url(data:image/png;base64,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)
        no-repeat top;
      background-size: 20px 18px;
      span {
        font-size: 12px;
        color: #2e2f30;
      }
    }
  }
  .content-box {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 30px 0 0 0;
    width: 100%;
    border-radius: 20px 20px 0 0;
    background-color: #fff;
    box-shadow: 0 6px 11px 0 rgba(222, 220, 195, 0.39);
    .common-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 10px;
      padding-bottom: 29px;
      width: 100%;
      -webkit-backdrop-filter: blur(2px);
      backdrop-filter: blur(2px);
      border-radius: 24px 0 45px 0;
      background-color: #fff;
      box-shadow: 0 11px 19px 0 rgba(151, 195, 206, 0.17);
      .item-box {
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        width: 100%;
        height: 166px;
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          position: relative;
          width: 25%;
          height: 71px;
          img {
            width: 44px;
            height: 44px;
            border-radius: 13px;
          }
          span {
            width: 100%;
            text-align: center;
            font-size: 13px;
            color: #1d2632;
            font-weight: 500;
          }
        }
      }
    }
    .tj-box {
      display: flex;
      align-items: center;
      margin-top: 20px;
      width: 357px;
      height: 96px;
      background: url('./assets/bg2.png');
      background-size: cover;
      .d1 {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        position: relative;
        width: 25%;
        height: 71px;
        width: 79px;
        background: url('./assets/dz.png') no-repeat 50%;
        background-size: 29px 84px;
      }
      .d2 {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        position: relative;
        width: 25%;
        height: 71px;
        width: 79px;
        img {
          width: 44px;
          height: 44px;
          border-radius: 13px;
        }
        span {
          width: 100%;
          text-align: center;
          font-size: 13px;
          color: #1d2632;
          font-weight: 500;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          word-break: break-all;
        }
      }
    }
  }
  .rule-box {
    display: flex;
    position: relative;
    margin: 20px auto;
    padding-left: 40px;
    width: 358px;
    height: 24px;
    color: #2e2f30;
    font-size: 12px;
    line-height: 24px;
    border-radius: 12px;
    background-color: #f6f9fe;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 15px;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      width: 16px;
      height: 16px;
      background: url(data:image/png;base64,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)
        no-repeat 50%;
      background-size: contain;
    }
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 14px;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      width: 6px;
      height: 10px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAAAXNSR0IArs4c6QAAARZJREFUOE+lk79KA0EQxr+53TxA8h65XTvxAYQUFinSqCDYaJtWWy21k1Q2IinS2tnZWTi4aHVyj2AhBKOHeCO3h/Gid5DFqfbP95udmZ0hANS1dhMAHp0bA5Bi3WSFeIsEl15AuHhwbhfA53KAZzDRWm0z80cdRD4kY0YE2vsR0NXsdTpI0zT7DRWAN2PsqQDD7z0B11qrPjPPqtAcKA7j2B6DcDAXCG6y7G0jSZJpxdHio7G1hxAcVcK7jUh6zrmXsi411jVmSKCTyv39u1brT8zPtUCZ08p+LvkZEUXep+Cu1VJrjYDPydodCM4BqBKKeoFA3gz8CQnCnXZ79f9JB5U16ONCWiOs+RbmYZn2Dh6g0BH9Ah8Mjh9VPcQkAAAAAElFTkSuQmCC)
        no-repeat 50%;
      background-size: contain;
    }
  }
  .list-title {
    position: relative;
    padding-left: 14px;
    width: 100%;
    color: #2e2f30;
    font-size: 18px;
    font-weight: 600;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      width: 6px;
      height: 10px;
      background-color: #f0df1e;
    }
  }
  .tab-box {
    display: flex;
    justify-content: space-between;
    margin: 15px auto 0;
    width: 358px;
    height: 24px;
    color: #abaaa3;
    font-size: 12px;
    border-radius: 12px;
    background-color: #f6f9fe;
    .active {
      color: #2e2f30 !important;
    }
    .item {
      padding: 0 16px;
      height: 24px;
      line-height: 24px;
    }
  }
  .list-box {
    display: flex;
    flex-direction: column;
    margin: 15px auto;
    padding: 0 12px;
    width: 358px;
    border-radius: 6px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 hsla(0, 0%, 69%, 0.2);
    .l-header {
      display: flex;
      margin: 10px 0;
      width: 100%;
      img {
        width: 39px;
        height: 39px;
        border-radius: 100%;
      }
      .info {
        flex: 1;
        display: flex;
        justify-content: space-between;
        padding-left: 10px;
        .left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .top {
            display: flex;
            align-items: center;
            font-size: 18px;
            font-weight: 600;
            color: #4c5561;
          }
          .bottom {
            font-size: 12px;
            color: #8e8e93;
          }
        }
        .right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .top {
            font-size: 18px;
            color: #f73;
            font-weight: 600;
          }
          .bottom {
            font-size: 12px;
            color: #8e8e93;
          }
        }
      }
    }
    .l-con {
      font-size: 14px;
      color: #707579;
      span {
        margin-right: 5px;
        color: #73bfb8;
      }
    }
    .l-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 10px auto;
      padding: 0 10px;
      width: 333px;
      height: 52px;
      font-size: 15px;
      background: linear-gradient(179deg, #fffcf7, #fff7ec);
      .tab {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 78px;
        color: #030835;
        font-weight: 500;
        text-align: center;
        flex-wrap: wrap;
        div {
          width: 100%;
          margin-bottom: 5px;
        }
        .text {
          font-size: 10px;
          color: #8e8e93;
        }
      }
      .btn {
        width: 64px;
        height: 29px;
        color: #2e2f30;
        text-align: center;
        line-height: 29px;
        border-radius: 4px;
        background: linear-gradient(152deg, #fff120, #fcdf6b);
      }
    }
  }
}
</style>
