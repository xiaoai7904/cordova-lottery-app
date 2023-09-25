<template>
    <div class="setting">
        <Headers title="我的银行卡" />
        <div class="setting-content">
            <div class="setting-content-add flex-center" @click="gotoByPath('/settingAddBank')">
                <van-icon name="plus" size="16" />
                <span>添加银行卡</span>
            </div>

            <div class="setting-content-item">

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { gotoByPath } from 'src/hook'
export default defineComponent({
    components: {},
    setup() {
        return { gotoByPath }
    }
})
</script>

<style scoped lang="scss">
.setting {
    background-color: #efeff4;
    min-height: 100vh;

    &-content {
        padding: 64px 15px 15px 15px;

        &-add {
            border: 1px dashed #c3c3c3;
            height: 100px;
            border-radius: 8px;

            >span {
                font-size: 16px;
                margin-left: 5px;
            }
        }

        &-item {}
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