<template>
  <div class="headers" :class="{ headerBg: props.transparent }">
    <div class="left" @click="() => router.go(-1)" v-if="!props.hidenLeft">
      <van-icon name="arrow-left" size="25px" />
    </div>
    <span>{{ props.title }}</span>
    <slot name="title"></slot>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
    transparent: {
      type: Boolean,
      default: () => false,
    },
    hidenLeft: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props) {
    const router = useRouter();
    return { props, router };
  },
});
</script>
<style scoped lang="scss">
.headerBg {
  background: none !important;
}

.headers {
  width: 100%;
  height: 44px;
  background: white;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 3px;
  top: 0;
  left: 0;
  font-size: 16px;
  font-weight: 600;
  z-index: 20;
  box-shadow: 0 2px 8px #f2f3f5;

  .left {
    position: absolute;
    left: 13px;
  }

  .right {
    position: absolute;
    right: 3px;
  }
}
</style>
