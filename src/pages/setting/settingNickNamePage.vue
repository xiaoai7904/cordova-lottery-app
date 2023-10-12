<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="forget-password">
        <MainHeader title="昵称更改" />
        <div class="forget-password-content form-content">
            <div>
                <q-form ref="myForm" @submit="onSubmit" class="q-gutter-y-md column">

                    <div class="forget-password-content-item form-content-item">
                        <h2>昵称</h2>
                        <q-input placeholder="请输入昵称" v-model="privateUserStore.nikeName" outlined lazy-rules
                            :rules="[(val) => (val && val.length > 0) || '请输入昵称']" />
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
import { useUser } from 'src/hook'

export default defineComponent({
    components: { MainHeader },
    setup() {
        const { privateUserStore, updateNickName } = useUser()
        const onSubmit = async () => {
            await updateNickName()
        }

        return { privateUserStore, onSubmit }
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