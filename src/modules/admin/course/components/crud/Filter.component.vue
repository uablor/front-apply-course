<template>
  <a-select v-model:value="store.query.is_active" style="width: 120px" @change="handleFilterChange">
    <a-select-option :value="Status.ACTIVE">ໃໍ່ຊ້ງານໄດ້</a-select-option>
    <a-select-option :value="Status.INACTIVE">ຖັງຂິ້ເຫືີ</a-select-option>
  </a-select>

  <a-select v-model:value="store.query.sort" style="width: 120px" @change="handleFilterChange">
    <a-select-option :value="sortType.ASC">ລ່າສຸດ</a-select-option>
    <a-select-option :value="sortType.DESC">ເກົ່າສຸດ</a-select-option>
  </a-select>
</template>
<script lang="ts" setup>
import UserAdminFormService from '../../composables/course.composable';
import { container } from 'tsyringe';
import { sortType, Status } from '@/shared/enums/pagination.query.enum';
import { useCourseStore } from '../../stores/use-Course.store';

const store = useCourseStore();
const userAdminService = container.resolve(UserAdminFormService);

const handleFilterChange = () => {

  userAdminService.fetchPage(store.query);
};
</script>
