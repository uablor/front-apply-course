<template>
    <a-input-search v-model:value="store.query.search" placeholder="Search student" style="width: 200px"
        @search="handleSearch" />
</template>

<script setup lang="ts">
import StudentFormService from '../../composables/studenteducation.composable';
import { container } from 'tsyringe';
import { useStudentEducationStore } from '../../stores/use-student-education.store';

const studentService = container.resolve(StudentFormService);
const store = useStudentEducationStore();

const handleSearch = () => {
    store.query = { ...store.query, search: store.query.search };
    studentService.fetchPage(store.query);
};
</script>

<style scoped>
.search-student {
    margin-bottom: 20px;
}
</style>
