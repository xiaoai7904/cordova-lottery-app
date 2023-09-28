<template>
  <div class="login">
    <q-form ref="myForm" @submit="onSubmit" class="q-gutter-y-md column">
      <!-- <q-input placeholder="请输入手机号" v-model="loginStore.form.phone" :maxlength="11" lazy-rules
        :rules="[(val) => (val && val.length > 0) || '请输入手机号']">
        <template v-slot:prepend>
          <span class="inter-bold login-sms">+86</span>
        </template>
      </q-input> -->
      <q-input placeholder="请输入用户名" v-model="loginStore.form.username" lazy-rules
        :rules="[(val) => (val && val.length > 0) || '请输入用户名']" />
      <q-input type="password" placeholder="请输入密码" v-model="loginStore.form.password" lazy-rules
        :rules="[(val) => (val && val.length > 0) || '请输入密码']" />
      <q-btn label="登 录" type="submit" color="primary" />
    </q-form>
    <div class="forget inter-regular" @click="forgetPassword">忘记密码?</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useLogin, useCustomRouter } from 'src/hook'
import { RouterNameEnum } from 'src/common';
export default defineComponent({
  setup() {
    const myForm = ref();
    const router = useCustomRouter()
    const { loginStore, login } = useLogin()
    const arealist = [
      '+91',
      '+86',
      '+12',
      '+91',
      '+86',
      '+12',
      '+91',
      '+86',
      '+12',
    ];
    const onSubmit = () => {
      myForm.value.validate().then((success: any) => {
        if (success) {
          login()
        }
      });
    };
    const forgetPassword = () => router.push({ name: RouterNameEnum.FORGETPASSWORD })
    return {
      myForm,
      arealist,
      onSubmit,
      loginStore,
      forgetPassword
    };
  },
});
</script>

<style lang="scss" scoped>
.login {
  .forget {
    width: 100%;
    text-align: center;
    margin-top: 60px;
    color: $tips;
    font-size: 16px;
  }

  &-sms {
    font-size: 18px;
    color: $title;
  }

  ::v-deep(.q-form) {
    .q-field {
      margin-top: 0;
    }

    .q-field__control,
    .q-field--auto-height .q-field__native {
      height: 40px;
      min-height: 40px !important;
    }

    .q-field__marginal {
      height: 40px !important;
    }

    .q-field__native {
      font-family: inter-bold, inter-v;
      font-size: 18px;
      color: #1c2a51;

      &>span {
        width: 40px;
        font-size: 18px;
        font-family: inter-bold;
        color: $title;
        padding-right: 10px;
        border-right: 1px solid rgba(0, 0, 0, 0.24);
      }
    }

    .q-field__native::placeholder {
      font-size: 16px;
      color: #1C2A51;
      font-family: Inter V-Regular, Inter V;
    }

    .q-select--without-input {
      .q-field__control:before {
        border: none;
      }

      .q-field__marginal {
        display: none;
      }
    }

    .q-btn {
      width: 315px;
      height: 48px;
      // background: $primary !important;
      border-radius: 8px;
      font-size: 18px;
    }
  }
}
</style>
