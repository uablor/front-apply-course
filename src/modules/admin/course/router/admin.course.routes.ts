// src/router/routes/auth.routes.ts
import type { RouteRecordRaw } from 'vue-router'

export const CourseRoutes: RouteRecordRaw[] = [
  {
    path: 'course',
    name: 'admin.course',
    component: () => import('../views/TeacherView.vue'),

  },
]
