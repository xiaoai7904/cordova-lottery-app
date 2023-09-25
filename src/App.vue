<template>
  <BaseRouterView />
</template>

<script setup lang="ts">
import BaseRouterView from 'src/components/BaseRouterView.vue';
import { onMounted } from 'vue';
import { XA_LOGIN_EXPIRED, RouterNameEnum } from 'src/common';
import { useCustomRouter, useHotUpdateApk, useUser } from 'src/hook'
// import VConsole from 'vconsole';

// const vConsole = new VConsole({ theme: 'dark' });
// vConsole.setSwitchPosition(10, 80);

const { getUserInfo } = useUser()
const router = useCustomRouter()
// const route = useRoute()
const { checkAppVersion } = useHotUpdateApk()

checkAppVersion()

// const { setStatusBarColor, setStatusStyle, setOverlaysWebView } = useAndroid()

// watch(() => route.name, newValue => {
//   if (newValue === 'Home') {
//     setStatusStyle('dark')
//     setOverlaysWebView(false)
//     setStatusBarColor('#ffffff')
//   }
// }, {
//   immediate: true
// })


onMounted(() => {
  getUserInfo()
  window.xaCustomEvent?.on(XA_LOGIN_EXPIRED, () => {
    setTimeout(() => { router.push({ name: RouterNameEnum.LOGIN }); }, 500)
  });
})

</script>
