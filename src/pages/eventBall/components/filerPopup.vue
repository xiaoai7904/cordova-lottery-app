<template>
  <div class="filterPopup" @click.stop="emit('update:show', false)">
    <div class="nav-box">
      <div
        class="item"
        v-for="(item, i) in props.data"
        :key="i"
        :class="item.value == props.currValue && 'active'"
        @click.stop="() => emit('handlerSelect', item.value)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    currValue: {
      type: String,
      default: () => '',
    },
  },
  setup(props, { emit }) {
    const router = useRouter();

    return { router, emit, props };
  },
});
</script>
<style scoped lang="scss">
.filterPopup {
  width: 100%;
  height: calc(100vh - 44px);
  background: rgba(0, 0, 0, 0.4);
  top: 44px;
  position: fixed;
  z-index: 99;
  .nav-box {
    width: 100%;
    height: auto;
    display: flex;
    background: #fff;
    flex-wrap: wrap;
    .active {
      color: #f73 !important;
    }
    .item {
      width: 25%;
      height: 36px;
      line-height: 36px;
      text-align: center;
      color: #48484b;
      font-size: 13px;
    }
  }
}
</style>
