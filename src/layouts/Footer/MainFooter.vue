<template>
  <div class="footer">
    <q-tabs v-model="routerActive" active-class="routerActive" indicator-color="transparent">
      <q-tab v-for="(item, key) in footer" :key="key" :name="item.name"
        :icon="routerActive === item.name ? item.activeIcon : item.icon" :label="item.name" @click="handleClick(item)">
        <q-badge v-if="globalStore.isOrderNew && item.path === '/orders'" color="red" floating rounded></q-badge>
      </q-tab>
    </q-tabs>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterNameEnum, XA_SSE_UPDATE } from 'src/common';
import { useRoute, useRouter } from 'vue-router';
import { useGlobalStore } from 'src/stores/global-store'

interface Ifooter {
  name: string;
  icon: any;
  path: string;
}
const globalStore = useGlobalStore();
const router = useRouter();
const route = useRoute();
const routerActive = ref<string>(route.name as string);

const footer = ref([
  {
    name: RouterNameEnum.HOME,
    icon: `img:${require('./assets/home.svg')}`,
    activeIcon: `img:${require('./assets/homeActive.svg')}`,
    path: '/',
  },
  {
    name: RouterNameEnum.ORDERS,
    icon: `img:${require('./assets/order.svg')}`,
    activeIcon: `img:${require('./assets/orderActive.svg')}`,
    path: '/orders',
  },
  {
    name: RouterNameEnum.SHARE,
    icon: `img:${require('./assets/share.svg')}`,
    activeIcon: `img:${require('./assets/shareActive.svg')}`,
    path: '/share',
  },
]);

const handleClick = (item: Ifooter) => {
  router.push(item.path);
};

onMounted(() => {
  window.xaCustomEvent.on(XA_SSE_UPDATE, (value: boolean) => {
    console.log('XA_SSE_UPDATE Eevnt', value)
    globalStore.update(value)
  });
})
</script>
<style scoped lang="scss">
.footer {
  width: 100%;
  height: 0.7rem;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  background: white;
  left: 0;

  .q-tabs {
    width: 100%;

    .q-tab {
      font-size: 0.12rem;
      color: rgba(0, 0, 0, 0.4);
      font-family: inter-medium;
    }

    .routerActive {
      :deep(.q-tab__label) {
        color: $primary;
      }

      :deep(svg) {
        width: 0.24rem;
        height: 0.24rem;

        path {
          fill: rgba(0, 0, 0, 0.4);
          fill-opacity: 1;
        }
      }
    }

    :deep(.q-tab__label) {
      font-size: 0.12rem;
    }
  }

  // &>div {
  //   flex: 1;
  //   text-align: center;
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   justify-content: center;

  //   >section {
  //     position: relative;
  //   }

  //   .icon {
  //     :deep(svg) {
  //       width: 0.24rem;
  //       height: 0.24rem;

  //       path {
  //         fill: rgba(0, 0, 0, 0.4);
  //         fill-opacity: 1;
  //       }
  //     }
  //   }

  //   .name {
  //     font-size: 0.12rem;
  //     color: rgba(0, 0, 0, 0.4);
  //     font-family: inter-regular;
  //   }

  //   &.routerActive {

  //     .name {
  //       color: $primary;
  //       font-family: inter-medium;
  //     }

  //     .icon {
  //       :deep(svg) {
  //         path {
  //           fill: $primary;
  //         }
  //       }
  //     }
  //   }
  // }
}
</style>
