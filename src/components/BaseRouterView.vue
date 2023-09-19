<template>
  <!-- <q-layout view="lhh LpR lff" container style="height: 100vh"> -->
  <div class="app-router">
    <router-view
      class="view"
      :class="{ paddingBottom: route.meta.isFooter }"
      v-slot="{ Component }"
    >
      <transition
        :name="(route.meta.transitionName as string)"
        :mode="transitionMode"
      >
        <component :is="Component" />
      </transition>
    </router-view>
    <MainFooter v-if="route.meta.isFooter" />
    <!-- <q-page-sticky v-if="!isHiddenCustomer" position="bottom-right" :offset="fabPos">
      <div class="customer-avatar">
        <div v-touch-pan.mouse="moveFab" @click="gotoCustomer" />
        <img :src="homeInfo.customer?.avatar">
      </div>
    </q-page-sticky> -->
    <!-- <div id="customer" v-if="!isHiddenCustomer" class="customer-avatar">
      <div v-touch-pan.mouse.prevent="moveFab" @click="gotoCustomer" />
      <img :src="homeInfo.customer?.avatar">
    </div> -->
  </div>
  <!-- <q-page-sticky v-if="!isHiddenCustomer" position="bottom-right" :offset="fabPos">
      <div class="customer-avatar">
        <div v-touch-pan.mouse="moveFab" @click="gotoCustomer" />
        <img :src="homeInfo.customer?.avatar">
      </div>
    </q-page-sticky>
  </q-layout> -->
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import MainFooter from '../layouts/Footer/MainFooter.vue';
import { useRouterAnimate, useUser, useInAppBrowser } from 'src/hook';

const router = useRouter();
const route = useRoute();
const needAnimate = useRouterAnimate();
const transitionMode = ref<any>('out-in');
const { getHomeInfo } = useUser();
// const { open } = useInAppBrowser();

router.beforeEach((to: any, from: any) => {
  // 这里通过router中设置的页面深度depth来判断动画的方向，这样不会收到刷新和浏览器前进后退的影响而导致动画执行错误
  const toDepth = to.meta.depth;
  const fromDepth = from.meta.depth;
  if ((toDepth === 0 && fromDepth == void 0) || toDepth === fromDepth) {
    return true;
  }
  if (!from.name) {
    return true;
  }

  if (!needAnimate.value) {
    // 处理 Safari 等浏览器自带手势切换页面时，不执行过渡动画
    return true;
  }
  // if (import.meta.env.VITE_ANIMATION_MODE === "ios") {
  //   transitionMode.value = "";
  //   to.meta.transitionName =
  //     toDepth < fromDepth ? "slide-right" : "slide-left";
  // } else {
  //   transitionMode.value = "out-in";
  //   to.meta.transitionName = "animation";
  // }
  transitionMode.value = 'out-in';
  to.meta.transitionName = 'animation';
  return true;
});

// const isHiddenCustomer = computed(() => ['/Login', '/Register', '/forgetPassword', '/share'].includes(route.path))
router.afterEach(() => {
  // to and from are both route objects.
  needAnimate.value = false;
});

// const gotoCustomer = () => {
//   if (homeInfo.value.customer?.customerNo) {
//     open(homeInfo.value.customer?.customerNo)
//   }
// }

// const fabPos = ref([18, 150])
// const draggingFab = ref(false)
// const moveFab = (ev: any) => {
//   draggingFab.value = ev.isFirst !== true && ev.isFinal !== true
//   const $$customer = document.getElementById('customer');
//   fabPos.value = [
//     fabPos.value[0] - ev.delta.x,
//     fabPos.value[1] - ev.delta.y
//   ]
//   if (fabPos.value[0] <= 0) {
//     fabPos.value[0] = 0
//   }
//   if (fabPos.value[1] <= 0) {
//     fabPos.value[1] = 0
//   }
//   if ($$customer) {
//     $$customer.style.right = fabPos.value[0] + 'px'
//     $$customer.style.bottom = fabPos.value[1] + 'px'
//   }
// }

onMounted(() => {
  getHomeInfo();
});
</script>
<style lang="scss" scoped>
.q-btn--fab {
  background: transparent !important;

  &:before {
    box-shadow: none;
  }
}

// .customer-avatar {
//   width: 0.72rem;
//   height: 0.73rem;
//   position: fixed;
//   bottom: 0.8rem;
//   right: 0.1rem;
//   z-index: 100;

//   >div {
//     background: transparent;
//     width: 0.72rem;
//     height: 0.73rem;
//     position: absolute;
//     inherits: 0;
//     z-index: 2;
//   }

//   img {
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     inherits: 0;
//     z-index: 1;
//   }
// }

.paddingBottom {
  padding-bottom: 62px;
}
</style>
