<template>
    <div class="my-focus">
        <Headers title="我的关注" />
        <div class="my-focus-content">
            <PageList ref="pageListRef" isInit :requestApi="getMyFocusList" :list="privateRecordStore.myfocus.list"
                :total="privateRecordStore.myfocus.total" :pages=privateRecordStore.myfocus.pages
                v-model:current="privateRecordStore.myfocus.pageNum" v-slot="slotProps">
                <div class="my-focus-list">
                    <div class="item flex justify-start items-center" v-for="(item, index) in slotProps.list" :key="index">
                        <img class="icon" src="https://picsum.photos/200" alt="">
                        <div class="center">
                            <h2 class="title">{{ item.nikeName }}</h2>
                            <p>
                                <span>盈利率</span>
                                <span class="amount">{{ item.profit }}%</span>

                                <span>中奖金额</span>
                                <span class="amount">{{ item.winAmount }}元</span>
                            </p>
                        </div>
                        <van-button round size="mini" @click="cancel">取消关注</van-button>
                    </div>

                </div>
            </PageList>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRecord } from 'src/hook';

export default defineComponent({
    setup() {
        const pageListRef = ref<any>(null);
        const { privateRecordStore, getMyFocusList, cancelFocus } = useRecord();
        const cancel = async (item: any) => {
            await cancelFocus({
                focusId: item.uid
            })
            pageListRef.value?.refreshList?.();
        }
        return { pageListRef, privateRecordStore, getMyFocusList, cancel }
    }
})
</script>

<style scoped lang="scss">
.my-focus {
    background-color: #fff;
    min-height: 100vh;

    &-content {
        padding-top: 44px;
    }

    &-list {
        font-size: 12px;
        padding: 15px;

        .item {
            background: #fff;
            padding-bottom: 15px;

            &:after {
                content: "";
                width: 100%;
                height: 1px;
                background: #ebedf0;
                margin: 10px auto 0 auto;
            }
        }

        .icon {
            width: 38px;
            height: 38px;
            border-radius: 50%;
        }

        .title {
            font-size: 16px;
            font-weight: 500;
            color: $title;
            margin-bottom: 10px;
        }

        .amount {
            color: #f73;
            margin-right: 8px;
        }

        p {
            color: #909399;
        }

        .center {
            margin: 0 10px;
            flex: 1;
        }

        :deep(.van-button--mini) {
            padding: 1px 8px;
        }
    }
}
</style>