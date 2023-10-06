<template>
  <div class="account-details">
    <Headers title="账户明细" />
    <div class="account-details-content">
      <van-tabs v-model:active="active" sticky swipeable lazy-render offset-top="44px">
        <van-tab v-for="(item, index) in navTabs" :title="item" :key="index" :name="index">
          <div>
            <!-- <div v-if="active === 0">
              <PageList scrollTarget="body" :pullRefreshDisable="true" :request-api="getAccountDetailsList"
                :request-params="{}" :pageList="privateRecordStore.accountDetails.list"
                :pageInfo="privateRecordStore.accountDetails" @load="loadAccountDetailsList" v-slot="slotProps">
                <div :key="slotProps.index">
                  <div class="Price">
                    <p>1</p>
                    <p>Price</p>
                  </div>
                  <div class="Profit">
                    <p>2</p>
                    <p>Profit</p>
                  </div>
                  <div class="Time">
                    <p>
                    </p>
                    <p>Time</p>
                  </div>
                </div>
              </PageList>
            </div>

            <div v-if="active === 1">
              <PageList scrollTarget="body" :pullRefreshDisable="true" :request-api="getRechargeList" :request-params="{}"
                :pageList="privateRecordStore.recharge.list" :pageInfo="privateRecordStore.recharge"
                @load="loadRechargeList" v-slot="slotProps">
                <div :key="slotProps.index">
                  <div class="Price">
                    <p>1</p>
                    <p>Price</p>
                  </div>
                  <div class="Profit">
                    <p>2</p>
                    <p>Profit</p>
                  </div>
                  <div class="Time">
                    <p>
                    </p>
                    <p>Time</p>
                  </div>
                </div>
              </PageList>
            </div> -->

            <div v-if="active === 0">
              <PageList ref="pageListRef0" :requestApi="getAccountDetailsList"
                :list="privateRecordStore.accountDetails.list" :total="privateRecordStore.accountDetails.total"
                :pages=privateRecordStore.accountDetails.pages v-model:current="privateRecordStore.accountDetails.pageNum"
                v-slot="slotProps">
                <div>
                  {{ slotProps }}
                </div>
              </PageList>
            </div>

            <div v-if="active === 1">
              <PageList ref="pageListRef1" :requestApi="getRechargeList" :list="privateRecordStore.recharge.list"
                :total="privateRecordStore.recharge.total" :pages=privateRecordStore.recharge.pages
                v-model:current="privateRecordStore.recharge.pageNum" v-slot="slotProps">
                <div>
                  {{ slotProps }}
                </div>
              </PageList>
            </div>

            <div v-if="active === 2">
              <PageList ref="pageListRef2" :requestApi="getWithdrawList" :list="privateRecordStore.withdraw.list"
                :total="privateRecordStore.withdraw.total" :pages=privateRecordStore.withdraw.pages
                v-model:current="privateRecordStore.withdraw.pageNum" v-slot="slotProps">
                <div>
                  {{ slotProps }}
                </div>
              </PageList>
            </div>
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
import { watch } from 'vue';

export type PageListRefType = {
  resetStore: () => void;
  refreshList: () => void;
};

export default defineComponent({
  components: { PageList },
  setup() {
    const pageListRef0 = ref<PageListRefType | null>(null);
    const pageListRef1 = ref<PageListRefType | null>(null);
    const pageListRef2 = ref<PageListRefType | null>(null);

    const active = ref(0);
    const navTabs = ref(['账户明细', '充值记录', '提款记录'])
    const { privateRecordStore, getAccountDetailsList, loadAccountDetailsList, getRechargeList, loadRechargeList, getWithdrawList, loadWithdrawList } = useRecord();

    const resetLoad = () => {
      const load = [
        () => {
          // loadAccountDetailsList(1)
          // getAccountDetailsList();
          setTimeout(() => {
            pageListRef0.value?.refreshList();
          }, 300);
        },
        () => {
          // loadRechargeList(1)
          // getRechargeList();
          setTimeout(() => {
            pageListRef1.value?.refreshList();
          }, 300);
        },
        () => {
          // loadWithdrawList(1)
          // getWithdrawList();
          setTimeout(() => {
            pageListRef2.value?.refreshList();
          }, 300);
        }
      ]

      load[active.value]()
    }

    watch(() => active.value, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        resetLoad()
      }
    }, {
      immediate: true
    })

    return { pageListRef0, pageListRef1, pageListRef2, active, navTabs, privateRecordStore, getAccountDetailsList, loadAccountDetailsList, getRechargeList, loadRechargeList, getWithdrawList, loadWithdrawList }
  }
})
</script>

<style scoped lang="scss">
.account-details {
  &-content {
    padding-top: 44px;
  }
}
</style>