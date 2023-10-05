<template>
    <div class="setting">
        <Headers title="我的银行卡" />
        <div class="setting-content">
            <div v-if="privateUserStore.bankLoading">
                <van-skeleton title :row="3" />
                <van-skeleton title :row="3" />
            </div>

            <div v-else>
                <div class="setting-content-item" v-for="item in privateUserStore.bankList" :key="item.id">
                    <h2>{{ item.openingBank }}（<span>{{ item.branchName }}</span>）</h2>
                    <h1>{{ item.cardNumber }}</h1>
                </div>
            </div>

            <div v-if="!privateUserStore.bankLoading" class="setting-content-add flex-center"
                @click="gotoByPath('/settingAddBank')">
                <van-icon name="plus" size="16" />
                <span>添加银行卡</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { gotoByPath, useUser } from 'src/hook'
import { onMounted } from 'vue';

export default defineComponent({
    components: {},
    setup() {
        const { privateUserStore, getUserBindBankList } = useUser();

        onMounted(() => {
            getUserBindBankList()
        })

        return { gotoByPath, privateUserStore }
    }
})
</script>
<style>
:root {
    --van-skeleton-paragraph-background: #fff !important;
}
</style>
<style scoped lang="scss">
.setting {
    background-color: #f8f8f8;
    min-height: 100vh;

    &-content {
        padding: 64px 15px 15px 15px;

        .van-skeleton {
            margin-bottom: 20px;
        }

        &-add {
            border: 1px dashed #c3c3c3;
            height: 100px;
            border-radius: 8px;

            >span {
                font-size: 16px;
                margin-left: 5px;
            }
        }

        &-item {
            background-color: #fff;
            margin-bottom: 15px;
            padding: 20px 15px;
            border-radius: 8px;

            h1 {
                font-size: 18px;
            }

            h2 {
                margin-bottom: 15px;
                font-size: 16px;
            }
        }
    }

    &-btn {
        padding: 30px;

        .van-button {
            height: 48px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 500;
            color: $title !important;
        }
    }
}
</style>