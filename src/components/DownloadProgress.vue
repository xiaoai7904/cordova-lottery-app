<template>
    <q-dialog :model-value="modelShow" @update:model-value="dialogModelValueChange">
        <div class="dialog-container">
            <div class="dialog-content">
                <h1>{{ title }}</h1>
                <div class="dialog-content-progress">
                    <q-linear-progress size="20px" :value="currentProgressValue" stripe rounded
                        color="accent"></q-linear-progress>
                    <p class="value">{{ currentTotalM }} / {{ totalM }}</p>
                </div>
            </div>

            <div v-if="isClose" class="close" @click="modelShow = false">
                <q-icon name="close" class="material-icons" size="20" />
            </div>
        </div>
    </q-dialog>
</template>

<script lang="ts">
import { PropType, computed, defineComponent, onMounted, ref } from 'vue'
import { XA_DOWNLOAD } from 'src/common';
export default defineComponent({
    props: {
        title: {
            type: String as PropType<string>,
            default: 'Download Information'
        },
        // value: {
        //     type: Number as PropType<number>,
        //     default: 0
        // },
        // total: {
        //     type: Number as PropType<number>,
        //     default: 0
        // }
    },
    emits: ['update:show'],
    setup(props, { emit }) {
        const modelShow = ref(false)
        const currentTotal = ref(0)
        const currentProgressValue = ref(0)
        const total = ref(0)
        const isClose = ref(false)
        const currentTotalM = computed(() => (currentTotal.value / 1024 / 1024).toFixed(2) + 'M')
        const totalM = computed(() => (total.value / 1024 / 1024).toFixed(2) + 'M')

        const dialogModelValueChange = (v: boolean) => {
            emit('update:show', v)
        }

        const show = () => {
            modelShow.value = true
        }

        const hide = () => {
            modelShow.value = false
        }

        onMounted(() => {
            window.xaCustomEvent.on(XA_DOWNLOAD, (data: any) => {
                currentProgressValue.value = Number.parseFloat((data.progress / 100).toFixed(2))
                currentTotal.value = data.bytesWritten;
                total.value = data.bytes;

                if (data.progress === 100) {
                    isClose.value = true
                    setTimeout(() => {
                        hide()
                    }, 1000)
                }
            });
        })
        return { isClose, dialogModelValueChange, modelShow, show, hide, currentProgressValue, currentTotalM, totalM }
    }
})
</script>

<style lang="scss" scoped>
.dialog-container {
    position: relative;
    padding-bottom: 0.6rem;

    .close {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        background-color: #fff;
        border-radius: 50%;
        padding: 0.1rem;
        text-align: center;
        font-size: 0.2rem;
    }
}

.dialog-content {
    width: 3rem;
    background-color: #fff;
    border-radius: 0 0.24rem 0.24rem 0.24rem;
    padding: 0.25rem 0.2rem;

    >h1 {
        font-size: 0.2rem;
        font-family: inter-bold;
        color: $title;
    }

    >p {
        font-size: 0.16rem;
        color: #333;
        margin: 0.25rem 0;
        min-height: 0.5rem;
        line-height: 1.5em;
    }

    .q-btn {
        height: 0.44rem;
        border-radius: 0.08rem;
        font-size: 0.16rem;
        font-family: inter-bold;
        flex: 1;
    }

    .dialog-content-progress {
        padding: 20px 0;
    }

    .value {
        padding-top: 10px;
    }

}
</style>