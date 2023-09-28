<template>
    <div class="setting">
        <Headers title="账户与安全" />
        <div class="setting-content">
            <van-cell-group>
                <van-cell title="头像" is-link center>
                    <template #value>
                        <Uploader @success="uploadSuccess">
                            <img :src="userInfo.avatar" alt="avatar" />
                        </Uploader>
                    </template>
                </van-cell>
                <van-cell title="用户名" :value="userInfo.username" />
                <van-cell title="登录密码" is-link value="修改密码" @click="gotoByPath('/settingPassword')" />
            </van-cell-group>
            <van-cell-group>
                <van-cell title="银行卡管理" is-link @click="gotoByPath('/settingBank')" />
            </van-cell-group>
            <div class="setting-btn">
                <van-button type="primary" block color="linear-gradient(127deg,#fff120,#fcdf6b)"
                    @click="logout">退出登录</van-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { gotoByPath, useUser, useLogin, useNotify } from 'src/hook';
import Uploader from 'src/components/Upload/Upload.vue'
export default defineComponent({
    components: { Uploader },
    setup() {
        const { successNotify } = useNotify();
        const { userInfo, updateUserAvatar } = useUser()
        const { logout } = useLogin()
        const uploadSuccess = (data: any) => {
            console.log(data)
            updateUserAvatar({
                avatar: data.fileName
            })
            successNotify('头像更新成功')
        }
        return { gotoByPath, logout, uploadSuccess, userInfo }
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