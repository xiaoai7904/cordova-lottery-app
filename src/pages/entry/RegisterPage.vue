<template>
  <div class="register">
    <q-form ref="myForm" @submit="onSubmit" class="q-gutter-y-md column">
      <q-input placeholder="请输入手机号" v-model="registerStore.form.phone" :maxlength="11" lazy-rules
        :rules="[(val) => (val && val.length > 0) || '请输入手机号']">
        <template v-slot:prepend>
          <span class="inter-bold register-sms">+86</span>
          <!-- <q-select behavior="menu" v-model="formbase.areacode" :options="arealist" transition-show="scale"
            transition-hide="scale" style="width: 40px" /> -->
        </template>
      </q-input>
      <q-input placeholder="验证码" v-model="registerStore.form.smscode" :maxlength="6" lazy-rules
        :rules="[(val) => (val && val.length > 0) || '请输入验证码']">
        <template v-slot:append>
          <div :class="{ send: true, disbale: count }" @click.stop="sendSmsCode">
            {{ count > 0 ? count + ' 秒' : '发送验证码' }}
          </div>
        </template>
      </q-input>
      <q-input type="password" placeholder="请输入密码" v-model="registerStore.form.password" lazy-rules
        :rules="[(val) => (val && val.length > 0) || '请输入密码']" />
      <q-input type="password" placeholder="请再次输入密码" v-model="registerStore.form.password1" lazy-rules
        :rules="[(val) => (val && val.length > 0) || '请再次输入密码', (val) => val === registerStore.form.password || '两次密码不一致']" />
      <q-btn label="注 册" type="submit" color="primary" />
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useCountDown, useRegister, useNotify } from 'src/hook';
export default defineComponent({
  emits: ['registerSuccess'],
  setup(_, { emit }) {
    const myForm = ref();
    const { count, start } = useCountDown();
    const { registerStore, register, sendCode } = useRegister()
    const { errorNotify } = useNotify()
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
      myForm.value.validate().then(async (success: any) => {
        if (success) {
          await register()
          emit('registerSuccess')
        }
      });
    };

    const sendSmsCode = async () => {
      if (!registerStore.form.phone) {
        errorNotify('请输入手机号码');
        return;
      }

      await sendCode({ phone: registerStore.form.phone })
      start(60);
    }

    return {
      myForm,
      arealist,
      count,
      onSubmit,
      start,
      registerStore,
      sendSmsCode
    };
  },
});
</script>

<style lang="scss" scoped>
.register {
  .forget {
    width: 100%;
    text-align: center;
    margin-top: 40px;
    color: $tips;
  }

  &-sms {
    font-size: 18px;
    color: $title;
  }

  .send {
    width: 80px;
    height: 32px;
    line-height: 32px;
    background: linear-gradient(127deg, #fff120, #fcdf6b);
    border-radius: 4px;
    text-align: center;
    font-size: 13px;
    font-family: inter-medium;
    font-weight: 500;
    color: $title;

    &.disbale {
      background: rgba(0, 0, 0, 0.24);
    }
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
      border-radius: 8px;
      font-size: 18px;
    }
  }
}
</style>
