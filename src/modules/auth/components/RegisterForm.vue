<template>
  <a-form :model="form" name="register" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }" autocomplete="off"
    @finish="onFinish" @finishFailed="onFinishFailed" class="login-form">
    <h2>{{ $t('register.title') }}</h2>

    <a-form-item :label="$t('register.name')" name="name" :rules="[{ required: true, message: $t('register.error.required_name') }]">
      <a-input v-model:value="form.name" size="large">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item :label="$t('register.surname')" name="surname" :rules="[{ required: true, message: $t('register.error.required_surname') }]">
      <a-input v-model:value="form.surname" size="large">
        <template #prefix>
          <IdcardOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item :label="$t('register.email')" name="email" :rules="[
      { required: true, message: $t('register.error.required_email') },
      { type: 'email', message: $t('register.error.valid_email') }
    ]">
      <a-input v-model:value="form.email" size="large">
        <template #prefix>
          <MailOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item :label="$t('register.password')" name="password" :rules="[
      { required: true, message: $t('register.error.required_password') },
      { min: 6, message: $t('register.error.min_password') },
    ]">
      <a-input-password v-model:value="form.password" size="large">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>

    <a-form-item>
      <a-button type="primary" ghost  html-type="submit" block size="large" style="margin-top: 10px;" :loading="loading">
        {{ $t('register.submit') }}
      </a-button>
    </a-form-item>
    <div>
      {{ $t('register.you_have_account?') }}
    <router-link :to="{ name: 'auth.login' }">{{ $t('register.login') }}</router-link>
    </div>

  </a-form>
</template>

<script lang="ts" setup>
import { UserOutlined,IdcardOutlined, LockOutlined,MailOutlined } from '@ant-design/icons-vue';
import { useRegisterForm } from '../composables/useAuth/useRegisterForm';

const {  form, onFinish, loading, onFinishFailed } = useRegisterForm();

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
