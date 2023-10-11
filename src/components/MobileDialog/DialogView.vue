<template>
  <q-dialog :model-value="modelShow" @update:model-value="dialogModelValueChange">
    <div class="dialog-container">
      <div class="dialog-content">
        <h1>{{ title }}</h1>
        <p v-html="content"></p>
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
      default: '提示'
    },
    content: {
      type: String as PropType<string>,
      default: ''
    },
    cancelText: {
      type: String as PropType<string>,
      default: '取消'
    },
    confirmText: {
      type: String as PropType<string>,
      default: '确定'
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
  padding-bottom: 60px;

  .close {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    border-radius: 50%;
    padding: 10px;
    text-align: center;
    font-size: 20px;
  }
}

.dialog-content {
  width: 300px;
  background-color: #fff;
  border-radius: 0 24px 24px 24px;
  padding: 25px 20px;

  >h1 {
    font-size: 20px;
    font-family: inter-bold;
    color: $title;
  }

  >p {
    font-size: 16px;
    color: #333;
    margin: 25px 0;
    min-height: 50px;
    line-height: 1.5em;
  }

  .q-btn {
    height: 44px;
    border-radius: 8px;
    font-size: 16px;
    font-family: inter-bold;
    flex: 1;
  }


}
</style>
