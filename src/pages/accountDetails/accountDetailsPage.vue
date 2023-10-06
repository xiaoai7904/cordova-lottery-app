<template>
  <div class="account-details">
    <Headers title="账户明细" />
    <div class="account-details-content">
      <van-tabs v-model:active="active" sticky swipeable lazy-render offset-top="44px">
        <van-tab title="账户明细" :name="0">
          <div>
            <TimeFilter @change="accountDetailsTimeChange" />
            <PageList ref="pageListRef0" :requestApi="getAccountDetailsList"
              :list="privateRecordStore.accountDetails.list" :total="privateRecordStore.accountDetails.total"
              :pages=privateRecordStore.accountDetails.pages v-model:current="privateRecordStore.accountDetails.pageNum"
              v-slot="slotProps">
              <div class="account-details-list">
                <van-cell-group>
                  <van-cell v-for="(item, index) in slotProps.list" :key="index" :title="item.orderNo"
                    :label="item.reviewTime">
                    <template #value>
                      <div>
                        <p class="amount">
                          {{ item.amount }}
                        </p>
                        <!-- <span>--</span> -->
                        <div class="van-cell__label label">
                          <span :class="{ 'success': item.status === 2, 'fail': item.status === 3 }">
                            {{ item.type === 1 ?
                              rechargeStatusMap[item.status] :
                              withdrawStatusMap[item.status]
                            }}
                          </span>
                        </div>
                      </div>
                    </template>
                  </van-cell>
                </van-cell-group>
              </div>
            </PageList>
          </div>
        </van-tab>
        <van-tab title="充值记录" :name="1">
          <div>
            <TimeFilter @change="rechargeTimeChange" />
            <PageList ref="pageListRef1" :requestApi="getRechargeList" :list="privateRecordStore.recharge.list"
              :total="privateRecordStore.recharge.total" :pages=privateRecordStore.recharge.pages
              v-model:current="privateRecordStore.recharge.pageNum" v-slot="slotProps">
              <div class="account-details-list">
                <van-cell-group>
                  <van-cell v-for="(item, index) in slotProps.list" :key="index" :title="item.orderNo"
                    :label="item.reviewTime">
                    <template #value>
                      <div>
                        <p class="amount">
                          {{ item.amount }}
                        </p>
                        <!-- <span>--</span> -->
                        <div class="van-cell__label label">
                          <span :class="{ 'success': item.status === 2, 'fail': item.status === 3 }">
                            {{ rechargeStatusMap[item.status]
                            }}
                          </span>
                        </div>
                      </div>
                    </template>
                  </van-cell>
                </van-cell-group>
              </div>
            </PageList>
          </div>
        </van-tab>
        <van-tab title="提款记录" :name="2">
          <div>
            <TimeFilter @change="withdrawTimeChange" />
            <PageList ref="pageListRef2" :requestApi="getWithdrawList" :list="privateRecordStore.withdraw.list"
              :total="privateRecordStore.withdraw.total" :pages=privateRecordStore.withdraw.pages
              v-model:current="privateRecordStore.withdraw.pageNum" v-slot="slotProps">
              <div class="account-details-list">
                <van-cell-group>
                  <van-cell v-for="(item, index) in slotProps.list" :key="index" :title="item.orderNo"
                    :label="item.reviewTime">
                    <template #value>
                      <div>
                        <p class="amount">
                          {{ item.amount }}
                        </p>
                        <!-- <span>--</span> -->
                        <div class="van-cell__label label">
                          <span :class="{ 'success': item.status === 2, 'fail': item.status === 3 }">
                            {{ withdrawStatusMap[item.status]
                            }}
                          </span>
                        </div>
                      </div>
                    </template>
                  </van-cell>
                </van-cell-group>
              </div>
            </PageList>
          </div>
        </van-tab>
      </van-tabs>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRecord } from 'src/hook';
import PageList from 'src/components/PageList/PageList.vue';
import TimeFilter from 'src/components/TimeFilter/TimeFilter.vue';

import { watch } from 'vue';

export type PageListRefType = {
  resetStore: () => void;
  refreshList: () => void;
};

const rechargeStatusMap: Record<number, string> = {
  1: '下单成功',
  2: '充值成功',
  3: '充值失败'
}

const withdrawStatusMap: Record<number, string> = {
  1: '待处理',
  2: '审核通过',
  3: '审核失败'
}

export default defineComponent({
  components: { PageList, TimeFilter },
  setup() {
    const pageListRef0 = ref<PageListRefType | null>(null);
    const pageListRef1 = ref<PageListRefType | null>(null);
    const pageListRef2 = ref<PageListRefType | null>(null);

    const active = ref(0);
    const { privateRecordStore, getAccountDetailsList, getRechargeList, getWithdrawList } = useRecord();

    const resetLoad = (value: number) => {
      const load = [
        () => {
          setTimeout(() => {
            pageListRef0?.value?.refreshList?.();
          }, 300);
        },
        () => {
          setTimeout(() => {
            pageListRef1?.value?.refreshList?.();
          }, 300);
        },
        () => {
          setTimeout(() => {
            pageListRef2?.value?.refreshList?.();
          }, 300);
        }
      ]

      load[value]()
    }

    watch(() => active.value, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        resetLoad(newValue)
      }
    }, {
      immediate: true
    })


    const accountDetailsTimeChange = (data: any) => {
      privateRecordStore.accountDetails.beginTime = data[0]
      privateRecordStore.accountDetails.endTime = data[1]
      resetLoad(0)
    }

    const rechargeTimeChange = (data: any) => {
      privateRecordStore.recharge.beginTime = data[0]
      privateRecordStore.recharge.endTime = data[1]
      resetLoad(1)
    }

    const withdrawTimeChange = (data: any) => {
      privateRecordStore.withdraw.beginTime = data[0]
      privateRecordStore.withdraw.endTime = data[1]
      resetLoad(2)
    }
    return { pageListRef0, pageListRef1, pageListRef2, rechargeStatusMap, withdrawStatusMap, active, privateRecordStore, getAccountDetailsList, getRechargeList, getWithdrawList, accountDetailsTimeChange, rechargeTimeChange, withdrawTimeChange }
  }
})
</script>

<style scoped lang="scss">
.account-details {
  &-content {
    padding-top: 44px;
  }

  :deep(.van-tabs__wrap) {
    box-shadow: 0 2px 4px 0 hsla(0, 0%, 92.9%, .5);
  }

  &-list {
    background-color: #fff;
    padding: 5px;
    border-radius: 8px;

    .amount {
      font-weight: 500;
      color: $title;
    }

    .van-cell__title {
      >span {
        display: inline-block;
        font-family: Inter V-Semi Bold, Inter V;
        font-size: 18px;
        margin-bottom: 8px;
      }
    }

    .van-cell__value {
      width: 140px;
      flex: none;
      font-size: 12px;
    }

    [class*="van-hairline"]:after {
      border: none;
    }
  }

  .success {
    color: var(--van-button-success-background);
  }

  .fail {
    color: var(--van-button-danger-background);
  }
}
</style>