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
import TeacherFormService from '../../composables/teacher.composable';
import { container } from 'tsyringe';
import { sortType, Status } from '@/shared/enums/pagination.query.enum';
import { useTeacherStore } from '../../stores/use-teacher.store';

const store = useTeacherStore();
const studentService = container.resolve(TeacherFormService);

const handleFilterChange = () => {

  studentService.fetchPage(store.query);
    console.log("query",store.query);
};
</script>
