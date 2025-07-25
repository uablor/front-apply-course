<template>
  <a-modal v-model:open="composable.open_edit.value" :title="$t('student.modal_title')" @ok="composable.udpate"
    :confirm-loading="composable.update_loading.value" ok-text="Save" cancel-text="Cancel"
    @cancel="composable.open_edit.value = false" width="500px">

    <a-form ref="formRef" :model="composable.form_edit" :rules="composable.rules" layout="vertical">
      <!-- Basic Information -->
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item name="name" :label="$t('admin.name')">
            <a-input v-model:value="composable.form_edit.name" />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item name="surname" :label="$t('admin.surname')">
            <a-input v-model:value="composable.form_edit.surname" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item name="roles" :label="$t('admin.roles')">
            <a-select v-model:value="composable.form_edit.roles" mode="multiple" :placeholder="'ເລືອກ Roles'"
              :options="storeRole.state.data" :field-names="{ label: 'name', value: 'id' }" style="width: 100%" :maxTagCount="5" />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item name="permissions" :label="$t('admin.permissions')">

            <a-select v-model:value="composable.form_edit.permissions" mode="multiple"
              :placeholder="'ເລືອກ Permissions'" :options="permissionOptions" style="width: 100%" :maxTagCount="5" />


          </a-form-item>
        </a-col>
      </a-row>

    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { useRoleStore } from '@/modules/admin/role/stores/use-role.store';
import AdminUserFormService from '../../composables/user-admin.composable';
import type { FormInstance } from 'ant-design-vue';
import { onMounted, ref } from 'vue';

const storeRole = useRoleStore()
const { composable } = defineProps<{
  composable: AdminUserFormService
}>();

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
  composable.formRef = formRef;
});
</script>

<style lang="scss" scoped>
.tags-container {
  min-height: 32px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 4px 11px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;

  &:focus-within {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
}

.ant-checkbox-group {
  .ant-checkbox-wrapper {
    margin-bottom: 8px;
  }
}

// Style for better spacing in modal
.ant-modal-body {
  .ant-form-item {
    margin-bottom: 16px;
  }
}
</style>