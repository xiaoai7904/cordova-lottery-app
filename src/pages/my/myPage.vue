<template>
  <div class="mine">
    <div class="user-box">
      <div class="head"><img :src="userInfo.avatar" /></div>
      <div class="middle">
        <div class="names">{{ userInfo.username }}</div>
        <span class="gz" @click="gotoByPath('/myFocus')">1<span>关注</span></span>
        <span class="gz" @click="gotoByPath('/myFan')">10<span>粉丝</span></span>
      </div>
      <div class="shop"></div>
      <div class="kefu"></div>
    </div>
    <div class="my-box">
      <div class="card">
        <div class="bannlce">
          <span>{{ userInfo.balance }}</span>
          余额（元）
        </div>
        <div class="cz-btn btn">充值</div>
        <div class="tx-btn btn">提现</div>
      </div>
      <div class="title">我的彩店</div>
      <div class="nav">
        <div class="item mx" @click="gotoByPath('/accoutDetails')"><span>账户明细</span></div>
        <div class="item jl" @click="gotoByPath('/buyLottery')"><span>购彩记录</span></div>
      </div>
    </div>
    <div class="tab-box">
      <div class="info">
        <div class="left">
          <span>客服{{ customerService.code }}：{{ customerService.account }}</span>
          <div>充值/投注/奖金/提现</div>
        </div>
        <div class="right" @click="handleCopy(customerService.account)">复制</div>
      </div>
      <div class="title">其他服务</div>
      <div class="nav">
        <div @click="gotoByPath('/realName')">
          <span>实名认证</span>
        </div>
        <div>
          <span>帮助中心</span>
        </div>
        <div @click="gotoByPath('/setting')">
          <span>设置</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { gotoByPath, useUser, useCopy } from 'src/hook'
import { onMounted } from 'vue';

export default defineComponent({
  setup() {
    const { userInfo, privateUserStore, customerService, getCustomList } = useUser()
    const { handleCopy } = useCopy()
    onMounted(() => {
      getCustomList()
    })
    return {
      gotoByPath,
      userInfo,
      privateUserStore,
      customerService,
      handleCopy
    }
  }
});
</script>
<style scoped lang="scss">
.mine {
  overflow: hidden;
  padding-bottom: 108px;

  .user-box {
    display: flex;
    justify-content: space-between;
    margin: 20px auto;
    width: 358px;
    height: 60px;

    .head {
      width: 60px;
      height: 60px;
      border-radius: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .middle {
      margin-right: auto;
      margin-left: 10px;

      .names {
        color: #1d2632;
        font-size: 18px;
        font-weight: 500;
        line-height: 31px;
      }

      .gz {
        margin-right: 10px;
        color: #1d2632;
        font-size: 14px;
        font-weight: 600;
        line-height: 31px;

        span {
          margin-left: 5px;
          font-size: 14px;
          color: #778b91;
          font-weight: 500;
        }
      }
    }

    .shop {
      margin-right: 5px;
      width: 31px;
      height: 31px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAAXNSR0IArs4c6QAAAX1QTFRFAAAAAAAAAAAAAAAAAAAzADMzACoqJCQkICAgHBw5FSoqFCc7EiQ3IiIzICAwHBwrGygoGyg2GiYzGCQxHScxGyQuGiM1GiIzGSkxHiU1HCIwHiQxHCgzICUwHyQvHyQ0HScxHCYvHCY0HCUzHiYzHSYyHSUxHiUxHiU1GyUzGyUyHSc0HSYzHCUyHCUxHiczHicyHSYyHSYxHCQyHCcyHiYzHiYyHSUxHSczHSYzHiczHicyHSYyHCcyHiYxHSYyHSUyHSczHSczHCUzHiUyHSUyHCcxHSYyHSUxHCYyHSUyHSUyHiYyHSYzHSYyHCYxHCUxHSYyHSYyHSYyHSUyHSUyHScyHCYyHCYyHiYyHScxHSYyHiYxHSYyHSYyHSYxHSYyHSYyHSUyHScyHiYzHiYzHSYyHSYyHSUyHSYyHSYyHCUyHSYzHCYyHCYyHSYyHSYyHSUyHSYyHSYyHCYxHCYyHSYyHSUyHSYyHSYyHSYyHCYyHSYxHSYyHSYyNJTX/gAAAH50Uk5TAAECAwUFBgcICQwNDg8QEhMTFBUaHB0eHyIlKi0wMTE0NjY3PD0+RERLTE9QUlNVVldYW1xfZWhpam9wcXV4ent9g4iJj5GVlpqdnqOmp6qrra62uLm5vL2+v8HEx8jKysvNzc7P0dLT1t3h4+nq7O7v8PHz9PT19/n6+/3+BAQL7gAAActJREFUOMul1ftTElEYxvHHJcRSMi+ZWRma3QsvZVrkJUMzxNIUUSst0UoqUcmCLt+/vR9csgbYd2d6fjo78zmz55z3XCQ3wVDVBPV3nP7UPh7ZT/U7Jdu8gpmV5kNbl8FHMnWSpAlga6A7UjXdA1vAhCSFdmEpIM8ElmA3JKkH6JCRDqBH0hBkZSYLQ5LisGjjRYhLmoNpG0/DnKQNGLHxCGxI2oOojaOwJzUCnTbuBBoVAcI2DgMR9UFOPpKDPo3Cuh+8DqOahHk/+AVMKg5pPzgNj3UXiu22bS/CHZ08gM02y7ZtwkFYGgcKCzMJj8wsFIBxSYEkvpI83PMJPzbhDigGOwnP7EDsCL/xnt/b/8W1jn98++unC5JaZp+dNvHFb/Bcqn1VfijLcMtHYEx6CqQMfOwlkA7oPpA/Z+AnQPaUrnyHnzeNCV4CvpzXmc/AI2s1LsOvqI5ngPkac+kevL4nzQIfTvgrykMgd9a7KMPwrnT7/bhWqYLvYdht3oBik3uhxSrZpiJcd9v1BUjWSHJuXa1knSQU6ktfU8Bqb1flR6KrdxWY+tO1Yds6J9sNRz9qXfO2a63/DGtwOV9N5pcHy/d50HyMfwPBhzkDUte3CAAAAABJRU5ErkJggg==) no-repeat top;
      background-size: 22px 22px;
    }

    .kefu {
      position: relative;
      width: 31px;
      height: 31px;
      background: url(data:image/png;base64,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) no-repeat top;
      background-size: 22px 22px;
    }
  }

  .my-box {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 0 8px;
    width: 376px;
    height: 251px;
    background: url('./assets/bg.png') no-repeat 50%;
    background-size: contain;

    .card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      width: 100%;
      height: 91px;

      .bannlce {
        color: #fff;
        font-size: 12px;

        span {
          margin-right: 5px;
          font-size: 20px;
        }
      }

      .btn {
        width: 66px;
        height: 31px;
        font-size: 14px;
        text-align: center;
        line-height: 31px;
        border-radius: 4px;
      }

      .cz-btn {
        margin-left: auto;
        margin-right: 10px;
        color: #fff853;
        background-color: hsla(0, 0%, 100%, 0.51);
      }

      .tx-btn {
        color: #2e2f30;
        background: linear-gradient(127deg, #fff120, #fcdf6b);
      }
    }

    .title {
      padding: 15px;
      width: 100%;
      color: #48484b;
      font-size: 16px;
      font-weight: 500;
    }

    .nav {
      display: flex;
      width: 100%;

      .item {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        width: 89px;
        height: 62px;
        color: #48484b;
        font-size: 14px;
      }

      .mx {
        background: url(data:image/png;base64,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) no-repeat 50% 10px;
        background-size: 33px 24px;
      }

      .jl {
        background: url(data:image/png;base64,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) no-repeat 50% 10px;
        background-size: 28px 24px;
      }
    }
  }

  .tab-box {
    margin: 0 auto;
    padding-top: 5px;
    width: 358px;
    height: 234px;
    border-radius: 0 0 6px 6px;
    background: url('./assets/tab.png') no-repeat;
    background-size: 358px 92px;
    background-color: hsla(0, 0%, 100%, 0.96);
    box-shadow: 0 5px 9px 0 rgba(239, 236, 236, 0.71);

    .info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 14px;
      width: 358px;
      height: 87px;

      .left {
        color: #2e2f30;
        font-size: 14px;
        font-weight: 500;
        line-height: 22px;

        div {
          color: #abaaa3;
          font-size: 12px;
        }
      }

      .right {
        width: 60px;
        height: 29px;
        color: #2e2f30;
        font-size: 14px;
        text-align: center;
        line-height: 29px;
        border-radius: 14px;
        background-color: rgba(255, 247, 236, 0.71);
      }
    }

    .title {
      padding: 15px;
      width: 100%;
      color: #48484b;
      font-size: 16px;
      font-weight: 500;
    }

    .nav {
      display: flex;
      width: 100%;

      div {
        position: relative;
        padding-top: 36px;
        width: 89px;
        height: 67px;
        color: #48484b;
        font-size: 14px;
        text-align: center;
      }

      div:nth-child(1)::before {
        content: '';
        position: absolute;
        top: 10px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        width: 16px;
        height: 18px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAkCAMAAADfNcjQAAAAAXNSR0IArs4c6QAAAexQTFRFAAAAAAAAAAAAgICAVVVVQEBAMzMzVVVVQEBgTU1NRkZGVVVVTk5OSUlJREREQEBQS0tLVVVVQ0NDQ0NRQEBNSUlJRkZRTk5OR0dHQkJMSUlJRkZGRkZNTU1NQ0NLSUlJR0dOSkpKSEhIRkZNRERLS0tLSUlJR0dNRUVKSUlJSUlOR0dMSkpKSUlJRkZLSUlORkZKSkpKSEhMTU1RSEhMR0dLR0dKRkZJSEhMSEhLR0dKSEhMR0dKSEhLSEhNSUlMSEhLSEhKSEhLR0dKSEhKSEhLSUlLSEhKR0dKTU1SSUlLSEhKR0dLR0dLSUlLSEhMR0dLSUlLR0dLTU1RSEhMSUlKSUlLSEhMSEhLSUlLSUlKR0dLR0dLSUlLR0dLSUlLSEhLSEhMSUlMSEhLSEhLSEhLSEhLSEhLSEhLSEhKSEhLSUlMSEhLTk5STU1RSEhKSEhMSEhLSEhMR0dLSUlLSEhLSEhLSEhKTk5RSEhLSEhLR0dLSEhLSEhLSEhKTk5SR0dLSUlLSEhKSEhLR0dLSEhLSUlLSEhLSEhMSEhLSEhLSEhLSEhLSEhLSEhLSEhKR0dLSEhKSEhLSEhLSEhKSEhLSEhLSEhLSEhLTk5RSEhLSEhLSEhLSEhLSEhLR0dKSEhLTk5RSEhLTk5R3w7fygAAAKJ0Uk5TAAECAgMEBQYICgsMDQ4PEBESExMUFRYXGRscHSEhIiMkJicoKSkqKzAxMTI0ODo7Pj5AQkNESElKTk9RU1hZXl9gY2Rnam1ub3B7fH1+foCBgoSEh4mMjY6PkJaamp2dn6Klpqmqq66xsrW2t7i8vb2/wMHBwsbHx8nLzMzNzs7P09XV1tfa29vc3d7g5OXm6Onq6/Dx8vT19/j5+/z9/v7+msP1XgAAAYRJREFUGBl9wYdfjHEAx/FvVzrihMjMSFJJKJEZpWwtytbpOHtmlhXaIUrR8Pj0j/Kq7nl+v6u791uehMILr78M9zw5sUmzKn7LNOfmes3gO+fgGdqvaE2A86hyZ35J9WdgvFy2U8DHAk3yHR6EkR0yZY1Cc0AR2d+gI1mGMPQukWfbGFTIkzYKB2W6Ci3yHIJ+n0w54KySqx6Csn2F3XI1QY1sz6FMrjCclu0pHJHrClyWrQf2yFUJXbKsATbKlQkUylQL7TK8gFa/PGuHoEqGXUCjTxGLPsCPhTJdB26na8qWdqBUlpRW4Of57UvnrNwXGgcaFCX1MYY/1QmK5m/G9alEM5R2M23gxoEkRVtxF/h972hx3oaAZpHZC4MnA4pl3Xe4s0wxLWiDhkTFdgmuKY7cMV75FUcIZ6ssuW+6JnWGkiUtHyEs21kisiSVwV7ZVgdvTTmj/xoZnqd43vNMlrmLDfOlPoIyFf2aMPw9rgEuylQ3YbmvYw83y5Tx4J3hZdE/W6W/XPTlmcAAAAAASUVORK5CYII=) no-repeat 50%;
        background-size: 16px 18px;
      }

      div:nth-child(2)::before {
        content: '';
        position: absolute;
        top: 10px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        width: 18px;
        height: 18px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAkCAMAAADSK7iXAAAAAXNSR0IArs4c6QAAArVQTFRFAAAAAAAAAAAAVVVVQEBAMzMzVVVVSUlJQEBATU1NRkZGQEBATk5OSUlJRERERERVVVVVQEBAQEBQR0dHQ0NDUVFRTU1NRkZGQ0NOTk5OSkpKR0dHRUVOTk5OSUlJRkZGRERMSkpKTU1VS0tSR0dHRUVMSkpKSEhISEhOR0dNRkZLT09PR0dMUVFRRUVKSkpKSUlJTk5TR0dMSkpKTExMRkZKSUlJRkZLS0tLT09USEhMR0dLT09USEhMR0dLSEhMR0dLT09PTk5RSEhLR0dKSUlNSEhMT09TSUlMTExPSEhLSEhMT09STk5RR0dNSUlMT09SSEhLT09STk5RSEhLT09RSEhKUFBSSkpMSUlLSEhLTU1QR0dKR0dMSkpMSUlLSEhKSEhNT09RTk5QSUlLSEhKSUlLSEhKTk5SSEhKTExRTU1SSUlLR0dLTk5SSUlLR0dLTk5SSUlLSEhMTU1RSEhMSEhLSEhKSEhMSUlKSUlMSEhLT09SSUlLSEhLSEhLTk5QR0dLSEhLSUlMT09SSEhMTU1QT09SSEhLSEhLTk5RSUlMTU1SSEhLSUlMSEhLTk5RSEhLSEhLSEhLSEhLSEhKSEhMSUlLSEhLSEhLSEhLTk5RSEhLSEhKTk5RSUlLSEhLTk5RSEhLTk5SSEhLT09RSEhMTk5RTk5RSEhLSEhLSEhMTk5QR0dLSEhLTk5RSUlLT09RSEhKSEhLR0dLSEhLSEhLR0dLTk5RSEhLSEhLR0dLSEhLSEhLR0dLSEhKSEhMSEhLSEhLTU1RTk5RSEhLSEhLSUlLSEhKSEhMSEhLTk5RSEhLTk5RSEhKSEhLSEhLTU1QSEhLSEhLSEhMSEhLTU1QSEhLSEhLTk5RSEhLTk5RSEhLR0dKTk5RSEhLSEhLTk5RSEhLTk5RSEhLSEhLTk5RAnFtSAAAAOV0Uk5TAAECAwQFBgcICgsMDQ4PDw8QEBITExQWFxcYGRoaHB0eHyEiJCUmJycrLC0vLzAwMTEyNDY3ODo6Ojw9PUBBQ0RERUdISUpKTU1OUVFSU1RUWFpbXF5gYGFiY2NkZGhtbm5ub3Bxc3V2eHh6e319foGDhYeHiouNjZCQkpKWmJmZmpyeoaKlpaanp6ioqayusLG0tbi5ubq7vL6+v8DAwcPExcXGxsfHyszNzs7P0NLT09XV1tfZ2trc3d7e4OHi4uPk5OTm5+jp6evr7Ozt8PHx8vPz9PT19vb4+Pn6+vv8/P39/lX7V8QAAAJZSURBVBgZdcGHQ4xxAAbg9+hKNBBKRKHslT0ayl7JdmZGZtkSCtmrbDLPntnZicxSZKQrqZx7f3+Hu+777r67rueBkqr3srQHuUV5T46sClejBl7Ls2iVt8EfDqgXf6dJ5ccX78toUpboDntBd0jqz8Z0cgFQO0hz6A/JN/1hK6yQ1O9oC6tmCaVkhQZKQ0rJV31hK+gGaZgNqx5F5EUf2HM9QOqjIGvwkjzuDAeSyMJASJLJxw3hiFM6eR5mXfUsbgeJ04SdF67tn+QMM6/XZDSqpJJxkLS+L6rc9oPZWPKeCkbNK5lfD2ZuT4U4vWbLOyGuq2B2iwyFUSy5FpJFQsQDcLsrRATMppIpMDpGBkNyRRTUgdF0IZbCzL2M2QBUP5mnguSzOAeTEUKshERLBgD+5EnIOndvBZNNQkyBZCMZCfQht8JORLkocINkAakBIsl1sDX6t/g7HrJp5HwgnEyAjWHlomQMLGaSc4Be5DYo+X0TvwbCaiE5GfAhtVCKF2IuFDaTIQDy+UMNhYNC1IdCBg3eANLIECjE790OBV89M2E0g0xBzWLJ9TDy1FHnCwvPS//e9oOFOovsApMkMhkWHYUQS2ARQ55BlQAd9WGQNS4RYhxkgV9pCIFZHPmlDWSDds2DzCOT3A2J+ir5yBfVuR4lsxtB1jKHzA6GvRY3yaKesOrwiSyeVQs2hn8gdYOhFPiMZEaUE2Sq0BMk8wfAlsc+GuWmTOzmXbdJ+6jE5zTS+qOaoQ9pK0ejggOqUYcrKDNoNS6oicfIFXvSL59KXR3dFDb+A+qcQlA9TirPAAAAAElFTkSuQmCC) no-repeat 50%;
        background-size: 18px 18px;
      }

      div:nth-child(3)::before {
        content: '';
        position: absolute;
        top: 10px;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        width: 17px;
        height: 18px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAkCAMAAADbwBjtAAAAAXNSR0IArs4c6QAAAnNQTFRFAAAAAAAAAAAAgICAVVVVMzMzKipVVVVVSUlJQEBATU1NRkZGVVVVREREUFBQS0tLQ0NDTU1NRkZGUVFRQ0NOTk5OSkpKR0dSRUVFRUVOSEhIUFBQTU1VQ0NLSUlJRUVMSEhITk5OS0tRSUlJT09PT09VRkZLRERKSkpKTk5TR0dMRkZLS0tLUFBQSkpKR0dMTU1STExRRUVJTExRTk5OSUlNTExQUFBUSUlNTU1RTExQSEhLT09TTk5RTU1QT09TTk5SSkpKSkpNSUlMT09PTk5SR0dKTU1QSEhMT09SSEhLTk5RR0dKSkpKSkpNR0dKSkpNTk5RTU1QSUlLSEhLR0dMSEhLSUlLSEhLTU1ST09SSUlLSUlLSEhKSUlLSEhKSEhMTk5QT09RSEhMR0dLTk5SSEhKR0dLSUlLTk5QSEhMR0dLT09RSEhMSEhLSUlLSEhMTU1RSEhKSEhLR0dLTk5RTk5SSEhKSEhMSEhLSUlKSEhLTk5RSEhLSEhLSUlMSEhLSEhLSEhLSEhLTk5RTk5RT09STk5RTU1QTk5RSEhLTk5RSEhLSEhKTk5RSEhLT09RTk5RTk5STU1RTk5RTk5RSEhLT09RSEhLTk5QR0dLTk5RTk5RSUlLSEhLR0dLSEhKTk5RSEhLTk5RR0dLSEhLTk5STk5RTk5RSEhKSEhMSEhLSEhLTk5RSEhLTk5RSEhKSEhLSEhLR0dLSEhLTk5RSEhKSEhLTk5RSEhLSEhLTk5RSEhLSEhLTk5RSEhLSEhLTk5RSEhLTk5RSEhLTk5RR0dKSEhKSEhLTk5QTk5RSEhLSEhLSEhLTk5RSEhLTk5Rxl0rdwAAAM90Uk5TAAECAgMFBgYHCAoLDA8QERMUFhYXFxgZGhogICEiIyUnJykqKiosLS0uMjMzMzQ2ODk7PD4/QEBCQkZHR0hJSktMTE1NTk9QUVFSUlNTU1paW2BiY2RmaWpqanB0dXd5eXl7fH19f4GBgoOEi42Oj5GRlJWWl5mbm5yen6Omp6ipqqutrrGytLW3uLq7vb2+v8DBw8PExcnNzs/P0dPV1tjY2dna29vd3+Li4+Tk5efp6uvs7u7w8PDx8vLz9fX29/f4+Pn5+vr7+/v8/f7+fYhr+wAAAhxJREFUOMuFlPdfzXEUxh/cmysjQsh27b33iMgme5VNMrNJZIbsTWREZhnZ6xYi1O15/iQ/fMe9+t7L+e2cz/v1Wc9zDhAc0dPTH3/OWdcM4aLRrnKSJItTIkMCNZPf045HiSGIhHySvLm6b9fkApK83LMK0PEkSb6c7wKA2muLSVakxwQB9bf+JFmWFmUVYg/6SX5Y7LEK016RZLY3eNsBOSSZ383IVvpJ3ouvcnSNuS9IlkwFgAQ/+TYpwvmAuhtKyU9ewPOUzI21ynV6xw1saEO9npNngClkSUuz1P/od0mVV2ZUNwvDSLbGJnKfkbu3V8qMs41NJpechf3kUuN+RyTp3f1CSbrbwED2kitwiFwEAFgl6cYIF9A+S9JxA9lNpthIky9SVi1jIVVSnBNZLhXav3tCOuZEzkup9muHSD63A3kmDbIR92+phQN5LfUI/OxDqbkDuSNNDiCjLixz3iVDOuzU6S9krKSRwav1HEi1a5JvIgCg7eYFaHqVt1qZSKYlQBefpEsLx83M+Cb120Yy0xRgoy3j0I+WivrV4QDJU6aMEwJmaHfOJB4Mx+BSlk8yzeApCLJUn/Wnr1/cMd4FoM3szpalMLoirDF/GMYElvhJ5o35h72BhKKwTdLdyqPSyv7TagC82SRZNC+4YffEVDk7Po8kc+d0Ctf2ACKS3gSGx5PE0CMoeqc1gtZEhp1T3i23vzoG2R/4C2k9+R2KiQAAAABJRU5ErkJggg==) no-repeat 50%;
        background-size: 17px 18px;
      }
    }
  }
}
</style>
