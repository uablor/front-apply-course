// src/router/routes/auth.routes.ts
import type { RouteRecordRaw } from 'vue-router'

export const studentRoutes: RouteRecordRaw[] = [
  {
    path: 'student',
    name: 'admin.student',
    component: () => import('../views/StudentView.vue'),
    meta: {
      guestOnly: true
    }
  },
  {
    path: 'student/profile',
    name: 'admin.student.profile',
    component: () => import('../views/Profile/Profile.vue'),
    meta: {
      guestOnly: true
    }
  },

  {
    path: 'studdfdfent',
    name: 'admin.course',
    component: () => import('../views/StudentView.vue'),
    meta: {
      guestOnly: true
    }
  },

  {
    path: 'studdfdfent',
    name: 'admin.apply_course',
    component: () => import('../views/StudentView.vue'),
    meta: {
      guestOnly: true
    }
  },
  {
    path: 'studedfdffffdfnt',
    name: 'admin.completion_record',
    component: () => import('../views/StudentView.vue'),
    meta: {
      guestOnly: true
    }
  },
]
