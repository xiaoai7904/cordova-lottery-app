<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="forget-password">
        <MainHeader title="登录密码更改" />
        <div class="forget-password-content">
            <div>
                <q-form ref="myForm" @submit="onSubmit" class="q-gutter-y-md column">
                    <div class="forget-password-content-item">
                        <h2>用户名</h2>
                        <q-input placeholder="请输入用户名" v-model="registerStore.forgetPassword.password" outlined lazy-rules
                            :rules="[(val) => (val && val.length > 0) || '请输入用户名']" />
                    </div>

                    <div class="forget-password-content-item">
                        <h2>旧密码</h2>
                        <q-input type="password" placeholder="请输入旧密码" v-model="registerStore.forgetPassword.password"
                            outlined lazy-rules :rules="[(val) => (val && val.length > 0) || '请输入旧密码']" />
                    </div>

                    <div class="forget-password-content-item">
                        <h2>新密码</h2>
                        <q-input type="password" placeholder="请输入新密码" v-model="registerStore.forgetPassword.password"
                            outlined lazy-rules :rules="[(val) => (val && val.length > 0) || '请输入新密码']" />
                    </div>

                    <div class="forget-password-content-item">
                        <h2>确认密码</h2>
                        <q-input type="password" placeholder="请输入新密码" v-model="registerStore.forgetPassword.password"
                            outlined lazy-rules :rules="[(val) => (val && val.length > 0) || '请输入新密码']" />
                    </div>

                    <div class="forget-password-content-item">
                        <h2>手机号</h2>
                        <q-input placeholder="请输入手机号" v-model="registerStore.forgetPassword.phone" outlined :maxlength="11"
                            lazy-rules :rules="[(val) => (val && val.length > 0) || '请输入手机号']">
                            <template v-slot:prepend>
                                <span class="inter-bold register-sms">+86</span>
                                <span class="line"></span>
                            </template>
                        </q-input>
                    </div>

                    <div class="forget-password-content-item">
                        <h2>验证码</h2>
                        <q-input placeholder="请输入验证码" v-model="registerStore.forgetPassword.smscode" outlined :maxlength="6"
                            lazy-rules :rules="[(val) => (val && val.length > 0) || '请输入验证码']">
                            <template v-slot:append>
                                <div :class="{ send: true, disbale: count }" @click.stop="sendSmsCode">
                                    {{ count > 0 ? count + ' 秒' : '发送验证码' }}
                                </div>
                            </template>
                        </q-input>
                    </div>



                    <q-btn label="提 交" type="submit" color="primary" />
                </q-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MainHeader from 'src/layouts/Header/MainHeader.vue';
import { useRegister, useCountDown, useNotify } from 'src/hook'

export default defineComponent({
    components: { MainHeader },
    setup() {
        const { count, start } = useCountDown();
        const { errorNotify } = useNotify()
        const { registerStore, sendCode, forgetPassword } = useRegister()
        const onSubmit = async () => {
            await forgetPassword()
        }

        const sendSmsCode = async () => {
            if (!registerStore.forgetPassword.phone) {
                errorNotify('请输入手机号');
                return;
            }

            await sendCode({ phone: registerStore.forgetPassword.phone })
            start(60);
        }

        return { registerStore, count, start, sendSmsCode, onSubmit }
    }
})
</script>

<style lang="scss" scoped>
.forget-password {
    &-content {
        padding: 2px 0;

        >div {
            width: 100%;
            // border-radius: 12px;
            background-color: #fff;
            // box-shadow: 0px 0px 10px 0px rgba(109, 93, 244, 0.1);
            padding: 20px 16px;
            // margin-top: 20px;
        }

        &-item {
            >h2 {
                font-family: inter-medium;
                font-size: 16px;
                color: $title;
                margin-bottom: 8px;
            }

            :deep(.q-field__control) {
                height: 48px;
                font-size: 16px;

                .q-field__marginal {
                    height: 48px;

                    .register-sms {
                        font-size: 18px;
                    }

                    .line {
                        display: inline-block;
                        width: 1px;
                        height: 60%;
                        border-radius: 5px;
                        background-color: #EFEFEF;
                        margin-left: 12px;
                    }
                }
            }

            .send {
                width: 80px;
                height: 32px;
                text-align: center;
                line-height: 32px;
                background-color: $primary;
                color: #fff;
                font-family: inter-medium;
                font-size: 13px;
                border-radius: 4px;
            }
        }


        :deep(.q-btn) {
            height: 48px;
            border-radius: 8px;
            font-family: inter-bold;
            font-size: 16px;
        }
    }
}
</style>