<template>
  <div class="order">
    <Headers transparent :hidenLeft="true">
      <template #title>
        <div>123</div>
      </template>
      <template #right></template>
    </Headers>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const router = useRouter();

    return { router };
  },
});
</script>
<style scoped lang="scss"></style>
