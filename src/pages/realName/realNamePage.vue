<template>
    <div :class="isCertification ? 'real-name' : 'real-name-not'">
        <Headers title="实名认证" :transparent="isCertification" />
        <div class="real-name-content">
            <div v-if="isCertification" class="real-name-content-item flex column justify-center">
                <img src="./assets/user.png" alt="user">
                <h1>您已完成实名认证</h1>
                <div class="flex justify-between items-center">
                    <span>真实姓名</span>
                    <span>xxxx</span>
                </div>
                <div class="flex justify-between items-center">
                    <span>身份证</span>
                    <span>xxxx</span>
                </div>
                <div class="flex justify-between items-center">
                    <span>手机号</span>
                    <span>xxxx</span>
                </div>
            </div>

            <div v-else class="form-content">
                <q-form ref="myForm" @submit="onSubmit" class="q-gutter-y-md column">
                    <div class="form-content-item">
                        <h2>姓名</h2>
                        <q-input placeholder="请输入姓名" v-model="privateUserStore.addCertificationInfo.realName" outlined
                            lazy-rules :rules="[(val) => (val && val.length > 0) || '请输入姓名']" />
                    </div>

                    <div class="form-content-item">
                        <h2>身份证号码</h2>
                        <q-input placeholder="请输入身份证号码" v-model="privateUserStore.addCertificationInfo.idCard" outlined
                            lazy-rules :rules="[(val) => (val && val.length > 0) || '请输入身份证号码']" />
                    </div>

                    <div class="form-content-item">
                        <h2>手机号码</h2>
                        <q-input placeholder="请输入手机号码" v-model="privateUserStore.addCertificationInfo.phone" outlined
                            lazy-rules :rules="[(val) => (val && val.length > 0) || '请输入手机号码']" />
                    </div>

                    <div class="form-content-item">
                        <h2>身份证正面</h2>
                        <Uploader @success="uploadSuccess1">
                            <img v-if="privateUserStore.addCertificationInfo.image1"
                                :src="privateUserStore.addCertificationInfo.image1" alt="avatar" />
                            <div v-else class="upload-btn">
                                点击上传身份证正面
                            </div>
                        </Uploader>
                    </div>

                    <div class="form-content-item">
                        <h2>身份证反面</h2>
                        <Uploader @success="uploadSuccess2">
                            <img v-if="privateUserStore.addCertificationInfo.image2"
                                :src="privateUserStore.addCertificationInfo.image2" alt="avatar" />
                            <div v-else class="upload-btn">点击上传身份证反面</div>
                        </Uploader>
                    </div>



                    <q-btn label="提 交" type="submit" color="primary" />
                </q-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUser } from 'src/hook';
import { onMounted } from 'vue';
import Uploader from 'src/components/Upload/Upload.vue'

export default defineComponent({
    components: { Uploader },
    setup() {
        const { privateUserStore, getCertificationInfo, addCertificationInfo } = useUser();
        const isCertification = ref(true);

        const onSubmit = async () => {
            await addCertificationInfo()
        }

        onMounted(async () => {
            const data: any = await getCertificationInfo()
            isCertification.value = !!data.uid
        })

        const uploadSuccess1 = (data: any) => {
            privateUserStore.addCertificationInfo.image1 = data.fileName
        }

        const uploadSuccess2 = (data: any) => {
            privateUserStore.addCertificationInfo.image2 = data.fileName
        }

        return { privateUserStore, isCertification, onSubmit, uploadSuccess1, uploadSuccess2 }
    }
})
</script>

<style scoped lang="scss">
.real-name {
    background: #fff url('./assets/bg.png') no-repeat top;
    background-size: 375px 220px;
    min-height: 100vh;

    &-not {
        background: #fff !important;

        .real-name-content {
            padding: 70px 0 0 0;
        }
    }

    &-content {
        padding: 100px 0 0 0;

        &-item {
            background-color: #fff;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 2px 4px 0 hsla(0, 0%, 92.9%, .5);
            width: 345px;
            height: 225px;
            margin: 0 auto;
            position: relative;

            >img {
                width: 62px;
                height: 62px;
                position: absolute;
                top: -20px;
                left: 50%;
                transform: translateX(-50%);
            }

            >h1 {
                font-size: 16px;
                margin: 10px 0 15px 0;
                text-align: center;
            }

            >div {
                margin-top: 20px;

                >span:first-child {
                    font-size: 14px;
                    color: #232a24;
                }

                >span:last-child {
                    font-size: 12px;
                    color: #b4b4c1;
                }
            }


        }

        .upload-btn {
            border-radius: 5px;
            border: 1px solid #cbcbcb;
            width: 345px;
            height: 150px;
            line-height: 150px;
            font-size: 14px;
            text-align: center;
            color: #b4b4c1;
        }
    }
}

.form-content {
    padding: 2px 15px;

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
</style>