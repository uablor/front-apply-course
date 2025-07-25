<template>
  <a-form :model="form" name="basic" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }" autocomplete="off"
    @finish="onFinish" @finishFailed="onFinishFailed" class="login-form">
    <h2>{{ $t('login.welcome') }}</h2>

    <a-form-item :label="$t('login.email')" name="email" :rules="[
      { required: true, message: $t('login.error') },
      { type: 'email', message: $t('login.error') }
    ]">
      <a-input v-model:value="form.email" size="large">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item :label="$t('login.password')" name="password" :rules="[
      { required: true, message: $t('login.error') }
    ]">
      <a-input-password v-model:value="form.password" size="large">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>

    <div style="margin: 10px 0px;">
      {{ $t('login.forgot_password?') }}
      <router-link to="/forgot-password">{{ $t('login.forgot_password') }}</router-link>
    </div>

    <a-form-item>
      <a-button type="primary" ghost html-type="submit" block size="large" style="margin-top: 10px;" :loading="loading">
        {{ $t('login.submit') }}
      </a-button>
    </a-form-item>
    <div>
      {{ $t('login.you_have_account?') }}
      <router-link :to="{ name: 'auth.register' }">{{ $t('login.register') }}</router-link>
    </div>

  </a-form>
</template>

<script lang="ts" setup>
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useLoginForm } from '../composables/useAuth/useLoginForm';

const { form, onFinish, loading, onFinishFailed } = useLoginForm();


</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #e7e4e4;
  border-radius: 8px;
}
</style>
