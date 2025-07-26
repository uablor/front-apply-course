// src/router/routes/auth.routes.ts
import type { RouteRecordRaw } from "vue-router";
import { studentRoutes } from "@/modules/admin/student/router/admin.student.routes";
import { TeacherRoutes } from "@/modules/admin/teacher/router/admin.teacher.routes";
import { UserAdminRoutes } from "@/modules/admin/user/router/admin.teacher.routes";
import { RoleRoutes } from "@/modules/admin/role/router/admin.role.routes";
import { CourseCategoriesRoutes } from "@/modules/admin/course_categorie/router/admin.course.categories.routes";
import { CourseRoutes } from "@/modules/admin/course/router/admin.course.routes";
export const adminRoutes: RouteRecordRaw[] = [
  {
    path: "/admin",
    name: "",
    component: () => import("@modules/admin/components/layout/AppLayout.vue"),
    children: [
      ...studentRoutes,
      ...TeacherRoutes,
      ...UserAdminRoutes,
      ...RoleRoutes,
      ...CourseCategoriesRoutes,
      ...CourseRoutes,

      {
        path: ":pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@shared/views/NotFound.vue"),
      },
    ],
    meta: {
    },
  },
];
