<template>
  <div class="entry">
    <div class="logoCon">
      <img class="close" @click="goHome" src="./assets/close.png" alt="" />
      <img class="logo" src="./assets/logo.png" alt="" />
      <div class="title inter-bold">如意助手</div>
    </div>
    <div class="q-pa-md">
      <div class="q-gutter-y-md">
        <q-card>
          <q-tabs v-model="tab" align="justify" no-caps narrow-indicator indicator-color="transparent">
            <q-tab name="Login" label="登录" />
            <q-tab name="Register" label="注册" />
          </q-tabs>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="Login">
              <LoginPage />
            </q-tab-panel>
            <q-tab-panel name="Register">
              <RegisterPage @register-success="registerSuccess" />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import LoginPage from './LoginPage.vue';
import RegisterPage from './RegisterPage.vue';
import { RouterNameEnum } from 'src/common';
export default defineComponent({
  components: {
    LoginPage,
    RegisterPage,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const tab = ref(route.name as string);
    watch(
      () => tab.value,
      () => {
        router.push(`/${tab.value as string}`);
      }
    );

    const goHome = () => {
      router.push('/');
    };

    const registerSuccess = () => {
      tab.value = RouterNameEnum.LOGIN
    }

    return {
      tab,
      goHome,
      registerSuccess
    };
  },
});
</script>

<style lang="scss" scoped>
.entry {
  min-height: calc(100vh);
  background: url('./assets/bg.png') no-repeat;
  background-color: white;
  background-size: 100% auto;

  .logoCon {
    width: 100%;
    height: 178px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    .close {
      width: 24px;
      position: absolute;
      top: 20px;
      right: 20px;
    }

    .logo {
      width: 80px;
    }

    .title {
      margin-top: 15px;
      font-size: 18px;
      color: $title;
    }
  }

  ::v-deep(.q-pa-md) {
    margin-top: 30px;

    .q-card {
      box-shadow: none;
    }

    .q-tab {
      .q-tab__label {
        font-size: 18px !important;
        font-family: inter-regular;
        color: rgba(28, 42, 81, 0.5);
      }

      &[aria-selected='true'] {
        .q-tab__label {
          font-size: 20px !important;
          font-family: inter-bold;
          color: $title;
        }
      }
    }

    .q-tab-panels {
      margin-top: 20px;
    }
  }
}
</style>
<style lang="scss">
.q-menu {
  width: 311px !important;
  height: 200px !important;
  overflow: scroll;
}
</style>
