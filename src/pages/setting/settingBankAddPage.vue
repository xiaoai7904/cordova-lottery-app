<template>
    <div class="setting">
        <Headers title="添加银行卡" />
        <div class="setting-content">
            <q-form ref="myForm" @submit="onSubmit" class="q-gutter-y-md column">
                <div class="setting-item">
                    <h2 class="title">开户银行</h2>
                    <q-input placeholder="请输入开户银行" v-model="privateUserStore.bank.openingBank" outlined lazy-rules
                        :rules="[(val: any) => (val && val.length > 0) || '请输入开户银行']" />
                </div>

                <div class="setting-item">
                    <h2 class="title">支行名称</h2>
                    <q-input placeholder="请输入支行名称" v-model="privateUserStore.bank.branchName" outlined lazy-rules
                        :rules="[(val: any) => (val && val.length > 0) || '请输入支行名称']" />
                </div>

                <div class="setting-item">
                    <h2 class="title">银行卡号</h2>
                    <q-input placeholder="请输入银行卡号" v-model="privateUserStore.bank.cardNumber" outlined lazy-rules
                        :rules="[(val: any) => (val && val.length > 0) || '请输入银行卡号']" />
                </div>

                <div class="setting-item">
                    <h2 class="title">所在省份</h2>
                    <q-input placeholder="请输入所在省份" v-model="privateUserStore.bank.province" outlined lazy-rules
                        :rules="[(val: any) => (val && val.length > 0) || '请输入所在省份']" />
                </div>

                <div class="setting-item">
                    <h2 class="title">所在城市</h2>
                    <q-input placeholder="请输入所在城市" v-model="privateUserStore.bank.city" outlined lazy-rules
                        :rules="[(val: any) => (val && val.length > 0) || '请输入所在城市']" />
                </div>

                <div class="setting-item">
                    <h2 class="title">预留手机号</h2>
                    <q-input placeholder="请输入手机号" v-model="privateUserStore.bank.phone" :maxlength="11" outlined lazy-rules
                        :rules="[(val: any) => (val && val.length > 0) || '请输入手机号']">
                        <template v-slot:prepend>
                            <span class="inter-bold setting-sms">+86</span>
                        </template>
                    </q-input>
                </div>

                <div class="setting-item">
                    <h2 class="title">验证码</h2>
                    <q-input placeholder="请输入验证码" v-model="privateUserStore.bank.code" :maxlength="6" outlined lazy-rules
                        :rules="[(val: any) => (val && val.length > 0) || '请输入验证码']">
                        <template v-slot:append>
                            <div :class="{ send: true, disbale: count }" @click.stop="sendSmsCode">
                                {{ count > 0 ? count + ' 秒' : '发送验证码' }}
                            </div>
                        </template>
                    </q-input>
                </div>

                <div class="setting-item">
                    <h2 class="title">登录密码</h2>
                    <q-input placeholder="请输入登录密码" v-model="privateUserStore.bank.password" outlined lazy-rules
                        :rules="[(val: any) => (val && val.length > 0) || '请输入登录密码']" />
                </div>

                <div class="setting-btn flex-center">
                    <q-btn label="确定" type="submit" color="primary" />
                </div>
            </q-form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUser, useCountDown } from 'src/hook'
import { showToast } from 'vant';
export default defineComponent({
    setup() {
        const { privateUserStore, addUserBank } = useUser()
        const { count, start } = useCountDown();
        const onSubmit = () => {
            addUserBank()
        }
        const sendSmsCode = async () => {
            if (!privateUserStore.bank.phone) {
                showToast('请输入手机号码');
                return;
            }

            // await sendCode({ phone: privateUserStore.bank.phone })
            start(60);
        }
        return { privateUserStore, count, addUserBank, onSubmit, sendSmsCode }
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

<style lang="scss" scoped>
.setting {
    background-color: #fff;

    &-content {
        padding: 74px 15px 15px 15px;
    }

    &-sms {
        font-size: 18px;
        color: $title;
    }

    .send {
        width: 80px;
        height: 32px;
        line-height: 32px;
        background: linear-gradient(127deg, #fff120, #fcdf6b);
        border-radius: 4px;
        text-align: center;
        font-size: 13px;
        font-family: inter-medium;
        font-weight: 500;
        color: $title;

        &.disbale {
            background: rgba(0, 0, 0, 0.24);
        }
    }

    &-item {
        >h2 {
            font-weight: 500;
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

    &-btn {
        width: 100%;
        padding: 0 15px;

        :deep(.q-btn) {
            width: 100%;
            height: 48px;
            border-radius: 8px;
            font-family: inter-bold;
            font-size: 16px;
        }
    }


}
</style>