<template>
  <div class="footer">
    <q-tabs v-model="routerActive" active-class="routerActive" indicator-color="transparent">
      <q-tab v-for="(item, key) in footer" :key="key" :name="item.path"
        :icon="routerActive === item.path ? item.activeIcon : item.icon" :label="item.name" @click="handleClick(item)">
      </q-tab>
    </q-tabs>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { XA_SSE_UPDATE } from 'src/common';
import { useRoute, useRouter } from 'vue-router';
import { useGlobalStore } from 'src/stores/global-store';

interface Ifooter {
  name: string;
  icon: any;
  path: string;
}
const globalStore = useGlobalStore();
const router = useRouter();
const route = useRoute();
const routerActive = ref<string>(route.path as string);

const footer = ref([
  {
    name: '首页',
    icon: `img:${require('./assets/home.svg')}`,
    activeIcon: `img:${require('./assets/homeActive.svg')}`,
    path: '/',
  },
  {
    name: '比分',
    icon: `img:${require('./assets/score.svg')}`,
    activeIcon: `img:${require('./assets/scoreActive.svg')}`,
    path: '/score',
  },
  {
    name: '',
    icon: '',
    activeIcon: '',
    path: '/orders',
  },
  {
    name: '发现',
    icon: `img:${require('./assets/find.svg')}`,
    activeIcon: `img:${require('./assets/findActive.svg')}`,
    path: '/find',
  },
  {
    name: '我的',
    icon: `img:${require('./assets/my.svg')}`,
    activeIcon: `img:${require('./assets/myActive.svg')}`,
    path: '/my',
  },
]);

const handleClick = (item: Ifooter) => {
  router.push(item.path);
};

onMounted(() => {
  window.xaCustomEvent.on(XA_SSE_UPDATE, (value: boolean) => {
    console.log('XA_SSE_UPDATE Eevnt', value);
    globalStore.update(value);
  });
});
</script>
<style scoped lang="scss">
.footer {
  width: 100%;
  height: 120px;
  max-width: 375px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background: url('./assets/tabbar_bg.png') no-repeat;
  background-size: 100% 100%;

  .q-tabs {
    width: 100%;

    .q-tab {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.4);
      font-family: inter-medium;
    }

    .routerActive {
      :deep(.q-tab__label) {
        color: $primary;
      }
    }

    :deep(.q-tab__icon) {
      width: 26px;
      height: 26px;
    }

    :deep(.q-tab__label) {
      font-size: 14px;
    }

    :deep(.q-tab__content) {
      justify-content: flex-end;
      padding-bottom: 25px;
    }

    :deep(.q-ripple) {
      display: none;
    }

    :deep(.q-focus-helper) {
      display: none;
    }
  }
}
</style>
