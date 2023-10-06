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
              <div>
                {{ slotProps }}
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
              <div>
                {{ slotProps }}
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
              <div>
                {{ slotProps }}
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

export default defineComponent({
  components: { PageList, TimeFilter },
  setup() {
    const pageListRef0 = ref<PageListRefType | null>(null);
    const pageListRef1 = ref<PageListRefType | null>(null);
    const pageListRef2 = ref<PageListRefType | null>(null);

    const active = ref(0);
    const navTabs = ref(['账户明细', '充值记录', '提款记录'])
    const { privateRecordStore, getAccountDetailsList, loadAccountDetailsList, getRechargeList, loadRechargeList, getWithdrawList, loadWithdrawList } = useRecord();

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
    return { pageListRef0, pageListRef1, pageListRef2, active, navTabs, privateRecordStore, getAccountDetailsList, loadAccountDetailsList, getRechargeList, loadRechargeList, getWithdrawList, loadWithdrawList, accountDetailsTimeChange, rechargeTimeChange, withdrawTimeChange }
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
}
</style>