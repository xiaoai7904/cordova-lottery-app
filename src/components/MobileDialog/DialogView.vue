<template>
    <q-dialog :model-value="modelShow" @update:model-value="dialogModelValueChange">
        <div class="dialog-container">
            <div class="dialog-content">
                <h1>{{ title }}</h1>
                <p>{{ content }}</p>
                <div class="row justify-between items-center">
                    <q-btn flat color="primary" :label="cancelText" @click="cancelEvent" />
                    <q-btn color="primary" :label="confirmText" @click="confirmEvent" />
                </div>

            </div>
            <div class="close" @click="modelShow = false">
                <q-icon name="close" class="material-icons" size="20" />
            </div>
        </div>
    </q-dialog>
</template>

<script lang="ts">
import { PropType, defineComponent, ref } from 'vue'
export default defineComponent({
    props: {
        // show: {
        //     type: Function as PropType<() => void>
        // },
        title: {
            type: String as PropType<string>,
            default: 'INFO'
        },
        content: {
            type: String as PropType<string>,
            default: ''
        },
        cancelText: {
            type: String as PropType<string>,
            default: 'Cancel'
        },
        confirmText: {
            type: String as PropType<string>,
            default: 'Confirm'
        },
        cancel: {
            type: Function as PropType<() => void>,
        },
        confirm: {
            type: Function as PropType<() => void>,
        }
    },
    emits: ['update:show'],
    setup(props, { emit }) {
        const modelShow = ref(false)
        const dialogModelValueChange = (v: boolean) => {
            emit('update:show', v)
        }

        const show = () => {
            modelShow.value = true
        }

        const hide = () => {
            modelShow.value = false
        }

        const cancelEvent = () => {
            if (props.cancel) {
                props.cancel()

            }

            hide()
        }

        const confirmEvent = () => {
            if (props.confirm) {
                props.confirm()

            }

            hide()
        }
        return { dialogModelValueChange, modelShow, show, hide, cancelEvent, confirmEvent }
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


}
</style>