<template>

  <a-button type="primary" @click="service.open_create.value = true">
    <template #icon>
      <UserAddOutlined />
    </template>
    {{ $t('role.add') }}
  </a-button>

  <a-modal v-model:open="service.open_create.value" :title="$t('role.modal_title')" @ok="service.create"
    @cancel="() => (service.open_create.value = false, service.resetForm())"
    :confirm-loading="service.creat_loading.value" :ok-text="$t('common.submit')" :cancel-text="$t('common.cancel')"
    width="550px">

    <a-form ref="formRef" :model="service.form_create" :rules="service.rules" layout="vertical" class="student-form">

      <div>
        <h3>
          <UserOutlined />
          {{ $t('role.personal_info') || 'Personal Information' }}
        </h3>

        <a-row :gutter="[24, 16]">
          <a-col :xs="24" :sm="12">
            <a-form-item name="name" :label="$t('role.name')">
              <a-input v-model:value="service.form_create.name" size="large" placeholder="Enter first name">
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </a-form-item>
          </a-col>

          <a-col :xs="24" :sm="12">
            <a-form-item name="surname" :label="$t('role.display_name')">
              <a-input v-model:value="service.form_create.display_name" size="large" placeholder="Enter last name">
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>

        <a-form-item name="permissions" :label="$t('admin.permissions')">

          <a-select v-model:value="service.form_edit.permissions" mode="multiple" :placeholder="'ເລືອກ Permissions'"
            :options="permissionOptions" style="width: 100%" :maxTagCount="5" />


        </a-form-item>


      </div>





    </a-form>

  </a-modal>

</template>


<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { container } from 'tsyringe';
import type { FormInstance } from 'ant-design-vue';
import StudentFormService from '../../composables/role.composable';
import {
  UserAddOutlined,
  UserOutlined
} from '@ant-design/icons-vue';

const service = container.resolve(StudentFormService);
const formRef = ref<FormInstance | null>(null);


const permissionOptions = ref([
  { value: 'read', label: 'ອ່ານ (Read)' },
  { value: 'write', label: 'ຂຽນ (Write)' },
  { value: 'delete', label: 'ລຶບ (Delete)' },
  { value: 'update', label: 'ອັບເດດ (Update)' },
  { value: 'create', label: 'ສ້າງ (Create)' },
  { value: 'manage_users', label: 'ຈັດການຜູ້ໃຊ້ (Manage Users)' },
  { value: 'manage_content', label: 'ຈັດການເນື້ອຫາ (Manage Content)' },
  { value: 'view_reports', label: 'ເບິ່ງລາຍງານ (View Reports)' },
  { value: 'system_admin', label: 'ຜູ້ຄຸ້ມຄອງລະບົບ (System Admin)' }
]);


onMounted(() => {
  service.formRef = formRef;
});

</script>

<style scoped lang="scss"></style>