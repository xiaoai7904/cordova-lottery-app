<template>
    <div class="setting">
        <Headers title="账户与安全" />
        <div class="setting-content">
            <van-cell-group>
                <van-cell title="头像" is-link center>
                    <template #value>
                        <van-uploader>
                            <img src="https://picsum.photos/80" alt="" />
                        </van-uploader>
                    </template>
                </van-cell>
                <van-cell title="用户名" value="内容" />
                <van-cell title="登录密码" is-link value="修改密码" @click="gotoByPath('/settingPassword')" />
            </van-cell-group>
            <van-cell-group>
                <van-cell title="银行卡管理" is-link @click="gotoByPath('/settingBank')" />
            </van-cell-group>
            <div class="setting-btn">
                <van-button type="primary" block color="linear-gradient(127deg,#fff120,#fcdf6b)">退出登录</van-button>
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
        padding: 44px 0 0 0;

        :deep(.van-cell-group) {
            margin-top: 10px;

            .van-cell__title {
                font-size: 16px;
                font-weight: 500;
                color: $title;
            }

            .van-cell__value {
                .van-uploader__input-wrapper {
                    >img {
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                    }
                }
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