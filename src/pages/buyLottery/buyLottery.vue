<template>
    <div class="account-details">
        <Headers title="购彩记录" />
        <div class="account-details-content">
            <van-tabs v-model:active="active" sticky swipeable lazy-render offset-top="44px">
                <van-tab title="我的订单" :name="0">
                    <div>
                        <TimeFilter @change="accountDetailsTimeChange" />
                        <span class="win">中奖金额: 0.00</span>
                        <PageList ref="pageListRef0" :requestApi="getOrderList" :list="privateRecordStore.order.list"
                            :total="privateRecordStore.order.total" :pages=privateRecordStore.order.pages
                            :requestParams="{ type: 1 }" v-model:current="privateRecordStore.order.pageNum"
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
                                                <span>{{ item.resultAmount }}</span>
                                                <div class="van-cell__label label">
                                                    <span
                                                        :class="{ 'success': item.status === 1, 'fail': item.status === 2 }">
                                                        {{
                                                            orderStatusMap[item.status]
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
                <van-tab title="我的发单" :name="1">
                    <div>
                        <TimeFilter @change="rechargeTimeChange" />
                        <span class="win">中奖金额: 0.00</span>
                        <PageList ref="pageListRef1" :requestApi="getFollowList" :list="privateRecordStore.follow.list"
                            :total="privateRecordStore.follow.total" :pages=privateRecordStore.follow.pages
                            v-model:current="privateRecordStore.follow.pageNum" v-slot="slotProps">
                            <div class="send-order">
                                <div v-for="(item, index) in slotProps.list" class="send-order-item" :key="index">
                                    <div class="flex justify-between items-center">
                                        <span class="label">名称</span>
                                        <span class="value">{{ item.cname }}</span>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="label">自购金额</span>
                                        <span class="value">{{ item.tmoney }}</span>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="label">中奖金额</span>
                                        <span class="value">{{ item.resultAmount }}</span>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="label">佣金</span>
                                        <span class="value">{{ item.commission }}</span>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="label">起投金额</span>
                                        <span class="value">{{ item.startAmount }}</span>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="label">预期最高回报率</span>
                                        <span class="value">{{ item.rate }}%</span>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="label">跟单人数</span>
                                        <span class="value">{{ item.followUsers }}</span>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="label">下单内容</span>
                                        <span class="value">{{ item.codes }}</span>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="label">跟单截止时间</span>
                                        <span class="value">{{ item.cdate }}</span>
                                    </div>
                                </div>
                            </div>
                        </PageList>
                    </div>
                </van-tab>
                <van-tab title="我的跟单" :name="2">
                    <div>
                        <TimeFilter @change="withdrawTimeChange" />
                        <span class="win">中奖金额: 0.00</span>
                        <PageList ref="pageListRef2" :requestApi="getOrderList" :list="privateRecordStore.order.list"
                            :total="privateRecordStore.order.total" :pages=privateRecordStore.order.pages
                            :requestParams="{ type: 2 }" v-model:current="privateRecordStore.order.pageNum"
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
                                                <span>{{ item.resultAmount }}</span>
                                                <div class="van-cell__label label">
                                                    <span
                                                        :class="{ 'success': item.status === 1, 'fail': item.status === 2 }">
                                                        {{
                                                            orderStatusMap[item.status]
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
import TimeFilter from 'src/components/TimeFilter/TimeFilter.vue';

import { watch } from 'vue';

export type PageListRefType = {
    resetStore: () => void;
    refreshList: () => void;
};

const orderStatusMap: Record<number, string> = {
    1: '下注',
    2: '中奖',
    3: '失败'
}

const withdrawStatusMap: Record<number, string> = {
    1: '待处理',
    2: '审核通过',
    3: '审核失败'
}

export default defineComponent({
    components: { TimeFilter },
    setup() {
        const pageListRef0 = ref<PageListRefType | null>(null);
        const pageListRef1 = ref<PageListRefType | null>(null);
        const pageListRef2 = ref<PageListRefType | null>(null);

        const active = ref(0);
        const { privateRecordStore, getOrderList, getFollowList } = useRecord();

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
        return { pageListRef0, pageListRef1, pageListRef2, orderStatusMap, withdrawStatusMap, active, privateRecordStore, getOrderList, getFollowList, accountDetailsTimeChange, rechargeTimeChange, withdrawTimeChange }
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

    .label {
        font-size: 14px;
        color: $title;
    }

    .value {
        font-size: 14px;
        color: $title;
        font-weight: 500;
    }

    .win {
        font-size: 12px;
        color: #8e8e93;
        padding-left: 15px;
        position: relative;
        top: -10px;
    }

    .send-order {
        padding: 0 15px;
    }

    .send-order-item {
        border-radius: 8px;
        background-color: #fff;
        margin-bottom: 10px;
        padding: 15px;

        >div {
            margin-bottom: 15px;
        }

        >div:last-child {
            margin-bottom: 0;
        }
    }
}
</style>